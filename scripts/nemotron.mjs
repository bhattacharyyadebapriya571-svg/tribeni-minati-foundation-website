#!/usr/bin/env node

const prompt = process.argv.slice(2).join(" ") || "Explain the core mission of Tribeni Minati Foundation in 2 sentences.";

async function runNemotron(userPrompt) {
  const apiKey = process.env.NVIDIA_API_KEY || "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";
  
  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "text/event-stream"
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-ultra-550b-a55b",
      messages: [
        { role: "system", content: "You are Nemotron 550B, an ultra-advanced AI reasoning model and lead software engineer." },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2,
      top_p: 0.95,
      max_tokens: 16384,
      chat_template_kwargs: { enable_thinking: true },
      stream: true
    })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`API Error ${response.status}: ${err}`);
    process.exit(1);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();
        if (data === "[DONE]") break;
        try {
          const json = JSON.parse(data);
          const delta = json.choices[0]?.delta;
          if (delta?.reasoning_content) process.stdout.write(delta.reasoning_content);
          if (delta?.content) process.stdout.write(delta.content);
        } catch (_) {}
      }
    }
  }
}

runNemotron(prompt).catch(console.error);
