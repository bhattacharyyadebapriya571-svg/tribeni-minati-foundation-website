import React from 'react';
import { GOVERNING_BODY, TMF_META } from '../data/tmfVerifiedData';
import { ParallaxTotem } from '../components/motion/ParallaxTotem';
import { GridSweepContainer, GridSweepItem } from '../components/motion/GridSweep';
import type { PageId } from '../types';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onOpenDonate }) => {
  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* 1. Genesis / Hero Section */}
      <section className="relative w-full pt-16 lg:pt-24 pb-16 px-4 sm:px-8 max-w-[1280px] mx-auto z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider w-max">
            <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-pulse" />
            <span>Est. 25 November 2013 · Society Reg: {TMF_META.newRegNo}</span>
          </div>

          <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight max-w-2xl leading-tight">
            Institutional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
              Altruism
            </span>{' '}
            Meets Modern Intervention.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#45464d] max-w-xl leading-relaxed">
            Founded on the belief that profound empathy requires clinical precision, the Tribeni Minati Foundation bridges the gap between raw humanitarian need and structured, transparent upliftment across Bengal. We don't just donate; we engineer self-sustaining community ecosystems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('programs')}
              className="px-6 py-3.5 bg-[#111827] text-white font-bold rounded-2xl hover:bg-[#4b41e1] transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Explore Our Methodology
            </button>
            <button
              onClick={onOpenDonate}
              className="px-6 py-3.5 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Support Foundation (80G)
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#4b41e1]/20 to-black/10 blur-3xl opacity-50 rounded-full group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 bg-slate-100 p-2 bg-[#f2f4f6]">
            <img
              src="/tmf-assets/real-field-photos/tmf-field-10.jpeg"
              alt="Tribeni Minati Foundation Field Deployment"
              className="w-full h-full object-cover rounded-[1.5rem] scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
            
            {/* Overlay stat badge */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-4 border border-white/60">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4b41e1]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <div className="font-stat-lg text-2xl font-bold leading-none text-[#191c1e]">15,000+</div>
                <div className="font-label-caps text-[10px] text-[#45464d] uppercase mt-1">Beneficiaries Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision Bento Strip */}
      <section className="w-full py-16 bg-white border-y border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission Card — HorizonX ParallaxTotem #1 */}
            <ParallaxTotem index={0} maxOffset={40} className="h-full">
              <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="bg-white rounded-[22px] p-8 sm:p-10 flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#4b41e1] flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">target</span>
                    </div>
                    <div>
                      <span className="font-label-caps text-xs uppercase text-[#64748B] font-bold tracking-widest">
                        Our Objective
                      </span>
                      <h2 className="font-headline-lg text-2xl font-bold text-[#191c1e]">
                        The TMF Mission
                      </h2>
                    </div>
                  </div>

                  <p className="font-body-base text-base text-[#45464d] leading-relaxed">
                    To eliminate generational poverty, illiteracy, and healthcare vulnerabilities across rural and semi-urban Bengal through data-backed remedial coaching centers, infant winter protection kits, mobile doctor clinics, and women micro-livelihood self-reliance programs.
                  </p>

                  <div className="p-4 bg-[#f7f9fb] rounded-2xl border border-border-subtle font-headline-md text-sm italic font-semibold text-[#191c1e]">
                    "...your smile, our reward... lets go, do something!!"
                  </div>
                </div>
              </div>
            </ParallaxTotem>

            {/* Vision Card — HorizonX ParallaxTotem #2 */}
            <ParallaxTotem index={1} maxOffset={40} className="h-full">
              <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="bg-white rounded-[22px] p-8 sm:p-10 flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">visibility</span>
                    </div>
                    <div>
                      <span className="font-label-caps text-xs uppercase text-[#64748B] font-bold tracking-widest">
                        Future Trajectory
                      </span>
                      <h2 className="font-headline-lg text-2xl font-bold text-[#191c1e]">
                        The TMF Vision
                      </h2>
                    </div>
                  </div>

                  <p className="font-body-base text-base text-[#45464d] leading-relaxed">
                    To foster an equitable, self-reliant Indian society where every child from a marginalized background enjoys access to foundational learning, every mother achieves dignified economic security, and statutory transparency governs 100% of institutional philanthropy.
                  </p>

                  <div className="p-4 bg-[#f7f9fb] rounded-2xl border border-border-subtle font-mono text-xs text-[#64748B]">
                    Certified under Section 80G · NITI Aayog DARPAN: <strong>{TMF_META.ngoDarpanId}</strong>
                  </div>
                </div>
              </div>
            </ParallaxTotem>

          </div>
        </div>
      </section>

      {/* 3. General Secretary Rudra Adhya's Speech & Official Message */}
      <section className="w-full py-16 lg:py-24 bg-[#f7f9fb] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="bg-[#131b2e] text-white rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4b41e1]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Secretary Portrait Card */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800 relative group mb-6">
                  <img
                    src="/tmf-assets/leadership/rudra-adhya-secretary.jpg"
                    alt="General Secretary Rudra Adhya"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md py-1.5 px-3 rounded-xl text-center">
                    <span className="font-mono text-[11px] text-amber-300 font-bold">
                      Chief Functionary · Secretary
                    </span>
                  </div>
                </div>

                <h3 className="font-headline-lg text-2xl font-bold text-white">
                  Rudra Prasad Adhya
                </h3>
                <p className="font-mono text-xs text-indigo-300 mt-1">
                  General Secretary &amp; Executive Functionary
                </p>
                <div className="mt-3 flex flex-col gap-1 text-xs font-mono text-slate-300">
                  <a href={`tel:${TMF_META.contacts.secretary}`} className="hover:text-amber-300 transition-colors">
                    📞 {TMF_META.contacts.secretary}
                  </a>
                  <a href="mailto:rudra_adhya@yahoo.com" className="hover:text-amber-300 transition-colors">
                    ✉️ rudra_adhya@yahoo.com
                  </a>
                </div>
              </div>

              {/* Secretary Speech & Address */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-mono font-bold uppercase">
                  <span>Secretariat Address · সাধারণ সম্পাদকের বার্তা</span>
                </div>

                <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight">
                  "Empathy Without Clinical Execution is Mere Sentimentality."
                </h2>

                {/* Bengali Callout Quote */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-amber-100 font-headline-md text-sm sm:text-base leading-relaxed italic">
                  "আমাদের মূল লক্ষ্য শুধু অনুদান বিতরণ নয়, বরং তৃণমূল স্তরের প্রতিটি অবহেলিত পরিবারের জন্য একটি স্বয়ংসম্পূর্ণ প্ল্যাটফর্ম গড়ে তোলা। প্রতিটি টাকার হিসাব এবং প্রভাব সম্পূর্ণ স্বচ্ছ রাখা আমাদের সাংবিধানিক অঙ্গীকার। আসুন, আমরা একসঙ্গে কাজ করি।"
                </div>

                <div className="space-y-3 font-body-base text-sm sm:text-base text-slate-300 leading-relaxed">
                  <p>
                    Since our founding on 25th November 2013 under the West Bengal Societies Registration Act, Tribeni Minati Foundation has operated with the rigor of an institutional engine. We believe that true philanthropy must be quantifiable, statutory, and audit-verified.
                  </p>
                  <p>
                    Whether conducting infant winter relief drives in Dhaniakhali, remedial child coaching in Mogra, or mobilizing emergency blood donation camps, our secretariat ensures zero administrative bloat. Every partner, donor, and volunteer is a stakeholder in this noble collective.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenDonate}
                    className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Donate to Secretary's Fund
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Connect with Secretariat
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. Complete 7-Member Executive Governing Body */}
      <section className="w-full py-16 lg:py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="font-label-caps text-xs uppercase text-[#4b41e1] tracking-widest font-bold block mb-3">
                Executive Leadership &amp; Board of Governance
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#191c1e] font-bold">
                Executive Governing Body
              </h2>
              <p className="font-body-base text-base text-[#45464d] mt-2">
                Elected governing members registered under the West Bengal Societies Registration Act, 1961 (Reg: {TMF_META.newRegNo}) and NITI Aayog DARPAN.
              </p>
            </div>

            <button
              onClick={() => onNavigate('transparency')}
              className="px-6 py-3 bg-[#f2f4f6] text-[#191c1e] hover:bg-[#111827] hover:text-white rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer shrink-0"
            >
              Verify DARPAN Affidavits
            </button>
          </div>

          {/* Governing Body Cards Grid — HorizonX GridSweep */}
          <GridSweepContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {GOVERNING_BODY.map((member, index) => (
              <GridSweepItem key={member.name + member.designation}>
                <div
                  className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col h-full justify-between space-y-6">
                    
                    <div>
                      {/* Designation Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-mono font-bold">
                          {member.designation}
                        </span>
                        <span className="font-mono text-xs text-[#64748B]">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-1 group-hover:text-[#4b41e1] transition-colors">
                        {member.name}
                      </h3>

                      <div className="text-xs font-semibold text-[#64748B] mb-3">
                        Occupation: {member.occupation}
                      </div>

                      <p className="font-body-base text-xs text-[#45464d] leading-relaxed">
                        {member.note || 'Executive member overseeing foundation activities and community interventions.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 font-mono text-[11px] text-[#64748B] space-y-1.5">
                      <div className="flex justify-between">
                        <span>Jurisdiction:</span>
                        <span className="font-bold text-[#191c1e] truncate max-w-[160px]">{member.address.split(',')[0]}</span>
                      </div>
                      {member.contact && (
                        <div className="flex justify-between">
                          <span>Direct Phone:</span>
                          <span className="font-bold text-[#4b41e1]">{member.contact}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-emerald-700">
                        <span>DPDP Masked UIN:</span>
                        <span className="font-bold">{member.uinMasked}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </GridSweepItem>
            ))}
          </GridSweepContainer>

        </div>
      </section>

      {/* 5. The Paradigm M-I-N-A-T-I Framework Bento */}
      <section className="w-full py-16 bg-[#f7f9fb] border-t border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-label-caps text-xs uppercase text-[#64748B] mb-4 tracking-widest bg-slate-200/80 px-4 py-2 rounded-full font-bold">
              The Paradigm
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#191c1e] mb-4 max-w-3xl">
              The 6-Vector M-I-N-A-T-I Framework
            </h2>
            <p className="font-body-base text-base text-[#45464d] max-w-2xl leading-relaxed">
              A comprehensive, data-backed approach to identifying and uplifting the most vulnerable demographics across Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Minorities */}
            <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-[22px] p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-5xl text-slate-300 leading-none group-hover:text-[#4b41e1]">M</span>
                  <img src="/tmf-assets/minati-badges/icon_m_minorities.png" alt="Minorities Badge" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2">Minorities (সংখ্যালঘু)</h3>
                <p className="font-body-base text-sm text-[#45464d]">Welfare, social inclusion, skill development, and cultural harmony for marginalized minority communities.</p>
              </div>
            </div>

            {/* Illiterate */}
            <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-[22px] p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-5xl text-slate-300 leading-none group-hover:text-[#F59E0B]">I</span>
                  <img src="/tmf-assets/minati-badges/icon_i_illiterate.png" alt="Illiterate Badge" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2">Illiterate (নিরক্ষরতা দূরীকরণ)</h3>
                <p className="font-body-base text-sm text-[#45464d]">Operating free child remedial learning centers with notebooks, digital tools, and midday nutrition.</p>
              </div>
            </div>

            {/* Needy */}
            <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-[22px] p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-5xl text-slate-300 leading-none group-hover:text-[#111827]">N</span>
                  <img src="/tmf-assets/minati-badges/icon_n_needy.png" alt="Needy Badge" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2">Needy (অসহায় ও দরিদ্র সেবা)</h3>
                <p className="font-body-base text-sm text-[#45464d]">Distributing thermal winter bedding kits, dry ration kits, and emergency clothing to destitute families.</p>
              </div>
            </div>

            {/* Abused */}
            <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-[22px] p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-5xl text-slate-300 leading-none group-hover:text-rose-600">A</span>
                  <img src="/tmf-assets/minati-badges/icon_a_abused.png" alt="Abused Badge" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2">Abused (নির্যাতিত সুরক্ষা)</h3>
                <p className="font-body-base text-sm text-[#45464d]">Safe counseling cells, legal recourse, and vocational tailoring training for vulnerable women and children.</p>
              </div>
            </div>

            {/* Tribal */}
            <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-[22px] p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-5xl text-slate-300 leading-none group-hover:text-amber-700">T</span>
                  <img src="/tmf-assets/minati-badges/icon_t_tribal.png" alt="Tribal Badge" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2">Tribal (প্রান্তিক জনজাতি)</h3>
                <p className="font-body-base text-sm text-[#45464d]">Mobile medical clinics, sanitized drinking water, and traditional handicraft livelihood promotion in remote settlements.</p>
              </div>
            </div>

            {/* Indians */}
            <div className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-[22px] p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-5xl text-slate-300 leading-none group-hover:text-[#4b41e1]">I</span>
                  <img src="/tmf-assets/minati-badges/icon_i_indians.png" alt="Indians Badge" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2">Indians (সকল ভারতবাসী)</h3>
                <p className="font-body-base text-sm text-[#45464d]">A secular, national volunteer brotherhood inspiring citizens to act under: "...lets go, do something!!"</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Geographic Hubs & Banking Details */}
      <section className="w-full py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Headquarters Card */}
            <div className="lg:col-span-6 bg-[#f2f4f6] p-2 rounded-3xl shadow-sm">
              <div className="bg-white rounded-[22px] p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#4b41e1] text-3xl">location_city</span>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#191c1e]">
                      Primary Corporate Office
                    </h3>
                    <p className="font-mono text-xs text-[#64748B]">Tribeni, Hooghly</p>
                  </div>
                </div>
                <p className="font-body-base text-sm text-[#45464d] leading-relaxed">
                  {TMF_META.offices.headOffice.address}
                </p>
                <div className="pt-2 font-mono text-xs text-[#4b41e1] font-bold">
                  PIN: {TMF_META.offices.headOffice.pin} · Dist. Hooghly, West Bengal
                </div>
              </div>
            </div>

            {/* Regional Branch Card */}
            <div className="lg:col-span-6 bg-[#f2f4f6] p-2 rounded-3xl shadow-sm">
              <div className="bg-white rounded-[22px] p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#4b41e1] text-3xl">domain</span>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#191c1e]">
                      Regional Operations Office
                    </h3>
                    <p className="font-mono text-xs text-[#64748B]">Radhanagar, Dhaniakhali</p>
                  </div>
                </div>
                <p className="font-body-base text-sm text-[#45464d] leading-relaxed">
                  {TMF_META.offices.branchOffice.address}
                </p>
                <div className="pt-2 font-mono text-xs text-[#4b41e1] font-bold">
                  PIN: {TMF_META.offices.branchOffice.pin} · Dist. Hooghly, West Bengal
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Bottom CTA Area */}
      <section className="w-full py-16 bg-[#131b2e] text-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
          <span className="font-label-caps text-xs uppercase text-amber-300 font-bold tracking-widest mb-3">
            Join the Movement
          </span>
          <h3 className="font-headline-lg text-3xl sm:text-4xl font-bold mb-4 text-white">
            Invest in the M-I-N-A-T-I Framework
          </h3>
          <p className="font-body-base text-base text-slate-300 max-w-xl mb-8 leading-relaxed">
            Join a collective of pragmatic philanthropists. All contributions are 100% eligible for Section 80G tax deductions with verified Form 10BE filing.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenDonate}
              className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Donate to Foundation
            </button>
            <button
              onClick={() => onNavigate('transparency')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Review Statutory Impact
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
