import React from 'react';
import { STATS_DATA } from '../data/foundationData';

export const StatBar: React.FC = () => {
  return (
    <div className="w-full py-12 bg-[#131b2e] text-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {STATS_DATA.map((stat, i) => (
            <div key={i} className="pt-6 lg:pt-0 px-4 space-y-1">
              <div className="font-display-lg text-4xl sm:text-5xl font-extrabold text-[#F59E0B] tracking-tight">
                {stat.value}
              </div>
              <div className="font-headline-md text-sm font-bold text-white">
                {stat.label}
              </div>
              <div className="font-mono text-xs text-slate-300">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
