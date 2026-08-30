import React from 'react';
import { TMF_CAMPAIGNS } from '../data/tmfVerifiedData';
import { TiltCard3D } from './TiltCard3D';
import { Clock, Users, ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import type { TmfCampaign } from '../data/tmfVerifiedData';

interface InitiativesGridProps {
  onDonateCampaign: (campaign: TmfCampaign) => void;
}

export const InitiativesGrid: React.FC<InitiativesGridProps> = ({ onDonateCampaign }) => {
  return (
    <section id="initiatives" className="py-24 sm:py-32 bg-slate-50 text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Direct Field Interventions
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
              Flagship Grassroots Initiatives & Active Drives
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Targeted academic guidance, neonatal winter protection, elderly nutrition, women tailoring empowerment, and emergency medical camps operated directly by Tribeni Minati Foundation.
            </p>
          </div>

          <div className="text-xs text-blue-700 font-bold bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
            5 Active Campaigns Underway
          </div>
        </div>

        {/* 5 Core Campaign Cards Grid with 3D Tilt and Authentic Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TMF_CAMPAIGNS.map((c, index) => (
            <TiltCard3D key={c.id} intensity={8}>
              <div
                className={`rounded-[2.2rem] p-1 bg-white border border-slate-200/90 hover:border-blue-500/50 shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="rounded-[calc(2.2rem-0.25rem)] bg-white overflow-hidden flex flex-col justify-between h-full">
                  {/* Poster Image Container */}
                  <div>
                    <div
                      className={`relative overflow-hidden bg-slate-900 ${
                        index === 0 ? 'aspect-[16/9]' : 'aspect-[16/10]'
                      }`}
                    >
                      <img
                        src={c.imagePath}
                        alt={c.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-slate-900 backdrop-blur-md shadow-md">
                          {c.category}
                        </span>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                        <div className="text-xs font-bold text-amber-300 font-['Hind_Siliguri',sans-serif]">
                          {c.bengaliTitle}
                        </div>
                        <h3 className="font-['DM_Serif_Display'] text-xl sm:text-2xl text-white mt-0.5 leading-snug">
                          {c.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {c.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-2">
                        {c.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Timing & Target */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{c.daysActive}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{c.targetBeneficiaries}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => onDonateCampaign(c)}
                      className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white/20" />
                      <span>Sponsor This Initiative</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
