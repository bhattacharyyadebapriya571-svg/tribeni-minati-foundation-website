import React, { useState, useEffect } from 'react';
import type { PageId } from '../types';

interface ProgramExplorerProps {
  onNavigate: (page: PageId, programId?: string) => void;
  onOpenDonate: () => void;
}

export const ProgramExplorer: React.FC<ProgramExplorerProps> = ({ onNavigate }) => {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('timeline-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let pct = ((windowHeight / 2) - rect.top) / rect.height * 100;
      pct = Math.max(0, Math.min(100, pct));
      setScrollPct(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Header Section */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-16 lg:pb-24 flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="w-12 h-1 bg-black rounded-full" />
            <span className="font-label-caps text-xs tracking-widest uppercase text-[#64748B] font-bold">
              Core Initiatives
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] text-balance leading-tight">
            Strategic Altruism <br className="hidden lg:block" />in Action
          </h1>
        </div>
        <p className="font-body-lg text-base sm:text-lg text-[#45464d] max-w-md pb-2 leading-relaxed">
          We bridge the gap between institutional resources and grassroots needs, delivering measurable impact across education, healthcare, and essential human needs.
        </p>
      </section>

      {/* Projects Bento Showcase */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Project 1: Featured (Full Width Double-Bezel) */}
          <div className="col-span-1 lg:col-span-12 group">
            <div className="bg-[#f2f4f6] p-2 lg:p-3 rounded-[32px] shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-transform duration-500 hover:-translate-y-1">
              <div className="bg-white rounded-[24px] overflow-hidden flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-3/5 h-[300px] lg:h-[500px] relative overflow-hidden bg-slate-100">
                  <img
                    src="/tmf-assets/generated/hero_child_education.jpg"
                    alt="Free Child Remedial Education Center"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 p-8 text-slate-200">
                    <span className="font-label-caps text-[64px] font-bold leading-none select-none">01</span>
                  </div>
                  <span className="inline-block px-4 py-2 bg-indigo-50 text-[#4b41e1] font-label-caps text-xs rounded-full w-max mb-6 font-bold">
                    Education
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#191c1e] mb-4">
                    Free Child Remedial Education Center
                  </h2>
                  <p className="font-body-base text-sm sm:text-base text-[#64748B] mb-10 line-clamp-3 leading-relaxed">
                    Providing comprehensive after-school academic support, nutritious meals, and mentorship to underprivileged rural children, ensuring foundational literacy and numeracy.
                  </p>
                  <div className="flex items-center gap-6 mt-auto">
                    <div className="flex flex-col">
                      <span className="font-stat-lg text-3xl font-bold text-[#111827]">500+</span>
                      <span className="font-label-caps text-[10px] uppercase text-[#64748B]">Children Enrolled</span>
                    </div>
                    <button
                      onClick={() => onNavigate('program', 'education')}
                      className="ml-auto h-14 px-8 bg-[#e6e8ea] hover:bg-[#111827] hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center font-label-caps text-xs cursor-pointer group/btn font-bold"
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined ml-2 text-[18px] transition-transform group-hover/btn:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: Winter Bedding (Half Width) */}
          <div className="col-span-1 lg:col-span-6 group">
            <div className="bg-[#f2f4f6] p-2 lg:p-3 rounded-[32px] shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] h-full transition-transform duration-500 hover:-translate-y-1">
              <div className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full relative">
                <div className="w-full h-[280px] relative overflow-hidden bg-slate-100">
                  <img
                    src="/tmf-assets/generated/winter_infant_bedding.jpg"
                    alt="Infant Winter Bedding Drive"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <span className="inline-block px-4 py-2 bg-[#FFEDD5] text-[#EA580C] font-label-caps text-xs rounded-full w-max mb-6 font-bold">
                    Relief
                  </span>
                  <h2 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">
                    Infant Winter Bedding Drive
                  </h2>
                  <p className="font-body-base text-sm text-[#64748B] mb-8 line-clamp-2 leading-relaxed">
                    Distributing high-quality, insulated zipped bedding to vulnerable infants in severe winter conditions, preventing hypothermia.
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-stat-lg text-2xl font-bold text-[#111827]">1,200</span>
                      <span className="font-label-caps text-[10px] uppercase text-[#64748B]">Kits Distributed</span>
                    </div>
                    <button
                      onClick={() => onNavigate('program', 'winter-relief')}
                      className="w-12 h-12 rounded-full bg-[#e6e8ea] hover:bg-[#111827] hover:text-white flex items-center justify-center transition-colors duration-300 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: Healthcare (Half Width) */}
          <div className="col-span-1 lg:col-span-6 group">
            <div className="bg-[#f2f4f6] p-2 lg:p-3 rounded-[32px] shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] h-full transition-transform duration-500 hover:-translate-y-1">
              <div className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full relative">
                <div className="w-full h-[280px] relative overflow-hidden bg-slate-100">
                  <img
                    src="/tmf-assets/generated/rural_medical_camp.jpg"
                    alt="Rural Healthcare Camps"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <span className="inline-block px-4 py-2 bg-[#DCFCE7] text-[#166534] font-label-caps text-xs rounded-full w-max mb-6 font-bold">
                    Healthcare
                  </span>
                  <h2 className="font-headline-md text-xl font-bold text-[#191c1e] mb-3">
                    Rural Medical Camps
                  </h2>
                  <p className="font-body-base text-sm text-[#64748B] mb-8 line-clamp-2 leading-relaxed">
                    Deploying mobile clinical units and expert pediatricians to remote villages for preventative screenings and essential medical care.
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-stat-lg text-2xl font-bold text-[#111827]">3,500+</span>
                      <span className="font-label-caps text-[10px] uppercase text-[#64748B]">Patients Treated</span>
                    </div>
                    <button
                      onClick={() => onNavigate('program', 'healthcare')}
                      className="w-12 h-12 rounded-full bg-[#e6e8ea] hover:bg-[#111827] hover:text-white flex items-center justify-center transition-colors duration-300 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section id="timeline-container" className="w-full bg-white text-[#191c1e] py-20 relative overflow-hidden border-t border-slate-200/60">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#4b41e1]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center mb-20">
            <h3 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl mb-4 text-[#191c1e]">
              Trajectory of Impact
            </h3>
            <p className="font-body-lg text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto">
              Milestones achieved through institutional partnerships and community trust.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Progress Line */}
            <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full">
              <div
                className="absolute top-0 left-0 w-full bg-[#4b41e1] rounded-full transition-all duration-300 ease-out"
                style={{ height: `${scrollPct}%` }}
              />
            </div>

            <div className="space-y-16">
              
              {/* 2021 */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center relative gap-8 lg:gap-0 w-full group">
                <div className="absolute left-[28px] lg:left-1/2 w-4 h-4 bg-white ring-4 ring-[#4b41e1]/30 rounded-full -translate-x-1/2 mt-1 lg:mt-0 transition-colors z-10" />
                <div className="w-full lg:w-1/2 lg:pr-16 pl-16 lg:pl-0 text-left lg:text-right">
                  <span className="font-stat-lg text-4xl sm:text-5xl text-[#191c1e] font-bold">2021</span>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-16 pl-16 lg:pr-0">
                  <div className="bg-[#f2f4f6] p-6 rounded-2xl">
                    <h4 className="font-headline-md text-lg font-bold mb-2 text-[#191c1e]">
                      Foundation Scaling
                    </h4>
                    <p className="font-body-base text-sm text-[#45464d]">
                      Expanded grassroots outreach programs across Hooghly, registering digital ledgers for systemic rural aid.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2022 */}
              <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center relative gap-8 lg:gap-0 w-full group">
                <div className="absolute left-[28px] lg:left-1/2 w-4 h-4 bg-white ring-4 ring-[#4b41e1]/30 rounded-full -translate-x-1/2 mt-1 lg:mt-0 transition-colors z-10" />
                <div className="w-full lg:w-1/2 lg:pl-16 pl-16 lg:pl-0 text-left">
                  <span className="font-stat-lg text-4xl sm:text-5xl text-[#191c1e] font-bold">2022</span>
                </div>
                <div className="w-full lg:w-1/2 lg:pr-16 pl-16 lg:pr-0 text-left lg:text-right">
                  <div className="bg-[#f2f4f6] p-6 rounded-2xl">
                    <h4 className="font-headline-md text-lg font-bold mb-2 text-[#191c1e]">
                      First Medical Drive
                    </h4>
                    <p className="font-body-base text-sm text-[#45464d]">
                      Partnered with medical officers to execute the first 1,000-patient pediatric camp in remote rural hamlets.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2023 */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center relative gap-8 lg:gap-0 w-full group">
                <div className="absolute left-[28px] lg:left-1/2 w-4 h-4 bg-white ring-4 ring-[#4b41e1]/30 rounded-full -translate-x-1/2 mt-1 lg:mt-0 transition-colors z-10" />
                <div className="w-full lg:w-1/2 lg:pr-16 pl-16 lg:pl-0 text-left lg:text-right">
                  <span className="font-stat-lg text-4xl sm:text-5xl text-[#191c1e] font-bold">2023</span>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-16 pl-16 lg:pr-0">
                  <div className="bg-[#f2f4f6] p-6 rounded-2xl">
                    <h4 className="font-headline-md text-lg font-bold mb-2 text-[#191c1e]">
                      Remedial Centers Launch
                    </h4>
                    <p className="font-body-base text-sm text-[#45464d]">
                      Opened permanent coaching centers serving 500+ daily students with comprehensive learning tools and nutritional support.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
