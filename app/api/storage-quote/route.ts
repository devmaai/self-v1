import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.STORAGE_QUOTE_TO_EMAIL || process.env.QUOTE_TO_EMAIL || "business@maai.agency";
const FROM_EMAIL = process.env.STORAGE_QUOTE_FROM_EMAIL || "SelfStorage Quote <onboarding@resend.dev>";

type StorageQuotePayload = {
  email?: unknown;
  city?: unknown;
  unitSize?: unknown;
  priceRange?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  storageType?: unknown;
  phone?: unknown;
  // Honeypot — must stay empty. Bots tend to fill every field.
  company?: unknown;
  captchaToken?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string
  );
}

// US phone: common formats accepted, then require exactly 10 digits
// (optionally a leading country code "1") with NANP area/exchange rules.
function normalizeUsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(ten)) return null;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

function isValidDate(raw: string): boolean {
  const t = Date.parse(raw);
  return raw.trim() !== "" && !Number.isNaN(t);
}

async function verifyCaptcha(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured, captcha is treated as disabled (dev mode).
  if (!secret) return true;
  if (!token) return false;
  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip) params.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: StorageQuotePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: a real user never fills this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const unitSize = typeof body.unitSize === "string" ? body.unitSize.trim() : "";
  const priceRange = typeof body.priceRange === "string" ? body.priceRange.trim() : "";
  const startDate = typeof body.startDate === "string" ? body.startDate.trim() : "";
  const endDate = typeof body.endDate === "string" ? body.endDate.trim() : "";
  const storageType = typeof body.storageType === "string" ? body.storageType.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";

  const errors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!city) errors.city = "Please enter your city.";
  if (!unitSize) errors.unitSize = "Please select a unit size.";
  if (!priceRange) errors.priceRange = "Please select a price range.";
  if (!isValidDate(startDate)) errors.startDate = "Please enter a valid start date.";
  if (!isValidDate(endDate)) {
    errors.endDate = "Please enter a valid end date.";
  } else if (isValidDate(startDate) && Date.parse(endDate) < Date.parse(startDate)) {
    errors.endDate = "End date must be on or after the start date.";
  }
  if (!storageType) errors.storageType = "Please select a storage type.";
  const phone = normalizeUsPhone(phoneRaw);
  if (!phone) errors.phone = "Please enter a valid US phone number.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : "";
  const human = await verifyCaptcha(captchaToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const subject = `New storage quote request — ${city}`;
  const rows: [string, string][] = [
    ["Email", email],
    ["City", city],
    ["Phone", phone!],
    ["Unit Size", unitSize],
    ["Price Range", priceRange],
    ["Start Date", startDate],
    ["End Date", endDate],
    ["Storage Type", storageType],
  ];
  const html = `
    <h2 style="font-family:sans-serif;margin:0 0 16px">New storage quote request</h2>
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
      console.error("[storage-quote] Resend send error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[storage-quote] Resend threw:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
