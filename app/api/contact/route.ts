import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.QUOTE_TO_EMAIL || "business@maai.agency";
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || "SelfStorage Contact <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ["List my storage business", "Grow my storage business", "General question"];

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);
}
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (str(body.company_url)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const topic = str(body.topic);
  const business = str(body.business);
  const website = str(body.website);
  const message = str(body.message);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!TOPICS.includes(topic)) errors.topic = "Please choose what you need help with.";
  if (message.length < 5) errors.message = "Please add a short message.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });

  const rows: Array<[string, string]> = [
    ["Name", name], ["Email", email], ["Topic", topic], ["Business", business || "-"], ["Website", website || "-"], ["Message", message],
  ];
  const html = `<h2>New contact from the About page</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `${topic}: ${name}`,
      html,
    });
    if (error) return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
