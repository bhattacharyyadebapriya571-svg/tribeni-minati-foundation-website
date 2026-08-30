import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MotionFocus — HorizonX Attention-Directing Blur/Scale
 * 
 * When any item in the group is hovered, it scales up slightly while siblings
 * blur and desaturate — directing user attention through motion.
 * Respects prefers-reduced-motion.
 */

interface MotionFocusGroupProps {
  children: React.ReactNode;
  /** CSS class for the group container */
  className?: string;
}

interface MotionFocusGroupContextType {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  hasHover: boolean;
}

const MotionFocusGroupContext = React.createContext<MotionFocusGroupContextType>({
  hoveredId: null,
  setHoveredId: () => {},
  hasHover: false,
});

export const MotionFocusGroup: React.FC<MotionFocusGroupProps> = ({
  children,
  className = '',
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <MotionFocusGroupContext.Provider
      value={{ hoveredId, setHoveredId, hasHover: hoveredId !== null }}
    >
      <div className={className}>
        {children}
      </div>
    </MotionFocusGroupContext.Provider>
  );
};

interface MotionFocusItemProps {
  children: React.ReactNode;
  /** Unique ID for this item within the group */
  id: string;
  /** CSS class for the item wrapper */
  className?: string;
}

export const MotionFocusItem: React.FC<MotionFocusItemProps> = ({
  children,
  id,
  className = '',
}) => {
  const { hoveredId, setHoveredId, hasHover } = React.useContext(MotionFocusGroupContext);
  const prefersReducedMotion = useReducedMotion();

  const isActive = hoveredId === id;
  const isFaded = hasHover && !isActive;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
      animate={{
        scale: isActive ? 1.02 : isFaded ? 0.98 : 1,
        filter: isFaded ? 'blur(1.5px) saturate(0.7)' : 'blur(0px) saturate(1)',
        opacity: isFaded ? 0.65 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1] as const, // ease-move from ui-spec
      }}
      style={{ willChange: 'transform, filter, opacity' }}
    >
      {children}
    </motion.div>
  );
};
