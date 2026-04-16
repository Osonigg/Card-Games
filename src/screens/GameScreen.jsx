import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MousePointerClick, Trophy, Pause, RotateCcw, LogOut, Lightbulb } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import MobileHeader from '../components/layout/MobileHeader.jsx';
import MobileBottomNav from '../components/layout/MobileBottomNav.jsx';
import GameBoard from '../components/game/GameBoard.jsx';
import MetricsBar from '../components/game/MetricsBar.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import PauseModal from '../components/modals/PauseModal.jsx';
import ResultsModal from '../components/modals/ResultsModal.jsx';
import { DIFFICULTY_CONFIG } from '../lib/cards.js';

/**
 * @param {object} props
 * @param {object} props.engine - game engine state + actions
 * @param {object} props.timer - timer state + actions
 */
export default function GameScreen({ engine, timer }) {
  const navigate = useNavigate();

  // Start timer on first card flip
  useEffect(() => {
    if (engine.flipped.length === 1 && !timer.isRunning && engine.status === 'playing') {
      timer.start();
    }
  }, [engine.flipped, engine.status, timer]);

  // Handle pause
  useEffect(() => {
    if (engine.status === 'paused') {
      timer.pause();
    } else if (engine.status === 'playing' && engine.moves > 0) {
      timer.start();
    }
  }, [engine.status]);

  // Handle completion
  useEffect(() => {
    if (engine.status === 'completed') {
      timer.stop();
    }
  }, [engine.status]);

  // Redirect if no game started
  useEffect(() => {
    if (engine.status === 'idle') {
      navigate('/');
    }
  }, [engine.status, navigate]);

  const config = DIFFICULTY_CONFIG[engine.difficulty];

  const handlePause = () => engine.pause();
  const handleResume = () => engine.resume();
  const handleRestart = () => {
    engine.restart();
    timer.reset();
  };
  const handleChangeDifficulty = (d) => {
    engine.changeDifficulty(d);
    timer.reset();
  };
  const handleGoHome = () => {
    engine.goHome();
    timer.reset();
    navigate('/');
  };

  const sidebarMetrics = (
    <div className="flex flex-col gap-6">
      {/* Difficulty */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-2">DIFFICULTY</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-[var(--color-ink)] tracking-tight capitalize">{engine.difficulty}</span>
          <Badge>{config.cols}X{config.rows}</Badge>
        </div>
      </div>

      {/* Time */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-2">TIME ELAPSED</p>
        <span className="text-xl font-black text-[var(--color-ink)] tracking-tight font-mono">{timer.formatted}</span>
      </div>

      {/* Moves + Pairs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-2">MOVES</p>
          <span className="text-lg font-semibold text-[var(--color-ink)]">{engine.moves}</span>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-2">PAIRS FOUND</p>
          <span className="text-lg font-semibold text-[var(--color-ink)]">{engine.pairs.found}/{engine.pairs.total}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-[var(--color-bg)]">
      {/* Desktop Sidebar */}
      <Sidebar activeNav="progress" onNewGame={handleRestart} onExit={handleGoHome}>
        {sidebarMetrics}
        <div className="flex flex-col gap-3 mt-8">
          <Button variant="outline" size="sm" fullWidth onClick={handlePause}
            icon={<Pause size={12} />}
          >
            Pausa
          </Button>
          <Button variant="outline" size="sm" fullWidth onClick={handleRestart}
            icon={<RotateCcw size={12} />}
          >
            Reiniciar
          </Button>
          <button
            className="flex items-center justify-center gap-2 py-3 text-sm text-[var(--color-danger)] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
            onClick={handleGoHome}
          >
            <LogOut size={12} />
            Salir
          </button>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Desktop Topbar */}
        <Topbar
          subtitle="Session Active"
          showGameControls
          onPause={handlePause}
          onRestart={handleRestart}
        />

        {/* Mobile Header */}
        <MobileHeader rightIcon="pause" onRightAction={handlePause} />

        {/* Mobile: Title + Metrics */}
        <div className="lg:hidden px-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <Badge className="mb-2">{engine.difficulty.toUpperCase()} DIFFICULTY</Badge>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] tracking-tight">
                Architectural Memory
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-secondary)]">SESSION</p>
              <p className="text-lg text-[var(--color-ink)]">#1024</p>
            </div>
          </div>
          <MetricsBar time={timer.formatted} moves={engine.moves} pairs={engine.pairs} />
        </div>

        {/* Game Board */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-4 lg:py-6">
          {/* Desktop header */}
          <div className="hidden lg:flex items-end justify-between w-full max-w-[900px] mb-6">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-[var(--color-ink)] tracking-tight">
                Encuentra las parejas
              </h2>
              <p className="text-base text-[var(--color-ink-secondary)] mt-2 max-w-[448px]">
                Selecciona dos cartas identicas para despejar el tablero y avanzar en la progresion.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-[var(--color-ink-secondary)]">SESSION DIFFICULTY</p>
              <Badge variant="dark" className="mt-1">{engine.difficulty.toUpperCase()} MODE</Badge>
            </div>
          </div>

          {/* Board */}
          <div className="w-full max-w-[900px]">
            <div className="bg-[#eee] lg:bg-transparent rounded-2xl p-4 lg:p-0 shadow-sm lg:shadow-none">
              <GameBoard
                cards={engine.cards}
                flipped={engine.flipped}
                matched={engine.matched}
                difficulty={engine.difficulty}
                onFlip={engine.flipCard}
                disabled={engine.status !== 'playing'}
              />
            </div>
          </div>

          {/* Mobile: Restart button */}
          <div className="lg:hidden w-full mt-4">
            <Button variant="primary" fullWidth onClick={handleRestart}
              icon={<RotateCcw size={14} />}
              className="uppercase tracking-wider font-bold"
            >
              RESTART SESSION
            </Button>
          </div>

          {/* Desktop: Hint bar */}
          <div className="hidden lg:flex items-center gap-4 bg-[#f3f3f3] rounded-2xl p-5 w-full max-w-[900px] mt-6">
            <div className="w-10 h-11 bg-[var(--color-surface-muted)] rounded-lg flex items-center justify-center">
              <Lightbulb size={20} className="text-[var(--color-ink-secondary)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Quick Hint</p>
              <p className="text-xs text-[var(--color-ink-secondary)]">
                Memorize the pattern. The corner icons tend to match the center cards in Architect Edition layout.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileBottomNav active="game" variant="game" />
      </div>

      {/* Pause Modal */}
      {engine.status === 'paused' && (
        <PauseModal
          onResume={handleResume}
          onRestart={handleRestart}
          onChangeDifficulty={() => {}}
          onExit={handleGoHome}
        />
      )}

      {/* Results Modal */}
      {engine.status === 'completed' && (
        <ResultsModal
          time={timer.formatted}
          timeSeconds={timer.seconds}
          moves={engine.moves}
          pairs={engine.pairs}
          difficulty={engine.difficulty}
          onPlayAgain={handleRestart}
          onChangeDifficulty={() => handleGoHome()}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
