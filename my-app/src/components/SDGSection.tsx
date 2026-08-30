import React from 'react';
import { SDG_DATA } from '../data/foundationData';
import type { PageId } from '../types';

interface SDGSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const SDGSection: React.FC<SDGSectionProps> = ({ onNavigate }) => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-t border-slate-200/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-label-caps text-xs uppercase text-[#4b41e1] tracking-widest font-bold block mb-2">
              Global Alignment &amp; UN Framework
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#191c1e]">
              Sustainable Development Goals (SDGs)
            </h2>
            <p className="font-body-base text-base text-[#45464d] mt-2">
              Aligning our grassroots Hooghly interventions with the United Nations 2030 Agenda for Sustainable Development.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('programs')}
              className="flex items-center gap-2 text-[#4b41e1] font-semibold hover:text-[#645efb] transition-colors group px-4 py-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer text-sm font-mono shrink-0"
            >
              <span>Explore Programs</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          )}
        </div>

        {/* SDG Double-Bezel Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SDG_DATA.map((sdg) => (
            <div
              key={sdg.number}
              className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="bg-white rounded-[22px] p-6 flex flex-col justify-between h-full space-y-4">
                
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold font-mono text-xl shadow-md"
                    style={{ backgroundColor: sdg.color }}
                  >
                    0{sdg.number}
                  </div>
                  <span className="font-mono text-xs text-[#64748B] font-bold">
                    UN SDG Goal
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-headline-md text-lg font-bold text-[#191c1e] group-hover:text-[#4b41e1] transition-colors">
                    {sdg.title}
                  </h3>
                  <p className="font-body-base text-xs text-[#45464d] leading-relaxed">
                    {sdg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#64748B] font-bold block">
                    Active TMF Program:
                  </span>
                  {sdg.ourPrograms.map((prog, idx) => (
                    <div key={idx} className="text-xs font-semibold text-[#191c1e] truncate">
                      • {prog}
                    </div>
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
