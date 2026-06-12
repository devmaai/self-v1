"use client";

import { useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "website" | "gbp", string>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function V2AuditForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const resetCaptcha = () => {
    if (SITE_KEY && typeof window !== "undefined") window.turnstile?.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      website: String(data.get("website") || ""),
      gbp: String(data.get("gbp") || ""),
      company: String(data.get("company") || ""), // honeypot
      captchaToken: String(data.get("cf-turnstile-response") || ""),
    };

    setStatus("submitting");
    setFieldErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok && result.ok) {
        setStatus("success");
        form.reset();
        resetCaptcha();
        return;
      }

      if (result.error === "validation" && result.fields) {
        setFieldErrors(result.fields as FieldErrors);
        setFormError("Please fix the highlighted fields and try again.");
      } else if (result.error === "captcha") {
        setFormError("Captcha check failed. Please try the verification again.");
      } else if (result.error === "email_not_configured") {
        setFormError("The form isn't connected to email yet. Please email us directly for now.");
      } else {
        setFormError("Something went wrong sending your request. Please try again in a moment.");
      }
      setStatus("error");
      resetCaptcha();
    } catch {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
      resetCaptcha();
    }
  };

  if (status === "success") {
    return (
      <div className="af-card af-success" role="status">
        <div className="af-success-check" aria-hidden="true">✓</div>
        <h3>Request received.</h3>
        <p>Thanks. We&apos;ll review your facility and send a written audit within five business days.</p>
      </div>
    );
  }

  return (
    <div className="af-card">
      {SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}
      <form ref={formRef} className="af-form" onSubmit={handleSubmit} noValidate>
        <div className="af-row">
          <div className="af-field">
            <label htmlFor="af-name">Name</label>
            <input id="af-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
            {fieldErrors.name && <span className="af-error">{fieldErrors.name}</span>}
          </div>
          <div className="af-field">
            <label htmlFor="af-email">Email</label>
            <input id="af-email" name="email" type="email" autoComplete="email" placeholder="you@facility.com" required />
            {fieldErrors.email && <span className="af-error">{fieldErrors.email}</span>}
          </div>
        </div>

        <div className="af-row">
          <div className="af-field">
            <label htmlFor="af-phone">Phone <span className="af-hint">(US)</span></label>
            <input
              id="af-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(555) 123-4567"
              required
            />
            {fieldErrors.phone && <span className="af-error">{fieldErrors.phone}</span>}
          </div>
          <div className="af-field">
            <label htmlFor="af-website">Business website</label>
            <input id="af-website" name="website" type="text" inputMode="url" placeholder="yourfacility.com" required />
            {fieldErrors.website && <span className="af-error">{fieldErrors.website}</span>}
          </div>
        </div>

        <div className="af-field">
          <label htmlFor="af-gbp">Google Business link or name</label>
          <input
            id="af-gbp"
            name="gbp"
            type="text"
            placeholder="Google Maps link, or your facility name + city"
            required
          />
          {fieldErrors.gbp && <span className="af-error">{fieldErrors.gbp}</span>}
        </div>

        {/* Honeypot: hidden from humans, tempting to bots. */}
        <div className="af-honeypot" aria-hidden="true">
          <label htmlFor="af-company">Company</label>
          <input id="af-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {SITE_KEY && <div className="cf-turnstile af-turnstile" data-sitekey={SITE_KEY} data-theme="dark" />}

        {formError && <p className="af-form-error">{formError}</p>}

        <button type="submit" className="af-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send my audit request →"}
        </button>

        <p className="af-note">Free, no obligation. Written report in 5 business days. We reply within two business days.</p>
      </form>
    </div>
  );
}
