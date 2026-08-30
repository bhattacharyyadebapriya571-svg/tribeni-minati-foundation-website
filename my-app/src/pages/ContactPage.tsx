import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { VectorMapContact } from '../components/VectorMapContact';
import { FAQ } from '../components/FAQ';
import { TMF_META } from '../data/tmfVerifiedData';
import type { PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="min-h-screen pt-36 sm:pt-44 pb-24 bg-[#F8FAFC] text-slate-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-12">
        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Secretariat & Touchpoints
          </div>
          <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-6xl text-slate-900 leading-tight tracking-tight">
            Contact & Field Office Hubs
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Reach out to our administrative secretariat for donor support, 80G tax receipt inquiries, corporate CSR partnership proposals, or volunteer drive enrollments.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Secretary Desk:</span>
              </div>
              <div className="font-mono text-xs font-bold text-slate-900 mt-1">
                {TMF_META.contacts.secretary}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>Primary Email:</span>
              </div>
              <div className="font-mono text-xs font-bold text-blue-700 mt-1 truncate">
                {TMF_META.primaryEmail}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>Office Timings:</span>
              </div>
              <div className="font-mono text-xs font-bold text-slate-800 mt-1">
                Mon–Sat (10 AM – 7 PM)
              </div>
            </div>
          </div>
        </motion.div>
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
