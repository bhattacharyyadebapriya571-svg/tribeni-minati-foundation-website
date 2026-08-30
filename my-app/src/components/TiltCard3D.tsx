import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  intensity = 15,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic 3D Specular Glare Overlay */}
        {isHovered && (
          <motion.div
            style={{
              background: `radial-gradient(circle 280px at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.18), transparent 70%)`,
            }}
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 transition-opacity duration-300 opacity-80"
          />
        )}
      </motion.div>
    </motion.div>
  );
};
