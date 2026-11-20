import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { isCityPublished } from "@/lib/cityStates";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import StateZipSearch from "@/components/sections/StateZipSearch";
import StateCityScroller from "@/components/sections/StateCityScroller";
import StateFormBlock from "@/components/sections/StateFormBlock";
import V2StorageForm from "@/components/v2/V2StorageForm";
import CardSlider from "@/components/ui/CardSlider";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Storage Units In Washington Near You | Seattle, Tacoma, Spokane And Bellevue Prices",
  description: "Find self storage units in Washington near your location. Compare climate controlled storage, RV and boat storage, current monthly prices, sizes, and availability across Seattle, Tacoma, Spokane, Bellevue and Vancouver, WA.",
};

const CITY_LINKS = [
  "Seattle", "Bellevue", "Tacoma", "Spokane", "Vancouver",
];

const PRICE_ROWS = [
  ["5' x 5'", "$16 to $89", "Boxes, bedding, seasonal gear"],
  ["5' x 10'", "$23 to $132", "A single room, bikes, tools"],
  ["10' x 10'", "$44 to $194", "A one bedroom apartment"],
  ["10' x 15'", "$47 to $145", "A two bedroom home with appliances"],
  ["10' x 20'", "$66 to $180", "A three bedroom home or a vehicle"],
];

const FAQS = [
  {
    question: "How much are storage units near me in Washington?",
    answer: "Small units start from about $16 a month. A standard 10x10 commonly lists between $44 and $194, depending on the city, the facility and features such as climate control.",
  },
  {
    question: "How much is a small storage unit per month?",
    answer: "A 5x5 in Washington typically runs $16 to $89, while a 5x10 typically runs $23 to $132 depending on city, access, and features.",
  },
  {
    question: "How much does a storage unit cost in Seattle, Bellevue, Tacoma, Spokane and Vancouver, WA?",
    answer: "In current listings a 10x10 averages around $106 a month in Seattle, $114 in Bellevue, $111 in Tacoma, $84 in Spokane and $88 in Vancouver, WA, while a 5x5 averages around $42, $46, $47, $48 and $38 respectively. Rates vary by facility, so enter your ZIP code, set a search radius and compare units by size, monthly rate, access hours and features.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes and seasonal gear, a 5x10 holds a single room, a 10x10 holds a one bedroom apartment, and a 10x20 holds a three bedroom home or vehicle.",
  },
  {
    question: "Do I need climate controlled storage in Washington?",
    answer: "Western Washington stays rainy from fall through spring, and damp air is what damages wood furniture, electronics, documents, photographs, and instruments. Spokane is drier but sees wider temperature swings between summer heat and winter cold, which also affects sensitive items. Choose climate controlled storage for anything staying more than a season. Tools, bins, patio furniture, and vehicles are usually fine in a standard drive-up unit.",
  },
  {
    question: "Which Washington facilities offer 24 hour access?",
    answer: "Availability varies by city and site. Filter for 24 hour access and check the listed gate hours, shown in Pacific Time, before you reserve.",
  },
  {
    question: "Can I rent a storage unit month to month?",
    answer: "Most Washington facilities rent month to month. Confirm the notice period before moving out and whether a minimum term applies.",
  },
  {
    question: "Can I use RV storage, boat storage or car storage in Washington?",
    answer: "Yes. Facilities around Seattle, Bellevue, Tacoma, Spokane and Vancouver offer uncovered parking, covered parking, and enclosed units for RVs, boats and cars. Confirm the maximum vehicle length and whether registration and insurance are required.",
  },
  {
    question: "Are there first month free storage deals in Washington?",
    answer: "Many Washington operators run a first month free offer or a discount across the first three months. Student, military, and senior rates may also be available. Ask what the rate becomes after the promotion and compare the twelve-month cost.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, then ask what the facility accepts.",
  },
  {
    question: "Is there storage near Joint Base Lewis-McChord?",
    answer: "Yes. Facilities in Tacoma and the surrounding area serve households stationed at Joint Base Lewis-McChord. Ask about military rates, month to month terms with no penalty for an early move out, and whether you can pause or transfer a unit when orders change.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities prohibit perishable food, plants, live animals, flammable or hazardous materials, fuel, fireworks, and anything that generates odor. Drain fuel from mowers and generators before storing them.",
  },
];

export default function WashingtonStoragePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Storage by state", path: "/storage-state-usa" },
    { name: "Washington", path: "/storage-search/washington" },
  ]);

  const cityCards = CITY_LINKS.map((city) => ({ name: city, slug: city.toLowerCase().replace(/\./g, "").replace(/ /g, "-") }))
    .filter((city) => isCityPublished(city.slug))
    .map((city) => ({ ...city, href: `/storage-search/washington/${city.slug}` }));
  const formCities = cityCards.map((city) => city.name);

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="state-storage-hero hero-photo" style={{ "--hero-image": "url('https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=1800&q=70')" } as React.CSSProperties}>
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-state-usa">Storage by state</Link><span>/</span>Washington</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in Washington near you.</em></h1>
          <p>Compare self storage facilities across Washington, including Seattle, Bellevue, Tacoma, Spokane and Vancouver, with current prices, sizes, and amenities near your location.</p>
          <StateZipSearch id="wa-hero-zip" />
        </div>
      </section>

      <section className="state-storage-cities state-cities-centered" aria-labelledby="wa-cities-heading">
        <div className="state-storage-heading"><h2 id="wa-cities-heading">Find cheap storage units in your favorite Washington cities</h2><p>Availability changes quickly across Seattle, Bellevue, Tacoma, the I-5 corridor up to Vancouver, and Spokane in the Inland Northwest, so the closest self storage facility is often the one holding the rate you want. Start with your city and narrow by radius.</p></div>
        <StateCityScroller cities={cityCards} />
      </section>

      <StateFormBlock id="wa-form-top" state="Washington" cities={formCities} heading="Get A Free Storage Quote" subtext="No obligation quote" body="We check storage facilities near you and find the options that fit, so you don't have to contact multiple companies. You choose the option you like, and there are no extra charges." />

      <section className="utah-pricing-section" aria-labelledby="wa-storage-heading">
        <div className="utah-pricing-heading"><h2 id="wa-storage-heading">How much will a storage unit cost you in Washington each month?</h2><p className="utah-pricing-intro">Small units in Washington start from about $16 a month. A standard 10x10 unit commonly lists between $44 and $194 a month, depending on the city and the features. In current listings a 10x10 averages around $106 in Seattle, $114 in Bellevue and $111 in Tacoma, with Spokane at around $84 and Vancouver, WA at around $88, so compare a few facilities in your area before you reserve.</p><p className="utah-pricing-caption">Typical monthly ranges by size in Washington:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-unit-size-calculator">Calculate your unit size <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="utah-content-section" aria-labelledby="wa-needs-heading">
        <div className="state-storage-heading"><h2 id="wa-needs-heading">Pick Washington storage near you that fits your need.</h2></div>
        <div className="state-needs-rows">
          <article>
            <div className="state-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div>
            <div className="state-needs-text">
              <h3>Storage for Washington families</h3>
              <p>Homes here fill with the things that do not fit inside. Bikes, camping gear, kayaks, ski and snow gear and holiday decorations take over the garage, while a move or a renovation sends the rest of the house into storage. Families across Seattle, Bellevue, Tacoma, Spokane and Vancouver often rent while they build, sell or move.</p>
              <ul><li>A 5x10 lets you swap winter and summer equipment without stacking to the ceiling.</li><li>A 10x15 holds a two bedroom home with appliances, while a 10x20 holds a three bedroom home.</li><li>Look for drive-up access and gate hours that suit early starts and late commutes.</li></ul>
              <Link className="state-storage-guide-button" href="/find-storage">Find family storage in Washington <span aria-hidden="true">→</span></Link>
            </div>
          </article>
          <article>
            <div className="state-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div>
            <div className="state-needs-text">
              <h3>Storage for professionals and small businesses</h3>
              <p>You need square footage without signing a commercial lease. Contractors and trades store tools, materials and site equipment between jobs. Online sellers hold inventory and packaging close to home, agents store staging furniture, and consultants and clinics archive files.</p>
              <ul><li>A 10x10 or 10x15 with ground-floor loading works for inventory and stock.</li><li>A drive-up unit lets you back a truck or van into the space.</li><li>A climate-controlled 5x10 protects paper and hardware through the wet months.</li></ul>
              <Link className="state-storage-guide-button" href="/business-storage">Explore business storage <span aria-hidden="true">→</span></Link>
            </div>
          </article>
          <article>
            <div className="state-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div>
            <div className="state-needs-text">
              <h3>Storage for students</h3>
              <p>Campuses across the Seattle area and in Tacoma, Spokane and Vancouver empty every summer. Students at the University of Washington, Bellevue College, Seattle University, the University of Puget Sound, Gonzaga University, Washington State University Spokane and Washington State University Vancouver often need space between spring quarter and autumn move-in.</p>
              <ul><li>A 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>A 10x10 can cover two rooms when split with a roommate.</li><li>Look for student rates near Seattle, Bellevue, Tacoma, Spokane or Vancouver, plus month-to-month terms.</li></ul>
              <Link className="state-storage-guide-button" href="/student-storage">Explore student storage <span aria-hidden="true">→</span></Link>
            </div>
          </article>
          <article>
            <div className="state-needs-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in a drive-up storage unit" width={1290} height={860} /></div>
            <div className="state-needs-text">
              <h3>Storage for vehicles</h3>
              <p>Many Seattle, Bellevue, Tacoma, Spokane and Vancouver neighborhoods and HOAs restrict driveway and street parking, and trips to the Cascades and the coast mean rooftop tents, recovery gear and bikes that need a home between weekends. Car storage also suits collector and second cars that need a dry, secure space through the wet months.</p>
              <ul><li>Choose uncovered parking, covered parking or an enclosed drive-up unit.</li><li>Check the maximum vehicle length and gate hours before you reserve.</li><li>Ask whether current registration and insurance are required.</li></ul>
              <Link className="state-storage-guide-button" href="/car-storage">Explore car and vehicle storage <span aria-hidden="true">→</span></Link>
            </div>
          </article>
          <article>
            <div className="state-needs-image"><Image src="/images/climate-storage/indoor-corridor.png" alt="Indoor climate controlled storage corridor" width={1200} height={800} /></div>
            <div className="state-needs-text">
              <h3>Climate controlled storage</h3>
              <p>Western Washington stays damp for much of the year, and Spokane swings between hot summers and cold winters, so climate controlled storage in Seattle, Bellevue, Tacoma, Spokane and Vancouver is worth pricing before you book. Wood and leather furniture, electronics, photographs, instruments and documents last longer in a unit that holds a steady temperature and humidity.</p>
              <ul><li>Choose climate control for anything staying more than a season.</li><li>Lift boxes off the floor on pallets or shelving.</li><li>Leave a gap between your belongings and the walls.</li></ul>
              <Link className="state-storage-guide-button" href="/climate-controlled-storage">Explore climate controlled storage <span aria-hidden="true">→</span></Link>
            </div>
          </article>
          <article>
            <div className="state-needs-image"><Image src="https://images.unsplash.com/photo-1681708416679-95c730e1ff70?auto=format&fit=crop&w=1536&q=75" alt="Sailboat on Puget Sound at sunset with the Olympic Mountains behind" width={1536} height={1024} /></div>
            <div className="state-needs-text">
              <h3>Storage for boats and RVs</h3>
              <p>Boat storage matters across the Puget Sound region, where sailboats, powerboats, kayaks and paddleboards from Puget Sound, Lake Washington and the Columbia River need outdoor parking or an enclosed space once the season ends. RV storage in Washington suits trailer and camper owners who store between trips to the coast, the Cascades and the national parks.</p>
              <ul><li>Spaces range from 20 to 45 feet, so confirm the maximum length.</li><li>Covered parking protects paint and seals from rain and sun.</li><li>Ask about wide drive aisles and easy trailer access.</li></ul>
              <div className="state-needs-links"><Link className="state-storage-guide-button" href="/rv-storage">Explore RV storage <span aria-hidden="true">→</span></Link><Link className="state-storage-guide-button" href="/boat-storage">Explore boat storage <span aria-hidden="true">→</span></Link></div>
            </div>
          </article>
        </div>
      </section>

      <StateFormBlock id="wa-form-mid" state="Washington" cities={formCities} heading="Still looking? Find storage near you" />

      <section className="state-storage-guide" aria-labelledby="wa-size-guide-heading">
        <div className="state-storage-heading"><h2 id="wa-size-guide-heading">Find the right unit size for your Washington move.</h2></div>
        <CardSlider trackClassName="state-size-grid">
          <article><div className="state-size-image"><Image src="/images/storage-guide/boxes.jpg" alt="Boxes and small items packed for a small storage unit" width={640} height={420} quality={90} /></div><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/threebedroom.jpg" alt="Furniture from a few rooms ready for a medium storage unit" width={640} height={420} quality={90} /></div><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/fourbedroom.jpg" alt="Contents of a full home ready for a large storage unit" width={640} height={420} quality={90} /></div><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="utah-content-section" aria-labelledby="wa-choose-heading">
        <div className="state-storage-heading"><h2 id="wa-choose-heading">Your checklist for picking a Washington storage unit.</h2></div>
        <div className="state-checklist-split">
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A sectional sofa or chest freezer decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Decide on climate control based on what you are storing and how long it stays.</p></article>
          <article><span>3</span><p>Set your radius. Weigh the saving against the drive you will actually make each month.</p></article>
          <article><span>4</span><p>Check access hours against your routine. Early starts and late finishes rule out some facilities.</p></article>
          <article><span>5</span><p>Compare the ongoing rate, and ask what month two onward costs.</p></article>
          <article><span>6</span><p>Confirm insurance. Check your renters or homeowners policy first.</p></article>
          <article><span>7</span><p>Ask about the lock. Many operators specify a type.</p></article>
          <article><span>8</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
          <article><span>9</span><p>Visit if you can. Look at lighting, drainage, and the condition of neighboring units, since wet weather makes drainage worth checking.</p></article>
        </div>
        <div className="state-checklist-form"><h3>Ready? Find storage near you</h3><V2StorageForm state="Washington" cities={formCities} compact idPrefix="wa-form-checklist" /></div>
        </div>
      </section>

      <section className="state-storage-guide state-love state-reasons" aria-labelledby="wa-love-heading">
        <div className="state-storage-heading"><h2 id="wa-love-heading">Reasons to move to Washington.</h2><p>And why so many people moving to Seattle, Bellevue, Tacoma, Spokane and Vancouver rent a storage unit along the way.</p></div>
        <div className="state-reasons-split">
          <div className="state-reasons-image"><Image src="https://images.unsplash.com/photo-1600314427922-2a7243b8e715?auto=format&fit=crop&w=1200&q=75" alt="Mount Rainier above a wildflower meadow in Washington" fill sizes="(max-width: 900px) 100vw, 40vw" unoptimized /></div>
          <div className="state-size-grid"><article><h3>Puget Sound, the Cascades and the Olympics</h3><p>Seattle, Bellevue, Tacoma and Vancouver sit within reach of the Cascades, the Olympic Peninsula and Puget Sound, while Spokane opens up the Inland Northwest and the Spokane River, so weekends mean skiing, hiking, kayaking and boating. All that gear is why so many Washington households rent storage units for bikes, kayaks, skis and camping equipment.</p></article><article><h3>Three national parks</h3><p>Mount Rainier, Olympic and North Cascades national parks draw campers and road trippers all year. If you own an RV, camper or trailer, RV storage in Washington keeps it ready between trips when HOA rules rule out driveway parking.</p></article><article><h3>A major tech, aerospace and shipping economy</h3><p>Amazon, Microsoft, Boeing and the Port of Tacoma keep bringing jobs and new residents to the Seattle and Tacoma area. Many movers need short term storage between a lease ending and a new home being ready.</p></article><article><h3>Military families near Joint Base Lewis-McChord</h3><p>Joint Base Lewis-McChord near Tacoma and Naval Base Kitsap move households through Washington on orders. Military storage near Tacoma covers the gap between postings, deployments and a new lease.</p></article><article><h3>No state income tax and a gateway to Portland</h3><p>Washington has no state income tax on wages, and Vancouver, WA sits across the Columbia River from Portland, so many households relocate here from Oregon. A move across the river often leaves a gap between homes, and a nearby storage unit fills it.</p></article><article><h3>Wet winters call for dry storage</h3><p>Western Washington stays rainy from fall through spring, and damp air damages furniture, electronics, documents and photographs. That is why climate controlled storage in Seattle, Bellevue and Tacoma is worth comparing against a standard unit.</p></article></div>
        </div>
      </section>

      <section className="storage-search-note state-zip-band" aria-labelledby="wa-zip-band-heading">
        <div className="storage-location-search-content">
          <strong id="wa-zip-band-heading">Search storage near you in Washington</strong>
          <span>Enter your ZIP code or city to see storage options close to you.</span>
          <StateZipSearch id="wa-band-zip" />
        </div>
      </section>
      <section className="state-storage-faq" aria-labelledby="wa-faq-heading">
        <div className="state-storage-heading"><h2 id="wa-faq-heading">Your Washington self storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="wa-closing-heading">
        <div><h2 id="wa-closing-heading">Compare Washington storage units near you now.</h2><p>Read our guides on Washington storage prices, unit sizes and what to check before you rent, so you can compare facilities with confidence.</p></div>
        <Link className="state-storage-cta" href="/blog">Read our storage guides <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-state-usa">Storage by state</Link><span>/</span><span aria-current="page">Washington</span></nav>
    </main>
  );
}
