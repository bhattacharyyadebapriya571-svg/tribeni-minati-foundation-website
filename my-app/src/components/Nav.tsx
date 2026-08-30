import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, FileText, ChevronDown, PhoneCall, ShieldCheck, ArrowRight, UserCircle2, LogOut, Sparkles } from 'lucide-react';
import { TMF_META, LEGAL_DOCS } from '../data/tmfVerifiedData';
import { PILLARS_DATA } from '../data/foundationData';
import { useAuth } from '../context/AuthContext';
import type { LegalDocument } from '../data/tmfVerifiedData';
import type { PageId } from '../types';

interface NavProps {
  currentPage: PageId;
  onNavigate: (page: PageId, programId?: string) => void;
  onOpenDonate: () => void;
  onOpenDocument: (doc: LegalDocument) => void;
  onOpenAuth?: () => void;
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const Nav: React.FC<NavProps> = ({
  currentPage,
  onNavigate,
  onOpenDonate,
  onOpenDocument,
  onOpenAuth,
}) => {
  const { user, signOut } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [docsDropdownOpen, setDocsDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programmes' },
    { id: 'events', label: 'Camps & Events' },
    { id: 'stories', label: 'Stories' },
    { id: 'transparency', label: 'Ledger' },
    { id: 'donor-portal', label: '80G Portal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING, delay: 0.05 }}
      className="fixed top-0 left-0 right-0 z-40 text-[#151C18]"
    >
      {/* Top Utility Strip in Deep Forest Green */}
      <div className="bg-[#111A15] text-[#E8E3D7] text-[11px] py-1.5 px-4 sm:px-8 hidden md:block border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${TMF_META.contacts.helplines[0]}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>24/7 Field Helpline: {TMF_META.contacts.helplines[0]}</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="text-emerald-300/90 font-mono">
              Reg: {TMF_META.newRegNo} · DARPAN: {TMF_META.ngoDarpanId}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>12A & 80G Certified Non-Profit</span>
            </span>
            <span className="text-white/20">|</span>
            <a
              href="https://www.facebook.com/tribeniminatifoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8E3D7] hover:text-amber-300 transition-colors text-xs font-semibold"
            >
              Official Facebook ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <div
        className={`px-4 sm:px-8 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-md py-3 border-b border-black/[0.06]'
            : 'bg-[#FAF8F5]/70 backdrop-blur-xs py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Identity / Large Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 group text-left cursor-pointer py-1"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-border-subtle p-1 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-[#4b41e1] transition-all duration-300">
              <img
                src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                alt="Tribeni Minati Foundation Seal"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-extrabold leading-none text-[#191c1e] group-hover:text-[#4b41e1] transition-colors tracking-tight">
                Tribeni Minati
              </div>
              <div className="text-xs sm:text-sm text-[#4b41e1] font-['Hind_Siliguri'] font-bold tracking-wide flex items-center gap-2 mt-1">
                <span>ত্রিবেনী মিনতি ফাউন্ডেশন</span>
                <span className="text-slate-400 font-mono">·</span>
                <span className="font-mono text-[10px] text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 font-bold">Reg: SO212276</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.id === 'programs') {
                return (
                  <div
                    key="programs-dropdown"
                    className="relative"
                    onMouseEnter={() => setProgramsDropdownOpen(true)}
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('programs')}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        currentPage === 'programs' || currentPage === 'program'
                          ? 'bg-[#1B3B2B]/8 text-[#1B3B2B] font-bold'
                          : 'text-[#5C6760] hover:text-[#151C18] hover:bg-black/[0.03]'
                      }`}
                    >
                      <span>Programmes</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    <AnimatePresence>
                      {programsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-72 rounded-2xl bg-white border border-black/[0.08] shadow-xl p-2 z-50 space-y-1"
                        >
                          {PILLARS_DATA.map((prog) => (
                            <button
                              key={prog.id}
                              onClick={() => {
                                onNavigate('program', prog.id);
                                setProgramsDropdownOpen(false);
                              }}
                              className="w-full p-2.5 rounded-xl text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer block group"
                            >
                              <div className="text-xs font-bold text-[#151C18] group-hover:text-[#1B3B2B]">
                                {prog.title}
                              </div>
                              <div className="text-[10px] text-amber-800 font-['Hind_Siliguri'] font-semibold">
                                {prog.subtitle}
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (link.id === 'transparency') {
                return (
                  <div
                    key="transparency-dropdown"
                    className="relative"
                    onMouseEnter={() => setDocsDropdownOpen(true)}
                    onMouseLeave={() => setDocsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('transparency')}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        currentPage === 'transparency'
                          ? 'bg-[#1B3B2B]/8 text-[#1B3B2B] font-bold'
                          : 'text-[#5C6760] hover:text-[#151C18] hover:bg-black/[0.03]'
                      }`}
                    >
                      <span>Transparency</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    <AnimatePresence>
                      {docsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white border border-black/[0.08] shadow-xl p-2 z-50 space-y-1"
                        >
                          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-black/[0.04]">
                            Verified Statutory Ledgers
                          </div>
                          {LEGAL_DOCS.slice(0, 4).map((doc) => (
                            <button
                              key={doc.id}
                              onClick={() => {
                                onOpenDocument(doc);
                                setDocsDropdownOpen(false);
                              }}
                              className="w-full p-2.5 rounded-xl text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer flex items-center justify-between group"
                            >
                              <div>
                                <div className="text-xs font-bold text-[#151C18] group-hover:text-[#1B3B2B]">
                                  {doc.title}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                  {doc.authority} · {doc.issueDate}
                                </div>
                              </div>
                              <FileText className="w-4 h-4 text-amber-600 shrink-0 opacity-80 group-hover:opacity-100" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#1B3B2B] font-bold'
                      : 'text-[#5C6760] hover:text-[#151C18] hover:bg-black/[0.03]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#1B3B2B]/8 rounded-xl"
                      transition={SPRING}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: User Account & Donate CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Account / Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] hover:border-[#1B3B2B]/40 transition-all cursor-pointer shadow-xs text-xs font-semibold text-[#151C18]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-black/[0.08] shadow-xl p-2 z-50 space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-black/[0.04]">
                        <div className="text-xs font-bold text-[#151C18] truncate">
                          {user.user_metadata?.full_name || 'Verified Member'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">
                          {user.email}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onNavigate('donor-portal');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#151C18] hover:bg-[#FAF8F5] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>My 80G Certificates</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('volunteer');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#151C18] hover:bg-[#FAF8F5] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Volunteer Pass</span>
                      </button>

                      <button
                        onClick={async () => {
                          await signOut();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer border-t border-black/[0.04] pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-black/[0.1] bg-white hover:bg-black/[0.03] text-xs font-bold text-[#151C18] transition-all shadow-xs cursor-pointer"
              >
                <UserCircle2 className="w-4 h-4 text-[#1B3B2B]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-xs font-bold uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(245,158,11,0.35)] transition-all cursor-pointer group"
            >
              <Heart className="w-3.5 h-3.5 fill-[#111827] text-[#111827] group-hover:scale-110 transition-transform" />
              <span>Donate Now (80G)</span>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl bg-white border border-black/[0.08] hover:bg-black/[0.03] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF8F5] border-b border-black/[0.08] shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl text-left text-sm font-bold flex items-center justify-between transition-colors ${
                      currentPage === link.id
                        ? 'bg-[#1B3B2B] text-white'
                        : 'text-[#151C18] hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>

              {/* Mobile Donate CTA */}
              <div className="pt-4 border-t border-black/[0.06] space-y-3">
                <button
                  onClick={() => {
                    onOpenDonate();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#1B3B2B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Support Our Mission (80G Tax Deductible)</span>
                </button>

                <div className="text-center text-xs text-[#5C6760] font-mono">
                  Govt. Reg: {TMF_META.newRegNo}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
