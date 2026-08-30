import React from 'react';
import { Heart, ArrowRight, ShieldCheck, PhoneCall, CheckCircle } from 'lucide-react';
import { TMF_META } from '../data/tmfVerifiedData';

interface FinalCTASectionProps {
  onOpenDonate: () => void;
  onOpenDocument?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenDonate }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#1B3B2B] text-white relative overflow-hidden">
      {/* Background Subtle Organic Lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 text-center relative z-10 space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          The Final Call to Action
        </div>

        {/* Powerful Headline */}
        <h2 className="font-['DM_Serif_Display'] text-4xl sm:text-6xl text-white leading-tight max-w-3xl mx-auto">
          Generational Change Begins with One Compassionate Act
        </h2>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed font-light">
          Whether you support a child's complete annual education, sponsor a maternal healthcare kit, or partner with us for corporate CSR — every rupee is deployed transparently with 80G tax benefits.
        </p>

        {/* CTA Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenDonate}
            className="inline-flex items-center gap-3 pl-8 pr-3 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 active:scale-98 transition-all cursor-pointer group"
          >
            <span>Support the Mission Today</span>
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </div>
          </button>

          <a
            href={`tel:${TMF_META.contacts.secretary}`}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>Speak to Secretary: {TMF_META.contacts.secretary}</span>
          </a>
        </div>

        {/* Statutory Assurance Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-emerald-100/70 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Section 80G Tax Exemption Certificate</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>NITI Aayog DARPAN: {TMF_META.ngoDarpanId}</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>Central Bank of India Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
