import React, { useState } from 'react';
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
    expectedBeneficiaries: '100+ Units Target',
    description: 'Annual life-saving voluntary blood donation camp in association with local youth clubs and district blood bank.',
    status: 'Registration Open'
  },
  {
    id: 'camp-2026-1010',
    title: 'Pre-Winter Infant Bedding & Nutrition Drive',
    bengaliTitle: 'শীতবস্ত্র ও শিশু পুষ্টি বিতরণ অভিযান',
    category: 'Relief',
    date: '10 October 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'Radhanagar Primary School Compound, Dhaniakhali',
    district: 'Hooghly, West Bengal',
    leadPartner: 'Tribeni Minati Foundation Central Relief Cell',
    expectedBeneficiaries: '600+ Infants & Toddlers',
    description: 'Distribution of thermal sleeping bedding, baby blankets, baby food kits, and mother counseling sessions.',
    status: 'Upcoming'
  },
  {
    id: 'camp-2026-1025',
    title: 'Women SHG Handicraft & Micro-Livelihood Workshop',
    bengaliTitle: 'মহিলা স্বনির্ভর হস্তশিল্প ও জীবিকা প্রশিক্ষণ কর্মশালা',
    category: 'Women SHG',
    date: '25 October 2026',
    time: '11:00 AM - 03:00 PM',
    location: 'Tribeni Women Empowerment Hub, Kanthaltala',
    district: 'Hooghly, West Bengal',
    leadPartner: 'TMF Women Self-Reliance Cell',
    expectedBeneficiaries: '85 Rural Women',
    description: 'Vocational training on jute handicraft production, packaging, and digital marketplace access for sustainable income.',
    status: 'Upcoming'
  },
  {
    id: 'camp-2026-1114',
    title: 'Children Day Remedial Learning & Book Kit Mela',
    bengaliTitle: 'শিশু দিবস শিক্ষা ও শিক্ষা উপকরণ মেলা',
    category: 'Education',
    date: '14 November 2026',
    time: '09:00 AM - 01:00 PM',
    location: 'Tribeni Central Remedial Coaching Center',
    district: 'Hooghly, West Bengal',
    leadPartner: 'Minati Shiksha Abhiyan Volunteer Teachers',
    expectedBeneficiaries: '450+ Rural Students',
    description: 'Distribution of school bags, notebooks, geometry boxes, and interactive science exhibition by students.',
    status: 'Upcoming'
  }
];

export const EventsCalendarPage: React.FC<EventsCalendarProps> = ({ onNavigate, onOpenDonate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rsvpCampId, setRsvpCampId] = useState<string | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  const categories = ['All', 'Healthcare', 'Education', 'Relief', 'Blood Donation', 'Women SHG'];

  const filteredCamps = selectedCategory === 'All'
    ? UPCOMING_CAMPS
    : UPCOMING_CAMPS.filter(c => c.category === selectedCategory);

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Hero Header */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-12 flex flex-col lg:flex-row justify-between items-end gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Field Schedule &amp; Medical Camps</span>
          </div>

          <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight leading-tight">
            Grassroots Camps &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
              Relief Expeditions
            </span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#45464d] leading-relaxed">
            Direct on-ground humanitarian drives across Hooghly and Bengal hamlets. Participate as a medical volunteer, donor sponsor, or field coordinator.
          </p>
        </div>

        {/* Quick Action Box */}
        <div className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm flex flex-col gap-3 w-full lg:w-80">
          <span className="font-label-caps text-xs text-[#64748B] uppercase font-bold">Coordination Desk</span>
          <div className="font-headline-md text-lg font-bold text-[#191c1e]">Rudra Adhya</div>
          <div className="font-mono text-xs text-[#4b41e1] font-bold">
            <a href={`tel:${TMF_META.contacts.secretary}`} className="hover:underline">
              {TMF_META.contacts.secretary}
            </a>
          </div>
          <button
            onClick={() => onNavigate('volunteer')}
            className="w-full py-2.5 bg-[#111827] text-white rounded-xl font-label-caps text-xs font-bold hover:bg-[#4b41e1] transition-colors cursor-pointer mt-1"
          >
            Apply for Field Pass
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#111827] text-white shadow-md'
                  : 'bg-white text-[#45464d] border border-border-subtle hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? 'All Drives & Camps' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Camps List */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-24">
        <div className="space-y-6">
          {filteredCamps.map((camp) => (
            <div
              key={camp.id}
              className="bg-[#f2f4f6] p-2 sm:p-3 rounded-[28px] shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
                
                {/* Left: Date Badge + Title + Location */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
                  
                  {/* Date Capsule */}
                  <div className="w-24 h-24 rounded-2xl bg-indigo-50 text-[#4b41e1] flex flex-col items-center justify-center shrink-0 border border-indigo-100 p-2 text-center">
                    <span className="font-stat-lg text-2xl font-black leading-none">
                      {camp.date.split(' ')[0]}
                    </span>
                    <span className="font-label-caps text-[11px] uppercase font-bold text-[#4b41e1] mt-1">
                      {camp.date.split(' ')[1]}
                    </span>
                    <span className="font-mono text-[9px] text-[#64748B]">
                      {camp.date.split(' ')[2]}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-[#f2f4f6] text-[#191c1e] rounded-full text-[11px] font-bold font-label-caps uppercase">
                        {camp.category}
                      </span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold font-label-caps uppercase">
                        {camp.status}
                      </span>
                    </div>

                    <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-[#191c1e]">
                      {camp.title}
                    </h3>

                    <p className="text-xs font-semibold text-[#64748B]">
                      {camp.bengaliTitle}
                    </p>

                    <p className="font-body-base text-sm text-[#45464d] max-w-2xl leading-relaxed pt-1">
                      {camp.description}
                    </p>

                    {/* Metadata strip */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] pt-2">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#4b41e1]">schedule</span>
                        <span>{camp.time}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#4b41e1]">location_on</span>
                        <span>{camp.location}, {camp.district}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#4b41e1]">groups</span>
                        <span>{camp.expectedBeneficiaries}</span>
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0">
                  <button
                    onClick={() => {
                      setRsvpCampId(camp.id);
                      setRsvpSubmitted(false);
                    }}
                    className="w-full py-3.5 bg-[#111827] hover:bg-[#4b41e1] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>Join as Volunteer</span>
                  </button>

                  <button
                    onClick={() => onOpenDonate(5000, `Sponsor Drive: ${camp.title}`)}
                    className="w-full py-3.5 bg-[#F59E0B] text-[#111827] font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    <span>Sponsor Drive</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer RSVP Modal */}
      {rsvpCampId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setRsvpCampId(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#191c1e] hover:bg-slate-200 cursor-pointer"
            >
              ✕
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-[#191c1e]">Registration Confirmed</h3>
                <p className="font-body-base text-sm text-[#45464d]">
                  Thank you! Our camp coordinator will contact you via WhatsApp / Phone before the drive.
                </p>
                <button
                  onClick={() => setRsvpCampId(null)}
                  className="px-6 py-2.5 bg-[#111827] text-white font-bold rounded-xl text-xs uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="inline-block px-3 py-1 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold">
                  Camp Registration
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-[#191c1e]">
                  Register for Field Drive
                </h3>
                <p className="font-body-base text-xs text-[#64748B]">
                  Join us on the ground and earn verified foundation service hours.
                </p>

                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Mobile Number"
                  className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                />
                <select
                  required
                  className="w-full bg-[#f2f4f6] px-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                >
                  <option value="">Select Volunteer Role</option>
                  <option value="medical">Medical / First Aid Support</option>
                  <option value="crowd">Crowd &amp; Queue Management</option>
                  <option value="distribution">Kit &amp; Relief Distribution</option>
                  <option value="photography">Photojournalism &amp; Media</option>
                </select>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#111827] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#4b41e1] transition-colors cursor-pointer"
                >
                  Submit Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
