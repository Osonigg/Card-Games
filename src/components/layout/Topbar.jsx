import { HelpCircle, Bell, Pause, RefreshCw } from 'lucide-react';

/**
 * Desktop top bar
 * @param {object} props
 * @param {string} [props.subtitle]
 * @param {boolean} [props.showGameControls]
 * @param {function} [props.onPause]
 * @param {function} [props.onRestart]
 */
export default function Topbar({ subtitle, showGameControls = false, onPause, onRestart }) {
  return (
    <header className="hidden lg:flex items-center justify-between h-14 px-8 bg-[var(--color-bg)] border-b border-[var(--color-border)] shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-display text-sm font-bold text-[var(--color-ink)] tracking-tight">
          Architect Memory
        </span>
        {subtitle && (
          <>
            <div className="w-px h-3.5 bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-ink-secondary)]">
              {subtitle}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showGameControls && (
          <div className="flex items-center gap-3">
            <button onClick={onPause} className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors cursor-pointer">
              <Pause size={16} />
            </button>
            <button onClick={onRestart} className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors cursor-pointer">
              <RefreshCw size={16} />
            </button>
            <div className="w-px h-3.5 bg-[var(--color-border)]" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <button className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors cursor-pointer">
            <HelpCircle size={16} />
          </button>
          <button className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors cursor-pointer">
            <Bell size={16} />
          </button>
        </div>
        <div className="w-7 h-7 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center text-[10px] font-semibold text-[var(--color-ink-secondary)]">
          U
        </div>
      </div>
    </header>
  );
}
