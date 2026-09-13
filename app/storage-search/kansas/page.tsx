import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";

export const metadata: Metadata = {
  title: "Find Storage Units In Kansas Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Kansas near your location. Compare 251 facilities and 2,258 available units across Wichita, Overland Park, Olathe, Topeka, Lawrence and Manhattan, with current monthly prices.",
};

// These four names also belong to a bigger namesake city in another state
// page, so they link to a disambiguated slug instead of the plain one.
const CITY_SLUG_OVERRIDES: Record<string, string> = {
  "Kansas City": "kansas-city-ks",
  Manhattan: "manhattan-ks",
  "Spring Hill": "spring-hill-ks",
  "Park City": "park-city-ks",
};

const CITY_LINKS = [
  "Wichita", "Overland Park", "Olathe", "Topeka", "Lawrence", "Manhattan", "Kansas City", "Lenexa", "Shawnee", "Salina", "Leavenworth", "Hutchinson", "Merriam", "Gardner", "Mission", "Derby", "Spring Hill", "Newton", "Andover", "Lansing", "El Dorado", "Park City", "Haysville", "De Soto", "Eudora", "Bonner Springs", "Valley Center", "Maize", "Winfield",
];

const PRICE_ROWS = [
  ["5' x 5'", "$15 to $60", "Boxes, bedding, a bike"],
  ["5' x 10'", "$32 to $85", "A single room, tools, garden equipment"],
  ["10' x 10'", "$59 to $160", "A one bedroom apartment"],
  ["10' x 15'", "$95 to $130", "A two bedroom home with appliances"],
  ["10' x 20'", "$86 to $340", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$364 to $902", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much is a storage unit in Kansas?",
    answer: "A 5x5 typically runs $15 to $60 a month. A 10x10 typically runs $59 to $160. A 10x20 typically runs $86 to $340. The average unit runs around $148 a month in Wichita and Kansas City, and around $205 in Overland Park.",
  },
  {
    question: "How much is a small storage unit in Kansas?",
    answer: "A 5x5 averages around $41 a month in both Wichita and Overland Park, with listings from around $15 in Olathe. A 5x10 typically runs $32 to $85.",
  },
  {
    question: "How much is climate controlled storage in Kansas?",
    answer: "In Wichita, climate controlled units start at around $43 a month for a 5x5 and run to around $504 for a 20x30. In Overland Park they range from around $37 for a 5x5 to around $902 for a 20x30.",
  },
  {
    question: "Where do I find climate control storage units near me?",
    answer: "Filter your search for climate control and set your radius. In Wichita alone, 31 of 63 facilities offer climate controlled units, and availability is strong across Johnson County, Topeka and Lawrence.",
  },
  {
    question: "Do I need climate controlled storage in Kansas?",
    answer: "Humid summers and hard winter freezes make it worthwhile for furniture, electronics, documents, photographs, instruments, mattresses and clothing. Tools, bins, lawn equipment and vehicles are usually fine in a standard drive up unit.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding and a bike. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Where can I find a 24 hour storage unit near me?",
    answer: "Filter your search for 24 hour access. Availability varies by site, and office hours are almost always shorter than gate hours, so confirm both before you reserve.",
  },
  {
    question: "What should I look for in long term storage?",
    answer: "Climate control, autopay, a clear rate increase policy, and a discount for a six or twelve month commitment. Pack for time rather than for the move, using pallets, breathable covers and sealed plastic bins.",
  },
  {
    question: "How do I find cheap storage units in Kansas?",
    answer: "Compare the twelve month cost rather than the first month, compare by neighbourhood rather than by city, check the next suburb out, ask about waived administration fees, ask for military, student and senior rates, and reserve online.",
  },
  {
    question: "Can I store an RV, boat or car in Kansas?",
    answer: "Yes. As a benchmark, vehicle storage in Wichita averages around $144 a month, RV storage around $112 and boat storage around $190. Confirm the maximum permitted length and whether registration and insurance are required.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Kansas facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, since stored goods are often already covered, then confirm what the facility accepts before buying a separate plan.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across Kansas prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odour. Drain fuel from mowers, blowers and generators before storing them.",
  },
];

export default function KansasStoragePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="state-storage-hero">
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>Kansas</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in Kansas near you.</em></h1>
          <p>Enter your city or ZIP code and see every storage unit available within driving distance of you. Kansas has 251 storage facilities holding 2,258 available units right now, from the Wichita metro across to Johnson County and out through Topeka, Lawrence, Manhattan and Salina. Compare monthly rates, unit sizes, access hours and features before you leave the house.</p>
          <Link className="state-storage-cta" href="/storage-search?location=Kansas">Search Kansas storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="ks-cities-heading">
        <div className="state-storage-heading"><h2 id="ks-cities-heading">Storage units near you in Kansas by city</h2><p>Kansas rates vary sharply between metros, and again between neighbourhoods inside them. The average unit in Overland Park runs around $205 a month against around $148 in Wichita, so where you search matters as much as what you rent. Start with your city and narrow by radius.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.map((city) => <Link href={`/storage-search/${CITY_SLUG_OVERRIDES[city] ?? city.toLowerCase().replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">Do not see your town? Search by ZIP code and set your radius to five, ten, or twenty five miles.</p>
      </section>

      <section className="utah-pricing-section" aria-labelledby="ks-storage-heading">
        <div className="utah-pricing-heading"><h2 id="ks-storage-heading">How much are storage units in Kansas per month?</h2><p className="utah-pricing-intro">Kansas carries one of the widest metro gaps in the Midwest. The average unit runs around $148 a month in Wichita and Kansas City, and around $205 in Overland Park. Rural and smaller markets sit well below both. Within a city the spread is just as wide: in Wichita, the McAdams neighbourhood carries the lowest average rent in the city at around $77 a month, well below the citywide figure.</p><p className="utah-pricing-caption">Typical monthly ranges by size across Kansas:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors">
          <p>In Wichita, a 5x5 averages around $41 a month and a 20x30 averages around $504. In Overland Park, a 5x5 averages around $41 and a 10x30 averages around $364, with small units starting at around $20, medium from around $71 and large from around $174.</p>
          <h3>Five things move your price:</h3>
          <ul>
            <li>Metro and suburb. Johnson County prices above Wichita, and both price above Hutchinson, Salina and Newton for the same square footage.</li>
            <li>Climate control. Kansas runs humid summers and hard winters, so temperature controlled units carry a premium in most markets.</li>
            <li>Drive up access. Convenience costs more and saves you time on every visit.</li>
            <li>Move in offers. First month free and discounted first three month promotions run across the state.</li>
            <li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=Kansas%20storage%20prices">Compare prices near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ks-needs-heading">
        <div className="state-storage-heading"><h2 id="ks-needs-heading">Find storage in Kansas by what you need it for.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid utah-needs-grid-4up">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for Kansas families</h3><p>Most homes here fill the garage and basement before they run out of things to keep. Storage takes the overflow: lawn equipment and patio furniture through winter, holiday decorations, hunting and fishing gear, sports equipment, tools, and furniture you are holding between houses.</p><ul><li>Clearing the garage: a 5x10 holds seasonal items, tools and sports gear.</li><li>Between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.</li><li>Storm season: many families move documents, photographs and irreplaceable items into a secure unit ahead of severe weather.</li><li>Look for drive-up access, ground floor units, cleared drives through winter, and gate hours that suit a weekend load.</li></ul><Link href="/storage-search?location=Kansas%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/military%20storage.jpg" alt="Military family with a service member packing a storage unit during a move" width={1536} height={1024} /></div><h3>Storage for military households</h3><p>Fort Riley, Fort Leavenworth and McConnell Air Force Base bring households through Kansas on orders that rarely line up with lease dates. Storage covers the gap between a move out and a move in, or holds household goods through a deployment.</p><ul><li>Full household during a posting: a 10x20 holds a three bedroom home.</li><li>Partial storage: a 10x10 covers furniture you will not need at the next duty station.</li><li>Vehicles: enclosed or covered parking keeps a car protected while you are away.</li><li>Look for military rates, month-to-month terms with no penalty for an early move-out, autopay so billing runs while you are away, and climate control for anything staying more than a season.</li></ul><Link href="/storage-search?location=Kansas%20military%20storage">Find storage near your base →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging and returns. Agricultural and field service operators store equipment between seasons. Practices and firms archive files.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with drive-up access and room to load a van.</li><li>Tools and equipment: a drive-up unit you can back into directly, with 24 hour gate access for early starts.</li><li>Records, samples and electronics: a climate-controlled 5x10 protects paper and hardware through the summer.</li><li>Look for month-to-month terms, online payment and invoicing, and autopay.</li></ul><Link href="/storage-search?location=Kansas%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>Campuses in Lawrence, Manhattan, Wichita, Topeka, Emporia and Pittsburg empty every summer, and moving a full room home twice a year rarely makes sense. A small unit over the break usually costs less than replacing your furniture in August.</p><ul><li>Dorm or shared apartment: a 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Look for student rates, a facility close to campus, climate control for anything that would not survive a Kansas summer in a metal unit, and month-to-month terms so you stop paying the week you return.</li></ul><Link href="/storage-search?location=Kansas%20student%20storage">Find student storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="ks-climate-heading">
        <div className="state-storage-heading"><h2 id="ks-climate-heading">Do you need climate controlled storage in Kansas?</h2><p>Kansas puts stored belongings through a full annual cycle: humid summers with sustained high heat, hard winter freezes, and sharp swings between them in spring and autumn. Humidity is the part people underestimate, since it causes mould, mildew and rust long before the cold does any damage. Availability and pricing are strong across the state. In Wichita, 31 of the 63 facilities offer climate controlled units, priced from around $43 a month for a 5x5. In Overland Park, climate controlled units range from around $37 for a 5x5 to around $902 for a 20x30.</p></div>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture, which warps in humidity and cracks in dry winter cold</li>
              <li>Mattresses, upholstery, bedding and clothing</li>
              <li>Electronics, appliances and anything containing a battery</li>
              <li>Photographs, artwork, vinyl records, books and paper documents</li>
              <li>Musical instruments</li>
              <li>Anything metal that would rust</li>
            </ul>
          </article>
          <article className="utah-climate-card utah-climate-no">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M7 21v-6h10v6" /></svg>
              Standard drive-up units
            </h3>
            <div className="utah-climate-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in an open drive-up storage unit" width={1290} height={860} /></div>
            <p>A standard drive up unit works well for tools, plastic bins, lawn and garden equipment, patio furniture and vehicles. Whichever you choose, lift boxes off the floor on pallets or shelving, use breathable covers rather than sealed plastic, and leave a gap at the walls so air can move.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ks-vehicle-heading">
        <div className="state-storage-heading"><h2 id="ks-vehicle-heading">RV, boat, and vehicle storage in Kansas.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Most Kansas subdivisions restrict keeping trailers, boats and RVs at home, and winter takes them off the water for half the year. Your options:</p>
            <ul>
              <li>Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs.</li>
              <li>Covered parking. Shade from sustained summer sun and cover from hail and ice.</li>
              <li>Enclosed drive-up units. Full protection for classic cars, motorcycles and smaller boats.</li>
            </ul>
            <p>As a benchmark, vehicle storage in Wichita averages around $144 a month, RV storage around $112 and boat storage around $190, across 26, 19 and 15 facilities respectively. Johnson County rates run higher. Filter for parking availability, gate hours, and vehicle length. Spaces commonly run from 20 to 45 feet, so confirm the maximum length before you reserve, and check whether current registration and insurance are required.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Kansas%20vehicle%20storage">Find vehicle storage near you in Kansas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="ks-size-guide-heading">
        <div className="state-storage-heading"><h2 id="ks-size-guide-heading">Choose a unit size with confidence.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <CardSlider trackClassName="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
      </section>

      <section className="utah-policy-section" aria-label="Kansas storage rates, access, and rental terms">
        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="ks-deals-heading">Cheap storage units and first month free deals in Kansas.</h2>
            <p>The spread between Kansas facilities is wide enough that comparing properly is worth the twenty minutes. How to find the lowest real cost:</p>
            <p className="utah-policy-callout">Compare the twelve month cost, not the first month. A free first month on a higher ongoing rate often loses to a lower rate with no promotion. Check the next suburb out and compare by neighbourhood, not just by city: in Wichita the cheapest neighbourhood averages around $77 a month against a citywide $148.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Kansas%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li><strong>First month free.</strong> Widely offered on new rentals across the state.</li>
              <li><strong>Discounted first three months.</strong> Common at independently run facilities.</li>
              <li><strong>Student, military and senior rates.</strong> Ask directly, since these are often unadvertised.</li>
              <li><strong>Administration fees and deposits.</strong> Both change your day one cost and both are often waived.</li>
              <li><strong>Reserve online.</strong> Web rates usually sit below the price quoted at the counter.</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="ks-access-heading">24 hour access and security at Kansas storage facilities.</h2>
            <p>Access hours vary by site, and office hours are almost always shorter than gate hours.</p>
            <p className="utah-policy-lead">Check before you rent:</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Kansas%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Gate hours and office hours, which usually differ, listed in Central Time</li>
              <li>Whether 24 hour gate access is available at that site</li>
              <li>Weekend and public holiday hours</li>
              <li>Whether the site is staffed, self service or kiosk operated</li>
              <li>Perimeter fencing, gated entry, camera coverage and lighting</li>
              <li>Individual unit alarms and whether the facility supplies the lock or requires a specific type</li>
              <li>How the drive is cleared after snow and ice</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="ks-terms-heading">Month to month and short term storage in Kansas.</h2>
            <p>Most Kansas storage units rent month to month, which suits a move, a renovation, a semester away, a deployment or a season between homes.</p>
            <p className="utah-policy-lead">Before you sign:</p>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Confirm the minimum rental period. Most facilities rent by the month rather than the week.</li>
              <li>Confirm the notice period required before you move out</li>
              <li>Ask whether you can transfer to a larger or smaller unit mid rental</li>
              <li>Ask how rent increases are applied and how much notice you receive</li>
              <li>Set up autopay if you will be away for part of the year</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="ks-longterm-heading">Long term storage in Kansas.</h2>
            <p>Some things go into storage for a season. Others go in for years: a deployment, a posting abroad, an estate you are working through, inventory you are holding, or a house you are between. Long term storage asks different questions of a facility than short term storage does.</p>
            <p className="utah-policy-lead">What to prioritise when the unit will sit for a year or more:</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Kansas%20long%20term%20storage">Find long term storage near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Climate control, without exception. A unit that goes through two or three Kansas summers unconditioned will show it.</li>
              <li>Autopay and online account access. Missed payments are the single most common problem in long term rentals.</li>
              <li>Rate increase policy. Ask how often rates rise, by how much, and how much notice you receive.</li>
              <li>Longer term discounts. Many operators reduce the monthly rate for a six or twelve month commitment.</li>
              <li>Pest control and maintenance. Ask how often the facility treats and inspects.</li>
              <li>Pack for time, not for the move. Pallets under everything, breathable covers, sealed plastic bins rather than cardboard, and a written inventory with photographs.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ks-choose-heading">
        <div className="state-storage-heading"><h2 id="ks-choose-heading">How to choose a self storage unit in Kansas.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A sectional sofa, a chest freezer or a mower decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Decide on climate control. Humidity, not cold, is what damages most stored goods here.</p></article>
          <article><span>3</span><p>Compare by neighbourhood. Within a metro this is usually the biggest saving available.</p></article>
          <article><span>4</span><p>Check access hours against your routine. Gate hours and office hours are rarely the same.</p></article>
          <article><span>5</span><p>Check winter access. Ask how the drive and the doors are cleared after snow and ice.</p></article>
          <article><span>6</span><p>Ask about severe weather. Construction, roof type and drainage matter in this state.</p></article>
          <article><span>7</span><p>Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.</p></article>
          <article><span>8</span><p>Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.</p></article>
          <article><span>9</span><p>Set up autopay and online access. It removes the most common cause of an unexpected fee.</p></article>
          <article><span>10</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
        </div>
        <Link className="state-storage-guide-button" href="/storage-search?location=Kansas">Find a facility and reserve online <span aria-hidden="true">→</span></Link>
      </section>

      <section className="state-storage-faq" aria-labelledby="ks-faq-heading">
        <div className="state-storage-heading"><h2 id="ks-faq-heading">Kansas storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="ks-closing-heading">
        <div><h2 id="ks-closing-heading">Find storage units in Kansas near your location today.</h2><p>Search 251 facilities and 2,258 available units across Kansas, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=Kansas">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Kansas</span></nav>
    </main>
  );
}
