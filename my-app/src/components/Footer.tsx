import React, { useState } from 'react';
import { TMF_META, LEGAL_DOCS } from '../data/tmfVerifiedData';
import { Heart, FileText, Check, PhoneCall, ArrowRight } from 'lucide-react';
import type { LegalDocument } from '../data/tmfVerifiedData';
import type { PageId } from '../types';

interface FooterProps {
  onNavigate?: (page: PageId, programId?: string) => void;
  onOpenDonate: () => void;
  onOpenDocument: (doc: LegalDocument) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDonate, onOpenDocument }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const navTo = (page: PageId, programId?: string) => {
    if (onNavigate) {
      onNavigate(page, programId);
    }
  };

  return (
    <footer id="footer" className="bg-[#111A15] text-[#E8E3D7] border-t border-white/[0.08]">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#192720] border border-white/[0.08] shadow-2xl">
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-white">
              Join {TMF_META.name} in Transforming Lives.
            </h3>
            <p className="text-xs sm:text-sm text-[#E8E3D7]/70 max-w-xl leading-relaxed">
              Support Minati Free Education Centers, Infant Winter Bedding Drives, and rural medical camps with transparent on-ground deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/tribeniminatifoundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-semibold rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#93C5FD] hover:text-white hover:bg-[#1877F2]/30 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook Official</span>
            </a>

            <button
              onClick={onOpenDonate}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full bg-[#D97706] hover:bg-[#B45309] text-white shadow-lg shadow-amber-600/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate via UPI &amp; 80G</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Registration */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shrink-0">
                <img
                  src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                  alt="TMF Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-['DM_Serif_Display'] text-xl text-white">
                  {TMF_META.name}
                </h4>
                <div className="text-[10px] text-amber-400 font-mono">
                  Established 25th Nov 2013 · Reg: {TMF_META.newRegNo}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#E8E3D7]/70 leading-relaxed">
              Registered non-profit society under West Bengal Societies Registration Act, 1961 (Act XXVI of 1961). Dedicated to marginalized children, mothers, and rural hamlets across West Bengal.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#192720] border border-white/[0.08] text-[11px] font-mono space-y-1.5 text-[#E8E3D7]/80">
              <div>Reg Number: <strong className="text-white">{TMF_META.newRegNo}</strong></div>
              <div>DARPAN ID: <strong className="text-amber-400">{TMF_META.ngoDarpanId}</strong></div>
              <div>Income Tax PAN: <strong className="text-emerald-400">{TMF_META.pan}</strong></div>
              <div>Primary Email: <a href={`mailto:${TMF_META.primaryEmail}`} className="text-amber-300 hover:underline">{TMF_META.primaryEmail}</a></div>
            </div>
          </div>

          {/* Col 2: Dynamic Quick Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Quick Navigation
            </h5>
            <div className="space-y-1 text-xs text-[#E8E3D7]/80">
              <button onClick={() => navTo('home')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Home Overview</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('about')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>About Foundation</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('programs')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Core Programmes</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('events')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Camps &amp; Events</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('donor-portal')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Donor 80G Portal</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('stories')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Stories of Change</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('volunteer')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Join as Volunteer</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('transparency')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Statutory Ledger</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
              <button onClick={() => navTo('contact')} className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center justify-between">
                <span>Secretariat &amp; Hubs</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
            </div>
          </div>

          {/* Col 3: Official Documents Vault */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Statutory PDFs
            </h5>
            <div className="space-y-1 text-xs text-[#E8E3D7]/80">
              {LEGAL_DOCS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onOpenDocument(doc)}
                  className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate pr-2">{doc.title}</span>
                  <FileText className="w-3.5 h-3.5 text-amber-400 opacity-60 group-hover:opacity-100 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Verified Hotlines & Newsletter */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Verified Hotlines
            </h5>

            <div className="space-y-1.5 text-xs text-[#E8E3D7]/80">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Secretary: <strong className="font-mono">{TMF_META.contacts.secretary}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>President: <strong className="font-mono">{TMF_META.contacts.president}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Treasurer: <strong className="font-mono">{TMF_META.contacts.treasurer}</strong></span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-1">Annual Impact Dispatch</div>
              <p className="text-[11px] text-[#E8E3D7]/60 mb-2">
                Receive certified annual audit reports and ground story updates.
              </p>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Subscribed to verified dispatches!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@org.in"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#192720] border border-white/[0.12] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* SEO Keyword & Regional Silo Directory for Google Rank #1 Dominance */}
        <div className="pt-10 mt-10 border-t border-white/[0.08] space-y-4">
          <div className="text-[11px] font-mono text-amber-400/90 uppercase tracking-widest font-bold">
            Tribeni Minati Foundation · Official Search &amp; Regional Index
          </div>
          <div className="text-[11px] text-[#E8E3D7]/60 leading-relaxed font-sans space-y-2">
            <p>
              <strong className="text-white">Minati Foundation (ত্রিবেনী মিনতি ফাউন্ডেশন)</strong> — Also known as <strong className="text-white">Tribeni Minati Foundation</strong> and <strong className="text-white">Minati NGO Tribeni</strong>, is a premier registered non-profit society (Reg. No: <strong>SO212276</strong> of 2013-2014, NITI Aayog DARPAN ID: <strong>WB/2026/0939703</strong>, PAN: <strong>AAPAT4811J</strong>) founded on 25th November 2013 under the West Bengal Societies Registration Act, 1961. Led by General Secretary <strong>Shri Rudra Adhya</strong> and Founding President <strong>Swagata Adhya</strong>.
            </p>
            <p>
              <strong className="text-amber-300">Core M-I-N-A-T-I Pillars:</strong> Minorities Welfare &amp; Harmony · Illiterate &amp; Free Child Remedial Education · Needy &amp; Humanitarian Winter Blanket Distribution · Abused Women &amp; Child Protection &amp; Self-Reliance · Tribal Remote Village Healthcare &amp; Potable Water · Indians Grassroots Devotion under the motto <em>"...your smile, our reward..."</em> and <em>"...Lets go.. Do something!!"</em>.
            </p>
            <p>
              <strong className="text-emerald-300">Operational Hubs &amp; Coverage:</strong> Corporate Secretariat at Kanthaltala (near water tank), Tribeni-Mogra Road, Tribeni, Hooghly (712503) &amp; Branch Office at Radhanagar, Gopinagar, Dhaniakhali (712402). Serving communities across Tribeni, Mogra, Bandel, Chinsurah, Tarakeswar, Dhaniakhali, Polba, Balagarh, and the wider Hooghly District, West Bengal.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {['Minati Foundation', 'Tribeni Minati Foundation', 'Minati NGO Tribeni', 'Minati NGO', 'Tribeni NGO', 'ত্রিবেনী মিনতি ফাউন্ডেশন', 'Rudra Adhya Secretary', 'NGO in Hooghly', 'NGO in Tribeni', '80G Tax Exemption NGO', 'Minati Free Coaching', 'Winter Blanket Relief Hooghly'].map((keyword) => (
              <span key={keyword} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#E8E3D7]/70">
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Legal Copyright & Disclaimers */}
        <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E8E3D7]/60">
          <div>
            © {new Date().getFullYear()} {TMF_META.name}. All Rights Reserved. Govt. Reg. No. {TMF_META.newRegNo}.
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span>NGO DARPAN: {TMF_META.ngoDarpanId}</span>
            <span>·</span>
            <span>Section 80G Tax Deductible</span>
            <span>·</span>
            <span className="text-amber-400">100% Non-Profit Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
