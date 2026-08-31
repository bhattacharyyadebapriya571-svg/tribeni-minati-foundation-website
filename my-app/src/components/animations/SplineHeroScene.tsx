import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineHeroSceneProps {
  sceneUrl?: string;
  className?: string;
  fallbackImage?: string;
}

export const SplineHeroScene: React.FC<SplineHeroSceneProps> = ({
  sceneUrl = 'https://prod.spline.design/6W-r0eS0-qj1F49T/scene.splinecode',
  className = '',
  fallbackImage = '/tmf-assets/generated/hero_child_education.jpg',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion || hasError) {
    return (
      <div className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl ${className}`}>
        <img
          src={fallbackImage}
          alt="Tribeni Minati Foundation Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
          Static 2D Mode
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#0d121f] shadow-2xl transition-all duration-500 ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 animate-pulse p-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-4 animate-bounce">
            <span className="material-symbols-outlined text-[32px]">view_in_ar</span>
          </div>
          <div className="h-3 w-32 bg-indigo-400/20 rounded-full mb-2" />
          <div className="h-2 w-20 bg-indigo-400/10 rounded-full" />
          <span className="font-mono text-[11px] text-indigo-300/60 mt-4 tracking-widest uppercase">
            Loading Interactive 3D...
          </span>
        </div>
      )}

      {/* Spline 3D Scene */}
      <div className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Spline
          scene={sceneUrl}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
        />
      </div>

      {/* Interactive Badge Indicator */}
      {isLoaded && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive 3D Active</span>
        </div>
      )}
    </div>
  );
};

export default SplineHeroScene;
