export type AnalysisMode = 'solo' | 'duel' | 'palette';
export type CombatSport = 'boxing' | 'mma' | 'kickboxing' | 'sparring';

export type GloveColor = 'red' | 'blue' | 'black' | 'white' | 'gold' | 'neon';
export type Stance = 'orthodox' | 'southpaw' | 'switch';

export interface BoxerConfig {
  id: string;
  name: string;
  gloveColor: GloveColor;
  torsoColor: string; 
  shoesColor: string; 
  stance: Stance;
  avatarUrl?: string;
}

export interface AnalysisConfig {
  mode: AnalysisMode;
  sport: CombatSport;
  boxerA: BoxerConfig;
  boxerB?: BoxerConfig;
  videoUrl: string;
  videoTitle: string;
  duration?: number;
}

export interface PunchStats {
  directs: number;
  hooks: number;
  uppercuts: number;
  kicks?: number; // Pour le Kickboxing / MMA
  takedowns?: number; // Pour le MMA
  totalThrown: number;
  totalLanded: number;
  accuracy: number; // pourcentage
  avgSpeed: number; // km/h
  maxSpeed: number; // km/h
  powerScore: number; // 0-100
  timingScore: number; // 0-100 (capacité à frapper dans le bon tempo)
}

export interface DefensiveStats {
  dodges: number;
  blocks: number;
  guardDrops: number; // Erreurs défensives
  openingsDetected: number; // Ouvertures laissées à l'adversaire
  dodgeRate: number; // pourcentage
  footworkScore: number; // 0-100
  ringControl: number; // pourcentage de domination de l'espace du ring
}

export interface ImpactHeatmap {
  head: number; // pourcentage des frappes
  bodyLeft: number;
  bodyRight: number;
  legs?: number; // Pour MMA/Kickboxing
}

export interface PerformanceHistoryPoint {
  date: string;
  eventName: string;
  overallScore: number;
  speed: number;
  accuracy: number;
}

export interface BoxerMetrics {
  punchStats: PunchStats;
  defenseStats: DefensiveStats;
  staminaScore: number; // 0-100
  techniqueScore: number; // 0-100
  reactivityScore: number; // 0-100
  ringIqScore: number; // 0-100
  overallScore: number; // Score global du combattant
  heatmap: ImpactHeatmap;
  combos: {
    bestComboPunches: number;
    avgDuration: number;
    detectedPatterns: string[];
  };
  history: PerformanceHistoryPoint[];
}

export interface AnalysisResults {
  config: AnalysisConfig;
  boxerAMetrics: BoxerMetrics;
  boxerBMetrics?: BoxerMetrics;
  events: TimelineEvent[];
  recommendations: TrainingRecommendation[];
}

export interface TimelineEvent {
  id: string;
  time: number; // secondes
  boxerId: string;
  type: 'strike' | 'dodge' | 'alert' | 'combo' | 'opening';
  title: string;
  description: string;
  speed?: number;
  impact?: 'light' | 'medium' | 'heavy';
}

export type PriorityLevel = 'high' | 'medium' | 'low';

export interface TrainingRecommendation {
  id: string;
  boxerId: string;
  category: 'speed' | 'defense' | 'stamina' | 'power' | 'technique' | 'footwork' | 'timing';
  title: string;
  description: string;
  priority: PriorityLevel;
  duration: string;
  completed?: boolean;
}

export interface FighterProfileData {
  name: string;
  photoUrl: string;
  category: string;
  height: string;
  weight: string;
  reach?: string;
  fightingStyle: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
    kos: number;
  };
  metrics: BoxerMetrics;
  recentFights: {
    opponent: string;
    event: string;
    result: 'VICTOIRE' | 'DÉFAITE' | 'ÉGALITÉ';
    method: string;
    date: string;
  }[];
}
