import { useState, useEffect, useCallback } from 'react';
import { CustomCursor3D } from './components/CustomCursor3D';
import { AmbientCanvas3D } from './components/AmbientCanvas3D';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { StatBar } from './components/StatBar';
import { PartnerMarquee } from './components/PartnerMarquee';
import { FacebookLiveGallery3D } from './components/FacebookLiveGallery3D';
import { SDGSection } from './components/SDGSection';
import { Testimonial } from './components/Testimonial';
import { FAQ } from './components/FAQ';
import { ProgramExplorer } from './components/ProgramExplorer';
import { MinatiBento3D } from './components/MinatiBento3D';
import { InitiativesGrid } from './components/InitiativesGrid';
import { LeadershipSpotlight } from './components/LeadershipSpotlight';
import { DocumentGallerySection } from './components/DocumentGallerySection';
import { BankingGateway } from './components/BankingGateway';
import { TaxCalculatorWidget } from './components/TaxCalculatorWidget';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { NemotronAIAssistant } from './components/NemotronAIAssistant';

// Full Dedicated Multi-Page Suite
import { AboutUsPage } from './pages/AboutUsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { ImpactStoriesPage } from './pages/ImpactStoriesPage';
import { GalleryPage } from './pages/GalleryPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { ContactPage } from './pages/ContactPage';
import { DonorDashboardPage } from './pages/DonorDashboardPage';
import { DonorLoginPage } from './pages/DonorLoginPage';
import { EventsCalendarPage } from './pages/EventsCalendarPage';

// Modals
import { DocumentModal } from './components/DocumentModal';
import { DonateModal } from './components/DonateModal';
import { PartnerModal } from './components/PartnerModal';
import { PillarDetailModal } from './components/PillarDetailModal';
import { AuthModal } from './components/AuthModal';

import type { PageId, PillarItem } from './types';
import type { LegalDocument } from './data/tmfVerifiedData';

// Helper to translate URL path into app state
// Helper to translate URL path or hash into app state
function parseUrlPath(pathname: string, hash: string = ''): { page: PageId; programId: string } {
  let clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  
  // If pathname is root but hash is provided, use hash
  if ((clean === '/' || clean === '') && hash) {
    const rawHash = hash.replace(/^#\/?/, '').toLowerCase();
    if (rawHash) clean = `/${rawHash}`;
  }

  if (clean === '' || clean === '/' || clean === '/home') {
    return { page: 'home', programId: 'healthcare' };
  }
  if (
    clean === '/about' ||
    clean === '/about-us' ||
    clean === '/genesis' ||
    clean === '/team' ||
    clean === '/members' ||
    clean === '/governing-body' ||
    clean === '/leadership' ||
    clean === '/board'
  ) {
    return { page: 'about', programId: 'healthcare' };
  }
  if (
    clean === '/programs' ||
    clean === '/initiatives' ||
    clean === '/programmes' ||
    clean === '/pillars' ||
    clean === '/projects' ||
    clean === '/csr' ||
    clean === '/csr-partnership' ||
    clean === '/partner' ||
    clean === '/rfp'
  ) {
    return { page: 'programs', programId: 'healthcare' };
  }
  if (
    clean.startsWith('/programs/') ||
    clean.startsWith('/program/') ||
    clean.startsWith('/initiatives/') ||
    clean.startsWith('/initiative/')
  ) {
    const id = clean.split('/')[2] || 'healthcare';
    return { page: 'program', programId: id };
  }
  if (clean === '/events' || clean === '/camps' || clean === '/calendar' || clean === '/drives') {
    return { page: 'events', programId: 'healthcare' };
  }
  if (
    clean === '/donor-portal' ||
    clean === '/donor-dashboard' ||
    clean === '/80g' ||
    clean === '/my-donations' ||
    clean === '/donations' ||
    clean === '/receipts'
  ) {
    return { page: 'donor-portal', programId: 'healthcare' };
  }
  if (
    clean === '/donor-login' ||
    clean === '/login' ||
    clean === '/signin' ||
    clean === '/sign-in' ||
    clean === '/auth'
  ) {
    return { page: 'donor-login', programId: 'healthcare' };
  }
  if (clean === '/stories' || clean === '/impact' || clean === '/case-studies' || clean === '/testimonials') {
    return { page: 'stories', programId: 'healthcare' };
  }
  if (clean === '/gallery' || clean === '/photos' || clean === '/media' || clean === '/photo-archive') {
    return { page: 'gallery', programId: 'healthcare' };
  }
  if (
    clean === '/transparency' ||
    clean === '/compliance' ||
    clean === '/audit' ||
    clean === '/reports' ||
    clean === '/financials'
  ) {
    return { page: 'transparency', programId: 'healthcare' };
  }
  if (clean === '/volunteer' || clean === '/join' || clean === '/act' || clean === '/pass' || clean === '/youth') {
    return { page: 'volunteer', programId: 'healthcare' };
  }
  if (clean === '/contact' || clean === '/reach-us' || clean === '/secretariat' || clean === '/offices') {
    return { page: 'contact', programId: 'healthcare' };
  }

  return { page: 'home', programId: 'healthcare' };
}

// Helper to turn app state into a clean browser URL
function stateToPath(page: PageId, programId?: string): string {
  switch (page) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'programs':
      return '/initiatives';
    case 'program':
      return `/initiatives/${programId || 'healthcare'}`;
    case 'events':
      return '/events';
    case 'donor-portal':
      return '/donor-portal';
    case 'donor-login':
    case 'login':
      return '/donor-login';
    case 'stories':
      return '/stories';
    case 'gallery':
      return '/gallery';
    case 'transparency':
      return '/transparency';
    case 'volunteer':
      return '/volunteer';
    case 'contact':
      return '/contact';
    default:
      return '/';
  }
}

function App() {
  const initial = parseUrlPath(window.location.pathname, window.location.hash);
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initial.programId);

  // Modal states
  const [donateOpen, setDonateOpen] = useState<boolean>(false);
  const [donateAmount, setDonateAmount] = useState<number>(5000);
  const [donateCause, setDonateCause] = useState<string>('Minati Free Education & Infant Care');
  const [partnerOpen, setPartnerOpen] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [selectedPillarForModal, setSelectedPillarForModal] = useState<PillarItem | null>(null);

  // Synchronize on browser Back/Forward (popstate) & hashchange
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseUrlPath(window.location.pathname, window.location.hash);
      setCurrentPage(parsed.page);
      setSelectedProgramId(parsed.programId);

      // Check if hash or pathname requests donate or csr
      if (window.location.hash === '#donate' || window.location.pathname === '/donate') {
        setDonateOpen(true);
      }
      if (
        window.location.hash === '#csr' ||
        window.location.pathname === '/csr' ||
        window.location.pathname === '/partner' ||
        window.location.pathname === '/rfp'
      ) {
        setPartnerOpen(true);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Initial check for hash, query, or pathname
    if (window.location.hash === '#donate' || window.location.search.includes('donate=true') || window.location.pathname === '/donate') {
      setDonateOpen(true);
    }
    if (
      window.location.hash === '#csr' ||
      window.location.search.includes('csr=true') ||
      window.location.pathname === '/csr' ||
      window.location.pathname === '/partner' ||
      window.location.pathname === '/rfp'
    ) {
      setPartnerOpen(true);
    }

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Primary URL-Push Navigation Handler
  const handleNavigate = useCallback(
    (page: PageId, programId?: string) => {
      const prog = programId || (page === 'program' ? selectedProgramId : 'healthcare');
      const targetUrl = stateToPath(page, prog);

      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ page, programId: prog }, '', targetUrl);
      }

      setCurrentPage(page);
      if (programId) {
        setSelectedProgramId(programId);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedProgramId]
  );

  const handleOpenDonate = (presetAmount?: number, cause?: string) => {
    if (presetAmount) setDonateAmount(presetAmount);
    if (cause) setDonateCause(cause);
    setDonateOpen(true);
  };

  const handleOpenDocument = (doc: LegalDocument) => {
    setSelectedDoc(doc);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#151C18] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#1B3B2B]/15 selection:text-[#1B3B2B] relative overflow-x-hidden">
      {/* Editorial Custom 3D Cursor */}
      <CustomCursor3D />

      {/* Ambient Canvas Background Mesh */}
      <AmbientCanvas3D />

      {/* Fixed Sticky Header Navigation */}
      <Nav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate()}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Main Routed Content */}
      <main className="relative z-10">
        {/* 1. HOME PAGE VIEW */}
        {currentPage === 'home' && (
          <>
            {/* 1. Stitch Hero Experience & Floating Impact Metrics */}
            <Hero
              onOpenDonate={() => handleOpenDonate()}
              onExploreWork={() => handleNavigate('programs')}
            />

            {/* 2. Statutory Proof & 80G Trust Credentials Strip */}
            <TrustStrip
              onOpenDocument={handleOpenDocument}
              onNavigateTransparency={() => handleNavigate('transparency')}
            />

            {/* 3. Key Milestone & Live Impact Number Ticker */}
            <StatBar />

            {/* 4. The 6-Pillar M-I-N-A-T-I Bento Matrix */}
            <MinatiBento3D />

            {/* 5. Core Initiatives Showcase */}
            <InitiativesGrid onNavigate={handleNavigate} />

            {/* 6. Leadership & Executive Secretariat Spotlight (Rudra Adhya Speech) */}
            <LeadershipSpotlight
              onNavigate={handleNavigate}
              onOpenDonate={() => handleOpenDonate()}
            />

            {/* 7. Corporate & Institutional Partners Marquee */}
            <PartnerMarquee />

            {/* 8. Facebook Live Field Photojournalism & Real Engagement Feed */}
            <FacebookLiveGallery3D onOpenDonate={() => handleOpenDonate()} />

            {/* 9. United Nations Sustainable Development Goals (SDG) Matrix */}
            <SDGSection onNavigate={handleNavigate} />

            {/* 10. Stakeholder & Field Testimonials */}
            <Testimonial />

            {/* 11. Live Section 80G Tax Exemption & Impact Calculator */}
            <TaxCalculatorWidget onDonateWithAmount={(amt, cause) => handleOpenDonate(amt, cause)} />

            {/* 12. Statutory PDF & Legal Compliance File Vault */}
            <DocumentGallerySection onOpenDocument={handleOpenDocument} />

            {/* 13. Central Bank of India Official Banking & Wire Gateway */}
            <BankingGateway
              onOpenDonateModal={() => handleOpenDonate()}
              onOpenDocument={handleOpenDocument}
            />

            {/* 14. Frequently Asked Questions Accordion */}
            <FAQ />

            {/* 15. Emotional Closing Signature Call to Action */}
            <FinalCTASection onOpenDonate={() => handleOpenDonate()} />
          </>
        )}

        {/* 2. ABOUT US PAGE */}
        {currentPage === 'about' && (
          <AboutUsPage
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 3. PROGRAM DETAIL PAGE */}
        {currentPage === 'program' && (
          <ProgramDetailPage
            programId={selectedProgramId}
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate(5000, `Support Programme: ${selectedProgramId}`)}
            onOpenPartner={() => setPartnerOpen(true)}
          />
        )}

        {/* 4. PROGRAMMES DIRECTORY PAGE */}
        {currentPage === 'programs' && (
          <ProgramExplorer
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 5. CAMPS & EVENTS CALENDAR */}
        {currentPage === 'events' && (
          <EventsCalendarPage
            onNavigate={handleNavigate}
            onOpenDonate={(amt, cause) => handleOpenDonate(typeof amt === 'number' ? amt : 2500, typeof cause === 'string' ? cause : 'Camps & Relief Drive')}
          />
        )}

        {/* 6. DONOR DASHBOARD & 80G PORTAL */}
        {currentPage === 'donor-portal' && (
          <DonorDashboardPage
            onOpenDonate={() => handleOpenDonate()}
            onNavigate={handleNavigate}
          />
        )}

        {/* 6B. DEDICATED DONOR LOGIN & AUTH PAGE */}
        {(currentPage === 'donor-login' || currentPage === 'login') && (
          <DonorLoginPage
            onNavigate={handleNavigate}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {/* 7. HUMAN STORIES OF CHANGE */}
        {currentPage === 'stories' && (
          <ImpactStoriesPage
            onOpenDonate={(amt, cause) => handleOpenDonate(typeof amt === 'number' ? amt : 5000, typeof cause === 'string' ? cause : 'Support Stories of Change')}
            onNavigate={handleNavigate}
          />
        )}

        {/* 8. PHOTO & VIDEO DOCUMENTARY GALLERY */}
        {currentPage === 'gallery' && (
          <GalleryPage
            onOpenDonate={() => handleOpenDonate()}
            onNavigate={handleNavigate}
          />
        )}

        {/* 9. TRANSPARENCY & AUDIT LEDGER */}
        {currentPage === 'transparency' && (
          <TransparencyPage
            onOpenDocument={handleOpenDocument}
            onNavigate={handleNavigate}
          />
        )}

        {/* 10. VOLUNTEER ONBOARDING PORTAL */}
        {currentPage === 'volunteer' && (
          <VolunteerPage
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}

        {/* 11. CONTACT & GRIEVANCE REDRESSAL */}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Statutory Legal PDF Viewer Modal */}
      <DocumentModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

      {/* Primary 80G Contribution & Banking Modal */}
      <DonateModal
        isOpen={donateOpen}
        onClose={() => setDonateOpen(false)}
        initialAmount={donateAmount}
        initialPillar={donateCause}
      />

      {/* Corporate CSR RFP Modal */}
      <PartnerModal
        isOpen={partnerOpen}
        onClose={() => setPartnerOpen(false)}
      />

      {/* Donor & Member Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      {/* Pillar In-Depth Detail Modal */}
      <PillarDetailModal
        pillar={selectedPillarForModal}
        onClose={() => setSelectedPillarForModal(null)}
        onDonatePillar={(pillarTitle) => handleOpenDonate(5000, `Pillar: ${pillarTitle}`)}
      />

      {/* 24/7 Nemotron Multilingual AI Assistant Chatbot */}
      <NemotronAIAssistant />

      {/* 24/7 Floating Official WhatsApp Helpline Widget */}
      <FloatingWhatsAppWidget />

      {/* Official Verified Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate()}
      />
    </div>
  );
}

export { App };
export default App;
