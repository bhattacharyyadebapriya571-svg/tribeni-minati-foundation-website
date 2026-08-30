import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard3D } from './TiltCard3D';
import { ThumbsUp, MessageCircle, Share2, ExternalLink, Camera, Eye, X, CheckCircle } from 'lucide-react';

interface FacebookPostItem {
  id: string;
  author: string;
  authorBadge: string;
  timestamp: string;
  location: string;
  text: string;
  bengaliText: string;
  category: 'Winter Relief' | 'Education' | 'Women Empowerment' | 'Nutrition' | 'Health Camps';
  imagePath: string;
  likes: number;
  comments: number;
  shares: number;
  fbPostUrl: string;
}

const FB_POSTS_DATA: FacebookPostItem[] = [
  {
    id: 'field-1',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Field Record 2026',
    location: 'Jotkamal Free Coaching Center, Hooghly',
    text: 'Free Remedial Education Class in full session: Mentoring underprivileged Class I-X students in Mathematics, Science, and English with free books & stationery.',
    bengaliText: 'মিনতি অবৈতনিক শিক্ষা নিকেতনে শিশুদের পাঠদান ও পাঠ্যপুস্তক বিতরণ।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-1.jpeg',
    likes: 214,
    comments: 48,
    shares: 65,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-2',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Education Mission',
    location: 'Tribeni Education Hub',
    text: 'Classroom Mentoring & Digital Study Sessions for first-generation rural school learners.',
    bengaliText: 'শ্রেণিকক্ষে শিক্ষার্থীদের পাঠদান ও মেধা বিকাশ কর্মসূচি।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-2.jpeg',
    likes: 189,
    comments: 34,
    shares: 52,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-3',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Winter Relief 2026',
    location: 'Sajal Mancha, Khanpur, Hooghly',
    text: 'Infant Winter Bedding & Blanket Distribution: Providing custom mosquito-netted warm bedding sets to rural mothers.',
    bengaliText: 'মা ও নবজাতক শিশুদের মাঝে সুরক্ষিত মশারিযুক্ত বেডিং ও কম্বল প্রদান।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-3.jpg',
    likes: 278,
    comments: 52,
    shares: 89,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-4',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Nutrition & Annapurna',
    location: 'Village Community Kitchen',
    text: 'Annapurna Midday Feeding: Freshly prepared nutritious hot meals for children and destitute elders.',
    bengaliText: 'অন্নপূর্ণা গ্রামীণ পুষ্টি কর্মসূচি — সহায়হীন শিশুদের পুষ্টিকর খাবার বিতরণ।',
    category: 'Nutrition',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-4.jpg',
    likes: 194,
    comments: 36,
    shares: 58,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-5',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Healthcare Outreach',
    location: 'Mogra & Tribeni Health Saturday Camp',
    text: 'Free Comprehensive Eye & General Health Screening: Doctor consultations and free prescribed medicines.',
    bengaliText: 'বিনামূল্যে চক্ষু পরীক্ষা ও অভিজ্ঞ চিকিৎসকদের দ্বারা স্বাস্থ্য শিবির।',
    category: 'Health Camps',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-5.jpg',
    likes: 230,
    comments: 42,
    shares: 71,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-6',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Community Gathering',
    location: 'Hooghly District Zone',
    text: 'Community social welfare assembly building awareness on education and preventive healthcare.',
    bengaliText: 'সমাজকল্যাণ ও স্বাস্থ্য সচেতনতা বিষয়ক উন্মুক্ত গ্রামীণ সমাবেশ।',
    category: 'Nutrition',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-6.jpeg',
    likes: 165,
    comments: 29,
    shares: 44,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-7',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Winter Warmth',
    location: 'Dhaniakhali Rural Hamlets',
    text: 'Warm winter fleeces and blankets handed over to village mothers and newborn babies.',
    bengaliText: 'শীতের রাতে গ্রামীণ প্রসূতি মা ও শিশুদের সুরক্ষায় শীতবস্ত্র বিতরণ।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-7.jpeg',
    likes: 245,
    comments: 51,
    shares: 82,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-8',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Coaching Class',
    location: 'Jotkamal Youth Sangha Hall',
    text: 'Happy faces of students during interactive weekend coaching classes.',
    bengaliText: 'মিনতি পাঠশালায় ক্লাসের ফাঁকে হাসিমুখে শিক্ষার্থীরা।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-8.jpeg',
    likes: 198,
    comments: 37,
    shares: 64,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-9',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Stationery Handover',
    location: 'Tribeni Coaching Center',
    text: 'Distributing geometry sets, notebooks, pens, and schoolbags to deserving students.',
    bengaliText: 'ছাত্র-ছাত্রীদের পাঠ্যবই, খাতা ও শিক্ষা উপকরণ উপহার প্রদান।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-9.jpeg',
    likes: 220,
    comments: 45,
    shares: 76,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-10',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Prescription Camp',
    location: 'Rural Health Outreaches',
    text: 'Doctors conducting vitals checkups and handing out free essential antibiotics and vitamins.',
    bengaliText: 'চিকিৎসকদের দ্বারা প্রেসক্রিপশন ও বিনামূল্যে ওষুধ বিতরণ।',
    category: 'Health Camps',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-10.jpeg',
    likes: 178,
    comments: 31,
    shares: 55,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-11',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Elderly Blanket Drive',
    location: 'Tarakeswar Sector',
    text: 'Door-to-door distribution of warm woolen blankets to destitute senior citizens.',
    bengaliText: 'স্বেচ্ছাসেবকদের মাধ্যমে অসহায় বয়স্কদের মাঝে শীতের কম্বল বিতরণ।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-11.jpeg',
    likes: 215,
    comments: 40,
    shares: 68,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-12',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Women Skill Mission',
    location: 'Swabhiman Craft Workstation',
    text: 'Vocational handloom, pattern making, and sewing training empowering village women.',
    bengaliText: 'স্বাবলম্বন প্রকল্পের আওতায় গ্রামীণ মহিলাদের হাতের কাজ ও সেলাই প্রশিক্ষণ।',
    category: 'Women Empowerment',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-12.jpeg',
    likes: 260,
    comments: 58,
    shares: 93,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-13',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Child Nutrition Drive',
    location: 'Tribeni Ward 4',
    text: 'Providing clean drinking water bottles, milk supplements, and healthy snacks to kids.',
    bengaliText: 'শিশুদের সুষম পুষ্টি, স্বাস্থ্যকর খাবার ও দুধ বিতরণ কর্মসূচি।',
    category: 'Nutrition',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-13.jpeg',
    likes: 184,
    comments: 33,
    shares: 49,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-14',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Relief Logistics',
    location: 'Gopinagar Belt',
    text: 'Relief packaging and field mobilization by dedicated youth volunteers.',
    bengaliText: 'ত্রাণ সামগ্রী বণ্টন ও গ্রামভিত্তিক স্বেচ্ছাসেবক কার্যক্রম।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-14.jpeg',
    likes: 156,
    comments: 25,
    shares: 39,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-15',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Creative Workshop',
    location: 'Minati Coaching Class',
    text: 'Art and talent development workshop encouraging creativity among young learners.',
    bengaliText: 'শিক্ষার্থীদের অঙ্কন ও মেধা বিকাশ বিষয়ক বিশেষ কর্মশালা।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-15.jpeg',
    likes: 205,
    comments: 41,
    shares: 67,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-16',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Blood Donation',
    location: 'District Health Wing',
    text: 'Voluntary Blood Donation Drive contributing vital units to government blood banks for thalassemia children.',
    bengaliText: 'থ্যালাসেমিয়া আক্রান্ত শিশুদের জীবন রক্ষার্থে রক্তদান শিবির।',
    category: 'Health Camps',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-16.jpeg',
    likes: 295,
    comments: 64,
    shares: 110,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-17',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Elderly Welfare',
    location: 'Hooghly Remote Villages',
    text: 'Elderly destitute assistance providing thermal clothing, walking sticks, and dry food packs.',
    bengaliText: 'অসহায় ও বয়োবৃদ্ধ নাগরিকদের সাহায্য ও সার্বিক সেবা প্রদান।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-17.jpeg',
    likes: 172,
    comments: 28,
    shares: 46,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-18',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Ration Aid',
    location: 'Tribeni Block',
    text: 'Dry ration kit distribution containing rice, pulses, mustard oil, and salt.',
    bengaliText: 'দরিদ্র পরিবারের মাঝে চাল, ডাল ও তেলের প্যাকেট প্রদান।',
    category: 'Nutrition',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-18.jpeg',
    likes: 228,
    comments: 46,
    shares: 79,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-19',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Infant Sleeping Wrap Demo',
    location: 'Maternal Care Outpost',
    text: 'Demonstration and distribution of mosquito-netted thermal sleep wraps for newborns.',
    bengaliText: 'মশারিযুক্ত বেডিং ও শিশুর স্বাস্থ্য সুরক্ষা সামগ্রী বিতরণ।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-19.jpeg',
    likes: 190,
    comments: 35,
    shares: 59,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-20',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Foundation Day',
    location: 'Corporate Office',
    text: 'Celebrating years of dedicated grassroots humanitarian service across Eastern India.',
    bengaliText: 'ফাউন্ডেশনের বার্ষিক প্রতিষ্ঠা দিবস ও সমাজসেবীদের সংবর্ধনা।',
    category: 'Nutrition',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-20.jpeg',
    likes: 310,
    comments: 72,
    shares: 125,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-21',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Free School Bag Drive',
    location: 'Minati Pathshala',
    text: 'Smiles of joy as rural children receive brand new school bags and study materials.',
    bengaliText: 'স্কুল ব্যাগ ও নতুন খাতা পেয়ে শিশুদের মুখের অমূল্য হাসি।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-21.jpeg',
    likes: 255,
    comments: 54,
    shares: 88,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-22',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Tribal Settlement Camp',
    location: 'Tribal Village',
    text: 'Reaching deep interior tribal hamlets with winter fleece blankets and health kits.',
    bengaliText: 'প্রান্তিক আদিবাসী পল্লীতে শীতবস্ত্র বিতরণ ও মানবিক সহায়তা।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-22.jpeg',
    likes: 280,
    comments: 60,
    shares: 98,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-23',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Emergency First Aid',
    location: 'Rural Health Taskforce',
    text: 'Emergency first aid kits and vital medicines dispatched to flood-prone rural areas.',
    bengaliText: 'জরুরি প্রাথমিক চিকিৎসা ও প্রয়োজনীয় ওষুধ পৌঁছে দেওয়া।',
    category: 'Health Camps',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-23.jpeg',
    likes: 185,
    comments: 32,
    shares: 53,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-24',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Youth Brigade',
    location: 'Youth Center',
    text: 'Passionate youth leaders and volunteers driving change in rural Hooghly communities.',
    bengaliText: 'ত্রিবেনী মিনতি ফাউন্ডেশনের নিবেদিত যুব স্বেচ্ছাসেবক বাহিনী।',
    category: 'Women Empowerment',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-24.jpeg',
    likes: 235,
    comments: 49,
    shares: 80,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-25',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Maternal Care',
    location: 'Maternal Welfare Wing',
    text: 'Maternal nutrition supplements and baby care packages provided to nursing mothers.',
    bengaliText: 'প্রসূতি মায়েদের পুষ্টিকর খাদ্য ও সুরক্ষাসামগ্রী প্রদান।',
    category: 'Winter Relief',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-25.jpeg',
    likes: 210,
    comments: 44,
    shares: 70,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
  {
    id: 'field-26',
    author: 'Tribeni Minati Foundation',
    authorBadge: 'Official Page',
    timestamp: 'Our Reward',
    location: 'Hooghly Learning Center',
    text: '"...your smile, our reward..." — The genuine joy of children experiencing quality education and caring guidance.',
    bengaliText: '"...আপনার হাসি, আমাদের পুরস্কার..." — শিশুদের নির্মল আনন্দ।',
    category: 'Education',
    imagePath: '/tmf-assets/real-field-photos/tmf-field-26.jpeg',
    likes: 340,
    comments: 85,
    shares: 145,
    fbPostUrl: 'https://www.facebook.com/tribeniminatifoundation/',
  },
];

export const FacebookLiveGallery3D: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<FacebookPostItem | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Winter Relief', 'Education', 'Health Camps', 'Women Empowerment', 'Nutrition'];

  const filteredPosts = selectedCategory === 'All'
    ? FB_POSTS_DATA
    : FB_POSTS_DATA.filter((p) => p.category === selectedCategory);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <section id="social-live" className="py-24 sm:py-32 bg-slate-50 text-slate-900 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background Soft Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1877F2] bg-blue-50 border border-blue-200 mb-4 shadow-xs">
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Live Social Media Activity</span>
            </div>
            <h2 className="font-['DM_Serif_Display'] text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
              Grassroots Field Updates & Community Posts
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Real-time grassroots updates, relief distribution photo archives, and community dispatches synced directly from our verified Facebook page <strong>@tribeniminatifoundation</strong>.
            </p>
          </div>

          {/* Direct Link Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.facebook.com/tribeniminatifoundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1877F2] text-white hover:bg-[#166FE5] transition-all shadow-md shadow-blue-500/20 font-bold text-xs cursor-pointer group active:scale-98"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Follow FB Page</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://www.facebook.com/tribeniminatifoundation/photos_by"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
            >
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>View All Photos ({FB_POSTS_DATA.length})</span>
            </a>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Interactive Social Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const displayLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <TiltCard3D key={post.id} intensity={8}>
                <div className="rounded-[2.2rem] p-1 bg-white border border-slate-200/90 hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                  <div className="rounded-[calc(2.2rem-0.25rem)] bg-white flex flex-col justify-between h-full overflow-hidden">
                    {/* Post Header */}
                    <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 p-0.5 shadow-xs shrink-0 border border-slate-200">
                          <img
                            src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                            alt="TMF Avatar"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900">
                              {post.author}
                            </span>
                            <CheckCircle className="w-3.5 h-3.5 text-[#1877F2] fill-[#1877F2]/20" />
                          </div>
                          <div className="text-[10px] text-blue-700 font-mono flex items-center gap-2">
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <span>{post.location}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Text */}
                    <div className="p-5 py-3 space-y-2 flex-1">
                      <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                        {post.text}
                      </p>
                      <p className="text-[11px] text-amber-800 leading-relaxed line-clamp-2 italic font-['Hind_Siliguri',sans-serif]">
                        {post.bengaliText}
                      </p>
                    </div>

                    {/* Post Photo */}
                    <div
                      onClick={() => setSelectedPost(post)}
                      className="relative aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer group/photo"
                    >
                      <img
                        src={post.imagePath}
                        alt={post.text}
                        className="w-full h-full object-cover object-center group-hover/photo:scale-106 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span className="text-xs text-white font-semibold flex items-center gap-1">
                          <Eye className="w-4 h-4 text-amber-400" /> Click to Inspect
                        </span>
                        <span className="text-[10px] text-slate-200 font-mono">
                          Full Photo View
                        </span>
                      </div>
                    </div>

                    {/* Engagement Bar */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-colors cursor-pointer ${
                          isLiked
                            ? 'text-[#1877F2] font-bold bg-blue-50'
                            : 'hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{displayLikes}</span>
                      </button>

                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5 text-slate-400" />
                          {post.shares}
                        </span>
                      </div>

                      <a
                        href={post.fbPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1877F2] hover:underline font-semibold flex items-center gap-1 text-[11px]"
                      >
                        <span>Open FB</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Fullscreen Post Image Lightbox */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl text-slate-900 max-h-[90vh] flex flex-col"
              >
                <div className="p-4 sm:p-5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-slate-200">
                      <img
                        src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                        alt="TMF"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">
                        {selectedPost.author} · {selectedPost.location}
                      </div>
                      <div className="text-[10px] text-blue-700">
                        {selectedPost.category}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={selectedPost.imagePath}
                    alt={selectedPost.text}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-800 font-medium">
                      {selectedPost.text}
                    </p>
                    <p className="text-[11px] text-amber-800 mt-1 italic font-['Hind_Siliguri',sans-serif]">
                      {selectedPost.bengaliText}
                    </p>
                  </div>

                  <a
                    href={selectedPost.fbPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors shrink-0 shadow-md"
                  >
                    <span>View Post on FB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
