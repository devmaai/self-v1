import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

export interface SimpleCTAProps {
  headline: React.ReactNode;
  body?: string;
  ctaLabel: string;
  ctaHref?: string;
  note?: string;
}

export default function SimpleCTA({
  headline,
  body,
  ctaLabel,
  ctaHref = "/contact",
  note,
}: SimpleCTAProps) {
  return (
    <RevealSection className="simple-cta">
      <div className="container simple-cta-inner">
        <h2>{headline}</h2>
        {body && <p>{body}</p>}
        <Link href={ctaHref} className="btn-primary">
          {ctaLabel}
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Link>
        {note && <p className="simple-cta-note">{note}</p>}
      </div>
    </RevealSection>
  );
}
