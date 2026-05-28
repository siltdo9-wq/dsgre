import { AnalysisConfig, AnalysisResults, BoxerMetrics, TimelineEvent, TrainingRecommendation, CombatSport } from '../types';

export function generateAnalysisResults(config: AnalysisConfig): AnalysisResults {
  const isDuel = config.mode === 'duel';
  const sport = config.sport;

  // Base metrics for Boxer A
  const boxerAMetrics = generateMetricsForBoxer(config.boxerA.stance, config.boxerA.gloveColor, 78, sport);

  // Base metrics for Boxer B if applicable
  let boxerBMetrics: BoxerMetrics | undefined = undefined;
  if (isDuel && config.boxerB) {
    boxerBMetrics = generateMetricsForBoxer(config.boxerB.stance, config.boxerB.gloveColor, 72, sport);
  }

  // Generate real-time timeline events based on the configured boxers ensuring non-contradiction
  const events = generateTimelineEvents(config, boxerAMetrics, boxerBMetrics);

  // Generate smart AI training recommendations
  const recommendations = generateRecommendations(config, boxerAMetrics, boxerBMetrics);

  return {
    config,
    boxerAMetrics,
    boxerBMetrics,
    events,
    recommendations,
  };
}

function generateMetricsForBoxer(stance: string, gloveColor: string, baseScore: number, sport: CombatSport): BoxerMetrics {
  // Déterminisme par rapport à la couleur et la posture pour garantir la cohérence d'un appel à l'autre
  const stanceModifier = stance === 'southpaw' ? 3 : stance === 'switch' ? 5 : 0;
  const colorHash = gloveColor.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const mod = (colorHash % 13) - 6; // -6 à +6

  // Capacités de l'IA: Vitesse, Précision, Timing, Ouvertures, Contrôle du ring
  const speed = Math.min(98, Math.max(65, baseScore + mod + stanceModifier));
  const power = Math.min(96, Math.max(68, 84 - mod));
  const technique = Math.min(95, Math.max(70, 80 + (mod / 2)));
  const stamina = Math.min(94, Math.max(65, 78 - stanceModifier));
  const reactivity = Math.min(97, Math.max(72, speed - 2));
  const ringIq = Math.min(96, Math.max(68, technique + 3));

  // Règle de cohérence stricte: Plus la technique est haute, plus la précision et le timing sont excellents.
  const timingScore = Math.min(98, Math.max(60, Math.floor(technique * 0.9 + reactivity * 0.1)));

  // Volumes de frappe
  const totalThrown = Math.floor(110 + (speed * 0.9) + (mod * 2));
  const accuracy = Math.min(82, Math.max(45, 52 + (technique * 0.25) - (speed * 0.05)));
  const totalLanded = Math.floor(totalThrown * (accuracy / 100));

  // Répartition cohérente des coups selon le sport
  let directs = Math.floor(totalLanded * 0.50);
  let hooks = Math.floor(totalLanded * 0.30);
  let uppercuts = totalLanded - directs - hooks;
  let kicks = 0;
  let takedowns = 0;

  if (sport === 'kickboxing' || sport === 'mma') {
    kicks = Math.floor(totalLanded * 0.25);
    directs = Math.floor(totalLanded * 0.40);
    hooks = Math.floor(totalLanded * 0.25);
    uppercuts = totalLanded - directs - hooks - kicks;
  }

  if (sport === 'mma') {
    takedowns = Math.floor((ringIq / 100) * 4);
  }

  const avgSpeed = Math.floor(34 + (speed * 0.28));
  const maxSpeed = Math.floor(avgSpeed * 1.38);

  // Défense et Ouvertures
  const dodges = Math.floor(18 + (reactivity * 0.28));
  const blocks = Math.floor(22 + (technique * 0.22));
  const guardDrops = Math.max(1, Math.floor(10 - (stamina * 0.08)));
  const openingsDetected = Math.max(1, Math.floor(12 - (ringIq * 0.1)));
  const dodgeRate = Math.min(88, Math.max(48, Math.floor(52 + (reactivity * 0.32))));

  // Contrôle du ring (mesure de la domination spatiale)
  const ringControl = Math.min(92, Math.max(40, Math.floor(50 + (ringIq * 0.3) + (stamina * 0.1))));

  const overallScore = Math.floor(
    (speed * 0.2) +
    (power * 0.15) +
    (technique * 0.2) +
    (stamina * 0.15) +
    (reactivity * 0.15) +
    (ringIq * 0.15)
  );

  // Heatmap cohérente avec la garde adverse (plus de crochets = plus de touches latérales)
  const head = Math.floor(55 + (directs / totalLanded) * 15);
  const bodyLeft = Math.floor(20 + (hooks / totalLanded) * 10);
  const bodyRight = Math.max(5, 100 - head - bodyLeft);

  // Combos détectés
  const bestComboPunches = Math.floor(4 + (speed * 0.06));
  const avgDuration = parseFloat((1.6 + (stamina * 0.015)).toFixed(1));
  const detectedPatterns = [
    'Jab - Cross - Crochet bras avant',
    sport === 'kickboxing' || sport === 'mma' ? 'Cross - Crochet - Low Kick' : 'Double Jab - Direct du droit',
    'Esquive rotative - Riposte Uppercut'
  ];

  // Historique de performance réaliste
  const history = [
    { date: 'Il y a 3 mois', eventName: 'Sparring Test #1', overallScore: overallScore - 6, speed: speed - 4, accuracy: accuracy - 5 },
    { date: 'Il y a 2 mois', eventName: 'Session Intensive', overallScore: overallScore - 3, speed: speed - 2, accuracy: accuracy - 2 },
    { date: 'Le mois dernier', eventName: 'Gala / Compétition', overallScore: overallScore - 1, speed: speed - 1, accuracy: accuracy - 1 },
    { date: 'Aujourd\'hui', eventName: 'Analyse Move IQ', overallScore, speed, accuracy: Math.floor(accuracy) },
  ];

  return {
    punchStats: {
      directs,
      hooks,
      uppercuts,
      kicks: sport === 'kickboxing' || sport === 'mma' ? kicks : undefined,
      takedowns: sport === 'mma' ? takedowns : undefined,
      totalThrown,
      totalLanded,
      accuracy: Math.floor(accuracy),
      avgSpeed,
      maxSpeed,
      powerScore: power,
      timingScore,
    },
    defenseStats: {
      dodges,
      blocks,
      guardDrops,
      openingsDetected,
      dodgeRate,
      footworkScore: Math.min(96, Math.max(62, Math.floor(speed * 0.9 + 4))),
      ringControl,
    },
    staminaScore: stamina,
    techniqueScore: Math.floor(technique),
    reactivityScore: Math.floor(reactivity),
    ringIqScore: Math.floor(ringIq),
    overallScore,
    heatmap: {
      head,
      bodyLeft,
      bodyRight,
      legs: sport === 'kickboxing' || sport === 'mma' ? Math.floor(kicks * 0.8) : undefined,
    },
    combos: {
      bestComboPunches,
      avgDuration,
      detectedPatterns,
    },
    history,
  };
}

function generateTimelineEvents(config: AnalysisConfig, metricsA: BoxerMetrics, metricsB?: BoxerMetrics): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const bA = config.boxerA;
  const bB = config.boxerB;

  // Événement 1 : Frappe mesurée
  events.push({
    id: 'ev-1',
    time: 2.5,
    boxerId: bA.id,
    type: 'strike',
    title: `Frappe chirurgicale (Vitesse : ${metricsA.punchStats.maxSpeed - 5} km/h)`,
    description: `${bA.name} déclenche une attaque explosive avec un excellent transfert de poids.`,
    speed: metricsA.punchStats.maxSpeed - 5,
    impact: 'medium',
  });

  if (bB && metricsB) {
    // Événement 2 : Esquive
    events.push({
      id: 'ev-2',
      time: 4.2,
      boxerId: bB.id,
      type: 'dodge',
      title: 'Esquive & Contrôle du Ring',
      description: `${bB.name} utilise un pivot fluide pour sortir de l'axe et verrouiller le centre du ring.`,
    });

    // Événement 3 : Ouverture détectée
    events.push({
      id: 'ev-3',
      time: 7.8,
      boxerId: bB.id,
      type: 'opening',
      title: 'Ouverture Défensive Détectée',
      description: `Le bras avant de ${bB.name} descend pendant la préparation, offrant une fenêtre de riposte de 0.4s.`,
    });
  }

  // Événement 4 : Combo
  events.push({
    id: 'ev-4',
    time: 11.0,
    boxerId: bA.id,
    type: 'combo',
    title: `Combo fluide : ${metricsA.combos.detectedPatterns[0]}`,
    description: `Enchaînement à haute vitesse. Le timing d'impact est mesuré à ${metricsA.punchStats.timingScore}% de perfection.`,
    speed: metricsA.punchStats.avgSpeed + 8,
    impact: 'heavy',
  });

  // Événement 5 : Alerte
  events.push({
    id: 'ev-5',
    time: 14.5,
    boxerId: bA.id,
    type: 'alert',
    title: 'Erreur Défensive : Garde basse en sortie',
    description: `Attention : le gant arrière n'est pas ramené au menton après le retrait. Risque de contre direct.`,
  });

  return events.sort((a, b) => a.time - b.time);
}

function generateRecommendations(
  config: AnalysisConfig,
  metricsA: BoxerMetrics,
  metricsB?: BoxerMetrics
): TrainingRecommendation[] {
  const recs: TrainingRecommendation[] = [];
  const bA = config.boxerA;

  // Recommandation 1 : Défense
  if (metricsA.defenseStats.guardDrops > 3) {
    recs.push({
      id: 'rec-a1',
      boxerId: bA.id,
      category: 'defense',
      title: 'Verrouillage de la Garde en Retrait',
      description: 'L\'IA a détecté une baisse systématique du gant arrière après l\'envoi du jab. Travaillez avec un gant collé à la pommette lors des retraits.',
      priority: 'high',
      duration: '15 min / session',
    });
  }

  // Recommandation 2 : Timing & Ouvertures
  if (metricsA.punchStats.timingScore < 80) {
    recs.push({
      id: 'rec-a2',
      boxerId: bA.id,
      category: 'timing',
      title: 'Exploitation des Ouvertures & Timing',
      description: 'Vos frappes sont parfois en décalage avec le rythme adverse. Pratiquez le "Flicker Jab" et les contres instantanés sur le sac double élastique.',
      priority: 'high',
      duration: '3 rounds',
    });
  }

  // Recommandation 3 : Précision
  recs.push({
    id: 'rec-a3',
    boxerId: bA.id,
    category: 'technique',
    title: 'Cadrage et Précision des Directs',
    description: `Pour maximiser votre score de précision (${metricsA.punchStats.accuracy}%), stabilisez votre pied avant au moment de l'impact pour éviter la déperdition d'énergie.`,
    priority: metricsA.punchStats.accuracy < 65 ? 'high' : 'medium',
    duration: '4 rounds',
  });

  // Recommandation 4 : Vitesse
  recs.push({
    id: 'rec-a4',
    boxerId: bA.id,
    category: 'speed',
    title: 'Explosivité des Combinaisons',
    description: 'Vos enchaînements manquent légèrement de vitesse sur le 3ème coup. Faites des séries de shadow-boxing avec des haltères de 1kg.',
    priority: metricsA.punchStats.avgSpeed < 40 ? 'medium' : 'low',
    duration: '10 min',
  });

  // Recommandation pour le Boxeur B si Duel
  if (config.mode === 'duel' && config.boxerB && metricsB) {
    const bB = config.boxerB;
    recs.push({
      id: 'rec-b1',
      boxerId: bB.id,
      category: 'footwork',
      title: 'Contrôle de l\'Espace du Ring',
      description: `Votre domination spatiale est mesurée à ${metricsB.defenseStats.ringControl}%. Utilisez des pas de côté (side-steps) pour obliger l'adversaire à tourner vers sa main forte.`,
      priority: 'high',
      duration: '15 min',
    });
  }

  return recs;
}
