#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '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';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL_NAME = 'nvidia/nemotron-3-ultra-550b-a55b';

async function askNemotron(prompt, contextFiles = []) {
  let fileContext = '';
  // Auto detect files from prompt if none provided
  const potentialPaths = prompt.match(/[a-zA-Z0-9_\-\.\/\\]+\.(tsx|ts|jsx|js|json|css|html|md)/g) || [];
  const allFiles = [...new Set([...contextFiles, ...potentialPaths])];

  for (const f of allFiles) {
    if (fs.existsSync(f)) {
      fileContext += `\n--- File: ${f} ---\n${fs.readFileSync(f, 'utf8')}\n`;
    }
  }

  const systemMessage = `You are Nemotron OpenCode, an ultra-intelligent fullstack AI engineer and code synthesizer. 
You write robust, production-grade TypeScript, React 19, Tailwind CSS, Node.js, and API architecture code. 
When given a task or codebase context, analyze deeply, reason step-by-step, and output clean, executable solutions.`;

  const messages = [
    { role: 'system', content: systemMessage },
    ...(fileContext ? [{ role: 'user', content: `Codebase Context:\n${fileContext}` }] : []),
    { role: 'user', content: prompt }
  ];

  try {
    const response = await fetch(NVIDIA_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        temperature: 0.2,
        top_p: 0.95,
        max_tokens: 3072,
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`NVIDIA API error (${response.status}): ${err}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const json = JSON.parse(data);
            const delta = json.choices[0]?.delta;
            if (delta?.reasoning_content) {
              process.stdout.write(delta.reasoning_content);
            }
            if (delta?.content) {
              process.stdout.write(delta.content);
            }
          } catch (_) {}
        }
      }
    }
    console.log('\n');
  } catch (err) {
    console.error('Nemotron OpenCode error:', err.message);
  }
}

// CLI argument execution
const args = process.argv.slice(2);
if (args.length > 0) {
  const prompt = args.join(' ');
  console.log(`\x1b[36m⚡ [Nemotron OpenCode] Processing:\x1b[0m ${prompt}\n`);
  askNemotron(prompt);
} else {
  // Interactive REPL Mode
  console.log('\x1b[32m════════════════════════════════════════════════════════════════\x1b[0m');
  console.log('\x1b[1m🚀 Nemotron OpenCode CLI (NVIDIA 550B Coding Engine Active)\x1b[0m');
  console.log('\x1b[90mType your coding question or refactor command (type "exit" to quit):\x1b[0m');
  console.log('\x1b[32m════════════════════════════════════════════════════════════════\x1b[0m\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\x1b[33mNemotron > \x1b[0m'
  });

  rl.prompt();
  rl.on('line', async (line) => {
    const input = line.trim();
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      process.exit(0);
    }
    if (input) {
      await askNemotron(input);
    }
    rl.prompt();
  });
}
