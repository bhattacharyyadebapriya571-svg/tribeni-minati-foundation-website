import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Sparkles, School, Users, FileCheck, Calendar } from 'lucide-react';
import { TMF_META, LEGAL_DOCS } from '../data/tmfVerifiedData';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface HeroProps {
  onOpenDonate: () => void;
  onOpenDocument: (doc: LegalDocument) => void;
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const Hero: React.FC<HeroProps> = ({ onOpenDonate, onOpenDocument }) => {
  const regDoc = LEGAL_DOCS.find((d) => d.id === 'society-reg') || LEGAL_DOCS[0];

  return (
    <div className="w-full relative overflow-hidden pt-28 lg:pt-36 pb-12">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Live Certified Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-border-subtle shadow-xs w-max">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4b41e1] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#45464d] tracking-wide">
                Govt. Reg: {TMF_META.newRegNo} · 80G Certified
              </span>
            </div>

            {/* Main Headline with Stitch typography */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                  alt="Tribeni Minati Foundation Emblem"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-sm sm:text-base tracking-widest uppercase text-[#4b41e1]">
                  Tribeni Minati Foundation
                </span>
              </div>

              <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#191c1e] tracking-tight leading-[1.1]">
                Empowering Lives with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] via-[#645efb] to-[#F59E0B] animate-gradient font-black">
                  Dignity, Education & Care.
                </span>
              </h1>
            </div>

            {/* Bengali Subtitle & Action Motto */}
            <div className="space-y-2">
              <div className="text-lg sm:text-xl text-[#191c1e] font-['Hind_Siliguri',sans-serif] font-bold flex items-center gap-2">
                <span className="text-[#4b41e1]">ত্রিবেনী মিনতি ফাউন্ডেশন</span>
                <span className="text-slate-400 font-normal text-sm font-mono">— "...your smile, our reward..."</span>
              </div>
              <p className="font-['Inter'] text-base sm:text-lg text-[#45464d] max-w-xl text-balance leading-relaxed">
                Institutional altruism driven by statutory transparency and emotional commitment. Bridging the gap between raw grassroots need and structured, technology-driven upliftment across Bengal.
              </p>
              <div className="font-mono text-xs text-[#059669] font-bold">
                "...Lets go.. Do something!!..."
              </div>
            </div>

            {/* Action Buttons with Magnetic CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING}
                onClick={onOpenDonate}
                className="px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-['Plus_Jakarta_Sans'] font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Heart className="w-4 h-4 fill-[#111827] text-[#111827] group-hover:scale-110 transition-transform" />
                <span>Support Our Cause</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => onOpenDocument(regDoc)}
                className="px-8 py-4 bg-white/70 hover:bg-white backdrop-blur-md border border-border-subtle text-[#191c1e] font-['Plus_Jakarta_Sans'] font-bold rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-[#4b41e1]" />
                <span>Verify DARPAN & Reg</span>
              </button>
            </div>
          </div>

          {/* Right Image Showcase (Double-Bezel) */}
          <div className="lg:col-span-6 relative">
            <div className="double-bezel-outer group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="double-bezel-inner relative aspect-[4/3] overflow-hidden">
                <img
                  src="/tmf-assets/real-field-photos/tmf-field-1.jpeg"
                  alt="Minati Free Remedial Education Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Focus Area Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4b41e1]">
                    <School className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Ground Focus Area
                    </p>
                    <p className="font-['Plus_Jakarta_Sans'] text-sm font-extrabold text-[#191c1e]">
                      Minati Free Coaching Center
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics Floating Bento Strip */}
        <div className="mt-16 lg:mt-20">
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(15,23,42,0.08)] border border-white/60 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">
              
              <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#4b41e1] shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-[#191c1e]">500+</h3>
                  <p className="font-mono text-[11px] font-bold text-[#64748B] uppercase">Children Coached</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#F59E0B] shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-[#191c1e]">1,200+</h3>
                  <p className="font-mono text-[11px] font-bold text-[#64748B] uppercase">Relief Kits Distributed</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#059669] shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-[#059669]">100%</h3>
                  <p className="font-mono text-[11px] font-bold text-[#64748B] uppercase">Tax Exempt (80G)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563eb] shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-[#191c1e]">10+</h3>
                  <p className="font-mono text-[11px] font-bold text-[#64748B] uppercase">Years Ground Service</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
