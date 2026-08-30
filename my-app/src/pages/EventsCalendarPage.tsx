import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { TMF_META } from '../data/tmfVerifiedData';
import type { PageId } from '../types';

interface EventsCalendarProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: (amount?: number, cause?: string) => void;
}

interface CampEvent {
  id: string;
  title: string;
  bengaliTitle: string;
  category: 'Healthcare' | 'Education' | 'Relief' | 'Women SHG' | 'Blood Donation';
  date: string;
  time: string;
  location: string;
  district: string;
  leadPartner: string;
  expectedBeneficiaries: string;
  description: string;
  status: 'Upcoming' | 'Registration Open' | 'Completed';
  rsvpLink?: string;
}

const UPCOMING_CAMPS: CampEvent[] = [
  {
    id: 'camp-2026-0901',
    title: 'Free Pediatric & Eye Screening Camp',
    bengaliTitle: 'বিনামূল্যে শিশু স্বাস্থ্য ও চক্ষু পরীক্ষা শিবির',
    category: 'Healthcare',
    date: '15 September 2026',
    time: '09:30 AM - 03:30 PM',
    location: 'Minati Education Hub, Netaji Subhash Pally, Mogra',
    district: 'Hooghly, West Bengal',
    leadPartner: 'Tribeni Minati Foundation & Local Medical Volunteers',
    expectedBeneficiaries: '350+ Children & Mothers',
    description: 'General pediatric diagnostics, free cataract screening for elderly villagers, prescription medicine and eye drops distribution.',
    status: 'Registration Open'
  },
  {
    id: 'camp-2026-0920',
    title: 'Mega Voluntary Blood Donation Drive',
    bengaliTitle: 'মহতী স্বেচ্ছা রক্তদান শিবির',
    category: 'Blood Donation',
    date: '28 September 2026',
    time: '08:30 AM - 02:00 PM',
    location: 'Jotkamal Juba Sangha Ground, Mogra/Tribeni',
    district: 'Hooghly, West Bengal',
    leadPartner: 'State Blood Transfusion Council & TMF Youth Wing',
    expectedBeneficiaries: '150+ Blood Units Target',
    description: 'Organized in collaboration with government hospital blood bank to address seasonal emergency blood shortages.',
    status: 'Registration Open'
  },
  {
    id: 'camp-2026-1015',
    title: 'Annual Minati Free Education Textbook & Uniform Drive',
    bengaliTitle: 'মিনতি শিক্ষা নিকেতন বার্ষিক পাঠ্যবই ও পোশাক বিতরণ',
    category: 'Education',
    date: '10 October 2026',
    time: '11:00 AM - 04:00 PM',
    location: 'Minati Coaching Center, Mogra',
    district: 'Hooghly, West Bengal',
    leadPartner: 'Tribeni Minati Foundation Trustee Board',
    expectedBeneficiaries: '450+ Rural Students (Class I-X)',
    description: 'Annual distribution of government-syllabus curriculum books, notebooks, school bags, and geometry boxes to underprivileged students.',
    status: 'Upcoming'
  },
  {
    id: 'camp-2026-1110',
    title: 'Destitute Newborn & Maternal Winter Bedding Shield',
    bengaliTitle: 'নবজাতক ও গ্রামীণ মায়েদের শীতবস্ত্র ও শিশু বেডিং বিতরণ',
    category: 'Relief',
    date: '12 November 2026',
    time: '10:00 AM - 03:00 PM',
    location: 'Khanpur & Rural Hamlets, Dhaniakhali Block',
    district: 'Hooghly, West Bengal',
    leadPartner: 'TMF Field Relief Unit & ASHA Workers',
    expectedBeneficiaries: '600+ Infants & Mothers',
    description: 'High-density insulated baby mattress kits, mosquito nets, thermal wraps, and maternal nutritional supplements for cold-wave protection.',
    status: 'Upcoming'
  },
  {
    id: 'camp-2026-1205',
    title: 'Nari Shakti Tailoring Vocational Graduation & Machine Grants',
    bengaliTitle: 'নারী শক্তি সেলাই প্রশিক্ষণ সমাবর্তন ও মেশিন অনুদান',
    category: 'Women SHG',
    date: '05 December 2026',
    time: '10:30 AM - 02:30 PM',
    location: 'TMF Skill Training Annex, Mogra',
    district: 'Hooghly, West Bengal',
    leadPartner: 'Tribeni Minati Foundation & Micro-Enterprise Linkages',
    expectedBeneficiaries: '40 Certified Rural Women',
    description: 'Awarding certified skill completion diplomas and providing motorized sewing machines to enable home-based livelihood micro-enterprises.',
    status: 'Upcoming'
  }
];

export const EventsCalendarPage: React.FC<EventsCalendarProps> = ({
  onNavigate,
  onOpenDonate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rsvpCampTitle, setRsvpCampTitle] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');

  const filteredCamps = UPCOMING_CAMPS.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName && rsvpPhone) {
      setRsvpSuccess(true);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5] text-slate-900">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-700 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-bold">Upcoming Welfare Camps &amp; Events</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111A15] text-white relative overflow-hidden shadow-2xl mb-12 border border-white/10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 mb-4 font-mono">
              <Calendar className="w-4 h-4 text-amber-400" />
              Live Field Deployment Schedule
            </div>
            <h1 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-white leading-tight">
              Welfare Camps &amp; Community Events
            </h1>
            <p className="text-sm sm:text-base text-white/75 mt-3 leading-relaxed">
              Explore our scheduled free medical camps, blood donation drives, textbook distributions, and winter infant relief operations across West Bengal.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['All', 'Healthcare', 'Blood Donation', 'Education', 'Relief', 'Women SHG'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1B3B2B] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <a
            href={`tel:${TMF_META.contacts.helplines[0]}`}
            className="inline-flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Field Camp Hotline: {TMF_META.contacts.helplines[0]}</span>
          </a>
        </div>

        {/* Camps Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCamps.map((camp) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-black/[0.02] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                    {camp.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      camp.status === 'Registration Open'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {camp.status}
                  </span>
                </div>

                <h3 className="font-['DM_Serif_Display'] text-xl text-slate-900 leading-snug">
                  {camp.title}
                </h3>
                <div className="text-xs text-emerald-800 font-['Hind_Siliguri'] font-semibold mt-1">
                  {camp.bengaliTitle}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {camp.description}
                </p>

                <div className="mt-6 space-y-2 text-xs text-slate-700 bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <strong>Date: {camp.date}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Time: {camp.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{camp.location} ({camp.district})</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-slate-600">
                    <Users className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Expected Reach: <strong>{camp.expectedBeneficiaries}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setRsvpCampTitle(camp.title);
                    setRsvpSuccess(false);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Register / RSVP as Volunteer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenDonate(5000, `Sponsor Camp: ${camp.title}`)}
                  className="py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                  <span>Sponsor (₹5,000)</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RSVP Modal */}
        {rsvpCampTitle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <h3 className="font-['DM_Serif_Display'] text-xl text-slate-900">
                Register for Camp / Event
              </h3>
              <p className="text-xs text-emerald-800 font-semibold mt-1">
                {rsvpCampTitle}
              </p>

              {rsvpSuccess ? (
                <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-900">Registration Confirmed!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Thank you {rsvpName}! Our field coordinator will contact you at {rsvpPhone} with schedule details.
                  </p>
                  <button
                    onClick={() => setRsvpCampTitle(null)}
                    className="mt-4 px-6 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Sourav Mukherjee"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="+91 9143430927"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRsvpCampTitle(null)}
                      className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-white font-bold cursor-pointer"
                    >
                      Confirm Registration
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
