"use client";

import { useState } from "react";
import RevealSection from "@/components/ui/RevealSection";

export interface CTABannerProps {
  headline?: React.ReactNode;
  subtext?: string;
  placeholder?: string;
  ctaLabel?: string;
  note?: string;
  inputType?: "email" | "url";
}

export default function CTABanner({
  headline = (
    <>
      Ready to See Where You're Losing <em>Renters on Google?</em>
    </>
  ),
  subtext = "Get a free, no-obligation audit of your current Google Maps visibility and Google Business Profile. We'll show you exactly why you're not ranking and what will it take to fix it.",
  placeholder = "yourfacility.com",
  ctaLabel = "Send my audit",
  note = "We respond within two business days. Your details stay with us.",
  inputType = "url",
}: CTABannerProps) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = (form.elements.namedItem("site") as HTMLInputElement).value;

    setError(null);

    // Email keeps the simple native-validated flow.
    if (inputType === "email") {
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 2800);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/verify-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: value }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(
          data.error === "unreachable"
            ? "We couldn't reach that site. Double-check the address and try again."
            : "That doesn't look like a valid website address."
        );
        return;
      }

      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 2800);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <RevealSection className="cta-banner" id="contact">
      <div className="container cta-banner-inner">
        <h2>{headline}</h2>
        <p>{subtext}</p>

        <form className="audit-form" onSubmit={handleSubmit}>
          <input
            name="site"
            type={inputType === "email" ? "email" : "text"}
            inputMode={inputType}
            autoComplete={inputType}
            placeholder={placeholder}
            required
            aria-label={inputType === "email" ? "Email address" : "Website URL"}
            onChange={() => error && setError(null)}
          />
          <button
            type="submit"
            disabled={busy}
            style={sent ? { background: "#2d5a3d" } : undefined}
          >
            {sent ? "Sent ✓" : busy ? "Checking…" : ctaLabel}
          </button>
        </form>

        <p className="form-note" style={error ? { color: "#ffd9cc" } : undefined}>
          {error ?? note}
        </p>
      </div>
    </RevealSection>
  );
}
