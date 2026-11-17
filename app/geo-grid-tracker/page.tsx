import type { Metadata } from "next";
import Link from "next/link";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import GeoGridTool from "@/components/geogrid/GeoGridTool";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Google Maps Geo-Grid Rank Tracker for Self-Storage | SelfStorage.help",
  description:
    "See where your storage facility ranks on Google Maps across 25 points around your location. Enter your business, address and keyword for a free geo-grid scan.",
  alternates: { canonical: "/geo-grid-tracker" },
};

const FAQ = [
  {
    question: "What is a geo-grid rank tracker?",
    answer:
      "A geo-grid rank tracker checks your Google Maps ranking from many points around your facility instead of one. Because Google shows different map results depending on where the renter is standing, a single ranking number can be misleading. A grid shows where you win and where you disappear.",
  },
  {
    question: "Why does my ranking change from point to point?",
    answer:
      "Google weighs proximity heavily for map results. A facility usually ranks best close to its own location and slips as the searcher moves away and other facilities become closer.",
  },
  {
    question: "What do the colors mean?",
    answer:
      "Green means you rank 1 to 3, which is the map pack where most clicks happen. Yellow is rank 4 to 10, red is 11 and below, and grey means your business wasn't found in the top 20 at that point.",
  },
  {
    question: "How is the average rank calculated?",
    answer:
      "The average rank only counts points where your business appeared. Top 3 and top 10 coverage show the share of all 25 points where you ranked in those positions.",
  },
  {
    question: "Why was my business not found?",
    answer:
      "We match your business name against Google Maps listings, so try the name exactly as it appears on your Google Business Profile. A grey point also means you didn't appear in the top 20 results there, which is a real visibility gap.",
  },
  {
    question: "How do I improve my map rankings?",
    answer:
      "Map rankings come from your Google Business Profile, reviews, local citations, website relevance and proximity. Our free audit shows which of these are holding you back.",
  },
];

const STEPS = [
  { n: "1", title: "Enter your details", text: "Add your facility name, address and the keyword renters search, like “self storage”." },
  { n: "2", title: "We scan 25 points", text: "We check Google Maps from a 5 × 5 grid of points spread evenly around your facility." },
  { n: "3", title: "See your coverage", text: "Get a colour-coded map, your top 3 and top 10 coverage, and your average rank." },
];

export default function GeoGridTrackerPage() {
  return (
    <div className="v2-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(FAQ)) }} />
      <V2Interactions />
      <V2Nav variant="home" />

      <section className="gg-hero">
        <div className="gg-wrap">
          <span className="gg-badge">Free tool · No signup</span>
          <h1>Google Maps geo-grid rank tracker for self-storage</h1>
          <p>
            Renters see different map results depending on where they search. Scan 25 points around your facility and
            see exactly where you rank, and where you don&apos;t.
          </p>
          <ul className="gg-hero-points">
            <li>Real Google Maps results</li>
            <li>5 × 5 grid, 25 data points</li>
            <li>Results in about 30 seconds</li>
          </ul>
        </div>
      </section>

      <section className="gg-tool-section" id="tool">
        <div className="gg-wrap">
          <GeoGridTool />
        </div>
      </section>

      <section className="gg-section">
        <div className="gg-wrap">
          <h2 className="gg-h2">How it works</h2>
          <div className="gg-how">
            {STEPS.map((s) => (
              <div className="gg-how-card" key={s.n}>
                <span className="gg-how-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gg-section gg-section-alt">
        <div className="gg-wrap gg-faq-wrap">
          <h2 className="gg-h2">Frequently asked questions</h2>
          <div className="gg-faq">
            {FAQ.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="gg-cta">
        <div className="gg-wrap">
          <h2>Seeing grey and red on your map?</h2>
          <p>We help storage operators win the Google Maps pack and fill more units. Start with a free audit of your facility.</p>
          <Link href="/audit" className="gg-cta-btn">Get my free audit</Link>
        </div>
      </section>

      <V2Footer />
    </div>
  );
}
