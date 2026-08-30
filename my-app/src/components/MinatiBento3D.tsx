import React from 'react';
import { motion } from 'framer-motion';
import { MINATI_ACRONYM } from '../data/tmfVerifiedData';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

export const MinatiBento3D: React.FC = () => {
  const accentGradients = [
    'from-blue-500/10 via-white to-blue-50/50 hover:border-blue-500/40 text-blue-700',
    'from-emerald-500/10 via-white to-emerald-50/50 hover:border-emerald-500/40 text-emerald-700',
    'from-amber-500/10 via-white to-amber-50/50 hover:border-amber-500/40 text-amber-700',
    'from-rose-500/10 via-white to-rose-50/50 hover:border-rose-500/40 text-rose-700',
    'from-indigo-500/10 via-white to-indigo-50/50 hover:border-indigo-500/40 text-indigo-700',
    'from-cyan-500/10 via-white to-cyan-50/50 hover:border-cyan-500/40 text-cyan-700',
  ];

  return (
    <section id="minati-mission" className="py-24 sm:py-32 bg-white text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background soft ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Founding Philosophy & Core Emblems
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
              Decoding the Soul of <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent italic">M-I-N-A-T-I</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Every letter represents a core pillar of vulnerable society to whom our institutional coaching centers, infant winter care, and relief camps are devoted.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50/80 px-4 py-2.5 rounded-2xl border border-blue-200/80 shadow-xs shrink-0 font-medium">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Official Registered 6-Pillar Framework</span>
          </div>
        </div>

        {/* 6-Letter Bento Grid with Clean Extracted Emblems */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINATI_ACRONYM.map((item, index) => (
            <TiltCard3D key={item.letter + item.word} intensity={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-1 rounded-[2.2rem] bg-white border border-slate-200/90 hover:shadow-xl shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div className={`rounded-[calc(2.2rem-0.25rem)] p-6 sm:p-7 bg-gradient-to-br ${accentGradients[index % accentGradients.length]} flex flex-col justify-between h-full space-y-6 border border-white/60`}>
                  {/* Top Bar: Letter, Stat pill, and Emblem */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-slate-900 leading-none mb-1 group-hover:scale-105 transition-transform origin-left">
                        {item.letter}
                      </div>
                      <div className="text-xs font-bold text-slate-800 tracking-wide">
                        {item.word}
                      </div>
                      <div className="text-xs font-bold text-amber-700 font-['Hind_Siliguri',sans-serif] mt-0.5">
                        {item.bengaliWord}
                      </div>
                    </div>

                    {/* Clean Cropped Badge from Flex.png */}
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-slate-200/80 shadow-md shadow-slate-200/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shrink-0">
                      <img
                        src={item.badgeImg}
                        alt={`${item.word} official badge`}
                        className="w-full h-full object-contain filter contrast-110"
                      />
                    </div>
                  </div>

                  {/* Subtitle & Narrative */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800 leading-snug">
                      {item.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Milestone Stat */}
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-blue-700">
                      {item.stat}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                      Verified Field Metric
                    </span>
                  </div>
                </div>
              </motion.div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
