import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResults } from '../types';
import {
  Activity,
  Circle,
  Eye,
  EyeOff,
  Flame,
  Maximize,
  MousePointer,
  Pause,
  Pencil,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

interface VideoPlayerHUDProps {
  results: AnalysisResults;
}

export const VideoPlayerHUD: React.FC<VideoPlayerHUDProps> = ({ results }) => {
  const { config, events, boxerAMetrics } = results;

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(config.duration || 20);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Overlay features toggles
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showHitboxes, setShowHitboxes] = useState(true);
  const [showGuardZone, setShowGuardZone] = useState(true);
  const [showImpacts, setShowImpacts] = useState(true);

  // Telestrator Drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingTool, setDrawingTool] = useState<'none' | 'arrow' | 'circle' | 'line'>('none');
  const [drawingColor, setDrawingColor] = useState('#f97316');
  const [drawings, setDrawings] = useState<{ id: string; tool: string; color: string; points: { x: number; y: number }[] }[]>([]);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Canvas CV HUD Layer
  const hudCanvasRef = useRef<HTMLCanvasElement>(null);

  // Sync video time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSpeedChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  // Rendu de la télémétrie sportive sur le Canvas HUD
  useEffect(() => {
    const canvas = hudCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const renderHUD = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = videoRef.current ? videoRef.current.currentTime : currentTime;

      // Détermination des couleurs d'équipement
      const bA = config.boxerA;
      const colorA = bA.gloveColor === 'red' ? '#ef4444' : bA.gloveColor === 'blue' ? '#3b82f6' : '#f97316';

      // Coordonnées et animations de respiration
      const t = time * 2;
      const xA = canvas.width * 0.35 + Math.sin(t) * 15;
      const yA = canvas.height * 0.55 + Math.cos(t * 1.5) * 8;

      if (showSkeleton) {
        // Traçage du squelette du combattant
        ctx.strokeStyle = colorA;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Colonne
        ctx.moveTo(xA, yA - 50);
        ctx.lineTo(xA, yA + 40);
        // Bras
        ctx.moveTo(xA, yA - 35);
        ctx.lineTo(xA + 35, yA - 25);
        ctx.lineTo(xA + 50, yA - 60); // Gant avant

        ctx.moveTo(xA, yA - 35);
        ctx.lineTo(xA - 25, yA - 15);
        ctx.lineTo(xA - 15, yA - 50); // Gant arrière

        // Jambes
        ctx.moveTo(xA, yA + 40);
        ctx.lineTo(xA - 20, yA + 110);
        ctx.moveTo(xA, yA + 40);
        ctx.lineTo(xA + 30, yA + 110);
        ctx.stroke();

        // Articulations / Tête
        ctx.fillStyle = colorA;
        ctx.beginPath();
        ctx.arc(xA, yA - 70, 14, 0, Math.PI * 2);
        ctx.fill();

        // Identifiant de télémétrie
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Plus Jakarta Sans';
        ctx.fillText(`[${bA.name.toUpperCase()}]`, xA - 25, yA - 95);
      }

      if (showHitboxes) {
        ctx.strokeStyle = `${colorA}88`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(xA - 35, yA - 80, 70, 130);
        ctx.setLineDash([]);
      }

      if (showGuardZone) {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(xA, yA - 55, 30, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Traçage de l'adversaire en Mode Duel
      if (config.mode === 'duel' && config.boxerB) {
        const bB = config.boxerB;
        const colorB = bB.gloveColor === 'blue' ? '#3b82f6' : bB.gloveColor === 'red' ? '#ef4444' : '#eab308';
        const xB = canvas.width * 0.65 + Math.sin(t + Math.PI) * 20;
        const yB = canvas.height * 0.55 + Math.cos(t * 1.2) * 10;

        if (showSkeleton) {
          ctx.strokeStyle = colorB;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(xB, yB - 50);
          ctx.lineTo(xB, yB + 40);
          ctx.moveTo(xB, yB - 35);
          ctx.lineTo(xB - 35, yB - 25);
          ctx.lineTo(xB - 45, yB - 55);

          ctx.moveTo(xB, yB - 35);
          ctx.lineTo(xB + 25, yB - 15);
          ctx.lineTo(xB + 20, yB - 50);

          ctx.moveTo(xB, yB + 40);
          ctx.lineTo(xB - 30, yB + 110);
          ctx.moveTo(xB, yB + 40);
          ctx.lineTo(xB + 20, yB + 110);
          ctx.stroke();

          ctx.fillStyle = colorB;
          ctx.beginPath();
          ctx.arc(xB, yB - 70, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px Plus Jakarta Sans';
          ctx.fillText(`[${bB.name.toUpperCase()}]`, xB - 25, yB - 95);
        }

        if (showHitboxes) {
          ctx.strokeStyle = `${colorB}88`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.strokeRect(xB - 35, yB - 80, 70, 130);
          ctx.setLineDash([]);
        }

        if (showGuardZone) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(xB, yB - 55, 30, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Faisceau de distance et Domination Spatiale
        if (showImpacts) {
          const dist = Math.hypot(xB - xA, yB - yA);
          ctx.strokeStyle = dist < 180 ? '#ef4444' : '#3b82f6';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(xA + 15, yA - 20);
          ctx.lineTo(xB - 15, yB - 20);
          ctx.stroke();

          ctx.fillStyle = dist < 180 ? '#ef4444' : '#3b82f6';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(`Distance: ${(dist / 130).toFixed(1)}m`, (xA + xB) / 2 - 25, (yA + yB) / 2 - 30);
        }
      }

      // Rendu des alertes IA et ouvertures détectées
      events.forEach((ev) => {
        if (time >= ev.time - 0.4 && time <= ev.time + 1.6) {
          const isOpening = ev.type === 'opening';
          const primaryColor = isOpening ? '#eab308' : ev.impact === 'heavy' ? '#ef4444' : '#f97316';

          // Cercle d'impact en expansion
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(canvas.width * 0.5, canvas.height * 0.4, 30 + (time - ev.time) * 40, 0, Math.PI * 2);
          ctx.fillStyle = isOpening ? 'rgba(234, 179, 8, 0.15)' : ev.impact === 'heavy' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.15)';
          ctx.fill();

          // Bannière texte d'analyste
          ctx.fillStyle = '#ffffff';
          ctx.font = 'extrabold 14px Montserrat';
          ctx.textAlign = 'center';
          ctx.fillText(`⚡ ${ev.title.toUpperCase()}`, canvas.width * 0.5, canvas.height * 0.15);
          
          if (ev.speed) {
            ctx.font = 'bold 11px Plus Jakarta Sans';
            ctx.fillStyle = '#f97316';
            ctx.fillText(`Vitesse de l'impact : ${ev.speed} km/h`, canvas.width * 0.5, canvas.height * 0.15 + 18);
          }
          ctx.textAlign = 'left';
        }
      });

      // Overlay permanent de télémétrie Move IQ
      ctx.fillStyle = 'rgba(2, 6, 23, 0.6)';
      ctx.fillRect(10, 10, 150, 55);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 10, 150, 55);

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 9px Plus Jakarta Sans';
      ctx.fillText('TÉLÉMÉTRIE MOVE IQ', 18, 22);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Précision : ${boxerAMetrics.punchStats.accuracy}%`, 18, 36);
      ctx.fillText(`Timing IA : ${boxerAMetrics.punchStats.timingScore}%`, 18, 48);

      animationFrameId = requestAnimationFrame(renderHUD);
    };

    renderHUD();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTime, showSkeleton, showHitboxes, showGuardZone, showImpacts, config, events, boxerAMetrics]);

  // Configuration du Telestrator (Outil de dessin)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawLine = (points: { x: number; y: number }[], color: string) => {
      if (points.length < 2) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    };

    const drawArrow = (points: { x: number; y: number }[], color: string) => {
      if (points.length < 2) return;
      const start = points[0];
      const end = points[points.length - 1];

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      ctx.beginPath();
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x - 12 * Math.cos(angle - Math.PI / 6), end.y - 12 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(end.x - 12 * Math.cos(angle + Math.PI / 6), end.y - 12 * Math.sin(angle + Math.PI / 6));
      ctx.fill();
    };

    const drawCircleShape = (points: { x: number; y: number }[], color: string) => {
      if (points.length < 2) return;
      const start = points[0];
      const end = points[points.length - 1];
      const radius = Math.hypot(end.x - start.x, end.y - start.y);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    };

    drawings.forEach((d) => {
      if (d.tool === 'line') drawLine(d.points, d.color);
      if (d.tool === 'arrow') drawArrow(d.points, d.color);
      if (d.tool === 'circle') drawCircleShape(d.points, d.color);
    });

    if (currentStroke.length > 0) {
      if (drawingTool === 'line') drawLine(currentStroke, drawingColor);
      if (drawingTool === 'arrow') drawArrow(currentStroke, drawingColor);
      if (drawingTool === 'circle') drawCircleShape(currentStroke, drawingColor);
    }
  }, [drawings, currentStroke, drawingTool, drawingColor]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawingTool === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentStroke([{ x, y }]);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || drawingTool === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentStroke((prev) => [...prev, { x, y }]);
  };

  const handleCanvasMouseUp = () => {
    if (!isDrawing || drawingTool === 'none') return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      setDrawings((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          tool: drawingTool,
          color: drawingColor,
          points: currentStroke,
        },
      ]);
    }
    setCurrentStroke([]);
  };

  const clearDrawings = () => {
    setDrawings([]);
    setCurrentStroke([]);
  };

  const toggleFullscreen = () => {
    const playerWrapper = document.getElementById('moveiq-player-container');
    if (playerWrapper) {
      if (!document.fullscreenElement) {
        playerWrapper.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none animate-fadeIn">
      
      {/* Colonne Principale : Studio + HUD + Télémétrie */}
      <div className="lg:col-span-2 space-y-4">
        
        {/* Lecteur Vidéo & Calque de Vision */}
        <div
          id="moveiq-player-container"
          className="relative aspect-video w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl group"
        >
          <video
            ref={videoRef}
            src={config.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover"
            playsInline
            loop
            crossOrigin="anonymous"
          />

          {/* Calque de Traçage IA */}
          <canvas
            ref={hudCanvasRef}
            width={800}
            height={450}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Calque Telestrator */}
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            className={`absolute inset-0 w-full h-full z-20 ${
              drawingTool !== 'none' ? 'cursor-crosshair' : 'pointer-events-none'
            }`}
          />

          {/* Mode Dessin Actif */}
          {drawingTool !== 'none' && (
            <div className="absolute top-4 right-4 z-30 bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
              <Pencil className="w-3.5 h-3.5" />
              <span>Telestrator Actif</span>
            </div>
          )}

          {/* Bouton Play Central */}
          {!isPlaying && drawingTool === 'none' && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] cursor-pointer group-hover:bg-slate-950/20 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg transform scale-95 group-hover:scale-105 transition-transform duration-300">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Barre de contrôles du lecteur */}
          <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex flex-col justify-end gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
            
            {/* Timeline */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                handleSeek(pos * duration);
              }}
              className="w-full h-2 bg-slate-800 hover:h-3 rounded-full overflow-hidden cursor-pointer transition-all relative"
            >
              <div
                className="h-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-orange-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  onClick={() => handleSeek(Math.max(0, currentTime - 3))}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Reculer de 3s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="text-xs font-medium text-slate-300">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-600 mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Vitesse et Plein Écran */}
              <div className="flex items-center gap-3">
                
                <div className="flex items-center bg-slate-900/80 rounded-lg p-0.5 border border-slate-800">
                  {[0.25, 0.5, 1].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        playbackRate === rate
                          ? 'bg-orange-500 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Plein Écran"
                >
                  <Maximize className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Barre de Filtres des Capteurs */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Filtres d'Affichage</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            <button
              onClick={() => setShowSkeleton(!showSkeleton)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showSkeleton
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-slate-950 border border-slate-800 text-slate-500'
              }`}
            >
              {showSkeleton ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Squelette</span>
            </button>

            <button
              onClick={() => setShowHitboxes(!showHitboxes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showHitboxes
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-slate-950 border border-slate-800 text-slate-500'
              }`}
            >
              {showHitboxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Hitboxes</span>
            </button>

            <button
              onClick={() => setShowGuardZone(!showGuardZone)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showGuardZone
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-slate-950 border border-slate-800 text-slate-500'
              }`}
            >
              {showGuardZone ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Zone Garde</span>
            </button>

            {config.mode === 'duel' && (
              <button
                onClick={() => setShowImpacts(!showImpacts)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  showImpacts
                    ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                    : 'bg-slate-950 border border-slate-800 text-slate-500'
                }`}
              >
                {showImpacts ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Distance</span>
              </button>
            )}

          </div>

        </div>

        {/* Télémétrie Telestrator (Outil de dessin) */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-orange-500" />
                <span>Telestrator Tactique</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Tracez sur l'arène pour décomposer les trajectoires et les angles d'attaque.
              </p>
            </div>

            <div className="flex items-center gap-2">
              
              <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800">
                
                <button
                  onClick={() => setDrawingTool('none')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    drawingTool === 'none' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-white'
                  }`}
                  title="Désactiver le dessin"
                >
                  <MousePointer className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setDrawingTool('arrow');
                    if (isPlaying) togglePlay();
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    drawingTool === 'arrow' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-white'
                  }`}
                  title="Flèche de Déplacement"
                >
                  <Zap className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setDrawingTool('circle');
                    if (isPlaying) togglePlay();
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    drawingTool === 'circle' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-white'
                  }`}
                  title="Cercle de Cadrage"
                >
                  <Circle className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setDrawingTool('line');
                    if (isPlaying) togglePlay();
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    drawingTool === 'line' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-white'
                  }`}
                  title="Tracé Libre"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

              </div>

              <div className="flex items-center gap-1 bg-slate-950 rounded-xl p-1 border border-slate-800">
                {['#f97316', '#3b82f6', '#22c55e', '#eab308'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setDrawingColor(color)}
                    className={`w-5 h-5 rounded-full border transition-transform ${
                      drawingColor === color ? 'scale-110 border-white' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {drawings.length > 0 && (
                <button
                  onClick={clearDrawings}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-xl font-bold transition-colors"
                >
                  Effacer
                </button>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* Colonne Latérale : Journal du Combat & Synchronisation */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 flex flex-col h-[520px] lg:h-auto shadow-xl">
        
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-500" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Journal du Combat</h3>
          </div>
          <span className="text-[10px] bg-slate-950 text-orange-400 px-2.5 py-0.5 rounded-lg font-bold border border-slate-800">
            {events.length} faits mesurés
          </span>
        </div>

        {/* Liste défilante des événements */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {events.map((ev) => {
            const isCurrent = currentTime >= ev.time - 1 && currentTime <= ev.time + 2;
            const isOpening = ev.type === 'opening';

            return (
              <div
                key={ev.id}
                onClick={() => handleSeek(ev.time)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  isCurrent
                    ? 'bg-orange-500/10 border-orange-500/50 shadow-md'
                    : isOpening
                    ? 'bg-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/50'
                    : 'bg-slate-950/60 border-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${isOpening ? 'text-yellow-400' : 'text-orange-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOpening ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                    <span>{formatTime(ev.time)}</span>
                  </div>

                  {ev.speed && (
                    <span className="text-[9px] font-black bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Flame className="w-3 h-3" />
                      {ev.speed} km/h
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-extrabold text-white mt-1.5 line-clamp-1">{ev.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{ev.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bloc Règle de Suivi */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 shrink-0">
          <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1">
              <span>🎯 Règle de Suivi</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Cliquez sur un événement pour synchroniser la vidéo et analyser la biomécanique au ralenti.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
