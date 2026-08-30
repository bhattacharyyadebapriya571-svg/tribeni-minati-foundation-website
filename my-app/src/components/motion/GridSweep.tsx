import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * GridSweep — HorizonX Staggered Grid Entrance
 * 
 * Grid items animate into view sequentially with a diagonal or row-by-row sweep.
 * Uses Framer Motion `staggerChildren` + `whileInView` for scroll-triggered entrance.
 * Respects prefers-reduced-motion.
 */

interface GridSweepContainerProps {
  children: React.ReactNode;
  /** Delay between each child animation in seconds. Default: 0.08 */
  stagger?: number;
  /** CSS class for the grid container */
  className?: string;
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

export const GridSweepContainer: React.FC<GridSweepContainerProps> = ({
  children,
  stagger = 0.08,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * GridSweepItem — Individual item in a GridSweep grid.
 * Slides up and fades in when the parent container enters the viewport.
 */
interface GridSweepItemProps {
  children: React.ReactNode;
  /** CSS class for the item wrapper */
  className?: string;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1] as const, // ease-enter from ui-spec
    },
  },
};

export const GridSweepItem: React.FC<GridSweepItemProps> = ({
  children,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
};
