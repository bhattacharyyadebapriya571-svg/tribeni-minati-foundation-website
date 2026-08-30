import React from 'react';
import { PILLARS_DATA } from '../data/foundationData';
import {
  Activity,
  GraduationCap,
  Users,
  Sprout,
  Truck,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Building2,
} from 'lucide-react';
import { Pillars } from '../components/Pillars';
import { SDGSection } from '../components/SDGSection';
import type { PageId } from '../types';

interface ProgramDetailPageProps {
  programId: string;
  onNavigate: (page: PageId, programId?: string) => void;
  onOpenDonate: (presetAmount?: number, cause?: string) => void;
  onOpenPartner: () => void;
}

const PROGRAM_PHOTOS: Record<string, string> = {
  education: '/tmf-assets/5.jpg',
  'women-empowerment': '/tmf-assets/3.jpg',
  healthcare: '/tmf-assets/WhatsApp Image 2026-08-26 at 1.00.50 PM.jpeg',
  'livelihood-farming': '/tmf-assets/4.jpg',
  'green-transit': '/tmf-assets/WhatsApp Image 2026-08-26 at 12.43.19 PM.jpeg',
  'disaster-relief': '/tmf-assets/WhatsApp Image 2026-08-26 at 1.00.48 PM (1).jpeg',
};

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  programId,
  onNavigate,
  onOpenDonate,
  onOpenPartner,
}) => {
  const program = PILLARS_DATA.find((p) => p.id === programId) || PILLARS_DATA[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-8 h-8 text-rose-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8 text-blue-600" />;
      case 'Users':
        return <Users className="w-8 h-8 text-amber-600" />;
      case 'Sprout':
        return <Sprout className="w-8 h-8 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-8 h-8 text-cyan-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-8 h-8 text-indigo-600" />;
      default:
        return <Activity className="w-8 h-8 text-blue-600" />;
    }
  };

  const photo = PROGRAM_PHOTOS[program.id] || '/tmf-assets/5.jpg';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('programs')}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All 6 Programmes
        </button>

        {/* Hero Program Card with Light Theme */}
        <div className="rounded-[2.5rem] bg-white border border-slate-200 shadow-xl overflow-hidden mb-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center p-8 sm:p-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                  {getIcon(program.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {program.tag}
                  </span>
                  <div className="text-xs font-semibold text-amber-700 mt-1">
                    {program.subtitle}
                  </div>
                </div>
              </div>

              <h1 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight">
                {program.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {program.body}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Deliverables & Objectives:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {program.highlights.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenDonate(5000, `Pillar: ${program.title}`)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  <span>Sponsor This Pillar</span>
                </button>

                <button
                  onClick={onOpenPartner}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span>CSR Partnership</span>
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
              <img
                src={photo}
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-['DM_Serif_Display'] text-3xl">
                  {program.metrics[0]?.value || '10,000+'}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  {program.metrics[0]?.label || 'Impact Deliverable'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Pillars Grid for Direct Switching */}
        <Pillars
          onSelectPillar={(p) => onNavigate('program', p.id)}
          onOpenDonate={(amt) => onOpenDonate(amt, 'Selected Pillar')}
        />

        {/* UN SDG Goals Alignment */}
        <div className="mt-16">
          <SDGSection />
        </div>
      </div>
    </div>
  );
};
