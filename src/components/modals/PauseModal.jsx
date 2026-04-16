import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, SlidersHorizontal, LogOut, Pause, ChevronRight, X } from 'lucide-react';
import Button from '../ui/Button.jsx';

/**
 * @param {object} props
 * @param {function} props.onResume
 * @param {function} props.onRestart
 * @param {function} props.onChangeDifficulty
 * @param {function} props.onExit
 */
export default function PauseModal({ onResume, onRestart, onChangeDifficulty, onExit }) {
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
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onResume} />

        {/* Desktop Modal */}
        <motion.div
          className="hidden lg:flex relative flex-col items-center bg-white p-12 pt-14 max-w-[448px] w-full shadow-md z-10 rounded-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-black text-[var(--color-ink)] tracking-tight">
              Juego en Pausa
            </h2>
            <div className="w-12 h-1 bg-[var(--color-ink)] mx-auto mt-2" />
          </div>

          <div className="w-full flex flex-col gap-3">
            <Button variant="primary" size="md" fullWidth onClick={onResume}
              icon={<Play size={14} />}
              className="tracking-wider"
            >
              Reanudar
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={onRestart}
              icon={<RotateCcw size={16} />}
            >
              Reiniciar
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={onChangeDifficulty}
              icon={<SlidersHorizontal size={18} />}
            >
              Cambiar Dificultad
            </Button>
          </div>

          <div className="w-full mt-8">
            <Button variant="outline" size="md" fullWidth onClick={onExit}
              icon={<LogOut size={18} />}
              className="text-[var(--color-ink-secondary)]"
            >
              Salir al Menu
            </Button>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-secondary)] mt-8">
            ARCHITECT MEMORY V1.0
          </p>
        </motion.div>

        {/* Mobile Modal */}
        <motion.div
          className="lg:hidden relative flex flex-col items-center bg-white rounded-3xl p-8 mx-6 max-w-[400px] w-full shadow-xl z-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Pause icon badge */}
          <div className="w-12 h-12 bg-[var(--color-surface-muted)] rounded-xl flex items-center justify-center mb-4">
            <Pause size={20} className="text-[var(--color-ink)]" />
          </div>

          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-1">
            Juego en Pausa
          </h2>
          <p className="text-sm text-[var(--color-ink-secondary)] mb-6">
            Partida: Nivel Arquitecto
          </p>

          <div className="w-full flex flex-col gap-3">
            <Button variant="primary" size="md" fullWidth onClick={onResume}
              icon={<Play size={14} />}
            >
              Reanudar
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={onRestart}
              icon={<RotateCcw size={14} />}
            >
              Reiniciar
            </Button>
          </div>

          <div className="w-full border-t border-[var(--color-border)] mt-6 pt-4 flex flex-col gap-2">
            <button
              className="flex items-center justify-between w-full py-3 px-1 text-sm text-[var(--color-ink)] cursor-pointer"
              onClick={onChangeDifficulty}
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal size={16} className="text-[var(--color-ink-secondary)]" />
                <span>Cambiar Dificultad</span>
              </div>
              <ChevronRight size={14} className="text-[var(--color-ink-secondary)]" />
            </button>
            <button
              className="flex items-center justify-between w-full py-3 px-1 text-sm text-[var(--color-ink)] cursor-pointer"
              onClick={onExit}
            >
              <div className="flex items-center gap-3">
                <LogOut size={16} className="text-[var(--color-ink-secondary)]" />
                <span>Salir al Menu</span>
              </div>
              <X size={14} className="text-[var(--color-danger)]" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
