"use client";

import { useState } from "react";
import PhoneField from "@/components/ui/PhoneField";

type Kind = "backlink" | "listing";
type Status = "idle" | "submitting" | "success" | "error";

const CONFIG: Record<Kind, { topic: string; submit: string; success: string; messageLabel: string; messagePlaceholder: string }> = {
  backlink: {
    topic: "Request a backlink",
    submit: "Send my backlink request →",
    success: "Thanks. We'll review your facility and reply by email within two business days with placement options.",
    messageLabel: "Anything we should know",
    messagePlaceholder: "Which city or topic your facility serves best, or the page you would like a link from",
  },
  listing: {
    topic: "List my storage business",
    submit: "Send my listing request →",
    success: "Thanks. We'll review your details and confirm your listing by email within two business days.",
    messageLabel: "Unit sizes, types and starting prices",
    messagePlaceholder: "For example: 5x5 to 10x30, drive-up and climate controlled, 10x10 from $95/month",
  },
};

export default function V2RequestForm({ kind }: { kind: Kind }) {
  const cfg = CONFIG[kind];
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) || "").trim();

    const details = [
      get("phone") && `Phone (${get("phoneRegion")}): ${get("phone")}`,
      get("location") && `Location: ${get("location")}`,
      get("notes") && `${cfg.messageLabel}: ${get("notes")}`,
    ].filter(Boolean).join("\n");

    const payload = {
      name: get("name"),
      email: get("email"),
      topic: cfg.topic,
      business: get("business"),
      website: get("website"),
      phone: get("phone"),
      phoneRegion: get("phoneRegion"),
      message: details || `${cfg.topic} request`,
      company_url: get("company_url"),
    };

    const clientErrors: Record<string, string> = {};
    if (!payload.business) clientErrors.business = "Please enter your facility name.";
    if (!get("location")) clientErrors.location = "Please enter your city and state.";
    if (kind === "backlink" && !payload.website) clientErrors.website = "Please enter your website.";
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setFormError("Please fix the highlighted fields and try again.");
      } else {
        setFormError("Something went wrong. Please email business@maai.agency directly.");
      }
      setStatus("error");
    } catch {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="af-card af-success" role="status">
        <div className="af-success-check" aria-hidden="true">✓</div>
        <h3>Request received.</h3>
        <p>{cfg.success}</p>
      </div>
    );
  }

  const id = (k: string) => `rf-${kind}-${k}`;

  return (
    <div className="af-card">
      <form className="af-form" onSubmit={handleSubmit} noValidate>
        <div className="af-row">
          <div className="af-field">
            <label htmlFor={id("name")}>Name</label>
            <input id={id("name")} name="name" type="text" autoComplete="name" placeholder="Your name" required />
            {errors.name && <span className="af-error">{errors.name}</span>}
          </div>
          <div className="af-field">
            <label htmlFor={id("email")}>Email</label>
            <input id={id("email")} name="email" type="email" autoComplete="email" placeholder="you@facility.com" required />
            {errors.email && <span className="af-error">{errors.email}</span>}
          </div>
        </div>

        <div className="af-row">
          <div className="af-field">
            <label htmlFor={id("business")}>Facility name</label>
            <input id={id("business")} name="business" type="text" autoComplete="organization" placeholder="Your facility" required />
            {errors.business && <span className="af-error">{errors.business}</span>}
          </div>
          <PhoneField id={id("phone")} error={errors.phone} optional />
        </div>

        <div className="af-row">
          <div className="af-field">
            <label htmlFor={id("website")}>Website{kind === "listing" && <span className="af-hint"> (optional)</span>}</label>
            <input id={id("website")} name="website" type="text" inputMode="url" placeholder="yourfacility.com" required={kind === "backlink"} />
            {errors.website && <span className="af-error">{errors.website}</span>}
          </div>
          <div className="af-field">
            <label htmlFor={id("location")}>{kind === "listing" ? "Facility address or city, state" : "City and state"}</label>
            <input id={id("location")} name="location" type="text" autoComplete="address-level2" placeholder="Provo, UT" required />
            {errors.location && <span className="af-error">{errors.location}</span>}
          </div>
        </div>

        <div className="af-field">
          <label htmlFor={id("notes")}>{cfg.messageLabel} <span className="af-hint">(optional)</span></label>
          <textarea id={id("notes")} name="notes" rows={3} placeholder={cfg.messagePlaceholder} />
          {errors.message && <span className="af-error">{errors.message}</span>}
        </div>

        <div className="af-honeypot" aria-hidden="true">
          <label htmlFor={id("company_url")}>Company URL</label>
          <input id={id("company_url")} name="company_url" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {formError && <p className="af-form-error">{formError}</p>}

        <button type="submit" className="af-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : cfg.submit}
        </button>
        <p className="af-note">Free to request. We reply within two business days.</p>
      </form>
    </div>
  );
}
