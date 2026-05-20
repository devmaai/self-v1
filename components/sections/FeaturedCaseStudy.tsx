import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

export interface FeaturedStat {
  value: string;
  label: string;
}

export interface FeaturedCaseStudyProps {
  eyebrow?: string;
  category: string;
  headline: React.ReactNode;
  excerpt: string;
  stats?: FeaturedStat[];
  image: string;
  href?: string;
  ctaLabel?: string;
}

export default function FeaturedCaseStudy({
  eyebrow = "Featured story",
  category,
  headline,
  excerpt,
  stats,
  image,
  href = "#",
  ctaLabel = "Read the full case study",
}: FeaturedCaseStudyProps) {
  return (
    <RevealSection className="featured-case">
      <div className="container">
        <div className="featured-case-grid">
          <div
            className="featured-case-media"
            style={{ backgroundImage: `url(${image})` }}
          >
            <span className="featured-case-badge">{category}</span>
          </div>
          <div className="featured-case-body">
            <div className="featured-case-eyebrow">{eyebrow}</div>
            <h2 className="featured-case-headline">{headline}</h2>
            <p className="featured-case-excerpt">{excerpt}</p>
            {stats && stats.length > 0 && (
              <ul className="featured-case-stats">
                {stats.map((s, i) => (
                  <li key={i}>
                    <span className="featured-case-stat-value">{s.value}</span>
                    <span className="featured-case-stat-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            )}
            <Link href={href} className="featured-case-link">
              {ctaLabel} →
            </Link>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
