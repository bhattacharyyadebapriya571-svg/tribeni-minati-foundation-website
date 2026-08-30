"""Pydantic models for UI UX Pro Max design plans."""

from __future__ import annotations

from enum import Enum
from typing import Annotated

from pydantic import BaseModel, Field


class LayoutPattern(str, Enum):
    HERO_FEATURES_CTA = "hero-features-cta"
    SIDEBAR_CONTENT = "sidebar-content"
    MAGAZINE_EDITORIAL = "magazine-editorial"
    DASHBOARD_GRID = "dashboard-grid"
    FULL_BLEED_SCROLL = "full-bleed-scroll"
    SPLIT_SCREEN = "split-screen"
    CARD_GRID = "card-grid"
    DOCUMENT = "document"


class VisualStyle(str, Enum):
    SOFT_PREMIUM = "soft-premium"
    MINIMALIST = "minimalist"
    EDITORIAL = "editorial"
    BRUTALIST = "brutalist"
    DARK_DEVELOPER = "dark-developer"
    WARM_ORGANIC = "warm-organic"
    CORPORATE_CLEAN = "corporate-clean"


class ColorToken(BaseModel):
    name: str
    hex: str
    usage: str
    contrast_on_white: float | None = None
    contrast_on_dark: float | None = None


class ColorPalette(BaseModel):
    background: ColorToken
    foreground: ColorToken
    primary: ColorToken
    primary_foreground: ColorToken
    accent: ColorToken
    muted: ColorToken
    muted_foreground: ColorToken
    border: ColorToken
    description: str

    def to_css_variables(self) -> str:
        tokens = {
            "--background": self.background.hex,
            "--foreground": self.foreground.hex,
            "--primary": self.primary.hex,
            "--primary-foreground": self.primary_foreground.hex,
            "--accent": self.accent.hex,
            "--muted": self.muted.hex,
            "--muted-foreground": self.muted_foreground.hex,
            "--border": self.border.hex,
        }
        lines = [":root {"]
        for name, value in tokens.items():
            lines.append(f"  {name}: {value};")
        lines.append("}")
        return "\n".join(lines)


class FontPairing(BaseModel):
    display_family: str
    display_google_import: str
    body_family: str
    body_google_import: str
    mono_family: str | None = None
    mono_google_import: str | None = None
    css_variables: str
    rationale: str


class AnimationSpec(BaseModel):
    trigger: str
    target: str
    effect: str
    spring_config: dict[str, float] | None = None
    duration_ms: int | None = None


class CSSEffect(BaseModel):
    name: str
    css: str
    description: str


class AntiPattern(BaseModel):
    pattern: str
    reason: str
    instead: str


class AccessibilityCheck(BaseModel):
    item: str
    priority: str  # "critical" | "high" | "medium"
    how_to_verify: str


class DesignPlan(BaseModel):
    brief: str
    brief_category: str
    layout_pattern: LayoutPattern
    layout_rationale: str
    visual_style: VisualStyle
    visual_style_rationale: str
    color_palette: ColorPalette
    typography: FontPairing
    section_order: list[str]
    animation_specs: list[AnimationSpec]
    css_effects: list[CSSEffect]
    anti_patterns: list[AntiPattern]
    accessibility_checklist: list[AccessibilityCheck]
    responsiveness_checklist: list[str]
    pre_build_checklist: list[str]
    estimated_component_count: int
    suggested_libraries: list[str]
    system_prompt_injection: str

    def to_markdown(self) -> str:
        """Render the full design plan as a markdown document."""
        lines: list[str] = []

        lines.append(f"# Design Plan: {self.brief}")
        lines.append(f"\n**Category:** {self.brief_category}")
        lines.append(f"**Style:** {self.visual_style.value}  |  **Layout:** {self.layout_pattern.value}")
        lines.append(f"**Est. Components:** {self.estimated_component_count}")

        lines.append("\n---\n## Layout")
        lines.append(f"**Pattern:** `{self.layout_pattern.value}`")
        lines.append(f"\n{self.layout_rationale}")

        lines.append("\n**Section Order:**")
        for i, section in enumerate(self.section_order, 1):
            lines.append(f"{i}. {section}")

        lines.append("\n---\n## Visual Style")
        lines.append(f"**Style:** `{self.visual_style.value}`")
        lines.append(f"\n{self.visual_style_rationale}")

        lines.append("\n---\n## Color Palette")
        lines.append(f"\n*{self.color_palette.description}*\n")
        lines.append("| Token | Hex | Usage |")
        lines.append("|-------|-----|-------|")
        for token in [
            self.color_palette.background,
            self.color_palette.foreground,
            self.color_palette.primary,
            self.color_palette.primary_foreground,
            self.color_palette.accent,
            self.color_palette.muted,
            self.color_palette.muted_foreground,
            self.color_palette.border,
        ]:
            lines.append(f"| `--{token.name}` | `{token.hex}` | {token.usage} |")

        lines.append("\n**CSS Variables:**")
        lines.append("```css")
        lines.append(self.color_palette.to_css_variables())
        lines.append("```")

        lines.append("\n---\n## Typography")
        lines.append(f"**Display:** `{self.typography.display_family}`")
        lines.append(f"**Body:** `{self.typography.body_family}`")
        if self.typography.mono_family:
            lines.append(f"**Mono:** `{self.typography.mono_family}`")
        lines.append(f"\n*{self.typography.rationale}*")
        lines.append("\n**Google Fonts Imports:**")
        lines.append("```css")
        lines.append(self.typography.display_google_import)
        lines.append(self.typography.body_google_import)
        if self.typography.mono_google_import:
            lines.append(self.typography.mono_google_import)
        lines.append("```")
        lines.append("\n**CSS Variables:**")
        lines.append("```css")
        lines.append(self.typography.css_variables)
        lines.append("```")

        lines.append("\n---\n## Animation Specs")
        for anim in self.animation_specs:
            lines.append(f"\n### {anim.target} — {anim.trigger}")
            lines.append(f"- **Effect:** {anim.effect}")
            if anim.spring_config:
                cfg = anim.spring_config
                lines.append(
                    f"- **Spring:** stiffness={cfg.get('stiffness')}, damping={cfg.get('damping')}, mass={cfg.get('mass', 1.0)}"
                )
            if anim.duration_ms:
                lines.append(f"- **Duration:** {anim.duration_ms}ms")

        lines.append("\n---\n## Key CSS Effects")
        for effect in self.css_effects:
            lines.append(f"\n### {effect.name}")
            lines.append(f"*{effect.description}*")
            lines.append("```css")
            lines.append(effect.css)
            lines.append("```")

        lines.append("\n---\n## Anti-Patterns to Avoid")
        for ap in self.anti_patterns:
            lines.append(f"\n**❌ {ap.pattern}**")
            lines.append(f"- Why: {ap.reason}")
            lines.append(f"- Instead: {ap.instead}")

        lines.append("\n---\n## Accessibility Checklist")
        for check in self.accessibility_checklist:
            priority_icon = {"critical": "🔴", "high": "🟡", "medium": "🟢"}.get(check.priority, "⚪")
            lines.append(f"\n- {priority_icon} **{check.item}** ({check.priority})")
            lines.append(f"  - Verify: {check.how_to_verify}")

        lines.append("\n---\n## Responsiveness Checklist")
        for item in self.responsiveness_checklist:
            lines.append(f"- [ ] {item}")

        lines.append("\n---\n## Pre-Build Checklist")
        for item in self.pre_build_checklist:
            lines.append(f"- [ ] {item}")

        lines.append("\n---\n## Suggested Libraries")
        for lib in self.suggested_libraries:
            lines.append(f"- `{lib}`")

        lines.append("\n---\n## System Prompt Injection")
        lines.append("*Paste this block before your build prompt to activate all design rules:*\n")
        lines.append("```")
        lines.append(self.system_prompt_injection)
        lines.append("```")

        return "\n".join(lines)
