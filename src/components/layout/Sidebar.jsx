import { BarChart2, TrendingUp, Settings, LogOut } from 'lucide-react';
import Button from '../ui/Button.jsx';

/**
 * Desktop sidebar - hidden on mobile
 * @param {object} props
 * @param {string} props.activeNav
 * @param {function} props.onNewGame
 * @param {function} props.onExit
 * @param {React.ReactNode} [props.children] - optional content slot (metrics for game screen)
 */
export default function Sidebar({ activeNav = 'progress', onNewGame, onExit, children }) {
  const navItems = [
    { id: 'progress', label: 'CURRENT PROGRESS', Icon: BarChart2 },
    { id: 'stats', label: 'GAME STATS', Icon: TrendingUp },
    { id: 'settings', label: 'SETTINGS', Icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[272px] shrink-0 h-screen sticky top-0 bg-[var(--color-bg)] border-r border-[var(--color-border)]">
      <div className="flex flex-col flex-1 px-7 py-8 overflow-y-auto">
        {/* Brand */}
        <div className="mb-10">
          <h1 className="font-display text-xl font-bold text-[var(--color-ink)] tracking-tight leading-snug">
            Monochromatic<br />Memory
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-secondary)] mt-1.5">
            ARCHITECT EDITION
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`
                flex items-center gap-3 px-3 py-2.5 text-[10px] uppercase tracking-widest rounded-md cursor-pointer transition-colors
                ${activeNav === item.id
                  ? 'text-[var(--color-ink)] font-bold bg-[var(--color-surface-muted)]'
                  : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]/50'
                }
              `}
            >
              <item.Icon size={16} strokeWidth={activeNav === item.id ? 2 : 1.5} />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Optional child content (game metrics) */}
        {children && (
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]/50">
            {children}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 min-h-6" />

        {/* Footer actions */}
        <div className="border-t border-[var(--color-border)] pt-6 mt-4">
          <Button variant="primary" size="sm" fullWidth onClick={onNewGame} className="mb-4">
            New Game
          </Button>
          <button
            className="flex items-center gap-2.5 px-3 py-2 text-[10px] uppercase tracking-widest text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
            onClick={onExit}
          >
            <LogOut size={14} strokeWidth={1.5} />
            <span>EXIT</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
