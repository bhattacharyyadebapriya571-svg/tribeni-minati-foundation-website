import { MongoClient } from 'mongodb';

// 1. MONGODB ATLAS CLUSTER
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://Vercel-Admin-atlas-copper-paddle:rBTxdDOgaDJ2ZP3g@atlas-copper-paddle.ypsabkp.mongodb.net/?retryWrites=true&w=majority';

let mongoClient: MongoClient | null = null;

export function getMongoClient(): MongoClient {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI);
  }
  return mongoClient;
}

// 2. PRISMA & SUPABASE POSTGRES CONFIG
export const POSTGRES_CONFIG = {
  prismaUrl:
    process.env.db_PRISMA_DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    'postgres://postgres.xyromcpyhtssuazogzsb:2201DZ9fbFCVPcZy@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true',
  directUrl:
    process.env.POSTGRES_URL_NON_POOLING ||
    'postgres://postgres.xyromcpyhtssuazogzsb:2201DZ9fbFCVPcZy@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require',
  host: process.env.POSTGRES_HOST || 'db.xyromcpyhtssuazogzsb.supabase.co',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
};

// 3. SUPABASE REST & AUTH CONFIG
export const SUPABASE_CONFIG = {
  url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyromcpyhtssuazogzsb.supabase.co',
  anonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cm9tY3B5aHRzc3Vhem9nenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMjA3ODYsImV4cCI6MjEwMzU5Njc4Nn0.hlRTev5Q9Ccw7dHh6klKxaWF4caf8OCfGl2Z5fmbtUI',
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable__sO7kzeuBr9srUyH-7NpiA_MbRvA4R5',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cm9tY3B5aHRzc3Vhem9nenNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODAyMDc4NiwiZXhwIjoyMTAzNTk2Nzg2fQ.lI4aBMFk2MkUmQVQ9xuDNiZMYNT1imRQSVo4rCbINWA',
};

// 4. VERCEL BLOB STORAGE CONFIG
export const BLOB_CONFIG = {
  storeId: process.env.BLOB_STORE_ID || 'store_4YS8QAQWmyh3tntL',
  token: process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_4YS8QAQWmyh3tntL_7Abp0rbTJTfrs94Vkj18CGyX4TCg6W',
};

// 5. VERCEL GLOBAL CONFIG
export const GLOBAL_CONFIG = {
  storeId: 'ecfg_m376ylamzsuqiogxy5g274wmj1k5',
  hash: '5bf6b008a9ec05f6870c476d10b53211797aa000f95aae344ae60f9b422286da',
};

// 6. MULTI-DATABASE PERSISTENCE ENGINE
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

  // Primary Write: MongoDB Atlas Cluster
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

  // Dual Write: Supabase / Postgres
  try {
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.serviceRoleKey) {
      const resp = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_CONFIG.serviceRoleKey,
          Authorization: `Bearer ${SUPABASE_CONFIG.serviceRoleKey}`,
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
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.serviceRoleKey) {
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/volunteers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_CONFIG.serviceRoleKey,
          Authorization: `Bearer ${SUPABASE_CONFIG.serviceRoleKey}`,
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
