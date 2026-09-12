import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";

export const metadata: Metadata = {
  title: "Find Storage Units In Florida Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Florida near your location. Compare 2,526 facilities and 41,123 available units across Miami, Jacksonville, Tampa, Orlando and Fort Lauderdale, with current monthly prices.",
};

const CITY_LINKS = [
  "Miami", "Jacksonville", "Tampa", "Orlando", "Fort Lauderdale", "St. Petersburg", "Cape Coral", "Pompano Beach", "Lakeland", "West Palm Beach", "Port St. Lucie", "Tallahassee", "Palm Bay", "Clearwater", "Lake Worth", "Brandon", "Hialeah", "Davie", "Boca Raton", "Pembroke Pines", "Spring Hill", "Hollywood", "Miami Gardens", "Riverview", "Miramar", "Palm Coast", "Coral Springs", "Plantation", "Saint Cloud", "Gainesville",
];

const PRICE_ROWS = [
  ["5' x 5'", "$22 to $95", "Boxes, bedding, seasonal gear"],
  ["5' x 10'", "$35 to $120", "A single room, bikes, tools"],
  ["10' x 10'", "$65 to $275", "A one bedroom apartment"],
  ["10' x 15'", "$120 to $300", "A two bedroom home with appliances"],
  ["10' x 20'", "$129 to $500", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$364 to $642", "A four bedroom home or commercial stock"],
];

const FAQS = [
  {
    question: "How much does it cost to rent a storage space in Florida?",
    answer: "A 5x5 typically runs $22 to $95 a month. A 10x10 typically runs $65 to $275. A 10x20 typically runs $129 to $500. Inland and central Florida markets sit at the lower end, coastal South Florida at the higher end.",
  },
  {
    question: "How much is a small storage unit in Florida?",
    answer: "A 5x5 averages around $22 a month in North Port, around $42 in Orlando and around $48 in Cape Coral. Coastal South Florida runs higher. A 5x10 typically runs $35 to $120.",
  },
  {
    question: "What storage has no deposit near me?",
    answer: "Many Florida facilities rent with no security deposit, and administration fees are frequently waived during promotions. Filter for no deposit listings, then confirm the administration fee, lock cost and insurance requirement before you reserve.",
  },
  {
    question: "How do I find cheap storage units in Florida?",
    answer: "Compare the twelve month cost rather than the first month, extend your search inland, book outside peak season, ask about waived administration fees, ask for student, military and senior rates, and reserve online rather than at the counter.",
  },
  {
    question: "Can I go to my storage unit anytime?",
    answer: "Some Florida facilities offer 24 hour gate access, others run limited gate hours, and office hours are almost always shorter. Filter for 24 hour access and confirm both sets of hours before you reserve.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding and seasonal gear. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in Florida?",
    answer: "For most belongings, yes. Heat, humidity and coastal salt air cause mould, mildew, rust and warping in standard units. Climate control is the default across much of the Florida market rather than an upgrade.",
  },
  {
    question: "How do I choose self storage in Florida for seasonal use?",
    answer: "Choose climate control, set up autopay, keep the lease month to month, ask how the facility handles storm season, confirm your insurance covers an unoccupied unit, and photograph your contents before you leave.",
  },
  {
    question: "Why is storage insurance important in Florida?",
    answer: "Humidity and heat cause slow damage, storm season causes sudden damage, and an unattended unit is exposed to both. Check what your own policy covers, what is excluded, and how the facility plan compares before you buy either.",
  },
  {
    question: "Can I store a boat, RV or car in Florida?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking and enclosed units. In Orlando, car storage averages around $166 a month, boat storage around $223 and RV storage around $227. Confirm the maximum permitted length and whether registration and insurance are required.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Florida facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across Florida prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odour. Drain fuel from mowers and generators before storing them.",
  },
];

export default function FloridaStoragePage() {
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
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>Florida</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in Florida near you.</em></h1>
          <p>Enter your city or ZIP code and see every storage unit available within driving distance of you. Florida has 2,526 storage facilities holding 41,123 available units right now, from the Panhandle down through both coasts to the Keys. Compare monthly rates, unit sizes, access hours and features before you leave the house.</p>
          <Link className="state-storage-cta" href="/storage-search?location=Florida">Search Florida storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="fl-cities-heading">
        <div className="state-storage-heading"><h2 id="fl-cities-heading">Storage units near you in Florida by city</h2><p>Florida rates move with the season and with the coast. A facility a few miles inland often costs noticeably less than one near the water. Start with your city and narrow by radius from there.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.map((city) => <Link href={`/storage-search/${city.toLowerCase().replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">Do not see your town? Search by ZIP code and set your radius to five, ten or twenty five miles.</p>
      </section>

      <section className="utah-pricing-section" aria-labelledby="fl-storage-heading">
        <div className="utah-pricing-heading"><h2 id="fl-storage-heading">How much does it cost to rent a storage space in Florida?</h2><p className="utah-pricing-intro">Florida sits below the national average on most unit sizes, though coastal South Florida runs well above the rest of the state. Small units start under $10 a month on promotional rates in Pompano Beach, Boca Raton, Port St. Lucie and Cape Coral.</p><p className="utah-pricing-caption">Typical monthly ranges by size across Florida:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors">
          <p>For a sense of the regional gap, a 5x5 averages around $22 a month in North Port, around $42 in Orlando and around $48 in Cape Coral, while comparable units in coastal Broward and Palm Beach County run two to three times that.</p>
          <p>Vehicle storage prices separately. In Orlando, car storage averages around $166 a month, boat storage around $223 and RV storage around $227.</p>
          <h3>Six things move your price:</h3>
          <ul>
            <li>Coast versus inland. Waterfront and near coastal markets price well above inland towns for identical square footage.</li>
            <li>Climate control. Most Florida facilities offer it and many price it close to standard, since demand for it here is near universal.</li>
            <li>Season. Rates and availability tighten as seasonal residents arrive, so booking ahead of the winter months matters.</li>
            <li>Drive up versus interior access. Drive up units cost more and save you time on every visit.</li>
            <li>Move in offers. First month free and discounted first three month promotions run across the state.</li>
            <li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=Florida%20storage%20prices">Compare prices near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="fl-deposit-heading">
        <div className="state-storage-heading"><h2 id="fl-deposit-heading">Is there storage with no deposit in Florida?</h2><p>Many Florida facilities rent with no security deposit, and a good number waive the administration fee during a promotion. What you actually pay on day one usually comes down to four line items.</p></div>
        <div className="utah-price-factors">
          <ul>
            <li><strong>First month rent.</strong> Often free or heavily discounted on a new rental.</li>
            <li><strong>Administration fee.</strong> A one off charge, commonly waived during promotions. Ask before you reserve.</li>
            <li><strong>Deposit.</strong> Increasingly uncommon. Where it applies, ask whether it is refundable and under what conditions.</li>
            <li><strong>Lock and insurance.</strong> Either supplied, sold on site or brought by you. Confirm which before move in day.</li>
          </ul>
          <p>Filter for facilities advertising no deposit and no administration fee, then confirm both on the phone before you reserve, since promotional terms change faster than listings update.</p>
          <Link className="state-storage-guide-button" href="/storage-search?location=Florida%20no%20deposit%20storage">Find no deposit storage near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="fl-seasonal-heading">
        <div className="state-storage-heading"><h2 id="fl-seasonal-heading">How to choose self storage in Florida for seasonal use.</h2><p>If you split the year between Florida and somewhere else, your requirements differ from a year round renter. You need the unit to look after itself while you are away. Work through these before you book.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Choose climate control without exception. Anything left through a Florida summer unconditioned is exposed to heat and humidity for months with nobody checking on it.</p></article>
          <article><span>2</span><p>Set up autopay. Missed payments while you are away carry late fees and, eventually, lien consequences.</p></article>
          <article><span>3</span><p>Confirm the lease runs month to month. You want the freedom to close the unit the season you stop coming down.</p></article>
          <article><span>4</span><p>Ask how the facility handles storm season. Roof and door construction, drainage, flood zone and elevation all matter for a unit standing unattended from June through November.</p></article>
          <article><span>5</span><p>Check your insurance covers an unoccupied unit. Ask specifically about wind and water damage, which are commonly excluded from standard policies.</p></article>
          <article><span>6</span><p>Pick ground floor or drive up. It saves you time at both ends of the season.</p></article>
          <article><span>7</span><p>Store smart. Lift everything off the floor on pallets, cover furniture with breathable sheeting rather than plastic, and leave a gap at the walls for airflow.</p></article>
          <article><span>8</span><p>Photograph everything before you leave. An inventory with photographs makes any future claim straightforward.</p></article>
        </div>
        <Link className="state-storage-guide-button" href="/storage-search?location=Florida%20seasonal%20storage">Find seasonal storage near you <span aria-hidden="true">→</span></Link>
      </section>

      <section className="utah-content-section" aria-labelledby="fl-needs-heading">
        <div className="state-storage-heading"><h2 id="fl-needs-heading">Find storage in Florida by what you need it for.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid utah-needs-grid-4up">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/seasonal%20residents.jpg" alt="Storage unit packed with beach gear, surfboard, bikes, and holiday decorations for a seasonal resident" width={1536} height={1024} /></div><h3>Storage for seasonal residents and snowbirds</h3><p>You are here for part of the year and away for the rest. Storage lets you keep a vehicle, golf clubs, bikes, beach gear and furniture in Florida rather than hauling them back and forth, and it lets you downsize the rental you take.</p><ul><li>Household goods between seasons: a 10x10 holds the contents of a one bedroom condo.</li><li>Vehicle and gear: enclosed or covered parking plus a 5x10 covers a car and everything that goes with it.</li><li>Look for climate control, autopay, month to month terms and a facility you can reach easily from the airport or the interstate.</li></ul><Link href="/storage-search?location=Florida%20seasonal%20storage">Find seasonal storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for Florida families</h3><p>Florida homes often come without basements or attics, which leaves the garage doing the work. Storage takes the overflow: holiday decorations, sports equipment, outgrown furniture, tools and the boxes you have moved twice without opening.</p><ul><li>Clearing the garage: a 5x10 holds seasonal items and sports gear.</li><li>Remodelling or between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.</li><li>Storm season preparation: many families use a unit to move valuables and documents somewhere secure and inland ahead of a storm.</li><li>Look for drive up access, climate control for anything soft or wooden, and gate hours that suit a weekend load.</li></ul><Link href="/storage-search?location=Florida%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory and packaging. Boat and marine services store parts. Seasonal traders and event businesses store stock and equipment between runs.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with ground floor access and room to load a van.</li><li>Tools and equipment: a drive up unit you can back into directly.</li><li>Records, samples and electronics: a climate controlled 5x10 protects paper and hardware through the summer.</li><li>Look for month to month terms, online payment and invoicing, and access hours that cover early starts.</li></ul><Link href="/storage-search?location=Florida%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>Florida campuses empty every summer, and moving a full room home twice a year rarely makes sense. If you are in Gainesville, Tallahassee, Orlando, Tampa, Boca Raton or Miami, a small unit over the break usually costs less than replacing your furniture in August.</p><ul><li>Dorm or shared apartment: a 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Look for student rates, a facility close to campus, climate control for anything you care about, and month to month terms so you stop paying the week you return.</li></ul><Link href="/storage-search?location=Florida%20student%20storage">Find student storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="fl-climate-heading">
        <div className="state-storage-heading"><h2 id="fl-climate-heading">Do you need climate controlled storage in Florida?</h2><p>In most of Florida, yes, for most of what you own. Sustained heat, year round humidity and coastal salt air combine to produce mould, mildew, rust and warping in a standard unit far faster than in a drier state. This is why climate controlled units are the default across much of the market rather than an upgrade.</p></div>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture, which warps, swells and grows mould in humidity</li>
              <li>Mattresses, upholstery, bedding and clothing</li>
              <li>Electronics, appliances and anything containing a battery</li>
              <li>Photographs, artwork, vinyl records, books and paper documents</li>
              <li>Musical instruments</li>
              <li>Anything metal near the coast, where salt air accelerates corrosion</li>
            </ul>
          </article>
          <article className="utah-climate-card utah-climate-no">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M7 21v-6h10v6" /></svg>
              Standard drive-up units
            </h3>
            <div className="utah-climate-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in an open drive-up storage unit" width={1290} height={860} /></div>
            <p>A standard drive up unit is fine for tools, plastic bins, garden equipment, patio furniture and vehicles. Whichever you choose, lift boxes off the floor, use breathable covers rather than sealed plastic, and leave space at the walls so air can move.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="fl-vehicle-heading">
        <div className="state-storage-heading"><h2 id="fl-vehicle-heading">Boat, RV, and vehicle storage in Florida.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Florida has one of the highest rates of boat and RV ownership in the country, and HOA and municipal rules routinely prohibit keeping them at home. Your options:</p>
            <ul>
              <li>Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs.</li>
              <li>Covered parking. Shade from sustained sun, which matters here for gelcoat, seals, upholstery and tyres.</li>
              <li>Enclosed drive up units. Full protection for classic cars, motorcycles and smaller boats.</li>
            </ul>
            <p>In Orlando, car storage averages around $166 a month, boat storage around $223 and RV storage around $227, which gives you a benchmark for comparison elsewhere in the state.</p>
            <p>Filter for parking availability, gate hours and vehicle length. Spaces commonly run from 20 to 45 feet, so confirm the maximum length before you reserve, and check whether current registration and insurance are required.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Florida%20vehicle%20storage">Find boat and RV storage near you <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="fl-insurance-heading">
        <div className="state-storage-heading"><h2 id="fl-insurance-heading">Why storage insurance matters more in Florida.</h2><p>Most Florida facilities require proof of coverage as a condition of the lease, and the reasons are specific to the state. Humidity and heat cause damage slowly, storm season causes it suddenly, and a unit standing unattended for months is exposed to both. Before you rent, check four things.</p></div>
        <div className="utah-price-factors">
          <ul>
            <li><strong>What your own policy already covers.</strong> Homeowners and renters policies often extend to stored goods, usually at a reduced percentage of your contents limit.</li>
            <li><strong>What is excluded.</strong> Wind and water damage are commonly excluded or capped, and mould and mildew are frequently excluded outright.</li>
            <li><strong>What the facility plan covers.</strong> Compare the limit, the excess and the exclusions against your own policy rather than assuming it is broader.</li>
            <li><strong>Whether coverage holds while you are away.</strong> Ask specifically if the unit will be unattended for months at a time.</li>
          </ul>
          <p>Photograph your contents at move in and keep a written inventory. It costs you twenty minutes and makes any claim considerably simpler.</p>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="fl-size-guide-heading">
        <div className="state-storage-heading"><h2 id="fl-size-guide-heading">Choose a unit size with confidence.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <CardSlider trackClassName="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
      </section>

      <section className="utah-policy-section" aria-label="Florida storage rates, access, and rental terms">
        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="fl-deals-heading">Cheap storage units and first month free deals in Florida.</h2>
            <p>Florida is a competitive storage market, which works in your favour. How to find the lowest real cost:</p>
            <p className="utah-policy-callout">Compare the twelve month cost, not the first month. A free first month on a higher ongoing rate often loses to a lower rate with no promotion.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Florida%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li><strong>Search inland.</strong> Moving your radius a few miles away from the coast is usually the single biggest saving available.</li>
              <li><strong>Administration fee and deposit.</strong> Both are frequently waived and both change your day one cost.</li>
              <li><strong>Book outside peak season.</strong> Rates and availability tighten as seasonal residents arrive.</li>
              <li><strong>Ask for the unadvertised rates.</strong> Student, military and senior discounts are common and rarely listed.</li>
              <li><strong>Reserve online.</strong> Web rates usually sit below the price quoted at the counter.</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="fl-access-heading">Can I go to my storage unit anytime in Florida?</h2>
            <p>It depends on the facility. Many Florida sites offer 24 hour gate access, others run gate hours from around six in the morning until ten at night, and office hours are almost always shorter than gate hours.</p>
            <p className="utah-policy-lead">Check before you rent:</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Florida%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Gate hours and office hours, which usually differ, listed in the local time zone. Most of Florida runs on Eastern Time, while the western Panhandle runs on Central Time.</li>
              <li>Weekend and public holiday hours</li>
              <li>Whether the site is staffed, self service or kiosk operated</li>
              <li>Whether app or keypad entry covers you outside office hours</li>
              <li>Perimeter fencing, gated entry, camera coverage and lighting</li>
              <li>Individual unit alarms and the lock type required</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="fl-terms-heading">Month to month and short term storage in Florida.</h2>
            <p>Most Florida storage units rent month to month, which suits a move, a renovation, a season away or a period between homes.</p>
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
      </section>

      <section className="state-storage-faq" aria-labelledby="fl-faq-heading">
        <div className="state-storage-heading"><h2 id="fl-faq-heading">Florida storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="fl-closing-heading">
        <div><h2 id="fl-closing-heading">Find storage units in Florida near your location today.</h2><p>Search 2,526 facilities and 41,123 available units across Florida, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=Florida">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Florida</span></nav>
    </main>
  );
}
