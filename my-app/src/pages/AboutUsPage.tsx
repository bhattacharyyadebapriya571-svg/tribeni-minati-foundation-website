import React from 'react';
import type { PageId } from '../types';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onOpenDonate }) => {
  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Hero / Origin Story */}
      <section className="relative w-full pt-16 lg:pt-24 pb-16 px-4 sm:px-8 max-w-[1280px] mx-auto z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="inline-flex items-center gap-4">
            <span className="w-12 h-[2px] bg-[#4b41e1]" />
            <span className="font-label-caps text-xs uppercase text-[#4b41e1] tracking-widest font-bold">
              Our Genesis
            </span>
          </div>

          <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight max-w-2xl leading-tight">
            Institutional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
              Altruism
            </span>{' '}
            Meets Modern Intervention.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#45464d] max-w-xl leading-relaxed">
            Founded on the belief that profound empathy requires clinical precision, the Tribeni Minati Foundation bridges the gap between raw humanitarian need and structured, technology-driven upliftment. We don't just donate; we engineer self-sustaining ecosystems.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-2 text-[#4b41e1] font-semibold hover:gap-4 transition-all duration-300 cursor-pointer text-sm"
            >
              <span>Explore Our Methodology</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#4b41e1]/20 to-black/10 blur-3xl opacity-50 rounded-full group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 bg-slate-100">
            <img
              src="/tmf-assets/real-field-photos/tmf-field-10.jpeg"
              alt="Tribeni Minati Education Initiative"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
            
            {/* Overlay stat badge */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-4 border border-white/60">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4b41e1]">
                <span className="material-symbols-outlined">school</span>
              </div>
              <div>
                <div className="font-stat-lg text-2xl font-bold leading-none text-[#191c1e]">15,000+</div>
                <div className="font-label-caps text-[10px] text-[#45464d] uppercase mt-1">Lives Touched</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The M-I-N-A-T-I Framework */}
      <section className="w-full py-16 bg-white relative z-10 border-t border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-label-caps text-xs uppercase text-[#64748B] mb-4 tracking-widest bg-slate-100 px-4 py-2 rounded-full font-bold">
              The Paradigm
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#191c1e] mb-4 max-w-3xl">
              The M-I-N-A-T-I Framework
            </h2>
            <p className="font-body-base text-base text-[#45464d] max-w-2xl leading-relaxed">
              A comprehensive, data-backed approach to identifying and uplifting the most vulnerable demographics across Bengal. Each pillar represents a focused vector of our philanthropic engine.
            </p>
          </div>

          {/* Bento Grid of Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Minorities */}
            <div className="flex flex-col h-full bg-[#f2f4f6] rounded-2xl p-1 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4b41e1]/5 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="bg-white rounded-xl p-8 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-lg text-5xl text-slate-300 leading-none transition-colors group-hover:text-[#4b41e1]">
                      M
                    </span>
                    <span className="material-symbols-outlined text-[#4b41e1]">diversity_3</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">Minorities</h3>
                  <p className="font-body-base text-sm text-[#45464d]">
                    Ensuring equitable access to resources, education, and socio-economic integration for marginalized communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Illiterate */}
            <div className="flex flex-col h-full bg-[#f2f4f6] rounded-2xl p-1 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="bg-white rounded-xl p-8 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-lg text-5xl text-slate-300 leading-none transition-colors group-hover:text-[#F59E0B]">
                      I
                    </span>
                    <span className="material-symbols-outlined text-[#F59E0B]">menu_book</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">Illiterate</h3>
                  <p className="font-body-base text-sm text-[#45464d]">
                    Deploying modern pedagogical tools to eradicate illiteracy and foster foundational learning skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Needy */}
            <div className="flex flex-col h-full bg-[#f2f4f6] rounded-2xl p-1 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="bg-white rounded-xl p-8 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-lg text-5xl text-slate-300 leading-none transition-colors group-hover:text-[#111827]">
                      N
                    </span>
                    <span className="material-symbols-outlined text-[#111827]">volunteer_activism</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">Needy</h3>
                  <p className="font-body-base text-sm text-[#45464d]">
                    Providing immediate relief and sustainable livelihood frameworks for those in acute economic distress.
                  </p>
                </div>
              </div>
            </div>

            {/* Abused */}
            <div className="flex flex-col h-full bg-[#f2f4f6] rounded-2xl p-1 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="bg-white rounded-xl p-8 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-lg text-5xl text-slate-300 leading-none transition-colors group-hover:text-rose-600">
                      A
                    </span>
                    <span className="material-symbols-outlined text-rose-600">health_and_safety</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">Abused</h3>
                  <p className="font-body-base text-sm text-[#45464d]">
                    Establishing safe havens, legal recourse, and psychological rehabilitation for victims of systemic abuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Tribal */}
            <div className="flex flex-col h-full bg-[#f2f4f6] rounded-2xl p-1 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="bg-white rounded-xl p-8 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-lg text-5xl text-slate-300 leading-none transition-colors group-hover:text-amber-700">
                      T
                    </span>
                    <span className="material-symbols-outlined text-amber-700">forest</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">Tribal</h3>
                  <p className="font-body-base text-sm text-[#45464d]">
                    Preserving indigenous heritage while introducing modern healthcare and sustainable agriculture.
                  </p>
                </div>
              </div>
            </div>

            {/* Indians */}
            <div className="flex flex-col h-full bg-[#f2f4f6] rounded-2xl p-1 shadow-sm hover:shadow-xl hover:-translate-y-1 relative group overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="bg-white rounded-xl p-8 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-lg text-5xl text-slate-300 leading-none transition-colors group-hover:text-[#4b41e1]">
                      I
                    </span>
                    <span className="material-symbols-outlined text-[#4b41e1]">public</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">Indians</h3>
                  <p className="font-body-base text-sm text-[#45464d]">
                    Fostering national integration and civic responsibility, contributing to the broader narrative of a resilient India.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="w-full py-16 lg:py-24 bg-[#f7f9fb] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
            <div className="flex-1">
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#191c1e] mb-4">
                Architects of Change
              </h2>
              <p className="font-body-base text-base text-[#45464d] max-w-xl">
                Leadership driven by accountability. Our board combines corporate governance with grassroots operational expertise.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* President Profile */}
            <div className="bg-slate-200/80 p-1 rounded-3xl shadow-md group hover:shadow-xl transition-shadow duration-300">
              <div className="bg-white rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row gap-8 h-full">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden shadow-inner relative bg-slate-100">
                  <img
                    src="/tmf-assets/leadership/swagata-adhya-president.jpg"
                    alt="Founding President Swagata Adhya"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-caps text-xs uppercase text-[#4b41e1] mb-2 tracking-widest font-bold">
                    Founding President
                  </span>
                  <h3 className="font-headline-md text-2xl font-bold text-[#191c1e] mb-4">
                    Swagata Adhya
                  </h3>
                  <p className="font-body-base text-sm text-[#45464d] mb-6 line-clamp-4">
                    Visionary philanthropist with over a decade of dedication navigating social disparities in Hooghly. She established TMF to institutionalize grassroots empathy, insisting on measurable impact matrices.
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-xs font-mono text-[#64748B]">
                    <span>Tribeni Minati Foundation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secretary Profile */}
            <div className="bg-slate-200/80 p-1 rounded-3xl shadow-md group hover:shadow-xl transition-shadow duration-300">
              <div className="bg-white rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row gap-8 h-full">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden shadow-inner relative bg-slate-100">
                  <img
                    src="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                    alt="General Secretary Rudra Adhya"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-label-caps text-xs uppercase text-[#111827] mb-2 tracking-widest font-bold">
                    General Secretary
                  </span>
                  <h3 className="font-headline-md text-2xl font-bold text-[#191c1e] mb-4">
                    Rudra Adhya
                  </h3>
                  <p className="font-body-base text-sm text-[#45464d] mb-6 line-clamp-4">
                    The operational engine of TMF. Rudra brings grassroots execution and statutory diligence to the foundation, ensuring every rupee deployed generates maximum, documented social ROI.
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-xs font-mono text-[#4b41e1] font-bold">
                    <a href="tel:+919143430927" className="hover:underline">+91 9143430927</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Area */}
      <section className="w-full py-16 bg-white text-[#191c1e] relative overflow-hidden border-t border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
          <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold mb-4">
            Invest in the Framework
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenDonate}
              className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-bold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <span>Donate to Foundation</span>
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button
              onClick={() => onNavigate('transparency')}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-[#191c1e] font-bold rounded-2xl transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>Review Statutory Impact</span>
              <span className="material-symbols-outlined">receipt_long</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
