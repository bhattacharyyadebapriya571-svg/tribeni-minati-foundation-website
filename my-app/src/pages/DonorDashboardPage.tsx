import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  ShieldCheck,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { TMF_META } from '../data/tmfVerifiedData';
import { formatBengaliCurrency } from '../utils/bengaliCurrency';
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
    cause: 'Minati Free Education Coaching Sponsorship',
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
    cause: 'Project HELP!! Rural Mobile Clinic Medicine Kit',
    date: '28-Jul-2026',
    receiptNumber: '80G-2026-072820',
    form10BeStatus: 'Filed & Certified',
    paymentMode: 'Razorpay Instant UPI'
  },
  {
    id: 'DON-2026-3199',
    donorName: 'Ananya Mukherjee',
    donorPan: 'BCDEF2345G',
    phone: '9836474136',
    amount: 10000,
    cause: 'Infant Winter Bedding & Maternal Shield Drive',
    date: '10-Jun-2026',
    receiptNumber: '80G-2026-061099',
    form10BeStatus: 'Filed & Certified',
    paymentMode: 'NetBanking Wire'
  }
];

export const DonorDashboardPage: React.FC<DonorDashboardProps> = ({
  onNavigate,
  onOpenDonate
}) => {
  const [searchIdentifier, setSearchIdentifier] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [matchingRecords, setMatchingRecords] = useState<DonationRecord[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchIdentifier.trim().toLowerCase();
    if (!query) return;

    setHasSearched(true);
    const results = SAMPLE_DONATIONS.filter(
      (d) =>
        d.phone.includes(query) ||
        d.donorPan.toLowerCase().includes(query) ||
        d.donorName.toLowerCase().includes(query) ||
        d.receiptNumber.toLowerCase().includes(query)
    );
    setMatchingRecords(results);
  };

  const handleDownload80G = (record: DonationRecord) => {
    // Generate simulated printable receipt window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Section 80G Tax Exemption Receipt - ${record.receiptNumber}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          .header { border-bottom: 3px double #1B3B2B; padding-bottom: 20px; text-align: center; }
          .title { font-size: 24px; font-weight: bold; color: #1B3B2B; margin: 0; }
          .subtitle { font-size: 13px; color: #555; margin-top: 5px; }
          .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 10px; border: 1px solid #c8e6c9; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 30px 0; background: #fafafa; padding: 20px; border-radius: 12px; border: 1px solid #eee; }
          .item-label { font-size: 11px; text-transform: uppercase; color: #777; font-weight: bold; }
          .item-value { font-size: 14px; font-weight: bold; color: #222; margin-top: 2px; }
          .amount-box { background: #1B3B2B; color: #fff; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 25px 0; }
          .amount-val { font-size: 28px; font-weight: bold; font-family: monospace; }
          .footer { border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; color: #666; }
          .seal { text-align: right; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${TMF_META.name}</h1>
          <div class="subtitle">ত্রিবেনী মিনতি ফাউন্ডেশন · Registered Non-Profit Society</div>
          <div class="subtitle">Reg No: ${TMF_META.newRegNo} (2013-2014) · NGO DARPAN: ${TMF_META.ngoDarpanId} · PAN: ${TMF_META.pan}</div>
          <div class="badge">OFFICIAL SECTION 80G DONATION RECEIPT (50% TAX EXEMPTION)</div>
        </div>

        <div class="amount-box">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Contribution Amount</div>
          <div class="amount-val">₹ ${record.amount.toLocaleString('en-IN')}</div>
          <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">Pillar: ${record.cause}</div>
        </div>

        <div class="grid">
          <div>
            <div class="item-label">Receipt Voucher Number</div>
            <div class="item-value font-mono">${record.receiptNumber}</div>
          </div>
          <div>
            <div class="item-label">Date of Realization</div>
            <div class="item-value">${record.date}</div>
          </div>
          <div>
            <div class="item-label">Donor Full Name</div>
            <div class="item-value">${record.donorName}</div>
          </div>
          <div>
            <div class="item-label">Donor PAN (Form 10BE)</div>
            <div class="item-value">${record.donorPan}</div>
          </div>
          <div>
            <div class="item-label">Statutory Compliance Status</div>
            <div class="item-value" style="color: #2e7d32;">✓ ${record.form10BeStatus}</div>
          </div>
          <div>
            <div class="item-label">Payment Channel</div>
            <div class="item-value">${record.paymentMode}</div>
          </div>
        </div>

        <div style="font-size: 11px; color: #666; line-height: 1.5; background: #fdfaf3; padding: 12px; border-left: 3px solid #f59e0b;">
          <strong>Tax Exemption Note:</strong> Donations to Tribeni Minati Foundation are eligible for deduction under Section 80G of the Income Tax Act, 1961. This digital certificate serves as official proof of voluntary philanthropic donation.
        </div>

        <div class="footer">
          <div>
            <strong>Tribeni Minati Foundation</strong><br/>
            Netaji Subhash Pally, Mogra, Hooghly - 712148<br/>
            Central Bank A/C: 5894594000
          </div>
          <div class="seal">
            <div style="font-weight: bold; color: #1B3B2B;">Authorized Signatory</div>
            <div style="font-size: 11px; margin-top: 25px;">General Secretary & Treasurer</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="background: #1B3B2B; color: #fff; border: none; padding: 10px 25px; border-radius: 8px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5] text-slate-900">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-700 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-bold">Donor Portal &amp; 80G Dashboard</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111A15] text-white relative overflow-hidden shadow-2xl mb-12 border border-white/10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 mb-4 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              12A &amp; 80G Certified Donor Services
            </div>
            <h1 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-white leading-tight">
              Donor Portal &amp; 80G Tax Receipts
            </h1>
            <p className="text-sm sm:text-base text-white/75 mt-3 leading-relaxed">
              Instantly retrieve verified donation records, download official Income Tax Form 10BE certificates, and track your grassroots social impact.
            </p>
          </div>
        </div>

        {/* Search / Lookup Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-black/[0.03] mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Search Your Donation Records
              </h2>
              <p className="text-xs text-slate-500">
                Enter your Phone Number, PAN Card, Name, or 80G Receipt Number.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={searchIdentifier}
                onChange={(e) => setSearchIdentifier(e.target.value)}
                placeholder="e.g. 9143430927 or ABCDE1234F"
                className="w-full pl-4 pr-4 py-3.5 text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/40 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-[#1B3B2B] hover:bg-[#26533D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Find Receipts</span>
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Demo Search:</span>
            <button
              onClick={() => {
                setSearchIdentifier('9143430927');
                setHasSearched(true);
                setMatchingRecords([SAMPLE_DONATIONS[0], SAMPLE_DONATIONS[1]]);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition-colors font-mono text-[11px] cursor-pointer"
            >
              Try Phone: 9143430927
            </button>
            <button
              onClick={() => {
                setSearchIdentifier('ABCDE1234F');
                setHasSearched(true);
                setMatchingRecords([SAMPLE_DONATIONS[0], SAMPLE_DONATIONS[1]]);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition-colors font-mono text-[11px] cursor-pointer"
            >
              Try PAN: ABCDE1234F
            </button>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <span>Verified 80G Contribution Records</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  {matchingRecords.length}
                </span>
              </h3>
            </div>

            {matchingRecords.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
                <p className="text-sm font-semibold">No donation records found for "{searchIdentifier}".</p>
                <p className="text-xs mt-1 text-slate-400">
                  If you made a direct bank wire, your receipt is uploaded within 24 hours of bank clearance.
                </p>
                <button
                  onClick={() => onOpenDonate(5000, 'Minati Free Education & Infant Care')}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B3B2B] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Make a New 80G Contribution</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchingRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-black/[0.02] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                            Receipt Number
                          </span>
                          <div className="font-mono text-xs font-bold text-emerald-800">
                            {record.receiptNumber}
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {record.form10BeStatus}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Donor Name:</span>
                          <strong className="text-slate-900">{record.donorName}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">PAN Number:</span>
                          <strong className="font-mono text-slate-900">{record.donorPan}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Date:</span>
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Target Welfare Pillar:</span>
                          <span className="font-medium text-emerald-900">{record.cause}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-slate-500 font-bold">Donated Amount:</span>
                          <strong className="text-lg text-emerald-800 font-mono">
                            {formatBengaliCurrency(record.amount).formatted} (₹{record.amount.toLocaleString('en-IN')})
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => handleDownload80G(record)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-emerald-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 80G Certificate</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Direct Bank Wire Instruction */}
        <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-['DM_Serif_Display'] text-xl text-slate-900 mb-2">
            Direct Statutory Bank Wire Instructions
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            For RTGS/NEFT/IMPS transfers, please use our official Central Bank of India statutory account. Your 80G receipt will be generated automatically upon bank clearance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Beneficiary Name</span>
              <div className="font-bold text-slate-900 mt-1">{TMF_META.bank.accountName}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Account Number</span>
              <div className="font-bold text-emerald-800 mt-1">{TMF_META.bank.accountNumber}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">IFSC Code</span>
              <div className="font-bold text-slate-900 mt-1">{TMF_META.bank.ifsc}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Bank &amp; Branch</span>
              <div className="font-bold text-slate-900 mt-1">{TMF_META.bank.bankName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
