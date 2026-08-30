import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, QrCode, CheckCircle2, ShieldCheck, ArrowRight, FileDown } from 'lucide-react';
import { FOUNDATION_META } from '../data/foundationData';
import { TMF_META } from '../data/tmfVerifiedData';
import { openRazorpayCheckout } from '../utils/razorpay';
import { generate80GCertificatePdf, download80GCertificate } from '../lib/certificateGenerator';
import { tmfBackend } from '../services/backend';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  initialPillar?: string;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  initialAmount = 5000,
  initialPillar = 'General Impact Fund (Where needed most)',
}) => {
  const [frequency, setFrequency] = useState<'monthly' | 'onetime'>('onetime');
  const [amount, setAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [pillar, setPillar] = useState<string>(initialPillar);
  const [step, setStep] = useState<'input' | 'payment_choice' | 'qr_view' | 'receipt'>('input');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [paymentId, setPaymentId] = useState<string>('');

  const [donorData, setDonorData] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: '',
  });

  useEffect(() => {
    if (initialAmount) setAmount(initialAmount);
    if (initialPillar) setPillar(initialPillar);
  }, [initialAmount, initialPillar, isOpen]);

  if (!isOpen) return null;

  const presetAmounts =
    frequency === 'monthly'
      ? [1200, 1500, 2000, 3500, 5000]
      : [1000, 2500, 5000, 10000, 25000, 50000];

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(parseInt(val, 10));
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 100) return;
    setStep('payment_choice');
  };

  const handleRazorpayGateway = () => {
    setIsProcessing(true);
    openRazorpayCheckout({
      amountInRupees: amount,
      donorName: donorData.name || 'Anonymous Donor',
      donorEmail: donorData.email || 'donor@tmf.org.in',
      donorPhone: donorData.phone || '9143430927',
      panNumber: donorData.panNumber || 'ABCDE1234F',
      purpose: `80G Certified Contribution to ${pillar}`,
      onSuccess: async (pId: string) => {
        setIsProcessing(false);
        setPaymentId(pId);
        setStep('receipt');
        await tmfBackend.processDonation({
          donorName: donorData.name || 'Anonymous Donor',
          donorEmail: donorData.email || '',
          donorPhone: donorData.phone || '',
          panNumber: donorData.panNumber || 'ABCDE1234F',
          amount,
          frequency,
          cause: pillar,
          paymentMethod: 'Card',
          paymentId: pId,
        });
      },
      onDismiss: () => {
        setIsProcessing(false);
      },
    });
  };

  const handleManualQrSuccess = async () => {
    const manualTxn = `UPI-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setPaymentId(manualTxn);
    setStep('receipt');
    await tmfBackend.processDonation({
      donorName: donorData.name || 'Anonymous Supporter',
      donorEmail: donorData.email || '',
      donorPhone: donorData.phone || '',
      panNumber: donorData.panNumber || 'ABCDE1234F',
      amount,
      frequency,
      cause: pillar,
      paymentMethod: 'UPI',
      paymentId: manualTxn,
    });
  };

  const handleDownloadDirect80G = async () => {
    setIsGeneratingPdf(true);
    try {
      const pdfBytes = await generate80GCertificatePdf({
        id: `don_${Date.now()}`,
        paymentId: paymentId || `pay_${Date.now()}`,
        amount,
        currency: 'INR',
        donorName: donorData.name || 'Valued Supporter',
        donorEmail: donorData.email || '',
        donorPhone: donorData.phone || '',
        donorPan: (donorData.panNumber || 'ABCDE1234F').toUpperCase(),
        donorAddress: 'West Bengal, India',
        cause: pillar,
        date: new Date().toISOString(),
        certificateNumber: receiptNumber,
      });

      download80GCertificate(pdfBytes, `${receiptNumber}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setIsProcessing(false);
    onClose();
  };

  const receiptNumber = `80G-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const upiDeepLink = `upi://pay?pa=${FOUNDATION_META.upiId}&pn=${encodeURIComponent(FOUNDATION_META.name)}&am=${amount}&cu=INR&tn=${encodeURIComponent('80G Donation to ' + pillar)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiDeepLink)}`;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden z-10 my-auto text-[#151C18] max-h-[88vh] flex flex-col"
        >
          {/* Header (Sticky at top of modal) */}
          <div className="bg-[#111A15] p-5 sm:p-6 text-white relative shrink-0">
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Section 80G Tax Deductible</span>
            </div>
            <h3 className="font-['DM_Serif_Display'] text-2xl">
              {step === 'receipt' ? 'Thank You for Your Support' : 'Support Our Mission'}
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Tribeni Minati Foundation · Govt. Reg: {TMF_META.newRegNo}
            </p>
          </div>

          {/* Body Content (Scrollable) */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1">
            {step === 'input' && (
              <form onSubmit={handleProceedToPayment} className="space-y-5">
                {/* Frequency Toggle */}
                <div className="flex p-1 bg-black/[0.04] rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setFrequency('onetime')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      frequency === 'onetime'
                        ? 'bg-white text-[#1B3B2B] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    One-Time Impact
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-white text-[#1B3B2B] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Monthly Sustainer
                  </button>
                </div>

                {/* Preset Amount Grid */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Contribution Amount (INR)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetAmounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handlePresetSelect(val)}
                        className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                          amount === val && !customAmount
                            ? 'bg-[#1B3B2B] text-white border-[#1B3B2B] shadow-sm'
                            : 'bg-white text-slate-800 border-black/[0.08] hover:border-black/[0.2]'
                        }`}
                      >
                        ₹{val.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomChange}
                      placeholder="e.g. 15000"
                      className="w-full pl-8 pr-4 py-3 rounded-2xl bg-white border border-black/[0.08] text-sm font-bold text-[#151C18] focus:outline-hidden focus:border-[#1B3B2B]"
                    />
                  </div>
                </div>

                {/* Pillar Selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Direct Contribution To
                  </label>
                  <select
                    value={pillar}
                    onChange={(e) => setPillar(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-[#191c1e] focus:outline-hidden focus:border-[#4b41e1]"
                  >
                    <option value="General Impact Fund (Where needed most)">
                      General Impact Fund (Where needed most)
                    </option>
                    <option value="Free Child Remedial Education Coaching Center">
                      Free Child Remedial Education Coaching Center (Mogra/Tribeni)
                    </option>
                    <option value="Infant Winter Bedding & Blanket Distribution Relief">
                      Infant Winter Bedding &amp; Blanket Distribution Relief (Dhaniakhali)
                    </option>
                    <option value="Rural Diagnostic Health & Mobile Eye Camps">
                      Rural Diagnostic Health &amp; Mobile Eye Camps (Hooghly)
                    </option>
                    <option value="Women SHG Tailoring & Jute Craft Center">
                      Women SHG Tailoring &amp; Jute Craft Center (Tribeni)
                    </option>
                    <option value="Voluntary Blood Donation & Emergency Support Cell">
                      Voluntary Blood Donation &amp; Emergency Support Cell
                    </option>
                    <option value="Emergency Food Security & Annadaan Relief">
                      Emergency Food Security &amp; Annadaan Relief
                    </option>
                  </select>
                </div>

                {/* Donor Details for 80G */}
                <div className="space-y-3 pt-2 border-t border-black/[0.06]">
                  <div className="text-[11px] font-bold text-[#1B3B2B] uppercase tracking-wider">
                    Donor Details (For Section 80G Tax Exemption Receipt)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Full Name (as on PAN)"
                      value={donorData.name}
                      onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#151C18] focus:outline-hidden focus:border-[#1B3B2B]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorData.email}
                      onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#151C18] focus:outline-hidden focus:border-[#1B3B2B]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={donorData.phone}
                      onChange={(e) => setDonorData({ ...donorData, phone: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#151C18] focus:outline-hidden focus:border-[#1B3B2B]"
                    />
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="PAN Number (Mandatory for 80G)"
                      value={donorData.panNumber}
                      onChange={(e) => setDonorData({ ...donorData, panNumber: e.target.value.toUpperCase() })}
                      className="px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#151C18] font-mono uppercase focus:outline-hidden focus:border-[#1B3B2B]"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#1B3B2B]/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <span>Proceed to Donate ₹{amount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {step === 'payment_choice' && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-left">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                    Contribution Summary
                  </div>
                  <div className="font-['DM_Serif_Display'] text-2xl text-[#151C18] mt-0.5">
                    ₹{amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-[#1B3B2B] font-semibold mt-0.5">{pillar}</div>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Razorpay Gateway Option */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleRazorpayGateway}
                    className="w-full py-4 px-5 rounded-2xl bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <CreditCard className="w-5 h-5 text-emerald-300" />
                      <div>
                        <div>Pay with Cards / Netbanking / Razorpay</div>
                        <div className="text-[10px] text-white/70 font-normal lowercase">
                          instant verified checkout
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Direct UPI QR Option */}
                  <button
                    type="button"
                    onClick={() => setStep('qr_view')}
                    className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-black/[0.02] border border-black/[0.1] text-[#151C18] text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xs cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <QrCode className="w-5 h-5 text-amber-800" />
                      <div>
                        <div>Pay via UPI QR (GPay / PhonePe / Paytm)</div>
                        <div className="text-[10px] text-slate-500 font-normal lowercase">
                          scan directly from banking apps
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer pt-2"
                >
                  ← Change Amount or Details
                </button>
              </div>
            )}

            {step === 'qr_view' && (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-white rounded-2xl border border-black/[0.08] inline-block shadow-sm">
                  <img src={qrCodeUrl} alt="TMF UPI QR" className="w-48 h-48 mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#1B3B2B] mt-2">
                    UPI ID: {FOUNDATION_META.upiId}
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p>Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM)</p>
                  <p className="font-bold text-[#151C18]">Amount: ₹{amount.toLocaleString('en-IN')}</p>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={handleManualQrSuccess}
                    className="w-full py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer transition-all"
                  >
                    I Have Completed the Transfer →
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('payment_choice')}
                    className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer block mx-auto pt-1"
                  >
                    ← Back to Payment Options
                  </button>
                </div>
              </div>
            )}

            {step === 'receipt' && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-['DM_Serif_Display'] text-2xl text-[#151C18]">
                    Contribution Confirmed!
                  </h4>
                  <p className="text-xs text-[#5C6760]">
                    Your generous donation has been credited to Tribeni Minati Foundation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Receipt No:</span>
                    <span className="font-bold text-[#151C18]">{receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-bold text-slate-700">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount:</span>
                    <span className="font-bold text-emerald-800">₹{amount.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax Exemption:</span>
                    <span className="font-bold text-amber-900">50% under Sec 80G(5)(vi)</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    disabled={isGeneratingPdf}
                    onClick={handleDownloadDirect80G}
                    className="w-full py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Official 80G Certificate (PDF)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    Close &amp; Return to Website
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
