import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  GraduationCap,
  Sprout,
  Users,
  ShieldAlert,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Heart,
  Sparkles,
} from 'lucide-react';
import { PILLARS_DATA } from '../data/foundationData';

interface ProgramExplorerProps {
  onSelectProgram?: (id: string) => void;
  onOpenDonate?: (amount?: number, cause?: string) => void;
}

const PROGRAM_ICONS: Record<string, any> = {
  healthcare: Activity,
  education: GraduationCap,
  'women-empowerment': Users,
  'sustainable-livelihood': Sprout,
  relief: ShieldAlert,
  'elderly-care': HeartHandshake,
};

const PROGRAM_PHOTOS: Record<string, string> = {
  healthcare: '/tmf-assets/field-photos/field-photo-3.jpg',
  education: '/tmf-assets/field-photos/field-photo-2.jpg',
  'women-empowerment': '/tmf-assets/field-photos/field-photo-6.jpg',
  'sustainable-livelihood': '/tmf-assets/field-photos/field-photo-7.jpg',
  relief: '/tmf-assets/field-photos/field-photo-1.jpg',
  'elderly-care': '/tmf-assets/field-photos/field-photo-8.jpg',
};

export const ProgramExplorer: React.FC<ProgramExplorerProps> = ({
  onSelectProgram,
  onOpenDonate,
}) => {
  const [activeTab, setActiveTab] = useState<string>('healthcare');
  const activePillar = PILLARS_DATA.find((p) => p.id === activeTab) || PILLARS_DATA[0];
  const IconComponent = PROGRAM_ICONS[activePillar.id] || Activity;

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[#1B3B2B] text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Ground Framework</span>
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-[#151C18] leading-tight font-normal">
            Six Pillars of Grassroots Transformation
          </h2>
          <p className="text-base text-[#5C6760] font-normal leading-relaxed">
            Our comprehensive, multi-pillar model addresses systemic rural poverty through targeted field interventions in health, child education, women's dignity, farming, disaster relief, and senior care.
          </p>
        </div>

        {/* 6 Pillars Horizontal Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {PILLARS_DATA.map((pillar, idx) => {
            const Icon = PROGRAM_ICONS[pillar.id] || Activity;
            const isActive = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#1B3B2B] text-white border-[#1B3B2B] shadow-lg shadow-[#1B3B2B]/15 scale-102'
                    : 'bg-white text-[#151C18] border-black/[0.08] hover:bg-black/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                    0{idx + 1}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#1B3B2B]'}`} />
                </div>
                <div className="text-xs font-bold leading-snug line-clamp-1">
                  {pillar.title}
                </div>
                <div className={`text-[10px] mt-0.5 font-normal truncate ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                  {pillar.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-black/[0.08] shadow-xl grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Pillar Description */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 mb-2">
                  <IconComponent className="w-4 h-4 text-amber-700" />
                  <span>Pillar {PILLARS_DATA.findIndex((p) => p.id === activePillar.id) + 1} • {activePillar.tag}</span>
                </div>
                <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-4xl text-[#151C18] leading-snug">
                  {activePillar.title}
                </h3>
                <div className="text-sm font-semibold text-emerald-800 mt-1">
                  {activePillar.subtitle}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#5C6760] leading-relaxed">
                {activePillar.longDescription || activePillar.body}
              </p>

              {/* Pillar Deliverables / Highlights */}
              <div className="space-y-2.5 pt-1">
                {activePillar.highlights?.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#151C18]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Key Impact Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {activePillar.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
                    <div className="font-mono text-lg font-bold text-[#1B3B2B]">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-[#5C6760] font-normal mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => onOpenDonate?.(5000, `Pillar: ${activePillar.title}`)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#1B3B2B]/20 transition-all cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  <span>Support {activePillar.title}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProgram?.(activePillar.id)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-black/[0.1] hover:bg-black/[0.03] text-xs font-bold text-[#151C18] transition-all cursor-pointer"
                >
                  <span>Explore In-Depth</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Real Field Photo Frame */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-black/[0.08]">
                <img
                  src={PROGRAM_PHOTOS[activePillar.id] || '/tmf-assets/field-photos/field-photo-1.jpg'}
                  alt={activePillar.title}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                    Grassroots Field Program
                  </div>
                  <div className="font-['DM_Serif_Display'] text-xl">
                    {activePillar.title}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
