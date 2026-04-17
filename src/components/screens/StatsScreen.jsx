import { ArrowLeft, Trophy, Clock, MousePointerClick } from 'lucide-react';
import { t } from '../../i18n.js';

export function StatsScreen({ completedGames, onBack, lang }) {
  const tx = t[lang];

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const diffLabel = (diff) => {
    return diff === 'EASY' ? tx.easy : diff === 'MEDIUM' ? tx.medium : tx.hard;
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 py-8 md:py-12 mb-24 md:mb-0 relative">
      <div className="w-full flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-on-surface">{tx.gameStats}</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high/50 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-semibold">{tx.back}</span>
        </button>
      </div>

      {completedGames.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <Trophy size={48} className="text-outline opacity-50" />
          <p className="text-outline text-lg">{tx.noGamesYet}</p>
        </div>
      ) : (
        <div className="w-full space-y-3">
          {completedGames.map((game) => (
            <div
              key={game.id}
              className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-primary">
                      {tx.game} #{game.id}
                    </span>
                    <span className="text-xs font-bold text-white bg-primary/70 px-2 py-1 rounded-md">
                      {diffLabel(game.difficulty)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Clock size={14} />
                      <span>{fmt(game.timeElapsed)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <MousePointerClick size={14} />
                      <span>{game.moves} {tx.moves}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}