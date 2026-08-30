"""Design System Generator — core logic for UI UX Pro Max."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Final

from uiux_pro_max.models import (
    AccessibilityCheck,
    AntiPattern,
    AnimationSpec,
    CSSEffect,
    ColorPalette,
    ColorToken,
    DesignPlan,
    FontPairing,
    LayoutPattern,
    VisualStyle,
)


# ---------------------------------------------------------------------------
# Brief analysis keywords
# ---------------------------------------------------------------------------

_KEYWORDS: Final[dict[str, list[str]]] = {
    "wellness": ["spa", "wellness", "yoga", "meditation", "retreat", "holistic", "health", "beauty"],
    "saas": ["saas", "software", "dashboard", "analytics", "platform", "tool", "app", "crm", "erp"],
    "ecommerce": ["shop", "store", "product", "buy", "sell", "cart", "commerce", "marketplace"],
    "landing": ["landing", "marketing", "homepage", "website", "page"],
    "ngo": ["ngo", "foundation", "charity", "nonprofit", "welfare", "impact", "donate", "social"],
    "finance": ["finance", "bank", "investment", "fund", "fintech", "payment", "money", "wealth"],
    "developer": ["developer", "devtool", "api", "sdk", "cli", "code", "github", "docs", "open source"],
    "creative": ["agency", "portfolio", "creative", "design", "studio", "branding", "art"],
    "restaurant": ["restaurant", "food", "cafe", "menu", "chef", "dining", "recipe", "culinary"],
    "education": ["education", "course", "learning", "school", "university", "e-learning", "edtech"],
}

_STYLE_KEYWORDS: Final[dict[VisualStyle, list[str]]] = {
    VisualStyle.SOFT_PREMIUM: ["luxury", "premium", "exclusive", "elegant", "refined", "high-end"],
    VisualStyle.MINIMALIST: ["minimal", "clean", "simple", "notion", "linear", "stripped"],
    VisualStyle.DARK_DEVELOPER: ["dark", "terminal", "code", "developer", "hacker", "cli"],
    VisualStyle.EDITORIAL: ["editorial", "magazine", "newspaper", "blog", "content", "publish"],
    VisualStyle.BRUTALIST: ["brutalist", "bold", "raw", "unconventional", "avant-garde"],
    VisualStyle.WARM_ORGANIC: ["organic", "natural", "earthy", "sustainable", "eco", "artisan"],
    VisualStyle.CORPORATE_CLEAN: ["corporate", "enterprise", "b2b", "professional", "serious"],
}


@dataclass(frozen=True)
class _PaletteTemplate:
    style: VisualStyle
    category: str
    background: tuple[str, str]
    foreground: tuple[str, str]
    primary: tuple[str, str]
    primary_fg: tuple[str, str]
    accent: tuple[str, str]
    muted: tuple[str, str]
    muted_fg: tuple[str, str]
    border: tuple[str, str]
    description: str


_PALETTES: list[_PaletteTemplate] = [
    _PaletteTemplate(
        style=VisualStyle.SOFT_PREMIUM,
        category="wellness",
        background=("background", "#FAFAF8"),
        foreground=("foreground", "#1A1A1A"),
        primary=("primary", "#2D4A3E"),
        primary_fg=("primary-foreground", "#F0F5F2"),
        accent=("accent", "#7EC8A4"),
        muted=("muted", "#F2F5F3"),
        muted_fg=("muted-foreground", "#6B7A72"),
        border=("border", "#E4EBE7"),
        description="Warm neutral ground with deep sage primary and mint accent — evokes nature and trust.",
    ),
    _PaletteTemplate(
        style=VisualStyle.SOFT_PREMIUM,
        category="ngo",
        background=("background", "#FAFAFA"),
        foreground=("foreground", "#111111"),
        primary=("primary", "#1C3D2F"),
        primary_fg=("primary-foreground", "#F0F5F2"),
        accent=("accent", "#4E8B65"),
        muted=("muted", "#F4F7F5"),
        muted_fg=("muted-foreground", "#5A6B62"),
        border=("border", "#E0E8E3"),
        description="Deep forest green palette conveying trust, sustainability, and social impact.",
    ),
    _PaletteTemplate(
        style=VisualStyle.SOFT_PREMIUM,
        category="finance",
        background=("background", "#FAFAFA"),
        foreground=("foreground", "#0F172A"),
        primary=("primary", "#0F172A"),
        primary_fg=("primary-foreground", "#F8FAFC"),
        accent=("accent", "#C9A84C"),
        muted=("muted", "#F1F5F9"),
        muted_fg=("muted-foreground", "#64748B"),
        border=("border", "#E2E8F0"),
        description="Ink navy with gold accent — classic wealth management aesthetic.",
    ),
    _PaletteTemplate(
        style=VisualStyle.MINIMALIST,
        category="saas",
        background=("background", "#FFFFFF"),
        foreground=("foreground", "#111111"),
        primary=("primary", "#111111"),
        primary_fg=("primary-foreground", "#FFFFFF"),
        accent=("accent", "#111111"),
        muted=("muted", "#F7F7F7"),
        muted_fg=("muted-foreground", "#6B6B6B"),
        border=("border", "#E5E5E5"),
        description="Pure monochromatic — maximum clarity and focus, Notion/Linear inspired.",
    ),
    _PaletteTemplate(
        style=VisualStyle.DARK_DEVELOPER,
        category="developer",
        background=("background", "#0A0A0B"),
        foreground=("foreground", "#EFEFEF"),
        primary=("primary", "#EFEFEF"),
        primary_fg=("primary-foreground", "#0A0A0B"),
        accent=("accent", "#00FF94"),
        muted=("muted", "#1A1A1E"),
        muted_fg=("muted-foreground", "#666666"),
        border=("border", "#2A2A2E"),
        description="Terminal dark with electric green accent — precision developer tool aesthetic.",
    ),
    _PaletteTemplate(
        style=VisualStyle.WARM_ORGANIC,
        category="restaurant",
        background=("background", "#FAF7F2"),
        foreground=("foreground", "#1C1410"),
        primary=("primary", "#8B4513"),
        primary_fg=("primary-foreground", "#FAF7F2"),
        accent=("accent", "#D4A853"),
        muted=("muted", "#F0EBE3"),
        muted_fg=("muted-foreground", "#7A6A5A"),
        border=("border", "#E5DDD2"),
        description="Warm parchment with saddle brown and amber — artisan dining aesthetic.",
    ),
    _PaletteTemplate(
        style=VisualStyle.CORPORATE_CLEAN,
        category="landing",
        background=("background", "#F8F9FA"),
        foreground=("foreground", "#1A1A2E"),
        primary=("primary", "#1A1A2E"),
        primary_fg=("primary-foreground", "#FFFFFF"),
        accent=("accent", "#4361EE"),
        muted=("muted", "#EEF0F4"),
        muted_fg=("muted-foreground", "#6B7280"),
        border=("border", "#E5E7EB"),
        description="Professional midnight with electric blue accent — modern enterprise SaaS.",
    ),
    _PaletteTemplate(
        style=VisualStyle.EDITORIAL,
        category="creative",
        background=("background", "#F5F3EF"),
        foreground=("foreground", "#1A1208"),
        primary=("primary", "#1A1208"),
        primary_fg=("primary-foreground", "#F5F3EF"),
        accent=("accent", "#C4391A"),
        muted=("muted", "#EAE8E3"),
        muted_fg=("muted-foreground", "#7A7163"),
        border=("border", "#DDDBD5"),
        description="Warm off-white with editorial crimson — bold typographic presence.",
    ),
]

_FONT_PAIRINGS: Final[dict[str, FontPairing]] = {
    "soft-premium": FontPairing(
        display_family="DM Serif Display",
        display_google_import="@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');",
        body_family="Inter",
        body_google_import="@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');",
        mono_family=None,
        mono_google_import=None,
        css_variables=(
            "--font-display: 'DM Serif Display', ui-serif, Georgia, serif;\n"
            "--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;"
        ),
        rationale="DM Serif Display brings editorial weight to headings while Inter provides the crisp legibility modern SaaS expects.",
    ),
    "minimalist": FontPairing(
        display_family="Geist",
        display_google_import="@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');",
        body_family="Inter",
        body_google_import="",
        mono_family="JetBrains Mono",
        mono_google_import="@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');",
        css_variables=(
            "--font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;\n"
            "--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;\n"
            "--font-mono: 'JetBrains Mono', ui-monospace, monospace;"
        ),
        rationale="Single sans-serif family for maximum visual unity — hierarchy achieved through size and weight alone, not font switching.",
    ),
    "dark-developer": FontPairing(
        display_family="Geist",
        display_google_import="@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');",
        body_family="Inter",
        body_google_import="",
        mono_family="JetBrains Mono",
        mono_google_import="@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');",
        css_variables=(
            "--font-display: 'Inter', ui-sans-serif, sans-serif;\n"
            "--font-body: 'Inter', ui-sans-serif, sans-serif;\n"
            "--font-mono: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;"
        ),
        rationale="High-weight Inter for punchy headings, JetBrains Mono for all code labels — developer precision aesthetic.",
    ),
    "editorial": FontPairing(
        display_family="Fraunces",
        display_google_import="@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;0,900;1,700&display=swap');",
        body_family="Work Sans",
        body_google_import="@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap');",
        mono_family=None,
        mono_google_import=None,
        css_variables=(
            "--font-display: 'Fraunces', ui-serif, Georgia, serif;\n"
            "--font-body: 'Work Sans', ui-sans-serif, system-ui, sans-serif;"
        ),
        rationale="Fraunces is a variable optical-size serif with personality — powerful contrast against the neutral Work Sans body.",
    ),
    "warm-organic": FontPairing(
        display_family="Lora",
        display_google_import="@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');",
        body_family="Source Sans 3",
        body_google_import="@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600&display=swap');",
        mono_family=None,
        mono_google_import=None,
        css_variables=(
            "--font-display: 'Lora', ui-serif, Georgia, serif;\n"
            "--font-body: 'Source Sans 3', ui-sans-serif, system-ui, sans-serif;"
        ),
        rationale="Lora's warm serifs pair naturally with Source Sans 3's humanist warmth — ideal for artisan and organic brands.",
    ),
    "corporate-clean": FontPairing(
        display_family="Instrument Sans",
        display_google_import="@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');",
        body_family="Inter",
        body_google_import="@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');",
        mono_family=None,
        mono_google_import=None,
        css_variables=(
            "--font-display: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;\n"
            "--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;"
        ),
        rationale="Instrument Sans is grounded and modern — authoritative for enterprise without the sterility of pure system fonts.",
    ),
}


class DesignSystemGenerator:
    """Analyzes a user brief and produces a complete, structured design plan."""

    def generate(self, brief: str) -> DesignPlan:
        brief_lower = brief.lower()
        category = self._detect_category(brief_lower)
        style = self._detect_style(brief_lower, category)
        layout = self._select_layout(brief_lower, category)
        palette = self._select_palette(style, category)
        typography = self._select_typography(style)
        sections = self._generate_sections(category, brief_lower)
        animations = self._generate_animations(style)
        css_effects = self._generate_css_effects(style)
        anti_patterns = self._generate_anti_patterns(style, category)
        a11y_checklist = self._generate_a11y_checklist()
        responsive_checklist = self._generate_responsive_checklist()
        pre_build = self._generate_pre_build_checklist(palette, typography)
        libraries = self._suggest_libraries(style, category)
        prompt = self._build_system_prompt(brief, style, layout, palette, typography, sections)

        return DesignPlan(
            brief=brief,
            brief_category=category,
            layout_pattern=layout,
            layout_rationale=self._layout_rationale(layout, category),
            visual_style=style,
            visual_style_rationale=self._style_rationale(style, category),
            color_palette=palette,
            typography=typography,
            section_order=sections,
            animation_specs=animations,
            css_effects=css_effects,
            anti_patterns=anti_patterns,
            accessibility_checklist=a11y_checklist,
            responsiveness_checklist=responsive_checklist,
            pre_build_checklist=pre_build,
            estimated_component_count=max(4, len(sections) * 2),
            suggested_libraries=libraries,
            system_prompt_injection=prompt,
        )

    # ------------------------------------------------------------------
    # Detection helpers
    # ------------------------------------------------------------------

    def _detect_category(self, brief: str) -> str:
        scores: dict[str, int] = {cat: 0 for cat in _KEYWORDS}
        for cat, keywords in _KEYWORDS.items():
            for kw in keywords:
                if kw in brief:
                    scores[cat] += 1
        best = max(scores, key=lambda k: scores[k])
        return best if scores[best] > 0 else "landing"

    def _detect_style(self, brief: str, category: str) -> VisualStyle:
        for style, keywords in _STYLE_KEYWORDS.items():
            for kw in keywords:
                if kw in brief:
                    return style
        defaults: dict[str, VisualStyle] = {
            "wellness": VisualStyle.SOFT_PREMIUM,
            "saas": VisualStyle.MINIMALIST,
            "ecommerce": VisualStyle.SOFT_PREMIUM,
            "landing": VisualStyle.CORPORATE_CLEAN,
            "ngo": VisualStyle.SOFT_PREMIUM,
            "finance": VisualStyle.SOFT_PREMIUM,
            "developer": VisualStyle.DARK_DEVELOPER,
            "creative": VisualStyle.EDITORIAL,
            "restaurant": VisualStyle.WARM_ORGANIC,
            "education": VisualStyle.CORPORATE_CLEAN,
        }
        return defaults.get(category, VisualStyle.CORPORATE_CLEAN)

    def _select_layout(self, brief: str, category: str) -> LayoutPattern:
        if any(w in brief for w in ["dashboard", "analytics", "admin"]):
            return LayoutPattern.DASHBOARD_GRID
        if any(w in brief for w in ["sidebar", "doc", "docs", "documentation"]):
            return LayoutPattern.SIDEBAR_CONTENT
        if any(w in brief for w in ["magazine", "blog", "editorial", "news"]):
            return LayoutPattern.MAGAZINE_EDITORIAL
        if any(w in brief for w in ["portfolio", "split", "agency"]):
            return LayoutPattern.SPLIT_SCREEN
        defaults: dict[str, LayoutPattern] = {
            "saas": LayoutPattern.HERO_FEATURES_CTA,
            "landing": LayoutPattern.HERO_FEATURES_CTA,
            "ecommerce": LayoutPattern.CARD_GRID,
            "developer": LayoutPattern.FULL_BLEED_SCROLL,
        }
        return defaults.get(category, LayoutPattern.HERO_FEATURES_CTA)

    def _select_palette(self, style: VisualStyle, category: str) -> ColorPalette:
        for p in _PALETTES:
            if p.style == style and p.category == category:
                return self._palette_from_template(p)
        for p in _PALETTES:
            if p.style == style:
                return self._palette_from_template(p)
        return self._palette_from_template(_PALETTES[0])

    def _palette_from_template(self, t: _PaletteTemplate) -> ColorPalette:
        def tok(name_hex: tuple[str, str], usage: str) -> ColorToken:
            return ColorToken(name=name_hex[0], hex=name_hex[1], usage=usage)

        return ColorPalette(
            background=tok(t.background, "Page ground color"),
            foreground=tok(t.foreground, "Default text color"),
            primary=tok(t.primary, "Primary interactive color — buttons, links"),
            primary_foreground=tok(t.primary_fg, "Text on primary color backgrounds"),
            accent=tok(t.accent, "Highlight and interactive emphasis"),
            muted=tok(t.muted, "Subdued surfaces — input backgrounds, code blocks"),
            muted_foreground=tok(t.muted_fg, "Labels, captions, secondary text"),
            border=tok(t.border, "Hairline dividers and component borders"),
            description=t.description,
        )

    def _select_typography(self, style: VisualStyle) -> FontPairing:
        mapping: dict[VisualStyle, str] = {
            VisualStyle.SOFT_PREMIUM: "soft-premium",
            VisualStyle.MINIMALIST: "minimalist",
            VisualStyle.DARK_DEVELOPER: "dark-developer",
            VisualStyle.EDITORIAL: "editorial",
            VisualStyle.WARM_ORGANIC: "warm-organic",
            VisualStyle.CORPORATE_CLEAN: "corporate-clean",
            VisualStyle.BRUTALIST: "editorial",
        }
        key = mapping.get(style, "soft-premium")
        return _FONT_PAIRINGS[key]

    # ------------------------------------------------------------------
    # Content helpers
    # ------------------------------------------------------------------

    def _generate_sections(self, category: str, brief: str) -> list[str]:
        base: dict[str, list[str]] = {
            "landing": ["Navigation", "Hero", "Social Proof / Logos", "Features", "How It Works", "Testimonials", "Pricing", "FAQ", "Final CTA", "Footer"],
            "wellness": ["Navigation", "Hero", "Services", "Philosophy / About", "Testimonials", "Gallery", "Booking CTA", "Footer"],
            "saas": ["Navigation", "Hero", "Logo Strip", "Feature Highlights", "Product Demo", "Social Proof", "Pricing Tiers", "FAQ", "CTA Banner", "Footer"],
            "ecommerce": ["Navigation", "Hero Banner", "Featured Categories", "Product Grid", "Promotions", "Trust Signals", "Newsletter", "Footer"],
            "ngo": ["Navigation", "Hero", "Impact Numbers", "Core Programs", "Stories", "Corporate CSR", "Donation CTA", "Footer"],
            "finance": ["Navigation", "Hero", "Key Metrics", "Services", "Trust & Compliance", "Client Logos", "Case Studies", "Contact", "Footer"],
            "developer": ["Navigation", "Hero + Code Snippet", "Feature Overview", "Installation", "API Reference Preview", "GitHub CTA", "Footer"],
            "creative": ["Navigation", "Full-bleed Hero", "Selected Work Grid", "About", "Services", "Testimonials", "Contact", "Footer"],
            "restaurant": ["Navigation", "Hero", "Menu Highlights", "About / Philosophy", "Gallery", "Events", "Reservations CTA", "Footer"],
            "education": ["Navigation", "Hero", "Course Catalog", "Learning Outcomes", "Instructor Profiles", "Student Stories", "Enrollment CTA", "Footer"],
        }
        return base.get(category, base["landing"])

    def _generate_animations(self, style: VisualStyle) -> list[AnimationSpec]:
        spring_default = {"stiffness": 300.0, "damping": 30.0, "mass": 1.0}
        spring_gentle = {"stiffness": 200.0, "damping": 28.0, "mass": 1.2}
        spring_snappy = {"stiffness": 400.0, "damping": 35.0, "mass": 1.0}

        if style == VisualStyle.MINIMALIST:
            return [
                AnimationSpec(trigger="hover", target="Nav links", effect="Instant background fill", duration_ms=80),
                AnimationSpec(trigger="hover", target="Buttons", effect="Background inversion", duration_ms=80),
                AnimationSpec(trigger="scroll-enter", target="Content sections", effect="Fade in, no motion", duration_ms=200),
            ]
        if style == VisualStyle.DARK_DEVELOPER:
            return [
                AnimationSpec(trigger="mount", target="Hero heading", effect="Typewriter reveal character by character", duration_ms=1200),
                AnimationSpec(trigger="hover", target="Feature cards", effect="Border glow + y-4 lift", spring_config=spring_snappy),
                AnimationSpec(trigger="scroll-enter", target="Code blocks", effect="Slide in from right", spring_config=spring_default),
            ]
        return [
            AnimationSpec(trigger="mount", target="Hero heading", effect="Fade up from y:32", spring_config=spring_gentle),
            AnimationSpec(trigger="mount", target="Hero subheadline", effect="Fade up, 80ms delay", spring_config=spring_gentle),
            AnimationSpec(trigger="mount", target="Hero CTA buttons", effect="Fade up, 160ms delay", spring_config=spring_gentle),
            AnimationSpec(trigger="ambient-loop", target="Floating metric card", effect="Sine-wave vertical oscillation ±10px", spring_config={"stiffness": 60.0, "damping": 12.0, "mass": 1.0}),
            AnimationSpec(trigger="hover", target="Feature cards", effect="y:-6, scale:1.01, box-shadow increase", spring_config=spring_default),
            AnimationSpec(trigger="hover", target="Primary CTA", effect="scale:1.03", spring_config=spring_snappy),
            AnimationSpec(trigger="hover", target="Secondary CTA", effect="scale:1.02", spring_config=spring_snappy),
            AnimationSpec(trigger="scroll-enter", target="Section headings", effect="Fade up from y:24", spring_config=spring_gentle),
            AnimationSpec(trigger="scroll-enter", target="Card grid", effect="Staggered fade-up, 60ms between items", spring_config=spring_default),
            AnimationSpec(trigger="scroll-enter", target="Stats row", effect="Counter animation + fade-in", duration_ms=1000),
        ]

    def _generate_css_effects(self, style: VisualStyle) -> list[CSSEffect]:
        if style == VisualStyle.MINIMALIST:
            return [
                CSSEffect(
                    name="1px Structure Border",
                    css=".panel {\n  border: 1px solid var(--border);\n  border-radius: 4px;\n}",
                    description="Sharp structural division — no shadows, borders only.",
                ),
                CSSEffect(
                    name="Instant Hover State",
                    css=".interactive { transition: background 80ms; }\n.interactive:hover { background: var(--muted); }",
                    description="Zero-delay feedback for keyboard-first interfaces.",
                ),
            ]
        if style == VisualStyle.DARK_DEVELOPER:
            return [
                CSSEffect(
                    name="Neon Border Glow",
                    css=".glow {\n  box-shadow: 0 0 0 1px var(--accent), 0 0 20px rgba(0,255,148,0.15);\n}",
                    description="Electric accent border glow for highlighted elements.",
                ),
                CSSEffect(
                    name="Terminal Scanline",
                    css=".terminal::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px);\n  pointer-events: none;\n}",
                    description="Subtle scanline texture for terminal/code aesthetic.",
                ),
            ]
        return [
            CSSEffect(
                name="Layered Diffuse Shadow",
                css=".card {\n  box-shadow:\n    0 1px 3px rgba(0,0,0,0.04),\n    0 8px 24px rgba(0,0,0,0.05);\n}\n.card:hover {\n  box-shadow:\n    0 4px 12px rgba(0,0,0,0.06),\n    0 24px 56px rgba(0,0,0,0.08);\n}",
                description="Two-layer shadow: near shadow for shape definition, far shadow for elevation depth.",
            ),
            CSSEffect(
                name="Glassmorphism Nav",
                css=".glass-nav {\n  background: rgba(250, 250, 250, 0.82);\n  backdrop-filter: blur(20px) saturate(180%);\n  -webkit-backdrop-filter: blur(20px) saturate(180%);\n  border-bottom: 1px solid rgba(0,0,0,0.06);\n}",
                description="Frosted glass nav bar — applied when user has scrolled past hero.",
            ),
            CSSEffect(
                name="Gradient Accent Pill",
                css=".eyebrow-pill {\n  background: rgba(VAR_ACCENT_RGB, 0.1);\n  border: 1px solid rgba(VAR_ACCENT_RGB, 0.2);\n  border-radius: 999px;\n  padding: 4px 14px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}",
                description="Section eyebrow labels styled as subtle colored pills.",
            ),
            CSSEffect(
                name="Radial Mesh Background",
                css=".section-mesh {\n  background:\n    radial-gradient(ellipse 80% 60% at 70% 40%, rgba(VAR_ACCENT_RGB, 0.07) 0%, transparent 70%),\n    var(--background);\n}",
                description="Subtle atmospheric radial gradient — adds depth without overwhelming content.",
            ),
        ]

    def _generate_anti_patterns(self, style: VisualStyle, category: str) -> list[AntiPattern]:
        base = [
            AntiPattern(
                pattern="Generic blue gradient hero",
                reason="bg-gradient-to-r from-blue-600 to-indigo-600 appears on ~40% of all websites built with Tailwind. Instantly signals low-effort.",
                instead="Use a flat ground color from the custom palette with a radial-gradient atmosphere overlay.",
            ),
            AntiPattern(
                pattern="Equal-column 3-card feature grid",
                reason="Three identical-height, identical-width cards with icon + title + text reads as a template, not a design.",
                instead="Vary card sizes, use a 2-col / 1-col asymmetric layout, or integrate an image or visual into one card.",
            ),
            AntiPattern(
                pattern="Full-width CTA button on desktop",
                reason="100% wide buttons on large screens look unpolished — they were designed for mobile.",
                instead="Constrain button width to content with padding: 12px 32px and let it sit inline.",
            ),
            AntiPattern(
                pattern="Centered testimonial carousel with auto-advance",
                reason="Auto-advancing carousels are an accessibility violation and frustrate users who are reading.",
                instead="Use a static masonry grid or horizontal scroll list of testimonials.",
            ),
            AntiPattern(
                pattern="Lorem ipsum placeholder copy",
                reason="Placeholder text prevents accurate layout design — line breaks, rhythm, and hierarchy all depend on real content.",
                instead="Write realistic domain-specific copy for every text node before building the layout.",
            ),
        ]
        if style == VisualStyle.SOFT_PREMIUM:
            base.extend([
                AntiPattern(
                    pattern="Sharp box-shadow (0 4px 6px rgba(0,0,0,0.15))",
                    reason="Harsh shadows read as Bootstrap or Material Design, not premium.",
                    instead="Use layered diffuse shadows: 0 1px 3px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05).",
                ),
                AntiPattern(
                    pattern="CSS ease transitions on interactive elements",
                    reason="CSS easing is mechanical. Premium interfaces use spring physics for natural deceleration.",
                    instead="Use Framer Motion with stiffness: 300, damping: 30 for all hover and mount animations.",
                ),
            ])
        if style == VisualStyle.MINIMALIST:
            base.extend([
                AntiPattern(
                    pattern="Decorative gradients on backgrounds",
                    reason="Gradients in minimalist interfaces add noise without adding information.",
                    instead="Use flat --bg or --bg-subtle colors. Reserve gradient for literal data (charts, progress).",
                ),
                AntiPattern(
                    pattern="border-radius > 6px on application UI",
                    reason="Heavy rounding feels bubbly and consumer — minimalist precision UIs use 4–6px max.",
                    instead="Use border-radius: 4px for controls, 6px for panels, 999px for pills only.",
                ),
            ])
        return base

    def _generate_a11y_checklist(self) -> list[AccessibilityCheck]:
        return [
            AccessibilityCheck(item="Body text color contrast ≥ 4.5:1", priority="critical", how_to_verify="Use WebAIM Contrast Checker with foreground and background hex values"),
            AccessibilityCheck(item="All interactive elements reachable by Tab key", priority="critical", how_to_verify="Tab through entire page with keyboard only — every button, link, input must be focusable"),
            AccessibilityCheck(item="Focus rings visible on all interactive elements", priority="critical", how_to_verify="Tab to each element and confirm focus outline is visible at 3:1 contrast minimum"),
            AccessibilityCheck(item="Images have descriptive alt text", priority="high", how_to_verify="Inspect each <img> — alt must describe content, not be empty or 'image'"),
            AccessibilityCheck(item="Heading hierarchy is sequential (h1 → h2 → h3)", priority="high", how_to_verify="Use browser dev tools Accessibility tree or HeadingsMap extension"),
            AccessibilityCheck(item="Color is not the sole conveyor of meaning", priority="high", how_to_verify="Simulate deuteranopia — error states, badges, status must have icon or text, not color only"),
            AccessibilityCheck(item="Interactive elements have accessible name", priority="high", how_to_verify="All icon-only buttons must have aria-label or aria-labelledby"),
            AccessibilityCheck(item="Motion respects prefers-reduced-motion", priority="medium", how_to_verify="Add @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } } and verify"),
            AccessibilityCheck(item="Form inputs are associated with labels", priority="medium", how_to_verify="Every <input> has a matching <label htmlFor> or aria-label"),
            AccessibilityCheck(item="Page has a <main> landmark", priority="medium", how_to_verify="Check HTML structure for <main> wrapping primary content"),
        ]

    def _generate_responsive_checklist(self) -> list[str]:
        return [
            "Test at 375px (iPhone SE) — no horizontal scroll, no content clipped",
            "Test at 768px (tablet) — grid collapses from desktop to 2-col or 1-col",
            "Test at 1024px (laptop) — nav links visible, hero text readable",
            "Test at 1440px (desktop) — max-width container centers correctly with padding",
            "Test at 320px (minimum) — content still readable, no overflow",
            "All images use responsive sizes (width: 100%, max-width on container)",
            "Touch targets minimum 44×44px on mobile",
            "Font sizes use clamp() or rem — no px-only sizes above 14px",
            "Nav collapses to hamburger at ≤768px breakpoint",
            "Horizontal card grids use grid-cols-1 on mobile, grid-cols-2 on tablet",
        ]

    def _generate_pre_build_checklist(self, palette: ColorPalette, typography: FontPairing) -> list[str]:
        return [
            f"Load display font '{typography.display_family}' from Google Fonts before writing any JSX",
            f"Load body font '{typography.body_family}' from Google Fonts before writing any JSX",
            "Define all CSS custom properties in :root before using them in components",
            f"Set page background to {palette.background.hex} — not #FFFFFF",
            f"Set default text color to {palette.foreground.hex}",
            "Write realistic page copy for hero headline and subheadline before building layout",
            "Identify the single primary action — every section should point toward it",
            "Determine which sections get dark treatment (inverted colors) before building",
            "Install framer-motion if spring animations are specified",
            "Create a color token reference comment at the top of the CSS file",
            "Test Google Fonts @import is the first statement in the CSS file",
            "Confirm all listed sections in the plan are accounted for in the component tree",
        ]

    def _suggest_libraries(self, style: VisualStyle, category: str) -> list[str]:
        base = ["framer-motion", "clsx", "tailwind-merge"]
        if category in ("saas", "developer", "finance"):
            base.append("recharts")
        if category in ("ecommerce", "restaurant"):
            base.append("embla-carousel-react")
        if style == VisualStyle.DARK_DEVELOPER:
            base.extend(["shiki", "react-syntax-highlighter"])
        return base

    def _layout_rationale(self, layout: LayoutPattern, category: str) -> str:
        rationales: dict[LayoutPattern, str] = {
            LayoutPattern.HERO_FEATURES_CTA: "Classic conversion-optimized structure. Hero establishes identity and value prop immediately; feature sections build conviction; final CTA converts. Proven architecture for marketing pages.",
            LayoutPattern.SIDEBAR_CONTENT: "Navigation-first structure for content-dense applications. Fixed sidebar provides persistent wayfinding while content area handles depth. Standard for productivity tools and docs.",
            LayoutPattern.MAGAZINE_EDITORIAL: "Typographic-led, content-first layout. Asymmetric grid and varied image placement create visual rhythm. Ideal when content is the product.",
            LayoutPattern.DASHBOARD_GRID: "Data-first layout. CSS Grid accommodates different-sized metric tiles, charts, and tables. Content hierarchy is established by size, not position.",
            LayoutPattern.FULL_BLEED_SCROLL: "Cinematic scroll narrative. Each viewport is a full-bleed canvas with a single focal message. Used for premium brand storytelling and product launches.",
            LayoutPattern.SPLIT_SCREEN: "Binary composition — two half-screen columns create visual tension and comparison. Effective for before/after, product features, or portfolio showcases.",
            LayoutPattern.CARD_GRID: "Browse-optimized layout. Responsive grid of consistently-sized cards with clear scan hierarchy — name, image, key attribute, CTA.",
            LayoutPattern.DOCUMENT: "Reading-optimized single column. Max 720px width, generous line-height, no distracting chrome. Ideal for documentation and long-form content.",
        }
        return rationales.get(layout, "Standard layout for this content type.")

    def _style_rationale(self, style: VisualStyle, category: str) -> str:
        rationales: dict[VisualStyle, str] = {
            VisualStyle.SOFT_PREMIUM: "Generous whitespace, diffuse layered shadows, spring-physics motion, and an editorial serif headline create the perception of quality and care. The interface communicates that this product/organization has been invested in.",
            VisualStyle.MINIMALIST: "Structural reduction builds trust through clarity. When everything non-essential is removed, what remains communicates with absolute precision. Ideal for productivity tools and data-heavy interfaces.",
            VisualStyle.DARK_DEVELOPER: "Dark ground with high-contrast text reduces eye strain during extended use. Monospace accents and terminal aesthetics signal technical precision and legitimacy to developer audiences.",
            VisualStyle.EDITORIAL: "Typography-led layout with editorial serif headings creates a publication-grade content experience. Ideal when the brand has a distinct voice and content is the core value.",
            VisualStyle.BRUTALIST: "Deliberate rejection of convention signals confidence. Raw structure and typographic aggression communicate that this brand doesn't need design approval — a bold choice for self-assured brands.",
            VisualStyle.WARM_ORGANIC: "Earth tones, serif type, and textured neutrals evoke authenticity and craftsmanship. Ideal for food, wellness, and artisan brands where provenance and care are the selling points.",
            VisualStyle.CORPORATE_CLEAN: "Professional competence communicated through precise layout, restrained color, and clear hierarchy. Builds institutional trust without personality — appropriate for enterprise B2B.",
        }
        return rationales.get(style, "Selected based on brief analysis.")

    def _build_system_prompt(
        self,
        brief: str,
        style: VisualStyle,
        layout: LayoutPattern,
        palette: ColorPalette,
        typography: FontPairing,
        sections: list[str],
    ) -> str:
        sections_str = "\n".join(f"  {i + 1}. {s}" for i, s in enumerate(sections))
        return f"""You are an elite UI/UX engineer building: "{brief}"

VISUAL STYLE: {style.value}
LAYOUT PATTERN: {layout.value}

COLOR PALETTE (use these exact hex values — do not use generic Tailwind colors):
  background:        {palette.background.hex}
  foreground:        {palette.foreground.hex}
  primary:           {palette.primary.hex}
  primary-fg:        {palette.primary_foreground.hex}
  accent:            {palette.accent.hex}
  muted:             {palette.muted.hex}
  muted-foreground:  {palette.muted_foreground.hex}
  border:            {palette.border.hex}

TYPOGRAPHY:
  Display: {typography.display_family}
  Body:    {typography.body_family}
  Load both from Google Fonts. Display import first.

REQUIRED SECTIONS (in this order):
{sections_str}

MOTION RULES:
  - All interactive animations use Framer Motion with spring physics (stiffness: 300, damping: 30)
  - Mount animations: fade + y-translate, staggered by 60ms
  - Hover: y-4, scale-1.01 on cards; scale-1.03 on primary CTA
  - No linear CSS transitions on user-visible interactions

QUALITY RULES:
  - Never use blue-500, indigo-600, or any generic Tailwind color as primary
  - Minimum card padding: 28px. Minimum section padding: 80px vertical.
  - All text must be real, domain-specific copy — no lorem ipsum
  - All interactive elements need hover + focus states
  - All data-displaying components need loading, error, and empty states
  - No placeholder comments. No truncated code. Full production output only.

Begin building immediately. Do not describe what you are about to do."""
