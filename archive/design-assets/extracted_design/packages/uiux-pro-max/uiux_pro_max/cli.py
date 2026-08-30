"""CLI entry point for UI UX Pro Max."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.syntax import Syntax
from rich.table import Table

from uiux_pro_max.generator import DesignSystemGenerator
from uiux_pro_max.models import DesignPlan

app = typer.Typer(
    name="uiux",
    help="UI UX Pro Max — Design System Generator for AI coding assistants",
    rich_markup_mode="rich",
    no_args_is_help=True,
)
console = Console()
error_console = Console(stderr=True, style="bold red")


def _load_plan(plan_path: Path) -> DesignPlan:
    if not plan_path.exists():
        error_console.print(f"Plan file not found: {plan_path}")
        raise typer.Exit(1)
    try:
        data = json.loads(plan_path.read_text())
        return DesignPlan.model_validate(data)
    except Exception as exc:
        error_console.print(f"Failed to parse plan file: {exc}")
        raise typer.Exit(1)


@app.command("generate", help="Generate a complete design plan from a brief.")
def cmd_generate(
    brief: Annotated[str, typer.Argument(help="The build brief, e.g. 'a landing page for a wellness spa'")],
    output: Annotated[
        Path | None,
        typer.Option("--output", "-o", help="Write plan JSON to this file (default: stdout)"),
    ] = None,
    markdown: Annotated[
        Path | None,
        typer.Option("--markdown", "-m", help="Write plan Markdown to this file"),
    ] = None,
    prompt_only: Annotated[
        bool,
        typer.Option("--prompt-only", "-p", help="Print only the system prompt injection block"),
    ] = False,
    show_palette: Annotated[
        bool,
        typer.Option("--palette", help="Print color palette table and exit"),
    ] = False,
) -> None:
    generator = DesignSystemGenerator()

    with Progress(SpinnerColumn(), TextColumn("[progress.description]{task.description}"), console=console) as progress:
        task = progress.add_task("Analyzing brief and generating design plan...", total=None)
        plan = generator.generate(brief)
        progress.update(task, completed=True)

    if show_palette:
        _print_palette_table(plan)
        return

    if prompt_only:
        console.print(
            Panel(plan.system_prompt_injection, title="[bold]System Prompt Injection[/bold]", border_style="green")
        )
        return

    if output:
        output.write_text(plan.model_dump_json(indent=2))
        console.print(f"[green]Plan JSON written to[/green] {output}")

    if markdown:
        markdown.write_text(plan.to_markdown())
        console.print(f"[green]Plan Markdown written to[/green] {markdown}")

    if not output and not markdown:
        console.print(Markdown(plan.to_markdown()))


@app.command("palette", help="Show the color palette for a given brief.")
def cmd_palette(
    brief: Annotated[str, typer.Argument(help="The build brief")],
) -> None:
    generator = DesignSystemGenerator()
    plan = generator.generate(brief)
    _print_palette_table(plan)


@app.command("prompt", help="Generate and copy the system prompt injection for a given brief.")
def cmd_prompt(
    brief: Annotated[str, typer.Argument(help="The build brief")],
    copy: Annotated[bool, typer.Option("--copy", "-c", help="Copy to clipboard")] = False,
) -> None:
    generator = DesignSystemGenerator()
    plan = generator.generate(brief)

    console.print(
        Panel(
            plan.system_prompt_injection,
            title="[bold green]System Prompt — paste before your build prompt[/bold green]",
            border_style="green",
            padding=(1, 2),
        )
    )

    if copy:
        try:
            import subprocess
            proc = subprocess.run(["pbcopy"], input=plan.system_prompt_injection.encode(), check=True)
            console.print("[green]Copied to clipboard.[/green]")
        except (FileNotFoundError, subprocess.CalledProcessError):
            try:
                import subprocess
                subprocess.run(["xclip", "-selection", "clipboard"], input=plan.system_prompt_injection.encode(), check=True)
                console.print("[green]Copied to clipboard.[/green]")
            except Exception:
                console.print("[yellow]Could not copy to clipboard — paste manually.[/yellow]")


@app.command("inspect", help="Load and display an existing plan JSON file.")
def cmd_inspect(
    plan_path: Annotated[Path, typer.Argument(help="Path to a plan .json file")],
    section: Annotated[
        str | None,
        typer.Option("--section", "-s", help="Show a specific section: palette, typography, animations, anti-patterns, checklist"),
    ] = None,
) -> None:
    plan = _load_plan(plan_path)

    if section == "palette":
        _print_palette_table(plan)
        return
    if section == "typography":
        _print_typography(plan)
        return
    if section == "animations":
        _print_animations(plan)
        return
    if section == "anti-patterns":
        _print_anti_patterns(plan)
        return
    if section == "checklist":
        _print_checklist(plan)
        return

    console.print(Markdown(plan.to_markdown()))


@app.command("css", help="Output CSS variables for a given brief.")
def cmd_css(
    brief: Annotated[str, typer.Argument(help="The build brief")],
    output: Annotated[Path | None, typer.Option("--output", "-o")] = None,
) -> None:
    generator = DesignSystemGenerator()
    plan = generator.generate(brief)
    css_vars = plan.color_palette.to_css_variables()
    font_imports = (
        plan.typography.display_google_import
        + "\n"
        + plan.typography.body_google_import
        + ("\n" + plan.typography.mono_google_import if plan.typography.mono_google_import else "")
    ).strip()
    full_css = f"/* Google Fonts */\n{font_imports}\n\n/* Design Tokens */\n{css_vars}\n\n/* Font Families */\n{plan.typography.css_variables}"

    if output:
        output.write_text(full_css)
        console.print(f"[green]CSS written to[/green] {output}")
    else:
        console.print(Syntax(full_css, "css", theme="monokai", line_numbers=False))


def _print_palette_table(plan: DesignPlan) -> None:
    table = Table(title=f"Color Palette — {plan.brief_category} / {plan.visual_style.value}", show_lines=True)
    table.add_column("Token", style="cyan")
    table.add_column("Hex", style="bold")
    table.add_column("Usage")

    tokens = [
        plan.color_palette.background,
        plan.color_palette.foreground,
        plan.color_palette.primary,
        plan.color_palette.primary_foreground,
        plan.color_palette.accent,
        plan.color_palette.muted,
        plan.color_palette.muted_foreground,
        plan.color_palette.border,
    ]
    for t in tokens:
        table.add_row(f"--{t.name}", t.hex, t.usage)

    console.print(table)
    console.print(f"\n[italic]{plan.color_palette.description}[/italic]")


def _print_typography(plan: DesignPlan) -> None:
    t = plan.typography
    console.print(Panel(
        f"[bold]Display:[/bold] {t.display_family}\n"
        f"[bold]Body:[/bold]    {t.body_family}\n"
        + (f"[bold]Mono:[/bold]    {t.mono_family}\n" if t.mono_family else "")
        + f"\n[italic]{t.rationale}[/italic]",
        title="Typography Pairing",
        border_style="cyan",
    ))
    console.print(Syntax(
        t.display_google_import + "\n" + t.body_google_import,
        "css", theme="monokai",
    ))


def _print_animations(plan: DesignPlan) -> None:
    table = Table(title="Animation Specs", show_lines=True)
    table.add_column("Target", style="cyan")
    table.add_column("Trigger")
    table.add_column("Effect")
    table.add_column("Config")
    for anim in plan.animation_specs:
        config = ""
        if anim.spring_config:
            cfg = anim.spring_config
            config = f"k={cfg.get('stiffness',300):.0f} d={cfg.get('damping',30):.0f}"
        elif anim.duration_ms:
            config = f"{anim.duration_ms}ms"
        table.add_row(anim.target, anim.trigger, anim.effect, config)
    console.print(table)


def _print_anti_patterns(plan: DesignPlan) -> None:
    for ap in plan.anti_patterns:
        console.print(Panel(
            f"[red]❌ {ap.pattern}[/red]\n\n"
            f"[bold]Why:[/bold] {ap.reason}\n\n"
            f"[bold]Instead:[/bold] {ap.instead}",
            border_style="red",
        ))


def _print_checklist(plan: DesignPlan) -> None:
    console.print("[bold cyan]Pre-Build Checklist[/bold cyan]")
    for item in plan.pre_build_checklist:
        console.print(f"  [ ] {item}")
    console.print("\n[bold cyan]Accessibility Checklist[/bold cyan]")
    for check in plan.accessibility_checklist:
        icon = {"critical": "🔴", "high": "🟡", "medium": "🟢"}.get(check.priority, "⚪")
        console.print(f"  {icon} {check.item}")
    console.print("\n[bold cyan]Responsiveness Checklist[/bold cyan]")
    for item in plan.responsiveness_checklist:
        console.print(f"  [ ] {item}")


if __name__ == "__main__":
    app()
