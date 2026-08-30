# minimalist-skill — Notion / Linear Grade Interfaces

## Philosophy
Reduction is design. Every element earns its place. No decorative gradients, no shadows for aesthetics, no animations that aren't functional. The interface communicates through whitespace, typographic hierarchy, and precise 1px structure. Reference: Linear app, Notion, Raycast, Craft Docs.

---

## Core Constraints

```
MAX_COLORS=4              # background, foreground, muted, accent — that's it
MAX_BORDER_RADIUS=6px     # sharp corners. nothing rounder than 6px except pills
SHADOWS=structural_only   # only for dropdowns, modals, and floating elements
ANIMATIONS=instant        # hover: immediate. transitions max 120ms. no spring.
FONTS=1_or_2              # mono-font interfaces allowed. no display serifs.
```

---

## Color System

### Light mode (default)
```css
:root {
  --bg:        #FFFFFF;
  --bg-subtle: #F7F7F7;
  --fg:        #111111;
  --fg-muted:  #6B6B6B;
  --border:    #E5E5E5;
  --accent:    #000000;    /* pure black for interactive elements */
  --accent-bg: #F0F0F0;   /* hover background */
}
```

### Dark mode
```css
[data-theme="dark"] {
  --bg:        #0F0F0F;
  --bg-subtle: #1A1A1A;
  --fg:        #EFEFEF;
  --fg-muted:  #666666;
  --border:    #2A2A2A;
  --accent:    #FFFFFF;
  --accent-bg: #222222;
}
```

### Rules
- The only permitted color outside this palette is a **single semantic accent** (error: `#DC2626`, success: `#16A34A`, warning: `#D97706`)
- Background and surface colors use **no opacity** — use distinct hex values
- Never use colored borders; all borders are `--border`

---

## Typography

### The monochromatic type scale
```css
/* Headings — system font stack or single sans-serif */
h1 { font-size: 24px; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; color: var(--fg); }
h2 { font-size: 18px; font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; color: var(--fg); }
h3 { font-size: 14px; font-weight: 600; line-height: 1.4; color: var(--fg); }

/* Body */
p  { font-size: 14px; font-weight: 400; line-height: 1.6; color: var(--fg-muted); }

/* Labels, metadata */
.label { font-size: 12px; font-weight: 500; color: var(--fg-muted); letter-spacing: 0.01em; }

/* Mono — for code, IDs, data values */
code { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12px; }
```

### Approved font pairings
| Use case | Font |
|----------|------|
| Default | System: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| Developer tool | `'Geist', sans-serif` + `'Geist Mono', monospace` |
| Document editor | `'Inter', sans-serif` |
| Minimal editorial | `'DM Sans', sans-serif` |

**Never use:** display serifs, decorative fonts, or more than 2 font families.

---

## Layout Patterns

### Sidebar + Content (Linear pattern)
```css
.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  border-right: 1px solid var(--border);
  background: var(--bg-subtle);
  overflow-y: auto;
  padding: 8px;
}

.content {
  overflow-y: auto;
  padding: 32px 40px;
  max-width: 860px;
}
```

### Document layout (Notion pattern)
```css
.document {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 48px;
}
```

### Table layout (database view)
```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.table th {
  border-bottom: 1px solid var(--border);
  padding: 8px 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: var(--fg-muted);
}
.table td {
  border-bottom: 1px solid var(--border);
  padding: 9px 12px;
  color: var(--fg);
}
.table tr:hover td { background: var(--bg-subtle); }
```

---

## Interactive States

### Hover: instant, background-based
```css
.interactive {
  border-radius: 4px;
  transition: background 80ms;
}
.interactive:hover { background: var(--accent-bg); }
.interactive:active { background: #E8E8E8; }
```

### Selected / Active state
Use **background inversion**: black background, white text. No gradients.
```css
.item-active {
  background: var(--accent);
  color: var(--bg);
  border-radius: 4px;
}
```

### Focus
```css
:focus-visible {
  outline: 2px solid var(--fg);
  outline-offset: 2px;
  border-radius: 3px;
}
```

---

## Component Patterns

### Button
```tsx
// Primary
<button style={{
  padding: '6px 12px',
  background: 'var(--fg)',
  color: 'var(--bg)',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
}}>Action</button>

// Secondary
<button style={{
  padding: '5px 11px',
  background: 'transparent',
  color: 'var(--fg)',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 500,
  border: '1px solid var(--border)',
  cursor: 'pointer',
}}>Action</button>
```

### Input
```tsx
<input style={{
  width: '100%',
  padding: '7px 10px',
  background: 'var(--bg)',
  color: 'var(--fg)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  // focus: border: '1px solid var(--fg)'
}} />
```

### Tag / Badge
```tsx
<span style={{
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 7px',
  background: 'var(--bg-subtle)',
  color: 'var(--fg-muted)',
  borderRadius: '3px',
  fontSize: '11px',
  fontWeight: 500,
  border: '1px solid var(--border)',
}}>Label</span>
```

### Command palette item
```tsx
<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 12px',
  borderRadius: '6px',
  cursor: 'default',
  // hover: background: var(--bg-subtle)
}}>
  <Icon size={16} style={{ color: 'var(--fg-muted)' }} />
  <span style={{ fontSize: '14px', color: 'var(--fg)' }}>Action label</span>
  <kbd style={{
    marginLeft: 'auto',
    fontSize: '11px',
    color: 'var(--fg-muted)',
    background: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    borderRadius: '3px',
    padding: '1px 5px',
  }}>⌘K</kbd>
</div>
```

---

## Navigation

### Sidebar nav item
```tsx
<a style={{
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '5px 8px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: 500,
  color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
  background: isActive ? 'var(--bg)' : 'transparent',
  textDecoration: 'none',
  // hover: background: var(--bg) (if not active)
}} />
```

---

## Structural Borders

Borders are the skeleton of minimalist UI. Use them aggressively but thinly.

```css
/* Dividers */
.section-divider { border-top: 1px solid var(--border); }

/* Panel borders */
.panel { border: 1px solid var(--border); border-radius: 6px; }

/* Table borders */
.grid-line { border-bottom: 1px solid var(--border); }

/* Status bar */
.status-bar {
  border-top: 1px solid var(--border);
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--fg-muted);
}
```

---

## Anti-Patterns for Minimalist

```
❌ Gradient backgrounds or gradient text
❌ Box shadows on flat card surfaces (borders only)
❌ Rounded corners > 6px (use 4px for most elements)
❌ Colored icons when monochrome communicates the same information
❌ Animations longer than 120ms on hover
❌ "Hero section" with a decorative background image
❌ font-weight: 300 or 100 — too light for precision interfaces
❌ Placeholder text in italic
❌ More than 2 font weights in the same component
❌ Centered layout for application shells (left-align everything)
```
