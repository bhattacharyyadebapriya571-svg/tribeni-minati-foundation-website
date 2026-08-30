import React, { useState } from 'react';
import { Quote, Heart, ArrowRight, CheckCircle2, Sparkles, MapPin } from 'lucide-react';

interface StoryOfChangeSectionProps {
  onOpenDonate?: (presetAmount?: number, cause?: string) => void;
}

const HUMAN_STORIES = [
  {
    id: 'story-education',
    eyebrow: 'Illiterate · Free Education',
    title: 'From Child Labor to Class Topper: The Story of 9-Year-Old Riya',
    location: 'Bandel Slum Cluster, Hooghly, WB',
    photo: '/tmf-assets/generated/education-banyan.jpg',
    challenge:
      'Riya’s parents worked as daily-wage brickfield laborers. Due to extreme financial distress, Riya was out of school and tending younger siblings with no access to books or midday meals.',
    intervention:
      'Tribeni Minati Foundation enrolled Riya into the Minati Free Education Center, providing free textbooks, stationery, nutritional midday snacks, and daily remedial tutoring.',
    result:
      'Within 14 months, Riya ranked in the top 5% of her government primary school and now aspires to become a district medical officer.',
    quote:
      'Minati Foundation gave my daughter a slate, a schoolbag, and the courage to dream beyond the brick kilns.',
    author: 'Sunita Majhi (Mother)',
    stat: '6,400+ Children Enrolled',
  },
  {
    id: 'story-women',
    eyebrow: 'Abused · Women Self-Reliance',
    title: 'How a Sewing Machine Rebuilt Poly’s Family After Rural Floods',
    location: 'Dhaniakhali, Hooghly, WB',
    photo: '/tmf-assets/generated/women-tailoring.jpg',
    challenge:
      'Monsoon floodwaters destroyed their mud cottage and standing crops. Without a secondary income source, Poly was struggling to feed her two infants.',
    intervention:
      'Under the Minati Women Self-Help Mission, Poly received an intensive 90-day tailoring certification and a sponsored motorized sewing workstation.',
    result:
      'Poly now runs a thriving home boutique, earning ₹8,500 monthly and independently financing her children’s English-medium coaching.',
    quote:
      'I am no longer dependent on debt. My hands now build our future every single day.',
    author: 'Poly Ghosh (Micro-Entrepreneur)',
    stat: '3,200+ Women Certified',
  },
  {
    id: 'story-winter',
    eyebrow: 'Needy · Humanitarian Winter Relief',
    title: 'Warmth and Survival: Insulated Care for 1,200 Rural Newborns',
    location: 'Khanpur & Mogra Rural Hamlets, WB',
    photo: '/tmf-assets/generated/winter-relief.jpg',
    challenge:
      'During biting December frost, mud huts lack insulation. Rural infants face severe neonatal hypothermia, pneumonia, and mosquito-borne illnesses without proper bedding.',
    intervention:
      'Tribeni Minati Foundation volunteers distributed custom mosquito-netted insulated bedding sets and warm woolen packages directly to vulnerable mothers.',
    result:
      'Zero reported neonatal frost complications across targeted hamlets, directly benefiting over 1,200 village infants and nursing mothers.',
    quote:
      'The insulated bedding protected my one-month baby from both the freezing winter nights and malaria mosquitoes.',
    author: 'Anjali Soren (Beneficiary Mother)',
    stat: '1,200+ Infants Protected',
  },
  {
    id: 'story-health',
    eyebrow: 'Minorities & Tribal Healthcare',
    title: 'Restoring Vision and Hope: Bimal Babu’s Cataract Surgery Support',
    location: 'Tarakeshwar Rural Health Center, WB',
    photo: '/tmf-assets/generated/rural-health.jpg',
    challenge:
      '72-year-old agricultural laborer Bimal had lost over 80% vision to bilateral cataracts and could not afford specialist clinical screening or spectacles.',
    intervention:
      'TMF’s Free Rural Health Saturday screened Bimal, provided free corrective lenses, and arranged sponsored surgical recovery.',
    result:
      'Bimal regained clear sight and returned to independent living, while 450+ other villagers received free life-saving medicines.',
    quote:
      'Doctors came right to our village doorstep. I can see the green paddy fields and my grandchildren’s faces again.',
    author: 'Bimal Santra (72 yrs, Tarakeshwar)',
    stat: '9,800+ Patients Treated',
  },
];

export const StoryOfChangeSection: React.FC<StoryOfChangeSectionProps> = ({ onOpenDonate }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const story = HUMAN_STORIES[activeStoryIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#FCFBF7] relative overflow-hidden border-t border-black/[0.06]">
      {/* Subtle Background Warm Accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Real Human Stories · Ground Impact
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-[#141A16] leading-tight">
              From Grassroots Struggle to Lasting Dignity
            </h2>
          </div>

          {/* Story Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/[0.03] border border-black/[0.06]">
            {HUMAN_STORIES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStoryIndex === idx
                    ? 'bg-white text-[#1B3B2B] shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Story 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Storytelling Double-Bezel Card */}
        <div className="p-2 sm:p-3 rounded-[2.5rem] bg-black/[0.03] border border-black/[0.06] shadow-lg">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-white border border-black/[0.05] p-8 sm:p-12 lg:p-14">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              {/* Left Story Narrative */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-700 font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>{story.location}</span>
                  </div>

                  <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-4xl text-[#141A16] leading-tight">
                    {story.title}
                  </h3>
                </div>

                {/* 3-Step Story Spine */}
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-black/[0.06] space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600">
                      01 · The Grassroots Challenge
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {story.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-black/[0.06] space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                      02 · The Minati Foundation Intervention
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {story.intervention}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      03 · The Transformative Result
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                      {story.result}
                    </p>
                  </div>
                </div>

                {/* Beneficiary Quote */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <Quote className="w-6 h-6 text-amber-600" />
                  <p className="text-sm font-serif italic text-amber-950">
                    "{story.quote}"
                  </p>
                  <div className="text-xs font-bold text-amber-900 pt-1">
                    — {story.author}
                  </div>
                </div>

                {/* Sponsor Button */}
                {onOpenDonate && (
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenDonate(2500, `Sponsor: ${story.title}`)}
                      className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#2A543E] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#1B3B2B]/20 transition-all cursor-pointer group"
                    >
                      <Heart className="w-4 h-4 fill-white/20" />
                      <span>Sponsor a Life Like This (₹2,500)</span>
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Authentic Photography Showcase */}
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-black/10">
                <img
                  src={story.photo}
                  alt={story.title}
                  className="w-full h-full object-cover filter contrast-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                    Grassroots Milestones
                  </div>
                  <div className="font-['DM_Serif_Display'] text-3xl">
                    {story.stat}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
