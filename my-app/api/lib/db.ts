import { MongoClient } from 'mongodb';

// 1. MONGODB ATLAS CLIENT
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-atlas-copper-paddle:rBTxdDOgaDJ2ZP3g@atlas-copper-paddle.ypsabkp.mongodb.net/?retryWrites=true&w=majority";
let mongoClient: MongoClient | null = null;

export function getMongoClient(): MongoClient {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI);
  }
  return mongoClient;
}

// 2. SUPABASE REST CONFIG
export const SUPABASE_CONFIG = {
  url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyromcpyhtssuazogzsb.supabase.co',
  key: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cm9tY3B5aHRzc3Vhem9nenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMjA3ODYsImV4cCI6MjEwMzU5Njc4Nn0.hlRTev5Q9Ccw7dHh6klKxaWF4caf8OCfGl2Z5fmbtUI',
};

// 3. UNIFIED RECORD PERSISTENCE
export interface DonationRecord {
  id?: string;
  donor_name: string;
  donor_email?: string;
  donor_phone?: string;
  donor_pan?: string;
  amount: number;
  frequency?: string;
  cause: string;
  payment_method?: string;
  payment_id?: string;
  order_id?: string;
  receipt_number?: string;
  created_at?: string;
}

export async function saveDonationMultiDb(donation: DonationRecord): Promise<{ success: boolean; mongoId?: string; supabaseSaved?: boolean }> {
  let mongoSaved = false;
  let supabaseSaved = false;
  let mongoId: string | undefined;

  // Save to MongoDB Atlas
  try {
    const client = getMongoClient();
    await client.connect();
    const db = client.db('tmf_database');
    const col = db.collection('donations');
    const res = await col.insertOne({
      ...donation,
      created_at: donation.created_at || new Date().toISOString(),
    });
    mongoSaved = res.acknowledged;
    mongoId = res.insertedId.toString();
  } catch (mErr) {
    console.warn('MongoDB Atlas write note:', mErr);
  }

  // Save to Supabase
  try {
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.key) {
      const resp = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_CONFIG.key,
          Authorization: `Bearer ${SUPABASE_CONFIG.key}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          ...donation,
          created_at: donation.created_at || new Date().toISOString(),
        }),
      });
      supabaseSaved = resp.ok;
    }
  } catch (sErr) {
    console.warn('Supabase write note:', sErr);
  }

  return {
    success: mongoSaved || supabaseSaved,
    mongoId,
    supabaseSaved,
  };
}

export async function saveVolunteerMultiDb(volunteer: any): Promise<boolean> {
  try {
    const client = getMongoClient();
    await client.connect();
    const db = client.db('tmf_database');
    await db.collection('volunteers').insertOne({
      ...volunteer,
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('Mongo volunteer write note:', e);
  }

  try {
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.key) {
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/volunteers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_CONFIG.key,
          Authorization: `Bearer ${SUPABASE_CONFIG.key}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          ...volunteer,
          created_at: new Date().toISOString(),
        }),
      });
    }
  } catch (e) {
    console.warn('Supabase volunteer write note:', e);
  }

  return true;
}
