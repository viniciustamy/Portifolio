import { Variants } from "motion/react";

// Stagger wrapper variant for container grids
export const containerVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

// Sequential elements reveal animation (titles, paragraphs, small boxes)
export const itemVariants: Variants = {
  enter: { opacity: 0, y: 16, filter: 'blur(4px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.2 } },
};

// Delayed pop animation for visual cards & mockups
export const visualVariants: Variants = {
  enter: { opacity: 0, scale: 0.94, filter: 'blur(8px)', y: 12 },
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14, delay: 0.35 },
  },
  exit: { opacity: 0, scale: 0.94, filter: 'blur(8px)', transition: { duration: 0.2 } },
};
