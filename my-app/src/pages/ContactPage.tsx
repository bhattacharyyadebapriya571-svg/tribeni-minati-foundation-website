import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { VectorMapContact } from '../components/VectorMapContact';
import { FAQ } from '../components/FAQ';
import type { PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ firstName: '', lastName: '', email: '', inquiryType: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 bg-[#f7f9fb] text-[#191c1e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {/* Stitch Initiate Contact Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Stitch Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-[#4b41e1] bg-indigo-50 border border-indigo-100">
                <MapPin className="w-3.5 h-3.5" />
                Secretariat &amp; Direct Channel
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-extrabold text-[#191c1e] tracking-tight">
                Initiate Contact.
              </h1>
              <p className="font-['Inter'] text-sm sm:text-base text-[#45464d] max-w-lg leading-relaxed">
                For corporate CSR partnerships, statutory inquiries, or programmatic support, please use the secure channel below.
              </p>
            </div>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg">
                    Message Transmitted Successfully
                  </h3>
                </div>
                <p className="font-['Inter'] text-sm text-emerald-800 leading-relaxed">
                  Thank you. General Secretary Rudra Adhya's office will review your inquiry and respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-mono text-xs font-bold text-[#64748B] uppercase">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Debapriya"
                      className="w-full bg-white text-[#191c1e] font-['Inter'] text-sm px-5 py-3.5 rounded-xl border border-border-subtle focus:border-[#4b41e1] focus:ring-2 focus:ring-[#4b41e1]/20 outline-none transition-all shadow-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-xs font-bold text-[#64748B] uppercase">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Bhattacharyya"
                      className="w-full bg-white text-[#191c1e] font-['Inter'] text-sm px-5 py-3.5 rounded-xl border border-border-subtle focus:border-[#4b41e1] focus:ring-2 focus:ring-[#4b41e1]/20 outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#64748B] uppercase">Corporate / Personal Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. contact@corporate.org"
                    className="w-full bg-white text-[#191c1e] font-['Inter'] text-sm px-5 py-3.5 rounded-xl border border-border-subtle focus:border-[#4b41e1] focus:ring-2 focus:ring-[#4b41e1]/20 outline-none transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#64748B] uppercase">Nature of Inquiry</label>
                  <select
                    required
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-white text-[#191c1e] font-['Inter'] text-sm px-5 py-3.5 rounded-xl border border-border-subtle focus:border-[#4b41e1] focus:ring-2 focus:ring-[#4b41e1]/20 outline-none transition-all shadow-xs cursor-pointer"
                  >
                    <option value="" disabled>Select Nature of Inquiry</option>
                    <option value="csr">CSR Partnership &amp; Grants</option>
                    <option value="80g">80G Tax Exemption &amp; Receipts</option>
                    <option value="statutory">Statutory &amp; Compliance Audit</option>
                    <option value="program">Education &amp; Winter Relief Operations</option>
                    <option value="volunteer">Volunteer Enrollment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#64748B] uppercase">Message Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your requirements, grant proposal, or inquiry..."
                    className="w-full bg-white text-[#191c1e] font-['Inter'] text-sm px-5 py-3.5 rounded-xl border border-border-subtle focus:border-[#4b41e1] focus:ring-2 focus:ring-[#4b41e1]/20 outline-none transition-all resize-none shadow-xs"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#111827] hover:bg-[#1f2937] text-white font-['Plus_Jakarta_Sans'] font-extrabold text-sm rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>Transmit Message</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            )}
          </div>

          {/* Right Column: Stitch Location Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Corporate HQ */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-6 sm:p-7 bg-white space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#4b41e1]">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-extrabold text-[#191c1e]">
                      Corporate Headquarters
                    </h3>
                    <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">
                      Tribeni, Hooghly
                    </p>
                  </div>
                </div>

                <div className="space-y-2 font-['Inter'] text-xs text-[#45464d] leading-relaxed pt-2 border-t border-slate-100">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#4b41e1] shrink-0 mt-0.5" />
                    <span>Kanthaltala (near water tank), Tribeni-Mogra Road, PO Tribeni, Dist Hooghly - 712503</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono font-bold text-[#191c1e]">+91 9143430927</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#4b41e1] shrink-0" />
                    <span className="font-mono text-[#4b41e1]">tribeniminatifoundation@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Branch */}
            <div className="double-bezel-outer group hover:shadow-xl transition-all duration-500">
              <div className="double-bezel-inner p-6 sm:p-7 bg-white space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#F59E0B]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-extrabold text-[#191c1e]">
                      Regional Branch Office
                    </h3>
                    <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">
                      Radhanagar, Dhaniakhali
                    </p>
                  </div>
                </div>

                <div className="space-y-2 font-['Inter'] text-xs text-[#45464d] leading-relaxed pt-2 border-t border-slate-100">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Radhanagar, PO Gopinagar, PS Dhaniakhali, Dist Hooghly - 712402</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono font-bold text-[#191c1e]">+91 9832274345</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="p-5 rounded-2xl bg-white border border-border-subtle shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563eb]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#191c1e]">
                  Secretariat Operating Hours
                </div>
                <div className="font-mono text-[11px] text-[#64748B]">
                  Monday – Saturday (10:00 AM – 07:00 PM IST)
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Embedded Vector Map & Office Selector */}
      <VectorMapContact />

      {/* Embedded FAQ */}
      <div className="mt-12">
        <FAQ />
      </div>
    </div>
  );
};
