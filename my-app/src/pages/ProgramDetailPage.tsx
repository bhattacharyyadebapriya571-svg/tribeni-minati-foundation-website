import React from 'react';
import { PILLARS_DATA } from '../data/foundationData';
import type { PageId } from '../types';

interface ProgramDetailPageProps {
  programId: string;
  onNavigate: (page: PageId, programId?: string) => void;
  onOpenDonate: (presetAmount?: number, cause?: string) => void;
  onOpenPartner: () => void;
}

const PROGRAM_PHOTOS: Record<string, string> = {
  education: '/tmf-assets/real-field-photos/tmf-field-1.jpeg',
  'women-empowerment': '/tmf-assets/real-field-photos/tmf-field-18.jpeg',
  healthcare: '/tmf-assets/real-field-photos/tmf-field-22.jpeg',
  'winter-relief': '/tmf-assets/real-field-photos/tmf-field-14.jpeg',
  'livelihood-farming': '/tmf-assets/real-field-photos/tmf-field-19.jpeg',
  'green-transit': '/tmf-assets/real-field-photos/tmf-field-10.jpeg',
  'disaster-relief': '/tmf-assets/real-field-photos/tmf-field-15.jpeg',
};

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  programId,
  onNavigate,
  onOpenDonate,
  onOpenPartner,
}) => {
  const program = PILLARS_DATA.find((p) => p.id === programId) || PILLARS_DATA[0];
  const photo = PROGRAM_PHOTOS[program.id] || '/tmf-assets/real-field-photos/tmf-field-1.jpeg';

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Hero Header with Double-Bezel Image */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <button
          onClick={() => onNavigate('programs')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4b41e1] hover:underline cursor-pointer mb-8"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to All Core Initiatives</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{program.tag || 'Verified Grassroots Initiative'}</span>
            </div>

            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight leading-tight">
              {program.title}
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-[#45464d] leading-relaxed">
              {program.longDescription || program.body}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenDonate(5000, `Support Programme: ${program.title}`)}
                className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                Sponsor This Cause (80G)
              </button>
              <button
                onClick={onOpenPartner}
                className="px-6 py-4 bg-white border border-border-subtle rounded-2xl font-bold text-xs uppercase tracking-wider text-[#191c1e] hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
              >
                Corporate CSR RFP
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#f2f4f6] p-2 rounded-[32px] shadow-lg">
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-100">
                <img
                  src={photo}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#191c1e]">
                  Hooghly, West Bengal Ground Deployment
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Program Deliverables & Highlights */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-24">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-border-subtle shadow-sm space-y-12">
          
          {/* Key Milestones / Highlights */}
          {program.highlights && program.highlights.length > 0 && (
            <div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#191c1e] mb-6">
                Program Deliverables &amp; Methodology
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {program.highlights.map((pt, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f7f9fb] border border-border-subtle">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#4b41e1] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <span className="font-body-base text-sm text-[#191c1e] leading-relaxed">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Callout */}
          <div className="p-8 rounded-3xl bg-[#131b2e] text-white flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="font-label-caps text-xs text-amber-300 uppercase font-bold tracking-wider">
                100% Tax Exemption
              </span>
              <h3 className="font-headline-lg text-2xl font-bold text-white">
                Support {program.title}
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Every rupee is directly applied to field logistics, verified books, medical equipment, and beneficiary welfare under 80G statutory monitoring.
              </p>
            </div>

            <button
              onClick={() => onOpenDonate(5000, `Support Programme: ${program.title}`)}
              className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-xs uppercase tracking-wider shrink-0"
            >
              Donate Now
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
