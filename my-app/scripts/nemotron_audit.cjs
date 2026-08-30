const fs = require('fs');

async function auditWithNemotron() {
  const siteContext = `
Website: Tribeni Minati Foundation (ত্রিবেনী মিনতি ফাউন্ডেশন)
Live URL: https://tribeni-minati-foundation-website.vercel.app/
Status: Registered Non-Profit Society (Reg: SO212276, NITI Aayog DARPAN: WB/2026/0939703, PAN: AAPAT4811J)
Bank: Central Bank of India (A/C: 5894594000, IFSC: CBIN0283860)

Core Flagship Initiatives:
1. Minati Free Education Center (Class I-X remedial coaching in Mogra/Tribeni with Jotkamal Juba Sangha).
2. Project HELP!! Rural Mobile Clinic & Ambulance Service.
3. Infant Winter Bedding & Maternal Shield Drive (Khanpur, Hooghly).
4. Nari Shakti Tailoring & Self-Help Vocational Center.
5. Annapurna Nutrition & Destitute Elderly Meals.
6. Voluntary Blood Donation & Free Eye Clinics.

Tech & Architecture Stack:
- Frontend: React 19 + TypeScript + Tailwind CSS v4 + Framer Motion.
- Routing: HTML5 pushState dynamic URL synchronization (/about, /programs, /volunteer, /transparency, /contact, /stories, /gallery).
- Backend: Vercel Edge Serverless Functions (/api/volunteer/apply, /api/csr/submit, /api/contact/submit, /api/donate/verify, /api/donations/ledger).
- Database: Supabase PostgreSQL cloud sync.
- Payments: Razorpay Gateway & Direct UPI QR with Section 80G PDF receipt generator.
- Compliance: Full DPDP Act 2023 privacy (Aadhaar & PAN masking).
`;

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-ultra-550b-a55b',
      messages: [
        {
          role: 'system',
          content: 'You are an elite enterprise NGO strategist, fullstack architect, and digital fundraising consultant. Provide a thorough, insightful, and professional evaluation of the Tribeni Minati Foundation website ecosystem, identifying its strengths, compliance readiness for CSR Schedule VII grants, and actionable recommendations to maximize donor trust and impact.'
        },
        {
          role: 'user',
          content: `Please review the following complete architectural and programmatic overview of the Tribeni Minati Foundation website:\n\n${siteContext}\n\nProvide an exhaustive strategic and technical audit covering:\n1. Statutory & Institutional Trust Readiness (12A, 80G, CSR Schedule VII, DPDP 2023).\n2. Technical & Fullstack Architecture Evaluation.\n3. Donor Conversion & Corporate Engagement Funnel.\n4. High-Impact Strategic Recommendations for the Executive Governing Body.`
        }
      ],
      temperature: 0.6,
      top_p: 0.9,
      max_tokens: 3000
    })
  });

  const data = await response.json();
  console.log(data.choices[0]?.message?.content || JSON.stringify(data));
}

auditWithNemotron().catch(console.error);
