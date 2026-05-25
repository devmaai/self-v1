import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

export interface GridCard {
  eyebrow?: string;
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  image?: string;
}

export interface CardGridProps {
  variant?: "light" | "warm" | "dark";
  cols?: 2 | 3 | 4;
  label?: string;
  headline?: React.ReactNode;
  headlineCentered?: boolean;
  intro?: string;
  cards: GridCard[];
  id?: string;
  prepend?: React.ReactNode;
}

export default function CardGrid({
  variant = "light",
  cols = 3,
  label,
  headline,
  headlineCentered = false,
  intro,
  cards,
  id,
  prepend,
}: CardGridProps) {
  return (
    <RevealSection className={`card-grid-section ${variant}`} id={id}>
      <div className="container">
        {label && <div className="section-label">{label}</div>}
        {headline && (
          <h2 className={`section-title ${headlineCentered ? "centered" : ""}`}>
            {headline}
          </h2>
        )}
        {intro && <p className="section-intro">{intro}</p>}
        {prepend}

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

            const className = `grid-card${card.image ? " has-image" : ""}`;
            const style = card.image
              ? { backgroundImage: `url(${card.image})` }
              : undefined;
            const content = card.image ? (
              <span className="grid-card-inner">{inner}</span>
            ) : (
              inner
            );

            return card.href ? (
              <Link key={i} href={card.href} className={className} style={style}>
                {content}
              </Link>
            ) : (
              <div key={i} className={className} style={style}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
