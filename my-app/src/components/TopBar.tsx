import React from 'react';
import { PhoneCall, ShieldCheck, HeartHandshake, FileText, Sparkles } from 'lucide-react';
import { FOUNDATION_META } from '../data/foundationData';
import type { PageId } from '../types';

interface TopBarProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate, onOpenDonate }) => {
  return (
    <div className="bg-[#0C1A11] text-white border-b border-white/[0.08] text-[11px] py-2 px-4 sm:px-8 z-50 relative hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Helpline & 80G badge */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${FOUNDATION_META.helpline.split(' ')[0]}`}
            className="flex items-center gap-1.5 text-[#A3D9B5] hover:text-white transition-colors font-medium"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#4E8B65]" />
            <span>24/7 Medical Dispatch: <strong>{FOUNDATION_META.helpline}</strong></span>
          </a>

          <div className="flex items-center gap-1.5 text-gray-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B65]" />
            <span>50% Income Tax Deduction under <strong>Section 80G</strong></span>
          </div>
        </div>

        {/* Right Quick Nav Shortcuts */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => onNavigate('volunteer')}
            className="flex items-center gap-1 text-gray-300 hover:text-[#A3D9B5] transition-colors cursor-pointer"
          >
            <HeartHandshake className="w-3 h-3 text-[#4E8B65]" />
            Volunteer
          </button>

          <button
            onClick={() => onNavigate('transparency')}
            className="flex items-center gap-1 text-gray-300 hover:text-[#A3D9B5] transition-colors cursor-pointer"
          >
            <FileText className="w-3 h-3 text-[#4E8B65]" />
            Audited Reports
          </button>

          <button
            onClick={onOpenDonate}
            className="inline-flex items-center gap-1 text-[#A3D9B5] hover:underline font-semibold cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            UPI Quick Pay
          </button>
        </div>
      </div>
    </div>
  );
};
