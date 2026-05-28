import React, { useState } from 'react';
import { AnalysisResults, PriorityLevel } from '../types';
import { Check, ClipboardList, Copy, Dumbbell, Flame, Shield, Sparkles } from 'lucide-react';

interface TrainingPlanProps {
  results: AnalysisResults;
}

export const TrainingPlan: React.FC<TrainingPlanProps> = ({ results }) => {
  const { config, recommendations } = results;

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | PriorityLevel>('all');
  const [copied, setCopied] = useState(false);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter recommendations
  const filteredRecs = recommendations.filter((rec) => {
    if (filter === 'all') return true;
    return rec.priority === filter;
  });

  const handleCopyPlan = () => {
    const text = `🥊 PLAN D'ENTRAÎNEMENT MoveIQ | ${config.videoTitle}
Boxeur : ${config.boxerA.name}

` + recommendations.map((r) => {
      const prio = r.priority === 'high' ? '🔴 URGENT' : r.priority === 'medium' ? '🟠 IMPORTANT' : '🟢 NORMAL';
      return `${prio} : ${r.title}\nCatégorie : ${r.category.toUpperCase()} | Durée conseillée : ${r.duration}\nObjectif : ${r.description}\n`;
    }).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {});
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Coaching sur Mesure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Plan d'Amélioration & Drills
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exercices ciblés prescrits par l'algorithme pour corriger les failles biomécaniques.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleCopyPlan}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Plan Copié ✓' : 'Exporter le Plan'}</span>
          </button>
        </div>
      </div>

      {/* Barre de Filtres */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 max-w-fit">
        
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-slate-800 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tous ({recommendations.length})
        </button>

        <button
          onClick={() => setFilter('high')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            filter === 'high'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-slate-400 hover:text-red-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Urgent ({recommendations.filter((r) => r.priority === 'high').length})
        </button>

        <button
          onClick={() => setFilter('medium')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            filter === 'medium'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-amber-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Important ({recommendations.filter((r) => r.priority === 'medium').length})
        </button>

        <button
          onClick={() => setFilter('low')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            filter === 'low'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-emerald-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Normal ({recommendations.filter((r) => r.priority === 'low').length})
        </button>

      </div>

      {/* Liste des Recommandations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {filteredRecs.map((rec) => {
          const isCompleted = completedIds.includes(rec.id);
          
          // Déterminer la couleur de priorité
          const isHigh = rec.priority === 'high';
          const isMed = rec.priority === 'medium';

          const prioText = isHigh ? 'URGENT' : isMed ? 'IMPORTANT' : 'NORMAL';
          const prioBg = isHigh
            ? 'bg-red-500/10 text-red-400 border-red-500/30'
            : isMed
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

          const prioBadgeDot = isHigh ? 'bg-red-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500';

          // Icône par catégorie
          const getCatIcon = () => {
            if (rec.category === 'defense') return Shield;
            if (rec.category === 'speed') return Flame;
            return Dumbbell;
          };

          const CatIcon = getCatIcon();

          // Nom du boxeur associé
          const boxerName = rec.boxerId === config.boxerA.id ? config.boxerA.name : config.boxerB?.name || 'Boxeur';

          return (
            <div
              key={rec.id}
              className={`bg-slate-900 border rounded-2xl p-6 transition-all relative flex flex-col justify-between ${
                isCompleted
                  ? 'border-emerald-500/30 bg-slate-950/40 opacity-70'
                  : 'border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              <div>
                
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded border flex items-center gap-1 ${prioBg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${prioBadgeDot}`} />
                      {prioText}
                    </span>

                    <span className="text-xs text-slate-500 font-bold">
                      {rec.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Bouton pour marquer comme complété */}
                  <button
                    onClick={() => toggleComplete(rec.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-600 hover:text-white'
                    }`}
                    title={isCompleted ? 'Marquer comme non fait' : 'Marquer comme fait'}
                  >
                    <Check className={`w-3.5 h-3.5 ${isCompleted ? 'stroke-[3]' : ''}`} />
                  </button>

                </div>

                {/* Titre et description */}
                <h3 className={`text-base font-extrabold text-white flex items-center gap-2 ${
                  isCompleted ? 'line-through text-slate-400' : ''
                }`}>
                  <CatIcon className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{rec.title}</span>
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {rec.description}
                </p>

              </div>

              {/* Pied de carte */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                
                <div className="flex items-center gap-1.5 text-slate-400">
                  <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                  <span>Cible : <strong className="text-slate-300">{boxerName}</strong></span>
                </div>

                <div className="font-bold text-orange-400 bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">
                  ⏱️ {rec.duration}
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bloc d'astuce de progression */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">Comment utiliser ce plan ?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Intégrez en priorité les exercices marqués comme <strong className="text-red-400">URGENT</strong> dès votre prochaine séance. Repassez vos vidéos dans MoveIQ après 2 semaines pour mesurer l'amélioration chiffrée de vos statistiques.
          </p>
        </div>
      </div>

    </div>
  );
};
