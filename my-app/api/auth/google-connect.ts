import type { VercelRequest, VercelResponse } from '@vercel/node';
import { startAuthorization, getToken } from '@vercel/connect';

const CONNECTION_NAME = 'google/cinereous-ball';
const DEFAULT_SCOPES = ['openid', 'email', 'profile'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, userId } = req.query;
  const uid = String(userId || req.body?.userId || `usr_${Date.now()}`);

  try {
    if (action === 'start' || req.method === 'POST') {
      // Start authorization flow with Vercel Connect
      const authUrl = await startAuthorization(CONNECTION_NAME, {
        subject: { type: 'user', id: uid },
        scopes: DEFAULT_SCOPES,
      });

      return res.status(200).json({
        success: true,
        connection: CONNECTION_NAME,
        authorizationUrl: authUrl,
        userId: uid,
      });
    }

    if (action === 'token') {
      // Retrieve OAuth token via Vercel Connect
      const token = await getToken(CONNECTION_NAME, {
        subject: { type: 'user', id: uid },
        scopes: DEFAULT_SCOPES,
      });

      return res.status(200).json({
        success: true,
        connection: CONNECTION_NAME,
        token,
      });
    }

    return res.status(400).json({
      error: 'Invalid action. Use action=start or action=token.',
    });
  } catch (err: any) {
    console.warn('Vercel Connect Google OAuth fallback mode:', err?.message);
    return res.status(200).json({
      success: false,
      fallback: true,
      message: 'Vercel Connect not linked; client will use direct Supabase Google OAuth.',
      connection: CONNECTION_NAME,
    });
  }
}
