import React, { useState, useEffect } from 'react';
import { AnalysisResults } from '../types';
import { Activity, Calendar, Video, ChevronRight, CheckCircle2, Edit3, Save, Sparkles, Zap, ArrowRight, Upload } from 'lucide-react';

interface FighterProfileProps {
  results: AnalysisResults;
  onOpenPremium: () => void;
}

export const FighterProfile: React.FC<FighterProfileProps> = ({ results, onOpenPremium }) => {
  const { config, boxerAMetrics } = results;

  // Clé de stockage persistante
  const STORAGE_KEY = 'moveiq_custom_fighter_profile';

  // État local persistant des coordonnées du client
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback en cas d'erreur de parsing
      }
    }
    return {
      name: config.boxerA.name || 'Votre Nom',
      photoUrl: config.boxerA.avatarUrl || 'https://images.pexels.com/photos/5750963/pexels-photo-5750963.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
      category: config.sport === 'mma' ? 'Poids Welters (-77 kg)' : 'Poids Moyens (-72.5 kg)',
      height: '1m82',
      weight: config.sport === 'mma' ? '76.8 kg' : '71.9 kg',
      reach: '1m85',
      fightingStyle: config.boxerA.stance === 'southpaw' 
        ? 'Contreur / Fausse Patte' 
        : config.boxerA.stance === 'switch' 
        ? 'Hybride / Imprévisible' 
        : 'Orthodoxe / Cadrage & Puissance',
      record: {
        wins: 18,
        losses: 3,
        draws: 1,
        kos: 12
      }
    };
  });

  // Gestion du mode d'édition
  const [isEditing, setIsEditing] = useState(false);

  // Sauvegarde automatique dans le localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Liste fixe des combats pour la démonstration du palmarès
  const recentFights = [
    { opponent: 'David "The Bull" K.', event: 'Gala Move IQ Championship', result: 'VICTOIRE', method: 'TKO (Round 2)', date: '12 Nov 2025' },
    { opponent: 'Marcus Vance', event: 'Brussels Combat Night', result: 'VICTOIRE', method: 'Décision Unanime', date: '04 Sep 2025' },
    { opponent: 'Igor "Le Tsar" S.', event: 'European Sparring Elite', result: 'ÉGALITÉ', method: 'Décision Partagée', date: '18 Juin 2025' },
    { opponent: 'Liam "The Shadow" H.', event: 'Gala d\'Hiver', result: 'VICTOIRE', method: 'Soumission / KO', date: '30 Jan 2025' }
  ];

  // Gestion du changement de photo personnalisée
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev: typeof profile) => ({ ...prev, photoUrl: url }));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn select-none">
      
      {/* SECTION BANNIÈRE PREMIUM INTÉGRÉE */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Lueurs d'arrière-plan */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/30 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/10 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>Offre Exclusive Move IQ Premium</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Passez au niveau supérieur. Débloquez votre plein potentiel.
          </h2>

          <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
            Profitez d'un accès illimité à l'analyse vidéo par intelligence artificielle, au traçage de mouvement ultra-haute précision (120 FPS), à la comparaison mondiale Deep-Net v3 et à l'exportation complète de vos rapports.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-white/95">
            <span className="flex items-center gap-1">✓ Analyses illimitées</span>
            <span className="flex items-center gap-1">✓ Traçage 120 FPS</span>
            <span className="flex items-center gap-1">✓ Base 100k+ rounds</span>
            <span className="flex items-center gap-1">✓ Export PDF Pro</span>
          </div>
        </div>

        <button
          onClick={onOpenPremium}
          className="bg-slate-950 hover:bg-slate-900 text-orange-400 px-6 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 shadow-xl flex items-center gap-2 shrink-0 group border border-slate-800"
        >
          <Zap className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>S'abonner à Move IQ</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

      {/* En-tête du Profil avec Photo & Caractéristiques Personnalisables */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Bouton pour basculer en mode édition */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isEditing 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Enregistrer</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-orange-500" />
                <span>Modifier mon profil</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 pt-4 md:pt-0">
          
          {/* Avatar / Photo du Combattant */}
          <div className="relative group shrink-0">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-slate-950 bg-slate-950">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />

              {/* Calque de changement de photo si mode édition */}
              {isEditing && (
                <label className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer transition-all">
                  <Upload className="w-6 h-6 text-orange-500 mb-1" />
                  <span className="text-[10px] font-bold">Changer photo</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* Badge Certifié Move IQ */}
            {!isEditing && (
              <div className="absolute bottom-2 right-2 bg-slate-950 text-orange-400 p-1.5 rounded-xl border border-slate-800 shadow-md" title="Profil certifié par l'IA">
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
              </div>
            )}
          </div>

          {/* Informations Identitaires */}
          <div className="flex-1 text-center md:text-left space-y-3 w-full">
            
            {isEditing ? (
              /* FORMULAIRE D'ÉDITION */
              <div className="space-y-3 max-w-xl">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nom du Combattant</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-white font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Catégorie</label>
                    <input
                      type="text"
                      value={profile.category}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Style de combat</label>
                    <input
                      type="text"
                      value={profile.fightingStyle}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, fightingStyle: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Taille</label>
                    <input
                      type="text"
                      value={profile.height}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, height: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Poids</label>
                    <input
                      type="text"
                      value={profile.weight}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, weight: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Allonge</label>
                    <input
                      type="text"
                      value={profile.reach}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, reach: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Édition du palmarès */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="block text-[10px] font-bold text-orange-400 uppercase mb-1">Palmarès (Victoires / Défaites / Nuls / KOs)</label>
                  <div className="grid grid-cols-4 gap-2">
                    <input
                      type="number"
                      value={profile.record.wins}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, record: { ...prev.record, wins: Number(e.target.value) } }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-center text-emerald-400 font-bold"
                      title="Victoires"
                    />
                    <input
                      type="number"
                      value={profile.record.losses}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, record: { ...prev.record, losses: Number(e.target.value) } }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-center text-red-400 font-bold"
                      title="Défaites"
                    />
                    <input
                      type="number"
                      value={profile.record.draws}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, record: { ...prev.record, draws: Number(e.target.value) } }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-center text-slate-300 font-bold"
                      title="Nuls"
                    />
                    <input
                      type="number"
                      value={profile.record.kos}
                      onChange={(e) => setProfile((prev: typeof profile) => ({ ...prev, record: { ...prev.record, kos: Number(e.target.value) } }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-center text-orange-500 font-bold"
                      title="KOs"
                    />
                  </div>
                </div>

              </div>
            ) : (
              /* AFFICHAGE CLASSIQUE */
              <>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-bold bg-slate-950 px-3 py-1 rounded-lg text-orange-400 border border-slate-800">
                    {profile.category}
                  </span>
                  <span className="text-xs font-bold bg-slate-950 px-3 py-1 rounded-lg text-slate-300 border border-slate-800">
                    Style : {profile.fightingStyle}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {profile.name}
                </h1>

                {/* Mensurations & Records */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-slate-400 pt-1">
                  <div>Taille : <strong className="text-white">{profile.height}</strong></div>
                  <div>Poids : <strong className="text-white">{profile.weight}</strong></div>
                  <div>Allonge : <strong className="text-white">{profile.reach}</strong></div>
                  <div>Posture : <strong className="text-white capitalize">{config.boxerA.stance}</strong></div>
                </div>

                {/* Palmarès (Record) */}
                <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
                  <div className="bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-800/80 text-center">
                    <span className="text-slate-500 text-[9px] uppercase font-extrabold block">Victoires</span>
                    <span className="text-lg font-black text-emerald-400">{profile.record.wins}</span>
                  </div>

                  <div className="bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-800/80 text-center">
                    <span className="text-slate-500 text-[9px] uppercase font-extrabold block">Défaites</span>
                    <span className="text-lg font-black text-red-400">{profile.record.losses}</span>
                  </div>

                  <div className="bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-800/80 text-center">
                    <span className="text-slate-500 text-[9px] uppercase font-extrabold block">Égalités</span>
                    <span className="text-lg font-black text-slate-400">{profile.record.draws}</span>
                  </div>

                  <div className="bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-orange-500/20 text-center">
                    <span className="text-orange-400/80 text-[9px] uppercase font-extrabold block">KOs</span>
                    <span className="text-lg font-black text-orange-500">{profile.record.kos}</span>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>

      </div>

      {/* Grille : Statistiques globales & Historique des combats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Résumé des aptitudes Move IQ */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <span>Attributs de Combat IA</span>
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Vitesse & Réactivité</span>
                  <span className="text-white font-black">{boxerAMetrics.reactivityScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${boxerAMetrics.reactivityScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Puissance de Frappe</span>
                  <span className="text-white font-black">{boxerAMetrics.punchStats.powerScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${boxerAMetrics.punchStats.powerScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Technique & Cadrage</span>
                  <span className="text-white font-black">{boxerAMetrics.techniqueScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: `${boxerAMetrics.techniqueScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Endurance (Stamina)</span>
                  <span className="text-white font-black">{boxerAMetrics.staminaScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${boxerAMetrics.staminaScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Score de QI Ring</div>
            <div className="text-xl font-black text-orange-400 mt-0.5">{boxerAMetrics.ringIqScore} / 100</div>
          </div>

        </div>

        {/* Historique des combats (Fight History) */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 lg:col-span-2 flex flex-col justify-between">
          
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Historique Récent des Combats</span>
            </h3>

            <div className="space-y-3">
              {recentFights.map((fight, idx) => {
                const isWin = fight.result === 'VICTOIRE';
                const isDraw = fight.result === 'ÉGALITÉ';

                return (
                  <div key={idx} className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors">
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black shrink-0 ${
                        isWin 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : isDraw 
                          ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {fight.result}
                      </span>
                      
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">vs {fight.opponent}</h4>
                        <span className="text-[10px] text-slate-400">{fight.event}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                      <span className="text-slate-300 font-medium">{fight.method}</span>
                      <span className="text-slate-500 font-bold">{fight.date}</span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 font-semibold">
              Données de carrière synchronisées par Move IQ
            </span>
          </div>

        </div>

      </div>

      {/* Vidéos Récentes du Combattant */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Video className="w-4 h-4 text-orange-500" />
          <span>Vidéos & Séquences d'Analyse</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3 p-2">
            <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 relative shrink-0">
              <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80" alt="Vidéo" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Session Sparring MMA</h4>
              <span className="text-[9px] text-slate-400 block mt-0.5">Analyse IA Move IQ • 18s</span>
            </div>
          </div>

          <div className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3 p-2">
            <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 relative shrink-0">
              <img src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=300&q=80" alt="Vidéo" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Entraînement au Sac</h4>
              <span className="text-[9px] text-slate-400 block mt-0.5">Vitesse & Appuis • 15s</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
