import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, MousePointerClick, Trophy, SlidersHorizontal, Home } from 'lucide-react';
import Button from '../ui/Button.jsx';
import StatCard from '../ui/StatCard.jsx';
import MobileBottomNav from '../layout/MobileBottomNav.jsx';
import { saveScore } from '../../lib/storage.js';

/**
 * @param {object} props
 * @param {string} props.time - formatted time
 * @param {number} props.timeSeconds
 * @param {number} props.moves
 * @param {{ found: number, total: number }} props.pairs
 * @param {string} props.difficulty
 * @param {function} props.onPlayAgain
 * @param {function} props.onChangeDifficulty
 * @param {function} props.onGoHome
 */
export default function ResultsModal({ time, timeSeconds, moves, pairs, difficulty, onPlayAgain, onChangeDifficulty, onGoHome }) {
  useEffect(() => {
    saveScore({
      difficulty,
      time: timeSeconds,
      moves,
      pairs: pairs.total,
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[var(--color-bg)]/70 backdrop-blur-sm" />

        {/* Desktop Layout */}
        <motion.div
          className="hidden lg:flex relative flex-col items-center bg-white rounded-lg px-16 py-12 max-w-[720px] w-full shadow-md z-10 overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Icon badge */}
          <div className="w-16 h-14 bg-[var(--color-ink)] rounded-xl flex items-center justify-center mb-6">
            <Brain size={24} className="text-white" />
          </div>

          <h2 className="font-display text-5xl italic text-[var(--color-ink)] tracking-tight mb-2">
            &iexcl;Partida Completada!
          </h2>
          <p className="text-xs uppercase tracking-widest text-[var(--color-ink-secondary)] mb-12">
            EXCELLENCE IN SPATIAL COGNITION
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-[640px] mb-12">
            <StatCard label="TOTAL TIME" value={time} />
            <StatCard label="TOTAL MOVES" value={moves} highlighted />
            <StatCard label="PAIRS FOUND" value={`${pairs.found}/${pairs.total}`} />
          </div>

          {/* Actions */}
          <Button variant="primary" size="lg" onClick={onPlayAgain}
            className="w-96 rounded-md font-display tracking-tight"
          >
            Jugar de Nuevo
          </Button>

          <div className="flex items-center gap-8 mt-6">
            <button
              className="text-sm text-[var(--color-ink-secondary)] border-b border-transparent hover:border-[var(--color-ink-secondary)] pb-1 transition-colors cursor-pointer"
              onClick={onChangeDifficulty}
            >
              Cambiar Dificultad
            </button>
            <button
              className="flex items-center gap-2 text-sm text-[var(--color-ink-secondary)]/60 hover:text-[var(--color-ink-secondary)] transition-colors cursor-pointer"
              onClick={onGoHome}
            >
              <Home size={14} />
              Volver al Inicio
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-2 mt-12">
            <div className="w-12 h-1 bg-[var(--color-ink)]" />
            <div className="w-4 h-1 bg-[var(--color-surface-muted)]" />
            <div className="w-4 h-1 bg-[var(--color-surface-muted)]" />
          </div>
        </motion.div>

        {/* Mobile Layout */}
        <motion.div
          className="lg:hidden relative flex flex-col items-center w-full h-full bg-[var(--color-bg)] z-10 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between w-full px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="font-display text-lg font-bold tracking-tight text-[var(--color-ink)] uppercase">
                MONO ARCHITECT
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 pb-32 max-w-[448px] w-full">
            <h2 className="font-display text-5xl font-black text-[var(--color-ink)] tracking-tight text-center mt-8 leading-tight">
              &iexcl;Partida<br />Completada!
            </h2>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-ink-secondary)] mt-2 mb-10">
              RESULTADOS DE LA SESI&Oacute;N
            </p>

            {/* Stat cards - stacked */}
            <div className="w-full flex flex-col gap-4 mb-10">
              <div className="flex items-center justify-between bg-[var(--color-surface-muted)] rounded-lg p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-1">TOTAL TIME</p>
                  <p className="text-2xl font-bold text-[var(--color-ink)] tracking-tight">{time}</p>
                </div>
                <Clock size={20} className="text-[var(--color-ink-secondary)]" />
              </div>
              <div className="flex items-center justify-between bg-[var(--color-surface-muted)] rounded-lg p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-1">TOTAL MOVES</p>
                  <p className="text-2xl font-bold text-[var(--color-ink)] tracking-tight">{moves}</p>
                </div>
                <MousePointerClick size={18} className="text-[var(--color-ink-secondary)]" />
              </div>
              <div className="flex items-center justify-between bg-[var(--color-surface-muted)] rounded-lg p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-1">PAIRS FOUND</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[var(--color-ink)] tracking-tight">{pairs.found}</span>
                    <span className="text-sm text-[var(--color-ink-secondary)]">/ {pairs.total}</span>
                  </div>
                </div>
                <Trophy size={20} className="text-[var(--color-ink-secondary)]" />
              </div>
            </div>

            {/* Actions */}
            <Button variant="primary" size="md" fullWidth onClick={onPlayAgain}
              className="font-bold tracking-tight"
            >
              Jugar de Nuevo
            </Button>

            <div className="flex flex-col items-center gap-4 mt-6">
              <button
                className="text-sm text-[var(--color-ink-secondary)] border-b border-transparent hover:border-current pb-0.5 transition-colors cursor-pointer"
                onClick={onChangeDifficulty}
              >
                Cambiar Dificultad
              </button>
              <button
                className="text-sm text-[var(--color-ink-secondary)] border-b border-transparent hover:border-current pb-0.5 transition-colors cursor-pointer"
                onClick={onGoHome}
              >
                Volver al Inicio
              </button>
            </div>

            {/* Decorative cards */}
            <div className="grid grid-cols-3 gap-4 w-full mt-16 opacity-10">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square bg-[var(--color-surface-muted)] rounded-md" />
              ))}
            </div>
          </div>

          <MobileBottomNav active="history" variant="victory" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
