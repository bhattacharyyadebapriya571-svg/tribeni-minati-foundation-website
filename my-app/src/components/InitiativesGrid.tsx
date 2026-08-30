import React from 'react';
import type { PageId } from '../types';

interface InitiativesGridProps {
  onNavigate: (page: PageId, programId?: string) => void;
}

export const InitiativesGrid: React.FC<InitiativesGridProps> = ({ onNavigate }) => {
  const initiatives = [
    {
      id: 'education',
      title: 'Free Child Remedial Education Center',
      desc: 'Providing supplemental education to underprivileged children to ensure they stay on track with their academic goals.',
      image: '/tmf-assets/real-field-photos/tmf-field-1.jpeg',
      badge: 'Education',
      stat: '500+ Children Enrolled',
    },
    {
      id: 'winter-relief',
      title: 'Infant Winter Bedding & Essentials Drive',
      desc: 'Protecting vulnerable infants from harsh winters by distributing specialized bedding and warm clothing.',
      image: '/tmf-assets/real-field-photos/tmf-field-14.jpeg',
      badge: 'Relief',
      stat: '1,200 Kits Distributed',
    },
    {
      id: 'healthcare',
      title: 'Rural Healthcare & Nutrition Support',
      desc: 'Organizing medical camps and providing nutritional supplements to communities lacking basic healthcare access.',
      image: '/tmf-assets/real-field-photos/tmf-field-22.jpeg',
      badge: 'Healthcare',
      stat: '3,500+ Patients Treated',
    },
  ];

  return (
    <section className="w-full py-16 lg:py-32 bg-transparent reveal active">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal active">
          <div className="max-w-2xl">
            <span className="font-label-caps text-xs text-[#4b41e1] tracking-widest uppercase mb-3 block">
              Action on the ground
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#191c1e]">
              Core Initiatives
            </h2>
          </div>
          <button
            onClick={() => onNavigate('programs')}
            className="flex items-center gap-2 text-[#4b41e1] font-semibold hover:text-[#645efb] transition-colors group px-4 py-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
          >
            <span>View all reports</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* 3 Core Initiative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onNavigate('program', item.id)}
              className={`group flex flex-col gap-6 cursor-pointer reveal stagger-${index + 1} active`}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-label-caps text-[10px] text-[#4b41e1] font-bold">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-headline-md text-xl font-bold text-[#191c1e] mb-2 group-hover:text-[#4b41e1] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body-base text-sm text-[#45464d] line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-3 font-mono text-xs font-bold text-[#4b41e1]">
                  {item.stat}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
