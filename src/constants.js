import {
  Compass, Building2, Layers, Home, Briefcase,
  Armchair, BedDouble, Monitor
} from 'lucide-react';

export const SYMBOL_POOL = [
  { id: 'mouse',     img: '/mouse.png' },
  { id: 'Audifonos',     img: '/Audifonos.png' },
  { id: 'Bocinas',     img: '/Bocinas.png' },
  { id: 'CPU',     img: '/CPU.png' },
  { id: 'Escritorio',     img: '/Escritorio .png' },
  { id: 'Silla',     img: '/Silla.png' },
  { id: 'Teclado',     img: '/Teclado.png' },
  { id: 'Monitor',     img: '/Monitor.png' },
  
];

export const DIFFICULTY_CONFIG = {
  EASY:   { pairs: 3, cols: 3, label: 'Fácil (3×2)'   },
  MEDIUM: { pairs: 6, cols: 4, label: 'Medio (4×3)'   },
  HARD:   { pairs: 8, cols: 4, label: 'Difícil (4×4)' },
};
