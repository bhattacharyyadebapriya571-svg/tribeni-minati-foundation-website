/**
 * Component generator — analyzes the request and produces
 * production-ready React/TSX component code.
 */

import { ComponentRequest, ComponentType, GeneratedComponent, ThemeOverride } from './types.js';

// ---------------------------------------------------------------------------
// Component type detection
// ---------------------------------------------------------------------------

const TYPE_PATTERNS: Record<ComponentType, string[]> = {
  navbar: ['navbar', 'nav', 'header', 'navigation', 'menu bar', 'top bar'],
  hero: ['hero', 'banner', 'jumbotron', 'landing'],
  button: ['button', 'btn', 'cta'],
  card: ['card', 'tile', 'panel'],
  form: ['form', 'contact form', 'signup', 'login', 'register', 'checkout'],
  modal: ['modal', 'dialog', 'popup', 'overlay'],
  sidebar: ['sidebar', 'side panel', 'drawer', 'nav drawer'],
  footer: ['footer', 'bottom bar'],
  table: ['table', 'data table', 'grid', 'list view'],
  dropdown: ['dropdown', 'select', 'combobox', 'menu'],
  input: ['input', 'text field', 'field', 'search bar'],
  badge: ['badge', 'tag', 'chip', 'label', 'status'],
  avatar: ['avatar', 'profile picture', 'user icon'],
  breadcrumb: ['breadcrumb', 'breadcrumbs', 'path'],
  tabs: ['tabs', 'tab bar', 'tab panel'],
  accordion: ['accordion', 'collapse', 'expandable', 'faq'],
  tooltip: ['tooltip', 'popover', 'hint'],
  toast: ['toast', 'notification', 'snackbar', 'alert'],
  pricing: ['pricing', 'price table', 'plans', 'subscription'],
  testimonial: ['testimonial', 'review', 'quote', 'social proof'],
  'feature-grid': ['feature', 'features', 'capabilities', 'benefits', 'services'],
  cta: ['cta', 'call to action', 'conversion', 'sign up section'],
  stats: ['stats', 'metrics', 'numbers', 'counter', 'kpi'],
  timeline: ['timeline', 'steps', 'roadmap', 'process'],
  custom: [],
};

export function detectComponentType(description: string): ComponentType {
  const lower = description.toLowerCase();
  for (const [type, patterns] of Object.entries(TYPE_PATTERNS) as [ComponentType, string[]][]) {
    if (patterns.some(p => lower.includes(p))) return type;
  }
  return 'custom';
}

// ---------------------------------------------------------------------------
// Code generators per component type
// ---------------------------------------------------------------------------

function buildThemeVars(theme?: ThemeOverride): string {
  const defaults = {
    primary: '#1C3D2F',
    background: '#FFFFFF',
    foreground: '#111111',
    accent: '#4E8B65',
    radius: '10px',
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
  };
  const t = { ...defaults, ...theme };
  return `const THEME = {
  primary: '${t.primary}',
  background: '${t.background}',
  foreground: '${t.foreground}',
  accent: '${t.accent}',
  radius: '${t.radius}',
  fontFamily: ${JSON.stringify(t.fontFamily)},
} as const;\n\n`;
}

function generateNavbar(req: ComponentRequest): GeneratedComponent {
  const ts = req.useTypeScript;
  const themeVars = buildThemeVars(req.theme);

  const code = `'use client';

import { useState, useEffect } from 'react';
${ts ? "\nimport type { FC } from 'react';" : ''}

${themeVars}${ts ? `
interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: string;
  links?: NavLink[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

` : ''}const DEFAULT_LINKS${ts ? ': NavLink[]' : ''} = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'About', href: '#about' },
];

export ${ts ? 'const' : 'function'} Navbar${ts ? ': FC<NavbarProps>' : ''} = ({
  logo = 'Acme',
  links = DEFAULT_LINKS,
  ctaPrimary = { label: 'Get Started', href: '#signup' },
  ctaSecondary = { label: 'Sign In', href: '#login' },
}${ts ? ': NavbarProps' : ''}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
        transition: 'background 300ms, box-shadow 300ms, border-color 300ms',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 40px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label={logo + ' home'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: THEME.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            {logo.slice(0, 2).toUpperCase()}
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.foreground,
              fontFamily: THEME.fontFamily,
              letterSpacing: '-0.01em',
            }}
          >
            {logo}
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 32,
          }}
          className="desktop-nav"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#6B7280',
                textDecoration: 'none',
                transition: 'color 120ms',
                fontFamily: THEME.fontFamily,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = THEME.foreground; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}
        >
          <a
            href={ctaSecondary.href}
            style={{
              display: 'none',
              padding: '8px 18px',
              fontSize: 14,
              fontWeight: 500,
              color: THEME.foreground,
              textDecoration: 'none',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: THEME.radius,
              transition: 'background 120ms, border-color 120ms',
              fontFamily: THEME.fontFamily,
            }}
            className="cta-secondary"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            {ctaSecondary.label}
          </a>
          <a
            href={ctaPrimary.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '9px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: '#FFFFFF',
              textDecoration: 'none',
              background: THEME.primary,
              borderRadius: THEME.radius,
              boxShadow: '0 4px 14px rgba(28,61,47,0.22)',
              transition: 'transform 120ms, box-shadow 120ms',
              fontFamily: THEME.fontFamily,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'scale(1.02)';
              el.style.boxShadow = '0 6px 20px rgba(28,61,47,0.28)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'scale(1)';
              el.style.boxShadow = '0 4px 14px rgba(28,61,47,0.22)';
            }}
          >
            {ctaPrimary.label}
          </a>

          {/* Hamburger */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
            className="hamburger"
          >
            <span style={{ display: 'block', width: 20, height: 1.5, background: THEME.foreground, transition: 'transform 200ms, opacity 200ms', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 1.5, background: THEME.foreground, opacity: mobileOpen ? 0 : 1, transition: 'opacity 200ms' }} />
            <span style={{ display: 'block', width: 20, height: 1.5, background: THEME.foreground, transition: 'transform 200ms, opacity 200ms', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        style={{
          display: mobileOpen ? 'block' : 'none',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '10px 12px',
                fontSize: 15,
                fontWeight: 500,
                color: THEME.foreground,
                textDecoration: 'none',
                borderRadius: 8,
                transition: 'background 100ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            <a href={ctaSecondary.href} style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: 14, fontWeight: 500, color: THEME.foreground, textDecoration: 'none', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8 }}>
              {ctaSecondary.label}
            </a>
            <a href={ctaPrimary.href} style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none', background: THEME.primary, borderRadius: 8 }}>
              {ctaPrimary.label}
            </a>
          </div>
        </div>
      </div>

      <style>{mdStyles}</style>
    </header>
  );
};

const mdStyles = \`
  @media (min-width: 768px) {
    .desktop-nav { display: flex !important; }
    .cta-secondary { display: inline-flex !important; }
    .hamburger { display: none !important; }
  }
\`;

export default Navbar;
`;

  return {
    code,
    filename: 'Navbar.tsx',
    language: 'tsx',
    dependencies: ['react'],
    usageExample: `import Navbar from './Navbar';\n\nexport default function Layout() {\n  return (\n    <>\n      <Navbar logo="Acme" />\n      {/* rest of page */}\n    </>\n  );\n}`,
    description: 'Responsive glassmorphism navbar with scroll-aware background, mobile hamburger menu, and spring hover effects.',
    warnings: [],
  };
}

function generateHero(req: ComponentRequest): GeneratedComponent {
  const ts = req.useTypeScript;
  const themeVars = buildThemeVars(req.theme);

  const code = `'use client';

import { useEffect, useRef } from 'react';
${ts ? "import type { FC } from 'react';" : ''}

${themeVars}${ts ? `
interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  badge?: string;
}

` : ''}export ${ts ? 'const' : 'function'} Hero${ts ? ': FC<HeroProps>' : ''} = ({
  headline = 'Build something people love.',
  subheadline = 'The fastest way to ship production-quality frontend. Designed for developers who care about craft.',
  ctaLabel = 'Get Started Free',
  ctaHref = '#signup',
  secondaryLabel = 'View Docs',
  secondaryHref = '#docs',
  badge = 'Now in public beta',
}${ts ? ': HeroProps' : ''}) => {
  const headingRef = useRef${ts ? '<HTMLHeadingElement>' : ''}(null);
  const subRef = useRef${ts ? '<HTMLParagraphElement>' : ''}(null);
  const ctaRef = useRef${ts ? '<HTMLDivElement>' : ''}(null);

  useEffect(() => {
    const elements = [headingRef.current, subRef.current, ctaRef.current].filter(Boolean) as HTMLElement[];

    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
    });

    elements.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 100);
    });
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 40px 80px',
        background: THEME.background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: \`radial-gradient(ellipse 80% 60% at 50% 30%, rgba(78,139,101,0.07) 0%, transparent 70%)\`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              border: \`1px solid \${THEME.accent}33\`,
              background: \`\${THEME.accent}14\`,
              marginBottom: 32,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: THEME.accent,
                display: 'block',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: THEME.accent,
                fontFamily: THEME.fontFamily,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1
          id="hero-heading"
          ref={headingRef}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: THEME.foreground,
            fontFamily: THEME.fontFamily,
            margin: '0 0 24px',
          }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#6B7280',
            fontFamily: THEME.fontFamily,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}
        >
          {subheadline}
        </p>

        {/* CTA row */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <a
            href={ctaHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              fontSize: 15,
              fontWeight: 600,
              color: '#FFFFFF',
              textDecoration: 'none',
              background: THEME.primary,
              borderRadius: THEME.radius,
              boxShadow: \`0 6px 24px \${THEME.primary}40\`,
              transition: 'transform 150ms cubic-bezier(0.22,1,0.36,1), box-shadow 150ms',
              fontFamily: THEME.fontFamily,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'scale(1.03)';
              el.style.boxShadow = \`0 10px 32px \${THEME.primary}50\`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'scale(1)';
              el.style.boxShadow = \`0 6px 24px \${THEME.primary}40\`;
            }}
          >
            {ctaLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href={secondaryHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              fontSize: 15,
              fontWeight: 500,
              color: THEME.foreground,
              textDecoration: 'none',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: THEME.radius,
              transition: 'background 120ms',
              fontFamily: THEME.fontFamily,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
`;

  return {
    code,
    filename: 'Hero.tsx',
    language: 'tsx',
    dependencies: ['react'],
    usageExample: `import Hero from './Hero';\n\nexport default function Page() {\n  return <Hero headline="Ship faster." subheadline="The modern way to build UI." />;\n}`,
    description: 'Full-viewport hero section with badge, animated headline, subheadline, dual CTA buttons, and atmospheric gradient background.',
    warnings: [],
  };
}

function generatePricing(req: ComponentRequest): GeneratedComponent {
  const ts = req.useTypeScript;
  const themeVars = buildThemeVars(req.theme);

  const code = `'use client';

import { useState } from 'react';
${ts ? "import type { FC } from 'react';" : ''}

${themeVars}${ts ? `
interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

interface PricingProps {
  tiers?: PricingTier[];
}

` : ''}const DEFAULT_TIERS${ts ? ': PricingTier[]' : ''} = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For individuals and small projects.',
    features: ['Up to 3 projects', '5GB storage', 'Basic analytics', 'Email support', 'API access'],
    cta: 'Start Free',
    href: '#signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'For growing teams with advanced needs.',
    features: ['Unlimited projects', '100GB storage', 'Advanced analytics', 'Priority support', 'Custom domain', 'Team collaboration'],
    cta: 'Start Pro Trial',
    href: '#pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'For organizations with complex requirements.',
    features: ['Everything in Pro', 'Unlimited storage', 'Dedicated manager', 'SLA guarantee', 'SSO / SAML', 'Custom integrations', 'Audit logs'],
    cta: 'Contact Sales',
    href: '#enterprise',
    highlighted: false,
  },
];

export ${ts ? 'const' : 'function'} Pricing${ts ? ': FC<PricingProps>' : ''} = ({ tiers = DEFAULT_TIERS }${ts ? ': PricingProps' : ''}) => {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      aria-labelledby="pricing-heading"
      style={{ padding: '96px 40px', background: THEME.background }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2
            id="pricing-heading"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: THEME.foreground,
              fontFamily: THEME.fontFamily,
              margin: '0 0 16px',
            }}
          >
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: 16, color: '#6B7280', margin: '0 0 32px', fontFamily: THEME.fontFamily }}>
            No hidden fees. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: 99 }}>
            <button
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              style={{
                padding: '8px 20px',
                borderRadius: 99,
                border: 'none',
                background: !annual ? THEME.background : 'transparent',
                color: !annual ? THEME.foreground : '#6B7280',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: !annual ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 200ms',
                fontFamily: THEME.fontFamily,
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 20px',
                borderRadius: 99,
                border: 'none',
                background: annual ? THEME.background : 'transparent',
                color: annual ? THEME.foreground : '#6B7280',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: annual ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 200ms',
                fontFamily: THEME.fontFamily,
              }}
            >
              Annual
              <span style={{ fontSize: 11, fontWeight: 700, color: THEME.accent, background: \`\${THEME.accent}18\`, padding: '2px 7px', borderRadius: 99 }}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tiers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                padding: tier.highlighted ? '36px 28px' : '28px',
                borderRadius: 16,
                border: tier.highlighted ? \`2px solid \${THEME.primary}\` : '1px solid rgba(0,0,0,0.08)',
                background: tier.highlighted ? THEME.primary : THEME.background,
                boxShadow: tier.highlighted
                  ? \`0 20px 60px \${THEME.primary}30\`
                  : '0 4px 20px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
            >
              {tier.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: THEME.accent,
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: 99,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: THEME.fontFamily,
                  }}
                >
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 600, color: tier.highlighted ? 'rgba(255,255,255,0.7)' : '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: THEME.fontFamily }}>
                {tier.name}
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: tier.highlighted ? '#fff' : THEME.foreground, letterSpacing: '-0.03em', fontFamily: THEME.fontFamily }}>
                  \${annual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                {(annual ? tier.annualPrice : tier.monthlyPrice) > 0 && (
                  <span style={{ fontSize: 14, color: tier.highlighted ? 'rgba(255,255,255,0.6)' : '#9CA3AF', fontFamily: THEME.fontFamily }}>/mo</span>
                )}
              </div>
              <p style={{ fontSize: 14, color: tier.highlighted ? 'rgba(255,255,255,0.75)' : '#6B7280', marginBottom: 24, fontFamily: THEME.fontFamily }}>
                {tier.description}
              </p>

              <a
                href={tier.href}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '11px 20px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: 28,
                  background: tier.highlighted ? 'rgba(255,255,255,0.15)' : THEME.primary,
                  color: '#fff',
                  border: tier.highlighted ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  transition: 'background 150ms',
                  fontFamily: THEME.fontFamily,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = tier.highlighted ? 'rgba(255,255,255,0.22)' : '#142D22'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = tier.highlighted ? 'rgba(255,255,255,0.15)' : THEME.primary; }}
              >
                {tier.cta}
              </a>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 14,
                      color: tier.highlighted ? 'rgba(255,255,255,0.85)' : THEME.foreground,
                      fontFamily: THEME.fontFamily,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="7" fill={tier.highlighted ? 'rgba(255,255,255,0.2)' : \`\${THEME.accent}20\`} />
                      <path d="M5 8l2.5 2.5L11 5.5" stroke={tier.highlighted ? '#fff' : THEME.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
`;

  return {
    code,
    filename: 'Pricing.tsx',
    language: 'tsx',
    dependencies: ['react'],
    usageExample: `import Pricing from './Pricing';\n\nexport default function Page() {\n  return <Pricing />;\n}`,
    description: 'Three-tier pricing section with annual/monthly billing toggle, highlighted popular tier, and feature checklist.',
    warnings: [],
  };
}

// ---------------------------------------------------------------------------
// Generic fallback generator
// ---------------------------------------------------------------------------

function generateCustomComponent(req: ComponentRequest): GeneratedComponent {
  const ts = req.useTypeScript;
  const componentName = req.description
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 32) || 'Component';

  const themeVars = buildThemeVars(req.theme);

  const code = `'use client';
${ts ? "\nimport type { FC, ReactNode } from 'react';" : "\nimport { useState } from 'react';"}

${themeVars}${ts ? `
interface ${componentName}Props {
  children?: ReactNode;
  className?: string;
}

` : ''}/**
 * ${req.description}
 * Generated by Magic AI Agent.
 */
export ${ts ? `const ${componentName}: FC<${componentName}Props>` : `function ${componentName}({ children })`} = ({ children }${ts ? `: ${componentName}Props` : ''}) => {
  return (
    <div
      role="region"
      aria-label="${req.description}"
      style={{
        padding: '32px',
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.07)',
        background: THEME.background,
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
        fontFamily: THEME.fontFamily,
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: THEME.foreground,
          marginBottom: 12,
          letterSpacing: '-0.01em',
        }}
      >
        ${req.description}
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
        Component content goes here.
      </p>
      {children}
    </div>
  );
};

export default ${componentName};
`;

  return {
    code,
    filename: `${componentName}.tsx`,
    language: 'tsx',
    dependencies: ['react'],
    usageExample: `import ${componentName} from './${componentName}';\n\nexport default function Page() {\n  return <${componentName} />;\n}`,
    description: `Custom component: ${req.description}`,
    warnings: ['This is a generated scaffold. Customize the content and styles to match your design system.'],
  };
}

// ---------------------------------------------------------------------------
// Main generator dispatch
// ---------------------------------------------------------------------------

const generators: Partial<Record<ComponentType, (req: ComponentRequest) => GeneratedComponent>> = {
  navbar: generateNavbar,
  hero: generateHero,
  pricing: generatePricing,
};

export function generateComponent(req: ComponentRequest): GeneratedComponent {
  const type = req.type === 'custom' ? detectComponentType(req.description) : req.type;
  const generator = generators[type];
  if (generator) return generator({ ...req, type });
  return generateCustomComponent(req);
}
