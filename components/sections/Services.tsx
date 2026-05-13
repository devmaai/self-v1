import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  href?: string;
}

export interface ServicesProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  items?: ServiceItem[];
}

const defaultItems: ServiceItem[] = [
  {
    num: "01",
    title: "Local SEO & Map Pack",
    desc: "We optimize your Google Business Profile, build local citations, and structure your site so you show up in the three-pack when someone searches for storage in your area.",
    tags: ["GBP", "Citations", "NAP"],
    href: "/services/local-seo-gbp-optimization",
  },
  {
    num: "02",
    title: "Location Landing Pages",
    desc: "Dedicated pages for every city, neighborhood, and unit type you serve. Rich with local context, schema markup, and copy written to convert searchers into tenants.",
    tags: ["Schema", "CRO", "Geo pages"],
    href: "/services/content-keyword-strategy",
  },
  {
    num: "03",
    title: "Technical SEO & Site Speed",
    desc: "Core web vitals, crawls, mobile performance and everything else needed to ensure your storage business ranks in top 3 of the google maps under 3 mile radius.",
    tags: ["CWV", "Audit", "Speed"],
    href: "/services/technical-seo",
  },
  // {
  //   num: "04",
  //   title: "Review & Reputation Strategy",
  //   desc: "Automated review requests, response templates, and escalation flows. Volume and recency of reviews are among the top local ranking signals.",
  //   tags: ["Reviews", "Reputation"],
  //   href: "/services/local-seo-gbp-optimization",
  // },
  {
    num: "04",
    title: "Content That Captures Intent",
    desc: "Whether you are a single business owner or run multiple storage units, we create content tailored to your business to ensure you attract the right lead for your storage solution.",
    tags: ["Blog", "Guides", "Intent"],
    href: "/services/content-keyword-strategy",
  },
  {
    num: "05",
    title: "Reporting You Can Actually Read",
    desc: "Monthly plain-English reports showing rankings, traffic, calls, form fills, and booked move-ins. No dashboard access required. We explain what moved and why.",
    tags: ["GA4", "Monthly"],
    href: "/contact",
  },
];

export default function Services({
  label = "What we do",
  headline = (
    <>
      Built specifically for <em>self-storage operators</em>. Nothing generic.
    </>
  ),
  intro = "We only work with storage facilities. That means every strategy, every landing page, and every optimization is informed by real patterns we have seen across dozens of storage business operators, from single facilities to regional portfolios. ",
  items = defaultItems,
}: ServicesProps) {
  return (
    <RevealSection className="services" id="services">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="services-list">
          {items.map((item) => {
            const inner = (
              <>
                <div className="service-num">{item.num}</div>
                <div><h3>{item.title}</h3></div>
                <div><p>{item.desc}</p></div>
                <div className="service-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="service-tag">{tag}</span>
                  ))}
                </div>
              </>
            );
            return item.href ? (
              <Link key={item.num} href={item.href} className="service-row">
                {inner}
              </Link>
            ) : (
              <div key={item.num} className="service-row">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
