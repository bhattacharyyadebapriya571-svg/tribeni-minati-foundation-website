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

    const { companyName, contactPerson, email, phone, budgetRange, pillar, targetLocations, comments } = body || {};

    if (!companyName || !email || !phone) {
      return res.status(400).json({ error: 'Company name, email, and contact phone are required.' });
    }

    const proposalRef = `CSR-RFP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record = {
      id: `csr_${Date.now()}`,
      reference_number: proposalRef,
      company_name: String(companyName).trim(),
      contact_person: String(contactPerson || '').trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      budget_range: String(budgetRange || 'Flexible').trim(),
      pillar: String(pillar || 'Rural Healthcare').trim(),
      target_locations: Array.isArray(targetLocations) ? targetLocations : [String(targetLocations || 'West Bengal')],
      comments: String(comments || '').trim(),
      status: 'Secretariat Review',
      created_at: new Date().toISOString(),
    };

    // Forward to Supabase database
    try {
      if (SUPABASE_URL && SUPABASE_KEY) {
        await fetch(`${SUPABASE_URL}/rest/v1/csr_proposals`, {
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
      console.warn('Supabase CSR save note:', dbErr);
    }

    return res.status(200).json({
      success: true,
      referenceNumber: proposalRef,
      message: `CSR Schedule VII Proposal registered under Ref: ${proposalRef}. The Chief Functionary & CSR Secretariat will contact you to schedule a formal MoU review.`,
      data: record,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: message });
  }
}
