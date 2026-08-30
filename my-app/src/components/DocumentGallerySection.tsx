import React, { useState } from 'react';
import { FileText, Download, Eye, ShieldCheck, Scale } from 'lucide-react';
import { LEGAL_DOCS, TMF_META } from '../data/tmfVerifiedData';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface DocumentGalleryProps {
  onOpenDocument: (doc: LegalDocument) => void;
}

export const DocumentGallerySection: React.FC<DocumentGalleryProps> = ({ onOpenDocument }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Government Registration',
    'Government of India',
    'Banking Credentials',
    'Tax Registration',
    'Legal Affidavit',
  ];

  const filteredDocs =
    activeCategory === 'All'
      ? LEGAL_DOCS
      : LEGAL_DOCS.filter((doc) => doc.category === activeCategory);

  return (
    <section
      id="doc-gallery"
      className="py-24 sm:py-32 bg-[#FAF8F5] text-[#151C18] relative border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3B2B] bg-white border border-black/[0.08] shadow-xs">
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              Statutory Governance & Compliance
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-[#151C18] leading-tight">
              Official Statutory & Compliance Vault
            </h2>
            <p className="text-sm sm:text-base text-[#5C6760] leading-relaxed">
              Complete, verified public disclosure of government society registration certificates, NITI Aayog NGO DARPAN accreditation, verified Central Bank passbooks, and 80G tax exemptions for {TMF_META.name}.
            </p>
          </div>

          {/* Quick Registration Highlight Pill */}
          <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#1B3B2B] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Registration with Year
              </div>
              <div className="text-xs font-mono font-bold text-[#151C18]">
                {TMF_META.newRegNo}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1B3B2B] text-white shadow-sm border border-[#1B3B2B]'
                  : 'bg-white text-[#5C6760] hover:bg-black/[0.03] border border-black/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PDF File Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="double-bezel-outer group">
              <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
                {/* File Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-800 shadow-2xs group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 mt-1">
                        Verified PDF Record
                      </span>
                    </div>
                  </div>

                  <h3 className="font-['DM_Serif_Display'] text-xl text-[#151C18] group-hover:text-[#1B3B2B] transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-[#5C6760] mt-2 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>
                </div>

                {/* Metadata Details */}
                <div className="pt-4 border-t border-black/[0.05] space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#5C6760]">
                    <span>Identifier:</span>
                    <strong className="text-[#151C18] truncate max-w-[170px]">
                      {doc.regNumber}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between text-[#5C6760]">
                    <span>Issuing Authority:</span>
                    <span className="text-slate-700 truncate max-w-[170px]">
                      {doc.authority}
                    </span>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onOpenDocument(doc)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View PDF</span>
                  </button>

                  <a
                    href={doc.fileUrl}
                    download={doc.fileName}
                    className="p-2.5 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] text-slate-700 border border-black/[0.06] transition-colors cursor-pointer"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
