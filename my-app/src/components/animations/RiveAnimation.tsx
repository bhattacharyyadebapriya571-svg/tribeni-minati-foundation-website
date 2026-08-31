import React, { useEffect, useState } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export interface RiveAnimationProps {
  src?: string;
  artboard?: string;
  stateMachines?: string | string[];
  animations?: string | string[];
  autoplay?: boolean;
  isHovered?: boolean;
  isActive?: boolean;
  hoverInputName?: string;
  activeInputName?: string;
  className?: string;
  fallbackIcon?: string;
  ariaLabel?: string;
  onLoad?: () => void;
}

export const RiveAnimation: React.FC<RiveAnimationProps> = ({
  src = 'https://cdn.rive.app/animations/vehicles.riv',
  artboard,
  stateMachines = 'State Machine 1',
  animations,
  autoplay = true,
  isHovered = false,
  isActive = false,
  hoverInputName = 'Hover',
  activeInputName = 'Active',
  className = 'w-full h-full',
  fallbackIcon = 'motion_photos_on',
  ariaLabel = 'Interactive Rive Animation',
  onLoad,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const stateMachineName = Array.isArray(stateMachines) ? stateMachines[0] : stateMachines;

  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: prefersReducedMotion ? undefined : stateMachines,
    animations: prefersReducedMotion ? undefined : animations,
    autoplay: !prefersReducedMotion && autoplay,
    onLoad: () => {
      if (onLoad) onLoad();
    },
  });

  // State machine reactive inputs
  const hoverInput = useStateMachineInput(rive, stateMachineName, hoverInputName);
  const activeInput = useStateMachineInput(rive, stateMachineName, activeInputName);

  useEffect(() => {
    if (hoverInput) {
      hoverInput.value = isHovered;
    }
  }, [isHovered, hoverInput]);

  useEffect(() => {
    if (activeInput) {
      activeInput.value = isActive;
    }
  }, [isActive, activeInput]);

  if (prefersReducedMotion) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100/50 rounded-xl ${className}`}
        aria-label={ariaLabel}
      >
        <span className="material-symbols-outlined text-slate-400 text-[24px]">
          {fallbackIcon}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} aria-label={ariaLabel}>
      <RiveComponent className="w-full h-full" />
    </div>
  );
};

export default RiveAnimation;
