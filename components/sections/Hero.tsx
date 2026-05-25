import Link from "next/link";
import HeroImage from "@/components/sections/HeroImage";

export interface HeroProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
}

const defaultStats = [
  { num: "94%", label: "Clients renew year two" },
  { num: "3.2×", label: "Avg organic lead lift" },
  { num: "$0", label: "Cost per organic lead" },
];

export default function Hero({
  eyebrow = "SEO for self-storage owners across the USA",
  headline = (
    <>
      Out-rank the <em>chains</em>. Out-earn the <em>aggregators</em>.
    </>
  ),
  subheadline = "National chains and aggregators are pulling move-ins away from your facility on Google. We fix the local SEO gaps so renters in your city find you first.",
  primaryCta = { label: "Get Your Free Google Maps Visibility Audit", href: "#contact" },
}: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <div className="hero-eyebrow">{eyebrow}</div>
          <h1>{headline}</h1>
          <p className="hero-sub">{subheadline}</p>

          <div className="hero-ctas">
            <Link href={primaryCta.href} className="btn-primary">
              {primaryCta.label}
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </div>

          <div className="hero-meta">
            {defaultStats.map(({ num, label }) => (
              <div key={label} className="hero-meta-item">
                <span className="num">{num}</span>
                <span className="lbl">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual-img">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
