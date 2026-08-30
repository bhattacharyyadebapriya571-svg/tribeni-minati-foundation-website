import React, { useState } from 'react';
import { Calculator, Activity, Sprout, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ImpactCalculatorProps {
  onDonateAmount: (amount: number) => void;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ onDonateAmount }) => {
  const [sliderAmount, setSliderAmount] = useState<number>(10000);

  // Dynamic calculations based on donation amount
  const taxExemption80G = Math.round(sliderAmount * 0.5);
  const estimatedTaxSaved = Math.round(taxExemption80G * 0.312); // standard 30% slab + 4% cess

  // Tangible social impact metrics
  const ambulanceRuns = Math.max(1, Math.floor(sliderAmount / 1500));
  const maternalKits = Math.max(2, Math.floor(sliderAmount / 600));
  const farmerTrainingHours = Math.max(5, Math.floor(sliderAmount / 400));
  const coldStorageDays = Math.max(1, Math.floor(sliderAmount / 2500));

  const quickAmounts = [2500, 5000, 10000, 25000, 50000, 100000];

  return (
    <section id="calculator" className="py-24 sm:py-32 bg-white relative border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#4E8B65] bg-[#4E8B65]/10 border border-[#4E8B65]/20 mb-4">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Impact Calculator
            </div>

            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#0F1F16] leading-tight tracking-tight mb-4">
              Calculate Your 80G Tax Benefit & Social Multiplier.
            </h2>

            <p className="text-base text-[#5A6B62] leading-relaxed mb-6">
              Under Section 80G of the Indian Income Tax Act, 50% of your total donation is directly deductible from your taxable gross income. Adjust the slider to see your exact tax relief and the tangible human lives empowered.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.05] space-y-2.5 text-xs text-[#5A6B62]">
              <div className="flex items-center gap-2 font-semibold text-[#1C3D2F]">
                <ShieldCheck className="w-4 h-4 text-[#4E8B65]" />
                Direct Government Form 10BE Integration
              </div>
              <p className="text-[11px] leading-relaxed">
                Your PAN details are securely filed directly with the Income Tax Department, auto-populating your pre-filled ITR tax return at year-end.
              </p>
            </div>
          </div>

          {/* Right Interactive Calculator Container (Double-bezel architecture) */}
          <div className="rounded-3xl p-2 bg-black/[0.03] border border-black/[0.07] shadow-xl shadow-[#1C3D2F]/5">
            <div className="rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-8 bg-white border border-black/[0.04]">
              {/* Amount Display & Quick Select */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Donation Amount
                  </span>
                  <span className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-[#1C3D2F] font-bold">
                    ₹{sliderAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={sliderAmount}
                  onChange={(e) => setSliderAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1C3D2F] mb-4"
                />

                {/* Quick Chips */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSliderAmount(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        sliderAmount === amt
                          ? 'bg-[#1C3D2F] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tax Exemption Highlight Card */}
              <div className="p-4 rounded-2xl bg-[#1C3D2F] text-[#F0F5F2] mb-6 shadow-md">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                  <span className="text-[#A3D9B5]">Section 80G Deductible Amount:</span>
                  <span className="font-bold font-mono text-sm text-white">
                    ₹{taxExemption80G.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-3">
                  <span className="text-[#A3D9B5]">Estimated Tax Savings (30% Bracket):</span>
                  <span className="font-bold font-mono text-sm text-[#A3D9B5]">
                    ~ ₹{estimatedTaxSaved.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Social Deliverables Grid */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Direct Tangible Outcomes Funded
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04] flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4E8B65]/15 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-[#1C3D2F]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1C3D2F] text-sm leading-tight">
                        {ambulanceRuns} Runs
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Emergency Mobile Care
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04] flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4E8B65]/15 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-[#1C3D2F]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1C3D2F] text-sm leading-tight">
                        {maternalKits} Kits
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Maternal Nutrition Packs
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04] flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4E8B65]/15 flex items-center justify-center shrink-0">
                      <Sprout className="w-4 h-4 text-[#1C3D2F]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1C3D2F] text-sm leading-tight">
                        {farmerTrainingHours} Hours
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Agri-Tech Field Training
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04] flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4E8B65]/15 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-[#1C3D2F]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1C3D2F] text-sm leading-tight">
                        {coldStorageDays} Days
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Solar Pod Clean Storage
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onDonateAmount(sliderAmount)}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#1C3D2F] text-white hover:bg-[#142D1C] shadow-lg shadow-[#1C3D2F]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Donate ₹{sliderAmount.toLocaleString('en-IN')} & Get 80G Receipt</span>
                <ArrowRight className="w-4 h-4 text-[#A3D9B5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
