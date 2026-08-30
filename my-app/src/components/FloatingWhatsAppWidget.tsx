import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { TMF_META } from '../data/tmfVerifiedData';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phone = '919143430927';
  const defaultText = encodeURIComponent(
    'Hello Tribeni Minati Foundation, I would like to inquire about your rural education and welfare programs.'
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = customMsg.trim()
      ? encodeURIComponent(customMsg)
      : defaultText;
    window.open(`https://wa.me/${phone}?text=${textToSend}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Message Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200/80 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center">
                  <img
                    src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                    alt="TMF Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">
                    {TMF_META.name}
                  </div>
                  <div className="text-[10px] text-emerald-100 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Official 24/7 Helpline Desk</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-slate-50 space-y-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/60 shadow-xs text-xs text-slate-700 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                নমস্কার! <strong>ত্রিবেনী মিনতি ফাউন্ডেশনে</strong> আপনাকে স্বাগতম। আপনি কীভাবে অবদান রাখতে বা যোগাযোগ করতে চান?
              </div>

              <form onSubmit={handleSend} className="space-y-2">
                <textarea
                  rows={2}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="আপনার মেসেজ লিখুন (যেমন: ডোনেশন / ভলান্টিয়ার)..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-hidden focus:border-[#25D366] text-slate-800 placeholder-slate-400 resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/30 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp Support Desk"
        className="relative group p-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-xl shadow-[#25D366]/40 flex items-center gap-2.5 cursor-pointer border-2 border-white"
      >
        <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.82 2.791.82 3.181 0 5.767-2.586 5.767-5.766.001-3.181-2.585-5.766-5.767-5.766zm9.969 5.828c0 5.523-4.477 10-10 10-1.748 0-3.385-.45-4.814-1.238l-4.186 1.097 1.116-4.084c-.878-1.488-1.386-3.224-1.386-5.075 0-5.523 4.477-10 10-10s10 4.477 10 10z" />
        </svg>

        <span className="hidden sm:inline-block text-xs font-bold tracking-wide pr-1">
          Chat on WhatsApp
        </span>

        {/* Ping Dot */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white" />
      </motion.button>
    </div>
  );
};
