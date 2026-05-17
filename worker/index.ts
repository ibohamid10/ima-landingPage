/**
 * Cloudflare Worker — Routes /api/contact to Resend and passes
 * everything else through to the static assets binding.
 *
 * On a successful POST /api/contact we fire two emails in parallel:
 *   1. Internal notification to partnership@ajione.com — scan-first
 *      layout so the inbox owner can triage at a glance.
 *   2. Branded auto-reply to the lead — confirms receipt, sets the
 *      24h response expectation, lands the AJIONE tone before any
 *      manual reply.
 *
 * If the auto-reply send fails we still return 200; the lead saw the
 * site success-state and the notification reached the inbox, so the
 * primary path is intact. Notification failure returns 502.
 *
 * Requires:
 *   - `[assets]` binding configured in wrangler.toml with `binding = "ASSETS"`
 *   - `RESEND_API_KEY` secret set in the Worker environment
 */

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY: string;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LEN = 4000;
const INBOX = "partnership@ajione.com";
const SENDER = "AJIONE Partnership <partnership@ajione.com>";

type ContactBody = {
  email?: unknown;
  brand?: unknown;
  message?: unknown;
};

type ResendPayload = {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  text: string;
  html: string;
};

function asString(v: unknown, max = MAX_FIELD_LEN): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

async function sendResend(payload: ResendPayload, env: Env): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/** Internal notification — boring on purpose, fast to scan. */
function buildNotification(brand: string, email: string, message: string): ResendPayload {
  const subject = `New inquiry — ${brand}`;
  const text = `NEW INQUIRY · AJIONE PARTNERSHIP

Brand:    ${brand}
Email:    ${email}

${message}
`;

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #0a0d10; max-width: 560px; padding: 8px 0;">
  <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #6b7178; margin-bottom: 24px;">
    New inquiry · AJIONE partnership
  </div>

  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 0 16px 12px 0; font-size: 12px; color: #8a9099; width: 78px; vertical-align: top;">Brand</td>
      <td style="padding: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #0a0d10;">${escapeHtml(brand)}</td>
    </tr>
    <tr>
      <td style="padding: 0 16px 0 0; font-size: 12px; color: #8a9099; vertical-align: top;">Email</td>
      <td style="padding: 0; font-size: 16px;">
        <a href="mailto:${escapeHtml(email)}" style="color: #0a0d10; text-decoration: underline;">${escapeHtml(email)}</a>
      </td>
    </tr>
  </table>

  <div style="border-top: 1px solid #e1e3e0; padding-top: 20px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #0a0d10;">${escapeHtml(message)}</div>
</div>
`.trim();

  return {
    from: SENDER,
    to: [INBOX],
    reply_to: email,
    subject,
    text,
    html,
  };
}

/** Brand-facing auto-reply — first AJIONE touchpoint after submit. */
function buildAutoReply(brand: string, email: string): ResendPayload {
  const subject = "We got your message — AJIONE";
  const text = `Hi ${brand},

Thanks for reaching out. We read every message personally — you'll hear back, usually within 24 hours.

— AJIONE
Vienna
`;

  const html = `
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #fbfcfa; padding: 56px 24px; margin: 0;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width: 560px; background: #fbfcfa;">
        <tr>
          <td style="padding-bottom: 44px;">
            <img src="https://ajione.com/ajione-logo.png" alt="AJIONE" width="148" style="display: block; width: 148px; height: auto; border: 0; outline: none; text-decoration: none;" />
          </td>
        </tr>
        <tr>
          <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.32em; line-height: 1; text-transform: uppercase; color: #6b7178; padding-bottom: 28px;">
            Message received
          </td>
        </tr>
        <tr>
          <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 1.12; letter-spacing: -0.03em; color: #0a0d10; padding-bottom: 32px;">
            Hi ${escapeHtml(brand)}.<br/>
            <span style="font-family: 'Iowan Old Style', 'Apple Garamond', Baskerville, Georgia, serif; font-style: italic; font-weight: 400;">We&rsquo;ve got you.</span>
          </td>
        </tr>
        <tr>
          <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #2b3036; padding-bottom: 32px;">
            Thanks for reaching out. We read every message personally &mdash; you&rsquo;ll hear back, usually within 24 hours.
          </td>
        </tr>
        <tr>
          <td style="border-top: 1px solid #d8dad6; padding-top: 22px; font-family: ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; line-height: 1.4; text-transform: uppercase; color: #6b7178;">
            Vienna · AT
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim();

  return {
    from: SENDER,
    to: [email],
    reply_to: INBOX,
    subject,
    text,
    html,
  };
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  if (!env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY missing on this environment");
    return jsonResponse(500, { ok: false, error: "Server not configured" });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return jsonResponse(400, { ok: false, error: "Invalid JSON" });
  }

  const email = asString(body.email, 320);
  const brand = asString(body.brand, 200);
  const message = asString(body.message);

  if (!email || !brand || !message) {
    return jsonResponse(400, { ok: false, error: "Missing fields" });
  }
  if (!EMAIL_RX.test(email)) {
    return jsonResponse(400, { ok: false, error: "Invalid email" });
  }

  const notification = buildNotification(brand, email, message);
  const autoReply = buildAutoReply(brand, email);

  // Fire both in parallel. Notification failure is fatal, auto-reply
  // failure is logged but does not bubble to the user — they already
  // got the on-page success state.
  const [notifyResult, replyResult] = await Promise.allSettled([
    sendResend(notification, env),
    sendResend(autoReply, env),
  ]);

  if (notifyResult.status === "rejected") {
    console.error("[contact] Notification fetch threw:", notifyResult.reason);
    return jsonResponse(502, { ok: false, error: "Upstream unreachable" });
  }
  if (!notifyResult.value.ok) {
    const detail = await notifyResult.value.text().catch(() => "");
    console.error("[contact] Notification Resend non-OK", notifyResult.value.status, detail);
    return jsonResponse(502, { ok: false, error: "Send failed" });
  }

  if (replyResult.status === "rejected") {
    console.error("[contact] Auto-reply fetch threw (non-blocking):", replyResult.reason);
  } else if (!replyResult.value.ok) {
    const detail = await replyResult.value.text().catch(() => "");
    console.error("[contact] Auto-reply Resend non-OK (non-blocking)", replyResult.value.status, detail);
  }

  return jsonResponse(200, { ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // Everything else: hand off to the static assets binding.
    return env.ASSETS.fetch(request);
  },
};
