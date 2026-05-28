import React, { useState, useRef } from 'react';
import { Upload, Play, ChevronRight, ShieldCheck, Zap, User, Swords, Target } from 'lucide-react';
import { SAMPLE_VIDEOS, COMBAT_SPORTS_DATA } from '../data/sampleVideos';
import { CombatSport, AnalysisMode } from '../types';

interface HomeWelcomeProps {
  onFileSelected: (file: File, sport: CombatSport, mode: AnalysisMode) => void;
  onSelectSample: (sampleId: string) => void;
}

export const HomeWelcome: React.FC<HomeWelcomeProps> = ({ onFileSelected, onSelectSample }) => {
  const [selectedSport, setSelectedSport] = useState<CombatSport>('boxing');
  
  // Références pour les inputs de fichiers de chaque mode
  const soloInputRef = useRef<HTMLInputElement>(null);
  const duelInputRef = useRef<HTMLInputElement>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, mode: AnalysisMode) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file, selectedSport, mode);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn py-2 sm:py-6 select-none max-w-6xl mx-auto">
      
      {/* Hero Section Premium & Futuriste */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl">
        
        {/* Arrière-plan sombre avec effet premium glassmorphism */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/12860553/pexels-photo-12860553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" 
            alt="Arène de sport de combat" 
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/50" />
          
          {/* Lueurs d'ambiance futuristes */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-orange-400 border border-slate-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-orange-500" />
            <span>Plateforme d'Analyse IA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Move IQ <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent text-2xl sm:text-4xl block mt-1">
              L’intelligence derrière chaque mouvement.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
            L'outil technologique ultime pour les combattants professionnels et coachs de haut niveau. Notre IA décompose vos vidéos pour analyser la vitesse de vos frappes, détecter vos ouvertures et évaluer le contrôle du ring.
          </p>

          {/* Capacités de l'IA mises en avant */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Détection des combos',
              'Vitesse des frappes',
              'Erreurs défensives',
              'Analyse du timing',
              'Contrôle du ring',
              'Précision chirurgicale'
            ].map((cap, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section de sélection de la discipline */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            1. Sélectionnez votre discipline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            L'algorithme IA s'adapte spécifiquement aux règles et à la biomécanique de chaque sport
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {COMBAT_SPORTS_DATA.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id as CombatSport)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                selectedSport === sport.id
                  ? 'bg-slate-900 border-orange-500 text-white shadow-lg shadow-orange-500/10 scale-105'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-2xl mb-2">{sport.icon}</span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">{sport.name}</span>
              
              <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                {selectedSport === sport.id && (
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 w-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section principale : Importation par Mode */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            2. Choisissez le mode d'analyse & Importez
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Chaque mode active des capteurs d'analyse optimisés pour la situation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Mode Solo */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
                <User className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors">
                Mode Focus (1 Combattant)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Idéal pour l'entraînement au sac de frappe, le shadow boxing ou le travail technique individuel. L'IA se concentre à 100% sur votre biomécanique.
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Vitesse et explosivité des frappes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Stabilité des appuis au sol</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Mesure de l'endurance (Stamina)</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => soloInputRef.current?.click()}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white border border-slate-700 hover:border-orange-500 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow"
              >
                <Upload className="w-4 h-4 text-orange-500" />
                <span>Importer vidéo Focus</span>
              </button>
              <input
                ref={soloInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, 'solo')}
                className="hidden"
              />
            </div>
          </div>

          {/* Mode Duel */}
          <div className="bg-slate-900 border-2 border-orange-500/40 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500 transition-all shadow-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-md">
                  <Swords className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Recommandé
                </span>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors">
                Mode Duel (Combat / Sparring)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Conçu pour les sparrings et combats réels. L'IA suit les deux athlètes en simultané pour évaluer la domination, les ouvertures et le contrôle du ring.
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Face-à-face et comparatif direct</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Détection des failles et ouvertures</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Analyse du contrôle de l'espace</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => duelInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Importer vidéo Duel</span>
              </button>
              <input
                ref={duelInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, 'duel')}
                className="hidden"
              />
            </div>
          </div>

          {/* Mode Palette (Paos / Pattes d'ours) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-4 border border-yellow-500/20">
                <Target className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors">
                Mode Leçon / Palette
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Optimisé pour les leçons aux pattes d'ours (palettes) ou aux paos avec un coach. L'IA évalue la précision de vos frappes sur les cibles mobiles.
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span>Score de Timing et réactivité</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span>Précision d'impact sur cible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span>Rythme et fluidité des combos</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => paletteInputRef.current?.click()}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white border border-slate-700 hover:border-yellow-500 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow"
              >
                <Upload className="w-4 h-4 text-yellow-500" />
                <span>Importer vidéo Palette</span>
              </button>
              <input
                ref={paletteInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, 'palette')}
                className="hidden"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Séquences d'exemples prêtes à l'emploi */}
      <div className="pt-8 border-t border-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Testez l'IA sur nos extraits professionnels
            </h3>
            <p className="text-xs text-slate-400">
              Découvrez la précision des capteurs virtuels sur des rounds intenses
            </p>
          </div>
          <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-lg self-start sm:self-auto">
            Vidéos pré-calibrées
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SAMPLE_VIDEOS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample.id)}
              className="group bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              <div className="aspect-video w-full relative overflow-hidden bg-slate-950">
                <img
                  src={sample.thumbnail}
                  alt={sample.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Durée */}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-orange-400 font-bold border border-slate-800">
                  {sample.duration}s
                </div>

                {/* Bouton Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Tags Sport & Mode */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                  <span className="text-[9px] font-extrabold bg-slate-950/90 backdrop-blur-sm text-slate-200 px-2 py-0.5 rounded border border-slate-800">
                    {sample.defaultConfig.sport.toUpperCase()}
                  </span>
                  <span className="text-[9px] font-extrabold bg-orange-500/20 backdrop-blur-sm text-orange-300 px-2 py-0.5 rounded border border-orange-500/30">
                    {sample.defaultConfig.mode === 'duel' ? '⚔️ DUEL' : '👤 FOCUS'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                    {sample.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {sample.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-300">
                  <span>Lancer l'analyse</span>
                  <ChevronRight className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
