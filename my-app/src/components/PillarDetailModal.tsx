import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, HeartHandshake, Sparkles, Activity, GraduationCap, Users, Sprout, Truck, ShieldAlert } from 'lucide-react';
import type { PillarItem } from '../types';

interface PillarDetailModalProps {
  pillar: PillarItem | null;
  onClose: () => void;
  onDonatePillar: (pillarTitle: string) => void;
}

export const PillarDetailModal: React.FC<PillarDetailModalProps> = ({
  pillar,
  onClose,
  onDonatePillar,
}) => {
  if (!pillar) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#1C3D2F]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#1C3D2F]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#1C3D2F]" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-[#1C3D2F]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#1C3D2F]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#1C3D2F]" />;
      default:
        return <Activity className="w-6 h-6 text-[#1C3D2F]" />;
    }
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
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-black/[0.08]"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-[#FAFAFA] border-b border-black/[0.06] flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#4E8B65]/15 flex items-center justify-center border border-[#4E8B65]/20">
                {getIcon(pillar.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4E8B65]">
                  {pillar.tag} Vertical
                </span>
                <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-[#0F1F16] mt-0.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#3D6B4F] font-medium mt-1">
                  {pillar.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Long description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] mb-2">
                Executive Overview
              </h4>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                {pillar.longDescription}
              </p>
            </div>

            {/* Metrics grid */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] mb-3">
                Key Performance Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pillar.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-black/[0.04] text-center"
                  >
                    <div className="font-['DM_Serif_Display'] text-xl text-[#1C3D2F] font-bold">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-[#718096] font-medium mt-1 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights bullet list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] mb-3">
                Infrastructure & Operational Deliverables
              </h4>
              <ul className="space-y-2.5">
                {pillar.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D3748]">
                    <CheckCircle className="w-4 h-4 text-[#4E8B65] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SDG Alignment */}
            <div className="pt-3 border-t border-black/[0.06]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] mb-2">
                United Nations SDG Alignment
              </h4>
              <div className="flex flex-wrap gap-2">
                {pillar.sdgGoals.map((sdg) => (
                  <span
                    key={sdg}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1C3D2F]/5 text-[#1C3D2F] border border-[#1C3D2F]/10"
                  >
                    {sdg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-[#FAFAFA] border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#718096] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4E8B65]" />
              Eligible for 50% 80G Tax Exemption
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl border border-black/10 text-gray-700 hover:bg-black/5 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onDonatePillar(pillar.title);
                }}
                className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#1C3D2F] text-white hover:bg-[#142D1C] shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-[#A3D9B5]" />
                Fund This Initiative
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
