import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";

export const metadata: Metadata = {
  title: "Find Storage Units In California Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in California near your location. Compare 3,098 facilities and 41,949 available units across Los Angeles, San Diego, San Jose, Sacramento and San Francisco, with current monthly prices.",
};

const CITY_LINKS = [
  "Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento", "Fresno", "Long Beach", "Oakland", "Bakersfield", "Anaheim", "Stockton", "Riverside", "Santa Ana", "Irvine", "Chula Vista", "Santa Clarita", "Fremont", "San Bernardino", "Modesto", "Fontana", "Moreno Valley", "Oxnard", "Huntington Beach", "Glendale", "Ontario", "Elk Grove", "Santa Rosa", "Rancho Cucamonga", "Oceanside", "Garden Grove",
];

const PRICE_ROWS = [
  ["5' x 5'", "$50 to $121", "Boxes, bedding, seasonal gear"],
  ["5' x 10'", "$75 to $160", "A single room, bikes, tools"],
  ["10' x 10'", "$138 to $359", "A one bedroom apartment"],
  ["10' x 15'", "$200 to $450", "A two bedroom home with appliances"],
  ["10' x 20'", "$297 to $500", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$506 to $1,500", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much is a storage unit per month in California?",
    answer: "A 5x5 typically runs $50 to $121 a month. A 10x10 typically runs $138 to $359. A 10x20 typically runs $297 to $500. Inland and valley markets sit at the lower end, coastal and urban markets at the higher end.",
  },
  {
    question: "How much does it cost to rent a small storage unit?",
    answer: "A 5x5 averages around $64 a month in Sacramento and around $108 in San Diego, which gives you the range across the state. A 5x10 typically runs $75 to $160.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or allow location access, then set a search radius. You will see every available unit within that radius with size, monthly rate, access hours, and features, so you can compare before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding, and seasonal gear. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in California?",
    answer: "It depends on your region. Coastal humidity and salt air, valley and desert heat, and Sierra freeze cycles all affect stored goods differently. Choose climate control for furniture, electronics, documents, photographs, instruments, and anything staying in the unit beyond a season.",
  },
  {
    question: "Which California facilities offer 24 hour access?",
    answer: "Availability varies by city and by site, and urban multi storey facilities are less likely to offer it than drive up yards. Filter your search for 24 hour access and check the listed gate hours, shown in Pacific Time, before you reserve.",
  },
  {
    question: "What time do storage facilities close?",
    answer: "Gate hours commonly run from six or seven in the morning until nine or ten at night, with shorter hours at staffed offices and on public holidays. Confirm both gate hours and office hours, since they often differ.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most California facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Are there first month free storage deals in California?",
    answer: "Many California operators run a first month free offer or a discount across the first three months, and some offer student, military, and senior rates. Current promotions appear on individual listings.",
  },
  {
    question: "Can I store an RV, boat, or car in California?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking, and enclosed units. Confirm the maximum permitted length and whether registration and insurance are required.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, since stored goods are often already covered, then ask what the facility accepts.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across California prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks, and anything that generates odour. Drain fuel from mowers and generators before storing them.",
  },
];

export default function CaliforniaStoragePage() {
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
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>California</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in California near you.</em></h1>
          <p>Enter your city or ZIP code and see every storage unit available within driving distance of you. California has 3,098 storage facilities holding 41,949 available units right now, from Redding down to Chula Vista and across every coastal, valley, and desert market in between. Compare monthly rates, unit sizes, access hours, and features before you leave the house.</p>
          <Link className="state-storage-cta" href="/storage-search?location=California">Search California storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="ca-cities-heading">
        <div className="state-storage-heading"><h2 id="ca-cities-heading">Storage units near you in California by city</h2><p>Rates in California change by neighbourhood, not just by city. A unit ten minutes inland can cost half what you pay near the coast. Start with your city and narrow by radius from there.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.map((city) => <Link href={`/storage-search/${city.toLowerCase().replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">Do not see your town? Search by ZIP code and set your radius to five, ten, or twenty five miles.</p>
      </section>

      <section className="utah-pricing-section" aria-labelledby="ca-storage-heading">
        <div className="utah-pricing-heading"><h2 id="ca-storage-heading">How much are storage units in California per month?</h2><p className="utah-pricing-intro">California has the widest price spread of any state. Small units start under $20 a month in Oakland, Rancho Cucamonga, Santa Rosa, and Huntington Beach. The same unit can run five times that in San Francisco, coastal Orange County, or Santa Barbara.</p><p className="utah-pricing-caption">Typical monthly ranges by size across California:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors">
          <p>For a sense of the regional gap, a standard 5x5 averages around $64 a month in Sacramento and around $108 in San Diego. Across Orange County, the average unit of any size now sits near $306 a month.</p>
          <h3>Six things move your price:</h3>
          <ul>
            <li>Where you are in the metro. Inland and valley markets price well below coastal and urban core markets for identical square footage.</li>
            <li>Climate control. Temperature and humidity regulated units carry a premium, and in coastal California many facilities offer little else.</li>
            <li>Drive up versus elevator access. Multi storey urban facilities cost more per square foot and take longer to load.</li>
            <li>Move in offers. First month free and discounted first three month promotions run across most California markets.</li>
            <li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person, so reserve before you arrive.</li>
            <li>Term length. Committing to six or twelve months can lower your monthly rate at independently run facilities.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=California%20storage%20prices">Compare prices near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ca-needs-heading">
        <div className="state-storage-heading"><h2 id="ca-needs-heading">Find storage in California by what you need it for.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid utah-needs-grid-4up">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for California families</h3><p>Square footage at home costs more here than almost anywhere in the country, which makes a storage unit the cheaper way to hold what you are not using. Families rent while they remodel, while they wait on a closing date, or simply to clear a garage back into a garage. Add the gear that comes with the state: surfboards and wetsuits, camping kit for the Sierras, skis and boards for Tahoe and Mammoth that sit idle eight months of the year, bikes, coolers, paddleboards, and tailgate equipment.</p><ul><li>Clearing the garage: a 5x10 holds seasonal gear, holiday decorations, and sports equipment.</li><li>Remodelling: a 10x15 holds a two bedroom home with appliances, while a 10x20 holds a three bedroom home.</li><li>Between homes: month to month terms let you hold furniture for as long as the escrow takes.</li><li>Look for ground floor or drive-up access, wide aisles, and gate hours that suit a weekend load out.</li></ul><Link href="/storage-search?location=California%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without a commercial lease at California rates. Contractors store tools and materials between jobs. Online sellers hold inventory, packaging, and returns. Studios and production crews store props, set pieces, and equipment between shoots. Agents store staging furniture, while practices and firms archive files.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with ground-floor access and room to load a van.</li><li>Tools and equipment: a drive-up unit you can back into directly.</li><li>Records, samples, and electronics: a climate-controlled 5x10 protects paper and hardware through valley summers.</li><li>Look for month-to-month terms so you can scale through peak season, online payment and invoicing, and access hours that cover early starts.</li></ul><Link href="/storage-search?location=California%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>California campuses empty on a schedule. If you are at a UC, a Cal State, or a community college, you have a gap between spring quarter and autumn move-in, and hauling a room across the state twice a year rarely makes sense.</p><ul><li>Dorm or shared apartment: a 5x5 takes boxes, bedding, and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Away for a quarter, an internship, or a study abroad term: store your furniture instead of replacing it.</li><li>Look for student rates, facilities within a short drive of campus in Los Angeles, San Diego, Berkeley, Davis, Irvine, Santa Barbara, San Luis Obispo, or Chico, and month-to-month terms so you stop paying the week you return.</li></ul><Link href="/storage-search?location=California%20student%20storage">Find student storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/military%20storage.jpg" alt="Military family with a service member packing a storage unit during a move" width={1536} height={1024} /></div><h3>Military households and frequent movers</h3><p>California hosts major installations in San Diego, Oceanside, Ventura County, Monterey, and the Inland Empire, and orders rarely line up neatly with lease dates. Storage covers the gap between a move-out and a move-in, or holds household goods through a deployment.</p><ul><li>Full household during a posting: a 10x20 holds a three bedroom home.</li><li>Partial storage: a 10x10 covers furniture you will not need at the next duty station.</li><li>Vehicles: covered or enclosed parking keeps a car protected while you are away.</li><li>Look for military rates, month-to-month terms with no penalty for an early move-out, and autopay so billing runs while you are away.</li></ul><Link href="/storage-search?location=California%20military%20storage">Find storage near your base →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="ca-climate-heading">
        <div className="state-storage-heading"><h2 id="ca-climate-heading">Do you need climate controlled storage in California?</h2><p>California is several climates at once, so the answer depends on where your unit sits.</p></div>
        <ul className="utah-climate-regions">
          <li><strong>Coastal markets.</strong> Salt air and year round humidity are the risk. Metal corrodes, fabric holds damp, and paper and leather suffer. Climate control is worth the premium near the water.</li>
          <li><strong>Central Valley and inland markets.</strong> Summer heat is the risk. Interior unit temperatures can climb far above the outside reading, which warps vinyl, melts candles and wax, damages electronics, and dries out wood.</li>
          <li><strong>Desert markets.</strong> Extreme heat combined with very low humidity cracks leather, splits wood, and degrades adhesives.</li>
          <li><strong>Mountain and Sierra markets.</strong> Freeze and thaw cycles affect liquids, batteries, and anything containing moisture.</li>
        </ul>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture</li>
              <li>Electronics, appliances and anything containing a battery</li>
              <li>Photographs, artwork, vinyl records and paper documents</li>
              <li>Musical instruments</li>
              <li>Mattresses, upholstery and clothing kept beyond one season</li>
              <li>Wine and other temperature sensitive collections</li>
            </ul>
          </article>
          <article className="utah-climate-card utah-climate-no">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M7 21v-6h10v6" /></svg>
              Standard drive-up units
            </h3>
            <div className="utah-climate-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in an open drive-up storage unit" width={1290} height={860} /></div>
            <p>A standard drive up unit works well for tools, patio furniture, plastic bins, sporting equipment, and vehicles. Whichever you choose, lift boxes off the floor on pallets or shelving and leave a gap between your belongings and the walls.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ca-vehicle-heading">
        <div className="state-storage-heading"><h2 id="ca-vehicle-heading">RV, boat, and vehicle storage in California.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Many California cities restrict oversized vehicle parking on residential streets, and HOA rules often go further. Storage facilities across the state offer:</p>
            <ul>
              <li>Uncovered outdoor parking. The lowest cost option for trailers, boats, and RVs.</li>
              <li>Covered parking. Shade from sustained summer sun, which matters for paint, seals, and tyres.</li>
              <li>Enclosed drive-up units. Full protection for classic cars, motorcycles, and smaller boats.</li>
            </ul>
            <p>Filter for parking availability, gate hours, and vehicle length when you search. Spaces commonly run from 20 to 45 feet, so confirm the maximum length before you reserve, and check whether current registration and insurance are required.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=California%20vehicle%20storage">Find vehicle storage near you in California <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="ca-size-guide-heading">
        <div className="state-storage-heading"><h2 id="ca-size-guide-heading">Choose a unit size with confidence.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <CardSlider trackClassName="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
      </section>

      <section className="utah-policy-section" aria-label="California storage rates, access, and rental terms">
        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="ca-deals-heading">Cheap storage units and first month free deals in California.</h2>
            <p>Promotions move constantly in California markets, so the lowest advertised rate today may differ next week. What to look for:</p>
            <p className="utah-policy-callout">Two questions to ask before you commit: what does my rate become once the promotion ends, and is there an administration fee or a required insurance charge on top of the monthly rent. Compare the twelve month cost rather than the first month.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=California%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li><strong>First month free.</strong> Widely offered on new rentals across the state.</li>
              <li><strong>Discounted first three months.</strong> Common at independently run facilities.</li>
              <li><strong>Student, military and senior rates.</strong> Ask directly, since these are often unadvertised.</li>
              <li><strong>Longer term rates.</strong> Committing to six or twelve months can reduce the monthly figure.</li>
              <li><strong>Inland alternatives.</strong> If your search is coastal, extend the radius inland and compare. The saving is often substantial.</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="ca-access-heading">24 hour access and security at California storage facilities.</h2>
            <p>Access hours vary widely. Some California facilities open the gate around the clock, many run business hours only, and urban multi storey sites often close earlier than drive-up yards.</p>
            <p className="utah-policy-lead">Check before you rent:</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=California%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Gate hours and whether they cover your schedule, listed in Pacific Time</li>
              <li>What time the facility closes on weekends and public holidays</li>
              <li>Whether the site is staffed, self service, or kiosk operated</li>
              <li>Perimeter fencing, gated entry, camera coverage, and lighting</li>
              <li>Individual unit alarms and the lock type required</li>
              <li>Lift access, trolley availability, and loading bay space at multi storey sites</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="ca-terms-heading">Month to month and short term storage in California.</h2>
            <p>Most California storage units rent month to month, which suits a move, a remodel, a quarter away, or a season between homes.</p>
            <p className="utah-policy-lead">Before you sign:</p>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Confirm the minimum rental period, if any. Most facilities rent by the month rather than the week.</li>
              <li>Confirm the notice period required before you move out</li>
              <li>Ask whether you can transfer to a larger or smaller unit mid rental</li>
              <li>Ask how rent increases are applied and how much notice you receive, since increases are common after the first few months</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ca-choose-heading">
        <div className="state-storage-heading"><h2 id="ca-choose-heading">How to choose a self storage unit in California.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A sectional sofa or chest freezer decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Decide on climate control. Base it on your region, what you are storing, and how long it stays.</p></article>
          <article><span>3</span><p>Set your radius deliberately. In California the drive inland is usually the single biggest saving available to you.</p></article>
          <article><span>4</span><p>Check access hours against your routine. Urban sites often close earlier than you expect.</p></article>
          <article><span>5</span><p>Check how you will actually load. Elevator, trolley distance, and loading bay access decide how long each visit takes.</p></article>
          <article><span>6</span><p>Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.</p></article>
          <article><span>7</span><p>Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.</p></article>
          <article><span>8</span><p>Ask about the lock. Many operators specify a type. Avoid buying one twice.</p></article>
          <article><span>9</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
        </div>
        <Link className="state-storage-guide-button" href="/storage-search?location=California">Find a facility and reserve online <span aria-hidden="true">→</span></Link>
      </section>

      <section className="state-storage-faq" aria-labelledby="ca-faq-heading">
        <div className="state-storage-heading"><h2 id="ca-faq-heading">California storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="ca-closing-heading">
        <div><h2 id="ca-closing-heading">Find storage units in California near your location today.</h2><p>Search 3,098 facilities and 41,949 available units across California, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=California">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">California</span></nav>
    </main>
  );
}
