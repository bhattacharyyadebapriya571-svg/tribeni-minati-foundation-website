import React from 'react';
import { STATUTORY_CERTIFICATIONS, FOUNDATION_META } from '../data/foundationData';
import { Scale, FileCheck, CheckCircle2 } from 'lucide-react';

export const Governance: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            Statutory Governance & Filings
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight mb-4">
            Certified by Govt. of West Bengal & NITI Aayog
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            All statutory registrations, tax exemptions, and annual accounts for {FOUNDATION_META.name} are active, verified, and subject to regular disclosure on the Ministry of Corporate Affairs and Income Tax portals.
          </p>
        </div>

        {/* 4 Certification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STATUTORY_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.code}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 text-blue-600">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {cert.title}
                </h3>
                <div className="font-mono text-xs font-bold text-amber-700 mb-2">
                  {cert.code}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>{cert.validity}</span>
                <span className="font-mono text-[10px] text-blue-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
