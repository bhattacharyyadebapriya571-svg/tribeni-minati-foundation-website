import React, { useState } from 'react';
import { TMF_META, LEGAL_DOCS } from '../data/tmfVerifiedData';
import { Building, Copy, Check, ShieldCheck, Heart, FileText, QrCode } from 'lucide-react';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface BankingGatewayProps {
  onOpenDonateModal: () => void;
  onOpenDocument: (doc: LegalDocument) => void;
}

export const BankingGateway: React.FC<BankingGatewayProps> = ({
  onOpenDonateModal,
  onOpenDocument,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const passbookDoc = LEGAL_DOCS.find((d) => d.id === 'bank-passbook') || LEGAL_DOCS[2];

  return (
    <section
      id="banking"
      className="py-24 sm:py-32 bg-white text-[#151C18] relative border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3B2B] bg-[#FAF8F5] border border-black/[0.08] shadow-xs">
            <Building className="w-3.5 h-3.5 text-amber-600" />
            Official Banking Credentials & Direct Wire
          </div>
          <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-[#151C18] leading-tight">
            Institutional Bank Account Credentials
          </h2>
          <p className="text-sm sm:text-base text-[#5C6760] leading-relaxed">
            All direct NEFT, RTGS, IMPS wire transfers and institutional CSR grants are received in the verified statutory account of <strong>{TMF_META.name}</strong> at Central Bank of India.
          </p>
        </div>

        {/* Double-Bezel Banking Card */}
        <div className="max-w-4xl mx-auto double-bezel-outer">
          <div className="double-bezel-inner p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[1.3fr_0.9fr] gap-10 items-center">
            {/* Left Bank Details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-800 shadow-2xs">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['DM_Serif_Display'] text-xl text-[#151C18]">
                      {TMF_META.bank.bankName}
                    </h3>
                    <div className="text-xs text-[#5C6760] font-mono">
                      Branch: {TMF_META.bank.branch}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDocument(passbookDoc)}
                  className="inline-flex items-center gap-1 text-xs text-[#1B3B2B] hover:underline font-bold cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Verify Passbook PDF</span>
                </button>
              </div>

              {/* Data Rows */}
              <div className="space-y-3 text-xs">
                {/* Account Name */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Beneficiary Account Name
                    </span>
                    <div className="font-bold text-[#151C18] font-mono text-sm mt-0.5">
                      {TMF_META.bank.accountName}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(TMF_META.bank.accountName, 'name')}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#1B3B2B] hover:bg-white transition-colors cursor-pointer"
                    title="Copy Name"
                  >
                    {copiedField === 'name' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Account Number */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Account Number (Savings Bank)
                    </span>
                    <div className="font-bold text-[#1B3B2B] font-mono text-base mt-0.5 tracking-wider">
                      {TMF_META.bank.accountNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(TMF_META.bank.accountNumber, 'acct')}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#1B3B2B] hover:bg-white transition-colors cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedField === 'acct' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* IFSC & MICR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        IFSC Code
                      </span>
                      <div className="font-bold text-[#151C18] font-mono text-sm mt-0.5">
                        {TMF_META.bank.ifsc}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(TMF_META.bank.ifsc, 'ifsc')}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#1B3B2B] hover:bg-white transition-colors cursor-pointer"
                      title="Copy IFSC"
                    >
                      {copiedField === 'ifsc' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        MICR Code
                      </span>
                      <div className="font-bold text-[#151C18] font-mono text-sm mt-0.5">
                        {TMF_META.bank.micr}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(TMF_META.bank.micr, 'micr')}
                      className="p-2 rounded-xl text-slate-500 hover:text-[#1B3B2B] hover:bg-white transition-colors cursor-pointer"
                      title="Copy MICR"
                    >
                      {copiedField === 'micr' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Gateway Box */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-black/[0.06] text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.08] text-[#1B3B2B] flex items-center justify-center mx-auto shadow-xs">
                <QrCode className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-['DM_Serif_Display'] text-xl text-[#151C18]">
                  Instant Online Contribution
                </h4>
                <p className="text-xs text-[#5C6760] mt-1 leading-relaxed">
                  Support online via UPI (GPay, PhonePe, Paytm), NetBanking, or Cards with instant 80G tax receipt certificate generation.
                </p>
              </div>

              <button
                onClick={onOpenDonateModal}
                className="w-full py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#1B3B2B]/20 active:scale-98 transition-all cursor-pointer group"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>Open Instant 80G Gateway</span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#1B3B2B] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>50% Tax Deduction Claimable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
