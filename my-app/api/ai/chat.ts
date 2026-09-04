import type { VercelRequest, VercelResponse } from '@vercel/node';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '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';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL_NAME = 'nvidia/nemotron-3.5-lightning-30b-a3b';

const SYSTEM_PROMPT = `You are Minati AI, official 24/7 AI assistant for Tribeni Minati Foundation (ত্রিবেনী মিনতি ফাউন্ডেশন).
Rules:
1. Always be direct, polite, and extremely concise (maximum 1-3 short sentences or bullet points).
2. Answer in the same language as the user (Bengali or English).
3. If asked off-topic questions, answer directly in 1 short sentence.

Key Facts:
- Registration: Society Reg SO212276 (2013-2014) | NITI Aayog DARPAN: WB/2026/0939703 | PAN: AAPAT4811J
- 80G & 12A Certified (50% Tax Exemption on donations). Receipts downloadable at /donor-portal.
- Bank: Central Bank of India, A/C: 5894594000, IFSC: CBIN0283860, Branch: Mogra.
- Helplines: +91-9143430927 / +91-9832274345 / +91-7003510047
- Email: tribeniminatifoundation@gmail.com
- Office: Netaji Subhash Pally, Mogra, Hooghly - 712148.
- Pillars: Minati Free Remedial Coaching (500+ daily students), Infant Winter Bedding (1,200+ kits), Rural Health & Eye Camps (3,500+ patients), Blood Camps, Women SHG.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // continue
      }
    }

    const { message, conversationHistory = [], stream = true } = body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-2),
      { role: 'user', content: message }
    ];

    const nvidiaRes = await fetch(NVIDIA_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': stream ? 'text/event-stream' : 'application/json'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        temperature: 0.25,
        top_p: 0.85,
        max_tokens: 350,
        chat_template_kwargs: { enable_thinking: false },
        stream: !!stream
      })
    });

    if (!nvidiaRes.ok) {
      const errText = await nvidiaRes.text();
      return res.status(502).json({
        success: false,
        error: 'Nemotron API error',
        details: errText
      });
    }

    if (stream && nvidiaRes.body) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');

      const reader = nvidiaRes.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }
      return res.end();
    } else {
      const data = await nvidiaRes.json();
      const reply = data.choices?.[0]?.message?.content || 'নমস্কার, সরাসরি আমাদের হেল্পলাইনে কথা বলতে কল করুন: +91-9143430927';
      return res.status(200).json({ success: true, reply });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, error: message });
  }
}
