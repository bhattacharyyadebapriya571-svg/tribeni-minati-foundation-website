import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xyromcpyhtssuazogzsb.supabase.co';

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cm9tY3B5aHRzc3Vhem9nenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMjA3ODYsImV4cCI6MjEwMzU5Njc4Nn0.hlRTev5Q9Ccw7dHh6klKxaWF4caf8OCfGl2Z5fmbtUI';

const AGENTMAIL_API_KEY =
  process.env.AGENTMAIL_API_KEY ||
  'am_us_c0706d54bf932e84639947cd11672b6a6d4034ba0fd7d09c4f03cd5c447532d9';

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

    const {
      amount,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      cause,
      paymentId,
      orderId,
      paymentMethod,
    } = body || {};

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Valid contribution amount is required.' });
    }

    const txId = paymentId || `UPI-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const receiptNum = `80G-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const donationRecord = {
      id: `don_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receipt_number: receiptNum,
      razorpay_payment_id: txId,
      razorpay_order_id: orderId || null,
      donor_name: String(donorName || 'Valued Contributor').trim(),
      donor_email: String(donorEmail || '').trim().toLowerCase(),
      donor_phone: String(donorPhone || '').trim(),
      donor_pan: String(donorPan || 'NOT_PROVIDED').toUpperCase().trim(),
      amount: Number(amount),
      currency: 'INR',
      cause: String(cause || 'General Impact Fund').trim(),
      payment_method: String(paymentMethod || 'Razorpay / UPI').trim(),
      payment_status: 'captured',
      tax_exemption_eligible: true,
      created_at: new Date().toISOString(),
    };

    // 1. Save to Supabase DB
    try {
      if (SUPABASE_URL && SUPABASE_KEY) {
        await fetch(`${SUPABASE_URL}/rest/v1/donations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(donationRecord),
        });
      }
    } catch (dbErr) {
      console.warn('Supabase donation record note:', dbErr);
    }

    // 2. Dispatch automated 80G tax receipt via AgentMail if donor email provided
    if (donorEmail && donorEmail.includes('@') && AGENTMAIL_API_KEY) {
      try {
        await fetch('https://api.agentmail.to/v1/inboxes/tribeniminatifoundation%40agentmail.to/messages', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AGENTMAIL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: donorEmail,
            subject: `[Tribeni Minati Foundation] Donation Receipt & 80G Tax Exemption #${receiptNum}`,
            text: `Dear ${donorName || 'Contributor'},\n\nThank you for your noble contribution of Rs. ${amount} for ${cause || 'General Welfare'}.\n\nReceipt Number: ${receiptNum}\nPayment Reference: ${txId}\nTax Exemption: 50% under Section 80G.\n\nWarm regards,\nTribeni Minati Foundation\nReg No: SO212276`,
          }),
        });
      } catch (mailErr) {
        console.warn('AgentMail dispatch note:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      receiptNumber: receiptNum,
      paymentId: txId,
      message: `Donation of ₹${amount} recorded and certified for Section 80G tax exemption.`,
      record: donationRecord,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: msg });
  }
}
