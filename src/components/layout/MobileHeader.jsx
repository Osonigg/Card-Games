import { LayoutGrid, User, Pause } from 'lucide-react';

/**
 * Mobile top bar
 * @param {object} props
 * @param {string} [props.rightIcon] - 'user' | 'pause'
 * @param {function} [props.onRightAction]
 */
export default function MobileHeader({ rightIcon = 'user', onRightAction }) {
  return (
    <header className="flex lg:hidden items-center justify-between px-5 py-3 bg-[var(--color-bg)] shrink-0">
      <div className="flex items-center gap-3">
        <LayoutGrid size={16} className="text-[var(--color-ink)]" />
        <span className="font-display text-sm font-bold tracking-tight text-[var(--color-ink)] uppercase">
          MONO ARCHITECT
        </span>
      </div>
      <button
        onClick={onRightAction}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-muted)] transition-colors cursor-pointer"
      >
        {rightIcon === 'pause' ? (
          <Pause size={16} />
        ) : (
          <User size={16} />
        )}
      </button>
    </header>
  );
}
