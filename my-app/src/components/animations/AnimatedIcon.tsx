import React, { useRef, useState, useEffect } from 'react';
import { Lottie, type LottieHandle } from 'lottie-react';

// Lightweight pre-bundled SVG-based Lottie JSON definitions for zero-latency instant rendering
const BUILT_IN_LOTTIES: Record<string, object> = {
  heart: {
    v: '5.5.7',
    fr: 30,
    ip: 0,
    op: 30,
    w: 60,
    h: 60,
    nm: 'Heart',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'HeartShape',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [30, 30, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [100, 100, 100] },
              { t: 15, s: [120, 120, 100] },
              { t: 30, s: [100, 100, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sh',
                ks: {
                  a: 0,
                  k: {
                    c: true,
                    v: [[0, -10], [10, -20], [20, -10], [10, 10], [0, 20], [-10, 10], [-20, -10], [-10, -20]],
                    i: [[-5, -5], [-5, 0], [0, -5], [5, -5], [0, 0], [-5, 5], [0, 5], [5, 0]],
                    o: [[5, -5], [5, 0], [0, 5], [-5, 5], [0, 0], [5, -5], [0, -5], [-5, 0]],
                  },
                },
              },
              { ty: 'fl', c: { a: 0, k: [0.937, 0.267, 0.267, 1] }, o: { a: 0, k: 100 } },
              { ty: 'tr', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
            ],
          },
        ],
      },
    ],
  },
  sparkle: {
    v: '5.5.7',
    fr: 30,
    ip: 0,
    op: 30,
    w: 60,
    h: 60,
    nm: 'Sparkle',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Star',
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 1, k: [{ t: 0, s: [0] }, { t: 30, s: [180] }] },
          p: { a: 0, k: [30, 30, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 1, k: [{ t: 0, s: [80, 80, 100] }, { t: 15, s: [110, 110, 100] }, { t: 30, s: [80, 80, 100] }] },
        },
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ty: 'sr',
                sy: 1,
                pt: { a: 0, k: 4 },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 0 },
                or: { a: 0, k: 20 },
                os: { a: 0, k: 0 },
                ir: { a: 0, k: 6 },
                is: { a: 0, k: 0 },
              },
              { ty: 'fl', c: { a: 0, k: [0.961, 0.620, 0.043, 1] }, o: { a: 0, k: 100 } },
              { ty: 'tr', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
            ],
          },
        ],
      },
    ],
  },
};

export interface AnimatedIconProps {
  src?: object | string;
  preset?: 'heart' | 'sparkle';
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnScroll?: boolean;
  className?: string;
  size?: number | string;
  fallbackMaterialIcon?: string;
  alt?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  src,
  preset,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnScroll = false,
  className = '',
  size = 24,
  fallbackMaterialIcon = 'star',
  alt = 'Animated Icon',
}) => {
  const lottieRef = useRef<LottieHandle | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [animationData, setAnimationData] = useState<object | null>(
    preset && BUILT_IN_LOTTIES[preset] ? BUILT_IN_LOTTIES[preset] : typeof src === 'object' ? src : null
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Fetch from URL if string provided
  useEffect(() => {
    if (typeof src === 'string') {
      fetch(src)
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch(() => setAnimationData(null));
    }
  }, [src]);

  // Handle play on scroll
  useEffect(() => {
    if (!playOnScroll || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.play();
        } else {
          lottieRef.current?.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [playOnScroll]);

  const handleMouseEnter = () => {
    if (playOnHover && !prefersReducedMotion) {
      lottieRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && !loop) {
      lottieRef.current?.stop();
    }
  };

  const dimension = typeof size === 'number' ? `${size}px` : size;

  if (prefersReducedMotion || !animationData) {
    return (
      <span
        className={`inline-flex items-center justify-center material-symbols-outlined ${className}`}
        style={{ width: dimension, height: dimension, fontSize: dimension }}
        aria-label={alt}
      >
        {fallbackMaterialIcon}
      </span>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: dimension, height: dimension }}
      aria-label={alt}
    >
      <Lottie
        lottieRef={lottieRef}
        src={animationData}
        loop={!prefersReducedMotion && (playOnHover ? false : loop)}
        autoplay={!prefersReducedMotion && (playOnHover ? false : autoplay)}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AnimatedIcon;
