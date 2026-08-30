import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../data/foundationData';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Frequently Answered Questions
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight mb-3">
            Clear Answers for Donors & CSR Teams
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know regarding tax deductions, corporate compliance, and field operations.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
