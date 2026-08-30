import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ExternalLink, Heart } from 'lucide-react';
import { FacebookLiveGallery3D } from '../components/FacebookLiveGallery3D';
import type { PageId } from '../types';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenDonate }) => {
  return (
    <div className="min-h-screen pt-36 sm:pt-44 pb-24 bg-[#F8FAFC] text-slate-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#1877F2] bg-blue-50 border border-blue-200 mb-4">
            <Camera className="w-3.5 h-3.5" />
            Media & Field Activity Archives
          </div>
          <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-6xl text-slate-900 leading-tight tracking-tight">
            Documentary Photo & Social Feed Hub
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Explore authentic photographic records from our on-ground winter relief drives, free education centers, tailoring workshops, and health camps across West Bengal.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="https://www.facebook.com/tribeniminatifoundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold hover:bg-[#166FE5] transition-all shadow-md"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Follow Official Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Sponsor a Relief Drive</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Embedded 3D Social & Photo Activity Matrix */}
      <FacebookLiveGallery3D />
    </div>
  );
};
