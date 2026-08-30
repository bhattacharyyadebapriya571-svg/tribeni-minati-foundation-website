import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://kubczgbcfbwcpmuxwfvt.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Dl6ImKUUDwcO46JvCCzZZQ_S4x8AvRB';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (_) {
        body = {};
      }
    }

    const { name, email, phone, subject, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const ticketRef = `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record = {
      id: `inq_${Date.now()}`,
      ticket_number: ticketRef,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      subject: String(subject || 'General Inquiry').trim(),
      message: String(message).trim(),
      status: 'Open',
      created_at: new Date().toISOString(),
    };

    try {
      if (SUPABASE_URL && SUPABASE_KEY) {
        await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(record),
        });
      }
    } catch (dbErr) {
      console.warn('Supabase contact save note:', dbErr);
    }

    return res.status(200).json({
      success: true,
      ticketNumber: ticketRef,
      message: `Your message has been received (Ticket: ${ticketRef}). Our field coordination desk will respond shortly.`,
      data: record,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: msg });
  }
}
