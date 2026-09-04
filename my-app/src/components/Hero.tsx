import React from 'react';
import { TMF_META } from '../data/tmfVerifiedData';
import { MotionColumn } from './motion/MotionColumn';
import { MotionFocusGroup, MotionFocusItem } from './motion/MotionFocus';
import { ShaderGradientHero } from './animations/ShaderGradientHero';
import { AnimatedIcon } from './animations/AnimatedIcon';
import { TiltCard3D } from './TiltCard3D';

interface HeroProps {
  onOpenDonate: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDonate, onExploreWork }) => {
  return (
    <>
      {/* Hero Section — HorizonX MotionColumn Parallax + Shader Gradient + Integrated 3D Stack */}
      <section className="relative w-full overflow-hidden pb-16 lg:pb-32 pt-16 lg:pt-24">
        {/* Dynamic WebGL Shader Gradient Background */}
        <ShaderGradientHero speed={0.0012} opacity={0.32} />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <MotionColumn speed={0.05} className="lg:col-span-6 flex flex-col gap-6">
              
              {/* Badge with Animated Sparkle Icon */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-border-subtle shadow-sm w-max hover:shadow-md transition-shadow">
                <AnimatedIcon preset="sparkle" size={16} fallbackMaterialIcon="star" />
                <span className="font-label-caps text-xs text-[#45464d]">
                  Govt. Reg: {TMF_META.newRegNo} | 80G Certified
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight leading-tight">
                Empowering Lives with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb] animate-gradient">
                  Dignity, Education &amp; Care.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-lg text-[#45464d] max-w-lg mt-2 text-balance">
                Institutional altruism driven by statutory transparency and emotional commitment. Join us in creating sustainable impact across rural India.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <button
                  onClick={onOpenDonate}
                  className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] text-[#111827] font-bold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_35px_-5px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <AnimatedIcon preset="heart" size={20} fallbackMaterialIcon="favorite" />
                  <span>Support Our Cause</span>
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
                    arrow_forward
                  </span>
                </button>

                <button
                  onClick={onExploreWork}
                  className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-md border border-slate-300/50 text-[#191c1e] font-semibold rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Explore Work
                </button>
              </div>
            </MotionColumn>

            {/* Right Media Section: Fully Integrated 3D Perspective Stack */}
            <MotionColumn speed={-0.05} className="lg:col-span-6 relative">
              <TiltCard3D intensity={12} className="w-full">
                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] bg-[#f2f4f6] p-2 group hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-500">
                  
                  {/* Verified Documentary Field Photo */}
                  <img
                    src="/tmf-assets/generated/hero_child_education.jpg"
                    alt="Free Child Remedial Education Center"
                    className="w-full h-full object-cover rounded-[1.5rem] group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Glass Bezel Ring Overlay */}
                  <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-black/10 pointer-events-none" />
                  
                  {/* 3D Floating Focus Badge */}
                  <div className="absolute bottom-8 left-4 sm:-left-4 z-20 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-4 transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#4b41e1] animate-bounce">
                        school
                      </span>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] text-[#45464d] uppercase">Focus Area</p>
                      <p className="font-headline-md text-base font-bold text-[#191c1e]">Child Education</p>
                    </div>
                  </div>

                  {/* 3D Live Indicator Badge */}
                  <div className="absolute top-6 right-6 z-20 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] font-mono text-emerald-300 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>3D Interactive Depth</span>
                  </div>

                </div>
              </TiltCard3D>
            </MotionColumn>

          </div>
        </div>
      </section>

      {/* Impact Metrics (Floating Card) — HorizonX MotionFocus */}
      <section className="relative w-full z-20 -mt-12 lg:-mt-24 mb-16 lg:mb-32">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] border border-white/50 p-8 md:p-12 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)] transition-shadow duration-500">
            <MotionFocusGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/50">
              
              <MotionFocusItem id="metric-coached" className="pt-4 md:pt-0 px-4">
                <div className="flex flex-col gap-2 group">
                  <span className="font-stat-lg text-4xl sm:text-5xl font-bold text-[#191c1e] tracking-tight group-hover:text-[#4b41e1] transition-colors">
                    6,400+
                  </span>
                  <span className="font-headline-md text-sm font-semibold text-[#191c1e]">
                    Students Coached
                  </span>
                  <p className="font-body-sm text-xs text-[#45464d]">
                    Enrolled across our free rural remedial education centers.
                  </p>
                </div>
              </MotionFocusItem>

              <MotionFocusItem id="metric-blankets" className="pt-4 md:pt-0 px-4">
                <div className="flex flex-col gap-2 group">
                  <span className="font-stat-lg text-4xl sm:text-5xl font-bold text-[#191c1e] tracking-tight group-hover:text-[#4b41e1] transition-colors">
                    1,200+
                  </span>
                  <span className="font-headline-md text-sm font-semibold text-[#191c1e]">
                    Infant Winter Kits
                  </span>
                  <p className="font-body-sm text-xs text-[#45464d]">
                    Insulated zipped bedding and warm clothing distributed.
                  </p>
                </div>
              </MotionFocusItem>

              <MotionFocusItem id="metric-patients" className="pt-4 md:pt-0 px-4">
                <div className="flex flex-col gap-2 group">
                  <span className="font-stat-lg text-4xl sm:text-5xl font-bold text-[#191c1e] tracking-tight group-hover:text-[#4b41e1] transition-colors">
                    3,500+
                  </span>
                  <span className="font-headline-md text-sm font-semibold text-[#191c1e]">
                    Patients Treated
                  </span>
                  <p className="font-body-sm text-xs text-[#45464d]">
                    Free general health screenings and specialist consultations.
                  </p>
                </div>
              </MotionFocusItem>

              <MotionFocusItem id="metric-governance" className="pt-4 md:pt-0 px-4">
                <div className="flex flex-col gap-2 group">
                  <span className="font-stat-lg text-4xl sm:text-5xl font-bold text-[#191c1e] tracking-tight group-hover:text-[#4b41e1] transition-colors">
                    100%
                  </span>
                  <span className="font-headline-md text-sm font-semibold text-[#191c1e]">
                    Statutory Compliance
                  </span>
                  <p className="font-body-sm text-xs text-[#45464d]">
                    Audited utilization accounts under 12A &amp; 80G provisions.
                  </p>
                </div>
              </MotionFocusItem>

            </MotionFocusGroup>
          </div>
        </div>
      </section>
    </>
  );
};
