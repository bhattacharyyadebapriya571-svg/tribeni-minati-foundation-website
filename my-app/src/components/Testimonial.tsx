import React from 'react';
import { TESTIMONIALS_DATA } from '../data/foundationData';
import { MotionFocusGroup, MotionFocusItem } from './motion/MotionFocus';

export const Testimonial: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#f7f9fb] border-t border-slate-200/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-label-caps text-xs uppercase text-[#4b41e1] font-bold tracking-widest">
            Stakeholder &amp; Beneficiary Testimonials
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191c1e] tracking-tight">
            Voices from the Field
          </h2>
          <p className="font-body-base text-base text-[#45464d]">
            Authentic reflections from medical officers, CSR partners, and rural families whose lives have been transformed.
          </p>
        </div>

        {/* Testimonials Double-Bezel Grid — HorizonX MotionFocus */}
        <MotionFocusGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, i) => (
            <MotionFocusItem key={i} id={`testimonial-${i}`}>
              <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-mono font-bold">
                        {t.category}
                      </span>
                      <span className="material-symbols-outlined text-[#F59E0B] text-2xl">
                        format_quote
                      </span>
                    </div>

                    <p className="font-body-base text-sm text-[#45464d] italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                      {t.avatarText}
                    </div>
                    <div className="min-w-0">
                      <div className="font-headline-md text-sm font-bold text-[#191c1e] truncate">
                        {t.author}
                      </div>
                      <div className="font-mono text-[11px] text-[#64748B] truncate">
                        {t.role} · {t.organization}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </MotionFocusItem>
          ))}
        </MotionFocusGroup>

      </div>
    </section>
  );
};
