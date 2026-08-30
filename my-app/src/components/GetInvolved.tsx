import React, { useState } from 'react';
import { HeartHandshake, Heart, Building2, GraduationCap, CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react';
import { VOLUNTEER_ROLES, FOUNDATION_META } from '../data/foundationData';

interface GetInvolvedProps {
  onOpenDonate: (presetAmount?: number, cause?: string) => void;
  onOpenPartner: () => void;
}

export const GetInvolved: React.FC<GetInvolvedProps> = ({ onOpenDonate, onOpenPartner }) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'sponsor' | 'corporate' | 'campus'>('volunteer');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: 'Rural STEM & English Educator',
    message: '',
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSubmitted(true);
  };

  const tabs = [
    { id: 'volunteer', label: 'Volunteer With Us', icon: HeartHandshake },
    { id: 'sponsor', label: 'Monthly Sponsorship', icon: Heart },
    { id: 'corporate', label: 'Corporate CSR Giving', icon: Building2 },
    { id: 'campus', label: 'Youth / Campus Ambassador', icon: GraduationCap },
  ] as const;

  return (
    <section id="get-involved" className="py-24 sm:py-32 bg-[#F2F7F4] relative border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#4E8B65] bg-[#4E8B65]/10 border border-[#4E8B65]/20 mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            Join The Movement
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#0F1F16] leading-tight tracking-tight mb-4">
            How You Can Get Involved Today
          </h2>
          <p className="text-base text-[#5A6B62] leading-relaxed">
            Whether as an individual donor, a weekend volunteer educator, a campus ambassador, or a Fortune 500 CSR partner — your action creates immediate, verifiable impact on the ground.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C3D2F] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-black/[0.05]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#A3D9B5]' : 'text-[#4E8B65]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Volunteer */}
        {activeTab === 'volunteer' && (
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.07] shadow-lg shadow-[#1C3D2F]/5">
            <div>
              <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-[#0F1F16] mb-3">
                Volunteer Your Skills for Grassroots Change
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B62] leading-relaxed mb-6">
                Join our roster of over 850 active professionals, doctors, teachers, and university students dedicating their weekends to empower rural India.
              </p>

              <div className="space-y-3 mb-6">
                {VOLUNTEER_ROLES.map((role) => (
                  <div
                    key={role.title}
                    className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-black/[0.04] text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-[#1C3D2F]">
                      <span>{role.title}</span>
                      <span className="text-[10px] text-[#4E8B65] font-normal">{role.commitment}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{role.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer Form */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 sm:p-8 border border-black/[0.06]">
              {volunteerSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#4E8B65]/15 flex items-center justify-center mx-auto text-[#4E8B65]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-['DM_Serif_Display'] text-2xl text-[#0F1F16]">
                    Application Submitted!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Thank you, <strong>{volunteerForm.name}</strong>. Our volunteer coordination lead will reach out to you within 48 hours for orientation.
                  </p>
                  <button
                    onClick={() => setVolunteerSubmitted(false)}
                    className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#1C3D2F] text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-[#0F1F16] mb-2">
                    Volunteer Application Form
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-[#4E8B65]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-[#4E8B65]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-[#4E8B65]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">City / State *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kolkata / Bhubaneswar"
                        value={volunteerForm.city}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-[#4E8B65]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Preferred Volunteer Role</label>
                    <select
                      value={volunteerForm.role}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-[#4E8B65]"
                    >
                      <option>Rural STEM & English Educator</option>
                      <option>Medical Camp Doctor / Nurse Volunteer</option>
                      <option>Agri-Tech & Organic Farming Mentor</option>
                      <option>Digital Storyteller & Content Creator</option>
                      <option>Disaster Relief Emergency Volunteer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Brief Background / Why you want to join</label>
                    <textarea
                      rows={2}
                      placeholder="Share your skills, availability, or previous NGO volunteer experience..."
                      value={volunteerForm.message}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-[#4E8B65]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1C3D2F] text-white font-bold hover:bg-[#142D1C] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Volunteer Application
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: Monthly Sponsorship */}
        {activeTab === 'sponsor' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-lg text-center max-w-3xl mx-auto space-y-8">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#4E8B65]/15 flex items-center justify-center mx-auto text-[#1C3D2F] mb-3">
                <Heart className="w-7 h-7 fill-[#4E8B65]/20 text-[#4E8B65]" />
              </div>
              <h3 className="font-['DM_Serif_Display'] text-3xl text-[#0F1F16]">
                Sponsor a Child or Family Monthly
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B62] mt-2 max-w-lg mx-auto leading-relaxed">
                Small monthly contributions create predictable, life-long transformation. Sponsor an underprivileged child's education, rural healthcare, or farmer cold storage.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] flex flex-col justify-between">
                <div>
                  <div className="font-bold text-sm text-[#1C3D2F] mb-1">Child Education</div>
                  <div className="text-xs text-gray-500 mb-3">Tuition, midday meals, STEM kit & books.</div>
                  <div className="text-xl font-bold font-mono text-[#4E8B65] mb-4">₹1,200 <span className="text-xs font-sans text-gray-400">/mo</span></div>
                </div>
                <button
                  onClick={() => onOpenDonate(1200, 'Mission Education — Monthly Child Sponsorship')}
                  className="w-full py-2 text-xs font-bold rounded-xl bg-[#1C3D2F] text-white hover:bg-[#142D1C] cursor-pointer"
                >
                  Sponsor ₹1,200/mo
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#F2F7F4] border border-[#4E8B65]/30 flex flex-col justify-between relative shadow-sm">
                <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#4E8B65] text-white text-[9px] font-bold uppercase">
                  Most Popular
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1C3D2F] mb-1">Mobile Clinic Fuel</div>
                  <div className="text-xs text-gray-500 mb-3">Sponsors 1 emergency ALS ambulance run & medicines.</div>
                  <div className="text-xl font-bold font-mono text-[#1C3D2F] mb-4">₹1,500 <span className="text-xs font-sans text-gray-400">/mo</span></div>
                </div>
                <button
                  onClick={() => onOpenDonate(1500, 'Project HELP!! — Monthly Mobile Ambulance Fuel')}
                  className="w-full py-2 text-xs font-bold rounded-xl bg-[#4E8B65] text-white hover:bg-[#3D6B4F] cursor-pointer"
                >
                  Sponsor ₹1,500/mo
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] flex flex-col justify-between">
                <div>
                  <div className="font-bold text-sm text-[#1C3D2F] mb-1">Village Crèche & Livelihood</div>
                  <div className="text-xs text-gray-500 mb-3">Safe crèche care for toddler while mother earns.</div>
                  <div className="text-xl font-bold font-mono text-[#4E8B65] mb-4">₹2,000 <span className="text-xs font-sans text-gray-400">/mo</span></div>
                </div>
                <button
                  onClick={() => onOpenDonate(2000, 'Swabhiman — Monthly Village Crèche & Livelihood')}
                  className="w-full py-2 text-xs font-bold rounded-xl bg-[#1C3D2F] text-white hover:bg-[#142D1C] cursor-pointer"
                >
                  Sponsor ₹2,000/mo
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4E8B65]" />
              Monthly automated Section 80G digital receipts & child progress report cards sent to your email.
            </div>
          </div>
        )}

        {/* Tab Content 3: Corporate CSR */}
        {activeTab === 'corporate' && (
          <div className="bg-[#0C1A11] text-white rounded-3xl p-8 sm:p-12 border border-[#4E8B65]/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A3D9B5] px-3 py-1 rounded-full bg-[#4E8B65]/20 border border-[#4E8B65]/30 inline-block mb-3">
                Section 135 & Schedule VII
              </span>
              <h3 className="font-['DM_Serif_Display'] text-3xl text-white mb-3">
                Strategic Corporate CSR Partnerships
              </h3>
              <p className="text-xs sm:text-sm text-[#7A9E85] leading-relaxed mb-6">
                Align your CSR mandate with audited, MCA-compliant programs in healthcare, education, sustainable agribusiness, and women empowerment. Big Four audit alignment and quarterly ESG dashboards included.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-[#D4E8DA]">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white">MCA CSR-1 Registered</div>
                  <div className="text-[10px] text-gray-400">Code: CSR00098765</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white">Dedicated CSR Cell</div>
                  <div className="text-[10px] text-gray-400">24h Project Proposal SLA</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={onOpenPartner}
                className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#4E8B65] text-white hover:bg-[#3D6B4F] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit CSR RFP / Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`mailto:${FOUNDATION_META.csrEmail}?subject=Request CSR Deck`}
                className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-center transition-colors"
              >
                Email CSR Secretariat
              </a>
            </div>
          </div>
        )}

        {/* Tab Content 4: Campus Ambassador */}
        {activeTab === 'campus' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-lg max-w-3xl mx-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#4E8B65]/15 flex items-center justify-center mx-auto text-[#1C3D2F]">
              <GraduationCap className="w-7 h-7 text-[#4E8B65]" />
            </div>
            <h3 className="font-['DM_Serif_Display'] text-3xl text-[#0F1F16]">
              Youth & Campus Ambassador Network
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6B62] leading-relaxed max-w-lg mx-auto">
              Lead donation drives, digital literacy workshops, and blood donation camps in your college or university. Receive certified leadership credentials and letter of recommendation.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 text-left text-xs">
              <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.04]">
                <div className="font-bold text-[#1C3D2F] mb-1">Campus Awareness</div>
                <div className="text-gray-500">Organize hygiene & rural education awareness drives.</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.04]">
                <div className="font-bold text-[#1C3D2F] mb-1">Internship Credits</div>
                <div className="text-gray-500">Earn recognized social internship certificates.</div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.04]">
                <div className="font-bold text-[#1C3D2F] mb-1">Field Exposure</div>
                <div className="text-gray-500">Join our mobile clinics on rural village visits.</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('volunteer')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#1C3D2F] text-white hover:bg-[#142D1C] cursor-pointer"
            >
              Apply as Campus Ambassador
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
