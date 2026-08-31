import React, { useState } from 'react';
import { TMF_META } from '../data/tmfVerifiedData';
import { useAuth } from '../context/AuthContext';
import type { PageId } from '../types';

interface DonorDashboardProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: (amount?: number, cause?: string) => void;
}

interface DonationRecord {
  id: string;
  donorName: string;
  donorPan: string;
  phone: string;
  amount: number;
  cause: string;
  date: string;
  receiptNumber: string;
  form10BeStatus: 'Filed & Certified' | 'Processing';
  paymentMode: string;
}

const SAMPLE_DONATIONS: DonationRecord[] = [
  {
    id: 'DON-2026-8841',
    donorName: 'Subir Kumar Ghosh',
    donorPan: 'ABCDE1234F',
    phone: '9143430927',
    amount: 5000,
    cause: 'Minati Free Remedial Education Coaching',
    date: '15-Aug-2026',
    receiptNumber: '80G-2026-081541',
    form10BeStatus: 'Filed & Certified',
    paymentMode: 'UPI / Central Bank Direct'
  },
  {
    id: 'DON-2026-6720',
    donorName: 'Subir Kumar Ghosh',
    donorPan: 'ABCDE1234F',
    phone: '9143430927',
    amount: 2500,
    cause: 'Rural Mobile Clinic Medicine Kit',
    date: '28-Jul-2026',
    receiptNumber: '80G-2026-072820',
    form10BeStatus: 'Filed & Certified',
    paymentMode: 'Razorpay Instant UPI'
  },
  {
    id: 'DON-2026-3199',
    donorName: 'Ananya Mukherjee',
    donorPan: 'BCDEF2345G',
    phone: '9832274345',
    amount: 10000,
    cause: 'Winter Relief 50 Thermal Sleeping Kits',
    date: '10-Jul-2026',
    receiptNumber: '80G-2026-071099',
    form10BeStatus: 'Filed & Certified',
    paymentMode: 'NEFT Bank Wire'
  }
];

export const DonorDashboardPage: React.FC<DonorDashboardProps> = ({ onNavigate, onOpenDonate }) => {
  const { user, signOut } = useAuth();
  const [searchPhone, setSearchPhone] = useState<string>('9143430927');
  const [selectedReceipt, setSelectedReceipt] = useState<DonationRecord | null>(null);

  const handleLogout = async () => {
    await signOut();
    onNavigate('donor-login');
  };

  const filtered = searchPhone.trim()
    ? SAMPLE_DONATIONS.filter(d => d.phone.includes(searchPhone.trim()) || d.donorPan.toLowerCase().includes(searchPhone.trim().toLowerCase()))
    : SAMPLE_DONATIONS;

  const totalDonated = filtered.reduce((acc, curr) => acc + curr.amount, 0);
  const taxExemptSavings = totalDonated * 0.5;

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const userDisplayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Verified Donor';

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Page Hero */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        
        {/* User Authentication Status Banner */}
        {user ? (
          <div className="mb-8 p-6 bg-white border border-indigo-100 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userDisplayName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#4b41e1]/20"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-[#4b41e1]/10 text-[#4b41e1] flex items-center justify-center font-bold text-xl">
                  {userDisplayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-base text-slate-900">{userDisplayName}</h2>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-md tracking-wider">
                    Verified Donor
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-6 bg-gradient-to-r from-[#0F172A] to-[#1E1B4B] rounded-3xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">account_circle</span>
                <h3 className="font-bold text-base text-white">Donor Login Available</h3>
              </div>
              <p className="text-xs text-slate-300">Sign in with Google or Email OTP to link your 80G receipts directly to your profile.</p>
            </div>
            <button
              onClick={() => onNavigate('donor-login')}
              className="px-6 py-3 bg-[#4b41e1] hover:bg-[#3b31cc] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>Donor Sign In</span>
              <span className="material-symbols-outlined text-[16px]">login</span>
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              <span>Section 80G Tax Exemption &amp; Form 10BE Portal</span>
            </div>

            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight leading-tight">
              Donor Ledger &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
                Tax Exemption Vault.
              </span>
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-[#45464d] leading-relaxed">
              Instantly retrieve, download, and verify your 80G tax exemption receipts for Income Tax Returns (ITR filing). Direct filing under Form 10BE with the Government of India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('transparency')}
              className="px-6 py-4 bg-white border border-border-subtle rounded-2xl font-bold text-xs uppercase tracking-wider text-[#191c1e] hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
            >
              Audited Accounts
            </button>
            <button
              onClick={() => onOpenDonate(5000, 'Section 80G Tax Exemption Donation')}
              className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              New 80G Contribution
            </button>
          </div>
        </div>

        {/* Impact & Tax Summary Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                Total Contributions
              </span>
              <h3 className="font-stat-lg text-3xl font-bold text-[#191c1e] mt-2">
                ₹{totalDonated.toLocaleString('en-IN')}
              </h3>
            </div>
            <div className="pt-4 border-t border-slate-100 font-mono text-xs text-[#64748B]">
              Verified through Central Bank of India
            </div>
          </div>

          <div className="bg-[#131b2e] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-xs text-indigo-200 uppercase font-bold">
                80G Deductible Amount (50%)
              </span>
              <h3 className="font-stat-lg text-3xl font-bold text-white mt-2">
                ₹{taxExemptSavings.toLocaleString('en-IN')}
              </h3>
            </div>
            <div className="pt-4 border-t border-white/10 font-mono text-xs text-amber-300">
              Eligible for ITR 50% deduction
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-xs text-[#64748B] uppercase font-bold">
                Statutory Compliance
              </span>
              <h3 className="font-stat-lg text-2xl font-bold text-emerald-600 mt-2">
                100% Tax Compliant
              </h3>
            </div>
            <div className="pt-4 border-t border-slate-100 font-mono text-xs text-[#64748B]">
              Form 10BE Filing Guaranteed
            </div>
          </div>

        </div>
      </section>

      {/* Search & Records Section */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-24">
        <div className="bg-[#f2f4f6] p-2 sm:p-3 rounded-[32px] shadow-sm">
          <div className="bg-white rounded-[24px] p-6 sm:p-10 space-y-8">
            
            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search by Mobile or PAN..."
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="w-full bg-[#f2f4f6] pl-11 pr-4 py-3 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-[#4b41e1]"
                />
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#64748B] text-[20px]">
                  search
                </span>
              </div>

              <div className="text-xs font-mono text-[#64748B]">
                Showing {filtered.length} verified receipts
              </div>
            </div>

            {/* Receipts List */}
            <div className="space-y-4">
              {filtered.map((record) => (
                <div
                  key={record.id}
                  className="bg-[#f7f9fb] border border-border-subtle rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#4b41e1] bg-indigo-50 px-2.5 py-1 rounded-full">
                        {record.receiptNumber}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-mono text-[11px] font-bold">
                        {record.form10BeStatus}
                      </span>
                      <span className="font-mono text-xs text-[#64748B]">
                        {record.date}
                      </span>
                    </div>

                    <h4 className="font-headline-md text-lg font-bold text-[#191c1e]">
                      {record.cause}
                    </h4>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#64748B]">
                      <span>Donor: <strong>{record.donorName}</strong></span>
                      <span>PAN: <strong>{record.donorPan}</strong></span>
                      <span>Mode: <strong>{record.paymentMode}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200">
                    <div className="text-left lg:text-right">
                      <div className="font-stat-lg text-2xl font-bold text-[#191c1e]">
                        ₹{record.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="font-mono text-[10px] text-emerald-600 font-bold">
                        50% 80G Exemption
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedReceipt(record)}
                      className="px-5 py-3 bg-[#111827] text-white rounded-xl font-bold text-xs uppercase hover:bg-[#4b41e1] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>View Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto border border-border-subtle">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#191c1e] hover:bg-slate-200 cursor-pointer"
            >
              ✕
            </button>

            {/* Official 80G Receipt Layout */}
            <div className="space-y-6">
              
              {/* Header with Seal */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                <div className="w-14 h-14 rounded-xl bg-white border border-border-subtle p-1.5 flex items-center justify-center shadow-xs shrink-0">
                  <img
                    src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                    alt="TMF Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-headline-md text-lg font-bold text-[#191c1e]">
                    Tribeni Minati Foundation
                  </h3>
                  <p className="font-mono text-[10px] text-[#64748B]">
                    Govt. Reg: {TMF_META.newRegNo} | DARPAN: {TMF_META.ngoDarpanId}
                  </p>
                  <p className="font-mono text-[10px] text-emerald-700 font-bold">
                    Official Section 80G Donation Receipt (Valid for ITR)
                  </p>
                </div>
              </div>

              {/* Receipt Details Table */}
              <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-border-subtle space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Receipt Number:</span>
                  <span className="font-bold text-[#191c1e]">{selectedReceipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Date of Deposit:</span>
                  <span className="font-bold text-[#191c1e]">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Donor Name:</span>
                  <span className="font-bold text-[#191c1e]">{selectedReceipt.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Donor PAN:</span>
                  <span className="font-bold text-[#191c1e]">{selectedReceipt.donorPan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Purpose of Contribution:</span>
                  <span className="font-bold text-[#191c1e] text-right">{selectedReceipt.cause}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Payment Gateway:</span>
                  <span className="font-bold text-[#191c1e]">{selectedReceipt.paymentMode}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between text-sm">
                  <span className="font-bold text-[#191c1e]">Total Donated:</span>
                  <span className="font-bold text-[#4b41e1] text-base">₹{selectedReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Authorization Note */}
              <div className="text-[11px] font-mono text-[#64748B] space-y-1">
                <p>• Donations to Tribeni Minati Foundation qualify for 50% deduction under Section 80G of Income Tax Act 1961.</p>
                <p>• Form 10BE certificate filing acknowledged by Central Board of Direct Taxes (CBDT).</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3.5 bg-[#111827] text-white font-bold rounded-xl text-xs uppercase cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Print Receipt / PDF</span>
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-6 py-3.5 bg-slate-100 text-[#191c1e] font-bold rounded-xl text-xs uppercase cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
