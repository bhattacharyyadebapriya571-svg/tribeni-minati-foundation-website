import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorMode = 'default' | 'pointer' | 'view' | 'explore' | 'cta';

export const CustomCursor3D: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const auraSpringConfig = { damping: 38, stiffness: 190 };
  const auraX = useSpring(cursorX, auraSpringConfig);
  const auraY = useSpring(cursorY, auraSpringConfig);

  useEffect(() => {
    try {
      // Disable on touch screens or reduced-motion preference
      if (
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ) {
        return;
      }

      setIsVisible(true);

      const handleMouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        const target = e.target as HTMLElement | null;
        if (target) {
          if (target.closest('[data-cursor="view"]') || target.tagName === 'IMG') {
            setMode('view');
          } else if (target.closest('[data-cursor="explore"]')) {
            setMode('explore');
          } else if (target.closest('[data-cursor="cta"]')) {
            setMode('cta');
          } else if (
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.tagName === 'INPUT' ||
            target.tagName === 'SELECT' ||
            target.tagName === 'TEXTAREA' ||
            target.closest('button') !== null ||
            target.closest('a') !== null ||
            target.classList.contains('cursor-pointer')
          ) {
            setMode('pointer');
          } else {
            setMode('default');
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } catch (_) {}
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer semantic aura */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed rounded-full transition-all duration-200 pointer-events-none flex items-center justify-center font-bold text-[9px] uppercase tracking-wider ${
          mode === 'view'
            ? 'w-16 h-16 bg-[#1B3B2B]/90 text-white backdrop-blur-md shadow-lg'
            : mode === 'explore'
              ? 'w-18 h-18 bg-[#D97706]/90 text-white backdrop-blur-md shadow-lg'
              : mode === 'cta'
                ? 'w-12 h-12 bg-[#1B3B2B] text-white shadow-md'
                : mode === 'pointer'
                  ? 'w-10 h-10 bg-[#1B3B2B]/10 border border-[#1B3B2B]/25 scale-110'
                  : 'w-7 h-7 bg-[#1B3B2B]/8 border border-[#1B3B2B]/15'
        }`}
      >
        {mode === 'view' && 'VIEW'}
        {mode === 'explore' && 'EXPLORE'}
        {mode === 'cta' && '→'}
      </motion.div>

      {/* Inner sharp point */}
      {mode === 'default' && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed rounded-full pointer-events-none w-2 h-2 bg-[#1B3B2B]"
        />
      )}
    </div>
  );
};
