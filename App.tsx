import React, { useState } from 'react';
import { AnalysisMode, AnalysisResults, BoxerConfig, CombatSport } from './types';
import { SAMPLE_VIDEOS } from './data/sampleVideos';
import { generateAnalysisResults } from './utils/analysisEngine';
import { Navbar } from './components/Navbar';
import { ConfigWizard } from './components/ConfigWizard';
import { VideoPlayerHUD } from './components/VideoPlayerHUD';
import { StatsDashboard } from './components/StatsDashboard';
import { SkillsRadar } from './components/SkillsRadar';
import { TrainingPlan } from './components/TrainingPlan';
import { BoxingTimer } from './components/BoxingTimer';
import { HomeWelcome } from './components/HomeWelcome';
import { FighterProfile } from './components/FighterProfile';
import { AboutCreator } from './components/AboutCreator';
import { PremiumModal } from './components/PremiumModal';
import { Trophy, ArrowLeft } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation
  const [activeTab, setActiveTab] = useState('studio');

  // Modal du Config Wizard
  const [showWizard, setShowWizard] = useState(false);

  // Modal Premium
  const [showPremium, setShowPremium] = useState(false);

  // Statut de l'analyse IA
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Fichier vidéo et sport sélectionnés sur l'accueil
  const [pendingFile, setPendingFile] = useState<{ url: string; title: string; sport: CombatSport } | null>(null);

  // Résultats d'analyse (null par défaut pour afficher l'accueil premium !)
  const [results, setResults] = useState<AnalysisResults | null>(null);

  // Fallback de haute fidélité pour que les onglets de statistiques et profil soient toujours accessibles
  const fallbackResults = React.useMemo(() => {
    return generateAnalysisResults(SAMPLE_VIDEOS[0].defaultConfig);
  }, []);

  // Les résultats effectifs utilisés par les vues
  const activeResults = results || fallbackResults;

  // Lancement de l'analyse IA Move IQ
  const handleStartAnalysis = (
    mode: AnalysisMode,
    boxerA: BoxerConfig,
    boxerB?: BoxerConfig,
    customVideo?: { url: string; title: string }
  ) => {
    setShowWizard(false);
    const sport = pendingFile?.sport || 'boxing';
    setPendingFile(null);
    setIsAnalyzing(true);
    setLoadingStep(1);

    // Simulation premium du pipeline de computer vision & tracking
    const timer1 = setTimeout(() => setLoadingStep(2), 600);
    const timer2 = setTimeout(() => setLoadingStep(3), 1200);

    const timer3 = setTimeout(() => {
      const finalConfig = {
        mode,
        sport,
        boxerA,
        boxerB,
        videoUrl: customVideo?.url || SAMPLE_VIDEOS[0].videoUrl,
        videoTitle: customVideo?.title || SAMPLE_VIDEOS[0].title,
        duration: customVideo ? 20 : SAMPLE_VIDEOS[0].duration,
      };

      const newResults = generateAnalysisResults(finalConfig);
      setResults(newResults);
      setIsAnalyzing(false);
      setActiveTab('studio');
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  // Gestion du fichier capturé sur la page d'accueil
  const handleFileSelectedOnHome = (file: File, sport: CombatSport) => {
    const url = URL.createObjectURL(file);
    setPendingFile({ url, title: file.name, sport });
    setShowWizard(true);
  };

  // Sélection d'un extrait professionnel
  const handleSelectSampleOnHome = (sampleId: string) => {
    const sample = SAMPLE_VIDEOS.find((s) => s.id === sampleId);
    if (sample) {
      setPendingFile({ url: sample.videoUrl, title: sample.title, sport: sample.defaultConfig.sport });
      handleStartAnalysis(
        sample.defaultConfig.mode,
        sample.defaultConfig.boxerA,
        sample.defaultConfig.boxerB,
        { url: sample.videoUrl, title: sample.title }
      );
    }
  };

  const handleResetToHome = () => {
    setResults(null);
    setPendingFile(null);
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-jakarta flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Barre de navigation */}
      <Navbar
        onNewAnalysis={() => {
          setPendingFile(null);
          setShowWizard(true);
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResults={!!results}
        onOpenPremium={() => setShowPremium(true)}
      />

      {/* Contenu de l'application */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        
        {/* Écran de chargement vidéo IA premium */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn select-none">
            <div className="max-w-md w-full mx-auto px-4 text-center">
              
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-600/20 animate-pulse">
                <span className="text-4xl">🥊</span>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white">
                Analyse Move IQ en cours
              </h3>
              
              <p className="text-xs text-orange-400 font-bold mt-1 tracking-wide">
                « L’intelligence derrière chaque mouvement. »
              </p>

              <div className="mt-6 space-y-2 text-left bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <div className={`text-xs font-bold transition-all ${
                  loadingStep >= 1 ? 'text-white' : 'text-slate-600'
                }`}>
                  {loadingStep >= 1 ? '✓ Détection des combos et vitesse des frappes' : 'Synchronisation du flux...'}
                </div>

                <div className={`text-xs font-bold transition-all ${
                  loadingStep >= 2 ? 'text-white' : 'text-slate-600'
                }`}>
                  {loadingStep >= 2 ? '✓ Analyse des esquives, timing et ouvertures' : 'Suivi des gants en temps réel...'}
                </div>

                <div className={`text-xs font-bold transition-all ${
                  loadingStep >= 3 ? 'text-white' : 'text-slate-600'
                }`}>
                  {loadingStep >= 3 ? '✓ Évaluation du contrôle du ring & Heatmap' : 'Calcul des puissances...'}
                </div>
              </div>

              {/* Barre de progression fluide */}
              <div className="mt-6 w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${(loadingStep / 3) * 100}%` }}
                />
              </div>

            </div>
          </div>
        )}

        {/* Assistant de configuration / Upload */}
        {showWizard && (
          <ConfigWizard
            onStartAnalysis={handleStartAnalysis}
            onCancel={() => setShowWizard(false)}
            preloadedVideo={pendingFile ? { url: pendingFile.url, title: pendingFile.title } : null}
          />
        )}

        {/* Modal Premium */}
        {showPremium && (
          <PremiumModal onClose={() => setShowPremium(false)} />
        )}

        {/* GESTION DE L'AFFICHAGE PAR ONGLET INDÉPENDANT */}
        {!isAnalyzing && (
          <div className="flex-1 flex flex-col">
            
            {/* Bannière de l'analyse en cours si l'utilisateur a chargé des résultats */}
            {results && activeTab !== 'about' && activeTab !== 'timer' && (
              <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-4.5 flex flex-wrap items-center justify-between gap-4 shadow-lg select-none mb-6 animate-fadeIn">
                
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-orange-500 shrink-0 shadow-inner">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black text-white line-clamp-1">{results.config.videoTitle}</span>
                      <span className="text-[9px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded uppercase">
                        {results.config.sport.toUpperCase()} • {results.config.mode === 'duel' ? '⚔️ DUEL' : '👤 FOCUS'}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2">
                      <span>
                        Cible : <strong className="text-slate-300">{results.config.boxerA.name}</strong> (Gants {results.config.boxerA.gloveColor})
                      </span>
                      
                      {results.config.mode === 'duel' && results.config.boxerB && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span>
                            Adversaire : <strong className="text-slate-300">{results.config.boxerB.name}</strong> (Gants {results.config.boxerB.gloveColor})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWizard(true)}
                    className="text-xs text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-850 border border-slate-800 px-3.5 py-2 rounded-xl font-bold transition-all"
                  >
                    Modifier les cibles
                  </button>

                  <button
                    onClick={handleResetToHome}
                    className="text-xs text-orange-400 hover:text-white bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5"
                    title="Fermer et retourner à l'accueil"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Autre vidéo</span>
                  </button>
                </div>

              </div>
            )}

            {/* Bannière informative si l'utilisateur navigue sur les statistiques/profil sans avoir chargé sa vidéo */}
            {!results && activeTab !== 'studio' && activeTab !== 'about' && activeTab !== 'timer' && (
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Mode Découverte Move IQ</span>
                    <span className="text-[10px] text-slate-400 block">
                      Vous consultez les données d'un profil élite pré-calibré. Chargez votre vidéo dans le Studio pour obtenir vos propres statistiques.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="text-xs font-bold text-orange-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0"
                >
                  Aller au Studio →
                </button>
              </div>
            )}

            {/* VUE 1 : Studio Vidéo */}
            {activeTab === 'studio' && (
              <div className="flex-1 flex flex-col justify-center animate-fadeIn">
                {results ? (
                  <VideoPlayerHUD results={activeResults} />
                ) : (
                  <HomeWelcome 
                    onFileSelected={handleFileSelectedOnHome} 
                    onSelectSample={handleSelectSampleOnHome} 
                  />
                )}
              </div>
            )}

            {/* VUE 2 : Dashboard IA */}
            {activeTab === 'stats' && (
              <div className="space-y-12 animate-fadeIn">
                <StatsDashboard results={activeResults} />
                <div className="pt-6 border-t border-slate-800/80">
                  <SkillsRadar results={activeResults} />
                </div>
              </div>
            )}

            {/* VUE 3 : Profil Combattant */}
            {activeTab === 'profile' && (
              <div className="animate-fadeIn">
                <FighterProfile results={activeResults} onOpenPremium={() => setShowPremium(true)} />
              </div>
            )}

            {/* VUE 4 : Plan IA */}
            {activeTab === 'training' && (
              <div className="animate-fadeIn">
                <TrainingPlan results={activeResults} />
              </div>
            )}

            {/* VUE 5 : Chronomètre Pro */}
            {activeTab === 'timer' && (
              <div className="animate-fadeIn">
                <BoxingTimer />
              </div>
            )}

            {/* VUE 6 : À propos du Créateur */}
            {activeTab === 'about' && (
              <div className="animate-fadeIn">
                <AboutCreator />
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer Premium */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-600 select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-slate-400">Move</span>
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">IQ</span>
            <span className="text-[10px] text-slate-500 font-normal">| L’intelligence derrière chaque mouvement.</span>
          </div>

          <p>© 2026 Move IQ par Silvio De Oliveira. Tous droits réservés.</p>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              IA Active 100%
            </span>
            <span>•</span>
            <span className="text-slate-500">60 FPS Télémétrie</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
