import { useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronRight, Grid3X3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { DIFFICULTY_CONFIG } from '../lib/cards.js';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import MobileHeader from '../components/layout/MobileHeader.jsx';
import MobileBottomNav from '../components/layout/MobileBottomNav.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';

/**
 * @param {object} props
 * @param {string} props.difficulty
 * @param {function} props.setDifficulty
 * @param {function} props.startGame
 */
export default function HomeScreen({ difficulty, setDifficulty, startGame }) {
  const navigate = useNavigate();

  const handlePlay = () => {
    startGame();
    navigate('/game');
  };

  const difficulties = Object.entries(DIFFICULTY_CONFIG);

  return (
    <div className="flex h-full bg-[var(--color-bg)]">
      {/* Desktop Sidebar */}
      <Sidebar
        activeNav="progress"
        onNewGame={handlePlay}
        onExit={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Desktop Topbar */}
        <Topbar />

        {/* Mobile Header */}
        <MobileHeader />

        {/* Content */}
        <main className="flex-1 flex flex-col items-center px-6 lg:px-12 overflow-y-auto">
          {/* Mobile: Badge */}
          <div className="lg:hidden mt-4">
            <Badge>MENTAL CLARITY</Badge>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mt-6 lg:mt-10 max-w-[576px]">
            <motion.h2
              className="font-display text-5xl lg:text-[56px] font-black text-[var(--color-ink)] tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Juego de<br />Memoria
            </motion.h2>
            <motion.p
              className="text-sm lg:text-lg text-[var(--color-ink-secondary)] mt-4 lg:mt-6 max-w-[400px] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Un desafio estructural para la mente. Encuentra las parejas en un entorno de
              diseno minimalista disenado para la concentracion maxima.
            </motion.p>
          </div>

          {/* Decorative Card Preview */}
          <motion.div
            className="w-full max-w-[480px] mt-6 lg:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-[var(--color-surface-muted)] rounded-lg p-6 lg:p-8 shadow-sm">
              <div className="grid grid-cols-4 gap-3 max-w-[300px] mx-auto">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      i === 0 || i === 5
                        ? 'bg-[var(--color-ink)]'
                        : 'bg-[#dadada]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)]">
                  SPATIAL LOGIC
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)]">
                  V1.0
                </span>
              </div>
            </div>
          </motion.div>

          {/* Difficulty Selector */}
          <div className="w-full max-w-[480px] mt-8 lg:mt-10">
            <p className="text-center text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-4">
              SELECCIONAR DIFICULTAD
            </p>

            {/* Desktop: full-width tabs */}
            <div className="hidden lg:grid grid-cols-3 gap-1 bg-[#f3f3f3] p-1 rounded-md">
              {difficulties.map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`
                    py-3 text-sm font-semibold rounded-sm transition-all cursor-pointer
                    ${difficulty === key
                      ? 'bg-white text-[var(--color-ink)] shadow-sm'
                      : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)]'
                    }
                  `}
                >
                  {config.label}
                </button>
              ))}
            </div>

            {/* Mobile: pill buttons */}
            <div className="flex lg:hidden gap-2 justify-center">
              {difficulties.map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`
                    px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer
                    ${difficulty === key
                      ? 'bg-[var(--color-ink)] text-white shadow-lg'
                      : 'bg-white text-[var(--color-ink)] shadow-sm'
                    }
                  `}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-[480px] mt-8 lg:mt-10 flex flex-col gap-3 pb-32 lg:pb-12">
            <Button variant="primary" size="lg" fullWidth onClick={handlePlay}
              icon={<ChevronRight size={16} />}
              className="font-display text-sm lg:text-lg tracking-wider uppercase font-bold rounded-lg shadow-xl"
            >
              JUGAR
            </Button>
            <Button variant="outline" size="lg" fullWidth
              icon={<HelpCircle size={16} />}
              className="font-display text-sm lg:text-lg tracking-wider uppercase font-bold rounded-lg"
            >
              INSTRUCTIONS
            </Button>
          </div>

          {/* Desktop footer strip */}
          <div className="hidden lg:flex items-center gap-12 mt-auto pb-12 opacity-60">
            {['GRID VARIABLE', 'MODO CONTRARRELOJ', 'GLOBAL RANKINGS'].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <Grid3X3 size={9} className="text-[var(--color-ink-secondary)]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)]">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <MobileBottomNav active="play" variant="home" />
      </div>
    </div>
  );
}
