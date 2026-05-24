import Link from "next/link";
import HeroImage from "@/components/sections/HeroImage";

export interface HeroProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: { num: string; label: string }[];
}

const defaults: Required<Omit<HeroProps, "secondaryCta">> = {
  eyebrow: "SEO for self-storage owners across the USA",
  headline: (
    <>
      Outrank the Facility <em>Down the Road</em>.
    </>
  ),
  subheadline:
    "National chains and aggregators are pulling move-ins away from your facility on Google. We fix the local SEO gaps so renters in your city find you first.",
  primaryCta: { label: "Get Your Free Google Maps Visibility Audit", href: "#contact" },
  stats: [
    { num: "94%", label: "Clients renew year two" },
    { num: "3.2×", label: "Avg organic lead lift" },
    { num: "$0", label: "Cost per organic lead" },
  ],
};

export default function Hero(props: HeroProps) {
  const { eyebrow, headline, subheadline, primaryCta, secondaryCta, stats } = {
    ...defaults,
    ...props,
  };

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
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path
                  d="M1 7H17M17 7L11 1M17 7L11 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            {/* <Link href={secondaryCta.href} className="btn-secondary">
              {secondaryCta.label}
            </Link> */}
          </div>

          <div className="hero-meta">
            {stats.map(({ num, label }) => (
              <div key={label} className="hero-meta-item">
                <span className="num">{num}</span>
                <span className="lbl">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual-img">
          <HeroImage />

          {/* <div className="hero-badge top">
            <span className="dot" />
            <div>
              <strong>Ranking #1</strong>
              <br />
              <span>&ldquo;storage units near me&rdquo;</span>
            </div>
          </div>

          <div className="hero-badge bottom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b5441f" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <div>
              <strong>+148% move-ins</strong>
              <br />
              <span>6-month window</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
