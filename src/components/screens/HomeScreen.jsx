import { Play, Brain, Compass, Star } from 'lucide-react';
import { t } from '../../i18n.js';

export function HomeScreen({ onStart, difficulty, setDifficulty, lang }) {
  const tx = t[lang];
  const difficulties = ['EASY', 'MEDIUM', 'HARD'];
  const labels = { EASY: tx.easy, MEDIUM: tx.medium, HARD: tx.hard };

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-0 mb-24 md:mb-0 relative z-10 min-h-[calc(100vh-64px)]">
      <div className="absolute inset-0 architect-grid pointer-events-none opacity-50 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] ring-1 ring-primary/20">
              {tx.mentalClarity}
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-primary to-blue-400 pb-2">
              {tx.appTitle.split(' ')[0]}
            </h2>
            <p className="text-lg md:text-xl text-outline font-medium max-w-md mx-auto lg:mx-0">
              {tx.subtitle}
            </p>
          </div>

          <div className="w-full max-w-md space-y-6 pt-4">
            <div className="space-y-3 text-left">
              <label className="text-[10px] sm:text-xs font-bold tracking-widest text-outline uppercase ml-1 block">
                {tx.difficultyLabel}
              </label>
              <div className="flex bg-surface-container-high/50 p-1.5 rounded-2xl ring-1 ring-inset ring-outline-variant/50 shadow-inner">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-3 sm:py-4 rounded-[0.8rem] text-[10px] sm:text-xs font-bold tracking-widest transition-all duration-300 ${
                      difficulty === diff
                        ? 'text-white bg-primary shadow-lg shadow-primary/40'
                        : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    {labels[diff]}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={onStart} className="group relative w-full h-16 sm:h-20 rounded-2xl text-sm sm:text-base font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-accent/20 active:scale-95 transition-all">
              <div className="absolute inset-0 bg-linear-to-r from-accent to-orange-500 group-hover:opacity-90 transition-opacity" />
              <span className="relative z-10 text-white flex items-center gap-4">
                <span>{tx.play}</span>
                <Play size={22} className="fill-current group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex relative justify-center items-center min-h-100">
          <div className="relative w-80 h-80 xl:w-100 xl:h-100">
            <div className="absolute -top-12 -right-8 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl animate-pulse" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-linear-to-br from-primary to-blue-700 rounded-[2.5rem] shadow-2xl shadow-primary/30 rotate-12 z-10 flex items-center justify-center hover:rotate-6 hover:scale-105 transition-all duration-500">
              <Brain size={96} className="text-white/20" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white/80 dark:bg-slate-900/80 rounded-[2.5rem] border-2 border-primary/20 -rotate-6 z-20 flex items-center justify-center shadow-2xl backdrop-blur-xl hover:-rotate-2 hover:scale-105 hover:border-primary/50 transition-all duration-500">
              <Compass size={96} className="text-primary/80 drop-shadow-lg" />
            </div>

            <div className="absolute -right-6 top-1/4 w-28 h-28 bg-linear-to-br from-accent to-orange-500 rounded-2xl shadow-xl shadow-accent/20 rotate-12 z-30 flex items-center justify-center animate-float">
              <Star size={40} className="text-white fill-current" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
