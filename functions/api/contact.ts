/**
 * Cloudflare Pages Function — receives contact-form POST, forwards to
 * Resend, returns 200/4xx/5xx. Requires RESEND_API_KEY as an env-var
 * in the Pages project (Settings → Variables and Secrets).
 *
 * Resend "from" must be on a verified domain; we use partnership@ajione.com
 * and set reply_to to the lead's address so hitting "Reply" in the mail
 * client goes straight to the brand.
 */

interface Env {
  RESEND_API_KEY: string;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LEN = 4000;

type Body = {
  email?: unknown;
  brand?: unknown;
  message?: unknown;
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

function jsonResponse(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY missing on this environment");
    return jsonResponse(500, { ok: false, error: "Server not configured" });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
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

  const subject = `New partnership inquiry — ${brand}`;
  const textBody = `From: ${brand} <${email}>\n\n${message}`;
  const htmlBody = `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0a0d10; max-width: 560px;">
      <tr>
        <td style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(10,13,16,0.55); padding-bottom: 12px;">
          New partnership inquiry
        </td>
      </tr>
      <tr>
        <td style="font-size: 15px; line-height: 1.5; padding-bottom: 20px;">
          <strong>${escapeHtml(brand)}</strong><br/>
          <a href="mailto:${escapeHtml(email)}" style="color: #0a0d10;">${escapeHtml(email)}</a>
        </td>
      </tr>
      <tr>
        <td style="font-size: 15px; line-height: 1.6; white-space: pre-wrap; border-top: 1px solid rgba(10,13,16,0.12); padding-top: 20px;">
          ${escapeHtml(message)}
        </td>
      </tr>
    </table>
  `.trim();

  let resendRes: Response;
  try {
    resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AJIONE Partnership <partnership@ajione.com>",
        to: ["partnership@ajione.com"],
        reply_to: email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });
  } catch (err) {
    console.error("[contact] fetch to Resend failed:", err);
    return jsonResponse(502, { ok: false, error: "Upstream unreachable" });
  }

  if (!resendRes.ok) {
    const detail = await resendRes.text().catch(() => "");
    console.error("[contact] Resend non-OK", resendRes.status, detail);
    return jsonResponse(502, { ok: false, error: "Send failed" });
  }

  return jsonResponse(200, { ok: true });
};
