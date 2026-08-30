import React, { useState } from 'react';
import { DocumentGallerySection } from '../components/DocumentGallerySection';
import { BlockchainLedger } from '../components/BlockchainLedger';
import { ArrowLeft, Scale, Database, Newspaper, Download, Copy, Check } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Flagship Overview
        </button>

        {/* Page Hero */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4">
            <Scale className="w-3.5 h-3.5" />
            Statutory Accountability &amp; Disclosures
          </div>
          <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
            Radical Transparency. Certified by Govt. of West Bengal &amp; NITI Aayog.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Every rupee entrusted to Tribeni Minati Foundation is accounted for on our digital ledger and verified through statutory filings with the Registrar of Societies, NITI Aayog NGO DARPAN, and the Income Tax Department.
          </p>
        </div>
      </div>

      {/* Official PDF Document Gallery Component */}
      {onOpenDocument && (
        <DocumentGallerySection onOpenDocument={onOpenDocument} />
      )}

      {/* Digital PR, Media Newsroom & Loganix NAP Citation Suite */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                <Newspaper className="w-3.5 h-3.5" />
                Digital PR Agency &amp; Press Newsroom
              </div>
              <h2 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900">
                Official Media Kit &amp; Journalist Resource Desk
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              Live Wire Syndication Ready
            </span>
          </div>

          {/* Grid: Press Release & Loganix NAP Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Press Release Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider font-mono">
                  Official Press Release
                </span>
                <button
                  onClick={() => copyToClipboard(mediaBoilerplate, 'boilerplate')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
                >
                  {copiedBoilerplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBoilerplate ? 'Boilerplate Copied!' : 'Copy Media Boilerplate'}</span>
                </button>
              </div>

              <h3 className="font-['DM_Serif_Display'] text-lg text-slate-900 leading-snug">
                Tribeni Minati Foundation Expands M-I-N-A-T-I Grassroots Humanitarian Drives Across Hooghly with 80G Certified Transparency
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                <strong>HOOGHLY, WEST BENGAL</strong> — Operating since 25th November 2013, Tribeni Minati Foundation (Reg: SO212276, NITI Aayog DARPAN: WB/2026/0939703) has announced the scaling of its free child education centers, infant winter survival kits, and mobile healthcare camps across Tribeni, Mogra, Dhaniakhali, and rural tribal belts of Hooghly under its landmark M-I-N-A-T-I devotion framework.
              </p>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono space-y-1">
                <div><strong>Spokesperson:</strong> Shri Rudra Adhya, General Secretary</div>
                <div><strong>Direct Hotline:</strong> +91 9143430927</div>
                <div><strong>Email:</strong> tribeniminatifoundation@gmail.com</div>
              </div>
            </div>

            {/* Loganix Standardized NAP Citation Matrix */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                  Loganix NAP Citation Matrix (Local SEO 100/100)
                </span>
                <button
                  onClick={() => copyToClipboard(napCitation, 'nap')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
                >
                  {copiedNAP ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedNAP ? 'NAP Copied!' : 'Copy Standard NAP'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized Name, Address, and Phone (NAP) verified across Google Business Profile, NITI Aayog DARPAN, Justdial, Sulekha, and Bing Places for 100% Local SEO authority:
              </p>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono space-y-1.5">
                <div><span className="text-slate-400">Name:</span> <strong>Tribeni Minati Foundation</strong></div>
                <div><span className="text-slate-400">Address:</span> Kanthaltala, Tribeni-Mogra Road, Tribeni, Hooghly - 712503</div>
                <div><span className="text-slate-400">Branch:</span> Radhanagar, Gopinagar, Dhaniakhali - 712402</div>
                <div><span className="text-slate-400">Phone:</span> <strong>+91 9143430927</strong> / +91 9635274891</div>
                <div><span className="text-slate-400">DARPAN ID:</span> <strong>WB/2026/0939703</strong> | Reg: <strong>SO212276</strong></div>
                <div><span className="text-slate-400">Geo GPS:</span> 22.9833° N, 88.3983° E (Hooghly, WB)</div>
              </div>
            </div>
          </div>

          {/* Downloadable Media Assets */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-4">
              Official Media Asset Downloads
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a
                href="/tmf-assets/official-seal.png"
                download="TMF_Official_Seal.png"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 group"
              >
                <span>Official Seal (PNG)</span>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </a>
              <a
                href="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                download="Rudra_Adhya_Secretary_TMF.jpg"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 group"
              >
                <span>Secretary Portrait</span>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </a>
              <a
                href="/tmf-assets/docs/TMF DARPAN.pdf"
                download="TMF_NITI_Aayog_DARPAN.pdf"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 group"
              >
                <span>DARPAN Certificate</span>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </a>
              <a
                href="/tmf-assets/docs/Bank Passbook.pdf"
                download="TMF_Central_Bank_Passbook.pdf"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 group"
              >
                <span>Bank Passbook PDF</span>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Live Financial Ledger Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <Database className="w-4 h-4" />
            <span>Verifiable On-Ground Allocation Ledger</span>
          </div>
        </div>
        <BlockchainLedger />
      </div>
    </div>
  );
};
