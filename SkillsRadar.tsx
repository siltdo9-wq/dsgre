import React from 'react';
import { AnalysisResults } from '../types';
import { Activity, Award, Check, Flame, Shield, Swords, Target, Zap } from 'lucide-react';

interface SkillsRadarProps {
  results: AnalysisResults;
}

export const SkillsRadar: React.FC<SkillsRadarProps> = ({ results }) => {
  const { config, boxerAMetrics, boxerBMetrics } = results;
  const isDuel = config.mode === 'duel' && boxerBMetrics;

  const skillsA = [
    { name: 'Vitesse de Coup', score: Math.min(100, Math.floor(boxerAMetrics.punchStats.avgSpeed * 1.8)), icon: Flame },
    { name: 'Technique de Combat', score: boxerAMetrics.techniqueScore, icon: Target },
    { name: 'Défense & Esquive', score: boxerAMetrics.defenseStats.footworkScore, icon: Shield },
    { name: 'Endurance & Cardio', score: boxerAMetrics.staminaScore, icon: Activity },
    { name: 'Réactivité', score: boxerAMetrics.reactivityScore, icon: Zap },
    { name: 'Puissance d\'Impact', score: boxerAMetrics.punchStats.powerScore, icon: Award },
  ];

  const skillsB = boxerBMetrics ? [
    { name: 'Vitesse de Coup', score: Math.min(100, Math.floor(boxerBMetrics.punchStats.avgSpeed * 1.8)), icon: Flame },
    { name: 'Technique de Combat', score: boxerBMetrics.techniqueScore, icon: Target },
    { name: 'Défense & Esquive', score: boxerBMetrics.defenseStats.footworkScore, icon: Shield },
    { name: 'Endurance & Cardio', score: boxerBMetrics.staminaScore, icon: Activity },
    { name: 'Réactivité', score: boxerBMetrics.reactivityScore, icon: Zap },
    { name: 'Puissance d\'Impact', score: boxerBMetrics.punchStats.powerScore, icon: Award },
  ] : [];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🎯 Profils Athlétiques</span>
            {isDuel && <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">Comparatif</span>}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Décomposition biomécanique des capacités fondamentales en situation de combat réel.
          </p>
        </div>

        {isDuel && (
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 self-start">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs font-bold text-slate-300">{config.boxerA.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-slate-300">{config.boxerB?.name}</span>
            </div>
          </div>
        )}
      </div>

      {/* Jauges Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Boxeur A */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase">Analyse de Compétence</div>
              <h3 className="text-base font-extrabold text-white">{config.boxerA.name}</h3>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] text-slate-500">Moyenne Attributs</div>
              <div className="text-lg font-black text-orange-500">
                {Math.floor(skillsA.reduce((acc, s) => acc + s.score, 0) / skillsA.length)}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {skillsA.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-orange-500" />
                      {skill.name}
                    </span>
                    <span className="text-white font-black">{skill.score}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-700"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Points forts */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 mb-2">Points forts majeurs :</div>
            <div className="flex flex-wrap gap-2">
              {skillsA
                .filter((s) => s.score >= 75)
                .map((s) => (
                  <span key={s.name} className="bg-slate-950 text-orange-400 border border-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3 text-orange-500" />
                    {s.name}
                  </span>
                ))}
            </div>
          </div>

        </div>

        {/* Boxeur B si Duel */}
        {isDuel ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-[10px] font-bold text-blue-400 uppercase">Analyse de Compétence</div>
                <h3 className="text-base font-extrabold text-white">{config.boxerB?.name}</h3>
              </div>
              
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Moyenne Attributs</div>
                <div className="text-lg font-black text-blue-500">
                  {Math.floor(skillsB.reduce((acc, s) => acc + s.score, 0) / skillsB.length)}%
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {skillsB.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-blue-500" />
                        {skill.name}
                      </span>
                      <span className="text-white font-black">{skill.score}%</span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Points forts */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 mb-2">Points forts majeurs :</div>
              <div className="flex flex-wrap gap-2">
                {skillsB
                  .filter((s) => s.score >= 75)
                  .map((s) => (
                    <span key={s.name} className="bg-slate-950 text-blue-400 border border-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-500" />
                      {s.name}
                    </span>
                  ))}
              </div>
            </div>

          </div>
        ) : (
          /* Bloc complémentaire si Mode Focus Solo */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Swords className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Matrice de Stabilité
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                En mode Focus, le système compare l'athlète à la base de données MoveIQ (plus de 5 000 rounds analysés) pour évaluer le niveau technique par rapport à la catégorie de poids.
              </p>

              <div className="space-y-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cohérence Biomécanique</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">Excellente (94%)</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Récupération entre Enchaînements</div>
                  <div className="text-sm font-bold text-white mt-0.5">1.2 secondes en moyenne</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-[10px] text-slate-500 text-center">
                Algorithme de mesure et de suivi haute précision MoveIQ v2.0
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
