import React from 'react';
import { motion } from 'framer-motion';
import { MINATI_ACRONYM } from '../data/tmfVerifiedData';
import { Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

export const MinatiBento3D: React.FC = () => {
  return (
    <section id="minati-mission" className="py-20 lg:py-28 bg-[#f7f9fb] text-[#191c1e] relative border-b border-border-subtle overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-100/50 via-white to-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#4b41e1] bg-indigo-50 border border-indigo-100 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4b41e1]" />
              The M-I-N-A-T-I Framework
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#191c1e] tracking-tight leading-tight">
              Our Guiding <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">6 Humanitarian Pillars</span>
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#45464d] mt-2 leading-relaxed">
              Every letter represents a core pillar of vulnerable society to whom our institutional coaching centers, infant winter care, and relief camps are devoted.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4b41e1] bg-white px-4 py-2.5 rounded-2xl border border-border-subtle shadow-xs shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#4b41e1]" />
            <span>Official Registered Framework</span>
          </div>
        </div>

        {/* 6-Letter Bento Grid with Clean Extracted Emblems & Stitch Double-Bezel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINATI_ACRONYM.map((item, index) => (
            <TiltCard3D key={item.letter + item.word} intensity={6}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="double-bezel-outer h-full group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5"
              >
                <div className="double-bezel-inner p-7 flex flex-col justify-between h-full space-y-6 relative overflow-hidden bg-white">
                  
                  {/* Top-Right Ambient Corner Flare */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-50/70 rounded-bl-full -z-0 transition-transform group-hover:scale-150 duration-500" />

                  {/* Top Bar: Letter, Word & Official Cropped Badge */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-black text-[#e0e3e5] group-hover:text-[#4b41e1] transition-colors leading-none mb-1">
                        {item.letter}
                      </div>
                      <div className="font-['Plus_Jakarta_Sans'] text-base font-extrabold text-[#191c1e] tracking-tight">
                        {item.word}
                      </div>
                      <div className="text-xs font-bold text-[#b87500] font-['Hind_Siliguri',sans-serif] mt-0.5">
                        {item.bengaliWord}
                      </div>
                    </div>

                    {/* Official Cropped Badge Icon from Flex */}
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-border-subtle shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shrink-0">
                      <img
                        src={item.badgeImg}
                        alt={`${item.word} official badge`}
                        className="w-full h-full object-contain filter contrast-110"
                      />
                    </div>
                  </div>

                  {/* Subtitle & Narrative */}
                  <div className="space-y-2 relative z-10">
                    <div className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#191c1e] leading-snug">
                      {item.subtitle}
                    </div>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[#45464d] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Milestone Stat */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="font-mono text-xs font-bold text-[#4b41e1]">
                      {item.stat}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#64748B] flex items-center gap-1 group-hover:text-[#4b41e1] transition-colors">
                      <span>Field Metric</span>
                      <ArrowUpRight className="w-3 h-3" />
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
