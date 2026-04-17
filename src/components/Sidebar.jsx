import {
  Compass, BarChart2, TrendingUp, Settings,
  ArrowRight, LogOut, Clock, MousePointerClick, Trophy, X,
  Sun, Moon, User
} from 'lucide-react';
import { t } from '../i18n.js';

export function Sidebar({ screen, onNewGame, onStatsClick, onExit, onHomeClick, metrics, difficulty, lang, isOpen, onClose, isDark, toggleTheme, setLang }) {
  const tx = t[lang];
  const isPlaying = screen === 'PLAYING' || screen === 'PAUSED';
  const diffLabel = difficulty === 'EASY' ? tx.easy : difficulty === 'MEDIUM' ? tx.medium : tx.hard;

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      <aside className={`fixed left-0 top-0 h-full w-75 bg-surface-container-lowest/95 md:bg-surface-container-lowest/40 backdrop-blur-3xl border-r border-outline-variant/20 flex flex-col py-8 px-6 overflow-y-auto z-[60] transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-blue-600 shadow-lg shadow-primary/20 flex items-center justify-center text-white">
          <Compass size={20} />
        </div>
        <div>
          <h1 className="text-[1.1rem] font-black tracking-tight text-on-surface leading-none">
            {tx.appTitle.split(' ')[0]}
          </h1>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary mt-1 font-bold">
            {tx.appTitle.split(' ')[1]}
          </p>
        </div>
      </div>

      {isPlaying ? (
        <>
          <div className="mb-8 p-4 rounded-2xl bg-primary/5 border-2 border-primary/40 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-outline">{tx.level}</span>
            <span className="text-xs font-extrabold text-primary bg-primary/10 px-2 py-1 rounded-md">{diffLabel}</span>
          </div>

          <div className="flex-1 space-y-8 border-t border-outline-variant/30 pt-8">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold flex items-center gap-1.5">
                <Clock size={10} />{tx.timeElapsedLong}
              </span>
              <p className="text-4xl font-light tabular-nums tracking-tighter text-on-surface">
                {fmt(metrics.timeElapsed ?? 0)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold flex items-center gap-1.5">
                  <MousePointerClick size={10} />{tx.moves}
                </span>
                <p className="text-2xl font-semibold tracking-tight text-primary">{metrics.moves ?? 0}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold flex items-center gap-1.5">
                  <Trophy size={10} />{tx.pairs}
                </span>
                <p className="text-2xl font-semibold tracking-tight text-accent">
                  {metrics.pairsFound ?? 0}
                  <span className="text-sm text-outline font-normal"> / {metrics.totalPairs ?? 0}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <nav className="flex-1 space-y-1">
          <button onClick={onHomeClick} className="w-full flex items-center gap-4 py-3 px-4 text-outline hover:text-on-surface hover:bg-surface-container-high/50 rounded-xl transition-colors">
            <BarChart2 size={18} />
            <span className="text-[11px] uppercase tracking-widest">{tx.home}</span>
          </button>
          <button onClick={onStatsClick} className="w-full flex items-center gap-4 py-3 px-4 text-outline hover:text-on-surface hover:bg-surface-container-high/50 rounded-xl transition-colors">
            <TrendingUp size={18} />
            <span className="text-[11px] uppercase tracking-widest">{tx.gameStats}</span>
          </button>
        </nav>
      )}

      {/* Mobile-only settings (Language, Theme, User) */}
      <div className="md:hidden mt-auto mb-6 pt-6 border-t border-outline-variant/30 flex items-center justify-between text-outline gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="h-10 px-4 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all text-sm font-bold tracking-widest bg-surface-container/30"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all bg-surface-container/30"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        {(screen === 'PLAYING' || screen === 'HOME') && (
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center ring-2 ring-primary/20">
            <User size={18} />
          </div>
        )}
      </div>

      <div className="md:mt-auto space-y-4 border-t border-outline-variant/30 pt-6 md:pt-8">
        {screen === 'HOME' && (
          <button onClick={onNewGame} className="relative w-full overflow-hidden rounded-xl group active:scale-95 transition-all">
            <div className="absolute inset-0 bg-linear-to-r from-accent to-orange-500 group-hover:opacity-90 transition-opacity" />
            <div className="relative z-10 py-4 px-6 flex items-center justify-center gap-2 text-white font-bold text-sm tracking-widest uppercase">
              <span>{tx.newGame}</span>
              <ArrowRight size={18} />
            </div>
          </button>
        )}
        {screen !== 'HOME' && (
        <button onClick={onExit} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-outline hover:text-error hover:bg-error/10 transition-colors font-semibold">
        <LogOut size={16} />
        <span className="text-[11px] uppercase tracking-wider">{tx.exit}</span>
        </button>
        )}
      </div>
    </aside>
    </>
  );
}
