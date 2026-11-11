"use client";

import { useState } from "react";
import PhoneField from "@/components/ui/PhoneField";

const TOPICS = ["Business enquiry", "Sales", "Partnership", "Press and media", "Other"];
type Status = "idle" | "submitting" | "success" | "error";

export default function V2ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) || "").trim();
    const phone = get("phone");
    const phoneRegion = get("phoneRegion");
    const payload = {
      name: get("name"),
      email: get("email"),
      topic: get("topic"),
      business: get("business"),
      website: "",
      phone,
      phoneRegion,
      message: get("message"),
      company_url: get("company_url"),
    };

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
        <h3>Message received.</h3>
        <p>Thanks for getting in touch. You will hear back within one to two business days.</p>
      </div>
    );
  }

  return (
    <div className="af-card">
      <form className="af-form" onSubmit={handleSubmit} noValidate>
        <div className="af-row">
          <div className="af-field">
            <label htmlFor="cf-name">Name</label>
            <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
            {errors.name && <span className="af-error">{errors.name}</span>}
          </div>
          <div className="af-field">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            {errors.email && <span className="af-error">{errors.email}</span>}
          </div>
        </div>
        <div className="af-row">
          <div className="af-field">
            <label htmlFor="cf-business">Company <span className="af-hint">(optional)</span></label>
            <input id="cf-business" name="business" type="text" autoComplete="organization" placeholder="Company name" />
          </div>
          <PhoneField id="cf-phone" error={errors.phone} optional />
        </div>
        <div className="af-field">
          <label htmlFor="cf-topic">Type of enquiry</label>
          <select id="cf-topic" name="topic" defaultValue="Business enquiry">
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
          {errors.topic && <span className="af-error">{errors.topic}</span>}
        </div>
        <div className="af-field">
          <label htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows={5} placeholder="How can we help?" required />
          {errors.message && <span className="af-error">{errors.message}</span>}
        </div>
        <div className="af-honeypot" aria-hidden="true">
          <label htmlFor="cf-company-url">Company URL</label>
          <input id="cf-company-url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {formError && <p className="af-form-error">{formError}</p>}
        <button type="submit" className="af-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message →"}
        </button>
        <p className="af-note">We reply within one to two business days.</p>
      </form>
    </div>
  );
}
