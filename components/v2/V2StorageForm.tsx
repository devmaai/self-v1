"use client";

import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FieldErrors = Partial<Record<"email" | "city" | "unitSize" | "priceRange" | "startDate" | "endDate" | "storageType" | "phone", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const UNIT_SIZES = [
  "5' × 5'",
  "5' × 10'",
  "10' × 10'",
  "10' × 15'",
  "10' × 20'",
  "10' × 25'",
  "10' × 30'",
  "Other",
];

const PRICE_RANGES = [
  "Under $50/mo",
  "$50 – $100/mo",
  "$100 – $150/mo",
  "$150 – $200/mo",
  "$200 – $300/mo",
  "$300+/mo",
];

const STORAGE_TYPES = [
  "Indoor",
  "Outdoor / Drive-up",
  "Climate Controlled",
  "Vehicle / RV / Boat",
  "Business / Commercial",
  "Other",
];

export default function V2StorageForm() {
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
      email: String(data.get("email") || ""),
      city: String(data.get("city") || ""),
      unitSize: String(data.get("unitSize") || ""),
      priceRange: String(data.get("priceRange") || ""),
      startDate: String(data.get("startDate") || ""),
      endDate: String(data.get("endDate") || ""),
      storageType: String(data.get("storageType") || ""),
      phone: String(data.get("phone") || ""),
      company: String(data.get("company") || ""), // honeypot
      captchaToken: String(data.get("cf-turnstile-response") || ""),
    };

    setStatus("submitting");
    setFieldErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/storage-quote", {
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
      } else if (result.error === "email_not_configured") {
        setFormError("The form isn't connected to email yet. Please email us directly for now.");
      } else if (result.error === "captcha") {
        setFormError("Captcha check failed. Please try the verification again.");
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
        <p>Thanks. We&apos;ll be in touch shortly with storage options that match your needs.</p>
      </div>
    );
  }

  return (
    <div className="af-card">
      {SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}
      <form className="af-form" onSubmit={handleSubmit} noValidate>
        <div className="af-row">
          <div className="af-field">
            <label htmlFor="sf-email">Email</label>
            <input id="sf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            {fieldErrors.email && <span className="af-error">{fieldErrors.email}</span>}
          </div>
          <div className="af-field">
            <label htmlFor="sf-city">City</label>
            <input id="sf-city" name="city" type="text" autoComplete="address-level2" placeholder="Your city" required />
            {fieldErrors.city && <span className="af-error">{fieldErrors.city}</span>}
          </div>
        </div>

        <div className="af-field">
          <label htmlFor="sf-phone">Phone <span className="af-hint">(US)</span></label>
          <input id="sf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 123-4567" required />
          {fieldErrors.phone && <span className="af-error">{fieldErrors.phone}</span>}
        </div>

        <div className="af-row">
          <div className="af-field">
            <label htmlFor="sf-unitSize">Unit size</label>
            <select id="sf-unitSize" name="unitSize" required>
              <option value="" disabled>Select size</option>
              {UNIT_SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {fieldErrors.unitSize && <span className="af-error">{fieldErrors.unitSize}</span>}
          </div>
          <div className="af-field">
            <label htmlFor="sf-priceRange">Price range</label>
            <select id="sf-priceRange" name="priceRange" required>
              <option value="" disabled>Select range</option>
              {PRICE_RANGES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {fieldErrors.priceRange && <span className="af-error">{fieldErrors.priceRange}</span>}
          </div>
        </div>

        <div className="af-row">
          <div className="af-field">
            <label htmlFor="sf-startDate">Start date</label>
            <input id="sf-startDate" name="startDate" type="date" required />
            {fieldErrors.startDate && <span className="af-error">{fieldErrors.startDate}</span>}
          </div>
          <div className="af-field">
            <label htmlFor="sf-endDate">End date</label>
            <input id="sf-endDate" name="endDate" type="date" required />
            {fieldErrors.endDate && <span className="af-error">{fieldErrors.endDate}</span>}
          </div>
        </div>

        <div className="af-field">
          <label htmlFor="sf-storageType">Storage type</label>
          <select id="sf-storageType" name="storageType" required>
            <option value="" disabled>Select type</option>
            {STORAGE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {fieldErrors.storageType && <span className="af-error">{fieldErrors.storageType}</span>}
        </div>

        {/* Honeypot: hidden from humans, tempting to bots. */}
        <div className="af-honeypot" aria-hidden="true">
          <label htmlFor="sf-company">Company</label>
          <input id="sf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {SITE_KEY && <div className="cf-turnstile af-turnstile" data-sitekey={SITE_KEY} data-theme="dark" />}

        {formError && <p className="af-form-error">{formError}</p>}

        <button type="submit" className="af-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get storage options →"}
        </button>

        <p className="af-note">Free, no obligation. We&apos;ll match you with facilities that fit your needs.</p>
      </form>
    </div>
  );
}
