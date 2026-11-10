import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { isCityPublished } from "@/lib/cityStates";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import StateZipSearch from "@/components/sections/StateZipSearch";
import StateCityScroller from "@/components/sections/StateCityScroller";
import StateFormBlock from "@/components/sections/StateFormBlock";
import V2StorageForm from "@/components/v2/V2StorageForm";
import CardSlider from "@/components/ui/CardSlider";
import { breadcrumbListSchema } from "@/lib/schema";

// One layout for every state page, matching the Utah page design.

export type StateNeedRow = {
  image: { src: string; alt: string; width: number; height: number };
  heading: string;
  body: string;
  bullets: string[];
  links: { label: string; href: string }[];
};

export type StatePageData = {
  slug: string;
  name: string;
  /** Short id prefix for element ids, e.g. "ca". */
  key: string;
  heroImage: string;
  heroText: string;
  cities: string[];
  citiesHeading: string;
  citiesIntro: string;
  pricingHeading: string;
  pricingIntro: string;
  priceRows: string[][];
  needsHeading: string;
  needs: StateNeedRow[];
  sizeHeading: string;
  checklistHeading: string;
  checklist: string[];
  reasonsHeading: string;
  reasonsImage: { src: string; alt: string };
  reasons: { heading: string; body: string }[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  closingHeading: string;
};

function citySlug(city: string) {
  return city.toLowerCase().replace(/'/g, "").replace(/\./g, "").replace(/ /g, "-");
}

export default function StatePageTemplate({ data }: { data: StatePageData }) {
  const { key, name, slug } = data;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Storage by state", path: "/storage-state-usa" },
    { name, path: `/storage-search/${slug}` },
  ]);
  const cityCards = data.cities
    .map((city) => ({ name: city, slug: citySlug(city) }))
    .filter((city) => isCityPublished(city.slug))
    .map((city) => ({ ...city, href: `/storage-search/${slug}/${city.slug}` }));
  const formCities = cityCards.map((city) => city.name);

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="state-storage-hero hero-photo" style={{ "--hero-image": `url('${data.heroImage}?auto=format&fit=crop&w=1800&q=70')` } as React.CSSProperties}>
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-state-usa">Storage by state</Link><span>/</span>{name}</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in {name} near you.</em></h1>
          <p>{data.heroText}</p>
          <StateZipSearch id={`${key}-hero-zip`} />
        </div>
      </section>

      <section className="state-storage-cities state-cities-centered" aria-labelledby={`${key}-cities-heading`}>
        <div className="state-storage-heading"><h2 id={`${key}-cities-heading`}>{data.citiesHeading}</h2><p>{data.citiesIntro}</p></div>
        <StateCityScroller cities={cityCards} />
      </section>

      <StateFormBlock id={`${key}-form-top`} state={name} cities={formCities} heading="Get A Free Storage Quote" subtext="No obligation quote" body="We check storage facilities near you and find the options that fit, so you don't have to contact multiple companies. You choose the option you like, and there are no extra charges." />

      <section className="utah-pricing-section" aria-labelledby={`${key}-storage-heading`}>
        <div className="utah-pricing-heading"><h2 id={`${key}-storage-heading`}>{data.pricingHeading}</h2><p className="utah-pricing-intro">{data.pricingIntro}</p><p className="utah-pricing-caption">Typical monthly ranges by size in {name}:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{data.priceRows.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-unit-size-calculator">Calculate your unit size <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="utah-content-section" aria-labelledby={`${key}-needs-heading`}>
        <div className="state-storage-heading"><h2 id={`${key}-needs-heading`}>{data.needsHeading}</h2></div>
        <div className="state-needs-rows">
          {data.needs.map((row) => (
            <article key={row.heading}>
              <div className="state-needs-image"><Image src={row.image.src} alt={row.image.alt} width={row.image.width} height={row.image.height} /></div>
              <div className="state-needs-text">
                <h3>{row.heading}</h3>
                <p>{row.body}</p>
                <ul>{row.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                {row.links.length > 1 ? (
                  <div className="state-needs-links">{row.links.map((link) => <Link key={link.href} className="state-storage-guide-button" href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}</div>
                ) : (
                  row.links.map((link) => <Link key={link.href} className="state-storage-guide-button" href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <StateFormBlock id={`${key}-form-mid`} state={name} cities={formCities} heading="Still looking? Find storage near you" />

      <section className="state-storage-guide" aria-labelledby={`${key}-size-guide-heading`}>
        <div className="state-storage-heading"><h2 id={`${key}-size-guide-heading`}>{data.sizeHeading}</h2></div>
        <CardSlider trackClassName="state-size-grid">
          <article><div className="state-size-image"><Image src="/images/storage-guide/boxes.jpg" alt="Boxes and small items packed for a small storage unit" width={640} height={420} quality={90} /></div><strong>5&apos; x 5&apos; to 5&apos; x 10&apos;</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/threebedroom.jpg" alt="Furniture from a few rooms ready for a medium storage unit" width={640} height={420} quality={90} /></div><strong>10&apos; x 10&apos; to 10&apos; x 15&apos;</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/fourbedroom.jpg" alt="Contents of a full home ready for a large storage unit" width={640} height={420} quality={90} /></div><strong>10&apos; x 20&apos; and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="utah-content-section" aria-labelledby={`${key}-choose-heading`}>
        <div className="state-storage-heading"><h2 id={`${key}-choose-heading`}>{data.checklistHeading}</h2></div>
        <div className="state-checklist-split">
          <div className="utah-steps-grid">
            {data.checklist.map((step, index) => <article key={step}><span>{index + 1}</span><p>{step}</p></article>)}
          </div>
          <div className="state-checklist-form"><h3>Ready? Find storage near you</h3><V2StorageForm state={name} cities={formCities} compact idPrefix={`${key}-form-checklist`} /></div>
        </div>
      </section>

      <section className="state-storage-guide state-love state-reasons" aria-labelledby={`${key}-love-heading`}>
        <div className="state-storage-heading"><h2 id={`${key}-love-heading`}>{data.reasonsHeading}</h2><p>And why so many people who move here need a little extra space.</p></div>
        <div className="state-reasons-split">
          <div className="state-reasons-image"><Image src={`${data.reasonsImage.src}?auto=format&fit=crop&w=1200&q=75`} alt={data.reasonsImage.alt} fill sizes="(max-width: 900px) 100vw, 40vw" unoptimized /></div>
          <div className="state-size-grid">{data.reasons.map((reason) => <article key={reason.heading}><h3>{reason.heading}</h3><p>{reason.body}</p></article>)}</div>
        </div>
      </section>

      <section className="storage-search-note state-zip-band" aria-labelledby={`${key}-zip-band-heading`}>
        <div className="storage-location-search-content">
          <strong id={`${key}-zip-band-heading`}>Search storage near you in {name}</strong>
          <span>Enter your ZIP code or city to see storage options close to you.</span>
          <StateZipSearch id={`${key}-band-zip`} />
        </div>
      </section>
      <section className="state-storage-faq" aria-labelledby={`${key}-faq-heading`}>
        <div className="state-storage-heading"><h2 id={`${key}-faq-heading`}>{data.faqHeading}</h2></div>
        <ShowMoreList listClassName="state-faq-list">{data.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby={`${key}-closing-heading`}>
        <div><h2 id={`${key}-closing-heading`}>{data.closingHeading}</h2><p>Read our guides on {name} storage prices, unit sizes and what to check before you rent, so you can compare facilities with confidence.</p></div>
        <Link className="state-storage-cta" href="/blog">Read our storage guides <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-state-usa">Storage by state</Link><span>/</span><span aria-current="page">{name}</span></nav>
    </main>
  );
}
