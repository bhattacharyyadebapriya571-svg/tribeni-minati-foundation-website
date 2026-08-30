# soft-premium-skill — Expensive, Fluid UI

## Philosophy
Build interfaces that feel like they cost a lot to make. Not loud — quiet luxury. Think Linear, Vercel dashboard, Stripe billing portal. Every pixel should feel considered. Whitespace is not empty space; it is structure.

---

## Ground Rules

### Background
Always use `#FAFAFA` or a slight warm/cool tint as the page ground. Never pure white (`#FFFFFF`) for large surfaces — it's too harsh and reads as unfinished.

```css
/* Approved grounds */
--bg-cool: #F8F9FB;   /* slightly blue-tinted */
--bg-warm: #FAFAF8;   /* slightly warm */
--bg-neutral: #FAFAFA; /* pure soft */
--bg-ink: #0D0D0E;    /* dark mode ground */
```

### Cards and surfaces
```css
.card {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.07);
}
```

---

## Shadow System

Shadows must be **layered and diffuse**. Use two box-shadow values: one tight near-shadow for shape, one large diffuse far-shadow for elevation.

```css
/* Elevation scale */
--shadow-xs:  0 1px 2px rgba(0,0,0,0.04);
--shadow-sm:  0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
--shadow-md:  0 2px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06);
--shadow-lg:  0 4px 12px rgba(0,0,0,0.05), 0 24px 64px rgba(0,0,0,0.07);
--shadow-xl:  0 8px 24px rgba(0,0,0,0.06), 0 40px 96px rgba(0,0,0,0.08);

/* Colored shadow (for primary CTA buttons) */
--shadow-primary: 0 4px 16px rgba(VAR_PRIMARY_RGB, 0.25), 0 1px 4px rgba(VAR_PRIMARY_RGB, 0.15);
```

**Never use:**
- `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` — too sharp, reads as Bootstrap
- `drop-shadow` filter on card elements — performance hit and incorrect blur shape
- Black shadows with opacity above `0.12` on light backgrounds

---

## Whitespace Rules

Double the padding you think you need. Then add more.

```css
/* Section padding — minimum */
.section { padding: 96px 0; }          /* desktop */
.section { padding: 64px 0; }          /* tablet */
.section { padding: 48px 0; }          /* mobile */

/* Content max-width with breathing room */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;  /* desktop */
}

/* Card internal padding — never go below */
.card-sm { padding: 24px; }
.card-md { padding: 32px; }
.card-lg { padding: 48px; }
```

---

## Spring Physics Animation

**All motion in soft-premium interfaces uses spring physics. No linear or ease transitions on interactive elements.**

### Spring presets

```typescript
// Use with Framer Motion or any spring engine

export const springs = {
  // Fast snappy feedback — hover states, button presses
  snappy: { type: 'spring', stiffness: 400, damping: 35, mass: 1 },

  // Default — card lifts, menu opens, modal entrances
  default: { type: 'spring', stiffness: 300, damping: 30, mass: 1 },

  // Gentle — page transitions, hero elements, large layout shifts
  gentle: { type: 'spring', stiffness: 200, damping: 28, mass: 1.2 },

  // Bouncy — playful feedback, success states (use sparingly)
  bouncy: { type: 'spring', stiffness: 350, damping: 18, mass: 0.8 },

  // Slow float — ambient background elements, illustration floats
  float: { type: 'spring', stiffness: 60, damping: 12, mass: 1 },
} as const;
```

### Framer Motion patterns

```tsx
// Card hover lift
<motion.div
  whileHover={{ y: -4, scale: 1.01 }}
  whileTap={{ scale: 0.98 }}
  transition={springs.default}
/>

// Staggered list entrance
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: springs.default },
};

// Scroll-triggered section reveal
<motion.section
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={springs.gentle}
/>

// Ambient float loop
const ySpring = useSpring(0, springs.float);
useEffect(() => {
  let t = 0;
  const tick = () => { t += 0.012; ySpring.set(Math.sin(t) * 10); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}, [ySpring]);
```

### Animation budget
| Trigger | Max simultaneous animations |
|---------|----------------------------|
| Page load | 3 (staggered, not concurrent) |
| Scroll entry | 1 per viewport |
| Hover | 1 per element |
| Click/tap | 1 |

---

## Typography in Soft-Premium

- Use a **serif display face** paired with a **humanist sans** for body
- Headings should feel editorial: large, light-weight or display-weight, generous tracking (`-0.02em`)
- Body copy at `16–18px`, line-height `1.6`, max-width `64ch`
- Labels and eyebrows in `Inter` or `Geist`, uppercase, tracked at `+0.08em`, small `10–12px`

```css
.eyebrow {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.display-heading {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--foreground);
}
```

---

## Glassmorphism (Use Sparingly)

Only use glassmorphism for floating UI elements: nav bars on scroll, floating cards, tooltips, modals.

```css
.glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

/* Dark glass */
.glass-dark {
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Never apply glass to:**
- Background sections (causes extreme render cost)
- Elements inside a blurred parent
- More than 2 elements per viewport

---

## Button System

```tsx
// Primary — the most expensive-looking button
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={springs.snappy}
  style={{
    padding: '12px 28px',
    borderRadius: '10px',
    background: 'var(--primary)',
    color: 'var(--primary-foreground)',
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '-0.01em',
    boxShadow: 'var(--shadow-primary)',
    border: 'none',
    cursor: 'pointer',
  }}
/>

// Ghost — for secondary actions
// padding: '11px 27px' (1px less to account for border)
// border: '1px solid rgba(0,0,0,0.12)'
// background: transparent
// No box-shadow
```

---

## Micro-Details That Signal Quality

1. **Input fields**: `border-radius: 8px`, `border: 1px solid rgba(0,0,0,0.12)`, `box-shadow: 0 1px 2px rgba(0,0,0,0.04) inset`
2. **Focus rings**: `outline: 2px solid var(--accent)`, `outline-offset: 3px` — never the browser default blue
3. **Selection color**: `::selection { background: rgba(VAR_PRIMARY_RGB, 0.15); }`
4. **Scrollbar**: hidden by default (`scrollbar-width: none`), shown only on explicit scroll containers
5. **Cursor**: custom `cursor: pointer` on all interactive elements, `cursor: not-allowed` on disabled states
6. **Dividers**: `1px solid rgba(0,0,0,0.06)` — never `border-gray-200`

---

## Anti-Patterns for Soft-Premium

```
❌ Sharp, heavy shadows (0 4px 6px rgba(0,0,0,0.2))
❌ CSS transitions with linear easing on interactive elements
❌ Padding below 24px on card components
❌ Abrupt color changes on hover (always transition: color 150ms)
❌ Loading states that show a blank white flash
❌ Borders thicker than 1px on UI components
❌ Background blur on more than 2 concurrent elements
❌ Spring animations with damping < 15 (too bouncy for premium)
```
