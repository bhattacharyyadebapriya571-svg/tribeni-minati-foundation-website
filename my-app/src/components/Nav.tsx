import React, { useState } from 'react';
import { Menu, X, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { PageId } from '../types';

interface NavProps {
  currentPage: PageId;
  onNavigate: (page: PageId, programId?: string) => void;
  onOpenDonate: () => void;
  onOpenAuth?: () => void;
}

export const Nav: React.FC<NavProps> = ({
  currentPage,
  onNavigate,
  onOpenDonate,
  onOpenAuth,
}) => {
  const { user, signOut } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; path: string }[] = [
    { id: 'about', label: 'About M-I-N-A-T-I', path: 'about' },
    { id: 'programs', label: 'Initiatives', path: 'initiatives' },
    { id: 'transparency', label: 'Transparency', path: 'transparency' },
    { id: 'contact', label: 'Contact', path: 'contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#FFFFFF]/70 backdrop-blur-2xl shadow-[0_1px_8px_rgba(15,23,42,0.04)] border-b border-white/20 transition-all duration-300">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Brand Identity / Official Emblem */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 group text-left cursor-pointer"
        >
          <img
            src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
            alt="Tribeni Minati Foundation Logo"
            className="h-10 w-auto object-contain hover:scale-105 transition-transform"
          />
          <span className="font-headline-md text-xl sm:text-2xl text-[#191c1e] tracking-tight group-hover:text-[#4b41e1] transition-colors">
            Tribeni Minati
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (link.id === 'programs' && currentPage === 'program');
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-body-base transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#4b41e1] font-semibold'
                    : 'text-[#45464d] hover:text-[#191c1e] hover:-translate-y-0.5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Stitch Amber Donate Button */}
          <button
            onClick={onOpenDonate}
            className="hidden md:flex items-center px-6 py-3 bg-[#F59E0B] text-[#111827] font-bold rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
          >
            Donate Now (80G Tax Exemption)
          </button>

          {/* User Account / Profile Icon */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-border-subtle shadow-xl p-2 z-50 space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-[#191c1e] truncate">
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
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#191c1e] hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>My 80G Certificates</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('volunteer');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#191c1e] hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Volunteer Pass</span>
                  </button>

                  <button
                    onClick={async () => {
                      await signOut();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer border-t border-slate-100 pt-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg hover:shadow-xl"
              title="Sign In"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-[#191c1e] hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-border-subtle shadow-xl px-6 py-5 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full p-3 rounded-xl text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                  currentPage === link.id
                    ? 'bg-indigo-50 text-[#4b41e1]'
                    : 'text-[#191c1e] hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenDonate();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3.5 bg-[#F59E0B] text-[#111827] font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Donate Now (80G Tax Exemption)
          </button>
        </div>
      )}
    </header>
  );
};
