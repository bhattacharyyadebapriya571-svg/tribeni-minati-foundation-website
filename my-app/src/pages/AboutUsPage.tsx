import React from 'react';
import { ArrowLeft, Heart, Target, Sparkles, Building2, Eye, Compass, Quote, Mail, Phone, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] pt-28 sm:pt-36 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4b41e1] hover:underline cursor-pointer mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Overview</span>
        </button>

        {/* Stitch Genesis Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="inline-flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[#4b41e1]" />
              <span className="font-mono text-xs font-bold uppercase text-[#4b41e1] tracking-widest">
                Our Genesis & Mission
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#191c1e] tracking-tight leading-[1.1]">
              Institutional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
                Altruism
              </span>{' '}
              Meets Modern Intervention.
            </h1>

            <div className="text-xl sm:text-2xl text-[#4b41e1] font-['Hind_Siliguri',sans-serif] font-bold">
              ত্রিবেনী মিনতি ফাউন্ডেশন — "...আপনার হাসি, আমাদের পুরস্কার..."
            </div>

            <p className="font-['Inter'] text-base sm:text-lg text-[#45464d] leading-relaxed max-w-xl">
              Founded on the belief that profound empathy requires clinical precision, Tribeni Minati Foundation (Reg: <strong>{TMF_META.newRegNo}</strong> · DARPAN: <strong>{TMF_META.ngoDarpanId}</strong>) bridges the gap between raw humanitarian need and structured, technology-driven upliftment. We don't just donate; we engineer self-sustaining ecosystems.
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#4b41e1] pt-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-border-subtle shadow-xs font-bold">
                "{TMF_META.slogans.primary}"
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-border-subtle shadow-xs font-bold">
                "{TMF_META.slogans.secondary}"
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenDonate}
                className="px-8 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] font-['Plus_Jakarta_Sans'] font-extrabold text-sm uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(245,158,11,0.35)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#111827]" />
                <span>Support Our Cause</span>
              </button>

              <button
                onClick={onOpenPartner}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-border-subtle text-[#191c1e] font-['Plus_Jakarta_Sans'] font-bold text-sm tracking-wide shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#4b41e1]" />
                <span>Corporate CSR Partnership</span>
              </button>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:w-1/2 w-full">
            <div className="double-bezel-outer group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="double-bezel-inner relative aspect-[4/3] overflow-hidden">
                <img
                  src="/tmf-assets/real-field-photos/tmf-field-10.jpeg"
                  alt="Tribeni Minati Foundation Genesis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Lives Touched Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4b41e1]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-black text-[#191c1e] leading-none">15,000+</div>
                    <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase mt-1">Lives Touched</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Double-Bezel Bento */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-[#4b41e1] bg-indigo-50 border border-indigo-100 mb-3">
              <Compass className="w-3.5 h-3.5" />
              Founding Creed & Strategic Compass
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#191c1e] tracking-tight">
              Our Vision & Mission
            </h2>
            <p className="font-['Hind_Siliguri',sans-serif] text-base text-[#45464d] mt-2 font-bold">
              সমাজের সর্বস্তরের পিছিয়ে পড়া মানুষের মৌলিক অধিকার, শিক্ষা ও মর্যাদা রক্ষায় আমাদের অঙ্গীকার
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Vision Card */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-8 sm:p-10 flex flex-col justify-between h-full space-y-6 bg-white">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#4b41e1] flex items-center justify-center">
                    <Eye className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-[#4b41e1] bg-indigo-50 border border-indigo-100">
                    Long-Term Vision
                  </span>
                </div>

                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#191c1e] leading-snug">
                    Our Vision · আমাদের দৃষ্টিভঙ্গি
                  </h3>
                  <div className="text-sm text-[#4b41e1] font-['Hind_Siliguri',sans-serif] font-bold mt-1">
                    একটি বৈষম্যহীন, শিক্ষিত ও আত্মনির্ভরশীল সমাজ গঠন
                  </div>
                </div>

                <p className="font-['Inter'] text-sm sm:text-base text-[#45464d] leading-relaxed">
                  To establish an inclusive, enlightened, and compassionate society where no child drops out of education due to poverty, no mother or infant suffers from neonatal cold or malnutrition, and every marginalized citizen—regardless of caste, faith, or gender—lives with uncompromised human dignity, healthcare security, and economic self-reliance.
                </p>

                <div className="p-5 rounded-2xl bg-[#f7f9fb] border border-border-subtle font-['Hind_Siliguri',sans-serif] text-[#191c1e] text-sm leading-relaxed space-y-2">
                  <div className="font-bold text-[#4b41e1] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4b41e1]" />
                    <span>ভিশন সংক্ষেপ:</span>
                  </div>
                  <p>
                    আমরা এমন একটি সমাজ গড়ার স্বপ্ন দেখি যেখানে দারিদ্র্য কোনো শিশুর মেধা বিকাশের বাধা হবে না, প্রত্যন্ত গ্রামে চিকিৎসা সেবা পৌঁছে যাবে এবং প্রতিটি মানুষ নিজস্ব দক্ষতায় আত্মমর্যাদার সাথে বাঁচবে।
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs text-[#64748B]">
                  <span>Pillar: Inclusivity & Dignity</span>
                  <span className="text-[#4b41e1] font-bold">Motto: "...your smile, our reward..."</span>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-8 sm:p-10 flex flex-col justify-between h-full space-y-6 bg-white">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-[#059669] bg-emerald-50 border border-emerald-100">
                    Action Manifesto
                  </span>
                </div>

                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#191c1e] leading-snug">
                    Our Mission · আমাদের লক্ষ্য
                  </h3>
                  <div className="text-sm text-[#059669] font-['Hind_Siliguri',sans-serif] font-bold mt-1">
                    M-I-N-A-T-I কাঠামোর অধীনে সার্বিক জনকল্যাণ
                  </div>
                </div>

                <p className="font-['Inter'] text-sm sm:text-base text-[#45464d] leading-relaxed">
                  Dedicated to the 6-fold devotion of <strong>M-I-N-A-T-I</strong> (Minorities, Illiterate, Needy, Abused, Tribal, Indians), our mission is to run continuous free remedial coaching centers, provide annual infant winter protection bedding, execute regular mobile medical checkup camps, and provide certified vocational tailoring to rural women with 100% statutory transparency and community ownership.
                </p>

                <div className="p-5 rounded-2xl bg-[#f7f9fb] border border-border-subtle font-['Hind_Siliguri',sans-serif] text-[#191c1e] text-sm leading-relaxed space-y-2">
                  <div className="font-bold text-[#059669] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>মিশন সংক্ষেপ:</span>
                  </div>
                  <p>
                    ব্যানারের মূলমন্ত্র "...Lets go.. Do something!!" মেনে সংখ্যালঘু, নিরক্ষর, অভাবী, নির্যাতিত ও উপজাতি সম্প্রদায়ের জন্য অবৈতনিক পাঠশালা, শীতবস্ত্র বিতরণ ও বিনামূল্যে চিকিৎসা শিবির পরিচালনা করা।
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs text-[#64748B]">
                  <span>Action: Continuous Aid</span>
                  <span className="text-[#059669] font-bold">Reg: SO212276</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECRETARY'S DESK / সম্পাদকীয় বার্তা */}
        <div className="mb-20">
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-8 sm:p-12 lg:p-14 bg-white relative overflow-hidden">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-[#4b41e1] bg-indigo-50 border border-indigo-100 mb-8 shadow-xs">
                <Award className="w-4 h-4 text-[#4b41e1]" />
                <span>Office of the General Secretary · সম্পাদকীয় বার্তা</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Secretary Portrait & Credentials Card */}
                <div className="lg:col-span-5 flex flex-col items-center text-center">
                  <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
                    <img
                      src="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                      alt="Rudra Adhya - General Secretary, Tribeni Minati Foundation"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white text-left p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
                      <div className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-amber-200">
                        Rudra Adhya
                      </div>
                      <div className="text-xs text-white/90 font-medium">
                        General Secretary · সাধারণ সম্পাদক
                      </div>
                      <div className="font-mono text-[11px] text-amber-300 mt-0.5 font-bold">
                        Tribeni Minati Foundation
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-border-subtle w-full max-w-[340px] text-slate-800 text-xs font-mono">
                    <div className="font-bold text-[#191c1e]">Tribeni Minati Foundation</div>
                    <div className="text-[11px] text-[#64748B]">- Office of the Secretary -</div>
                    <div className="font-bold text-[#4b41e1] text-sm mt-0.5">Rudra Adhya</div>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-mono font-medium">
                    <a href="tel:+919143430927" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-border-subtle hover:text-[#4b41e1] transition-colors shadow-xs">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>+91 9143430927</span>
                    </a>
                    <a href="mailto:tribeniminatifoundation@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-border-subtle hover:text-[#4b41e1] transition-colors shadow-xs">
                      <Mail className="w-3.5 h-3.5 text-[#4b41e1]" />
                      <span>Email Secretary</span>
                    </a>
                  </div>
                </div>

                {/* Secretary's Detailed Message */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <Quote className="w-10 h-10 text-indigo-200 mb-2" />
                    <h3 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-extrabold text-[#191c1e] leading-tight">
                      "জনসেবাই আমাদের ধর্ম, মানুষের নির্মল হাসিই আমাদের পরম প্রাপ্তি"
                    </h3>
                    <p className="font-mono text-xs text-[#64748B] mt-1 font-bold">
                      A Message from Shri Rudra Adhya, General Secretary
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100 font-['Hind_Siliguri',sans-serif] text-[#191c1e] text-sm sm:text-base leading-relaxed space-y-3">
                    <p><strong>নমস্কার ও শুভেচ্ছা,</strong></p>
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

                  <div className="font-['Inter'] text-xs sm:text-sm text-[#45464d] leading-relaxed space-y-2">
                    <p>
                      "When we founded Tribeni Minati Foundation on 25th November 2013, our commitment was straightforward: to provide direct, accountable, and transparent relief where it is needed most. We believe that true social transformation does not occur through grand promises, but through continuous on-ground dedication—be it through our weekly remedial education centers, neonatal winter protection drives, or emergency medical camps."
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-['Plus_Jakarta_Sans'] text-base font-extrabold text-[#191c1e]">
                        Rudra Adhya
                      </div>
                      <div className="font-mono text-xs text-[#64748B]">
                        General Secretary, Tribeni Minati Foundation
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-800 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Authorized Signatory</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Governing Body & Reach */}
        <GoverningBodySection onOpenDocument={onOpenDocument || (() => {})} />
        <GeographicReach />
        <Governance />

      </div>
    </div>
  );
};
