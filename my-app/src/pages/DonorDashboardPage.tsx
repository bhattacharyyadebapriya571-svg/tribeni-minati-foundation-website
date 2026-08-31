import React, { useState, useEffect } from 'react';
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

interface DonorProfileData {
  fullName: string;
  email: string;
  phone: string;
  panNumber: string;
  aadhaarLast4: string;
  donorType: 'Individual' | 'HUF' | 'Corporate CSR' | 'Trust / Society';
  address: string;
  city: string;
  state: string;
  pincode: string;
  kycStatus: 'Verified' | 'Pending Review' | 'Not Submitted';
  kycVerificationDate?: string;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'kyc' | 'ledger'>('overview');

  // Profile & KYC State (Persisted in localStorage & synced)
  const [profile, setProfile] = useState<DonorProfileData>(() => {
    const saved = localStorage.getItem('tmf_donor_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      fullName: user?.user_metadata?.full_name || user?.user_metadata?.name || 'Subir Kumar Ghosh',
      email: user?.email || 'subir.ghosh@example.com',
      phone: '9143430927',
      panNumber: 'ABCDE1234F',
      aadhaarLast4: '8841',
      donorType: 'Individual',
      address: 'Tribeni Rail Gate, Hooghly',
      city: 'Tribeni',
      state: 'West Bengal',
      pincode: '712503',
      kycStatus: 'Verified',
      kycVerificationDate: '15-Aug-2026',
    };
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [kycForm, setKycForm] = useState({
    pan: profile.panNumber,
    aadhaarOrId: 'XXXX-XXXX-8841',
    idType: 'Aadhaar Card' as 'Aadhaar Card' | 'Passport' | 'Voter ID' | 'Driving License',
    declarationAccepted: true,
  });
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [kycAlert, setKycAlert] = useState('');

  const [searchPhone, setSearchPhone] = useState<string>('9143430927');
  const [selectedReceipt, setSelectedReceipt] = useState<DonationRecord | null>(null);

  // Sync user email when auth loads
  useEffect(() => {
    if (user?.email && profile.email !== user.email) {
      setProfile(prev => ({
        ...prev,
        email: user.email || prev.email,
        fullName: user.user_metadata?.full_name || prev.fullName,
      }));
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    onNavigate('donor-login');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    localStorage.setItem('tmf_donor_profile', JSON.stringify(profile));
    setTimeout(() => {
      setSavingProfile(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycForm.pan || kycForm.pan.length !== 10) {
      setKycAlert('Please enter a valid 10-character Indian PAN Number (e.g. ABCDE1234F)');
      return;
    }
    setKycSubmitting(true);
    setKycAlert('');

    setTimeout(() => {
      const updatedProfile: DonorProfileData = {
        ...profile,
        panNumber: kycForm.pan.toUpperCase(),
        kycStatus: 'Verified',
        kycVerificationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      };
      setProfile(updatedProfile);
      localStorage.setItem('tmf_donor_profile', JSON.stringify(updatedProfile));
      setKycSubmitting(false);
      setKycAlert('KYC Verification Completed! Your Section 80G and Form 10BE tax records are now fully certified.');
    }, 1000);
  };

  const filtered = searchPhone.trim()
    ? SAMPLE_DONATIONS.filter(d => d.phone.includes(searchPhone.trim()) || d.donorPan.toLowerCase().includes(searchPhone.trim().toLowerCase()))
    : SAMPLE_DONATIONS;

  const totalDonated = filtered.reduce((acc, curr) => acc + curr.amount, 0);
  const taxExemptSavings = totalDonated * 0.5;

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const userDisplayName = profile.fullName || user?.email?.split('@')[0] || 'Verified Donor';

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Page Hero */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        
        {/* User Authentication & Profile Header Card */}
        {user ? (
          <div className="mb-8 p-6 sm:p-8 bg-white border border-indigo-100/80 rounded-3xl shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userDisplayName}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#4b41e1]/10"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4b41e1] to-[#645efb] text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                  {userDisplayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-lg sm:text-xl text-slate-900">{userDisplayName}</h2>
                  <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full tracking-wider flex items-center gap-1 ${
                    profile.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    <span>{profile.kycStatus === 'Verified' ? 'KYC Verified' : 'KYC Pending'}</span>
                  </span>
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-[#4b41e1] text-[10px] font-bold uppercase rounded-full tracking-wider">
                    {profile.donorType}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  <span>{profile.email}</span>
                  <span>•</span>
                  <span>PAN: {profile.panNumber || 'Not Linked'}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onOpenDonate(5000, 'Section 80G Contribution')}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-[#F59E0B] text-[#111827] text-xs font-extrabold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                <span>Contribute (80G)</span>
              </button>
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
          <div className="mb-8 p-6 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#312E81] rounded-3xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">account_circle</span>
                <h3 className="font-bold text-base text-white">Donor Sign-In &amp; KYC Authentication</h3>
              </div>
              <p className="text-xs text-slate-300">Sign in with Google, Phone OTP, or Email to complete KYC and download certified Form 10BE receipts.</p>
            </div>
            <button
              onClick={() => onNavigate('donor-login')}
              className="px-6 py-3 bg-[#4b41e1] hover:bg-[#3b31cc] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>Donor Login</span>
              <span className="material-symbols-outlined text-[16px]">login</span>
            </button>
          </div>
        )}

        {/* Portal Navigation Tabs */}
        <div className="flex bg-slate-200/70 p-1.5 rounded-2xl mb-8 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' ? 'bg-white text-[#4b41e1] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span>80G Tax Vault &amp; Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile' ? 'bg-white text-[#4b41e1] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span>Donor Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('kyc')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'kyc' ? 'bg-white text-[#4b41e1] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">shield</span>
            <span>Statutory KYC Authentication</span>
            {profile.kycStatus === 'Verified' && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'ledger' ? 'bg-white text-[#4b41e1] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">history_edu</span>
            <span>Contributions Ledger</span>
          </button>
        </div>

        {/* TAB 1: 80G OVERVIEW & VAULT */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  <span>Section 80G Tax Exemption &amp; Form 10BE Portal</span>
                </div>

                <h1 className="font-display-lg text-4xl sm:text-5xl text-[#191c1e] tracking-tight leading-tight">
                  Donor Ledger &amp; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
                    Tax Exemption Vault.
                  </span>
                </h1>

                <p className="font-body-lg text-base text-[#45464d] leading-relaxed">
                  Instantly retrieve, download, and verify your 80G tax exemption receipts for Income Tax Returns (ITR filing). Direct filing under Form 10BE with the Government of India.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('transparency')}
                  className="px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#191c1e] hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
                >
                  Audited Accounts
                </button>
                <button
                  onClick={() => onOpenDonate(5000, 'Section 80G Tax Exemption Donation')}
                  className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  New 80G Contribution
                </button>
              </div>
            </div>

            {/* Floating Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
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

              <div className="bg-gradient-to-br from-[#4b41e1] to-[#3b31cc] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-xs text-indigo-100 uppercase font-bold">
                    Form 10BE Compliance
                  </span>
                  <h3 className="font-stat-lg text-3xl font-bold text-white mt-2">
                    100% Certified
                  </h3>
                </div>
                <div className="pt-4 border-t border-white/20 font-mono text-xs text-indigo-100">
                  NITI Aayog DARPAN: {TMF_META.ngoDarpanId}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DONOR PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm max-w-4xl">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Donor Profile Settings
              </h2>
              <p className="text-sm text-slate-500">
                Keep your legal information up-to-date for generating accurate Section 80G tax certificates and official receipts.
              </p>
            </div>

            {saveSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Profile details saved and updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Legal Name / Entity Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.fullName}
                    onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Donor Classification
                  </label>
                  <select
                    value={profile.donorType}
                    onChange={e => setProfile({ ...profile, donorType: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  >
                    <option value="Individual">Individual Donor</option>
                    <option value="HUF">Hindu Undivided Family (HUF)</option>
                    <option value="Corporate CSR">Corporate CSR Entity</option>
                    <option value="Trust / Society">Trust / Society</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address (For Tax Receipts)
                  </label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Income Tax PAN (For Form 10BE)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    required
                    value={profile.panNumber}
                    onChange={e => setProfile({ ...profile, panNumber: e.target.value.toUpperCase() })}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Postal PIN Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={profile.pincode}
                    onChange={e => setProfile({ ...profile, pincode: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Communication Address
                </label>
                <textarea
                  rows={2}
                  value={profile.address}
                  onChange={e => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-8 py-3.5 bg-[#4b41e1] hover:bg-[#3b31cc] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingProfile ? (
                    <span>Saving Profile...</span>
                  ) : (
                    <>
                      <span>Update Donor Profile</span>
                      <span className="material-symbols-outlined text-[16px]">save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: STATUTORY KYC AUTHENTICATION */}
        {activeTab === 'kyc' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  <span>Statutory Compliance &amp; DPDP Act 2023</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  80G KYC Authentication
                </h2>
              </div>

              <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                  Status: {profile.kycStatus}
                </span>
              </div>
            </div>

            {kycAlert && (
              <div className={`mb-6 p-4 text-xs font-semibold rounded-2xl flex items-center gap-2.5 ${
                kycAlert.includes('Completed') ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                <span className="material-symbols-outlined text-[18px]">
                  {kycAlert.includes('Completed') ? 'verified' : 'error'}
                </span>
                <span>{kycAlert}</span>
              </div>
            )}

            {/* KYC Compliance Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                  <span>Form 10BE Ready</span>
                </div>
                <p className="text-[11px] text-slate-500">Auto-uploaded to Income Tax Portal for AIS deduction matching.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-indigo-600 text-[16px]">lock</span>
                  <span>Masked PII Security</span>
                </div>
                <p className="text-[11px] text-slate-500">Aadhaar and PAN data are tokenized under DPDP Act 2023 standards.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-600 text-[16px]">receipt</span>
                  <span>Instant 80G Receipts</span>
                </div>
                <p className="text-[11px] text-slate-500">Tamper-proof digital seal signed by General Secretary Rudra Adhya.</p>
              </div>
            </div>

            <form onSubmit={handleKycSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Verified Permanent Account Number (PAN)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={kycForm.pan}
                    onChange={e => setKycForm({ ...kycForm, pan: e.target.value.toUpperCase() })}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Must match the PAN registered on Income Tax E-filing portal.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Government Photo Identity Proof
                  </label>
                  <select
                    value={kycForm.idType}
                    onChange={e => setKycForm({ ...kycForm, idType: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#4b41e1]/20 focus:border-[#4b41e1] outline-none"
                  >
                    <option value="Aadhaar Card">Aadhaar Card (UIDAI)</option>
                    <option value="Passport">Indian Passport</option>
                    <option value="Voter ID">Election Commission Voter ID</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="kyc-check"
                  checked={kycForm.declarationAccepted}
                  onChange={e => setKycForm({ ...kycForm, declarationAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#4b41e1] rounded border-slate-300 focus:ring-[#4b41e1]"
                />
                <label htmlFor="kyc-check" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                  I hereby declare that the PAN and identification details provided belong to me/my entity and are true to the best of my knowledge for Section 80G Form 10BE filing with the Income Tax Department of India.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={kycSubmitting || !kycForm.declarationAccepted}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {kycSubmitting ? (
                    <span>Authenticating KYC...</span>
                  ) : (
                    <>
                      <span>Complete KYC Authentication</span>
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: CONTRIBUTIONS LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Verified Contribution Ledger</h3>
                  <p className="text-xs text-slate-500">Filter by PAN or registered mobile number.</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchPhone}
                    onChange={e => setSearchPhone(e.target.value)}
                    placeholder="Search PAN or Phone..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#4b41e1]/20"
                  />
                  <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-3 top-2.5">search</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Receipt No.</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Cause</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment Mode</th>
                      <th className="pb-3">Form 10BE</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map(record => (
                      <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 font-mono font-bold text-slate-900">{record.receiptNumber}</td>
                        <td className="py-4 text-slate-600">{record.date}</td>
                        <td className="py-4 font-medium text-slate-900">{record.cause}</td>
                        <td className="py-4 font-bold text-[#4b41e1]">₹{record.amount.toLocaleString('en-IN')}</td>
                        <td className="py-4 text-slate-600">{record.paymentMode}</td>
                        <td className="py-4">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px]">
                            {record.form10BeStatus}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => setSelectedReceipt(record)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#4b41e1] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            View &amp; PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* 80G Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-xl w-full p-8 max-h-[88vh] flex flex-col my-auto relative">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <img src="/tmf-assets/official-seal.png" alt="Seal" className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="font-bold text-base text-slate-900">Official Section 80G Tax Exemption Receipt</h4>
                <p className="text-xs text-slate-500">Tribeni Minati Foundation · Reg: SO212276</p>
              </div>
            </div>

            <div className="space-y-4 text-xs flex-1 overflow-y-auto pr-2">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt ID:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Donor Name:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Donor PAN:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.donorPan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contribution Amount:</span>
                  <span className="font-bold text-emerald-700">₹{selectedReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">50% Tax Deduction:</span>
                  <span className="font-bold text-[#4b41e1]">₹{(selectedReceipt.amount * 0.5).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Purpose / Cause:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.cause}</span>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/60 rounded-2xl text-[11px] text-slate-700 space-y-1">
                <p><strong>Statutory Notice:</strong> This donation qualifies for deduction under Section 80G(5)(vi) of the Income Tax Act, 1961. Unique Document Identification Number (UDIN) generated under Form 10BE.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 mt-6">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print</span>
              </button>
              <button
                onClick={() => {
                  alert(`Downloading Official 80G Tax Receipt PDF: ${selectedReceipt.receiptNumber}.pdf`);
                  setSelectedReceipt(null);
                }}
                className="px-6 py-2.5 bg-[#4b41e1] hover:bg-[#3b31cc] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
