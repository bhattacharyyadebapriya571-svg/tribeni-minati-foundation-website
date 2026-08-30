import React from 'react';
import { ShieldCheck, FileCheck, Building2, Heart, ArrowRight } from 'lucide-react';
import { TMF_META, LEGAL_DOCS } from '../data/tmfVerifiedData';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface TrustStripProps {
  onOpenDocument?: (doc: LegalDocument) => void;
  onNavigateTransparency?: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({
  onOpenDocument,
  onNavigateTransparency,
}) => {
  const regDoc = LEGAL_DOCS.find((d) => d.id === 'society-reg') || LEGAL_DOCS[0];

  const trustItems = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: 'Registered Society',
      subtitle: `Act XXVI · Reg No. ${TMF_META.newRegNo}`,
      badge: 'Est. 2013',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-blue-600" />,
      title: 'NITI Aayog DARPAN',
      subtitle: `Govt. ID: ${TMF_META.ngoDarpanId}`,
      badge: 'Verified NGO',
    },
    {
      icon: <Heart className="w-5 h-5 text-amber-600" />,
      title: '12A & 80G Tax Exempt',
      subtitle: '50% Income Tax Deduction on Contributions',
      badge: 'Form 10BE',
    },
    {
      icon: <Building2 className="w-5 h-5 text-indigo-600" />,
      title: 'Central Bank of India',
      subtitle: 'Official Verified Account in Padmapukur',
      badge: 'Verified Bank',
    },
  ];

  return (
    <div className="py-6 bg-white border-y border-black/[0.06] relative z-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center flex-1 w-full">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenDocument && onOpenDocument(regDoc)}
              className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                {item.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#151C18] truncate">
                    {item.title}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/[0.04] text-[#5C6760]">
                    {item.badge}
                  </span>
                </div>
                <div className="text-[11px] text-[#5C6760] truncate font-mono">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {onNavigateTransparency && (
          <button
            onClick={onNavigateTransparency}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3B2B] hover:underline shrink-0 cursor-pointer"
          >
            <span>All Documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
