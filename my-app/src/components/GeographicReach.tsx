import React, { useState } from 'react';
import { STATE_OPERATIONS } from '../data/foundationData';
import { MapPin, Globe, CheckCircle2, Building } from 'lucide-react';

export const GeographicReach: React.FC = () => {
  const [selectedStateIndex, setSelectedStateIndex] = useState<number>(0);
  const activeState = STATE_OPERATIONS[selectedStateIndex];

  return (
    <section id="operations" className="py-24 sm:py-32 bg-white text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            Geographic Footprint
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight mb-4">
            Active Across 6 States in Eastern & North-Eastern India
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Headquartered in Tribeni, West Bengal, our hub-and-spoke operational model delivers deep last-mile impact to tribal belts, agricultural districts, and riparian communities.
          </p>
        </div>

        {/* State Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {STATE_OPERATIONS.map((state, i) => (
            <button
              key={state.code}
              onClick={() => setSelectedStateIndex(i)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedStateIndex === i
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 border border-blue-600'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStateIndex === i ? 'bg-white' : 'bg-blue-600'}`} />
              <span>{state.state}</span>
            </button>
          ))}
        </div>

        {/* Active State Detail Panel */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200/90 shadow-lg grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-700 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>State Operations: {activeState.state} ({activeState.code})</span>
              </div>
              <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900">
                {activeState.districtsCovered} Key Districts Mobilized
              </h3>
            </div>

            {/* Key Programs List */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Ground Projects:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeState.activeProjects.map((prog, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs"
                  >
                    {prog}
                  </span>
                ))}
              </div>
            </div>

            {/* Hub */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Operational Hub & Base:
              </span>
              <div className="text-xs font-mono text-blue-700 font-bold">
                <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 inline-block">
                  {activeState.hubLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Right Impact Stat Box */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <div className="font-['DM_Serif_Display'] text-4xl text-slate-900">
                {activeState.beneficiaries}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Verified Beneficiaries Reached
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Statutory & Field Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
