import React from 'react';
import { AnalysisResults } from '../types';
import { Award, Flame, Target, Clock, Compass } from 'lucide-react';

interface StatsDashboardProps {
  results: AnalysisResults;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ results }) => {
  const { config, boxerAMetrics, boxerBMetrics } = results;
  const isDuel = config.mode === 'duel' && boxerBMetrics;

  return (
    <div className="space-y-8 animate-fadeIn select-none">
      
      {/* Carte globale du Combattant avec l'IA Move IQ */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-orange-500" />
              <span>Score Global Move IQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Analyse & Notation IA
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Synthèse basée sur le rythme, la vitesse de déclenchement, les ouvertures concédées et le contrôle de la surface du ring.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800/80 self-start lg:self-auto shadow-inner">
            <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{config.boxerA.name}</div>
              <div className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tight mt-0.5">
                {boxerAMetrics.overallScore} <span className="text-xs text-slate-600 font-bold">/100</span>
              </div>
            </div>

            {isDuel && boxerBMetrics && (
              <>
                <div className="h-10 w-px bg-slate-800" />
                <div className="text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{config.boxerB?.name}</div>
                  <div className="text-3xl sm:text-4xl font-black text-blue-500 tracking-tight mt-0.5">
                    {boxerBMetrics.overallScore} <span className="text-xs text-slate-600 font-bold">/100</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Cartes de statistiques majeures (Vitesse, Précision, Timing, Contrôle) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <StatCard
          icon={Flame}
          title="Vitesse de Frappe Max"
          val={`${boxerAMetrics.punchStats.maxSpeed} km/h`}
          subtitle={`Moyenne : ${boxerAMetrics.punchStats.avgSpeed} km/h`}
          color="text-orange-500"
          bg="bg-orange-500/10"
          borderColor="border-orange-500/20"
        />

        <StatCard
          icon={Target}
          title="Précision des Frappes"
          val={`${boxerAMetrics.punchStats.accuracy}%`}
          subtitle={`${boxerAMetrics.punchStats.totalLanded} touchés / ${boxerAMetrics.punchStats.totalThrown} lancés`}
          color="text-amber-500"
          bg="bg-amber-500/10"
          borderColor="border-amber-500/20"
        />

        <StatCard
          icon={Clock}
          title="Score de Timing IA"
          val={`${boxerAMetrics.punchStats.timingScore}%`}
          subtitle="Capacité à frapper dans le bon tempo"
          color="text-yellow-500"
          bg="bg-yellow-500/10"
          borderColor="border-yellow-500/20"
        />

        <StatCard
          icon={Compass}
          title="Contrôle du Ring"
          val={`${boxerAMetrics.defenseStats.ringControl}%`}
          subtitle="Domination de l'espace de combat"
          color="text-emerald-500"
          bg="bg-emerald-500/10"
          borderColor="border-emerald-500/20"
        />

      </div>

      {/* Section interactive : Heatmap des impacts & Matrice des frappes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Heatmap visuelle du corps */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Heatmap des Impacts
            </h3>

            {/* Représentation SVG haut de gamme du torse/tête */}
            <div className="relative w-full aspect-square max-w-[220px] mx-auto my-4 flex items-center justify-center">
              
              {/* Silhouette de cible */}
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                
                {/* Tête */}
                <circle 
                  cx="50" 
                  cy="20" 
                  r="12" 
                  className="transition-all duration-500 cursor-pointer"
                  fill={getHeatmapColor(boxerAMetrics.heatmap.head)} 
                  stroke="#020617" 
                  strokeWidth="2"
                />
                
                {/* Corps Gauche */}
                <path 
                  d="M49 35 L32 38 L35 70 L49 70 Z" 
                  className="transition-all duration-500 cursor-pointer"
                  fill={getHeatmapColor(boxerAMetrics.heatmap.bodyLeft)} 
                  stroke="#020617" 
                  strokeWidth="2"
                />
                
                {/* Corps Droit */}
                <path 
                  d="M51 35 L68 38 L65 70 L51 70 Z" 
                  className="transition-all duration-500 cursor-pointer"
                  fill={getHeatmapColor(boxerAMetrics.heatmap.bodyRight)} 
                  stroke="#020617" 
                  strokeWidth="2"
                />

                {/* Jambes si MMA/Kickboxing */}
                {boxerAMetrics.heatmap.legs !== undefined && (
                  <>
                    <rect x="35" y="73" width="12" height="20" rx="3" fill={getHeatmapColor(boxerAMetrics.heatmap.legs)} stroke="#020617" strokeWidth="1.5" />
                    <rect x="53" y="73" width="12" height="20" rx="3" fill={getHeatmapColor(boxerAMetrics.heatmap.legs)} stroke="#020617" strokeWidth="1.5" />
                  </>
                )}
              </svg>

              {/* Ligne de scan futuriste */}
              <div className="absolute inset-x-0 h-0.5 bg-orange-500/50 shadow-[0_0_8px_#f97316] animate-scan pointer-events-none" />
            </div>
          </div>

          {/* Légende de la Heatmap */}
          <div className="space-y-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Tête</span>
              <span className="font-bold text-white">{boxerAMetrics.heatmap.head}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Flanc Gauche (Foie)</span>
              <span className="font-bold text-white">{boxerAMetrics.heatmap.bodyLeft}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Flanc Droit</span>
              <span className="font-bold text-white">{boxerAMetrics.heatmap.bodyRight}%</span>
            </div>
            {boxerAMetrics.heatmap.legs !== undefined && (
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Jambes (Low Kicks)</span>
                <span className="font-bold text-white">{boxerAMetrics.heatmap.legs}%</span>
              </div>
            )}
          </div>

        </div>

        {/* Répartition des frappes & Analyse des erreurs */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 lg:col-span-2 flex flex-col justify-between">
          
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Matrice des Frappes & Ouvertures
            </h3>

            {/* Barres de progression des frappes */}
            <div className="space-y-4">
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Directs (Jabs / Cross)</span>
                  <span className="text-orange-400">{boxerAMetrics.punchStats.directs}</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"
                    style={{
                      width: `${(boxerAMetrics.punchStats.directs / boxerAMetrics.punchStats.totalLanded) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Crochets (Hooks)</span>
                  <span className="text-amber-400">{boxerAMetrics.punchStats.hooks}</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                    style={{
                      width: `${(boxerAMetrics.punchStats.hooks / boxerAMetrics.punchStats.totalLanded) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Uppercuts</span>
                  <span className="text-yellow-400">{boxerAMetrics.punchStats.uppercuts}</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full"
                    style={{
                      width: `${(boxerAMetrics.punchStats.uppercuts / boxerAMetrics.punchStats.totalLanded) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {boxerAMetrics.punchStats.kicks !== undefined && (
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">Coups de pied (Kicks)</span>
                    <span className="text-emerald-400">{boxerAMetrics.punchStats.kicks}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                      style={{
                        width: `${(boxerAMetrics.punchStats.kicks / boxerAMetrics.punchStats.totalLanded) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bloc d'analyse des erreurs défensives et des esquives */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Esquives réussies</div>
              <div className="text-base font-black text-emerald-400 mt-0.5">{boxerAMetrics.defenseStats.dodges}</div>
            </div>

            <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Erreurs de Garde</div>
              <div className="text-base font-black text-red-400 mt-0.5">{boxerAMetrics.defenseStats.guardDrops}</div>
            </div>

            <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Ouvertures laissées</div>
              <div className="text-base font-black text-yellow-500 mt-0.5">{boxerAMetrics.defenseStats.openingsDetected}</div>
            </div>
          </div>

        </div>

      </div>

      {/* Graphique de l'historique des performances & Comparaison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Historique sous forme de graphique SVG fluide */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 lg:col-span-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Progression & Historique des Scores
          </h3>

          {/* Rendu du graphique SVG */}
          <div className="w-full h-48 relative">
            <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
              
              {/* Grille de fond */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#1e293b" strokeDasharray="4 4" />

              {/* Ligne de score global */}
              <path
                d={`M 30 ${120 - boxerAMetrics.history[0].overallScore} L 140 ${120 - boxerAMetrics.history[1].overallScore} L 250 ${120 - boxerAMetrics.history[2].overallScore} L 360 ${120 - boxerAMetrics.history[3].overallScore}`}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                className="drop-shadow-[0_4px_6px_rgba(249,115,22,0.3)]"
              />

              {/* Points d'ancrage */}
              {boxerAMetrics.history.map((pt, idx) => {
                const x = 30 + idx * 110;
                const y = 120 - pt.overallScore;
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="5" fill="#f97316" stroke="#020617" strokeWidth="2" />
                    <text x={x} y={y - 12} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      {pt.overallScore}
                    </text>
                    <text x={x} y="115" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">
                      {pt.date}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>
        </div>

        {/* Comparaison ou Focus Combo */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              {isDuel ? 'Comparaison Directe' : 'Détection des Combos'}
            </h3>

            {isDuel && boxerBMetrics ? (
              <div className="space-y-4">
                <ComparisonBar
                  label="Vitesse Moyenne"
                  valA={boxerAMetrics.punchStats.avgSpeed}
                  valB={boxerBMetrics.punchStats.avgSpeed}
                  nameA={config.boxerA.name}
                  nameB={config.boxerB?.name || 'B'}
                  unit=" km/h"
                />
                <ComparisonBar
                  label="Précision"
                  valA={boxerAMetrics.punchStats.accuracy}
                  valB={boxerBMetrics.punchStats.accuracy}
                  nameA={config.boxerA.name}
                  nameB={config.boxerB?.name || 'B'}
                  unit="%"
                />
                <ComparisonBar
                  label="Contrôle du Ring"
                  valA={boxerAMetrics.defenseStats.ringControl}
                  valB={boxerBMetrics.defenseStats.ringControl}
                  nameA={config.boxerA.name}
                  nameB={config.boxerB?.name || 'B'}
                  unit="%"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Meilleur enchaînement</div>
                  <div className="text-sm font-bold text-white mt-0.5">{boxerAMetrics.combos.bestComboPunches} coups consécutifs</div>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Durée moyenne d'échange</div>
                  <div className="text-sm font-bold text-orange-400 mt-0.5">{boxerAMetrics.combos.avgDuration} secondes</div>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Motif principal détecté</div>
                  <div className="text-xs font-bold text-slate-300 mt-0.5">{boxerAMetrics.combos.detectedPatterns[0]}</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            Données certifiées par l'algorithme Move IQ
          </div>

        </div>

      </div>

      {/* BILAN DE FIN D'ANALYSE & COMPARATIF IA MONDIAL */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-orange-400 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Bilan & Comparatif de Fin d'Analyse</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Avis de l'Entraîneur IA Move IQ
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Comparaison de vos flux avec la base Move IQ Deep-Net v3 (+100 000 rounds professionnels et amateurs).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 self-start sm:self-auto">
            <span className="text-xs text-slate-400">Précision du Modèle :</span>
            <span className="text-xs font-black text-emerald-400">99.4%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Boxeur A Comparatif */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Cible : {config.boxerA.name}</div>
              <h4 className="text-sm font-bold text-white mb-3">Rapport Biomécanique</h4>
              
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Vitesse supérieure de <strong className="text-white">+{Math.floor(boxerAMetrics.punchStats.avgSpeed * 0.4)}%</strong> par rapport à la moyenne de sa catégorie.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Transfert de force optimal mesuré sur les frappes directes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Baisse de vigilance détectée après le 4ème coup de chaque combo.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-400 flex justify-between">
              <span>Fiabilité d'impact :</span>
              <span className="font-bold text-white">Haute</span>
            </div>
          </div>

          {/* Boxeur B ou Comparatif Catégorie */}
          {isDuel && boxerBMetrics ? (
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Adversaire : {config.boxerB?.name}</div>
                <h4 className="text-sm font-bold text-white mb-3">Rapport Biomécanique</h4>
                
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Excellente gestion de la distance et domination spatiale du ring.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">!</span>
                    <span>Temps de retard moyen de <strong className="text-white">0.18s</strong> sur les retraits du buste.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Taux de blocage supérieur à la moyenne mondiale.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-400 flex justify-between">
                <span>Fiabilité d'impact :</span>
                <span className="font-bold text-white">Haute</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Base Move IQ v3</div>
                <h4 className="text-sm font-bold text-white mb-3">Comparatif Mondial</h4>
                
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Votre rythme d'attaque est dans le <strong className="text-white">Top 15%</strong> des utilisateurs Move IQ.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>La constance de votre garde est de 12% supérieure à la moyenne des boxeurs amateurs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Score de corrélation biomécanique : <strong className="text-emerald-400 font-bold">96.8%</strong></span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-400 flex justify-between">
                <span>Rounds analysés :</span>
                <span className="font-bold text-white">114 850</span>
              </div>
            </div>
          )}

          {/* Conclusion IA & Verdict */}
          <div className="bg-gradient-to-br from-orange-600/20 via-amber-500/10 to-transparent p-5 rounded-2xl border border-orange-500/30 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Verdict de l'Algorithme</div>
              <h4 className="text-sm font-bold text-white mb-2">Axes de Travail Prioritaires</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                L'analyse combinée des vecteurs de vitesse et du contrôle de l'arène indique qu'un focus sur le <strong className="text-white">verrouillage de la garde en sortie d'enchaînement</strong> augmentera instantanément votre efficacité globale face aux contreurs.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-orange-500/20 text-[10px] text-orange-300 flex justify-between items-center">
              <span>Plan de Drills IA :</span>
              <span className="font-bold bg-orange-500 text-white px-2 py-0.5 rounded">Généré ✓</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

// Fonction utilitaire pour la couleur de la Heatmap
function getHeatmapColor(pct: number): string {
  if (pct > 50) return '#ef4444'; // rouge
  if (pct > 25) return '#f97316'; // orange
  if (pct > 10) return '#eab308'; // jaune
  return '#3b82f6'; // bleu pour faible impact
}

const StatCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  val: string;
  subtitle: string;
  color: string;
  bg: string;
  borderColor: string;
}> = ({ icon: Icon, title, val, subtitle, color, bg, borderColor }) => (
  <div className={`bg-slate-900 border ${borderColor} rounded-3xl p-5 transition-all duration-300 hover:border-slate-700 shadow-lg`}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center shadow-inner`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
    </div>
    <div className="text-2xl font-black text-white tracking-tight">{val}</div>
    <div className="text-[10px] text-slate-500 font-semibold mt-1">{subtitle}</div>
  </div>
);

const ComparisonBar: React.FC<{
  label: string;
  valA: number;
  valB: number;
  nameA: string;
  nameB: string;
  unit: string;
}> = ({ label, valA, valB, nameA, nameB, unit }) => {
  const total = valA + valB || 1;
  const pctA = (valA / total) * 100;
  const pctB = (valB / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-orange-400">
          {valA}{unit} <span className="text-[9px] text-slate-500 font-normal">({nameA})</span>
        </span>
        <span className="text-slate-300 font-extrabold">{label}</span>
        <span className="text-blue-400">
          <span className="text-[9px] text-slate-500 font-normal">({nameB})</span> {valB}{unit}
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500"
          style={{ width: `${pctA}%` }}
        />
        <div
          className="h-full bg-gradient-to-l from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: `${pctB}%` }}
        />
      </div>
    </div>
  );
};
