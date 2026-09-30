import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.QUOTE_TO_EMAIL || "business@maai.agency";
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || "SelfStorage Quote <onboarding@resend.dev>";

type QuotePayload = {
  email?: unknown;
  city?: unknown;
  units?: unknown;
  budgetStart?: unknown;
  budgetEnd?: unknown;
  facilityType?: unknown;
  // Honeypot — must stay empty. Bots tend to fill every field.
  company?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string
  );
}

export async function POST(request: Request) {
  let body: QuotePayload;
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
  const units = typeof body.units === "string" ? body.units.trim() : "";
  const budgetStart = typeof body.budgetStart === "string" ? body.budgetStart.trim() : "";
  const budgetEnd = typeof body.budgetEnd === "string" ? body.budgetEnd.trim() : "";
  const facilityType = typeof body.facilityType === "string" ? body.facilityType.trim() : "";

  const errors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!city) errors.city = "Please enter your city.";
  if (!units || isNaN(Number(units)) || Number(units) < 1)
    errors.units = "Please enter a valid number of units.";
  if (!budgetStart || isNaN(Number(budgetStart)) || Number(budgetStart) < 0)
    errors.budgetStart = "Please enter a valid minimum budget.";
  if (!budgetEnd || isNaN(Number(budgetEnd)) || Number(budgetEnd) < 0)
    errors.budgetEnd = "Please enter a valid maximum budget.";
  if (budgetStart && budgetEnd && !errors.budgetStart && !errors.budgetEnd) {
    if (Number(budgetEnd) < Number(budgetStart))
      errors.budgetEnd = "Maximum budget must be greater than minimum.";
  }
  if (!facilityType) errors.facilityType = "Please select a facility type.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const subject = `New quote request — ${city}`;
  const rows: [string, string][] = [
    ["Email", email],
    ["City", city],
    ["Storage Units", units],
    ["Budget Range", `$${Number(budgetStart).toLocaleString()} – $${Number(budgetEnd).toLocaleString()}`],
    ["Type of Facility", facilityType],
  ];
  const html = `
    <h2 style="font-family:sans-serif;margin:0 0 16px">New quote request</h2>
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
      console.error("[quote] Resend send error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[quote] Resend threw:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
