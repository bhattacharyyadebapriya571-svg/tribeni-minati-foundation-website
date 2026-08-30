import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { TMF_META } from '../data/tmfVerifiedData';

export interface DonationRecord {
  id: string;
  paymentId: string;
  orderId?: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan: string;
  donorAddress?: string;
  cause: string;
  date: string;
  certificateNumber?: string;
  certificateUrl?: string;
}

export async function generate80GCertificatePdf(donation: DonationRecord): Promise<Uint8Array> {
  const certNumber =
    donation.certificateNumber ||
    `80G-${new Date(donation.date).getFullYear() || new Date().getFullYear()}-${donation.paymentId.slice(-6).toUpperCase()}`;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size in points (210 x 297 mm)

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.11, 0.23, 0.17); // #1B3B2B Deep Botanical Forest
  const accentColor = rgb(0.85, 0.47, 0.02); // #D97706 Warm Amber
  const slateDark = rgb(0.08, 0.11, 0.09); // #151C18
  const slateMuted = rgb(0.36, 0.4, 0.38); // #5C6760
  const borderGrey = rgb(0.85, 0.85, 0.85);

  // Outer Decorative Double Border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: 555.28,
    height: 801.89,
    borderColor: primaryColor,
    borderWidth: 2,
    color: rgb(0.98, 0.97, 0.96), // Warm Ivory
  });

  page.drawRectangle({
    x: 26,
    y: 26,
    width: 543.28,
    height: 789.89,
    borderColor: accentColor,
    borderWidth: 0.8,
  });

  // Header Box
  page.drawRectangle({
    x: 35,
    y: 710,
    width: 525.28,
    height: 95,
    color: rgb(1, 1, 1),
    borderColor: borderGrey,
    borderWidth: 1,
  });

  // Foundation Title
  page.drawText(TMF_META.name.toUpperCase(), {
    x: 50,
    y: 775,
    size: 18,
    font: fontBold,
    color: primaryColor,
  });

  page.drawText('REGISTERED NON-PROFIT SOCIETY UNDER WEST BENGAL SOCIETIES REGISTRATION ACT, 1961', {
    x: 50,
    y: 760,
    size: 7.5,
    font: fontBold,
    color: slateDark,
  });

  page.drawText(`Govt. Reg. No: ${TMF_META.newRegNo}  |  NITI Aayog DARPAN: ${TMF_META.ngoDarpanId}  |  PAN: ${TMF_META.pan}`, {
    x: 50,
    y: 746,
    size: 8,
    font: fontBold,
    color: accentColor,
  });

  page.drawText(`Secretariat: ${TMF_META.offices.headOffice.address}`, {
    x: 50,
    y: 732,
    size: 7.5,
    font: fontRegular,
    color: slateMuted,
  });

  page.drawText(`Helpline: ${TMF_META.helpline}  |  Email: ${TMF_META.primaryEmail}`, {
    x: 50,
    y: 720,
    size: 7.5,
    font: fontRegular,
    color: slateMuted,
  });

  // Certificate Title Banner
  page.drawRectangle({
    x: 35,
    y: 660,
    width: 525.28,
    height: 38,
    color: primaryColor,
  });

  page.drawText('DONATION RECEIPT & TAX EXEMPTION CERTIFICATE', {
    x: 105,
    y: 678,
    size: 13,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText('(ISSUED UNDER SECTION 80G(5)(vi) OF THE INCOME TAX ACT, 1961)', {
    x: 135,
    y: 666,
    size: 8,
    font: fontRegular,
    color: rgb(0.96, 0.85, 0.6),
  });

  // Metadata Row
  page.drawText(`Receipt / Certificate No:`, { x: 45, y: 630, size: 9, font: fontBold, color: slateDark });
  page.drawText(certNumber, { x: 180, y: 630, size: 9, font: fontBold, color: primaryColor });

  page.drawText(`Date of Receipt:`, { x: 380, y: 630, size: 9, font: fontBold, color: slateDark });
  page.drawText(new Date(donation.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), {
    x: 460,
    y: 630,
    size: 9,
    font: fontRegular,
    color: slateDark,
  });

  // Donor Details Table Box
  page.drawRectangle({
    x: 35,
    y: 470,
    width: 525.28,
    height: 145,
    color: rgb(1, 1, 1),
    borderColor: borderGrey,
    borderWidth: 1,
  });

  page.drawRectangle({
    x: 35,
    y: 590,
    width: 525.28,
    height: 25,
    color: rgb(0.95, 0.96, 0.95),
  });

  page.drawText('1. DONOR PARTICULARS (AS PER INCOME TAX FORM 10BE COMPLIANCE)', {
    x: 45,
    y: 598,
    size: 8.5,
    font: fontBold,
    color: primaryColor,
  });

  page.drawText('Donor Full Name:', { x: 45, y: 568, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.donorName, { x: 180, y: 568, size: 9, font: fontBold, color: slateDark });

  page.drawText('Permanent Account No (PAN):', { x: 45, y: 546, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.donorPan || 'APPLIED / NOT PROVIDED', { x: 180, y: 546, size: 9, font: fontBold, color: primaryColor });

  page.drawText('Email Address:', { x: 45, y: 524, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.donorEmail, { x: 180, y: 524, size: 9, font: fontRegular, color: slateDark });

  page.drawText('Contact Phone:', { x: 340, y: 524, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.donorPhone || 'N/A', { x: 425, y: 524, size: 9, font: fontRegular, color: slateDark });

  page.drawText('Postal Address:', { x: 45, y: 502, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.donorAddress || 'Registered Contributor Address', { x: 180, y: 502, size: 8.5, font: fontRegular, color: slateDark });

  page.drawText('Supported Cause / Program:', { x: 45, y: 480, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.cause || 'General Charitable Welfare & Education', { x: 180, y: 480, size: 8.5, font: fontRegular, color: primaryColor });

  // Payment Details Table Box
  page.drawRectangle({
    x: 35,
    y: 330,
    width: 525.28,
    height: 125,
    color: rgb(1, 1, 1),
    borderColor: borderGrey,
    borderWidth: 1,
  });

  page.drawRectangle({
    x: 35,
    y: 430,
    width: 525.28,
    height: 25,
    color: rgb(0.95, 0.96, 0.95),
  });

  page.drawText('2. PAYMENT & TRANSACTION VERIFICATION', {
    x: 45,
    y: 438,
    size: 8.5,
    font: fontBold,
    color: primaryColor,
  });

  page.drawText('Donation Amount Received:', { x: 45, y: 405, size: 10, font: fontBold, color: slateDark });
  page.drawText(`INR ₹${donation.amount.toLocaleString('en-IN')}/- (${donation.currency.toUpperCase()})`, {
    x: 200,
    y: 405,
    size: 11,
    font: fontBold,
    color: primaryColor,
  });

  page.drawText('Payment Gateway Ref (ID):', { x: 45, y: 383, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.paymentId, { x: 200, y: 383, size: 9, font: fontRegular, color: slateDark });

  page.drawText('Order Reference ID:', { x: 45, y: 361, size: 9, font: fontBold, color: slateDark });
  page.drawText(donation.orderId || `ORD_${donation.paymentId.slice(-8)}`, { x: 200, y: 361, size: 9, font: fontRegular, color: slateDark });

  page.drawText('Payment Mode & Settlement:', { x: 45, y: 339, size: 9, font: fontBold, color: slateDark });
  page.drawText('Online Direct UPI / Card / NetBanking (Central Bank of India Settled)', {
    x: 200,
    y: 339,
    size: 8.5,
    font: fontRegular,
    color: slateDark,
  });

  // Statutory Tax Exemption Declaration Box
  page.drawRectangle({
    x: 35,
    y: 190,
    width: 525.28,
    height: 125,
    color: rgb(0.98, 0.97, 0.95),
    borderColor: accentColor,
    borderWidth: 1,
  });

  page.drawText('3. STATUTORY 80G & 12A TAX BENEFIT DECLARATION', {
    x: 45,
    y: 298,
    size: 8.5,
    font: fontBold,
    color: accentColor,
  });

  page.drawText(
    'This is to certify that Tribeni Minati Foundation is registered under Section 12A of the Income Tax Act, 1961.',
    { x: 45, y: 280, size: 8, font: fontRegular, color: slateDark }
  );

  page.drawText(
    'Donations made to the Foundation are eligible for 50% deduction under Section 80G of the Income Tax Act, 1961.',
    { x: 45, y: 266, size: 8, font: fontBold, color: primaryColor }
  );

  page.drawText(
    'This donation will be duly included in the Foundation’s annual statement of donation (Form 10BD) filed with',
    { x: 45, y: 252, size: 8, font: fontRegular, color: slateDark }
  );

  page.drawText(
    'the Income Tax Department, enabling the donor to download Form 10BE certificate directly for tax exemption filing.',
    { x: 45, y: 238, size: 8, font: fontRegular, color: slateDark }
  );

  page.drawText(`Authorized Banking Channel: Central Bank of India (A/C No: ${TMF_META.bank.accountNumber}, IFSC: ${TMF_META.bank.ifsc})`, {
    x: 45,
    y: 218,
    size: 8,
    font: fontBold,
    color: slateDark,
  });

  page.drawText(`Official Website: https://tribeni-minati-foundation-website.vercel.app/`, {
    x: 45,
    y: 202,
    size: 7.5,
    font: fontOblique,
    color: slateMuted,
  });

  // Footer Signatures & Official Stamp
  page.drawRectangle({
    x: 35,
    y: 60,
    width: 525.28,
    height: 115,
    color: rgb(1, 1, 1),
    borderColor: borderGrey,
    borderWidth: 1,
  });

  page.drawText('For TRIBENI MINATI FOUNDATION', { x: 380, y: 155, size: 8.5, font: fontBold, color: primaryColor });

  page.drawText('[ DIGITALLY VERIFIED SEAL & RECORD ]', { x: 375, y: 120, size: 7.5, font: fontBold, color: accentColor });
  page.drawText('Authorized General Secretary', { x: 395, y: 105, size: 8, font: fontBold, color: slateDark });
  page.drawText('Tribeni Minati Foundation Secretariat', { x: 375, y: 92, size: 7.5, font: fontRegular, color: slateMuted });

  page.drawText('IMPORTANT NOTE:', { x: 45, y: 155, size: 8, font: fontBold, color: primaryColor });
  page.drawText('• This is an electronically generated and authenticated certificate generated upon successful transaction capture.', {
    x: 45,
    y: 140,
    size: 7,
    font: fontRegular,
    color: slateMuted,
  });
  page.drawText('• Preserved on immutable foundation donor registry for statutory audit and tax deduction verification.', {
    x: 45,
    y: 128,
    size: 7,
    font: fontRegular,
    color: slateMuted,
  });
  page.drawText('• For duplicate copies or inquiries, contact tribeniminatifoundation@gmail.com or helpline +91-9143430927.', {
    x: 45,
    y: 116,
    size: 7,
    font: fontRegular,
    color: slateMuted,
  });

  // Bottom Disclaimer
  page.drawText('TRIBENI MINATI FOUNDATION · 100% NON-PROFIT CHARITABLE SOCIETY · ESTABLISHED 2013', {
    x: 120,
    y: 40,
    size: 7,
    font: fontBold,
    color: primaryColor,
  });

  return await pdfDoc.save();
}

export function download80GCertificate(pdfBytes: Uint8Array, fileName: string) {
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
