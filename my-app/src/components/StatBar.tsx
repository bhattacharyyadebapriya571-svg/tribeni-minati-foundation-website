import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMPACT_STATS } from '../data/foundationData';
import { Award, ShieldCheck, HeartHandshake, Globe, Users } from 'lucide-react';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const StatBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const iconData = [
    { icon: <Award className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50 border-blue-200' },
    { icon: <HeartHandshake className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50 border-amber-200' },
    { icon: <ShieldCheck className="w-5 h-5 text-rose-600" />, bg: 'bg-rose-50 border-rose-200' },
    { icon: <Users className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50 border-indigo-200' },
    { icon: <Globe className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div
      ref={ref}
      className="py-14 sm:py-16 bg-slate-50/70 border-y border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {IMPACT_STATS.map((stat, i) => {
            const currentIcon = iconData[i % iconData.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...SPRING, delay: i * 0.08 }}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg shadow-sm transition-all duration-300 group"
              >
                <div
                  className={`w-10 h-10 rounded-2xl ${currentIcon.bg} border flex items-center justify-center mb-3 shadow-xs group-hover:scale-108 transition-transform`}
                >
                  {currentIcon.icon}
                </div>
                <div className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mb-1 line-clamp-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
