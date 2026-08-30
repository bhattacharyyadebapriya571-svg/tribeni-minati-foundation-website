# NEMOTRON & OPENCODE CODING AGENT RULES

## 1. Permanent Model & Agent Binding
- **Primary Coding & Reasoning Agent**: `nvidia/nemotron-3-ultra-550b-a55b` via OpenCode / NVIDIA Endpoint.
- **Base URL**: `https://integrate.api.nvidia.com/v1`
- **Default Auth Key**: `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`
- **Thinking / Reasoning Mode**: `chat_template_kwargs: {"enable_thinking": true}` enabled with `reasoning_content` capture.

## 2. Standard Code Synthesis Template
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "nvidia/nemotron-3-ultra-550b-a55b",
    messages: [
      { role: "system", content: "You are Nemotron OpenCode, an expert fullstack architect." },
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
    top_p: 0.95,
    max_tokens: 16384,
    chat_template_kwargs: { enable_thinking: true },
    stream: true
  });
   
  for await (const chunk of completion) {
    const reasoning = chunk.choices[0]?.delta?.reasoning_content;
    if (reasoning) process.stdout.write(reasoning);
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}
```

## 3. CLI & Subagent Direct Invocations
- Terminal CLI: `npm run nemotron "<prompt>"` or `opencode run "<prompt>"`
- Antigravity Subagent: `nemotron_coder`
- All UI & tokens align with `design-system` skill and `src/styles/design-tokens.css`.
