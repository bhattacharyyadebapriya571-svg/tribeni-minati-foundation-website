import React, { useState } from 'react';
import { VOLUNTEER_ROLES } from '../data/foundationData';
import { tmfBackend } from '../services/backend';
import { ArrowLeft, HeartHandshake, CheckCircle2, Send, Award, Clock, MapPin } from 'lucide-react';
import { GetInvolved } from '../components/GetInvolved';
import { CSR } from '../components/CSR';
import { ImpactCalculator } from '../components/ImpactCalculator';
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

    try {
      const res = await tmfBackend.submitVolunteer({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        location: `${form.city}, ${form.state}`,
        role: form.interestArea,
        availabilityHours: 6,
        statement: form.experienceNotes,
      });
      if (res.referenceNumber) setRegisteredRef(res.referenceNumber);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Flagship Overview
        </button>

        {/* Page Hero */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
            Mobilizing Youth & Changemakers
          </div>
          <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
            Join the Minati Volunteer Fellowship & CSR Network
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Whether you are a university student teaching at our weekend coaching centers, a medical intern running diagnostic camps, or a corporate partner fulfilling CSR Schedule VII mandates — your passion creates lasting generational change.
          </p>
        </div>

        {/* 2-Column: Volunteer Form & Opportunities */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start mb-20">
          {/* Left Form */}
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900">
                  Welcome to the Movement, {form.fullName}!
                </h3>
                {registeredRef && (
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                    Official Reference: {registeredRef}
                  </div>
                )}
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your volunteer profile has been recorded in the Tribeni Minati Foundation Secretariat database. Our field coordinator will contact you via WhatsApp / Phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 mb-1">
                    Apply for Volunteer Fellowship
                  </h3>
                  <p className="text-xs text-slate-500">
                    Receive verified certificate of social service & field impact experience.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Hooghly / Kolkata"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Role *
                    </label>
                    <select
                      value={form.interestArea}
                      onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                    >
                      <option>Minati Free Education Teacher (Class I–X)</option>
                      <option>Winter Bedding & Relief Coordinator</option>
                      <option>Medical & Blood Camp Volunteer</option>
                      <option>Women Tailoring Trainer</option>
                      <option>Digital Media & Photography Fellow</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Availability *
                  </label>
                  <select
                    value={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                  >
                    <option>Weekends (4–6 hours)</option>
                    <option>Weekday Evenings (Wed/Thu/Fri 4:30–6:30 PM)</option>
                    <option>Full-time Campaign Fellow (1–3 Months)</option>
                    <option>On-Call Emergency Flood Relief</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Experience / Why you want to join (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.experienceNotes}
                    onChange={(e) => setForm({ ...form, experienceNotes: e.target.value })}
                    placeholder="Tell us about your background or why grassroots social welfare inspires you..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Active Volunteer Roles */}
          <div className="space-y-4">
            <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900">
              Active Field Opportunities
            </h3>

            {VOLUNTEER_ROLES.map((role) => (
              <div
                key={role.title}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-['DM_Serif_Display'] text-xl text-slate-900 mt-1">
                      {role.title}
                    </h4>
                  </div>
                  <Award className="w-5 h-5 text-amber-600 shrink-0" />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {role.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {role.commitment}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {role.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Tab Get Involved Hub */}
        <GetInvolved
          onOpenDonate={(amt, cause) => onOpenDonate && onOpenDonate(amt, cause)}
          onOpenPartner={() => onOpenPartner && onOpenPartner()}
        />

        {/* Corporate CSR Mandates */}
        <div className="mt-16">
          <CSR onOpenPartner={() => onOpenPartner && onOpenPartner()} />
        </div>

        {/* 80G Tax Exemption & Impact Calculator */}
        <div className="mt-16">
          <ImpactCalculator onDonateAmount={(amt) => onOpenDonate && onOpenDonate(amt, 'Impact Calculator')} />
        </div>
      </div>
    </div>
  );
};
