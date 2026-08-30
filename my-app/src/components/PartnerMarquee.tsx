import React from 'react';
import { CORPORATE_PARTNERS } from '../data/foundationData';
import { Handshake } from 'lucide-react';

export const PartnerMarquee: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 mb-2">
          <Handshake className="w-3.5 h-3.5 text-blue-600" />
          Trusted By Industry Leaders
        </div>
        <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900">
          Partners in Sustainable Grassroots Transformation
        </h3>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left / Right Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee whitespace-nowrap py-2">
          {/* Double list for smooth infinite scroll */}
          {[...CORPORATE_PARTNERS, ...CORPORATE_PARTNERS].map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="inline-flex flex-col justify-center px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs shrink-0 hover:border-blue-500/40 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="text-sm font-bold text-slate-900 font-sans">
                {partner.name}
              </div>
              <div className="text-[10px] text-blue-600 font-medium mt-0.5">
                {partner.category} · {partner.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
