import {
  Compass, Building2, Layers, Home, Briefcase,
  Armchair, BedDouble, Monitor
} from 'lucide-react';

export const SYMBOL_POOL = [
  { id: 'mouse',     img: '/mouse.jpeg' },
  { id: 'compass',   Icon: Compass   },
  { id: 'building',  Icon: Building2 },
  { id: 'layers',    Icon: Layers    },
  { id: 'home',      Icon: Home      },
  { id: 'briefcase', Icon: Briefcase },
  { id: 'armchair',  Icon: Armchair  },
  { id: 'bed',       Icon: BedDouble },
  { id: 'monitor',   Icon: Monitor   },
];

export const DIFFICULTY_CONFIG = {
  EASY:   { pairs: 3, cols: 3, label: 'Fácil (3×2)'   },
  MEDIUM: { pairs: 6, cols: 4, label: 'Medio (4×3)'   },
  HARD:   { pairs: 8, cols: 4, label: 'Difícil (4×4)' },
};
