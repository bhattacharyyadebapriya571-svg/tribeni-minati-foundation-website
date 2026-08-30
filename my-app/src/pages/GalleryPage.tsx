import React, { useState } from 'react';
import type { PageId } from '../types';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDonate: () => void;
}

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'Education' | 'Winter Relief' | 'Healthcare' | 'Women SHG' | 'Community Feeding';
  location: string;
  caption: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  { id: '1', url: '/tmf-assets/real-field-photos/tmf-field-1.jpeg', title: 'Free Child Remedial Center', category: 'Education', location: 'Tribeni Hub', caption: 'Students participating in morning remedial classes with interactive learning boards.' },
  { id: '2', url: '/tmf-assets/real-field-photos/tmf-field-2.jpeg', title: 'Foundational Literacy Batch', category: 'Education', location: 'Mogra Center', caption: 'Rural children learning Bengali alphabet writing and arithmetic.' },
  { id: '3', url: '/tmf-assets/real-field-photos/tmf-field-3.jpeg', title: 'Science & Art Workshop', category: 'Education', location: 'Tribeni Hub', caption: 'Practical model building and drawing sessions for rural youth.' },
  { id: '4', url: '/tmf-assets/real-field-photos/tmf-field-4.jpeg', title: 'School Supplies Distribution', category: 'Education', location: 'Tribeni Hub', caption: 'Free distribution of notebooks, school bags, and stationery sets.' },
  { id: '5', url: '/tmf-assets/real-field-photos/tmf-field-5.jpeg', title: 'Classroom Daily Attendance', category: 'Education', location: 'Mogra Center', caption: 'Daily classroom supervision by dedicated volunteer educators.' },
  { id: '6', url: '/tmf-assets/real-field-photos/tmf-field-6.jpeg', title: 'Student Nutrition Breakfast', category: 'Education', location: 'Tribeni Hub', caption: 'Nutritious morning egg and milk meal before commencement of study.' },
  { id: '7', url: '/tmf-assets/real-field-photos/tmf-field-7.jpeg', title: 'Girls Mentorship Cell', category: 'Education', location: 'Tribeni Hub', caption: 'Adolescent girls guidance program ensuring retention in formal schooling.' },
  { id: '8', url: '/tmf-assets/real-field-photos/tmf-field-8.jpeg', title: 'Parent-Teacher Interaction', category: 'Education', location: 'Mogra Center', caption: 'Sensitization of daily-wage parents regarding continuous schooling.' },
  { id: '9', url: '/tmf-assets/real-field-photos/tmf-field-9.jpeg', title: 'Reading Library Desk', category: 'Education', location: 'Tribeni Hub', caption: 'Children exploring pictorial storybooks and general knowledge encyclopedia.' },
  { id: '10', url: '/tmf-assets/real-field-photos/tmf-field-10.jpeg', title: 'Foundation Headquarters Gathering', category: 'Community Feeding', location: 'Tribeni HQ', caption: 'Community assembly and annual review meeting with village elders.' },
  { id: '11', url: '/tmf-assets/real-field-photos/tmf-field-11.jpeg', title: 'Educational Evaluation Camp', category: 'Education', location: 'Tribeni Hub', caption: 'Term-end learning milestone assessment and certificate awards.' },
  { id: '12', url: '/tmf-assets/real-field-photos/tmf-field-12.jpeg', title: 'Volunteer Teachers Briefing', category: 'Education', location: 'Tribeni HQ', caption: 'Pedagogical training session led by General Secretary Rudra Adhya.' },
  { id: '13', url: '/tmf-assets/real-field-photos/tmf-field-13.jpeg', title: 'Winter Blanket Packing Unit', category: 'Winter Relief', location: 'Tribeni HQ', caption: 'Volunteers bundling insulated heavy-duty blankets for remote delivery.' },
  { id: '14', url: '/tmf-assets/real-field-photos/tmf-field-14.jpeg', title: 'Infant Thermal Bedding Drive', category: 'Winter Relief', location: 'Dhaniakhali', caption: 'Direct distribution of zipped infant mattress kits to rural mothers.' },
  { id: '15', url: '/tmf-assets/real-field-photos/tmf-field-15.jpeg', title: 'Elderly Winter Relief Queue', category: 'Winter Relief', location: 'Radhanagar', caption: 'Dignified blanket handovers to elderly destitute villagers.' },
  { id: '16', url: '/tmf-assets/real-field-photos/tmf-field-16.jpeg', title: 'Doorstep Relief Deployment', category: 'Winter Relief', location: 'Dhaniakhali Hamlets', caption: 'Volunteers delivering winter warmers directly to remote mud households.' },
  { id: '17', url: '/tmf-assets/real-field-photos/tmf-field-17.jpeg', title: 'Village Relief Verification', category: 'Winter Relief', location: 'Tribeni Ghats', caption: 'Statutory beneficiary roll-call ensuring equitable aid allocation.' },
  { id: '18', url: '/tmf-assets/real-field-photos/tmf-field-18.jpeg', title: 'Women Self-Help Tailoring', category: 'Women SHG', location: 'Tribeni Hub', caption: 'Rural women practicing garment stitching on foundation sewing machines.' },
  { id: '19', url: '/tmf-assets/real-field-photos/tmf-field-19.jpeg', title: 'Jute & Fabric Production', category: 'Women SHG', location: 'Tribeni Hub', caption: 'Eco-friendly bag stitching creating micro-entrepreneurship incomes.' },
  { id: '20', url: '/tmf-assets/real-field-photos/tmf-field-20.jpeg', title: 'Artisan Micro-Finance Meeting', category: 'Women SHG', location: 'Tribeni Hub', caption: 'Savings group review and raw materials procurement coordination.' },
  { id: '21', url: '/tmf-assets/real-field-photos/tmf-field-21.jpeg', title: 'Rural Doctor Consultation', category: 'Healthcare', location: 'Mogra Camp', caption: 'Free pediatric diagnostics and vital checkups for rural families.' },
  { id: '22', url: '/tmf-assets/real-field-photos/tmf-field-22.jpeg', title: 'Mobile Clinical Health Camp', category: 'Healthcare', location: 'Dhaniakhali', caption: 'Diagnostic testing, blood pressure screening, and free generic medicines.' },
  { id: '23', url: '/tmf-assets/real-field-photos/tmf-field-23.jpeg', title: 'Eye Examination Camp', category: 'Healthcare', location: 'Tribeni Hub', caption: 'Optometrist checking refractive errors and providing free reading spectacles.' },
  { id: '24', url: '/tmf-assets/real-field-photos/tmf-field-24.jpeg', title: 'Maternal Nutrition Counseling', category: 'Healthcare', location: 'Dhaniakhali', caption: 'Counseling lactating mothers regarding iron, protein, and sanitized water.' },
  { id: '25', url: '/tmf-assets/real-field-photos/tmf-field-25.jpeg', title: 'Community Mid-Day Annadaan', category: 'Community Feeding', location: 'Tribeni Center', caption: 'Hot cooked meal distribution during severe weather emergencies.' },
  { id: '26', url: '/tmf-assets/real-field-photos/tmf-field-26.jpeg', title: 'Emergency Food Kit Packaging', category: 'Community Feeding', location: 'Tribeni HQ', caption: 'Packing staple grains, pulses, mustard oil, and salt for distressed families.' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenDonate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [previewPhoto, setPreviewPhoto] = useState<PhotoItem | null>(null);

  const categories = ['All', 'Education', 'Winter Relief', 'Healthcare', 'Women SHG', 'Community Feeding'];

  const filtered = selectedCat === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === selectedCat);

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      
      {/* Page Header */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              <span>26 Verified Documentary Assets</span>
            </div>

            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#191c1e] tracking-tight leading-tight">
              Visual Records of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b41e1] to-[#645efb]">
                Grassroots Service.
              </span>
            </h1>

            <p className="font-body-lg text-base sm:text-lg text-[#45464d] leading-relaxed">
              Explore photographic proof from our daily remedial coaching centers, winter infant relief deployments, mobile doctor clinics, and women tailoring units in Bengal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/tribeniminatifoundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-white border border-border-subtle rounded-2xl font-bold text-xs uppercase tracking-wider text-[#1877F2] hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Facebook Live Media</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
            <button
              onClick={onOpenDonate}
              className="px-8 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Donate Now (80G)
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#111827] text-white shadow-md'
                  : 'bg-white text-[#45464d] border border-border-subtle hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? `All Photos (${GALLERY_PHOTOS.length})` : `${cat}`}
            </button>
          ))}
        </div>
      </section>

      {/* Photojournalism Grid */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setPreviewPhoto(photo)}
              className="bg-[#f2f4f6] p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="bg-white rounded-[20px] overflow-hidden p-3 flex flex-col h-full justify-between">
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full font-label-caps text-[9px] text-[#4b41e1] font-bold">
                        {photo.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#64748B] mb-1">
                    {photo.location}
                  </div>

                  <h3 className="font-headline-md text-sm font-bold text-[#191c1e] line-clamp-1 group-hover:text-[#4b41e1]">
                    {photo.title}
                  </h3>

                  <p className="font-body-base text-xs text-[#45464d] line-clamp-2 mt-1">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-[#4b41e1]">
                  <span>Enlarge Record</span>
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#191c1e] hover:bg-slate-200 cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={previewPhoto.url}
                  alt={previewPhoto.title}
                  className="w-full h-full object-contain bg-black/5"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-50 text-[#4b41e1] rounded-full text-xs font-bold font-label-caps">
                    {previewPhoto.category}
                  </span>
                  <span className="font-mono text-xs text-[#64748B]">
                    {previewPhoto.location}
                  </span>
                </div>

                <h2 className="font-headline-lg text-2xl font-bold text-[#191c1e]">
                  {previewPhoto.title}
                </h2>

                <p className="font-body-base text-sm sm:text-base text-[#45464d] leading-relaxed">
                  {previewPhoto.caption}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    onOpenDonate();
                    setPreviewPhoto(null);
                  }}
                  className="flex-1 py-4 bg-[#F59E0B] text-[#111827] font-extrabold rounded-2xl text-xs uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
                >
                  Sponsor This Cause (80G)
                </button>
                <a
                  href={previewPhoto.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-[#191c1e] font-bold rounded-2xl text-xs uppercase tracking-wider text-center"
                >
                  Download Asset
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
