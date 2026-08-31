import React, { useEffect, useRef, useState } from 'react';
import { Lottie } from 'lottie-react';

export interface AnimatedIllustrationProps {
  type?: 'lottie' | 'image' | 'svg';
  src?: string | object;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  aspectRatio?: '4/3' | '1/1' | '16/9';
  loop?: boolean;
  autoplay?: boolean;
}

export const AnimatedIllustration: React.FC<AnimatedIllustrationProps> = ({
  type = 'lottie',
  src,
  fallbackImage = '/tmf-assets/generated/hero_child_education.jpg',
  alt = 'Animated Illustration',
  className = '',
  aspectRatio = '4/3',
  loop = true,
  autoplay = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lottieData, setLottieData] = useState<object | null>(typeof src === 'object' ? src : null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch Lottie JSON if string URL
  useEffect(() => {
    if (isVisible && typeof src === 'string' && type === 'lottie') {
      fetch(src)
        .then((r) => r.json())
        .then((data) => setLottieData(data))
        .catch(() => setLottieData(null));
    }
  }, [isVisible, src, type]);

  const aspectClass =
    aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-video'
      : 'aspect-[4/3]';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center ${className}`}
    >
      {!isVisible && (
        <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
        </div>
      )}

      {isVisible && (
        <>
          {prefersReducedMotion || !lottieData ? (
            <img
              src={typeof src === 'string' && type !== 'lottie' ? src : fallbackImage}
              alt={alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <Lottie
              src={lottieData}
              loop={loop}
              autoplay={autoplay}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AnimatedIllustration;
