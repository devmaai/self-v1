"use client";

import { useState } from "react";
import RevealSection from "@/components/ui/RevealSection";

export interface CTABannerProps {
  headline?: React.ReactNode;
  subtext?: string;
  placeholder?: string;
  ctaLabel?: string;
  note?: string;
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
}: CTABannerProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 2800);
  };

  return (
    <RevealSection className="cta-banner" id="contact">
      <div className="container cta-banner-inner">
        <h2>{headline}</h2>
        <p>{subtext}</p>

        <form className="audit-form" onSubmit={handleSubmit}>
          <input type="url" placeholder={placeholder} required aria-label="Website URL" />
          <button
            type="submit"
            style={sent ? { background: "#2d5a3d" } : undefined}
          >
            {sent ? "Sent ✓" : ctaLabel}
          </button>
        </form>

        <p className="form-note">{note}</p>
      </div>
    </RevealSection>
  );
}
