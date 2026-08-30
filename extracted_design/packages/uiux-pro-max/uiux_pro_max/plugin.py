"""AI Coding Assistant Plugin interface for UI UX Pro Max.

Implements a universal plugin protocol that works with:
- Cursor (via .cursorrules injection)
- Claude (via system prompt injection)
- Windsurf / Cascade (via .windsurfrules)
- Cline / VS Code AI (via system prompt)
- Any assistant that accepts a system prompt or instruction block
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Protocol, runtime_checkable

from uiux_pro_max.generator import DesignSystemGenerator
from uiux_pro_max.models import DesignPlan


@runtime_checkable
class AIAssistantPlugin(Protocol):
    """Protocol that all plugin adapters must implement."""

    name: str
    version: str

    def handle_request(self, user_message: str, context: dict[str, Any]) -> PluginResponse:
        """Process a user message and return an enriched response."""
        ...

    def get_install_instructions(self) -> str:
        """Return setup instructions for this plugin in the target assistant."""
        ...


class PluginResponse:
    """Response from the plugin containing enriched prompt and metadata."""

    def __init__(
        self,
        enriched_system_prompt: str,
        design_plan: DesignPlan,
        original_brief: str,
        action: str,
    ) -> None:
        self.enriched_system_prompt = enriched_system_prompt
        self.design_plan = design_plan
        self.original_brief = original_brief
        self.action = action

    def to_dict(self) -> dict[str, Any]:
        return {
            "action": self.action,
            "original_brief": self.original_brief,
            "enriched_system_prompt": self.enriched_system_prompt,
            "design_plan": json.loads(self.design_plan.model_dump_json()),
        }

    def to_markdown_block(self) -> str:
        """Return a markdown-formatted block ready to paste before the build prompt."""
        return (
            "<!-- UI UX Pro Max Design System —— auto-generated, do not edit -->\n"
            f"{self.enriched_system_prompt}\n"
            "<!-- end design system -->"
        )


class UIUXPlugin:
    """Main plugin class. Acts as the entry point for AI assistant integrations."""

    name = "uiux-pro-max"
    version = "1.0.0"

    # Trigger phrases that activate design plan generation
    DESIGN_TRIGGERS = [
        "build", "create", "make", "design", "generate",
        "landing page", "website", "dashboard", "app", "ui", "interface",
    ]

    def __init__(self) -> None:
        self.generator = DesignSystemGenerator()

    def handle_request(self, user_message: str, context: dict[str, Any] | None = None) -> PluginResponse:
        """Analyze the message, generate a design plan, and return an enriched prompt."""
        brief = self._extract_brief(user_message)
        plan = self.generator.generate(brief)

        enriched = self._build_enriched_prompt(plan, user_message)

        return PluginResponse(
            enriched_system_prompt=enriched,
            design_plan=plan,
            original_brief=brief,
            action="design_system_generated",
        )

    def _is_build_request(self, message: str) -> bool:
        lower = message.lower()
        return any(trigger in lower for trigger in self.DESIGN_TRIGGERS)

    def _extract_brief(self, message: str) -> str:
        """Extract the core build brief from a potentially verbose user message."""
        message = message.strip()
        prefixes = [
            "please build", "can you build", "build me", "create me",
            "please create", "can you create", "i want", "i need",
            "make me", "design me", "generate",
        ]
        lower = message.lower()
        for prefix in prefixes:
            if lower.startswith(prefix):
                return message[len(prefix):].strip(" ,.")
        return message

    def _build_enriched_prompt(self, plan: DesignPlan, original_message: str) -> str:
        return f"""{plan.system_prompt_injection}

ORIGINAL REQUEST: {original_message}

DESIGN PLAN SUMMARY:
- Layout: {plan.layout_pattern.value} — {plan.layout_rationale[:120]}...
- Style: {plan.visual_style.value}
- Palette: {plan.color_palette.background.hex} (bg) / {plan.color_palette.primary.hex} (primary) / {plan.color_palette.accent.hex} (accent)
- Fonts: {plan.typography.display_family} (display) + {plan.typography.body_family} (body)
- Sections: {', '.join(plan.section_order[:6])}{'...' if len(plan.section_order) > 6 else ''}
- Est. components: {plan.estimated_component_count}

CRITICAL ANTI-PATTERNS TO AVOID:
{chr(10).join(f'❌ {ap.pattern}' for ap in plan.anti_patterns[:4])}

PRE-BUILD CHECKLIST (complete before first component):
{chr(10).join(f'- {item}' for item in plan.pre_build_checklist[:5])}

Now build the complete, production-ready implementation. No placeholders. No truncated blocks."""

    def get_install_instructions(self) -> str:
        return INSTALL_INSTRUCTIONS

    def write_cursorrules(self, project_root: Path, brief: str) -> Path:
        """Generate and write a .cursorrules file for a project."""
        plan = self.generator.generate(brief)
        rules_content = _CURSORRULES_TEMPLATE.format(
            system_prompt=plan.system_prompt_injection,
            style=plan.visual_style.value,
            layout=plan.layout_pattern.value,
            bg=plan.color_palette.background.hex,
            fg=plan.color_palette.foreground.hex,
            primary=plan.color_palette.primary.hex,
            accent=plan.color_palette.accent.hex,
            border=plan.color_palette.border.hex,
            display_font=plan.typography.display_family,
            body_font=plan.typography.body_family,
        )
        output_path = project_root / ".cursorrules"
        output_path.write_text(rules_content)
        return output_path

    def write_windsurfrules(self, project_root: Path, brief: str) -> Path:
        """Generate and write a .windsurfrules file for Windsurf/Cascade."""
        path = self.write_cursorrules(project_root, brief)
        windsurfrules = project_root / ".windsurfrules"
        windsurfrules.write_text(path.read_text())
        return windsurfrules

    def get_mcp_tool_definition(self) -> dict[str, Any]:
        """Return an MCP tool definition for use in MCP servers."""
        return {
            "name": "generate_design_plan",
            "description": "Analyze a UI build brief and generate a complete design system plan including layout pattern, color palette, typography pairing, animation specs, anti-patterns, and a system prompt injection to guide the build.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "brief": {
                        "type": "string",
                        "description": "The UI build brief, e.g. 'a landing page for a wellness spa' or 'a SaaS dashboard for analytics'",
                    },
                    "output_format": {
                        "type": "string",
                        "enum": ["prompt", "full_plan", "palette_only"],
                        "default": "prompt",
                        "description": "What to return: system prompt injection, full JSON plan, or palette only",
                    },
                },
                "required": ["brief"],
            },
        }

    def handle_mcp_call(self, brief: str, output_format: str = "prompt") -> str:
        """Handle an MCP tool call and return serialized output."""
        plan = self.generator.generate(brief)

        if output_format == "palette_only":
            tokens = [
                plan.color_palette.background,
                plan.color_palette.foreground,
                plan.color_palette.primary,
                plan.color_palette.accent,
            ]
            return "\n".join(f"--{t.name}: {t.hex}" for t in tokens)

        if output_format == "full_plan":
            return plan.model_dump_json(indent=2)

        return plan.system_prompt_injection


_CURSORRULES_TEMPLATE = """\
# UI UX Pro Max — Auto-generated design rules
# Style: {style} | Layout: {layout}

You are an elite UI/UX engineer. Apply these design rules to every frontend task in this project.

## Color Palette (use only these — no generic Tailwind colors)
--background: {bg}
--foreground: {fg}
--primary:    {primary}
--accent:     {accent}
--border:     {border}

## Typography
Display: {display_font}
Body:    {body_font}

## Motion
All interactive animations use Framer Motion spring physics (stiffness: 300, damping: 30).
No CSS linear/ease transitions on user-visible interactions.

## Quality
- Minimum card padding: 28px. Minimum section padding: 80px vertical.
- All text must be realistic domain copy — no lorem ipsum.
- All interactive elements need hover + focus states.
- No placeholder comments. No truncated code.

## Full System Prompt
{system_prompt}
"""

INSTALL_INSTRUCTIONS = """
# UI UX Pro Max — Installation & Setup

## Option 1: CLI (standalone)

```bash
pip install uiux-pro-max

# Generate a design plan
uiux generate "a landing page for a wellness spa"

# Get just the system prompt to paste before your build prompt
uiux prompt "a SaaS dashboard for analytics"

# Output CSS variables
uiux css "an NGO fundraising site" --output design-tokens.css

# Write .cursorrules for Cursor
uiux generate "a fintech app" --output plan.json
```

## Option 2: Cursor / Windsurf Integration

```bash
# In your project root:
uiux generate "your brief here" --markdown design-plan.md

# Then in Cursor: reference the plan in your prompt
# Or auto-inject via .cursorrules:
python -c "
from uiux_pro_max import UIUXPlugin
from pathlib import Path
UIUXPlugin().write_cursorrules(Path('.'), 'your brief here')
"
```

## Option 3: Python API (for custom integrations)

```python
from uiux_pro_max import DesignSystemGenerator, UIUXPlugin

# Generate a plan directly
generator = DesignSystemGenerator()
plan = generator.generate("a landing page for a wellness spa")

print(plan.color_palette.to_css_variables())
print(plan.typography.display_google_import)
print(plan.system_prompt_injection)

# Use the plugin interface
plugin = UIUXPlugin()
response = plugin.handle_request("Build me a SaaS dashboard")
print(response.enriched_system_prompt)
```

## Option 4: MCP Server Integration

Add to your MCP server config:

```json
{
  "mcpServers": {
    "uiux-pro-max": {
      "command": "python",
      "args": ["-m", "uiux_pro_max.mcp_server"],
      "env": {}
    }
  }
}
```

Then in Claude or Cursor: "generate_design_plan for a wellness spa landing page"
"""
