import RevealSection from "@/components/ui/RevealSection";
import Image from "next/image";

export interface ResultCard {
  metric: string;
  sup?: string;
  title: string;
  desc: string;
  meta: { left: string; right: string };
}

export interface ResultsProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  cards?: ResultCard[];
}

const defaultCards: ResultCard[] = [
  {
    metric: "+148",
    sup: "%",
    title: "Organic move-ins",
    desc: "An independent operator in Texas doubled monthly organic move-ins in six months through location page rollout and GBP optimization.",
    meta: { left: "6 months", right: "3 facilities" },
  },
  {
    metric: "#1",
    title: "Map pack ranking",
    desc: "A single-location operator in Ohio moved from page two to the top three-pack position for their primary city search term.",
    meta: { left: "4 months", right: "1 facility" },
  },
  {
    metric: "$0",
    title: "Paid ads spend cut",
    desc: "A Florida operator eliminated their paid ads budget entirely after organic lead volume exceeded their previous paid performance.",
    meta: { left: "9 months", right: "2 facilities" },
  },
];

export default function Results({
  label = "Outcomes",
  headline = (
    <>
      Proof, not <em>promises</em>.
    </>
  ),
  intro = "These are real results from independent operators we have worked with. Full case studies available on request under NDA.",
  cards = defaultCards,
}: ResultsProps) {
  return (
    <RevealSection className="results" id="results">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="reviews-image-container">
          <Image
            src="/images/google-reviews.png"
            alt="Google Reviews - Average Rating 4.7/5 with 205 reviews"
            width={1044}
            height={748}
            quality={90}
            priority
          />
        </div>

        <div className="results-grid">
          {cards.map((card) => (
            <div key={card.title} className="result-card">
              <div className="result-metric">
                {card.metric}
                {card.sup && <sup>{card.sup}</sup>}
              </div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <div className="result-meta">
                <span>{card.meta.left}</span>
                <span>{card.meta.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
