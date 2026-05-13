import Link from "next/link";

export interface PageHeroProps {
  eyebrow?: string;
  headline: React.ReactNode;
  subheadline: string;
  primaryCta?: { label: string; href: string };
  primaryCtaTone?: "ink" | "rust";
  note?: string;
}

export default function PageHero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  primaryCtaTone = "ink",
  note,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <div className="hero-eyebrow">{eyebrow}</div>}
        <h1>{headline}</h1>
        <p className="hero-sub">{subheadline}</p>
        {primaryCta && (
          <>
            <Link href={primaryCta.href} className={primaryCtaTone === "rust" ? "btn-primary btn-primary-rust" : "btn-primary"}>
              {primaryCta.label}
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
            {note && <p className="page-hero-note">{note}</p>}
          </>
        )}
      </div>
    </section>
  );
}
