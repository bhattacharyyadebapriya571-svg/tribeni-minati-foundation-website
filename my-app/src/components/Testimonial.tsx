import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/foundationData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const current = TESTIMONIALS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="py-24 sm:py-28 bg-[#F2F7F4] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={SPRING}
          className="text-center relative"
        >
          {/* Quote Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#4E8B65]/15 text-[#1C3D2F] flex items-center justify-center mx-auto mb-6">
            <Quote className="w-6 h-6" />
          </div>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
            >
              <p className="font-['DM_Serif_Display'] italic text-xl sm:text-2xl lg:text-3xl text-[#1C3D2F] leading-relaxed tracking-tight max-w-3xl mx-auto">
                "{current.quote}"
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C3D2F] text-white flex items-center justify-center font-bold text-xs">
                  {current.avatarText}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-[#111111]">{current.author}</div>
                  <div className="text-xs text-[#6B7A72]">
                    {current.role}, <strong>{current.organization}</strong>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-black/10 bg-white hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-6 bg-[#1C3D2F]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-black/10 bg-white hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
