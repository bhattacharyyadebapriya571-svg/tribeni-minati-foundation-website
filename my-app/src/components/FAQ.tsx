import React, { useState } from 'react';
import { FAQS_DATA } from '../data/foundationData';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-t border-slate-200/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-label-caps text-xs uppercase text-[#4b41e1] font-bold tracking-widest">
            Statutory &amp; Operational Clarity
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191c1e] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-body-base text-base text-[#45464d]">
            Essential statutory details on Section 80G tax deductions, direct bank wire transfers, and volunteer participation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS_DATA.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-[#f2f4f6] p-1.5 rounded-2xl shadow-xs transition-all"
              >
                <div className="bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-headline-md text-base sm:text-lg font-bold text-[#191c1e]">
                      {faq.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#4b41e1] text-2xl transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 font-body-base text-sm text-[#45464d] leading-relaxed border-t border-slate-100 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
