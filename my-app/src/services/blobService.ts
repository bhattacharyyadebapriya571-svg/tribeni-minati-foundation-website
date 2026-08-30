import { get } from '@vercel/edge-config';

export interface EmergencyNotice {
  active: boolean;
  title: string;
  message: string;
  link?: string;
  priority: 'info' | 'urgent' | 'critical';
}

export async function fetchEdgeNotice(): Promise<EmergencyNotice | null> {
  try {
    const notice = await get<EmergencyNotice>('emergency_notice');
    return notice || null;
  } catch (err) {
    return null;
  }
}
