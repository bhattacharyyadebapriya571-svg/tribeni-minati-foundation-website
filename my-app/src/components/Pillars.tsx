import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PILLARS_DATA } from '../data/foundationData';
import type { PillarItem } from '../types';
import { Activity, GraduationCap, Users, Sprout, Truck, ShieldAlert, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface PillarsProps {
  onSelectPillar: (pillar: PillarItem) => void;
  onOpenDonate?: (presetAmount?: number) => void;
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const Pillars: React.FC<PillarsProps> = ({ onSelectPillar, onOpenDonate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-amber-600" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-cyan-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="pillars" className="py-24 sm:py-32 bg-white text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={SPRING}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Our 6 Core Programmes
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
            Integrated Interventions for Sustainable Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            From 24/7 emergency healthcare and digital literacy to solar cold chains and crisis relief, our 6 operational pillars work synergistically to break cycles of generational poverty.
          </p>
        </motion.div>

        {/* 6-Pillar Interactive Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS_DATA.map((pillar) => (
            <TiltCard3D key={pillar.id} intensity={8}>
              <div
                onClick={() => onSelectPillar(pillar)}
                className="rounded-[2.2rem] p-1 bg-white border border-slate-200/90 hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer"
              >
                <div className="rounded-[calc(2.2rem-0.25rem)] bg-white p-7 sm:p-8 flex flex-col justify-between h-full space-y-6">
                  {/* Top Bar: Icon, Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        {getIcon(pillar.iconName)}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-semibold text-amber-700 mt-1">
                      {pillar.subtitle}
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                      {pillar.body}
                    </p>
                  </div>

                  {/* Impact Metric & Actions */}
                  <div className="pt-5 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-['DM_Serif_Display'] text-2xl text-slate-900">
                        {pillar.metrics[0]?.value || '10,000+'}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        {pillar.metrics[0]?.label || 'Impact Metric'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:underline">
                        <span>Explore Programme</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>

                      {onOpenDonate && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDonate(2500);
                          }}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                          title="Sponsor this program"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
