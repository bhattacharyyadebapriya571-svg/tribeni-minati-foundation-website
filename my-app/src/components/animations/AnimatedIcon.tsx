import React, { useState, useEffect } from 'react';

export interface AnimatedIconProps {
  preset?: 'heart' | 'sparkle' | 'shield' | 'school' | 'medical';
  src?: object | string;
  className?: string;
  size?: number | string;
  fallbackMaterialIcon?: string;
  alt?: string;
  playOnHover?: boolean;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  preset = 'sparkle',
  className = '',
  size = 20,
  fallbackMaterialIcon,
  alt = 'Animated Icon',
  playOnHover = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch {
      // Fallback gracefully
    }
  }, []);

  const dimension = typeof size === 'number' ? `${size}px` : size;

  if (prefersReducedMotion && fallbackMaterialIcon) {
    return (
      <span
        className={`material-symbols-outlined inline-flex items-center justify-center ${className}`}
        style={{ fontSize: dimension, width: dimension, height: dimension }}
        aria-label={alt}
      >
        {fallbackMaterialIcon}
      </span>
    );
  }

  // Render High-Performance Vector Animated Icons
  if (preset === 'heart') {
    return (
      <span
        onMouseEnter={() => playOnHover && setIsHovered(true)}
        onMouseLeave={() => playOnHover && setIsHovered(false)}
        className={`inline-flex items-center justify-center shrink-0 ${className} ${
          !prefersReducedMotion ? 'animate-pulse hover:scale-125 transition-transform duration-300' : ''
        }`}
        style={{ width: dimension, height: dimension }}
        aria-label={alt}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-rose-500 drop-shadow-sm"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </span>
    );
  }

  if (preset === 'sparkle') {
    return (
      <span
        onMouseEnter={() => playOnHover && setIsHovered(true)}
        onMouseLeave={() => playOnHover && setIsHovered(false)}
        className={`inline-flex items-center justify-center shrink-0 ${className} ${
          !prefersReducedMotion ? 'animate-spin-slow hover:rotate-180 transition-transform duration-500' : ''
        }`}
        style={{ width: dimension, height: dimension }}
        aria-label={alt}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-amber-500 drop-shadow-xs"
        >
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      </span>
    );
  }

  if (preset === 'shield') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: dimension, height: dimension }}
        aria-label={alt}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-emerald-500 drop-shadow-xs"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      </span>
    );
  }

  // Default fallback to Material Icon with subtle micro-motion
  return (
    <span
      className={`material-symbols-outlined inline-flex items-center justify-center transition-transform duration-300 ${
        isHovered ? 'scale-115' : ''
      } ${className}`}
      style={{ fontSize: dimension, width: dimension, height: dimension }}
      aria-label={alt}
    >
      {fallbackMaterialIcon || 'verified'}
    </span>
  );
};

export default AnimatedIcon;
