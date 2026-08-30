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

    const { name, email, phone, location, role, availabilityHours, statement } = body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const applicationRef = `VOL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record = {
      id: `vol_${Date.now()}`,
      reference_number: applicationRef,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      location: String(location || 'West Bengal').trim(),
      role: String(role || 'Community Field Worker').trim(),
      availability_hours: Number(availabilityHours) || 4,
      statement: String(statement || '').trim(),
      status: 'Under Review',
      created_at: new Date().toISOString(),
    };

    // Forward to Supabase database
    try {
      if (SUPABASE_URL && SUPABASE_KEY) {
        await fetch(`${SUPABASE_URL}/rest/v1/volunteers`, {
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
      console.warn('Supabase DB forward note:', dbErr);
    }

    return res.status(200).json({
      success: true,
      referenceNumber: applicationRef,
      message: `Volunteer application registered under Ref: ${applicationRef}. The TMF Youth Fellowship Secretariat will contact you within 48 hours.`,
      data: record,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: message });
  }
}
