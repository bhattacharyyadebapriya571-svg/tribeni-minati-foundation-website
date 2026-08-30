import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Database, FileText, Users2, ArrowRight, Download, Sparkles, CheckCircle } from 'lucide-react';
import { FOUNDATION_META } from '../data/foundationData';

interface CSRProps {
  onOpenPartner: () => void;
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const CSR: React.FC<CSRProps> = ({ onOpenPartner }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#4E8B65]" />,
      title: '12A & 80G Tax Certified',
      body: 'All contributions receive immediate 50% income tax deductions under Section 80G. Seamless Form 10BE filing and annual FCRA alignment.',
    },
    {
      icon: <Database className="w-5 h-5 text-[#4E8B65]" />,
      title: 'Blockchain Impact Tracking',
      body: 'Every rupee deployed is time-stamped on an immutable public ledger. Direct visibility down to the beneficiary headcount, GPS coordinates, and procurement invoices.',
    },
    {
      icon: <FileText className="w-5 h-5 text-[#4E8B65]" />,
      title: 'Quarterly ESG Impact Reports',
      body: 'Statutory compliance dossiers prepared with Big Four auditing standards. Fully mapped to GRI Standards and UN Sustainable Development Goals.',
    },
    {
      icon: <Users2 className="w-5 h-5 text-[#4E8B65]" />,
      title: 'Dedicated CSR Relationship Cell',
      body: 'Assigned full-time account directors for each corporate partner. Bespoke program architecture tailored to your company’s geographic and thematic mandate.',
    },
  ];

  return (
    <section
      id="csr"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#0C1A11]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 85% 25%, rgba(78,139,101,0.14) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4E8B65]/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left CSR Narrative */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={SPRING}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#6DBF88] bg-[#4E8B65]/15 border border-[#4E8B65]/25 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Corporate CSR & ESG Suite
            </div>

            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#E8F0EB] leading-tight tracking-tight mb-6">
              The Most Transparent CSR Partner in India.
            </h2>

            <p className="text-base text-[#7A9E85] leading-relaxed mb-8">
              We don’t just accept CSR funds — we engineer verifiable social infrastructure programs that satisfy your board, your ESG committee, and the Section 135 mandate under the Companies Act 2013.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12">
              <button
                onClick={onOpenPartner}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#4E8B65] text-white hover:bg-[#3D6B4F] shadow-lg shadow-[#4E8B65]/30 active:scale-98 transition-all cursor-pointer"
              >
                <span>Start a CSR Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`mailto:${FOUNDATION_META.csrEmail}?subject=Request CSR Impact Deck`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#7A9E85] border border-[#4E8B65]/30 hover:bg-white/5 active:scale-98 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#4E8B65]" />
                Download CSR Impact Deck
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#4E8B65]/20">
              <div>
                <div className="font-['DM_Serif_Display'] text-3xl sm:text-4xl text-[#E8F0EB] font-bold">
                  ₹18Cr+
                </div>
                <div className="text-xs text-[#5A8A6A] font-medium mt-1">
                  CSR Capital Deployed
                </div>
              </div>

              <div>
                <div className="font-['DM_Serif_Display'] text-3xl sm:text-4xl text-[#E8F0EB] font-bold">
                  100%
                </div>
                <div className="text-xs text-[#5A8A6A] font-medium mt-1">
                  Schedule VII Audit Compliance
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Features Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...SPRING, delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 bg-white/[0.03] border border-[#4E8B65]/15 hover:border-[#4E8B65]/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#4E8B65]/15 flex items-center justify-center mb-4 border border-[#4E8B65]/25">
                    {f.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#D4E8DA] mb-2 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-xs text-[#7A9E85] leading-relaxed">
                    {f.body}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-[#4E8B65] font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  MCA / Income Tax Certified
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
