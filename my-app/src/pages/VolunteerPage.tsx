import React, { useState } from 'react';
import { TMF_META } from '../data/tmfVerifiedData';
import type { PageId } from '../types';

interface VolunteerPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate?: (presetAmount?: number, cause?: string) => void;
  onOpenPartner?: () => void;
}

export const VolunteerPage: React.FC<VolunteerPageProps> = ({ onNavigate, onOpenDonate, onOpenPartner }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: 'West Bengal',
    interestArea: 'Rural STEM & English Educator',
    availability: 'Weekends (4–6 hours)',
    experienceNotes: '',
  });

  const [registeredRef, setRegisteredRef] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setRegisteredRef(`TMF-VOL-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Page Hero Header */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>Youth Volunteer &amp; Field Fellow Program</span>
            </div>

            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight leading-tight">
              Mobilize Compassion. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
                Earn Your Digital Pass.
              </span>
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-[#45464d] leading-relaxed">
              Join our network of grassroots change-makers across Hooghly. Provide teaching mentorship, relief drive coordination, or clinical assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenPartner && (
              <button
                onClick={onOpenPartner}
                className="px-6 py-4 bg-white border border-border-subtle rounded-2xl font-bold text-xs uppercase tracking-wider text-[#191c1e] hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
              >
                Corporate CSR RFP
              </button>
            )}
            <button
              onClick={() => onOpenDonate && onOpenDonate(2500, 'Volunteer Kit Sponsorship')}
              className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Sponsor Volunteer Kits
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Live Digital Volunteer Pass Preview */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form / Success Card */}
          <div className="lg:col-span-7 bg-[#f2f4f6] p-2 sm:p-3 rounded-[32px] shadow-sm">
            <div className="bg-white rounded-[24px] p-6 sm:p-10">
              {submitted ? (
                <div className="space-y-6 text-center py-6">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                  </div>

                  <div>
                    <span className="font-label-caps text-xs text-emerald-700 uppercase font-bold tracking-widest">
                      Volunteer Onboarded
                    </span>
                    <h2 className="font-headline-lg text-3xl font-bold text-[#191c1e] mt-1">
                      Welcome to Tribeni Minati Foundation
                    </h2>
                  </div>

                  <div className="p-4 bg-[#f7f9fb] rounded-2xl border border-border-subtle max-w-sm mx-auto font-mono text-sm">
                    <span className="text-[#64748B] block text-xs">Official Volunteer Pass ID</span>
                    <span className="font-bold text-[#4b41e1] text-base">{registeredRef}</span>
                  </div>

                  <p className="font-body-base text-sm text-[#45464d] max-w-md mx-auto leading-relaxed">
                    Your profile is now registered with Secretariat at Tribeni Headquarters. You will receive orientation schedule via WhatsApp.
                  </p>

                  <div className="flex justify-center gap-4 pt-2">
                    <button
                      onClick={() => onNavigate('events')}
                      className="px-6 py-3.5 bg-[#111827] text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                    >
                      View Upcoming Camps
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3.5 bg-slate-100 text-[#191c1e] font-bold rounded-xl text-xs uppercase cursor-pointer"
                    >
                      Register Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-2xl font-bold text-[#191c1e]">
                      Volunteer Application Desk
                    </h3>
                    <p className="font-body-base text-xs text-[#64748B]">
                      Fill out your details to receive verified field assignments and hours certification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Debapriya Bhattacharyya"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                        WhatsApp Mobile
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9143430927"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                        District / City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hooghly / Kolkata"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                      Domain of Interest
                    </label>
                    <select
                      value={form.interestArea}
                      onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                      className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                    >
                      <option value="Rural STEM & English Educator">Rural STEM &amp; English Remedial Educator</option>
                      <option value="Medical Camp First Aid & Logistics">Medical Camp First Aid &amp; Logistics</option>
                      <option value="Winter Bedding & Blanket Distribution">Winter Bedding &amp; Blanket Distribution</option>
                      <option value="Women SHG Livelihood Trainer">Women SHG Livelihood Trainer</option>
                      <option value="Photojournalism & Social Media Fellow">Photojournalism &amp; Social Media Fellow</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                      Availability Commitment
                    </label>
                    <select
                      value={form.availability}
                      onChange={(e) => setForm({ ...form, availability: e.target.value })}
                      className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                    >
                      <option value="Weekends (4–6 hours)">Weekends (4–6 hours)</option>
                      <option value="Monthly Medical Drives (Full Day)">Monthly Medical Drives (Full Day)</option>
                      <option value="Virtual Mentorship (2–3 hours/week)">Virtual Mentorship (2–3 hours/week)</option>
                      <option value="Full-Time Seasonal Fellow">Full-Time Seasonal Fellow</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#111827] hover:bg-[#4b41e1] text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Generating Pass...</span>
                    ) : (
                      <>
                        <span>Submit Application &amp; Generate Pass</span>
                        <span className="material-symbols-outlined text-[18px]">badge</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Digital Volunteer Pass Mockup */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-label-caps text-xs text-[#64748B] uppercase font-bold block">
              Digital Identity Pass Preview
            </span>

            {/* Pass Card Container */}
            <div className="bg-[#131b2e] text-white p-6 sm:p-8 rounded-[32px] shadow-2xl relative overflow-hidden border border-white/10">
              
              {/* Top Bar with Seal */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white p-1">
                    <img
                      src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                      alt="TMF Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-headline-md text-sm font-bold text-white">
                      Tribeni Minati Foundation
                    </div>
                    <div className="font-mono text-[10px] text-amber-300">
                      Official Field Identity Pass
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-mono text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Middle Information */}
              <div className="py-6 space-y-4">
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-slate-400 block">
                    Volunteer Name
                  </span>
                  <div className="font-headline-md text-xl font-bold text-white">
                    {form.fullName || 'Verified Youth Fellow'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Designated Role</span>
                    <span className="text-white font-bold truncate block">
                      {form.interestArea}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Jurisdiction</span>
                    <span className="text-white font-bold">
                      {form.city ? `${form.city}, WB` : 'Hooghly, WB'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">Society Reg</span>
                    <span className="text-amber-300 font-bold">{TMF_META.newRegNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">NITI DARPAN</span>
                    <span className="text-amber-300 font-bold">{TMF_META.ngoDarpanId}</span>
                  </div>
                </div>
              </div>

              {/* Bottom QR Code & Authorization */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="material-symbols-outlined text-amber-400 text-3xl">
                    qr_code_2
                  </span>
                  <div className="font-mono text-[9px] text-slate-400">
                    Scan for On-Ground Verification
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[10px] text-slate-400">Authorized by</div>
                  <div className="font-headline-md text-xs font-bold text-white">
                    Rudra Adhya, Secretary
                  </div>
                </div>
              </div>

            </div>

            {/* Field Roles Overview */}
            <div className="bg-white p-6 rounded-3xl border border-border-subtle space-y-3">
              <span className="font-label-caps text-xs uppercase font-bold text-[#191c1e]">
                Volunteer Benefits &amp; Impact
              </span>
              <ul className="space-y-2 text-xs text-[#45464d] font-body-base">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4b41e1] text-[16px]">verified</span>
                  <span>Official Certificate of Voluntary Service for CV &amp; Higher Studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4b41e1] text-[16px]">verified</span>
                  <span>Direct exposure to grassroots socio-economic transformation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4b41e1] text-[16px]">verified</span>
                  <span>Field allowance &amp; meal support during remote camp drives</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
