import React, { useState, useEffect } from 'react';
import { SplineScene3D } from '../SplineScene3D';

interface SplineHeroSceneProps {
  sceneUrl?: string;
  className?: string;
  fallbackImage?: string;
}

export const SplineHeroScene: React.FC<SplineHeroSceneProps> = ({
  className = '',
  fallbackImage = '/tmf-assets/generated/hero_child_education.jpg',
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
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
    <div className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0a0f1d] via-[#111a2e] to-[#0f172a] shadow-2xl transition-all duration-500 group ${className}`}>
      {/* Native WebGL 3D Compassion Motif (Three.js Engine - 0 network failure) */}
      <SplineScene3D className="w-full h-full" />

      {/* Floating 3D Badge Indicator */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[10px] font-mono text-emerald-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>3D Gyro Interactive</span>
      </div>

      <div className="absolute top-4 left-4 z-20 pointer-events-none bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[10px] font-mono text-amber-300">
        Living Compassion Matrix
      </div>
    </div>
  );
};

export default SplineHeroScene;
