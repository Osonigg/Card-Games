import { useEffect, useRef } from 'react';
import { Lightbulb, Compass } from 'lucide-react';
import { useGameEngine } from '../../hooks/useGameEngine.js';
import { useTimer } from '../../hooks/useTimer.js';
import { DIFFICULTY_CONFIG } from '../../constants.js';
import { t } from '../../i18n.js';

const COLS_MAP = { 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' };

export function GameScreen({ difficulty, onVictory, onMetricsChange, lang }) {
  const tx = t[lang];
  const { state, startGame, flipCard } = useGameEngine();
  const isPlaying = state.status === 'playing';
  const { seconds, reset: resetTimer } = useTimer(isPlaying);

  useEffect(() => {
    startGame(difficulty);
    resetTimer();
  }, [difficulty]);

  useEffect(() => {
    onMetricsChange({
      timeElapsed: seconds,
      moves: state.moves,
      pairsFound: state.pairsFound,
      totalPairs: DIFFICULTY_CONFIG[difficulty]?.pairs ?? 0,
    });
  }, [seconds, state.moves, state.pairsFound]);

  const completedRef = useRef(false);
  useEffect(() => {
    if (state.status === 'completed' && !completedRef.current) {
      completedRef.current = true;
      setTimeout(() => {
        onVictory({ timeElapsed: seconds, moves: state.moves, pairsFound: state.pairsFound });
      }, 600);
    }
    if (state.status !== 'completed') completedRef.current = false;
  }, [state.status]);

  const { cols } = DIFFICULTY_CONFIG[difficulty] ?? { cols: 6 };
  const gridClass = COLS_MAP[cols] ?? 'grid-cols-6';

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const diffLabel = 
    difficulty === 'EASY' ? tx.easy : 
    difficulty === 'MEDIUM' ? tx.medium :
    difficulty === 'HARD' ? tx.hard : 
    difficulty === 'VERYHARD' ? tx.veryHard : tx.extreme; 

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 py-8 md:py-12 mb-24 md:mb-0 relative">
      <div className="w-full flex justify-between items-end mb-4 md:mb-8 md:hidden">
        <div>
          <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 inline-block">
            {diffLabel} {tx.difficultyLabel}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-primary">{tx.appTitle}</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-outline font-bold">{tx.session}</p>
          <p className="text-lg font-black tracking-tight font-mono">{fmt(seconds)}</p>
        </div>
      </div>

      <div className="md:hidden grid grid-cols-3 gap-2 mb-4 md:mb-8 w-full max-w-md">
        {[
          { label: tx.timeElapsed, value: fmt(seconds) },
          { label: tx.moves,       value: state.moves },
          { label: tx.pairs,       value: `${state.pairsFound}/${DIFFICULTY_CONFIG[difficulty]?.pairs}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-container-high p-3 rounded-xl flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">{label}</span>
            <span className="text-xl font-bold font-mono">{value}</span>
          </div>
        ))}
      </div>

      <div className="w-full glass-panel p-3 sm:p-6 md:p-10 rounded-2xl flex items-center justify-center mb-8 md:mb-0">
        <div className={`grid ${gridClass} gap-2 sm:gap-4 md:gap-6 w-full max-w-225 mx-auto`}>
          {state.cards.map((card) => {
            const isVisible = card.state === 'flipped' || card.state === 'matched' || card.state === 'incorrect';
            const isMatched  = card.state === 'matched';
            const isFlipped  = card.state === 'flipped' || card.state === 'incorrect';

            return (
              <button
                key={card.uid}
                disabled={state.locked || card.state !== 'hidden'}
                onClick={() => !state.locked && flipCard(card.uid)}
                className={`aspect-square object-contain rounded-xl sm:rounded-2xl transition-all duration-300 relative overflow-hidden group
                  ${difficulty === 'EXTREME' ? 'min-h-[60px] sm:min-h-[80px]' : 'min-h-[100px] sm:min-h-[120px]'}
                  ${isMatched
                    ? 'bg-linear-to-br from-accent to-orange-600 shadow-lg shadow-accent/20 ring-1 ring-white/20'
                    : isFlipped
                    ? 'bg-linear-to-br from-primary to-blue-700 shadow-xl ring-1 ring-white/20'
                    : 'bg-blue-50/80 dark:bg-blue-950/40 border-2 border-blue-400/60 dark:border-blue-500/50 hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] hover:-translate-y-1 cursor-pointer'
                }`}
              >
                <div className="absolute object-contain inset-0 flex items-center justify-center">
                  {isVisible ? (
                    card.img ? (
                      <img
                        src={card.img}
                        alt={card.id}
                        className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-contain drop-shadow-md"
                      />
                    ) : (
                      <card.Icon
                        size={48}
                        className={`drop-shadow-md ${isMatched ? 'text-white fill-current' : 'text-white'}`}
                      />
                    )
                  ) : (
                      <>
                        {/* Si es nivel VERYHARD o EXTREME, mostramos el reverso especial */}
                        {(difficulty === 'VERYHARD' || difficulty === 'EXTREME') ? (
                        <div>
                          {/* Puedes usar una imagen real del reverso si la tienes: */}
                          <img 
                            src="public/img/reverso.png"
                            alt="Reverso"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                
                        </div>
                  ) : (
                  /* Reverso estándar para los demás niveles */
                  <>
                    <Compass size={40} className="text-blue-500/30 group-hover:text-blue-500/50 transition-colors" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_100%)]" />
                  </>
                     )}
                  </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden md:flex mt-8 glass-panel p-6 rounded-2xl items-center gap-4 w-full relative overflow-hidden">
        <div className="p-3 bg-linear-to-br from-accent to-orange-500 rounded-xl shadow-lg shadow-accent/20">
          <Lightbulb size={20} className="text-white" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-primary mb-0.5 tracking-wide uppercase">{tx.quickHint}</p>
          <p className="text-sm text-on-surface-variant font-medium">{tx.hintText}</p>
        </div>
      </div>
    </main>
  );
}
