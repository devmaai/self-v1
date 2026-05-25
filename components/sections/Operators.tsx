import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

export interface Persona {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href?: string;
}

const homeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </svg>
);
const multiIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18M4 21v-9M10 21v-9M14 21V8M20 21V8M2 12h10M14 8h8" />
  </svg>
);
const regionIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11V3h8M21 11V3h-8M3 13v8h8M21 13v8h-8" />
  </svg>
);
const tiredIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
  </svg>
);

const defaultPersonas: Persona[] = [
  {
    icon: homeIcon,
    title: "Single-facility owners",
    desc: "You wear three hats and need rankings without becoming an SEO yourself.",
    href: "/who-we-serve/independent-facility-owners",
  },
  {
    icon: multiIcon,
    title: "Multi-location operators",
    desc: "Two to ten facilities that need consistent local visibility across markets.",
    href: "/who-we-serve/multi-location-operators",
  },
  {
    icon: regionIcon,
    title: "Regional portfolios",
    desc: "Ten plus locations with growth plans that need scalable SEO infrastructure.",
  },
  {
    icon: tiredIcon,
    title: "Operators tired of agencies",
    desc: "You have paid retainers before with little to show. You want results tied to move-ins.",
  },
];

export default function Operators({ personas = defaultPersonas }: { personas?: Persona[] }) {
  return (
    <RevealSection className="operators">
      <div className="container">
        <div className="operators-grid">
          <div className="operators-left">
            <div className="section-label">Who we serve</div>
            <h2 className="section-title">
              Built for operators who <em>run the business themselves</em>.
            </h2>
            <p>
              From single-facility independents to regional portfolios, every program is tailored
              to the way you actually run things. No bloated retainers, no jargon-heavy reports, no
              campaigns built for someone else.
            </p>
            <Link href="/contact" className="op-cta">
              See which program fits your facility &rarr;
            </Link>
          </div>

          <div className="persona-cards">
            {personas.map((p) => {
              const inner = (
                <>
                  <div className="persona-icon">{p.icon}</div>
                  <div className="persona-body">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                  <span className="persona-arrow">&rarr;</span>
                </>
              );
              return p.href ? (
                <Link key={p.title} href={p.href} className="persona-card">
                  {inner}
                </Link>
              ) : (
                <div key={p.title} className="persona-card">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
