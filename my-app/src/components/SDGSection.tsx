import React from 'react';
import { SDG_DATA } from '../data/foundationData';
import { Globe } from 'lucide-react';

export const SDGSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-white relative border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#4E8B65] bg-[#4E8B65]/10 border border-[#4E8B65]/20 mb-4">
            <Globe className="w-3.5 h-3.5" />
            Global Framework Alignment
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#0F1F16] leading-tight tracking-tight mb-4">
            Towards Achieving the UN Sustainable Development Goals (SDGs)
          </h2>
          <p className="text-base text-[#5A6B62] leading-relaxed">
            All programs undertaken by Tribeni Minati Foundation are strictly mapped to the United Nations 2030 Agenda for Sustainable Development, delivering measurable global impact at the grassroots level.
          </p>
        </div>

        {/* SDG Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SDG_DATA.map((sdg) => (
            <div
              key={sdg.number}
              className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] hover:border-black/20 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* SDG Number Badge */}
                <div
                  className="w-12 h-12 rounded-xl text-white font-bold text-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.number}
                </div>

                <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                  SDG {sdg.number}: {sdg.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {sdg.description}
                </p>
              </div>

              {/* Programs Tag Strip */}
              <div className="pt-3 border-t border-black/[0.04]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  TMF Interventions:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sdg.ourPrograms.map((prog) => (
                    <span
                      key={prog}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#1C3D2F]/5 text-[#1C3D2F]"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
