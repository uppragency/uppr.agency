type ResendEventValue = string | number | boolean | null;

type ResendEventPayload = Record<string, ResendEventValue>;

/**
 * Trigger a published Resend Automation custom event.
 * Resend handles the email delivery and the Automation workflow after this event is received.
 */
export async function triggerResendEvent({
  event,
  email,
  payload,
}: {
  event: string;
  email: string;
  payload?: ResendEventPayload;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { skipped: true, reason: "RESEND_API_KEY neconfigurată" };
  }

  const response = await fetch("https://api.resend.com/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event,
      email,
      payload: payload ?? {},
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend event failed (${response.status}): ${detail}`);
  }

  return response.json();
}
