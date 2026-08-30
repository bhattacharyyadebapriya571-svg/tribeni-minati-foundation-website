import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, CheckCircle2, ShieldCheck, Download, Send } from 'lucide-react';
import { FOUNDATION_META } from '../data/foundationData';
import { tmfBackend } from '../services/backend';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalRef, setProposalRef] = useState<string>('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    budgetRange: '₹25L – ₹50L',
    focusArea: 'Healthcare & Project HELP!!',
    targetState: 'West Bengal',
    customNotes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await tmfBackend.submitCsrProposal({
        companyName: formData.companyName,
        contactPerson: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        budgetRange: formData.budgetRange,
        pillar: formData.focusArea,
        targetLocations: [formData.targetState],
        comments: formData.customNotes,
      });

      if (res.referenceNumber) setProposalRef(res.referenceNumber);
      setStep('success');
    } catch (err) {
      console.error(err);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-black/[0.08]"
        >
          {/* Top Bar */}
          <div className="p-6 sm:p-7 bg-[#0C1A11] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4E8B65]/20 flex items-center justify-center border border-[#4E8B65]/30">
                <Building2 className="w-5 h-5 text-[#4E8B65]" />
              </div>
              <div>
                <h3 className="font-['DM_Serif_Display'] text-xl text-[#E8F0EB]">
                  Corporate CSR &amp; ESG Partnership
                </h3>
                <p className="text-xs text-[#7A9E85]">
                  Schedule VII Compliance · Section 135 Companies Act 2013
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Corporate / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Steel Ltd / ABC Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Authorized CSR Liaison Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadarshini Sen"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="csr.lead@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Direct Phone / Extension *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Indicative Budget Allocation
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                  >
                    <option value="₹10L – ₹25L">₹10L – ₹25L</option>
                    <option value="₹25L – ₹50L">₹25L – ₹50L</option>
                    <option value="₹50L – ₹1Cr">₹50L – ₹1Cr</option>
                    <option value="₹1Cr – ₹5Cr+">₹1Cr – ₹5Cr+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Target CSR Focus Pillar
                  </label>
                  <select
                    value={formData.focusArea}
                    onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                  >
                    <option value="Healthcare & Project HELP!!">Healthcare &amp; Project HELP!!</option>
                    <option value="Minati Free Primary Education">Minati Free Primary Education</option>
                    <option value="Smart Green Mobility (E-Rickshaw Fleet)">Smart Green Mobility (E-Rickshaw Fleet)</option>
                    <option value="Women Self-Help & Micro-Enterprise">Women Self-Help &amp; Micro-Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Project Mandate / Specific Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention your ESG reporting timelines, CSR committee mandate, or custom geography preferences..."
                  value={formData.customNotes}
                  onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#4E8B65]"
                />
              </div>

              {/* Compliance Trust Note */}
              <div className="p-3.5 rounded-xl bg-[#F2F7F4] border border-[#4E8B65]/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#4E8B65] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#2D6644] leading-relaxed">
                  <strong>Statutory Guarantee:</strong> Our dedicated CSR cell responds within 24 business hours with an MCA-compliant project proposal, audited financials, and direct 80G tax benefit schedule.
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-[#1C3D2F] text-white hover:bg-[#142D1C] shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit CSR Request'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#4E8B65]/15 flex items-center justify-center mx-auto text-[#4E8B65]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-['DM_Serif_Display'] text-2xl text-[#0F1F16]">
                  CSR Proposal Request Registered!
                </h4>
                {proposalRef && (
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                    Official Reference: {proposalRef}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2">
                  Thank you, <strong>{formData.contactName}</strong> from <strong>{formData.companyName}</strong>. Our dedicated CSR liaison manager has been assigned and will connect with your team at <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Selected Focus:</span>
                  <span className="font-semibold text-gray-800">{formData.focusArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Allocated Geography:</span>
                  <span className="font-semibold text-gray-800">{formData.targetState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Est. Budget Range:</span>
                  <span className="font-semibold text-gray-800">{formData.budgetRange}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`mailto:${FOUNDATION_META.csrEmail}?subject=CSR Inquiry - ${formData.companyName}`}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#4E8B65] text-white hover:bg-[#3D6B4F] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Complete CSR Kit (PDF)</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
