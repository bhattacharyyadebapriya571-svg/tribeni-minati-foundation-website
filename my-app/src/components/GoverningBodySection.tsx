import React from 'react';
import { GOVERNING_BODY, LEGAL_DOCS } from '../data/tmfVerifiedData';
import { TiltCard3D } from './TiltCard3D';
import { ShieldCheck, Phone, MapPin, FileCheck2, UserCheck, CheckCircle2 } from 'lucide-react';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface GoverningBodySectionProps {
  onOpenDocument: (doc: LegalDocument) => void;
}

export const GoverningBodySection: React.FC<GoverningBodySectionProps> = ({ onOpenDocument }) => {
  return (
    <section id="governance" className="py-24 sm:py-32 bg-slate-50 text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory Executive Leadership
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
              7-Member Executive Governing Body Profile
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Verified from the Notarized Executive Resolutions, NGO DARPAN Active Registry, and Statutory Society Records (SO212276).
            </p>
          </div>

          {/* Affidavit Trigger */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const doc = LEGAL_DOCS.find((d) => d.id === 'affidavit') || LEGAL_DOCS[0];
                onOpenDocument(doc);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>View 2026 Legal Affidavit</span>
            </button>
          </div>
        </div>

        {/* 7-Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOVERNING_BODY.map((member) => (
            <TiltCard3D key={member.name} intensity={6}>
              <div className="p-1 rounded-[2.2rem] bg-white border border-slate-200/90 hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="rounded-[calc(2.2rem-0.25rem)] bg-white p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
                  {/* Member Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {member.designation}
                      </span>
                      <h3 className="font-['DM_Serif_Display'] text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                        {member.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {member.occupation}
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-sans">Aadhaar (Masked):</span>
                      <strong className="text-slate-900">{member.uinMasked}</strong>
                    </div>

                    {member.panMasked && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-sans">PAN (Masked):</span>
                        <strong className="text-amber-700">{member.panMasked}</strong>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-sans">Verification:</span>
                      <span className="text-emerald-700 font-sans font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        DARPAN Verified
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5 pt-1.5 border-t border-slate-200/60">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] font-sans text-slate-600 leading-tight">
                        {member.address}
                      </span>
                    </div>
                  </div>

                  {/* Active Contacts */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    {member.contact ? (
                      <a
                        href={`tel:${member.contact}`}
                        className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3 text-blue-600" />
                        <span>{member.contact}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Via Secretariat Desk</span>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:underline text-[11px] truncate max-w-[120px]"
                      >
                        {member.email}
                      </a>
                    )}
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
