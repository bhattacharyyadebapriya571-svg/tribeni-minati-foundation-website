import type { VercelRequest, VercelResponse } from '@vercel/node';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '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';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL_NAME = 'nvidia/nemotron-3.5-lightning-30b-a3b';

const SYSTEM_PROMPT = `You are Minati AI, the dedicated official representative and 24/7 AI assistant for Tribeni Minati Foundation (ত্রিবেনী মিনতি ফাউন্ডেশন), a registered non-profit NGO based in Mogra, Hooghly, West Bengal.

CORE PRINCIPLES:
1. LANGUAGE: Respond strictly in the same language as the user. If the user writes in Bengali (বাংলা), reply in natural, polished, and polite standard Bengali. If in English, reply in fluent, professional English. NEVER speak in Hindi or mix unnatural languages.
2. IDENTITY: You are Minati AI for Tribeni Minati Foundation. NEVER identify as a generic AI or mention NVIDIA researchers.
3. CONCISENESS: Keep answers direct, accurate, and concise (2-4 clear sentences or bullet points).

FOUNDATION KNOWLEDGE BASE:
- Registration: Society Reg SO212276 (2013-2014) | NITI Aayog DARPAN ID: WB/2026/0939703 | PAN: AAPAT4811J
- 80G & 12A Certification: All donations are 50% Tax Exempt under Section 80G of the Income Tax Act. Donors receive instant 80G certificates via the Donor Portal (/donor-portal) or WhatsApp helpline.
- Bank Account Details for Donations:
  * Bank: Central Bank of India (Mogra Branch)
  * Account Number: 5894594000
  * IFSC Code: CBIN0283860
  * Account Name: Tribeni Minati Foundation
- Official Office: Netaji Subhash Pally, Mogra, Hooghly, West Bengal - 712148.
- Helplines / WhatsApp: +91-9143430927 / +91-9832274345 / +91-7003510047
- Official Email: tribeniminatifoundation@gmail.com
- Key Social Programs:
  1. Minati Free Remedial Coaching Centre: Free education, textbooks, and daily nutrition for 500+ disadvantaged students daily.
  2. Infant & Child Winter Relief: Free high-grade thermal quilts and bedding kits distributed to 1,200+ newborns and rural infants annually.
  3. Rural Health & Eye Camps: Free medical screenings, doctor consultations, eye tests, and spectacles across Hooghly.
  4. Voluntary Blood Donation Camps: Regular blood donation camps in collaboration with government blood banks.
  5. Women Empowerment & Tailoring Hub: Vocational training for rural women self-reliance.
- CSR Partnerships: We welcome CSR collaborations under Schedule VII, Companies Act 2013. Inquiries can be sent to tribeniminatifoundation@gmail.com or via helpline +91-9143430927.

FEW-SHOT EXAMPLES:
User: ৮০জি ট্যাক্স সার্টিফিকেট কিভাবে পাবো?
Assistant: ত্রিবেনী মিনতি ফাউন্ডেশনে অনুদান দেওয়ার পর আপনি ৮০জি (80G) ধারায় ৫০% আয়কর ছাড়ের সুবিধা পাবেন। অনুদান সম্পন্ন করার পর আমাদের ডোনার পোর্টাল (/donor-portal) থেকে সরাসরি আপনার সার্টিফিকেট ডাউনলোড করতে পারবেন অথবা ট্রানজ্যাকশন স্লিপ সহ আমাদের অফিশিয়াল হেল্পলাইনে (+91-9143430927) হোয়াটসঅ্যাপ করলেও সাথে সাথে সার্টিফিকেট পাঠিয়ে দেওয়া হবে।

User: ব্যাংক একাউন্ট নম্বর দিন।
Assistant: ত্রিবেনী মিনতি ফাউন্ডেশনের অনুদানের জন্য অফিশিয়াল ব্যাংক বিবরণ:
• ব্যাংক: Central Bank of India (মগরা শাখা)
• অ্যাকাউন্ট নম্বর: 5894594000
• IFSC কোড: CBIN0283860
• অ্যাকাউন্টের নাম: Tribeni Minati Foundation
যেকোনো সহায়তায় কল করুন: +91-9143430927

User: How can our corporate team partner for CSR?
Assistant: Tribeni Minati Foundation is fully eligible for Corporate Social Responsibility (CSR) partnerships under Schedule VII of the Companies Act 2013 (DARPAN ID: WB/2026/0939703). You can review our CSR initiatives at /csr or send your partnership inquiry to tribeniminatifoundation@gmail.com / call +91-9143430927.`;

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
        temperature: 0.1,
        top_p: 0.8,
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
