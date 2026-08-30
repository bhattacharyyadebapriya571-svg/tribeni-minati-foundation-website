import type {
  PillarItem,
  CampaignItem,
  StoryItem,
  SDGItem,
  PartnerLogoItem,
  StatItem,
  LedgerTransaction,
  StateOperation,
  TestimonialItem,
  FAQItem,
  CertificationItem,
} from '../types';

export const FOUNDATION_META = {
  name: 'Tribeni Minati Foundation',
  shortName: 'Tribeni Minati Foundation',
  initials: 'TMF',
  tagline: 'Transforming Lives. Building a Sustainable Future.',
  projectTitle: 'Project Billion — Est. 2024',
  ngoEntity: 'Tribeni Minati Foundation',
  ngoType: 'Registered Non-Profit Foundation (12A & 80G Certified)',
  ngoCin: 'U85300WB2024NPL123456',
  email: 'info@tribeniminatifoundation.org',
  csrEmail: 'csr@tribeniminatifoundation.org',
  phone: '+91 33 2684 1000',
  helpline: '1800-HELP-247 (1800 435 7247)',
  address: 'Tribeni, Hooghly District, West Bengal — 712503, India',
  delhiLiaison: 'Barakhamba Road, Connaught Place, New Delhi — 110001',
  upiId: 'tribeniminatifoundation@okhdfcbank',
};

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'healthcare',
    tag: 'Healthcare on Wheels',
    title: 'Project HELP!!',
    subtitle: '24/7 Emergency Medical Ambulances & Mobile Clinics',
    body: 'A fully integrated mobile healthcare network deploying ALS emergency ambulances, solar-powered telemedicine stations, and diagnostic screenings to remote villages across 6 states.',
    longDescription:
      'Project HELP!! deploys Advanced Life Support (ALS) mobile clinic units directly to underserved rural panchayats and tribal settlements. Equipped with digital ECGs, point-of-care blood analyzers, ultrasound scanners, and high-speed satellite telemedicine connectivity, rural families receive immediate doctor consultations and emergency tertiary care transfers without catastrophic medical debt.',
    iconName: 'Activity',
    metrics: [
      { label: 'Emergency Dispatches', value: '4,850+' },
      { label: 'Telemedicine Consults', value: '28,000+' },
      { label: 'Avg Rural Response', value: '< 22 mins' },
      { label: 'Diagnostic Camps', value: '140+' },
    ],
    highlights: [
      '24/7 Toll-Free Emergency Dispatch Helpline (1800-HELP-247)',
      'Solar-powered portable ECG, blood analyzer & digital vitals monitor',
      'Direct tie-ups with 14 super-specialty partner tertiary hospitals',
      'Free distribution of life-saving medicines for chronic rural ailments',
    ],
    sdgGoals: ['SDG 3: Good Health & Well-being', 'SDG 10: Reduced Inequalities'],
    beneficiaryQuote: {
      text: 'When my 6-year-old had severe asthma at midnight, the Project HELP!! emergency vehicle arrived in 19 minutes with oxygen and nebulization. It saved his life.',
      author: 'Arup Mukherjee',
      location: 'Hooghly Rural, West Bengal',
    },
  },
  {
    id: 'education',
    tag: 'Mission Education',
    title: 'Shiksha & Bal Kalyan',
    subtitle: 'Holistic Schooling, Digital Classrooms & Nutrition',
    body: 'Bridge learning centers, digital literacy labs, and daily midday nutritional meals for children of daily-wage earners and migrant farmworkers.',
    longDescription:
      'Our Mission Education program ensures no underprivileged child drops out due to poverty. We operate remedial learning centers, provide school supplies and tablets for STEM learning, and distribute fortified nutritional meals to eliminate childhood stunting and learning deficits in rural clusters.',
    iconName: 'GraduationCap',
    metrics: [
      { label: 'Children Enrolled', value: '6,400+' },
      { label: 'Digital STEM Labs', value: '32 Labs' },
      { label: 'Nutrition Meals Daily', value: '8,500+' },
      { label: 'School Retention Rate', value: '96.4%' },
    ],
    highlights: [
      'Smart audio-visual digital classroom modules in regional languages',
      'Daily fortified iron & protein midday nutritional feeding program',
      'Special remedial coaching for first-generation rural school-goers',
      'Bicycle & learning kit distribution for girl students',
    ],
    sdgGoals: ['SDG 4: Quality Education', 'SDG 2: Zero Hunger', 'SDG 5: Gender Equality'],
    beneficiaryQuote: {
      text: 'I am the first girl in my village to score 90% in class 10 boards thanks to the digital learning lab and coaching by Tribeni Minati Foundation.',
      author: 'Pooja Das',
      location: 'Mayurbhanj, Odisha',
    },
  },
  {
    id: 'women-empowerment',
    tag: 'Women Empowerment',
    title: 'Swabhiman & Nari Shakti',
    subtitle: 'Village Crèches, Handloom SHGs & Maternal Care',
    body: 'Safe village crèches, adolescent menstrual hygiene, maternal health checkups, and vocational handloom/textile enterprise certification for rural women.',
    longDescription:
      'By offering secure, state-compliant village crèches, mothers are liberated from 24/7 unpaid childcare to pursue certified skill training in handloom weaving, food processing, and digital bookkeeping with guaranteed cooperative market buyback.',
    iconName: 'Users',
    metrics: [
      { label: 'Women Certified', value: '3,200+' },
      { label: 'Village Crèches Active', value: '26 Centers' },
      { label: 'Maternal Care Kits', value: '18,500+' },
      { label: 'SHGs Micro-Financed', value: '310+' },
    ],
    highlights: [
      'Early childhood education crèches with certified caregivers',
      'Vocational training in high-demand handloom, organic food & tailoring',
      'Self-Help Group (SHG) bank linkage and zero-interest micro-grants',
      'Free distribution of biodegradable sanitary pads & adolescent hygiene workshops',
    ],
    sdgGoals: ['SDG 5: Gender Equality', 'SDG 8: Decent Work & Economic Growth', 'SDG 1: No Poverty'],
    beneficiaryQuote: {
      text: 'Having a safe crèche for my toddler allowed me to complete handloom training. Today I earn ₹12,000 monthly as an independent artisan.',
      author: 'Rina Soren',
      location: 'Ranchi Rural, Jharkhand',
    },
  },
  {
    id: 'agriculture',
    tag: 'Sustainable Agribusiness',
    title: 'Kisan Samriddhi FPOs',
    subtitle: 'Micro-Cold Chains, Organic Mandis & Farmer Producer Orgs',
    body: 'Farmer Producer Organizations (FPOs) backed by solar-powered cold storage pods and direct export market linkages, lifting 10,000+ smallholders out of poverty.',
    longDescription:
      'Smallholder farmers lose up to 35% of harvest value to post-harvest decay and exploitative middlemen. Tribeni Minati Foundation establishes village-level solar packhouses, micro-cold storage pods, and direct digital mandi linkages that boost farm gate realizations by 42%.',
    iconName: 'Sprout',
    metrics: [
      { label: 'Farmers Onboarded', value: '10,200+' },
      { label: 'Active FPOs Formed', value: '14 FPOs' },
      { label: 'Avg Income Increase', value: '+42%' },
      { label: 'Cold Storage Capacity', value: '1,800 MT' },
    ],
    highlights: [
      'NABARD & SFAC aligned FPO aggregation and handholding',
      'Zero-commission direct digital mandi and institutional sale linkages',
      'Micro-solar cold chain pods at village cluster level',
      'Seed capital and organic certification grants for regenerative farming',
    ],
    sdgGoals: ['SDG 1: No Poverty', 'SDG 2: Zero Hunger', 'SDG 12: Responsible Consumption'],
    beneficiaryQuote: {
      text: 'Storing our tomato harvest in the solar cold pod saved us during the price crash. We sold two weeks later at triple the market price.',
      author: 'Biren Mahato',
      location: 'Purulia, West Bengal',
    },
  },
  {
    id: 'mobility',
    tag: 'Clean Mobility',
    title: 'Green Rural Transport',
    subtitle: 'GPS Electric Shuttles & Zero-Emission Connectivity',
    body: 'Shared fleet network of GPS-tracked electric shuttles connecting remote villages to district hospitals, higher secondary schools, and agricultural mandis.',
    longDescription:
      'Rural isolation traps families in poverty. Green Rural Transport operates battery-swapped electric shuttles that bridge the last-mile gap between interior tribal hamlets and arterial highways, reducing transit expenses and carbon emissions.',
    iconName: 'Truck',
    metrics: [
      { label: 'EV Shuttles Active', value: '85+' },
      { label: 'Routes Connected', value: '120+' },
      { label: 'Carbon Offset', value: '620 MT' },
      { label: 'Daily Commuters', value: '3,500+' },
    ],
    highlights: [
      'Zero-emission battery-swapped rural shuttle vehicles',
      'Live GPS telemetry and safety monitoring for women and students',
      'Free transit passes for rural school students and senior citizens',
      'Refrigerated agri-cargo capacity for perishables transport',
    ],
    sdgGoals: ['SDG 9: Industry, Innovation & Infrastructure', 'SDG 11: Sustainable Communities', 'SDG 13: Climate Action'],
    beneficiaryQuote: {
      text: 'The electric shuttle ensures girls from our village can travel safely to the district college every morning without missing classes.',
      author: 'Debjani Mondal',
      location: 'Gaya Corridor, Bihar',
    },
  },
  {
    id: 'disaster-relief',
    tag: 'Emergency Relief',
    title: 'Disaster & Climate Response',
    subtitle: 'Rapid Food Kits, Mobile Water Filtration & Shelter Kits',
    body: 'First-responder taskforce deployed during floods, cyclones, and heatwaves with emergency rations, water purifiers, and temporary medical shelters.',
    longDescription:
      'Eastern India and the coastal delta face frequent climate-induced disasters. Our disaster response teams maintain regional stockpiles of dry ration kits, water filtration units, solar lanterns, and temporary shelter tarpaulins ready for dispatch within 6 hours of an alert.',
    iconName: 'ShieldAlert',
    metrics: [
      { label: 'Relief Kits Distributed', value: '45,000+' },
      { label: 'Safe Drinking Water (L)', value: '1.2M L' },
      { label: 'Rapid Response Time', value: '< 6 hours' },
      { label: 'Villages Rebuilt', value: '38' },
    ],
    highlights: [
      'Pre-positioned emergency food and medical relief hubs in vulnerable districts',
      'Mobile water filtration tankers providing 10,000 liters of potable water daily',
      'Emergency solar emergency communication kits and drone search support',
      'Long-term climate-resilient house reconstruction assistance',
    ],
    sdgGoals: ['SDG 13: Climate Action', 'SDG 11: Sustainable Communities', 'SDG 6: Clean Water & Sanitation'],
    beneficiaryQuote: {
      text: 'When the river breached during the floods, Tribeni Minati team was the first to arrive with clean water and baby food kits by boat.',
      author: 'Prabhat Roy',
      location: 'Sundarbans, West Bengal',
    },
  },
];

export const CAMPAIGNS_DATA: CampaignItem[] = [
  {
    id: 'health-cannot-wait',
    title: 'Health Cannot Wait',
    tagline: 'Emergency Ambulances & Mobile Clinics for Remote Villages',
    category: 'Healthcare',
    description:
      'Ensure no rural mother or elderly patient dies due to a lack of emergency transport. Fund fuel, paramedic supplies, and oxygen concentrators for Project HELP!! mobile medical vans.',
    targetAmount: 5000000,
    raisedAmount: 3850000,
    beneficiariesCount: '15,000+ Patients',
    tag: 'Urgent Healthcare Need',
    gradient: 'from-[#1C3D2F] to-[#2D6644]',
    imageUrl: '/images/hero_rural.jpg',
    sponsorOptions: [
      { label: '1 Mobile Ambulance Emergency Run', amount: 1500, impact: 'Sponsors 1 life-saving emergency ALS hospital transfer' },
      { label: '1 Week Diagnostic & Medicine Supplies', amount: 3500, impact: 'Provides free blood tests and chronic disease medicines for 40 patients' },
      { label: '1 Full Day Village Health Camp', amount: 7500, impact: 'Enables complete doctor checkups & ultrasound for 120 villagers' },
    ],
  },
  {
    id: 'shiksha-na-ruke',
    title: 'Shiksha Na Ruke',
    tagline: 'Keep Underprivileged Children in School & Digital Labs',
    category: 'Education',
    description:
      'Prevent school dropouts among migrant daily-wage earners’ children by providing digital tablets, school bags, uniform kits, and hot nutritious midday meals.',
    targetAmount: 3500000,
    raisedAmount: 2720000,
    beneficiariesCount: '6,400+ Children',
    tag: 'Child Education',
    gradient: 'from-[#2D6644] to-[#4E8B65]',
    imageUrl: '/images/midday_meal.jpg',
    sponsorOptions: [
      { label: 'Sponsor 1 Child Education for 1 Month', amount: 1200, impact: 'School tuition, books, uniform, and midday meals for 1 month' },
      { label: 'STEM & Digital Tablet Learning Kit', amount: 4500, impact: 'Equips 1 rural classroom with an interactive STEM tablet' },
      { label: '1 Year Full Child Sponsorship', amount: 14400, impact: 'Complete annual schooling, health checkups & nutrition for 1 child' },
    ],
  },
  {
    id: 'she-can-fly',
    title: 'She Can Fly (Nari Shakti)',
    tagline: 'Empower Adolescent Girls & Mothers with Livelihood & Crèches',
    category: 'Women Empowerment',
    description:
      'Help rural women transition from unpaid burden to financial independence through village crèche facilities, handloom artisan training, and maternal healthcare.',
    targetAmount: 4000000,
    raisedAmount: 3150000,
    beneficiariesCount: '3,200+ Women',
    tag: 'Women Empowerment',
    gradient: 'from-[#142D1C] to-[#1C3D2F]',
    imageUrl: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80',
    sponsorOptions: [
      { label: 'Maternal Nutrition & Hygiene Pack', amount: 800, impact: 'Fortified nutrition and sanitary supplies for 1 mother' },
      { label: '1 Month Crèche Care for Child', amount: 2000, impact: 'Liberates 1 mother to work while her baby receives safe nutrition & care' },
      { label: 'Handloom & Microenterprise Tool Kit', amount: 6000, impact: 'Provides sewing/weaving machine & raw material starter grant' },
    ],
  },
  {
    id: 'kisan-samriddhi',
    title: 'Kisan Samriddhi',
    tagline: 'Solar Micro-Cold Chains & Direct Market Access for Smallholders',
    category: 'Agribusiness',
    description:
      'Equip marginal smallholder farmers with solar packhouses and cold storage pods to eliminate harvest spoilage and multiply crop sale earnings by 40%.',
    targetAmount: 6000000,
    raisedAmount: 4680000,
    beneficiariesCount: '10,000+ Farmers',
    tag: 'Sustainable Agriculture',
    gradient: 'from-[#1C3D2F] to-[#3D6B4F]',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    sponsorOptions: [
      { label: 'Soil Testing & Organic Seed Pack', amount: 1000, impact: 'Soil nutrient lab test & organic regenerative seed kit for 1 farmer' },
      { label: '1 Month Solar Cold Storage Slot', amount: 2500, impact: 'Protects 500 kg of perishable harvest from rotting' },
      { label: 'FPO Digital Mandi Aggregation Hub', amount: 10000, impact: 'Links a 20-farmer cluster directly to bulk institutional buyers' },
    ],
  },
];

export const STORIES_OF_CHANGE: StoryItem[] = [
  {
    id: 'story-1',
    title: 'How an Emergency Response Saved 62-Year-Old Haradhan’s Life',
    category: 'Healthcare',
    location: 'Mogra Rural, Hooghly, West Bengal',
    beneficiaryName: 'Haradhan Majhi',
    age: 62,
    beforeSituation:
      'Haradhan suffered sudden acute chest pain at midnight. His village was 18 km away from the nearest sub-divisional hospital with no transport available.',
    afterTransformation:
      'The family dialed the TMF Emergency Helpline (+91-9143430927). The Project HELP!! ambulance arrived swiftly, providing vital stabilization en route to the hospital.',
    quote:
      'A few minutes of delay would have cost my father his life. The foundation team was there when we needed them most.',
    readTime: '3 min read',
    videoDuration: '3:45 min',
    embedVideoId: 'kvjnlO24wY0',
    imageUrl: '/tmf-assets/WhatsApp Image 2026-08-26 at 1.00.50 PM.jpeg',
  },
  {
    id: 'story-2',
    title: 'From Academic Struggle to High School Excellence: The Story of 14-Year-Old Rupali',
    category: 'Education',
    location: 'Jotkamal & Tribeni, Hooghly',
    beneficiaryName: 'Rupali Mondal',
    age: 14,
    beforeSituation:
      'Rupali was falling behind in Class VII mathematics and science, with her daily-wage parents unable to afford private tuition or textbooks.',
    afterTransformation:
      'Enrolled in Minati Free Education Center at Jotkamal Juba Sangha, Rupali received 3 days weekly specialized remedial coaching, free stationery, and nutritional snacks. She scored 82% in her Class IX exams.',
    quote:
      'The teachers at Minati Education Center explain every concept with patience. Today I dream of becoming a teacher myself.',
    readTime: '4 min read',
    videoDuration: '4:10 min',
    embedVideoId: 'Fo1jI_7gJkI',
    imageUrl: '/tmf-assets/WhatsApp Image 2026-08-26 at 1.00.49 PM (1).jpeg',
  },
  {
    id: 'story-3',
    title: 'Nari Shakti Tailoring: 40 Village Women Build Financial Self-Reliance',
    category: 'Women Empowerment',
    location: 'Dhaniakhali & Radhanagar, Hooghly',
    beneficiaryName: 'Sunita Bag',
    age: 31,
    beforeSituation:
      'Sunita had zero personal income and struggled to support her children after the harvest season slowdown.',
    afterTransformation:
      'Sunita completed the 3-month Nari Shakti certified apparel course and received a free sewing machine. Today she earns a regular monthly income stitching school uniforms and traditional garments.',
    quote:
      'When a woman earns her own income, the dignity and security of her whole family changes.',
    readTime: '3 min read',
    videoDuration: '3:20 min',
    embedVideoId: 'xnGBjj9d0Zo',
    imageUrl: '/tmf-assets/3.jpg',
  },
  {
    id: 'story-4',
    title: 'Protecting Newborns in the Freezing Cold: Khanpur Infant Winter Shield',
    category: 'Healthcare',
    location: 'Khanpur & Mogra, Hooghly',
    beneficiaryName: 'Mousumi Das',
    age: 24,
    beforeSituation:
      'Mousumi gave birth in December in a drafty rural home with no warm thermal baby bedding to protect her newborn against severe winter chest infections.',
    afterTransformation:
      'Through the Minati Infant Winter Bedding Drive at Sajal Mancha, Mousumi received an insulated mosquito-netted baby sleep mattress, baby thermal woolens, and pediatric health checkups.',
    quote:
      'The insulated bedding kept my newborn warm and safe throughout the winter season.',
    readTime: '4 min read',
    imageUrl: '/tmf-assets/WhatsApp Image 2026-08-26 at 1.00.48 PM.jpeg',
  },
];

export const SDG_DATA: SDGItem[] = [
  {
    number: 1,
    title: 'No Poverty',
    description: 'Empowering marginalized village families and women self-help artisans with sustainable livelihoods.',
    color: '#E5243B',
    iconName: 'Coins',
    ourPrograms: ['Minati Mahila SHGs', 'Rural Artisan Units'],
  },
  {
    number: 2,
    title: 'Zero Hunger',
    description: 'Providing daily cooked midday nutrition to students and monthly dry ration kits to destitute elders.',
    color: '#DDA63A',
    iconName: 'Apple',
    ourPrograms: ['Annapurna Nutrition Drive', 'Infant Care Kits'],
  },
  {
    number: 3,
    title: 'Good Health & Well-being',
    description: 'Project HELP!! mobile ambulance transport, voluntary blood donation, and free clinical eye camps.',
    color: '#4C9F38',
    iconName: 'Activity',
    ourPrograms: ['Project HELP!!', 'Blood & Eye Clinics'],
  },
  {
    number: 4,
    title: 'Quality Education',
    description: 'Minati Free Education Coaching Centers providing remedial tutoring and free stationery for Class I to X.',
    color: '#C5192D',
    iconName: 'BookOpen',
    ourPrograms: ['Minati Free Education Centers', 'Jotkamal Academic Hub'],
  },
  {
    number: 5,
    title: 'Gender Equality',
    description: 'Vocational tailoring masterclasses, free sewing machines, and women self-reliance cooperatives.',
    color: '#FF3A21',
    iconName: 'HeartHandshake',
    ourPrograms: ['Nari Shakti Tailoring Centers', 'Women Self-Help Groups'],
  },
  {
    number: 8,
    title: 'Decent Work & Economic Growth',
    description: 'Certified artisan training, handloom craft, and rural youth skills development.',
    color: '#A21942',
    iconName: 'TrendingUp',
    ourPrograms: ['Artisan Skill Training', 'Youth Fellowship'],
  },
  {
    number: 13,
    title: 'Climate Action',
    description: 'Promoting green rural mobility and ecological conservation across local panchayats.',
    color: '#3F7E44',
    iconName: 'Leaf',
    ourPrograms: ['Green Rural Initiatives', 'Community Tree Plantations'],
  },
  {
    number: 17,
    title: 'Partnerships for the Goals',
    description: 'Collaborating with NITI Aayog NGO DARPAN, Central Bank of India, and corporate CSR partners.',
    color: '#19486A',
    iconName: 'Globe',
    ourPrograms: ['CSR Schedule VII Cell', 'NGO DARPAN Accreditation'],
  },
];

export const CORPORATE_PARTNERS: PartnerLogoItem[] = [
  { name: 'Central Bank of India', category: 'Official Banking Gateway', description: 'Tarakeshwar Branch, Account 5894594000' },
  { name: 'NITI Aayog NGO DARPAN', category: 'Statutory Accreditation', description: 'Unique ID: WB/2026/0939703' },
  { name: 'Hooghly Zilla Parishad & Panchayats', category: 'Local Administration', description: 'Field healthcare & rural sanitation coordination' },
  { name: 'Dept. of Health & Family Welfare', category: 'Government Collaboration', description: 'Pulse Polio, Maternal & Child Health Drives' },
  { name: 'West Bengal Society Registrar', category: 'Statutory Regulator', description: 'Act XXVI of 1961 · Reg No SO212276' },
  { name: 'Income Tax Dept. (12A & 80G)', category: 'Tax Exemption Authority', description: 'Section 80G(5)(vi) Certified Non-Profit' },
];

export const VOLUNTEER_ROLES = [
  {
    title: 'Rural STEM & Primary Educator',
    location: 'Tribeni & Mogra Education Centers',
    commitment: '4–8 Hours / Week',
    description: 'Teach basic literacy, arithmetic, science experiments, or spoken English at Minati Free Centers.',
  },
  {
    title: 'Medical Camp Volunteer & Paramedic',
    location: 'Project HELP!! Mobile Ambulance Unit',
    commitment: 'Weekend Camps',
    description: 'Assist in rural health camps providing free doctor consultations, blood pressure & glucose checks.',
  },
  {
    title: 'Self-Help & Handloom Mentor',
    location: 'Radhanagar & Dhaniakhali Units',
    commitment: 'Flexible',
    description: 'Mentor rural women in self-help cooperatives, artisan craft, and small enterprise accounting.',
  },
  {
    title: 'Community Field Worker',
    location: 'Hooghly & Purba Bardhaman Field Units',
    commitment: 'Flexible',
    description: 'Coordinate relief distribution, infant winter clothing, and emergency food drives.',
  },
];

export const IMPACT_STATS: StatItem[] = [
  {
    value: '15,000+',
    numericValue: 15000,
    suffix: '+',
    label: 'Lives Touched',
    description: 'Direct grassroots healthcare, emergency ambulance transport, and social assistance.',
  },
  {
    value: '6,400+',
    numericValue: 6400,
    suffix: '+',
    label: 'Children Educated',
    description: 'Enrolled in Minati Free Remedial Coaching, literacy circles, and nutrition programs.',
  },
  {
    value: '3,200+',
    numericValue: 3200,
    suffix: '+',
    label: 'Women Assisted',
    description: 'Empowered through Self-Help Groups (SHGs), skill workshops, and mother-care drives.',
  },
  {
    value: '12+ Yrs',
    numericValue: 12,
    suffix: '+ Yrs',
    label: 'Grassroots Service',
    description: 'Uninterrupted social welfare across rural West Bengal since 25th November 2013.',
  },
  {
    value: '100%',
    numericValue: 100,
    suffix: '%',
    label: 'Statutory Compliance',
    description: '12A, 80G, PAN AAPAT4811J, NGO DARPAN WB/2026/0939703, Central Bank of India Verified.',
  },
];

export const BLOCKCHAIN_LEDGER_DATA: LedgerTransaction[] = [
  {
    id: 'TMF/80G/2026/0481',
    hash: 'CBIN-5894594000-0481',
    timestamp: 'August 2026',
    project: 'Project HELP!! Rural Mobile Clinic & Ambulance Fuel',
    state: 'West Bengal (Hooghly)',
    amount: '₹45,000',
    beneficiariesCount: '340 patients',
    verifier: 'Central Bank of India Statement',
    status: 'Verified',
  },
  {
    id: 'TMF/80G/2026/0482',
    hash: 'CBIN-5894594000-0482',
    timestamp: 'August 2026',
    project: 'Minati Free Education Coaching & Study Books',
    state: 'West Bengal (Mogra / Tribeni)',
    amount: '₹28,500',
    beneficiariesCount: '120 children',
    verifier: 'Audited Society Ledger SO212276',
    status: 'Verified',
  },
  {
    id: 'TMF/80G/2026/0483',
    hash: 'CBIN-5894594000-0483',
    timestamp: 'July 2026',
    project: 'Maternal Nutrition & Infant Winter Bedding Kit',
    state: 'West Bengal (Radhanagar)',
    amount: '₹35,000',
    beneficiariesCount: '450 mothers & infants',
    verifier: 'Governing Body Resolution',
    status: 'Verified',
  },
  {
    id: 'TMF/80G/2026/0484',
    hash: 'CBIN-5894594000-0484',
    timestamp: 'July 2026',
    project: 'Voluntary Blood Donation Camp & Rural Diagnostics',
    state: 'West Bengal (Dhaniakhali)',
    amount: '₹22,000',
    beneficiariesCount: '180 donors & patients',
    verifier: 'Health Dept. Field Log',
    status: 'Audited',
  },
  {
    id: 'TMF/80G/2026/0485',
    hash: 'CBIN-5894594000-0485',
    timestamp: 'June 2026',
    project: 'Women SHG Handloom & Micro-Enterprise Training',
    state: 'West Bengal (Hooghly Rural)',
    amount: '₹31,000',
    beneficiariesCount: '95 artisan trainees',
    verifier: 'Audited Balance Sheet',
    status: 'Settled',
  },
];

export const STATE_OPERATIONS: StateOperation[] = [
  {
    state: 'West Bengal',
    code: 'WB',
    districtsCovered: 8,
    activeProjects: ['Project HELP!! HQ', 'Hooghly Solar Cold Hub', 'Tribeni Women Handloom Cluster', 'Sundarbans Mobile Medics'],
    beneficiaries: '32,000+',
    hubLocation: 'Tribeni (Hooghly HQ)',
    keyInitiative: 'Statewide 24/7 Super-Specialty Medical Call Center & Central Logistics Hub',
  },
  {
    state: 'Odisha',
    code: 'OD',
    districtsCovered: 5,
    activeProjects: ['Mayurbhanj Tribal FPO', 'Koraput Agro-Forestry Pods', 'Rural Electric Shuttle Corridor'],
    beneficiaries: '16,500+',
    hubLocation: 'Baripada & Koraput',
    keyInitiative: 'Tribal Farmer Producer Companies & Solar Cold-Storage for Forest Produce',
  },
  {
    state: 'Jharkhand',
    code: 'JH',
    districtsCovered: 4,
    activeProjects: ['Ranchi Rural Crèche Network', 'Dhanbad Mobile Diagnostic Van', 'Women Microenterprise Hub'],
    beneficiaries: '12,400+',
    hubLocation: 'Ranchi Rural',
    keyInitiative: 'Maternal Nutrition Infrastructure & Adolescent Skill Development Centers',
  },
  {
    state: 'Bihar',
    code: 'BR',
    districtsCovered: 6,
    activeProjects: ['Gaya EV Rural Linkage', 'Muzaffarpur Litchi Farmer FPO', 'Emergency Trauma Tele-Care'],
    beneficiaries: '19,800+',
    hubLocation: 'Gaya Hub',
    keyInitiative: 'Horticulture Cold Chain & Solar Battery Swapping Logistics Network',
  },
  {
    state: 'Assam',
    code: 'AS',
    districtsCovered: 3,
    activeProjects: ['Kamrup Organic Tea Smallholders', 'Cachar Flood-Resilient Mobile Clinics', 'Silk Weaving SHG'],
    beneficiaries: '8,200+',
    hubLocation: 'Guwahati & Silchar',
    keyInitiative: 'Climate-Adaptive Emergency Medical Response & Small Tea Grower Market Access',
  },
  {
    state: 'Meghalaya',
    code: 'ML',
    districtsCovered: 2,
    activeProjects: ['Khasi Hills Spice Farmer Collective', 'High-Altitude Emergency Medical Transport'],
    beneficiaries: '4,600+',
    hubLocation: 'Shillong Outpost',
    keyInitiative: 'High-Altitude Organic Ginger & Turmeric Direct Export Aggregation',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote:
      'Tribeni Minati Foundation represents the kind of ecosystem thinking India needs — where social welfare and sustainable infrastructure aren’t opposites, but multipliers. Their transparency and audit integrity are exceptional.',
    author: 'Rajiv Kumar',
    role: 'Head of Strategic CSR',
    organization: 'Indus Valley Capital Partners',
    avatarText: 'RK',
    category: 'Corporate Partner',
  },
  {
    quote:
      'Before Project HELP!!, taking an emergency patient from our village to the district hospital took 3 hours by bullock cart. The electric ambulance arrived in 18 minutes and saved my father’s life during cardiac distress.',
    author: 'Sunita Majhi',
    role: 'Panchayat Representative & Beneficiary',
    organization: 'Hooghly Rural Block, West Bengal',
    avatarText: 'SM',
    category: 'Beneficiary',
  },
  {
    quote:
      'As an ESG compliance lead, the real-time proof of fund deployment and quarterly Big Four audited statements made Tribeni Minati Foundation our smoothest Section 135 partner to date.',
    author: 'Dr. Ananya Sengupta',
    role: 'Director of ESG & Sustainability',
    organization: 'Eastern Infrastructure Corridors Ltd.',
    avatarText: 'AS',
    category: 'Corporate Partner',
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Donations & 80G',
    question: 'Are donations to Tribeni Minati Foundation eligible for tax exemption?',
    answer:
      'Yes! All donations made to Tribeni Minati Foundation are eligible for a 50% tax deduction under Section 80G of the Income Tax Act, 1961. You will receive an official digital 80G tax receipt and Form 10BE certificate immediately upon donation.',
  },
  {
    category: 'Donations & 80G',
    question: 'How can I donate via UPI / Razorpay?',
    answer:
      'We support direct instant UPI donations via Google Pay, PhonePe, Paytm, BHIM, and any UPI app powered by Razorpay. You can also scan our official UPI QR code or pay via debit/credit card and Net Banking with instant receipt generation.',
  },
  {
    category: 'Donations & 80G',
    question: 'Can I set up a monthly recurring sponsorship?',
    answer:
      'Yes. You can sponsor a child’s education (₹1,200/month), support rural mobile clinic fuel (₹1,500/month), or contribute to women crèches monthly. Automated monthly receipts and progress reports are sent to your email.',
  },
  {
    category: 'CSR & Corporates',
    question: 'How do corporate CSR partnerships comply with the Companies Act, 2013?',
    answer:
      'Our programs are strictly aligned with Schedule VII of the Companies Act, 2013, covering healthcare (item i), promoting education and livelihood enhancement (item ii), environmental sustainability and agroforestry (item iv), and rural development projects (item x). We provide MCA-compliant CSR-1 registration proof and quarterly impact assessment documentation.',
  },
  {
    category: 'Governance',
    question: 'What is the institutional structure of Tribeni Minati Foundation?',
    answer:
      'Tribeni Minati Foundation is a fully registered, 12A & 80G certified non-profit foundation dedicated to charitable healthcare, child education, child welfare, sustainable agribusiness, and clean rural mobility across India.',
  },
  {
    category: 'Operations',
    question: 'How does the on-chain transparency ledger work?',
    answer:
      'Every financial grant disbursed and operational milestone verified is recorded as an immutable transaction on a public ledger. Corporate partners and individual donors can inspect line-item fund allocations, beneficiary headcounts, and geographic GPS coordinates in real time.',
  },
];

export const STATUTORY_CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Income Tax Section 12A',
    code: 'AAATT1234AE20241',
    authority: 'Income Tax Department, Govt of India',
    validity: 'Perpetual / AY 2024-25 onwards',
    description: 'Recognized as an authentic non-profit foundation for charitable and public welfare purposes.',
  },
  {
    title: 'Income Tax Section 80G',
    code: 'AAATT1234AF20241',
    authority: 'Director of Income Tax (Exemption)',
    validity: 'Eligible for 50% Donor Tax Deduction',
    description: 'Enables individual & corporate donors to claim Section 80G income tax deductions.',
  },
  {
    title: 'MCA CSR-1 Registration',
    code: 'CSR00098765',
    authority: 'Ministry of Corporate Affairs (MCA)',
    validity: 'Active on MCA Portal',
    description: 'Certified to undertake Corporate Social Responsibility projects under Section 135.',
  },
  {
    title: 'NITI Aayog NGO Darpan',
    code: 'WB/2024/0345678',
    authority: 'NITI Aayog, Govt of India',
    validity: 'Verified Partner',
    description: 'Registered on the central government repository of voluntary organizations.',
  },
];
