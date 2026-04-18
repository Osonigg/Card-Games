import {
  Compass, Building2, Layers, Home, Briefcase,
  Armchair, BedDouble, Monitor
} from 'lucide-react';
import { i } from 'motion/react-client';

export const SYMBOL_POOL = [
  { id: 'mouse',     img: '/mouse.png' },
  { id: 'Audifonos',     img: '/Audifonos.png' },
  { id: 'Bocinas',     img: '/Bocinas.png' },
  { id: 'CPU',     img: '/CPU.png' },
  { id: 'Escritorio',     img: '/Escritorio.png' },
  { id: 'Silla',     img: '/Silla.png' },
  { id: 'Teclado',     img: '/Teclado.png' },
  { id: 'Monitor',     img: '/Monitor.png' },
  
];

export const CARDS_SPANISH = [
  { id: '01-bastos',     img: '/01-bastos.png' },
  { id: '01-copas',     img: '/01-copas.png' },
  { id: '01-espadas',     img: '/01-espadas.png' },
  { id: '01-oro',     img: '/01-oros.png' },
  { id: '02-bastos',     img: '/02-bastos.png' },
  { id: '02-copas',     img: '/02-copas.png' },
  { id: '02-espadas',     img: '/02-espadas.png' },
  { id: '02-oro',     img: '/02-oros.png' },
  { id: '03-bastos',     img: '/03-bastos.png' },
  { id: '03-copas',     img: '/03-copas.png' },
  { id: '03-espadas',     img: '/03-espadas.png' },
  { id: '03-oro',     img: '/03-oros.png' },
  { id: '04-bastos',     img: '/04-bastos.png' },
  { id: '04-copas',     img: '/04-copas.png' },
  { id: '04-espadas',     img: '/04-espadas.png' },
  { id: '04-oro',     img: '/04-oros.png' },
  { id: '05-bastos',     img: '/05-bastos.png' },
  { id: '05-copas',     img: '/05-copas.png' },
  { id: '05-espadas',     img: '/05-espadas.png' },
  { id: '05-oro',     img: '/05-oros.png' },
  { id: '06-bastos',     img: '/06-bastos.png' },
  { id: '06-copas',     img: '/06-copas.png' },
  { id: '06-espadas',     img: '/06-espadas.png' },
  { id: '06-oro',     img: '/06-oros.png' },
  { id: '07-bastos',     img: '/07-bastos.png' },
  { id: '07-copas',     img: '/07-copas.png' },
  { id: '07-espadas',     img: '/07-espadas.png' },
  { id: '07-oro',     img: '/07-oros.png' },
  { id: '10-bastos',     img: '/10-bastos.png' },
  { id: '10-copas',     img: '/10-copas.png' },
  { id: '10-espadas',     img: '/10-espadas.png' },
  { id: '10-oro',     img: '/10-oros.png' },
  { id: '11-bastos',     img: '/11-bastos.png' },
  { id: '11-copas',     img: '/11-copas.png' },
  { id: '11-espadas',     img: '/11-espadas.png' },
  { id: '11-oro',     img: '/11-oros.png' },
  { id: '12-bastos',     img: '/12-bastos.png' },
  { id: '12-copas',     img: '/12-copas.png' },
  { id: '12-espadas',     img: '/12-espadas.png' },
  { id: '12-oro',     img: '/12-oros.png' },    
];

export const DIFFICULTY_CONFIG = {
  EASY:   { pairs: 3, cols: 3, label: 'Fácil (3×2)'   },
  MEDIUM: { pairs: 6, cols: 4, label: 'Medio (4×3)'   },
  HARD:   { pairs: 8, cols: 4, label: 'Difícil (4×4)' },
  VERYHARD: { pairs: 10, cols: 5, label: 'Muy Difícil (5×4)' },
  EXTREME:  { pairs: 12, cols: 6, label: 'Extremo (6×4)' },
};
