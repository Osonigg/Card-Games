import { Gamepad2, BarChart2, Settings, History } from 'lucide-react';

const navConfigs = {
  home: [
    { id: 'play', label: 'PLAY', Icon: Gamepad2 },
    { id: 'stats', label: 'STATS', Icon: BarChart2 },
    { id: 'settings', label: 'SETTINGS', Icon: Settings },
  ],
  game: [
    { id: 'game', label: 'GAME', Icon: Gamepad2 },
    { id: 'history', label: 'HISTORY', Icon: History },
    { id: 'settings', label: 'SETTINGS', Icon: Settings },
  ],
  victory: [
    { id: 'game', label: 'GAME', Icon: Gamepad2 },
    { id: 'history', label: 'HISTORY', Icon: History },
    { id: 'settings', label: 'SETTINGS', Icon: Settings },
  ],
};

/**
 * Mobile bottom navigation bar
 * @param {object} props
 * @param {string} props.active - active tab id
 * @param {'home'|'game'|'victory'} [props.variant]
 */
export default function MobileBottomNav({ active, variant = 'home' }) {
  const items = navConfigs[variant] || navConfigs.home;

  return (
    <nav className="flex lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg)] border-t border-[var(--color-border)] z-30">
      <div className="flex items-center justify-around w-full px-6 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <div
              key={item.id}
              className={`
                flex flex-col items-center justify-center px-4 py-1.5 rounded-lg transition-colors
                ${isActive ? 'bg-[var(--color-ink)]' : ''}
              `}
            >
              <item.Icon
                size={16}
                className={isActive ? 'text-white' : 'text-[var(--color-ink-secondary)]'}
                strokeWidth={1.5}
              />
              <span
                className={`
                  text-[9px] font-medium uppercase tracking-widest mt-0.5
                  ${isActive ? 'text-white' : 'text-[var(--color-ink-secondary)]'}
                `}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
