import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.AUDIT_TO_EMAIL || "business@maai.agency";
const FROM_EMAIL = process.env.AUDIT_FROM_EMAIL || "SelfStorage Audit <onboarding@resend.dev>";

// Accepts a bare domain or full URL, normalizes it, and checks the site
// actually responds before we promise the visitor an audit.
function normalize(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  // Require a dotted hostname with a real-looking TLD (rejects "foo", "localhost").
  const host = url.hostname;
  if (!/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(host)) return null;

  return url.origin + url.pathname;
}

async function reachable(target: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    // Try HEAD first; some hosts reject HEAD, so fall back to GET.
    let res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(target, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
    }
    return res.status < 400;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  let body: { site?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const raw = typeof body.site === "string" ? body.site : "";
  const normalized = normalize(raw);
  if (!normalized) {
    return NextResponse.json(
      { ok: false, error: "invalid_url" },
      { status: 422 }
    );
  }

  const exists = await reachable(normalized);
  if (!exists) {
    return NextResponse.json(
      { ok: false, error: "unreachable", normalized },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
  }

  const referer = request.headers.get("referer") || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  const subject = "New CTA report request";
  const text = [
    "A CTA report request was submitted.",
    "",
    `Website: ${normalized}`,
    `Source page: ${referer}`,
    `User agent: ${ua}`,
  ].join("\n");
  const html = `
    <h2 style="font-family:sans-serif;margin:0 0 16px">New CTA report request</h2>
    <p style="font-family:sans-serif;font-size:14px;margin:0 0 8px"><strong>Website:</strong> ${normalized}</p>
    <p style="font-family:sans-serif;font-size:14px;margin:0 0 8px"><strong>Source page:</strong> ${referer}</p>
    <p style="font-family:sans-serif;font-size:14px;margin:0"><strong>User agent:</strong> ${ua}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      text,
      html,
    });
    if (error) {
      console.error("[verify-site] Resend send error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[verify-site] Resend threw:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, normalized });
}
