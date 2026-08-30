import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * ParallaxTotem — HorizonX Stacked Vertical Scroll Reveal
 * 
 * Layered elements reveal sequentially as a totem pole — each layer slides in
 * from alternating directions with increasing parallax depth as the user scrolls.
 * Respects prefers-reduced-motion.
 */

interface ParallaxTotemProps {
  children: React.ReactNode;
  /** Index in the totem stack (0-based). Even = slide from left, odd = slide from right. */
  index?: number;
  /** Maximum horizontal offset in px. Default: 60 */
  maxOffset?: number;
  /** CSS class for the wrapper */
  className?: string;
}

export const ParallaxTotem: React.FC<ParallaxTotemProps> = ({
  children,
  index = 0,
  maxOffset = 60,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const direction = index % 2 === 0 ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 1], [direction * maxOffset, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1]);

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
