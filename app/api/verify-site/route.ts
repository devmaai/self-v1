import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

  return NextResponse.json({ ok: true, normalized });
}
