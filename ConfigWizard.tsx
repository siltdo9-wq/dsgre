import React, { useState, useEffect } from 'react';
import { AnalysisMode, BoxerConfig, GloveColor, Stance } from '../types';
import { GLOVE_COLORS_DATA, SAMPLE_VIDEOS } from '../data/sampleVideos';
import { Check, ChevronRight, Play, Swords, User, Upload } from 'lucide-react';

interface ConfigWizardProps {
  onStartAnalysis: (
    mode: AnalysisMode,
    boxerA: BoxerConfig,
    boxerB?: BoxerConfig,
    customVideo?: { url: string; title: string }
  ) => void;
  onCancel: () => void;
  preloadedVideo?: { url: string; title: string } | null;
}

export const ConfigWizard: React.FC<ConfigWizardProps> = ({
  onStartAnalysis,
  onCancel,
  preloadedVideo,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<AnalysisMode>('duel');

  // Custom video if user selected local file
  const [customVideo, setCustomVideo] = useState<{ url: string; title: string } | null>(
    preloadedVideo || null
  );

  // Synchronise si la prop change et saute à l'étape 2 directement pour une expérience sans coupure
  useEffect(() => {
    if (preloadedVideo) {
      setCustomVideo(preloadedVideo);
      setStep(2);
    }
  }, [preloadedVideo]);

  // Boxer A state
  const [boxerAName, setBoxerAName] = useState('Boxeur A');
  const [boxerAGlove, setBoxerAGlove] = useState<GloveColor>('red');
  const [boxerATorso, setBoxerATorso] = useState('T-shirt Noir');
  const [boxerAShoes, setBoxerAShoes] = useState('Chaussures Blanches');
  const [boxerAStance, setBoxerAStance] = useState<Stance>('orthodox');

  // Boxer B state
  const [boxerBName, setBoxerBName] = useState('Boxeur B');
  const [boxerBGlove, setBoxerBGlove] = useState<GloveColor>('blue');
  const [boxerBTorso, setBoxerBTorso] = useState('Torse nu');
  const [boxerBShoes, setBoxerBShoes] = useState('Chaussures Noires');
  const [boxerBStance, setBoxerBStance] = useState<Stance>('southpaw');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideo({ url, title: file.name });
      setStep(2); // Saute directement à l'identification pour un flux parfait
    }
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_VIDEOS.find((s) => s.id === sampleId);
    if (sample) {
      onStartAnalysis(
        sample.defaultConfig.mode,
        sample.defaultConfig.boxerA,
        sample.defaultConfig.boxerB,
        { url: sample.videoUrl, title: sample.title }
      );
    }
  };

  const handleProceedToStep2 = () => {
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const configA: BoxerConfig = {
      id: 'boxer-a',
      name: boxerAName || 'Boxeur A',
      gloveColor: boxerAGlove,
      torsoColor: boxerATorso || 'Non spécifié',
      shoesColor: boxerAShoes || 'Non spécifié',
      stance: boxerAStance,
    };

    let configB: BoxerConfig | undefined = undefined;
    if (mode === 'duel') {
      configB = {
        id: 'boxer-b',
        name: boxerBName || 'Boxeur B',
        gloveColor: boxerBGlove,
        torsoColor: boxerBTorso || 'Non spécifié',
        shoesColor: boxerBShoes || 'Non spécifié',
        stance: boxerBStance,
      };
    }

    onStartAnalysis(mode, configA, configB, customVideo || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl overflow-y-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center animate-fadeIn">
      <div className="max-w-4xl mx-auto w-full my-auto">
        
        {/* En-tête Wizard */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            Paramètres d'Analyse
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {step === 1 ? 'Chargez votre Vidéo & Choisissez le Mode' : 'Identifiez les Athlètes'}
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            {step === 1
              ? 'Importez votre propre séquence d\'entraînement ou de combat pour en extraire la biomécanique et le volume de frappe.'
              : 'Indiquez les couleurs d\'équipement pour permettre aux capteurs virtuels de suivre chaque cible avec une précision maximale.'}
          </p>
        </div>

        {/* Étape 1 : Choix Vidéo et Mode */}
        {step === 1 && (
          <div className="space-y-8">
            
            {/* Options de chargement vidéo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Zone Upload Custom Très intuitive */}
              <div className="relative group bg-slate-900 border-2 border-dashed border-slate-700 hover:border-orange-500 rounded-2xl p-6 text-center transition-all flex flex-col justify-between items-center min-h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="w-16 h-16 rounded-full bg-slate-800 group-hover:bg-orange-500/20 flex items-center justify-center text-slate-400 group-hover:text-orange-400 transition-colors mb-3">
                  <Upload className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Votre propre vidéo</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Formats supportés : MP4, WebM, MOV. Traitement instantané et entièrement sécurisé.
                  </p>
                </div>
                
                {customVideo ? (
                  <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[180px]">{customVideo.title}</span>
                  </div>
                ) : (
                  <div className="mt-4">
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md">
                      Sélectionner un fichier
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Mode Selection */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Mode de Suivi</h3>
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Mode Duel */}
                    <button
                      type="button"
                      onClick={() => setMode('duel')}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                        mode === 'duel'
                          ? 'bg-orange-500/10 border-orange-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {mode === 'duel' && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/20 rounded-bl-full flex items-start justify-end p-1">
                          <Check className="w-3 h-3 text-orange-500" />
                        </div>
                      )}
                      <Swords className={`w-5 h-5 mb-2 ${mode === 'duel' ? 'text-orange-500' : 'text-slate-500'}`} />
                      <div className="font-bold text-xs sm:text-sm">Mode Duel</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">2 Boxeurs en simultané</div>
                    </button>

                    {/* Mode Solo */}
                    <button
                      type="button"
                      onClick={() => setMode('solo')}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                        mode === 'solo'
                          ? 'bg-orange-500/10 border-orange-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {mode === 'solo' && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/20 rounded-bl-full flex items-start justify-end p-1">
                          <Check className="w-3 h-3 text-orange-500" />
                        </div>
                      )}
                      <User className={`w-5 h-5 mb-2 ${mode === 'solo' ? 'text-orange-500' : 'text-slate-500'}`} />
                      <div className="font-bold text-xs sm:text-sm">Mode Focus</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">1 Seul Boxeur</div>
                    </button>

                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleProceedToStep2}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{customVideo ? 'Configurer les Athlètes' : 'Continuer avec la vidéo par défaut'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Vidéos d'échantillons préchargées */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Ou testez un extrait pro de démonstration
                </h3>
                <span className="text-xs text-slate-500">Séquences calibrées</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SAMPLE_VIDEOS.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample.id)}
                    className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-video w-full relative overflow-hidden bg-slate-950">
                      <img
                        src={sample.thumbnail}
                        alt={sample.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-orange-400 font-bold border border-slate-800">
                        {sample.duration}s
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold mb-1">
                        <span>{sample.defaultConfig.mode === 'duel' ? '⚔️ DUEL' : '👤 SOLO'}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                        {sample.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                        {sample.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / Quitter */}
            <div className="text-center">
              <button
                type="button"
                onClick={onCancel}
                className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors"
              >
                Retour à l'application
              </button>
            </div>

          </div>
        )}

        {/* Étape 2 : Formulaire d'identification des boxeurs */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Mode selection en haut pour permettre de basculer facilement */}
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 max-w-xs mx-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMode('duel')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === 'duel' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚔️ Mode Duel
              </button>
              <button
                type="button"
                onClick={() => setMode('solo')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === 'solo' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                👤 Mode Focus
              </button>
            </div>

            <div className={`grid grid-cols-1 ${mode === 'duel' ? 'md:grid-cols-2' : 'max-w-xl mx-auto'} gap-6`}>
              
              {/* Boxeur A */}
              <div className="bg-slate-900 border-t-4 border-t-orange-500 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
                <div className="absolute top-3 right-3 bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded">
                  Cible Principale
                </div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-black">A</span>
                  Boxeur A
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nom ou Surnom</label>
                    <input
                      type="text"
                      value={boxerAName}
                      onChange={(e) => setBoxerAName(e.target.value)}
                      placeholder="Ex: Tyson, Usyk, Le Pharaon..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Couleur des gants */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                      Couleur des Gants <span className="text-orange-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {GLOVE_COLORS_DATA.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setBoxerAGlove(color.id as GloveColor)}
                          className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all ${
                            boxerAGlove === color.id
                              ? `bg-slate-800 ${color.border} ring-1 ring-orange-500`
                              : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs font-semibold text-slate-200 truncate">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* T-shirt / Buste */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                      Tenue / Buste (T-shirt, Short...)
                    </label>
                    <input
                      type="text"
                      value={boxerATorso}
                      onChange={(e) => setBoxerATorso(e.target.value)}
                      placeholder="Ex: T-shirt Noir, Torse nu, Débardeur Rouge..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Chaussures */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                      Couleur des Chaussures
                    </label>
                    <input
                      type="text"
                      value={boxerAShoes}
                      onChange={(e) => setBoxerAShoes(e.target.value)}
                      placeholder="Ex: Blanches, Noires et Or..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Posture */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Posture</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBoxerAStance('orthodox')}
                        className={`py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                          boxerAStance === 'orthodox'
                            ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Orthodoxe
                      </button>
                      <button
                        type="button"
                        onClick={() => setBoxerAStance('southpaw')}
                        className={`py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                          boxerAStance === 'southpaw'
                            ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Fausse Patte
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Boxeur B (Seulement en mode Duel) */}
              {mode === 'duel' && (
                <div className="bg-slate-900 border-t-4 border-t-blue-500 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
                  <div className="absolute top-3 right-3 bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    Adversaire
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-black">B</span>
                    Boxeur B
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nom ou Surnom</label>
                      <input
                        type="text"
                        value={boxerBName}
                        onChange={(e) => setBoxerBName(e.target.value)}
                        placeholder="Ex: Fury, Joshua, Le Challenger..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>

                    {/* Couleur des gants */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                        Couleur des Gants <span className="text-blue-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {GLOVE_COLORS_DATA.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => setBoxerBGlove(color.id as GloveColor)}
                            className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all ${
                              boxerBGlove === color.id
                                ? `bg-slate-800 ${color.border} ring-1 ring-blue-500`
                                : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs font-semibold text-slate-200 truncate">{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* T-shirt / Buste */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                        Tenue / Buste (T-shirt, Short...)
                      </label>
                      <input
                        type="text"
                        value={boxerBTorso}
                        onChange={(e) => setBoxerBTorso(e.target.value)}
                        placeholder="Ex: Débardeur Blanc, Short Rouge..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Chaussures */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                        Couleur des Chaussures
                      </label>
                      <input
                        type="text"
                        value={boxerBShoes}
                        onChange={(e) => setBoxerBShoes(e.target.value)}
                        placeholder="Ex: Noires, Rouges..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Posture */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Posture</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setBoxerBStance('orthodox')}
                          className={`py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                            boxerBStance === 'orthodox'
                              ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          Orthodoxe
                        </button>
                        <button
                          type="button"
                          onClick={() => setBoxerBStance('southpaw')}
                          className={`py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                            boxerBStance === 'southpaw'
                              ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          Fausse Patte
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="flex items-center justify-between max-w-xl mx-auto pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2 rounded-xl transition-colors"
              >
                ← Modifier la vidéo
              </button>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lancer l'Analyse Vidéo</span>
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
