import type { Metadata } from "next";
import Image from "next/image";
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

const WHY = [
  {
    title: "Distance changes the results",
    text: "Google ranks map listings by how close the renter is. The facility that wins at your front gate can vanish two miles away.",
    img: "/images/geogrid/phone-map-navigation.jpg",
    alt: "Hand holding a phone showing a map route on a country road",
    pos: "50% 62%",
  },
  {
    title: "Find your blind spots",
    text: "Grey and red points show neighbourhoods where renters search for storage and never see you.",
    img: "/images/geogrid/green-storage-units.jpg",
    alt: "Row of drive-up self-storage units with green roll-up doors",
    pos: "50% 50%",
  },
  {
    title: "Know where to focus",
    text: "See which side of your trade area is weakest, so you can target reviews, citations and content where they move the map.",
    img: "/images/geogrid/yellow-indoor-units.jpg",
    alt: "Numbered indoor self-storage units with yellow doors",
    pos: "50% 45%",
  },
];

export default function GeoGridTrackerPage() {
  return (
    <div className="v2-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(FAQ)) }} />
      <V2Interactions />
      <V2Nav variant="home" />

      <section className="gg-hero">
        <Image
          src="/images/geogrid/hero-orange-storage-units.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="gg-hero-photo"
        />
        <div className="gg-hero-shade" aria-hidden="true" />
        <div className="gg-wrap gg-hero-grid">
          <div className="gg-hero-copy">
            <span className="gg-badge">Free tool · No signup</span>
            <h1>
              See where renters <em>can&apos;t find you</em> on Google Maps
            </h1>
            <p>
              Your ranking changes with every block. Scan 25 points around your storage facility and see exactly where
              you win the map pack, and where competitors take your move-ins.
            </p>
            <div className="gg-hero-actions">
              <a href="#tool" className="gg-hero-btn">Run my free scan</a>
              <span className="gg-hero-note">Results in about 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gg-tool-section" id="tool">
        <div className="gg-wrap">
          <GeoGridTool />
        </div>
      </section>

      {/* <section className="gg-section">
        <div className="gg-wrap">
          <span className="gg-eyebrow">Why a geo-grid</span>
          <h2 className="gg-h2">One ranking number hides most of the picture</h2>
          <div className="gg-why">
            {WHY.map((w) => (
              <div className="gg-why-card" key={w.title}>
                <div className="gg-why-photo">
                  <Image src={w.img} alt={w.alt} fill sizes="(max-width: 960px) 100vw, 380px" quality={90} style={{ objectPosition: w.pos }} />
                </div>
                <div className="gg-why-body">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="gg-cta">
        <div className="gg-wrap">
          <h2>Seeing grey and red on your map?</h2>
          <p>We help storage operators win the Google Maps pack and fill more units. Start with a free audit of your facility.</p>
          <div className="gg-cta-actions">
            <Link href="/audit" className="gg-cta-btn">Get my free audit</Link>
            <a href="#tool" className="gg-cta-link">Run another scan</a>
          </div>
        </div>
      </section>

      <section className="gg-section gg-section-alt">
        <div className="gg-wrap gg-faq-wrap">
          <span className="gg-eyebrow">FAQ</span>
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

      

      <V2Footer />
    </div>
  );
}
