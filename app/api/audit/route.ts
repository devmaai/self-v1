import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.AUDIT_TO_EMAIL || "business@maai.agency";
// Resend's onboarding sender works immediately without domain verification.
// Swap to a verified domain sender (e.g. "audit@selfstorage.help") once set up.
const FROM_EMAIL = process.env.AUDIT_FROM_EMAIL || "SelfStorage Audit <onboarding@resend.dev>";

type AuditPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  gbp?: unknown;
  // Honeypot — must stay empty. Bots tend to fill every field.
  company?: unknown;
  captchaToken?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// US phone: accept common formats, then require exactly 10 digits
// (optionally a leading country code "1").
function normalizeUsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  // NANP: area code and exchange must each start with 2-9; the rest are free.
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(ten)) return null;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (!/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(url.hostname)) return null;
    return url.origin + url.pathname.replace(/\/$/, "");
  } catch {
    return null;
  }
}

async function verifyCaptcha(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured, captcha is treated as disabled (dev mode).
  if (!secret) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string
  );
}

export async function POST(request: Request) {
  let body: AuditPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: a real user never fills this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    // Pretend success so bots get no signal.
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  const websiteRaw = typeof body.website === "string" ? body.website.trim() : "";
  const gbp = typeof body.gbp === "string" ? body.gbp.trim() : "";
  const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : "";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  const phone = normalizeUsPhone(phoneRaw);
  if (!phone) errors.phone = "Please enter a valid US phone number.";
  const website = normalizeUrl(websiteRaw);
  if (!website) errors.website = "Please enter a valid website address.";
  if (!gbp) errors.gbp = "Please add your Google Business link or name.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const human = await verifyCaptcha(captchaToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const subject = `New audit request — ${name}`;
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone!],
    ["Business website", website!],
    ["Google Business", gbp],
  ];
  const html = `
    <h2 style="font-family:sans-serif;margin:0 0 16px">New free-audit request</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#6b6157;vertical-align:top"><strong>${k}</strong></td><td style="padding:6px 0">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[audit] Resend send error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[audit] Resend threw:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
