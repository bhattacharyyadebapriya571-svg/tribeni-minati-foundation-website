import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * MotionColumn — HorizonX Parallax Vertical Columns
 * 
 * Creates depth by moving child columns at different scroll velocities.
 * The `speed` prop controls how much parallax offset each column gets.
 * Respects prefers-reduced-motion by disabling all parallax transforms.
 */

interface MotionColumnProps {
  children: React.ReactNode;
  /** Parallax speed multiplier. Positive = moves slower, negative = moves faster. Default: 0.15 */
  speed?: number;
  /** CSS class for the wrapper */
  className?: string;
}

export const MotionColumn: React.FC<MotionColumnProps> = ({
  children,
  speed = 0.15,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
