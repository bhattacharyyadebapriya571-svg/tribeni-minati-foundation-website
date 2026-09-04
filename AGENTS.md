# PROJECT RULES: OPENCODE CLI & NEMOTRON 3.5 LIGHTNING

Whenever this project workspace is opened, the following mandatory environment rules and model configurations apply:

## 1. Primary Model: NVIDIA Nemotron 3.5 Lightning (30B)
- **Model Identifier**: `nvidia/nemotron-3.5-lightning-30b-a3b`
- **Provider / Endpoint**: NVIDIA API (`https://integrate.api.nvidia.com/v1`)
- **API Key**: `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`
- **Thinking / Reasoning**: Enabled (`chat_template_kwargs: {"enable_thinking": true}`) with delta reasoning capture.

## 2. CLI Tooling: OpenCode CLI
- All external coding generation and synthesis workflows must be dispatched through **OpenCode CLI** configured with the Nemotron 3.5 Lightning provider.
- OpenCode configuration file: `opencode.json` in the project root.
- Invocations: `opencode run "<prompt>"` or using the project script bindings.

## 3. Environment & Execution Standards
- Always respect the `nvidia/nemotron-3.5-lightning-30b-a3b` model parameters:
  - `temperature`: 0.7 (or 0.2 for deterministic coding)
  - `top_p`: 0.95
  - `max_tokens`: 16384
  - `reasoning_budget`: 16384

## 4. UI Specification & Production Quality Contract (HorizonX)
- Read `my-app/ui-spec.yaml` before changing interface code.
- Treat its tokens, component states, responsive rules, accessibility requirements, and acceptance criteria as implementation constraints.
- Do not invent new colors, spacing, radii, shadows, typography styles, or motion curves without updating `ui-spec.yaml`.
- All motion components must use HorizonX patterns from `src/components/motion/` (`MotionColumn`, `ParallaxTotem`, `GridSweep`, `MotionFocus`) and support `prefers-reduced-motion`.
