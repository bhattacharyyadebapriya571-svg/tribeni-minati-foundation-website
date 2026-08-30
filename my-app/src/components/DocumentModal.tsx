import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import type { LegalDocument } from '../data/tmfVerifiedData';

interface DocumentModalProps {
  document: LegalDocument | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl bg-[#0B150F] rounded-3xl border border-white/15 shadow-2xl overflow-hidden z-10 my-8 text-white flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-black/50 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4E8B65]/20 flex items-center justify-center border border-[#4E8B65]/35 text-[#A3D9B5]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3D9B5] px-2.5 py-0.5 rounded-full bg-[#4E8B65]/20 border border-[#4E8B65]/30">
                    {document.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {document.regNumber}
                  </span>
                </div>
                <h3 className="font-['DM_Serif_Display'] text-xl text-white mt-0.5">
                  {document.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Document Preview Frame */}
          <div className="flex-1 bg-black/90 p-4 min-h-[450px] relative overflow-hidden flex flex-col">
            <iframe
              src={`${document.fileUrl}#toolbar=1&navpanes=0`}
              title={document.title}
              className="w-full h-full flex-1 rounded-xl border border-white/10 bg-white"
            />
          </div>

          {/* Footer Metadata & Download Action */}
          <div className="p-5 sm:p-6 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#4E8B65] shrink-0" />
              <div className="text-gray-300">
                <span>Authority: <strong>{document.authority}</strong></span>
                <span className="mx-2 text-gray-600">|</span>
                <span className="text-[#A3D9B5]">Status: Verified & Active</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>

              <a
                href={document.fileUrl}
                download={document.fileName}
                className="px-5 py-2.5 rounded-xl bg-[#4E8B65] text-white hover:bg-[#3D6B4F] flex items-center gap-1.5 font-bold shadow-lg shadow-[#4E8B65]/30 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
