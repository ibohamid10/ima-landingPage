/**
 * Cloudflare Worker — Routes /api/contact to the Resend integration
 * and passes everything else through to the static assets binding.
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

type ContactBody = {
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

function jsonResponse(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
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
