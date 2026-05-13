import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

export interface GridCard {
  eyebrow?: string;
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
}

export interface CardGridProps {
  variant?: "light" | "warm" | "dark";
  cols?: 2 | 3 | 4;
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  cards: GridCard[];
  id?: string;
}

export default function CardGrid({
  variant = "light",
  cols = 3,
  label,
  headline,
  intro,
  cards,
  id,
}: CardGridProps) {
  return (
    <RevealSection className={`card-grid-section ${variant}`} id={id}>
      <div className="container">
        {label && <div className="section-label">{label}</div>}
        {headline && <h2 className="section-title">{headline}</h2>}
        {intro && <p className="section-intro">{intro}</p>}

        <div className={`card-grid${cols !== 3 ? ` cols-${cols}` : ""}`}>
          {cards.map((card, i) => {
            const inner = (
              <>
                {card.eyebrow && <div className="grid-card-eyebrow">{card.eyebrow}</div>}
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                {card.ctaLabel && (
                  <span className="grid-card-link">
                    {card.ctaLabel} →
                  </span>
                )}
              </>
            );

            return card.href ? (
              <Link key={i} href={card.href} className="grid-card">
                {inner}
              </Link>
            ) : (
              <div key={i} className="grid-card">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
