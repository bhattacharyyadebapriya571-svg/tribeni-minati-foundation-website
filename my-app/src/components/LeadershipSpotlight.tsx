import React from 'react';
import { TMF_META } from '../data/tmfVerifiedData';
import type { PageId } from '../types';

interface LeadershipSpotlightProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

export const LeadershipSpotlight: React.FC<LeadershipSpotlightProps> = ({ onNavigate, onOpenDonate }) => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#f2f4f6]/60 backdrop-blur-sm border-t border-slate-200/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-label-caps text-xs uppercase text-[#4b41e1] tracking-widest font-bold block mb-2">
              Grassroots Leadership &amp; Governance
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#191c1e]">
              Executive Secretariat Desk
            </h2>
            <p className="font-body-base text-base text-[#45464d] mt-2">
              Direct accountability from our founding functionaries, ensuring transparent stewardship of public and corporate altruism.
            </p>
          </div>

          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-[#4b41e1] font-semibold hover:text-[#645efb] transition-colors group px-4 py-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer text-sm font-mono"
          >
            <span>View Full 7-Member Board</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Secretary & President Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* General Secretary Rudra Adhya Featured Card */}
          <div className="lg:col-span-7 bg-[#131b2e] text-white p-2 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="bg-[#111827] rounded-[24px] p-8 sm:p-10 flex flex-col justify-between h-full space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/40 bg-slate-800 shadow-xl">
                  <img
                    src="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                    alt="Secretary Rudra Prasad Adhya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full font-mono text-[11px] font-bold uppercase">
                    General Secretary · Chief Functionary
                  </span>
                  <h3 className="font-headline-lg text-2xl font-bold text-white">
                    Rudra Prasad Adhya
                  </h3>
                  <div className="font-mono text-xs text-slate-300">
                    <a href={`tel:${TMF_META.contacts.secretary}`} className="text-amber-300 hover:underline">
                      📞 {TMF_META.contacts.secretary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bengali Speech Highlight */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 font-headline-md text-sm text-amber-100 italic leading-relaxed">
                "আমাদের মূল লক্ষ্য শুধু অনুদান বিতরণ নয়, বরং তৃণমূল স্তরের প্রতিটি অবহেলিত পরিবারের জন্য একটি স্বয়ংসম্পূর্ণ প্ল্যাটফর্ম গড়ে তোলা। প্রতিটি টাকার হিসাব এবং প্রভাব সম্পূর্ণ স্বচ্ছ রাখা আমাদের সাংবিধানিক অঙ্গীকার।"
              </div>

              <p className="font-body-base text-sm text-slate-300 leading-relaxed">
                Rudra leads on-ground execution across Hooghly, overseeing free child remedial centers, winter infant bedding drives, and emergency medical camps.
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenDonate}
                  className="px-6 py-3 bg-[#F59E0B] text-[#111827] font-extrabold rounded-xl text-xs uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
                >
                  Support Field Operations
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Direct Contact
                </button>
              </div>

            </div>
          </div>

          {/* Founding President Swagata Adhya Card */}
          <div className="lg:col-span-5 bg-white p-2 rounded-[32px] border border-border-subtle shadow-md flex flex-col justify-between">
            <div className="bg-[#f7f9fb] rounded-[24px] p-8 sm:p-10 flex flex-col justify-between h-full space-y-6">
              
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-border-subtle bg-slate-200 shadow-md">
                  <img
                    src="/tmf-assets/leadership/swagata-adhya-president.jpg"
                    alt="Founding President Swagata Adhya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-indigo-50 text-[#4b41e1] rounded-full font-mono text-[11px] font-bold uppercase">
                    Founding President
                  </span>
                  <h3 className="font-headline-md text-xl font-bold text-[#191c1e]">
                    Swagata Adhya
                  </h3>
                  <div className="font-mono text-xs text-[#64748B]">
                    Purba Bardhaman, WB
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-label-caps text-xs uppercase font-bold text-[#191c1e]">
                  Founder's Mission Statement
                </span>
                <p className="font-body-base text-sm text-[#45464d] leading-relaxed">
                  "Established Tribeni Minati Foundation on 25th November 2013 to institutionalize grassroots empathy, ensuring that education, healthcare, and dignity reach every marginalized family in Bengal."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 font-mono text-xs text-[#64748B] flex justify-between">
                <span>Society Reg: <strong>{TMF_META.newRegNo}</strong></span>
                <span className="text-emerald-700 font-bold">12A &amp; 80G Compliant</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
