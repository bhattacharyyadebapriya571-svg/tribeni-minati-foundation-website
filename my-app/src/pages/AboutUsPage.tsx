import React from 'react';
import { ArrowLeft, Heart, Target, Sparkles, Building2, Globe, Eye, Compass, Quote, Mail, Phone, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { TMF_META } from '../data/tmfVerifiedData';
import { GoverningBodySection } from '../components/GoverningBodySection';
import { GeographicReach } from '../components/GeographicReach';
import { Governance } from '../components/Governance';
import type { PageId } from '../types';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
  onOpenPartner: () => void;
  onOpenDocument?: (doc: LegalDocument) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onOpenDonate, onOpenPartner, onOpenDocument }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Flagship Overview
        </button>

        {/* Page Hero Banner */}
        <div className="rounded-[2.5rem] p-8 sm:p-14 bg-gradient-to-br from-[#0F1E17] via-[#162D22] to-[#1B3B2B] text-white shadow-2xl relative overflow-hidden mb-16 border border-emerald-500/20">
          <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay">
            <img
              src="/tmf-assets/generated/education-banyan.jpg"
              alt="Tribeni Minati Foundation Grassroots Work"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E17] via-[#0F1E17]/90 to-transparent" />
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 border border-amber-300/30 mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              About {TMF_META.name} · Est. 2013 (Reg: {TMF_META.newRegNo})
            </div>
            <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-6xl text-white leading-tight mb-4">
              Pioneering Civic-Driven Grassroots Transformation
            </h1>
            <div className="text-xl sm:text-2xl text-amber-200 font-['Hind_Siliguri',sans-serif] font-bold mb-4">
              ত্রিবেনী মিনতি ফাউন্ডেশন — "...আপনার হাসি, আমাদের পুরস্কার..."
            </div>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-6">
              Registered under the <strong>West Bengal Societies Registration Act, 1961 (Act XXVI of 1961)</strong> and enrolled with <strong>NITI Aayog NGO DARPAN (WB/2026/0939703)</strong>, Tribeni Minati Foundation unites educators, grassroots volunteers, and healthcare professionals to empower rural and marginalized communities across West Bengal and Eastern India.
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-amber-300 mb-8">
              <span className="px-3.5 py-1 rounded-xl bg-white/10 border border-white/20">
                "{TMF_META.slogans.primary}"
              </span>
              <span className="px-3.5 py-1 rounded-xl bg-white/10 border border-white/20">
                "{TMF_META.slogans.secondary}"
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDonate}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-300 shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>Support Our Mission</span>
              </button>

              <button
                onClick={onOpenPartner}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= MISSION & VISION SECTION ================= */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 mb-3">
              <Compass className="w-3.5 h-3.5" />
              Founding Creed & Strategic Compass
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight">
              Our Vision & Mission
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-['Hind_Siliguri',sans-serif]">
              সমাজের সর্বস্তরের পিছিয়ে পড়া মানুষের মৌলিক অধিকার, শিক্ষা ও মর্যাদা রক্ষায় আমাদের অঙ্গীকার
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 border-2 border-blue-200/80 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Eye className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 font-mono">
                    Long-Term Vision
                  </span>
                </div>

                <div>
                  <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900 leading-snug">
                    Our Vision · আমাদের দৃষ্টিভঙ্গি
                  </h3>
                  <div className="text-sm text-blue-800 font-['Hind_Siliguri',sans-serif] font-bold mt-1">
                    একটি বৈষম্যহীন, শিক্ষিত ও আত্মনির্ভরশীল সমাজ গঠন
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To establish an inclusive, enlightened, and compassionate society where no child drops out of education due to poverty, no mother or infant suffers from neonatal cold or malnutrition, and every marginalized citizen—regardless of caste, faith, or gender—lives with uncompromised human dignity, healthcare security, and economic self-reliance.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs space-y-2 font-['Hind_Siliguri',sans-serif] text-slate-800 text-sm leading-relaxed">
                  <div className="font-bold text-blue-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>ভিশন সংক্ষেপ:</span>
                  </div>
                  <p>
                    আমরা এমন একটি সমাজ গড়ার স্বপ্ন দেখি যেখানে দারিদ্র্য কোনো শিশুর মেধা বিকাশের বাধা হবে না, প্রত্যন্ত গ্রামে চিকিৎসা সেবা পৌঁছে যাবে এবং প্রতিটি মানুষ নিজস্ব দক্ষতায় আত্মমর্যাদার সাথে বাঁচবে।
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-100 flex items-center justify-between text-xs text-blue-900 font-mono font-medium">
                <span>Core Pillar: Inclusivity & Dignity</span>
                <span>Motto: "...your smile, our reward..."</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border-2 border-emerald-200/80 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 font-mono">
                    Action Manifesto
                  </span>
                </div>

                <div>
                  <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900 leading-snug">
                    Our Mission · আমাদের লক্ষ্য
                  </h3>
                  <div className="text-sm text-emerald-800 font-['Hind_Siliguri',sans-serif] font-bold mt-1">
                    M-I-N-A-T-I কাঠামোর অধীনে সার্বিক জনকল্যাণ
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Dedicated to the 6-fold devotion of <strong>M-I-N-A-T-I</strong> (Minorities, Illiterate, Needy, Abused, Tribal, Indians), our mission is to run continuous free remedial coaching centers, provide annual infant winter protection bedding, execute regular mobile medical checkup camps, and provide certified vocational tailoring to rural women with 100% statutory transparency and community ownership.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-2 font-['Hind_Siliguri',sans-serif] text-slate-800 text-sm leading-relaxed">
                  <div className="font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>মিশন সংক্ষেপ:</span>
                  </div>
                  <p>
                    ব্যানারের মূলমন্ত্র "...Lets go.. Do something!!" মেনে সংখ্যালঘু, নিরক্ষর, অভাবী, নির্যাতিত ও উপজাতি সম্প্রদায়ের জন্য অবৈতনিক পাঠশালা, শীতবস্ত্র বিতরণ ও বিনামূল্যে চিকিৎসা শিবির পরিচালনা করা।
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-mono font-medium">
                <span>Action: Continuous Institutional Aid</span>
                <span>Code: SO212276</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= SECRETARY'S DESK / সম্পাদকীয় বার্তা ================= */}
        <div className="mb-20">
          <div className="p-8 sm:p-12 lg:p-14 rounded-[3rem] bg-white border-2 border-slate-200/90 shadow-2xl relative overflow-hidden">
            
            {/* Background Decorative Stamp */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl -z-0 pointer-events-none" />
            
            <div className="relative z-10">
              
              {/* Section Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-50 border border-amber-200 mb-8 shadow-xs">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Office of the General Secretary · সম্পাদকীয় বার্তা</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Secretary Portrait & Credentials Card */}
                <div className="lg:col-span-5 flex flex-col items-center text-center">
                  <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900/10 group">
                    <img
                      src="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                      alt="Rudra Adhya - General Secretary, Tribeni Minati Foundation"
                      className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white text-left p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
                      <div className="font-['DM_Serif_Display'] text-xl text-amber-200">
                        Rudra Adhya
                      </div>
                      <div className="text-xs text-white/90 font-medium">
                        General Secretary · সাধারণ সম্পাদক
                      </div>
                      <div className="text-[11px] text-amber-300 font-mono mt-0.5">
                        Tribeni Minati Foundation
                      </div>
                    </div>
                  </div>

                  {/* Nameplate Badge */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-100 border border-slate-300 shadow-inner w-full max-w-[340px] text-slate-800 text-xs font-mono">
                    <div className="font-bold text-slate-900">Tribeni Minati Foundation</div>
                    <div className="text-[11px] text-slate-600">- Office of the Secretary -</div>
                    <div className="font-bold text-blue-900 text-sm mt-0.5">Rudra Adhya</div>
                  </div>

                  {/* Contact Direct */}
                  <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-600">
                    <a href="tel:+919143430927" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:text-blue-700 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>+91 9143430927</span>
                    </a>
                    <a href="mailto:tribeniminatifoundation@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:text-blue-700 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Email Secretary</span>
                    </a>
                  </div>
                </div>

                {/* Secretary's Detailed Message */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div>
                    <Quote className="w-10 h-10 text-amber-600/30 mb-2" />
                    <h3 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl text-slate-900 leading-tight">
                      "জনসেবাই আমাদের ধর্ম, মানুষের নির্মল হাসিই আমাদের পরম প্রাপ্তি"
                    </h3>
                    <p className="text-sm text-slate-500 font-mono mt-1">
                      A Message from Shri Rudra Adhya, General Secretary
                    </p>
                  </div>

                  {/* Bengali Message Paragraph */}
                  <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 font-['Hind_Siliguri',sans-serif] text-slate-800 text-sm sm:text-base leading-relaxed space-y-3">
                    <p>
                      <strong>নমস্কার ও শুভেচ্ছা,</strong>
                    </p>
                    <p>
                      ২০১৩ সালের ২৫শে নভেম্বর ত্রিবেনী মিনতি ফাউন্ডেশনের যে পথচলা শুরু হয়েছিল, তার একমাত্র ভিত্তি ছিল সমাজের সবচেয়ে অসহায় মানুষের পাশে নিঃস্বার্থভাবে দাঁড়ানো। আমাদের প্রতিটি কাজের প্রেরণা হলো আমাদের মূলমন্ত্র — <em>"...আপনার হাসি, আমাদের পুরস্কার..."</em>।
                    </p>
                    <p>
                      আমাদের <strong>M-I-N-A-T-I</strong> সংক্ষিপ্ত রূপের গভীরে রয়েছে একটি মহতী ব্রত: <strong>Minorities</strong> (সংখ্যালঘু সম্প্রদায় কল্যাণ), <strong>Illiterate</strong> (নিরক্ষর শিশুদের বিনামূল্যে শিক্ষাদান), <strong>Needy</strong> (দরিদ্র ও অভাবী মানুষের সেবা), <strong>Abused</strong> (নির্যাতিত নারী ও শিশুর সুরক্ষা), <strong>Tribal</strong> (প্রান্তিক জনজাতি উন্নয়ন) এবং <strong>Indians</strong> (সকল ভারতবাসীর সার্বিক কল্যাণ)।
                    </p>
                    <p>
                      আমাদের মিনতি অবৈতনিক কোচিং সেন্টারে যখন কোনো প্রথম প্রজন্মের শিক্ষার্থী হাসিমুখে বই পড়ে, কিংবা তীব্র শীতে যখন মা ও নবজাতক শিশুর হাতে মশারিযুক্ত সুরক্ষিত বেডিং পৌঁছে দেওয়া হয়—তখনই আমরা আমাদের কাজের সার্থকতা খুঁজে পাই। আসুন, আমরা সকলে একসাথে কাঁধে কাঁধ মিলিয়ে এগিয়ে চলি — <em>"...Lets go.. Do something!!"</em>
                    </p>
                  </div>

                  {/* English Translation & Vision */}
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                    <p>
                      "When we founded Tribeni Minati Foundation on 25th November 2013, our commitment was straightforward: to provide direct, accountable, and transparent relief where it is needed most. We believe that true social transformation does not occur through grand promises, but through continuous on-ground dedication—be it through our weekly remedial education centers, neonatal winter protection drives, or emergency medical camps."
                    </p>
                    <p>
                      "I warmly invite all citizens, youth volunteers, and corporate partners to join our journey of compassion and nation-building."
                    </p>
                  </div>

                  {/* Signature Line */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-['DM_Serif_Display'] text-lg text-slate-900">
                        Rudra Adhya
                      </div>
                      <div className="text-xs text-slate-500">
                        General Secretary, Tribeni Minati Foundation
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-800 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Statutory Signatory</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* 3 Strategic Operating Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900">
              Grassroots Identification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We work directly with village gram panchayats and local club networks to pinpoint the most vulnerable children, distressed women, and elderlies requiring immediate assistance.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900">
              Institutional Delivery
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of sporadic handouts, we establish structured continuous institutions — such as the Minati Free Education Centers running 3 days a week with qualified faculty.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900">
              Complete Accountability
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Statutory transparency backed by NITI Aayog NGO DARPAN compliance, Governing Body oversight, and published on-ground photo-documentary proof.
            </p>
          </div>
        </div>

      </div>

      {/* Embedded 7-Member Executive Governing Body Section */}
      {onOpenDocument && (
        <GoverningBodySection onOpenDocument={onOpenDocument} />
      )}

      {/* Embedded Geographic Footprint Section */}
      <GeographicReach />

      {/* Embedded Statutory Governance Section */}
      <Governance />
    </div>
  );
};
