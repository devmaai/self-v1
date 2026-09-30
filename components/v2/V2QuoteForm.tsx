"use client";

import { useState } from "react";

type FieldErrors = Partial<
  Record<"email" | "city" | "units" | "budgetStart" | "budgetEnd" | "facilityType", string>
>;
type Status = "idle" | "submitting" | "success" | "error";

const FACILITY_TYPES = [
  "Self-Storage",
  "Climate-Controlled Storage",
  "Vehicle / RV / Boat Storage",
  "Warehouse / Commercial",
  "Mixed-Use Facility",
  "Other",
];

export default function V2QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: String(data.get("email") || ""),
      city: String(data.get("city") || ""),
      units: String(data.get("units") || ""),
      budgetStart: String(data.get("budgetStart") || ""),
      budgetEnd: String(data.get("budgetEnd") || ""),
      facilityType: String(data.get("facilityType") || ""),
      company: String(data.get("company") || ""), // honeypot
    };

    setStatus("submitting");
    setFieldErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok && result.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (result.error === "validation" && result.fields) {
        setFieldErrors(result.fields as FieldErrors);
        setFormError("Please fix the highlighted fields and try again.");
      } else if (result.error === "email_not_configured") {
        setFormError("The form isn't connected to email yet. Please email us directly for now.");
      } else {
        setFormError("Something went wrong sending your request. Please try again in a moment.");
      }
      setStatus("error");
    } catch {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="qf-card qf-success" role="status">
        <div className="qf-success-check" aria-hidden="true">
          ✓
        </div>
        <h3>Request received.</h3>
        <p>Thanks. We&apos;ll review your requirements and send a custom quote within two business days.</p>
      </div>
    );
  }

  return (
    <div className="qf-card">
      <form className="qf-form" onSubmit={handleSubmit} noValidate>
        <div className="qf-row">
          <div className="qf-field">
            <label htmlFor="qf-email">Email</label>
            <input
              id="qf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@facility.com"
              required
            />
            {fieldErrors.email && <span className="qf-error">{fieldErrors.email}</span>}
          </div>
          <div className="qf-field">
            <label htmlFor="qf-city">City</label>
            <input
              id="qf-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="e.g. Austin"
              required
            />
            {fieldErrors.city && <span className="qf-error">{fieldErrors.city}</span>}
          </div>
        </div>

        <div className="qf-row">
          <div className="qf-field">
            <label htmlFor="qf-units">Storage Units</label>
            <input
              id="qf-units"
              name="units"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="e.g. 200"
              required
            />
            {fieldErrors.units && <span className="qf-error">{fieldErrors.units}</span>}
          </div>
          <div className="qf-field">
            <label htmlFor="qf-facilityType">Type of Facility</label>
            <select id="qf-facilityType" name="facilityType" required defaultValue="">
              <option value="" disabled>
                Select a type
              </option>
              {FACILITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {fieldErrors.facilityType && <span className="qf-error">{fieldErrors.facilityType}</span>}
          </div>
        </div>

        <div className="qf-field">
          <label>
            Budget Range <span className="qf-hint">(USD)</span>
          </label>
          <div className="qf-budget-row">
            <div className="qf-budget-field">
              <input
                id="qf-budgetStart"
                name="budgetStart"
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="Min — e.g. 50,000"
                required
              />
              {fieldErrors.budgetStart && <span className="qf-error">{fieldErrors.budgetStart}</span>}
            </div>
            <span className="qf-budget-sep" aria-hidden="true">
              →
            </span>
            <div className="qf-budget-field">
              <input
                id="qf-budgetEnd"
                name="budgetEnd"
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="Max — e.g. 150,000"
                required
              />
              {fieldErrors.budgetEnd && <span className="qf-error">{fieldErrors.budgetEnd}</span>}
            </div>
          </div>
        </div>

        {/* Honeypot: hidden from humans, tempting to bots. */}
        <div className="qf-honeypot" aria-hidden="true">
          <label htmlFor="qf-company">Company</label>
          <input id="qf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {formError && <p className="qf-form-error">{formError}</p>}

        <button type="submit" className="qf-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get my quote →"}
        </button>

        <p className="qf-note">Free, no obligation. We reply within two business days.</p>
      </form>
    </div>
  );
}
