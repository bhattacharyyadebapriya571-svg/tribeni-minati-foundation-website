import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://kubczgbcfbwcpmuxwfvt.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Dl6ImKUUDwcO46JvCCzZZQ_S4x8AvRB';

// Baseline Institutional Ledger
const BASELINE_LEDGER = [
  {
    id: 'tx_cbin_001',
    receiptNumber: 'TMF/80G/2026/0481',
    donorName: 'Dr. Ananya Mukherjee',
    amount: 15000,
    cause: 'Minati Free Education Center (Class I-X Coaching)',
    paymentMethod: 'UPI',
    date: '2026-08-25T11:42:00Z',
    status: 'Verified',
  },
  {
    id: 'tx_cbin_002',
    receiptNumber: 'TMF/80G/2026/0482',
    donorName: 'Institutional Well-Wisher Grant',
    amount: 50000,
    cause: 'Emergency Grassroots Healthcare & Oxygen Bank',
    paymentMethod: 'Central Bank NEFT',
    date: '2026-08-24T09:15:00Z',
    status: 'Verified',
  },
  {
    id: 'tx_cbin_003',
    receiptNumber: 'TMF/80G/2026/0483',
    donorName: 'Sourav Banerjee',
    amount: 5000,
    cause: 'Voluntary Blood Donation & Rural Eye Clinics',
    paymentMethod: 'UPI',
    date: '2026-08-26T08:30:00Z',
    status: 'Verified',
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let ledger = [...BASELINE_LEDGER];

    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/donations?select=id,receipt_number,donor_name,amount,cause,payment_method,created_at&order=created_at.desc&limit=20`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        if (response.ok) {
          const dbData = await response.json();
          if (Array.isArray(dbData) && dbData.length > 0) {
            const mapped = dbData.map((d: any) => ({
              id: d.id,
              receiptNumber: d.receipt_number || `TMF/80G/${d.id.slice(0, 6)}`,
              donorName: d.donor_name ? `${d.donor_name.slice(0, 3)}***` : 'Anonymous Donor',
              amount: Number(d.amount),
              cause: d.cause || 'General Welfare',
              paymentMethod: d.payment_method || 'UPI',
              date: d.created_at,
              status: 'Verified',
            }));
            ledger = [...mapped, ...ledger];
          }
        }
      } catch (_) {}
    }

    return res.status(200).json({ success: true, ledger });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: msg });
  }
}
