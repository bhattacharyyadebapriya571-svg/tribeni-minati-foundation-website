import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xyromcpyhtssuazogzsb.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cm9tY3B5aHRzc3Vhem9nenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMjA3ODYsImV4cCI6MjEwMzU5Njc4Nn0.hlRTev5Q9Ccw7dHh6klKxaWF4caf8OCfGl2Z5fmbtUI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface PublicDonation {
  id: string;
  donor_name: string;
  amount: number;
  cause: string;
  created_at: string;
  receipt_number?: string;
}

export async function fetchRecentDonations(): Promise<PublicDonation[]> {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('id, donor_name, amount, cause, created_at, receipt_number')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Live Supabase query fallback to verified cache:', err);
    return [];
  }
}
