import { Trophy, RotateCcw, SlidersHorizontal, Home } from 'lucide-react';
import { t } from '../../i18n.js';

export function VictoryScreen({ metrics, onRestart, onHome, lang }) {
  const tx = t[lang];
  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 mb-24 md:mb-0 relative z-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
        <div className="w-64 h-64 bg-primary/20 rounded-full blur-[100px] -ml-20" />
      </div>

      <div className="max-w-3xl w-full glass-panel rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />

        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-accent to-orange-500 rounded-4xl text-white mb-8 shadow-2xl shadow-accent/30 rotate-12 hover:rotate-0 transition-transform duration-500">
            <Trophy size={48} className="fill-current" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-primary to-blue-400 mb-4">
            {tx.victoryTitle}
          </h1>
          <p className="text-outline font-bold tracking-[0.2em] uppercase text-xs">{tx.victorySub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10 max-w-2xl mx-auto w-full">
          <div className="bg-surface-container-lowest/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center ring-1 ring-inset ring-outline-variant/30">
            <span className="text-outline mb-3 uppercase tracking-widest text-[10px] font-bold">{tx.totalTime}</span>
            <span className="text-3xl md:text-4xl font-light tabular-nums tracking-tighter font-mono">{fmt(metrics.timeElapsed)}</span>
          </div>
          <div className="bg-linear-to-br from-primary to-blue-800 p-8 rounded-3xl flex flex-col items-center text-white md:scale-[1.03] shadow-2xl shadow-primary/20 ring-1 ring-white/20">
            <span className="text-blue-200 mb-3 uppercase tracking-widest text-[10px] font-bold">{tx.totalMoves}</span>
            <span className="text-5xl md:text-6xl font-bold tracking-tighter">{metrics.moves}</span>
          </div>
          <div className="bg-surface-container-lowest/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center ring-1 ring-inset ring-outline-variant/30">
            <span className="text-outline mb-3 uppercase tracking-widest text-[10px] font-bold">{tx.pairsFound}</span>
            <span className="text-3xl md:text-4xl font-light tracking-tighter">{metrics.pairsFound}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 relative z-10">
          <button onClick={onRestart} className="group relative w-full max-w-sm h-16 rounded-2xl text-sm font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-accent/20 active:scale-95 transition-all">
            <div className="absolute inset-0 bg-linear-to-r from-accent to-orange-500 group-hover:opacity-90 transition-opacity" />
            <span className="relative z-10 text-white flex items-center gap-3">
              <RotateCcw size={18} />
              {tx.playAgain}
            </span>
          </button>

          <div className="flex items-center gap-6 mt-2">
            <button onClick={onHome} className="text-outline hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors py-2 px-4 rounded-xl hover:bg-surface-container-high/50 flex items-center gap-2">
              <SlidersHorizontal size={14} />
              {tx.changeDifficulty}
            </button>
            <div className="w-1 h-1 rounded-full bg-outline-variant" />
            <button onClick={onHome} className="text-outline hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors py-2 px-4 rounded-xl hover:bg-surface-container-high/50 flex items-center gap-2">
              <Home size={14} />
              {tx.home}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
