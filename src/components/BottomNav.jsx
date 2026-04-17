import { Gamepad2, BarChart2, Settings } from 'lucide-react';
import { t } from '../i18n.js';

export function BottomNav({ lang, screen, onPlay, onStats, onSettings, isMenuOpen }) {
  const tx = t[lang];
  
  const isPlayActive = screen === 'HOME' || screen === 'PLAYING' || screen === 'PAUSED' || screen === 'VICTORY';
  const isStatsActive = screen === 'STATS';

  return (
    <nav className={`md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-surface-container-highest shadow-[0_-4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ${isMenuOpen ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <div className="flex justify-around items-center h-20 px-4">
        <button 
          onClick={onPlay}
          className={`flex flex-col items-center justify-center transition-all active:opacity-80 ${isPlayActive ? 'text-primary scale-110' : 'text-outline hover:text-primary'}`}
        >
          <Gamepad2 size={22} className={isPlayActive ? 'fill-primary/20' : ''} />
          <span className="text-[10px] font-medium tracking-[0.05em] uppercase mt-1">{tx.playTab}</span>
        </button>
        <button 
          onClick={onStats}
          className={`flex flex-col items-center justify-center rounded-xl px-6 py-2 shadow-lg active:scale-95 transition-all ${isStatsActive ? 'bg-primary text-on-primary shadow-primary/30' : 'bg-surface-container text-outline hover:text-primary shadow-none'}`}
        >
          <BarChart2 size={22} />
          <span className="text-[10px] font-bold tracking-[0.05em] uppercase mt-1">{tx.gameStats.substring(0, 5)}</span>
        </button>
        <button 
          onClick={onSettings}
          className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:opacity-80"
        >
          <Settings size={22} />
          <span className="text-[10px] font-medium tracking-[0.05em] uppercase mt-1">{tx.settings}</span>
        </button>
      </div>
    </nav>
  );
}
