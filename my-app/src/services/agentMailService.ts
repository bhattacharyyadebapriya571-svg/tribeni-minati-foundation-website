export interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
  inboxId?: string;
}

export async function sendAgentMail(params: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = (import.meta as any).env?.VITE_AGENTMAIL_API_KEY || "am_us_c0706d54bf932e84639947cd11672b6a6d4034ba0fd7d09c4f03cd5c447532d9";
  const inboxId = params.inboxId || "tribeniminatifoundation@agentmail.to";

  try {
    const res = await fetch(`https://api.agentmail.to/v1/inboxes/${encodeURIComponent(inboxId)}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html || `<div>${params.text.replace(/\n/g, '<br/>')}</div>`,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, messageId: data.id };
    } else {
      const errText = await res.text();
      return { success: false, error: errText };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: msg };
  }
}
