import { useState, useEffect, useCallback } from 'react';
import { CustomCursor3D } from './components/CustomCursor3D';
import { AmbientCanvas3D } from './components/AmbientCanvas3D';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { PartnerMarquee } from './components/PartnerMarquee';
import { StatBar } from './components/StatBar';
import { ProgramExplorer } from './components/ProgramExplorer';
import { MinatiBento3D } from './components/MinatiBento3D';
import { InitiativesGrid } from './components/InitiativesGrid';
import { StoryOfChangeSection } from './components/StoryOfChangeSection';
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
import { EventsCalendarPage } from './pages/EventsCalendarPage';

// Modals
import { DocumentModal } from './components/DocumentModal';
import { DonateModal } from './components/DonateModal';
import { PartnerModal } from './components/PartnerModal';
import { PillarDetailModal } from './components/PillarDetailModal';
import { AuthModal } from './components/AuthModal';

import type { PageId, PillarItem } from './types';
import type { LegalDocument, TmfCampaign } from './data/tmfVerifiedData';

// Helper to translate URL path into app state
function parseUrlPath(pathname: string): { page: PageId; programId: string } {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (clean === '' || clean === '/' || clean === '/home') {
    return { page: 'home', programId: 'healthcare' };
  }
  if (clean === '/about' || clean === '/about-us') {
    return { page: 'about', programId: 'healthcare' };
  }
  if (clean === '/programs' || clean === '/programmes') {
    return { page: 'programs', programId: 'healthcare' };
  }
  if (clean.startsWith('/programs/') || clean.startsWith('/program/')) {
    const id = clean.split('/')[2] || 'healthcare';
    return { page: 'program', programId: id };
  }
  if (clean === '/events' || clean === '/camps' || clean === '/calendar') {
    return { page: 'events', programId: 'healthcare' };
  }
  if (
    clean === '/donor-portal' ||
    clean === '/donor-dashboard' ||
    clean === '/80g' ||
    clean === '/my-donations'
  ) {
    return { page: 'donor-portal', programId: 'healthcare' };
  }
  if (clean === '/stories' || clean === '/impact' || clean === '/case-studies') {
    return { page: 'stories', programId: 'healthcare' };
  }
  if (clean === '/gallery' || clean === '/photos' || clean === '/media') {
    return { page: 'gallery', programId: 'healthcare' };
  }
  if (clean === '/transparency' || clean === '/compliance' || clean === '/audit') {
    return { page: 'transparency', programId: 'healthcare' };
  }
  if (clean === '/volunteer' || clean === '/join' || clean === '/act') {
    return { page: 'volunteer', programId: 'healthcare' };
  }
  if (clean === '/contact' || clean === '/reach-us') {
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
      return '/programs';
    case 'program':
      return `/programs/${programId || 'healthcare'}`;
    case 'events':
      return '/events';
    case 'donor-portal':
      return '/donor-portal';
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
  const initial = parseUrlPath(window.location.pathname);
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

  // Synchronize on browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseUrlPath(window.location.pathname);
      setCurrentPage(parsed.page);
      setSelectedProgramId(parsed.programId);

      // Check if hash requests donate
      if (window.location.hash === '#donate' || window.location.pathname === '/donate') {
        setDonateOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check for hash or query
    if (window.location.hash === '#donate' || window.location.search.includes('donate=true')) {
      setDonateOpen(true);
    }

    return () => window.removeEventListener('popstate', handlePopState);
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

  const handleDonateCampaign = (campaign: TmfCampaign) => {
    handleOpenDonate(5000, campaign.title);
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
        onOpenDocument={handleOpenDocument}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Main Routed Content */}
      <main className="relative z-10">
        {/* 1. HOME PAGE VIEW */}
        {currentPage === 'home' && (
          <>
            {/* 1. Mission-First Cinematic Hero Experience */}
            <Hero
              onOpenDonate={() => handleOpenDonate()}
              onOpenDocument={handleOpenDocument}
            />

            {/* 2. Statutory Proof & Trust Strip */}
            <TrustStrip
              onOpenDocument={handleOpenDocument}
              onNavigateTransparency={() => handleNavigate('transparency')}
            />

            {/* 3. Key Milestone & Live Impact Number Ticker */}
            <StatBar />

            {/* 4. Interactive 6-Pillar Programme Explorer */}
            <ProgramExplorer
              onSelectProgram={(id) => handleNavigate('program', id)}
              onOpenDonate={(amt, cause) => handleOpenDonate(amt, cause)}
            />

            {/* 5. Corporate & Public Partners Marquee */}
            <PartnerMarquee />

            {/* 6. The 6-Letter "M-I-N-A-T-I" Asymmetric Bento Matrix */}
            <MinatiBento3D />

            {/* 7. Flagship Initiatives & Active Drives with Posters */}
            <InitiativesGrid onDonateCampaign={handleDonateCampaign} />

            {/* 8. Human Storytelling Spine */}
            <StoryOfChangeSection onOpenDonate={(amt, cause) => handleOpenDonate(amt, cause)} />

            {/* 9. Live Section 80G Tax Exemption & Impact Calculator */}
            <TaxCalculatorWidget onDonateWithAmount={(amt, cause) => handleOpenDonate(amt, cause)} />

            {/* 10. Statutory PDF & Legal Compliance File Vault */}
            <DocumentGallerySection onOpenDocument={handleOpenDocument} />

            {/* 11. Central Bank of India Official Banking & Wire Gateway */}
            <BankingGateway
              onOpenDonateModal={() => handleOpenDonate()}
              onOpenDocument={handleOpenDocument}
            />

            {/* 12. Emotional Closing Signature Call to Action */}
            <FinalCTASection onOpenDonate={() => handleOpenDonate()} />
          </>
        )}

        {/* 2. ABOUT US PAGE */}
        {currentPage === 'about' && (
          <AboutUsPage
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
            onOpenDocument={handleOpenDocument}
            onOpenPartner={() => setPartnerOpen(true)}
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
          <div className="pt-28 pb-16">
            <ProgramExplorer
              onSelectProgram={(id) => handleNavigate('program', id)}
              onOpenDonate={(amt, cause) => handleOpenDonate(amt, cause)}
            />
          </div>
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
          <ContactPage
            onNavigate={handleNavigate}
            onOpenDonate={() => handleOpenDonate()}
          />
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
        onOpenDocument={handleOpenDocument}
      />
    </div>
  );
}

export { App };
export default App;
