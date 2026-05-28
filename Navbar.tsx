import React from 'react';
import { Dumbbell, Sparkles, Upload, Video, User, Info, Clock } from 'lucide-react';

interface NavbarProps {
  onNewAnalysis: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasResults: boolean;
  onOpenPremium: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewAnalysis,
  activeTab,
  setActiveTab,
  hasResults,
  onOpenPremium,
}) => {
  const navItems = [
    { id: 'studio', label: 'Studio Vidéo', icon: Video },
    { id: 'stats', label: 'Dashboard IA', icon: Sparkles, disabled: !hasResults },
    { id: 'profile', label: 'Profil Combattant', icon: User },
    { id: 'training', label: 'Plan IA', icon: Dumbbell, disabled: !hasResults },
    { id: 'timer', label: 'Chrono', icon: Clock },
    { id: 'about', label: 'À propos', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Slogan Premium */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('studio')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-lg sm:text-xl font-black text-white tracking-tighter">IQ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-white">Move</span>
                <span className="font-black text-base sm:text-xl tracking-tight bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">IQ</span>
                <span className="text-[9px] sm:text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider ml-1">
                  Premium
                </span>
              </div>
              <p className="text-[9px] sm:text-[11px] text-slate-400 font-medium tracking-wide -mt-0.5 hidden md:block">
                L’intelligence derrière chaque mouvement.
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isDisabled = item.disabled;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => !isDisabled && setActiveTab(item.id)}
                  disabled={isDisabled}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 relative ${
                    isActive
                      ? 'bg-slate-900/90 text-orange-400 border border-slate-700/50 shadow-inner'
                      : isDisabled
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />}
                  <span>{item.label}</span>
                  {item.id === 'stats' && hasResults && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={onOpenPremium}
              className="bg-slate-900 hover:bg-slate-800 text-orange-400 border border-orange-500/30 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              title="Débloquer les fonctionnalités sans limite"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span className="hidden md:inline">Passer Premium</span>
              <span className="md:hidden">Premium</span>
            </button>

            <button
              onClick={onNewAnalysis}
              className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-600/25 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Importer une vidéo</span>
              <span className="sm:hidden">Analyser</span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Mobile (Bottom Bar ultra optimisée) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isDisabled = item.disabled;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && setActiveTab(item.id)}
              disabled={isDisabled}
              className={`flex flex-col items-center justify-center w-12 py-1 rounded-lg transition-all ${
                isActive
                  ? 'text-orange-400 scale-105'
                  : isDisabled
                  ? 'text-slate-700 cursor-not-allowed'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : ''}`} />
                {item.id === 'stats' && hasResults && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <span className="text-[9px] font-bold mt-0.5 tracking-tight truncate max-w-full">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
