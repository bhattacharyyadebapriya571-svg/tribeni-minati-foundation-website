import React, { useState } from 'react';
import { TMF_META } from '../data/tmfVerifiedData';
import { Phone, MapPin, Send, CheckCircle2, Building, Mail, ExternalLink } from 'lucide-react';
import { tmfBackend } from '../services/backend';

export const VectorMapContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNo, setTicketNo] = useState<string>('');
  const [selectedHub, setSelectedHub] = useState<'headOffice' | 'branchOffice'>('headOffice');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Volunteer Support',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await tmfBackend.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (res.ticketNumber) setTicketNo(res.ticketNumber);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeOffice = TMF_META.offices[selectedHub];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-slate-50 text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Verified Contact &amp; Field Hubs
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
            Connect with Tribeni Minati Foundation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Reach our administrative secretariat, volunteer coordination leads, or visit our primary office hubs in Mogra and Dhaniakhali.
          </p>
        </div>

        {/* 2-Column Hub Layout: Left Map & Office Cards, Right Contact Form */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          {/* Left Column: Office Hub Selector & Details */}
          <div className="space-y-6">
            {/* Hub Selector Tabs */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <button
                onClick={() => setSelectedHub('headOffice')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedHub === 'headOffice'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Primary Office (Mogra)</span>
              </button>

              <button
                onClick={() => setSelectedHub('branchOffice')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedHub === 'branchOffice'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Branch Office (Dhaniakhali)</span>
              </button>
            </div>

            {/* Office Details Card */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-lg space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedHub === 'headOffice' ? 'Primary Secretariat (Mogra)' : 'Field Branch (Dhaniakhali)'}
                </span>
                <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 mt-2">
                  {activeOffice.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeOffice.address}
                </p>
              </div>

              {/* Verified Hotlines List */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Verified Contact Hotlines:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TMF_META.contacts.helplines.map((phone: string) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:bg-blue-50/50 flex items-center justify-between text-xs text-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-mono">{phone}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 opacity-40" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Email Touchpoints */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Official Email Desks:
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {TMF_META.contacts.emails.map((em: string) => (
                    <a
                      key={em}
                      href={`mailto:${em}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-700 font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>{em}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900">
                  Message Dispatched Successfully!
                </h3>
                {ticketNo && (
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                    Official Ticket: {ticketNo}
                  </div>
                )}
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your message has been logged in the Secretariat Desk. Our coordination team will respond within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 mb-1">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-slate-500">
                    Reach our secretariat for donations, volunteer queries, or field visits.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9143430927"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                  >
                    <option>General Inquiry / Volunteer Support</option>
                    <option>Minati Free Education Coaching Centers</option>
                    <option>Winter Bedding &amp; Infant Care Sponsorship</option>
                    <option>CSR Schedule VII Corporate Mandate</option>
                    <option>Media, Press &amp; Documentary Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message to Secretariat'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
