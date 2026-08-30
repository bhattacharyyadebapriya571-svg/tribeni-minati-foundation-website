import React from 'react';
import { CORPORATE_PARTNERS } from '../data/foundationData';

export const PartnerMarquee: React.FC = () => {
  return (
    <div className="w-full py-10 bg-white border-y border-slate-200/60 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        <div className="text-center mb-6">
          <span className="font-label-caps text-xs uppercase text-[#64748B] font-bold tracking-widest">
            Institutional Stakeholders &amp; Public Collaborators
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CORPORATE_PARTNERS.map((partner, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#f7f9fb] border border-border-subtle hover:border-[#4b41e1]/40 hover:bg-white hover:shadow-md transition-all text-center space-y-1 group"
            >
              <div className="font-headline-md text-sm font-bold text-[#191c1e] group-hover:text-[#4b41e1] transition-colors">
                {partner.name}
              </div>
              <div className="font-mono text-[11px] text-[#64748B]">
                {partner.category}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
