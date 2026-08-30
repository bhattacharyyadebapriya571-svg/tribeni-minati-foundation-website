import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, ArrowRight, Award } from 'lucide-react';

interface TaxCalculatorWidgetProps {
  onDonateWithAmount?: (amount: number, cause: string) => void;
}

export const TaxCalculatorWidget: React.FC<TaxCalculatorWidgetProps> = ({ onDonateWithAmount }) => {
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [taxSlab, setTaxSlab] = useState<number>(30); // 30% default for high earners/corporates

  // 80G allows 50% deduction of donation amount from taxable income
  const deductionAllowed = donationAmount * 0.5;
  const taxSaved = Math.round(deductionAllowed * (taxSlab / 100) * 1.04); // including 4% cess
  const effectiveCost = donationAmount - taxSaved;

  // Impact calculation based on real field programmes
  const blanketsProvided = Math.max(1, Math.floor(donationAmount / 350));
  const childrenEducatedMonths = Math.max(1, Math.floor(donationAmount / 750));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="double-bezel-outer bg-[#111A15] text-[#E8E3D7] rounded-3xl overflow-hidden shadow-2xl">
        <div className="double-bezel-inner p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Statutory Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Section 80G Tax Exemption Calculator</span>
            </div>

            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Save Tax While <br />
              <span className="text-amber-300 italic">Transforming Rural Lives.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#B3BD87] leading-relaxed">
              All donations to <strong>Tribeni Minati Foundation</strong> are eligible for a <strong>50% tax deduction</strong> under Section 80G of the Income Tax Act (Reg No: SO212276 / 80G Approved). You receive an instant digital 80G receipt + Form 10BE filing.
            </p>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-2xl font-bold font-mono text-amber-300">
                  {blanketsProvided}
                </div>
                <div className="text-xs text-[#E8E3D7]/80 mt-1">
                  Warm Winter Blankets for Rural Infants & Elders
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {childrenEducatedMonths} Mo.
                </div>
                <div className="text-xs text-[#E8E3D7]/80 mt-1">
                  Free Primary Education & Nutritious Mid-day Meals
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#E8E3D7]/60 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>NITI Aayog DARPAN Verified • 100% Tax Compliant Ledger</span>
            </div>
          </div>

          {/* Right Column: Interactive Calculator Box */}
          <div className="lg:col-span-6 bg-white/[0.06] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/[0.12] space-y-6">
            
            {/* Donation Amount Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs uppercase tracking-wider text-[#B3BD87] font-bold">
                  Contribution Amount
                </label>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  ₹{donationAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B3BD87]"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#E8E3D7]/50 mt-1">
                <span>₹1,000</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Tax Slab Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#B3BD87] font-bold mb-2">
                Your Income Tax Bracket
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { slab: 10, label: '10% Slab' },
                  { slab: 20, label: '20% Slab' },
                  { slab: 30, label: '30% Slab' },
                ].map((item) => (
                  <button
                    key={item.slab}
                    type="button"
                    onClick={() => setTaxSlab(item.slab)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
                      taxSlab === item.slab
                        ? 'bg-amber-300 text-[#111A15] border-amber-300 shadow-md'
                        : 'bg-white/[0.04] text-[#E8E3D7] border-white/[0.08] hover:bg-white/[0.08]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                  You Save in Income Tax
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  ₹{taxSaved.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-200/70 block mt-0.5">
                  50% deduction under 80G
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block">
                  Effective Out-of-Pocket Cost
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 block">
                  ₹{effectiveCost.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#E8E3D7]/60 block mt-0.5">
                  Actual cost of giving
                </span>
              </div>
            </div>

            {/* Instant Donate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDonateWithAmount?.(donationAmount, 'General Welfare & 80G Tax Exemption')}
              className="w-full py-4 px-6 rounded-2xl bg-[#B3BD87] hover:bg-[#c2cc96] text-[#111A15] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#B3BD87]/20 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-[#111A15] text-[#111A15]" />
              <span>Donate ₹{donationAmount.toLocaleString('en-IN')} & Get 80G Receipt</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

          </div>

        </div>
      </div>
    </section>
  );
};
