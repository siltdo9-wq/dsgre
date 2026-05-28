import React, { useState } from 'react';
import { Check, Zap, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface PremiumModalProps {
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative">
        
        {/* Gradients de fond */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/80 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 z-10 transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Colonne de gauche : Présentation des atouts */}
          <div className="p-8 sm:p-12 flex flex-col justify-between relative z-10">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>Move IQ Deep-Net v3</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Débloquez l'Analyse IA <br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Sans Aucune Limite.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                Rejoignez plus de <strong className="text-white">12 000 combattants et coachs</strong> qui utilisent Move IQ pour décomposer chaque dixième de seconde de leurs entraînements.
              </p>

              {/* Liste des fonctionnalités Premium */}
              <div className="mt-8 space-y-3.5">
                {[
                  'Analyses vidéos illimitées (Boxe, MMA, Sparring, Paos)',
                  'Traçage ultra haute précision à 120 FPS',
                  'Comparaison mondiale avec la base Move IQ (100k+ rounds)',
                  'Exportation PDF complète pour vos coachs et sponsors',
                  'Accès prioritaire aux nouveaux modèles d\'esquive',
                  'Support client premium 7j/7'
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5 border border-orange-500/20">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Paiement 100% sécurisé. Annulable à tout moment.</span>
            </div>

          </div>

          {/* Colonne de droite : Tarification & Paiement */}
          <div className="bg-slate-950 p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative z-10">
            
            <div>
              {/* Sélecteur de facturation */}
              <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center mb-8">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    billing === 'monthly' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all relative ${
                    billing === 'yearly' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Annuel
                  <span className="absolute -top-2.5 right-2 bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    -50%
                  </span>
                </button>
              </div>

              {/* Affichage du prix imbattable */}
              <div className="text-center py-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  {billing === 'yearly' ? 'Facturé 29.99€ par an' : 'Sans engagement'}
                </span>
                
                <div className="flex items-center justify-center gap-1">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                    {billing === 'yearly' ? '2.49€' : '4.99€'}
                  </span>
                  <div className="text-left">
                    <span className="text-xs text-slate-400 block font-bold">/ mois</span>
                    <span className="text-[9px] text-emerald-400 font-bold block">TTC inclus</span>
                  </div>
                </div>

                <div className="mt-3 inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold px-3 py-1 rounded-full">
                  🔥 Offre Spéciale Lancement Move IQ v2.0
                </div>
              </div>

            </div>

            {/* Bouton d'Abonnement */}
            <div className="mt-8 space-y-4">
              
              {subscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 animate-fadeIn">
                  <Check className="w-5 h-5" />
                  <span>Abonnement Premium Activé !</span>
                </div>
              ) : (
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white py-4 rounded-xl font-black text-sm shadow-xl hover:shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Activer Move IQ Premium</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                En cliquant sur "Activer Move IQ Premium", vous acceptez nos conditions générales de vente et notre politique de confidentialité.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
