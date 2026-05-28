import { AnalysisConfig } from '../types';

export interface SampleVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  thumbnail: string;
  defaultConfig: AnalysisConfig;
}

export const SAMPLE_VIDEOS: SampleVideo[] = [
  {
    id: 'sample-1',
    title: 'Combat Pro : Masterclass Tactique',
    description: 'Analyse en mode Duel de deux combattants élites. Focus sur la gestion de la distance, la vitesse des contres, le contrôle du ring et la détection d\'ouvertures.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-practicing-his-punches-in-the-ring-40692-large.mp4',
    duration: 24,
    thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
    defaultConfig: {
      mode: 'duel',
      sport: 'boxing',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-practicing-his-punches-in-the-ring-40692-large.mp4',
      videoTitle: 'Combat Pro : Masterclass Tactique',
      boxerA: {
        id: 'boxer-a',
        name: 'Alex "The Flash" Mercer',
        gloveColor: 'red',
        torsoColor: 'Short Noir & Or',
        shoesColor: 'Noires avec bandes blanches',
        stance: 'orthodox',
      },
      boxerB: {
        id: 'boxer-b',
        name: 'Marcus "Iron" Vance',
        gloveColor: 'blue',
        torsoColor: 'Torse nu, short rouge',
        shoesColor: 'Rouges et Blanches',
        stance: 'southpaw',
      }
    }
  },
  {
    id: 'sample-2',
    title: 'Session MMA & Sparring : Vitesse & Timing',
    description: 'Sparring technique en cage/salle. Idéal pour analyser les esquives, le timing de riposte, le contrôle de l\'octogone et les transitions.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-two-boxers-fighting-in-a-ring-40694-large.mp4',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80',
    defaultConfig: {
      mode: 'duel',
      sport: 'mma',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-two-boxers-fighting-in-a-ring-40694-large.mp4',
      videoTitle: 'Session MMA & Sparring : Vitesse & Timing',
      boxerA: {
        id: 'boxer-a',
        name: 'Combattant Gants Rouges',
        gloveColor: 'red',
        torsoColor: 'T-shirt technique Gris',
        shoesColor: 'Pieds nus',
        stance: 'orthodox',
      },
      boxerB: {
        id: 'boxer-b',
        name: 'Combattant Gants Noirs',
        gloveColor: 'black',
        torsoColor: 'Débardeur Noir',
        shoesColor: 'Pieds nus',
        stance: 'switch',
      }
    }
  },
  {
    id: 'sample-3',
    title: 'Entraînement au Sac de Frappe (Kickboxing)',
    description: 'Analyse approfondie de la puissance d\'impact, de la biomécanique des crochets/kicks et de l\'endurance en mode Focus.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-boxing-in-a-gym-40690-large.mp4',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80',
    defaultConfig: {
      mode: 'solo',
      sport: 'kickboxing',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-boxing-in-a-gym-40690-large.mp4',
      videoTitle: 'Entraînement au Sac de Frappe (Kickboxing)',
      boxerA: {
        id: 'boxer-a',
        name: 'David "Striker" K.',
        gloveColor: 'white',
        torsoColor: 'T-shirt Noir',
        shoesColor: 'Chaussures de Boxe Noires',
        stance: 'orthodox',
      }
    }
  }
];

export const GLOVE_COLORS_DATA = [
  { id: 'red', name: 'Rouge', hex: '#ef4444', border: 'border-red-500' },
  { id: 'blue', name: 'Bleu', hex: '#3b82f6', border: 'border-blue-500' },
  { id: 'black', name: 'Noir', hex: '#1e293b', border: 'border-slate-500' },
  { id: 'white', name: 'Blanc', hex: '#f8fafc', border: 'border-slate-300' },
  { id: 'gold', name: 'Or', hex: '#eab308', border: 'border-yellow-500' },
  { id: 'neon', name: 'Vert Fluo', hex: '#22c55e', border: 'border-green-500' },
];

export const COMBAT_SPORTS_DATA = [
  { id: 'boxing', name: 'Boxe Anglaise', icon: '🥊' },
  { id: 'mma', name: 'MMA / Arts Martiaux Mixtes', icon: '🥋' },
  { id: 'kickboxing', name: 'Kickboxing / Muay Thaï', icon: '🦵' },
  { id: 'sparring', name: 'Sparring Libre', icon: '⚡' },
];
