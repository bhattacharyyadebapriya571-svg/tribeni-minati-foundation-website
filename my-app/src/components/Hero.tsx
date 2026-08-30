import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Heart, Sparkles, Award, Camera } from 'lucide-react';
import { TMF_META, LEGAL_DOCS } from '../data/tmfVerifiedData';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface HeroProps {
  onOpenDonate: () => void;
  onOpenDocument: (doc: LegalDocument) => void;
}

const HERO_SLIDES = [
  {
    image: '/tmf-assets/generated/education-banyan.jpg',
    tag: 'Illiterate & Free Education',
    title: 'Empowering Rural Children with Free Coaching & Books',
    location: 'Minati Education Centers · Hooghly',
  },
  {
    image: '/tmf-assets/generated/winter-relief.jpg',
    tag: 'Needy & Winter Relief',
    title: 'Distributing Warm Blankets & Infant Winter Kits',
    location: 'Remote Bengal & Sundarbans Hamlets',
  },
  {
    image: '/tmf-assets/generated/rural-health.jpg',
    tag: 'Minorities & Tribal Healthcare',
    title: 'Free Medical Checkups, Medicines & Doctor Camps',
    location: 'Eastern India Grassroots Outreaches',
  },
  {
    image: '/tmf-assets/generated/women-tailoring.jpg',
    tag: 'Abused & Women Empowerment',
    title: 'Vocational Tailoring & Self-Reliance for Rural Women',
    location: 'Swabhiman Craft Workstations',
  },
];

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const Hero: React.FC<HeroProps> = ({ onOpenDonate, onOpenDocument }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const regDoc = LEGAL_DOCS.find((d) => d.id === 'society-reg') || LEGAL_DOCS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-36 sm:pt-44 lg:pt-48 pb-20 overflow-hidden bg-[#0A110D] text-white">
      
      {/* Background Cinematic Cross-Fade Field Photography */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.38, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center filter contrast-110 saturate-120"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Multi-Layer Cinematic Scrim & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A110D] via-[#0A110D]/75 to-[#0A110D]/85" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0A110D]/60 to-[#0A110D]" />
        
        {/* Subtle Ambient Gold Light Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        
        {/* Top Badges & Live Drive Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.1]">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.15] text-xs font-mono font-bold text-amber-300 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-5" />
            <span>Govt. Registered Society: SO212276 • Est. 2013</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[#E8E3D7]/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NITI Aayog DARPAN: <strong className="text-white">{TMF_META.ngoDarpanId}</strong></span>
            <span className="text-white/30">•</span>
            <Award className="w-4 h-4 text-amber-300" />
            <span className="text-amber-300 font-bold">100% Tax Deductible (80G)</span>
          </div>
        </div>

        {/* Central Monumental Brand Architecture */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 sm:pt-12">
          
          {/* Left Column: Prestigious Brand Header & Authority */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Monumental Seal & Names */}
            <div className="flex items-center gap-5 sm:gap-7">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING}
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md border-2 border-amber-300/40 p-2.5 flex items-center justify-center shadow-2xl shrink-0 group hover:scale-105 hover:border-amber-300 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-amber-400/20 blur-xl -z-10 group-hover:bg-amber-400/40 transition-all" />
                <img
                  src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                  alt="Tribeni Minati Foundation Official Seal"
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>

              <div>
                <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Serving Humanity with Devotion</span>
                </div>
                <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight font-normal">
                  Tribeni Minati <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-emerald-200 font-bold">
                    Foundation
                  </span>
                </h1>
                <div className="text-lg sm:text-2xl md:text-3xl text-[#E8E3D7] font-['Hind_Siliguri',sans-serif] font-bold mt-1.5 flex items-center gap-3">
                  <span className="text-amber-300">ত্রিবেনী মিনতি ফাউন্ডেশন</span>
                  <span className="text-white/40 text-sm font-normal">— "...your smile, our reward..."</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-emerald-300 font-bold mt-1">
                  "...Lets go.. Do something!!..."
                </div>
              </div>
            </div>

            {/* Inspiring Mission Statement */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-[#E8E3D7]/90 leading-relaxed max-w-2xl font-light"
            >
              Dedicated to <strong>Minorities, Illiterate, Needy, Abused, Tribal, and Indians (M-I-N-A-T-I)</strong> through free remedial coaching centers, infant winter care, and rural healthcare relief.
            </motion.p>

            {/* Direct Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary Golden CTA Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                onClick={onOpenDonate}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#0A110D] shadow-2xl shadow-amber-500/30 transition-all cursor-pointer font-mono group"
              >
                <Heart className="w-4 h-4 fill-[#0A110D] text-[#0A110D] group-hover:scale-110 transition-transform" />
                <span>Donate & Claim 80G Tax Exemption</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Secondary Legal Proof Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING}
                onClick={() => onOpenDocument(regDoc)}
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md border border-white/[0.15] transition-all cursor-pointer font-mono"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>View Registration Certificate</span>
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column: Live Field Documentary Preview Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-2xl relative overflow-hidden space-y-4">
              
              {/* Slide Header */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
                  <Camera className="w-3 h-3" />
                  <span>{HERO_SLIDES[currentSlide].tag}</span>
                </div>
                <span className="text-[10px] font-mono text-[#E8E3D7]/60">
                  Slide {currentSlide + 1} of {HERO_SLIDES.length}
                </span>
              </div>

              {/* Slide Image Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] shadow-inner">
                <img
                  src={HERO_SLIDES[currentSlide].image}
                  alt={HERO_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold leading-snug">
                  {HERO_SLIDES[currentSlide].title}
                </div>
              </div>

              <div className="text-[11px] text-[#E8E3D7]/70 font-mono flex items-center gap-1.5">
                <span>📍 Location: {HERO_SLIDES[currentSlide].location}</span>
              </div>

              {/* Carousel Dot Indicators */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-6 bg-amber-300' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>

            </div>

            {/* Quick Trust Guarantee Callout */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-200 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Public Audited Ledger • Zero Admin Diversion</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
