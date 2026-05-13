import RevealSection from "@/components/ui/RevealSection";

export interface PricePlan {
  name: string;
  tagline: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
}

export interface PricingProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  plans?: PricePlan[];
}

const defaultPlans: PricePlan[] = [
  {
    name: "Single Facility",
    tagline: "For one location operators",
    price: "$1,450",
    period: "per month",
    features: [
      "Complete technical SEO audit",
      "Google Business Profile optimization",
      "One primary location landing page",
      "Monthly content (two pieces)",
      "Review automation setup",
      "Monthly reporting call",
    ],
    ctaLabel: "Start with single",
  },
  {
    name: "Growth Portfolio",
    tagline: "For two to five facility operators",
    price: "$2,950",
    period: "per month",
    features: [
      "Everything in Single Facility",
      "Location page per facility",
      "Unit size and type sub-pages",
      "Monthly content (four pieces)",
      "Local citation building",
      "Dedicated SEO lead",
      "Quarterly strategy review",
    ],
    ctaLabel: "Start with growth",
    featured: true,
    badge: "Most Common",
  },
  {
    name: "Regional Scale",
    tagline: "For six plus facility operators",
    price: "$5,200",
    period: "per month",
    features: [
      "Everything in Growth Portfolio",
      "Custom content calendar",
      "Competitor gap analysis quarterly",
      "Link earning campaigns",
      "Dedicated project manager",
      "Weekly reporting access",
      "Priority response SLA",
    ],
    ctaLabel: "Talk to us",
  },
];

export default function Pricing({
  label = "Engagement tiers",
  headline = (
    <>
      Pricing that scales with your <em>facility count</em>.
    </>
  ),
  intro = "Three engagement tiers built for single-site operators, small portfolios, and growing regional operators. Month-to-month after the first ninety days.",
  plans = defaultPlans,
}: PricingProps) {
  return (
    <RevealSection className="pricing" id="pricing">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`price-card${plan.featured ? " featured" : ""}`}>
              {plan.badge && <div className="price-badge">{plan.badge}</div>}
              <h3>{plan.name}</h3>
              <p className="price-tagline">{plan.tagline}</p>
              <div className="price">{plan.price}</div>
              {plan.period && <p className="price-period">{plan.period}</p>}
              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="/contact" className="price-cta">{plan.ctaLabel}</a>
            </div>
          ))}
        </div>

        <p className="pricing-note">Month-to-month after the initial 90-day foundation phase. No long term contracts.</p>
      </div>
    </RevealSection>
  );
}
