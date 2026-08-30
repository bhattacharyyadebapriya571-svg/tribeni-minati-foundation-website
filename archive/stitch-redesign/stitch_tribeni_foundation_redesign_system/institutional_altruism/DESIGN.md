---
name: Institutional Altruism
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a1700'
  on-tertiary-container: '#b87500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  surface-white: '#FFFFFF'
  border-subtle: rgba(15, 23, 42, 0.08)
  text-muted: '#64748B'
  indigo-subdued: '#EEF2FF'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  stat-lg:
    fontFamily: JetBrains Mono
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  section-gap-lg: 128px
  section-gap-sm: 64px
---

## Brand & Style

The design system is built on a foundation of **Institutional Altruism**, merging the clinical precision of a financial institution with the profound emotional warmth of a humanitarian mission. It targets high-net-worth individuals and corporate donors who require statutory transparency before emotional commitment.

The visual style is **Modern Corporate with Glassmorphic accents**, characterized by:
- **Pristine Architecture:** Extreme use of white space and a cool-toned canvas to evoke a sense of professional hygiene and organization.
- **Micro-Enclosures:** UI elements are housed in "double-bezel" containers to signify security and digital permanence.
- **Dynamic Impact:** High-contrast color blocks (Deep Navy) are used for "Anchor Sections" to ground the fluid, white-heavy editorial sections.
- **Strictly Non-Green:** Professionalism is communicated through Indigos and Navys, intentionally avoiding the cliché non-profit green palette to stand out as a modern, technology-forward foundation.

## Colors

The palette is engineered for **High-Trust Conversion**. 

- **Primary (Deep Royal Navy):** Used for headlines, footer backgrounds, and primary navigation. It represents the "Statutory Foundation" of the brand.
- **Secondary (Warm Vibrant Indigo):** Used for interactive elements, active states, and verification badges. It acts as the "Human Connection" color.
- **Tertiary/Accent (Golden Amber):** Reserved strictly for high-conversion triggers (Donation buttons, tax-saving callouts). It must not be used for decorative elements.
- **Backgrounds:** The primary canvas is `Cool Grey (#F8FAFC)`, while `Pure White (#FFFFFF)` is used for elevated cards to create a distinct tonal hierarchy.

## Typography

This design system utilizes a trio of typefaces to balance character, readability, and technical precision:
1. **Plus Jakarta Sans (Headlines):** Used for all display and headline levels to provide a modern, friendly, yet authoritative voice.
2. **Inter (Body):** The workhorse for all narrative copy, ensuring maximum legibility across all screen densities.
3. **JetBrains Mono (Data/Labels):** Used for statutory numbers, tax calculations, and registration IDs to evoke a sense of ledger-like accuracy and transparency.

**Special Rule:** Use `font-variant-numeric: tabular-nums` for all components involving donation amounts or impact metrics to ensure perfect vertical alignment in tables and tickers.

## Layout & Spacing

The design system employs a **12-column fluid grid** with a maximum container width of `1280px`. 

- **Macro-Spacing:** Use aggressive vertical padding between sections (`128px` on desktop) to allow the "Transparent" theme to breathe.
- **Bento Logic:** Program features and impact reports should follow an asymmetric bento grid (e.g., a 2/3 and 1/3 split) to maintain visual interest.
- **Mobile Reflow:** On mobile, all columns stack vertically. The 12-column grid collapses to a 1-column layout with `16px` side margins.
- **Touch Targets:** All interactive elements must maintain a minimum `48px` height for accessibility.

## Elevation & Depth

Hierarchy is established through **Ambient Tinted Shadows** and **Tonal Layering** rather than traditional black drop shadows.

- **Double-Bezel Depth:** To create a sense of security, place secondary white cards inside a larger, slightly darker container (`#F1F5F9`) with a `1px` subtle border.
- **Shadow Profile:** Use multi-layered, low-opacity shadows tinted with the brand Navy: `0 10px 25px -5px rgba(15, 23, 42, 0.05)`.
- **Primary CTA Glow:** The Golden Amber donation button should feature a specific "glow" shadow: `0 10px 25px -5px rgba(245, 158, 11, 0.3)`.
- **Backdrop Blurs:** The navigation bar uses a `20px` backdrop-blur with an `85%` white opacity to maintain context while scrolling.

## Shapes

The shape language is defined by **Generous Radii**, emphasizing approachability and modern software aesthetics.

- **Primary Cards:** Use `rounded-2xl` (1.5rem / 24px) for major containers and bento cells.
- **Buttons & Inputs:** Use `rounded-xl` (0.75rem / 12px) to provide a slightly more structured feel for interactive elements.
- **Badges:** Use "Pill" shapes (full rounding) for statutory markers like "80G Verified" or "Tax Exempt."

## Components

- **Donation Button (Primary):** `Golden Amber` fill, `Navy` text (bold), `rounded-2xl`, with an active hover state that lifts the button by `-2px`.
- **Statutory Card:** A `white` card with a `1px` Slate-200 border, featuring a `JetBrains Mono` registration number at the top right and a secondary indigo "Download PDF" action.
- **Impact Ticker:** Large `JetBrains Mono` numbers that animate on scroll, paired with a small `label-caps` description underneath.
- **Input Fields:** `Cool Grey` background with a `2px` Indigo border on focus. Placeholders should be in `text-muted`.
- **Tax Calculator Widget:** A double-bezel card containing a slider for donation amounts and a "Live Result" panel that shows the specific number of lives impacted (e.g., "Educates 3 Children") in a highlighted indigo box.
- **Mobile Action Bar:** A persistent bottom-fixed bar on mobile containing a single `Golden Amber` button: "Donate Now (80G Tax Saved)".