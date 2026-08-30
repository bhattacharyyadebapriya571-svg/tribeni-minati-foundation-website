import React, { useState } from 'react';
import { STORIES_OF_CHANGE } from '../data/foundationData';
import { ArrowLeft, X, Sparkles, MapPin, Quote, Heart, Eye } from 'lucide-react';
import type { PageId, StoryItem } from '../types';

interface ImpactStoriesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: (presetAmount?: number, cause?: string) => void;
}

export const ImpactStoriesPage: React.FC<ImpactStoriesPageProps> = ({ onNavigate, onOpenDonate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  const categories = ['All', 'Healthcare', 'Education', 'Women Empowerment', 'Farming & Livelihood'];

  const filteredStories =
    selectedCategory === 'All'
      ? STORIES_OF_CHANGE
      : STORIES_OF_CHANGE.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb Back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Flagship Overview
        </button>

        {/* Page Hero */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Voices of Grassroots Transformation
          </div>
          <h1 className="font-['DM_Serif_Display'] text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
            Real Work. Real Change. Stories of Hope Across Bengal.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Documentary accounts of individuals and community collectives whose lives were transformed by Minati free education coaching, neonatal winter infant bedding, and mobile clinical care.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 border border-blue-600'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="p-1 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveStory(story)}
            >
              <div className="rounded-[calc(1.5rem-0.25rem)] overflow-hidden flex flex-col justify-between h-full bg-white">
                {/* Photo Header */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={story.imageUrl || '/tmf-assets/5.jpg'}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-900 backdrop-blur-md shadow-sm">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{story.location}</span>
                    </div>

                    <h3 className="font-['DM_Serif_Display'] text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {story.beforeSituation} {story.afterTransformation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Read Full Story
                    </span>
                    <Quote className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Modal Lightbox */}
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl text-slate-900 max-h-[90vh] flex flex-col">
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                  {activeStory.category} · {activeStory.location}
                </span>
                <button
                  onClick={() => setActiveStory(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={activeStory.imageUrl || '/tmf-assets/5.jpg'}
                    alt={activeStory.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-['DM_Serif_Display'] text-2xl sm:text-3xl text-slate-900">
                    {activeStory.title}
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700 leading-relaxed">
                    <p><strong>Before Intervention:</strong> {activeStory.beforeSituation}</p>
                    <p><strong>Impact & Transformation:</strong> {activeStory.afterTransformation}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80">
                  <Quote className="w-6 h-6 text-amber-600 mb-2" />
                  <p className="text-sm text-amber-900 italic font-serif">
                    "{activeStory.quote}"
                  </p>
                  <div className="text-xs text-amber-800 font-bold mt-2">
                    — {activeStory.beneficiaryName}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onOpenDonate(2500, `Story: ${activeStory.title}`);
                      setActiveStory(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Support More Lives Like {activeStory.beneficiaryName.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
