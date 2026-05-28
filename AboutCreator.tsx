import React from 'react';
import { Award, Shield, Sparkles, CheckCircle2, MapPin } from 'lucide-react';

export const AboutCreator: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn select-none max-w-5xl mx-auto py-4">
      
      {/* En-tête / Slogan */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-widest mb-3 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Le Cerveau derrière la Plateforme</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          À propos du créateur
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          De l'expérience du ring à l'innovation technologique par intelligence artificielle.
        </p>
      </div>

      {/* Carte principale de présentation */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Gradients et Lueurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          
          {/* Emplacement élégant pour la photo du créateur/boxeur */}
          <div className="relative group shrink-0">
            {/* Cadre en halo */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500" />
            
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden border-2 border-slate-950 bg-slate-950 shadow-2xl">
              
              {/* Photo du créateur / Boxeur */}
              <img
                src="/images/silvio-creator.jpg"
                alt="Silvio De Oliveira - Fondateur Move IQ"
                className="w-full h-full object-cover filter contrast-110 object-top"
              />

              {/* Voile textuel */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase block">
                  Fondateur Move IQ
                </span>
                <span className="text-xs font-bold text-white tracking-tight">
                  Silvio De Oliveira
                </span>
              </div>

            </div>

            {/* Badge Localisation */}
            <div className="absolute -top-3 -right-3 bg-slate-950 text-slate-300 px-3 py-1 rounded-xl border border-slate-800 shadow-lg flex items-center gap-1.5 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Belgique</span>
            </div>
          </div>

          {/* Récit et Vision du Créateur */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-extrabold bg-slate-950 px-3 py-1 rounded-lg text-slate-200 border border-slate-800/80">
                Boxeur Amateur & Développeur
              </span>
              <span className="text-xs font-extrabold bg-orange-500/10 px-3 py-1 rounded-lg text-orange-400 border border-orange-500/20">
                +4 ans de pratique
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              « L’intelligence derrière chaque mouvement. »
            </h3>

            {/* Texte officiel fourni */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal text-justify">
              “Je m’appelle <strong className="text-white font-bold">Silvio De Oliveira</strong>, créateur de Move IQ. Passionné de boxe et de sports de combat depuis plusieurs années, je pratique la boxe depuis plus de 4 ans. J’ai participé à plusieurs entraînements intensifs, sparrings, galas et compétitions amateurs en Belgique. Grâce à cette expérience du terrain, j’ai voulu créer une application capable d’aider les combattants à progresser grâce à l’intelligence artificielle, en offrant des analyses précises, modernes et accessibles à tous.”
            </p>

            {/* Points d'engagement */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              
              <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60 flex items-center gap-3 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Expérience du terrain</span>
                  <span className="text-[10px] text-slate-400 block">Sparrings & Compétitions</span>
                </div>
              </div>

              <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60 flex items-center gap-3 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Vision Technologique</span>
                  <span className="text-[10px] text-slate-400 block">IA, Capteurs & Biomécanique</span>
                </div>
              </div>

            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Conçu et développé avec passion en Belgique.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
