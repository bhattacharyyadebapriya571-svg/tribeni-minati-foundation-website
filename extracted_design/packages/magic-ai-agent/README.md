# Magic AI Agent

> **Beta** — Generate polished, editable React UI components from natural language inside your AI coding assistant.

Type `/ui create a modern responsive navbar` in Cursor, Windsurf, VS Code, or Claude and get back a professional, production-ready component instantly.

---

## What it does

Magic AI Agent is an **MCP server** (Model Context Protocol) that gives your AI coding assistant a new superpower: the ability to generate premium, component-quality React UI from natural language descriptions.

It uses the 21st.dev component library style and can include professional brand logos from [SVGL](https://svgl.app) — no API key required for logos.

---

## Quick Demo

```
You: /ui create a modern responsive navbar with glassmorphism and a "Get Started" CTA

Magic AI Agent: Here's your Navbar.tsx component →
  ✅ Glassmorphism scroll-aware header
  ✅ Mobile hamburger menu with smooth animation
  ✅ Hover states and spring transitions
  ✅ TypeScript typed props
  ✅ Zero external CSS dependencies
```

---

## Setup

### Step 1 — Install

```bash
npm install -g magic-ai-agent
# or with npx (no install required):
npx magic-ai-agent
```

### Step 2 — Add your API key (optional — for 21st.dev premium components)

```bash
magic-agent setup
# Follow the prompt to enter your 21st.dev API key
# Get your key at: https://21st.dev/settings/api
```

> **Note:** The basic component generator works without any API key. The 21st.dev key unlocks additional premium component templates.

### Step 3 — Add to your IDE

Choose your editor below and copy the config block.

---

## Editor Setup

### Cursor

Add to `~/.cursor/mcp.json` (or create it):

```json
{
  "mcpServers": {
    "magic-ai-agent": {
      "command": "npx",
      "args": ["magic-ai-agent"],
      "env": {
        "TWENTY_FIRST_API_KEY": "your_key_here"
      }
    }
  }
}
```

Then restart Cursor. The `/ui` tool appears in the AI panel.

### Windsurf

Add to `~/.windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "magic-ai-agent": {
      "command": "npx",
      "args": ["magic-ai-agent"],
      "env": {
        "TWENTY_FIRST_API_KEY": "your_key_here"
      }
    }
  }
}
```

### VS Code with Cline

Open VS Code settings (`⌘,`) → search "Cline MCP" → click "Edit in settings.json":

```json
{
  "cline.mcpServers": {
    "magic-ai-agent": {
      "command": "npx",
      "args": ["magic-ai-agent"],
      "env": {
        "TWENTY_FIRST_API_KEY": "your_key_here"
      }
    }
  }
}
```

### Claude (claude.ai/code)

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "magic-ai-agent": {
      "command": "npx",
      "args": ["magic-ai-agent"]
    }
  }
}
```

---

## Usage

### Generate a component

```
/ui create a modern responsive navbar with a logo and two CTA buttons
/ui build a hero section with a headline and animated gradient CTA
/ui make a three-tier pricing table with annual/monthly toggle
/ui generate a contact form with validation
/ui create a feature grid with 6 cards and hover effects
/ui build a testimonial section with profile photos
/ui make a stats section showing 4 key metrics
```

### With options

```
/ui create a navbar with framework=next typescript=true

/ui build a hero section with theme={"primary":"#7C3AED","accent":"#A855F7"}

/ui create a pricing table with style=tailwind
```

### Find brand logos

```
/logo stripe
/logo github asComponent=true
/logo vercel limit=3
/logo google limit=1
```

### Detect component type

```
/detect_type "a card that shows user profile information with an avatar, name, and bio"
→ Detected component type: card
```

---

## Supported Component Types

| Component | Trigger words |
|-----------|--------------|
| `navbar` | navbar, nav, header, navigation |
| `hero` | hero, banner, jumbotron, landing |
| `button` | button, btn, cta |
| `card` | card, tile, panel |
| `form` | form, signup, login, contact |
| `modal` | modal, dialog, popup |
| `sidebar` | sidebar, drawer, side panel |
| `footer` | footer, bottom bar |
| `table` | table, data table, list view |
| `dropdown` | dropdown, select, combobox |
| `pricing` | pricing, plans, subscription |
| `testimonial` | testimonial, review, quote |
| `feature-grid` | features, capabilities, benefits |
| `cta` | cta, call to action, conversion |
| `stats` | stats, metrics, numbers, kpi |
| `tabs` | tabs, tab bar, tab panel |
| `accordion` | accordion, faq, expandable |
| `toast` | toast, notification, snackbar |
| `badge` | badge, tag, chip, status |

---

## Theme Tokens

All generated components accept a `theme` object for customization:

| Token | Default | Description |
|-------|---------|-------------|
| `primary` | `#1C3D2F` | Buttons, primary links, active states |
| `background` | `#FFFFFF` | Component background |
| `foreground` | `#111111` | Default text |
| `accent` | `#4E8B65` | Highlights, hover states |
| `radius` | `10px` | Border radius |
| `fontFamily` | `'Inter', sans-serif` | Font stack |

```
/ui create a navbar with theme={"primary":"#0F172A","accent":"#6366F1","radius":"6px"}
```

---

## Framework Support

| Framework | Status | Notes |
|-----------|--------|-------|
| React 18+ | ✅ Full | Default |
| Next.js 13+ (App Router) | ✅ Full | Adds `'use client'` directive |
| Vue 3 | 🔜 Coming soon | — |
| Svelte | 🔜 Coming soon | — |
| HTML / Vanilla | 🔜 Coming soon | — |

---

## Styling

| Style system | Status | Notes |
|-------------|--------|-------|
| Inline styles (vanilla-css) | ✅ Default | Zero dependencies |
| Tailwind CSS | 🔜 Coming soon | — |
| CSS Modules | 🔜 Coming soon | — |

Default output uses inline styles so components work immediately with zero configuration.

---

## FAQ

**Q: Do I need an API key?**
A: No. The core component generator works without any API key. The `TWENTY_FIRST_API_KEY` is optional and unlocks additional premium templates.

**Q: Can I customize the generated components?**
A: Yes — all output is standard React/TypeScript with inline styles. Edit it like any other component file.

**Q: Does this write files to my project?**
A: Magic AI Agent only **generates** component code as text in your AI chat. Your AI assistant (Cursor, Claude, etc.) then creates the actual file using its own file-writing capabilities. Magic AI Agent never directly modifies your filesystem.

**Q: What MCP version is required?**
A: MCP 1.0+. Cursor 0.42+, Windsurf 1.0+, Claude (claude.ai/code), Cline 2.0+.

**Q: Can I use this with any AI assistant?**
A: Any assistant that supports the Model Context Protocol (MCP). See the [MCP documentation](https://modelcontextprotocol.io) for the full list.

**Q: Why are components styled with inline styles?**
A: Inline styles guarantee the component works immediately in any project — no Tailwind config, no CSS imports, no class name conflicts. The theme system gives you full control over colors and typography.

**Q: How do I update?**
A: `npm update -g magic-ai-agent` or change `npx magic-ai-agent` in your config — npx always pulls the latest version.

---

## Architecture

```
magic-ai-agent/
  src/
    index.ts       — MCP server, tool definitions, request routing
    generator.ts   — Component code generators per type
    svgl.ts        — SVGL logo search and React component builder
    types.ts       — Shared TypeScript interfaces
  README.md
  package.json
  tsconfig.json
```

---

## Beta Notice

> Magic AI Agent is in **public beta**. Component quality and supported types will expand in each release. Found a bug or want a component type added? [Open an issue on GitHub](https://github.com/projectbillion/magic-ai-agent/issues).

---

## License

MIT © Project Billion / Minati Vision Foundation
