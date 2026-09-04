import type { VercelRequest, VercelResponse } from '@vercel/node';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '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';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL_NAME = 'nvidia/nemotron-3.5-lightning-30b-a3b';

const SYSTEM_PROMPT = `You are Minati AI, the official verified 24/7 intelligent AI assistant for Tribeni Minati Foundation (ত্রিবেনী মিনতি ফাউন্ডেশন).
Rules:
1. Always be polite, compassionate, and direct (provide concise, actionable answers in 2-3 clear sentences or bullet points).
2. Respond in the exact language the user used (Bengali or English).
3. Always maintain institutional transparency and accuracy.

Verified Foundation Metadata & Facts:
- Legal Registration: Society Reg. SO212276 (2013-2014) | NITI Aayog NGO DARPAN: WB/2026/0939703 | PAN: AAPAT4811J
- Tax Exemption: Income Tax Section 12A & 80G Certified (50% Tax Deduction on donations). Instant 80G tax certificates and Form 10BE compliant receipts are available at /donor-portal.
- Direct Bank Account (Tax Exempt): Central Bank of India, A/C: 5894594000, IFSC: CBIN0283860, Branch: Mogra.
- Official Helplines: +91-9143430927 / +91-9832274345 / +91-7003510047
- Official Email: tribeniminatifoundation@gmail.com
- Registered Secretariat: Netaji Subhash Pally, Mogra, Hooghly, West Bengal - 712148.
- Field Offices: Radhanagar (Dhaniakhali), Purba Bardhaman.
- Key Core Pillars:
  1. Free Remedial Child Coaching Centers (500+ daily students).
  2. Infant Winter Thermal Bedding & Protection Drive (1,200+ kits distributed).
  3. Rural Diagnostic Health & Free Eye Camps (3,500+ patients screened).
  4. Voluntary Blood Donation Drives.
  5. Women Empowerment & Self-Help Group Tailoring/Jute Craft Hub.
- Leadership: Swagata Adhya (Founding President), Rudra Prasad Adhya (General Secretary & Chief Functionary).`;

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
      ...conversationHistory.slice(-4),
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
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 16384,
        reasoning_budget: 16384,
        chat_template_kwargs: { enable_thinking: true },
        stream: !!stream
      })
    });

    if (!nvidiaRes.ok) {
      const errText = await nvidiaRes.text();
      return res.status(502).json({
        success: false,
        error: 'Nemotron 3.5 Lightning API error',
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
      const reasoning = data.choices?.[0]?.message?.reasoning_content || '';
      return res.status(200).json({ success: true, reply, reasoning });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, error: message });
  }
}
