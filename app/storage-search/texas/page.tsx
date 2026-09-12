import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";

export const metadata: Metadata = {
  title: "Find Storage Units In Texas Near Your Location | Cheap Storage, Prices And Sizes",
  description: "Find cheap storage units in Texas near your location. Compare 3,707 facilities and 44,477 available units across Houston, San Antonio, Dallas, Austin and Fort Worth, with current monthly prices.",
};

const CITY_LINKS = [
  "Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Plano", "Lubbock", "Corpus Christi", "Garland", "Cypress", "Waco", "Round Rock", "Carrollton", "Amarillo", "McKinney", "Irving", "McAllen", "Killeen", "Denton", "Mesquite", "Pasadena", "Midland", "Pearland", "Grand Prairie", "Lewisville", "Brownsville", "Laredo", "Frisco",
];

const PRICE_ROWS = [
  ["5' x 5'", "$14 to $61", "Boxes, bedding, a bike"],
  ["5' x 10'", "$17 to $100", "A single room, tools, garden equipment"],
  ["10' x 10'", "$20 to $155", "A one bedroom apartment"],
  ["10' x 15'", "$40 to $159", "A two bedroom home with appliances"],
  ["10' x 20'", "$44 to $180", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$410 to $803", "A four bedroom home or commercial stock"],
];

const FAQS = [
  {
    question: "How much is a storage unit per month in Texas?",
    answer: "A 5x5 typically runs $14 to $61 a month. A 10x10 typically runs $20 to $155. A 10x20 typically runs $44 to $180. The average unit runs around $114 a month in Fort Worth, $130 in San Antonio, $159 in Dallas and $171 in Austin.",
  },
  {
    question: "Where do I find cheap storage units near me in Texas?",
    answer: "Compare by neighborhood rather than by city, since the cheapest area in Austin averages around $101 a month against a citywide $171. Then compare the twelve month cost, ask about waived fees, ask for military, student and senior rates, and reserve online.",
  },
  {
    question: "What are mini storage prices in Texas?",
    answer: "Locker and mini units start from around $14 a month. A 5x5 averages around $30 in Houston, $41 in Austin and $47 in Dallas.",
  },
  {
    question: "How much are storage room prices for a medium unit?",
    answer: "A 10x10 typically runs $20 to $155 a month depending on city and features, and a 10x15 typically runs $40 to $159. Rural markets sit at the bottom of that range and metro markets at the top.",
  },
  {
    question: "What is short term storage and how long is the minimum?",
    answer: "Short term storage covers a few weeks to a few months, usually during a move, a renovation or a summer between leases. Most Texas facilities rent by the month rather than the week, so one month is the usual minimum. Check the notice period, since it can add a month to your total.",
  },
  {
    question: "Do I need climate controlled storage in Texas?",
    answer: "For most belongings, yes. Long summers and Gulf Coast humidity cause warping, mold, mildew and rust in standard units. Tools, bins, lawn equipment and vehicles are usually fine without it.",
  },
  {
    question: "How much is RV storage in Texas?",
    answer: "RV storage averages around $263 a month in both Austin and Dallas, with uncovered parking available from around $23 a month in parts of the state. Boat storage averages around $279 in Dallas and $326 in Austin.",
  },
  {
    question: "Where can I find 24 hour storage in Houston?",
    answer: "Filter your search for 24 hour access. Availability varies by site, and office hours are almost always shorter than gate hours, so confirm both before you reserve.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A locker holds a few boxes and files. A 5x5 holds bedding, boxes and a bike. A 5x10 holds a studio or single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Texas facilities rent month to month with no long term commitment. Weekly rentals are rare.",
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
    answer: "Facilities across Texas prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odour. Drain fuel from mowers, blowers and generators before storing them.",
  },
];

export default function TexasStoragePage() {
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
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>Texas</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in Texas near you.</em></h1>
          <p>Enter your city or ZIP code and see every storage unit available within driving distance of you. Texas has 3,707 storage facilities holding 44,477 available units right now, more than any other state, from the Gulf Coast through the Hill Country to the Panhandle and the border. Compare monthly rates, unit sizes, access hours and features before you leave the house.</p>
          <Link className="state-storage-cta" href="/storage-search?location=Texas">Search Texas storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="tx-cities-heading">
        <div className="state-storage-heading"><h2 id="tx-cities-heading">Storage units near you in Texas by city</h2><p>Texas has the deepest storage supply in the country, which means the price you pay depends heavily on how carefully you compare. Rates shift between metros, between suburbs and between neighborhoods inside a single city. Start with your city and narrow by radius.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.map((city) => <Link href={`/storage-search/${city.toLowerCase().replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">Do not see your town? Search by ZIP code and set your radius to five, ten, or twenty five miles.</p>
      </section>

      <section className="utah-content-section" aria-labelledby="tx-cheap-heading">
        <div className="state-storage-heading"><h2 id="tx-cheap-heading">Cheap storage units near you in Texas.</h2><p>Texas is the most competitive storage market in the country, and that competition shows up in the rates. Units start from $5 a month on promotional pricing in Houston and Dallas, from $8 in Fort Worth and Arlington, and from $10 in San Antonio, Austin, Plano, Garland, Carrollton, Round Rock and Killeen.</p></div>
        <div className="utah-price-factors">
          <h3>Six ways to find the lowest real cost:</h3>
          <ul>
            <li>Compare by neighborhood, not by city. In Austin, the North Lamar area averages around $101 a month against a citywide average of $171. In Dallas, Bruton Terrace averages around $103 against a citywide $159. That gap beats any promotion.</li>
            <li>Compare the twelve month cost, not the first month. A free first month on a higher ongoing rate often loses to a lower rate with no promotion.</li>
            <li>Check the next suburb out. Rural and small town Texas runs dramatically cheaper. A 10x10 that costs $155 in Cypress can cost a fraction of that outside the metro.</li>
            <li>Ask about the administration fee and deposit. Both change your day one cost and both are often waived.</li>
            <li>Ask for the unadvertised rates. Military, student and senior discounts are common across Texas and rarely listed.</li>
            <li>Reserve online. Web rates usually sit below the price quoted at the counter.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=Texas%20cheap%20storage">See cheap storage near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-pricing-section" aria-labelledby="tx-storage-heading">
        <div className="utah-pricing-heading"><h2 id="tx-storage-heading">How much is a storage unit per month in Texas?</h2><p className="utah-pricing-intro">The average unit runs around $114 a month in Fort Worth, $130 in San Antonio and Waco, $159 in Dallas and $171 in Austin. Houston prices below all of them on small units. A 5x5 averages around $30 a month in Houston, $41 in Austin and $47 in Dallas. Climate controlled pricing runs from around $41 for a 5x5 in Houston, $56 in Dallas and $61 in Austin.</p><p className="utah-pricing-caption">Typical monthly ranges by size across Texas:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors"><h3>Five things move your price:</h3><ul><li>Metro and neighborhood. The neighborhood gap inside Austin and Dallas is larger than the gap between most Texas metros.</li><li>Climate control. Texas heat makes this close to standard in many facilities, and it is built into the rate.</li><li>Drive up access. Convenience costs more and saves you time on every visit.</li><li>Move in offers. First month free and discounted first three month promotions run across the state.</li><li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person.</li></ul></div>
      </section>

      <section className="utah-content-section" aria-labelledby="tx-needs-heading">
        <div className="state-storage-heading"><h2 id="tx-needs-heading">Find storage in Texas by what you need it for.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid utah-needs-grid-4up">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for Texas families</h3><p>Texas homes rarely have basements, which puts the whole overflow into the garage. Storage takes it back: holiday decorations, sports equipment, lawn and pool gear, tools, hunting and fishing kit, and furniture you are holding between houses.</p><ul><li>Clearing the garage: a 5x10 holds seasonal items, tools and sports gear.</li><li>Between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.</li><li>Storm season on the coast: many families move documents, photographs and irreplaceable items inland and above ground level ahead of a storm.</li><li>Look for drive up access, ground floor units, and gate hours that suit a weekend load.</li></ul><Link href="/storage-search?location=Texas%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/military%20storage.jpg" alt="Military family with a service member packing a storage unit during a move" width={1536} height={1024} /></div><h3>Storage for military households</h3><p>Fort Cavazos, Fort Bliss, Lackland, Fort Sam Houston, Dyess and Sheppard bring households through Texas on orders that rarely line up with lease dates. Storage covers the gap between a move out and a move in, or holds household goods through a deployment.</p><ul><li>Full household during a posting: a 10x20 holds a three bedroom home.</li><li>Partial storage: a 10x10 covers furniture you will not need at the next duty station.</li><li>Vehicles: enclosed or covered parking keeps a car protected while you are away.</li><li>Look for military rates, month-to-month terms with no penalty for an early move out, autopay so billing runs while you are away, and climate control for anything staying through a Texas summer.</li></ul><Link href="/storage-search?location=Texas%20military%20storage">Find storage near your base →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging and returns. Energy and field service crews store equipment between rotations. Event and market traders store stock between weekends. Practices and firms archive files.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with drive up access and room to load a van.</li><li>Tools and equipment: a drive up unit you can back into directly, with 24 hour gate access for early starts.</li><li>Records, samples and electronics: a climate controlled 5x10 protects paper and hardware through the summer.</li><li>Look for month-to-month terms, online payment and invoicing, and autopay.</li></ul><Link href="/storage-search?location=Texas%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>Campuses in Austin, College Station, Houston, Lubbock, Denton, Waco and San Marcos empty every summer, and moving a full room across the state twice a year rarely makes sense. A small unit over the break usually costs less than replacing your furniture in August.</p><ul><li>Dorm or shared apartment: a locker or 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Look for student rates, a facility close to campus, climate control for anything that would not survive a Texas summer in a metal unit, and month-to-month terms so you stop paying the week you return.</li></ul><Link href="/storage-search?location=Texas%20student%20storage">Find student storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="tx-short-term-heading">
        <div className="state-storage-heading"><h2 id="tx-short-term-heading">Short term storage in Texas.</h2><p>Not every rental is a long one. Short term storage suits a move with a gap between closing dates, a renovation, a staging period before a sale, a summer between leases, or inventory you are holding for one season.</p></div>
        <div className="utah-price-factors">
          <h3>What to check when you only need a few months:</h3>
          <ul>
            <li>Confirm the minimum term. Most Texas facilities rent by the month rather than the week, so one month is usually the shortest available.</li>
            <li>Confirm the notice period. Some operators require a full month of notice, which turns a three month rental into four.</li>
            <li>Ask whether the promotion has a clawback. A few first month free offers require a minimum stay.</li>
            <li>Prioritise drive up access. Over a short rental, loading time matters more than the monthly rate.</li>
            <li>Take the ground floor. Same reason.</li>
            <li>Set up autopay anyway. It avoids a late fee on a rental you are barely thinking about.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=Texas%20short%20term%20storage">Find short term storage near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="tx-climate-heading">
        <div className="state-storage-heading"><h2 id="tx-climate-heading">Do you need climate controlled storage in Texas?</h2><p>For most of what you own, yes. Texas summers run long and hot, and the inside of a standard metal unit climbs well above the outside temperature through the afternoon. On the Gulf Coast, humidity adds mold, mildew and rust to the list. Houston alone has 209 facilities offering climate controlled units.</p></div>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture, which warps, splits and swells</li>
              <li>Mattresses, upholstery, bedding and clothing</li>
              <li>Electronics, appliances and anything containing a battery</li>
              <li>Photographs, artwork, vinyl records, books and paper documents</li>
              <li>Musical instruments</li>
              <li>Candles, vinyl, adhesives and anything that softens in heat</li>
            </ul>
          </article>
          <article className="utah-climate-card utah-climate-no">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M7 21v-6h10v6" /></svg>
              Standard drive-up units
            </h3>
            <div className="utah-climate-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in an open drive-up storage unit" width={1290} height={860} /></div>
            <p>A standard drive up unit works well for tools, plastic bins, lawn equipment, patio furniture and vehicles. Whichever you choose, lift boxes off the floor on pallets or shelving, use breathable covers rather than sealed plastic, and leave a gap at the walls so air can move.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="tx-vehicle-heading">
        <div className="state-storage-heading"><h2 id="tx-vehicle-heading">RV, boat, and vehicle storage in Texas.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Texas carries one of the highest rates of RV and boat ownership in the country, and most HOAs and municipalities restrict keeping them at home. Your options:</p>
            <ul>
              <li>Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs, from around $23 a month in parts of the state.</li>
              <li>Covered parking. Shade from sustained Texas sun, which matters for paint, seals, tyres and upholstery.</li>
              <li>Enclosed drive up units and bays. Full protection for classic cars, motorcycles and larger rigs, with high bay doors available at some sites.</li>
            </ul>
            <p>As a benchmark, vehicle storage averages around $141 a month in Austin and $169 in Dallas. RV storage averages around $263 in both. Boat storage averages around $279 in Dallas and $326 in Austin. Austin has 58 facilities offering RV storage and Dallas has 64.</p>
            <p>Filter for parking availability, gate hours and vehicle length. Spaces commonly run from 20 to 45 feet, so confirm the maximum length before you reserve, and check whether current registration and insurance are required.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Texas%20vehicle%20storage">Find RV and boat storage near you in Texas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="tx-size-guide-heading">
        <div className="state-storage-heading"><h2 id="tx-size-guide-heading">Choose a unit size with confidence.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <CardSlider trackClassName="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
      </section>

      <section className="utah-policy-section" aria-label="Texas storage rates, access, and rental terms">
        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="tx-deals-heading">Cheap storage units and first month free deals in Texas.</h2>
            <p>Promotions move often across Texas, so the lowest advertised rate today may differ tomorrow. What to look for:</p>
            <p className="utah-policy-callout">Two questions to ask before you commit: what does my rate become once the promotion ends, and is there an administration fee or a required insurance charge on top of the monthly rent. Compare the twelve month cost rather than the first month.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Texas%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li><strong>First month free.</strong> Widely offered on new rentals across the state.</li>
              <li><strong>Discounted first three months.</strong> Common at independently run facilities.</li>
              <li><strong>Student, military and senior rates.</strong> Ask directly, since these are often unadvertised.</li>
              <li><strong>Longer term rates.</strong> Committing to six or twelve months can reduce the monthly figure.</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="tx-access-heading">24 hour access and security at Texas storage facilities.</h2>
            <p>Access hours vary by site, and office hours are almost always shorter than gate hours.</p>
            <p className="utah-policy-lead">Check before you rent:</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Texas%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Gate hours and office hours, which usually differ, listed in Central Time. El Paso and the far west of the state run on Mountain Time.</li>
              <li>Whether 24 hour gate access is available at that site</li>
              <li>Weekend and public holiday hours</li>
              <li>Whether the site is staffed, self service or kiosk operated</li>
              <li>Perimeter fencing, gated entry, camera coverage and lighting</li>
              <li>Individual unit alarms and the lock type required</li>
              <li>Online payment, autopay and app or keypad entry</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="tx-terms-heading">Month to month and short term storage in Texas.</h2>
            <p>Most Texas storage units rent month to month, which suits a move, a renovation, a summer away or a season between homes.</p>
            <p className="utah-policy-lead">Before you sign:</p>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Confirm the minimum rental period, if any</li>
              <li>Confirm the notice period required before you move out</li>
              <li>Ask whether you can transfer to a larger or smaller unit mid rental</li>
              <li>Ask how rent increases are applied and how much notice you receive</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="tx-choose-heading">
        <div className="state-storage-heading"><h2 id="tx-choose-heading">How to choose a self storage unit in Texas.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A sectional sofa, a chest freezer or a mattress decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Compare by neighborhood. Inside Austin and Dallas this is the single biggest saving available.</p></article>
          <article><span>3</span><p>Decide on climate control. Texas heat is the deciding factor for anything soft, wooden or electronic.</p></article>
          <article><span>4</span><p>Check access hours against your routine. Gate hours and office hours are rarely the same.</p></article>
          <article><span>5</span><p>Check how you will load. Drive up access saves real time on every visit.</p></article>
          <article><span>6</span><p>Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.</p></article>
          <article><span>7</span><p>Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.</p></article>
          <article><span>8</span><p>Ask about storm preparation on the coast. Elevation, drainage and door construction matter in Houston, Galveston and Corpus Christi.</p></article>
          <article><span>9</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
        </div>
        <Link className="state-storage-guide-button" href="/storage-search?location=Texas">Find a facility and reserve online <span aria-hidden="true">→</span></Link>
      </section>

      <section className="state-storage-faq" aria-labelledby="tx-faq-heading">
        <div className="state-storage-heading"><h2 id="tx-faq-heading">Texas storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="tx-closing-heading">
        <div><h2 id="tx-closing-heading">Find storage units in Texas near your location today.</h2><p>Search 3,707 facilities and 44,477 available units across Texas, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=Texas">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Texas</span></nav>
    </main>
  );
}
