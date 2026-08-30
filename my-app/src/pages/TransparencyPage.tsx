import React, { useState } from 'react';
import { DocumentGallerySection } from '../components/DocumentGallerySection';
import { ArrowLeft, Newspaper, Download, Copy, Check, ShieldCheck, Wallet, Users, Award, FileText, ArrowRight } from 'lucide-react';
import type { PageId } from '../types';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface TransparencyPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDocument?: (doc: LegalDocument) => void;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({ onNavigate, onOpenDocument }) => {
  const [copiedBoilerplate, setCopiedBoilerplate] = useState(false);
  const [copiedNAP, setCopiedNAP] = useState(false);

  const mediaBoilerplate = `About Tribeni Minati Foundation (ত্রিবেনী মিনতি ফাউন্ডেশন):
Established on 25th November 2013 under the West Bengal Societies Registration Act, 1961 (Reg: SO212276, NITI Aayog DARPAN: WB/2026/0939703, PAN: AAPAT4811J), Tribeni Minati Foundation is a premier grassroots non-profit dedicated to 6 core pillars: Minorities Welfare, Illiterate Remedial Education, Needy Winter & Food Relief, Abused Women & Child Protection, Tribal Hamlets Healthcare, and Indians Civic Solidarity (M-I-N-A-T-I). Donations are 50% tax-exempt under Section 80G of the Income Tax Act.
Media Contact: Shri Rudra Adhya, General Secretary (+91 9143430927) | Email: tribeniminatifoundation@gmail.com
Official Portal: https://tribeni-minati-foundation-website.vercel.app`;

  const napCitation = `Entity Name: Tribeni Minati Foundation
Alternate Names: Minati Foundation | Minati NGO Tribeni | ত্রিবেনী মিনতি ফাউন্ডেশন
Corporate Office: Kanthaltala (near water tank), Tribeni-Mogra Road, PO Tribeni, Dist Hooghly, West Bengal - 712503
Branch Office: Radhanagar, PO Gopinagar, PS Dhaniakhali, Dist Hooghly - 712402
Primary Phone: +91 9143430927 | Secondary: +91 9635274891
Official Email: tribeniminatifoundation@gmail.com
Govt Registration: SO212276 of 2013-2014 (West Bengal Act XXVI of 1961)
NITI Aayog DARPAN ID: WB/2026/0939703 | PAN: AAPAT4811J
GPS Coordinates: 22.9833° N, 88.3983° E`;

  const copyToClipboard = (text: string, type: 'boilerplate' | 'nap') => {
    navigator.clipboard.writeText(text);
    if (type === 'boilerplate') {
      setCopiedBoilerplate(true);
      setTimeout(() => setCopiedBoilerplate(false), 3000);
    } else {
      setCopiedNAP(true);
      setTimeout(() => setCopiedNAP(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4b41e1] hover:underline cursor-pointer mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Overview</span>
        </button>

        {/* Stitch Transparency Hero & Financial Counters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border-subtle shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#4b41e1]" />
              <span className="font-mono text-xs font-bold uppercase text-[#45464d] tracking-widest">
                Institutional Integrity
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-extrabold text-[#191c1e] tracking-tight leading-[1.15]">
              Radical <span className="text-[#64748B] italic font-light">Transparency.</span><br />
              Quantifiable <span className="text-[#4b41e1]">Impact.</span>
            </h1>

            <p className="font-['Inter'] text-base sm:text-lg text-[#45464d] leading-relaxed max-w-xl">
              We operate with the clinical precision of a modern financial institution. Every rupee is tracked, audited, and deployed for maximum societal yield. Your altruism, secured by statutory compliance.
            </p>
          </div>

          {/* Animated Financial Counter Bento */}
          <div className="lg:col-span-6">
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-6 sm:p-8 bg-white space-y-6">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  
                  {/* Direct Program Yield */}
                  <div className="bg-[#f2f4f6] rounded-2xl p-5 sm:p-6 space-y-3">
                    <div className="w-12 h-12 bg-indigo-100 text-[#4b41e1] rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#191c1e]">94.2%</div>
                      <p className="font-mono text-[11px] font-bold text-[#64748B] uppercase mt-1">Funds Directly to Programs</p>
                    </div>
                  </div>

                  {/* Beneficiaries Count */}
                  <div className="bg-[#111827] text-white rounded-2xl p-5 sm:p-6 space-y-3">
                    <div className="w-12 h-12 bg-amber-500/20 text-amber-300 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-300">142K+</div>
                      <p className="font-mono text-[11px] font-bold text-slate-300 uppercase mt-1">Lives Impacted</p>
                    </div>
                  </div>

                </div>

                {/* Overhead Ratio Progress Bar */}
                <div className="bg-[#f7f9fb] border border-border-subtle rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[11px] font-bold uppercase text-[#64748B]">Administrative Overhead</p>
                    <div className="font-mono text-2xl font-black text-[#191c1e]">5.8%</div>
                  </div>
                  <div className="w-full sm:w-1/2 h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4b41e1] rounded-full w-[5.8%]" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Statutory Credentials Bento */}
        <div className="mb-20">
          <div className="mb-10">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
              Statutory Credentials
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#45464d] mt-1">
              Fully registered and compliant under the prevailing laws of the Government of India and West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 80G */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-6 sm:p-8 bg-white flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-indigo-50 text-[#4b41e1] rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#191c1e]">
                    80G Certified
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act, 1961.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-bold text-[#4b41e1]">
                  <span>PAN: AAPAT4811J</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 12A */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-6 sm:p-8 bg-white flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#191c1e]">
                    12A Registered
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Recognized as a charitable society (Reg: SO212276), ensuring foundation income is exempt from tax.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-bold text-[#059669]">
                  <span>SO212276</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* NITI Aayog DARPAN */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-6 sm:p-8 bg-white flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-blue-50 text-[#2563eb] rounded-2xl flex items-center justify-center">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#191c1e]">
                    NITI Aayog DARPAN
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Registered on the NGO Darpan portal, enabling transparent institutional partnerships.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-bold text-[#2563eb]">
                  <span>WB/2026/0939703</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Official PDF Document Gallery Component */}
      {onOpenDocument && (
        <DocumentGallerySection onOpenDocument={onOpenDocument} />
      )}

      {/* Digital PR, Media Newsroom & Loganix NAP Citation Suite */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-border-subtle p-8 sm:p-10 shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#b87500] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                <Newspaper className="w-3.5 h-3.5" />
                Digital PR Agency &amp; Press Newsroom
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
                Official Media Kit &amp; Journalist Resource Desk
              </h2>
            </div>
            <span className="font-mono text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              Live Wire Syndication Ready
            </span>
          </div>

          {/* Grid: Press Release & Loganix NAP Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Press Release Card */}
            <div className="p-6 rounded-2xl bg-[#f7f9fb] border border-border-subtle space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4b41e1] uppercase tracking-wider font-mono">
                  Official Press Release
                </span>
                <button
                  onClick={() => copyToClipboard(mediaBoilerplate, 'boilerplate')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-[#4b41e1] hover:bg-[#645efb] text-white shadow-xs transition-all cursor-pointer"
                >
                  {copiedBoilerplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBoilerplate ? 'Boilerplate Copied!' : 'Copy Media Boilerplate'}</span>
                </button>
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#191c1e] leading-snug">
                Tribeni Minati Foundation Expands M-I-N-A-T-I Grassroots Humanitarian Drives Across Hooghly with 80G Certified Transparency
              </h3>

              <p className="text-xs text-[#45464d] leading-relaxed font-sans">
                <strong>HOOGHLY, WEST BENGAL</strong> — Operating since 25th November 2013, Tribeni Minati Foundation (Reg: SO212276, NITI Aayog DARPAN: WB/2026/0939703) has announced the scaling of its free child education centers, infant winter survival kits, and mobile healthcare camps across Tribeni, Mogra, Dhaniakhali, and rural tribal belts of Hooghly under its landmark M-I-N-A-T-I devotion framework.
              </p>

              <div className="p-4 rounded-xl bg-white border border-border-subtle text-xs text-[#191c1e] font-mono space-y-1">
                <div><strong>Spokesperson:</strong> Shri Rudra Adhya, General Secretary</div>
                <div><strong>Direct Hotline:</strong> +91 9143430927</div>
                <div><strong>Email:</strong> tribeniminatifoundation@gmail.com</div>
              </div>
            </div>

            {/* Loganix Standardized NAP Citation Matrix */}
            <div className="p-6 rounded-2xl bg-[#f7f9fb] border border-border-subtle space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider font-mono">
                  Loganix NAP Citation Matrix (Local SEO 100/100)
                </span>
                <button
                  onClick={() => copyToClipboard(napCitation, 'nap')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-[#059669] hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
                >
                  {copiedNAP ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedNAP ? 'NAP Copied!' : 'Copy Standard NAP'}</span>
                </button>
              </div>

              <p className="text-xs text-[#45464d] leading-relaxed">
                Use these verified details for press syndication, news portals, directory listings, and citations to ensure perfect Google Knowledge Graph entity alignment:
              </p>

              <div className="p-4 rounded-xl bg-white border border-border-subtle text-xs font-mono text-[#191c1e] space-y-1 overflow-x-auto leading-relaxed">
                <div><strong>Name:</strong> Tribeni Minati Foundation</div>
                <div><strong>Address:</strong> Kanthaltala, Tribeni-Mogra Road, PO Tribeni, Hooghly - 712503</div>
                <div><strong>Phone:</strong> +91 9143430927</div>
                <div><strong>Email:</strong> tribeniminatifoundation@gmail.com</div>
                <div><strong>GPS:</strong> 22.9833° N, 88.3983° E (Tribeni)</div>
              </div>
            </div>
          </div>

          {/* Media Assets Download Bar */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#191c1e]">
                Official Press Kit Assets (High Resolution)
              </h4>
              <p className="text-xs text-[#45464d]">
                Download official emblem, seal, secretary portrait, and registration certificates for press coverage.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/tmf-assets/official-seal.png"
                download="TMF-Official-Seal.png"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-white border border-border-subtle text-[#191c1e] hover:bg-slate-50 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#4b41e1]" />
                <span>Official Seal (PNG)</span>
              </a>
              <a
                href="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                download="Rudra-Adhya-Secretary-TMF.jpg"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-[#4b41e1] hover:bg-[#645efb] text-white transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Secretary Portrait</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
