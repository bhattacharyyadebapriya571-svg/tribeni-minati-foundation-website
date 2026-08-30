# PROJECT RULES: OPENCODE CLI & NEMOTRON 550B

Whenever this project workspace is opened, the following mandatory environment rules and model configurations apply:

## 1. Primary Model: NVIDIA Nemotron 550B
- **Model Identifier**: `nvidia/nemotron-3-ultra-550b-a55b`
- **Provider / Endpoint**: NVIDIA API (`https://integrate.api.nvidia.com/v1`)
- **API Key**: `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`
- **Thinking / Reasoning**: Enabled (`chat_template_kwargs: {"enable_thinking": true}`) with delta reasoning capture.

## 2. CLI Tooling: OpenCode CLI
- All external coding generation and synthesis workflows must be dispatched through **OpenCode CLI** configured with the Nemotron 550B provider.
- OpenCode configuration file: `opencode.json` in the project root.
- Invocations: `opencode run "<prompt>"` or using the project script bindings.

## 3. Environment & Execution Standards
- Always respect the `nvidia/nemotron-3-ultra-550b-a55b` model parameters:
  - `temperature`: 0.2 (coding / deterministic), 1.0 (creative)
  - `top_p`: 0.95
  - `max_tokens`: 16384
