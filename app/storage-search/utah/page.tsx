import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { isCityPublished } from "@/lib/cityStates";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Find Storage Units In Utah Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Utah near your location. Compare facilities, current monthly prices, sizes, and availability across Salt Lake City, Ogden, Provo, Logan, and Layton.",
};

const CITY_LINKS = [
  "Salt Lake City", "Ogden", "West Jordan", "Murray", "West Valley City", "Layton", "Orem", "Logan", "Riverton", "Sandy", "South Jordan", "Lehi", "Springville", "Millcreek", "Clearfield", "Herriman", "Provo", "Saratoga Springs", "Tooele", "Taylorsville",
];

const PRICE_ROWS = [
  ["5' x 5'", "$31 to $78", "Boxes, bedding, seasonal gear"],
  ["5' x 10'", "$40 to $110", "A single room, bikes, tools"],
  ["10' x 10'", "$99 to $135", "A one bedroom apartment"],
  ["10' x 15'", "$138 to $180", "A two bedroom home with appliances"],
  ["10' x 20'", "$130 to $245", "A three bedroom home or a vehicle"],
  ["10' x 30' and larger", "$157 to $250", "A four bedroom home or equipment"],
];

const FAQS = [
  {
    question: "How much are storage units near me in Utah?",
    answer: "Small units start under $20 a month in some Wasatch Front markets. A standard 10x10 commonly lists between $99 and $135, while mountain markets such as Park City can run higher.",
  },
  {
    question: "How much is a small storage unit per month?",
    answer: "A 5x5 in Utah typically runs $31 to $78, while a 5x10 typically runs $40 to $110 depending on city, access, and features.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or city, set a search radius, and compare available units by size, monthly rate, access hours, and features before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes and seasonal gear, a 5x10 holds a single room, a 10x10 holds a one bedroom apartment, and a 10x20 holds a three bedroom home or vehicle.",
  },
  {
    question: "Do I need climate controlled storage in Utah?",
    answer: "Choose climate control for wood and leather furniture, electronics, documents, photographs, instruments, and anything staying through both summer and winter. Tools, bins, patio furniture, and vehicles are usually fine in a standard drive-up unit.",
  },
  {
    question: "Which Utah facilities offer 24 hour access?",
    answer: "Availability varies by city and site. Filter for 24 hour access and check the listed gate hours, shown in Mountain Time, before you reserve.",
  },
  {
    question: "Can I rent a storage unit month to month?",
    answer: "Most Utah facilities rent month to month. Confirm the notice period before moving out and whether a minimum term applies.",
  },
  {
    question: "Can I store an RV, boat, or car in Utah?",
    answer: "Yes. Facilities offer uncovered parking, covered parking, and enclosed units. Confirm the maximum vehicle length and whether registration and insurance are required.",
  },
  {
    question: "Are there first month free storage deals in Utah?",
    answer: "Many Utah operators run a first month free offer or a discount across the first three months. Student, military, and senior rates may also be available. Ask what the rate becomes after the promotion and compare the twelve-month cost.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, then ask what the facility accepts.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "Bring a valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities prohibit perishable food, plants, live animals, flammable or hazardous materials, fuel, fireworks, and anything that generates odour. Drain fuel from mowers and generators before storing them.",
  },
];

export default function UtahStoragePage() {
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
    { name: "Storage search", path: "/storage-search" },
    { name: "Utah", path: "/storage-search/utah" },
  ]);

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="state-storage-hero hero-photo" style={{ "--hero-image": "url('https://images.unsplash.com/photo-1621603933126-6c216db10045?auto=format&fit=crop&w=1800&q=70')" } as React.CSSProperties}>
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>Utah</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in Utah near you.</em></h1>
          <p>Compare 457 facilities and 4,963 available units across Utah, with current prices, sizes, and amenities near your location.</p>
          <Link className="state-storage-cta" href="/storage-search?location=Utah">Search Utah storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="utah-cities-heading">
        <div className="state-storage-heading"><h2 id="utah-cities-heading">Find cheap storage units in your favorite Utah cities</h2><p>Availability changes street by street in Utah, so the closest facility is often the one holding the rate you want. Start with your city and narrow by radius.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.filter((city) => isCityPublished(city.toLowerCase().replace(/\./g, "").replace(/ /g, "-"))).map((city) => <Link href={`/storage-search/utah/${city.toLowerCase().replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
      </section>

      <section className="utah-pricing-section" aria-labelledby="utah-storage-heading">
        <div className="utah-pricing-heading"><h2 id="utah-storage-heading">How much will a storage unit cost you in Utah each month?</h2><p className="utah-pricing-intro">Small units in Utah start under $20 a month in cities such as West Jordan, Layton, Murray and Salt Lake City. A standard 10x10 unit along the Wasatch Front commonly lists between $99 and $135 a month. Mountain and resort markets such as Park City run higher for the same square footage, and outlying towns run lower.</p><p className="utah-pricing-caption">Typical monthly ranges by size in Utah:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors"><h3>Five things move your price:</h3><ul><li>Where you are in the metro. A unit two exits further out often costs less for the same square footage.</li><li>Climate control. Temperature regulated units carry a premium per square foot.</li><li>Drive up and ground floor access. Convenience costs more at most facilities.</li><li>Move in offers. First month free and discounted first three month promotions are common across Utah.</li><li>Online rate versus walk in rate. Rates advertised online usually sit below the price quoted at the counter, so reserve before you arrive.</li></ul></div>
      </section>

      <section className="utah-content-section" aria-labelledby="utah-needs-heading">
        <div className="state-storage-heading"><h2 id="utah-needs-heading">Pick Utah storage that fits your season, your move or your business.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for Utah families</h3><p>You are storing gear for four seasons in a state that uses all of them. Skis, boards, and snow gear sit from November through April. Trailers, paddleboards, bikes, and canyon gear return from May through October. Families across Lehi, Saratoga Springs, Eagle Mountain, Herriman, and Syracuse often rent while they build or move.</p><ul><li>A 5x10 lets you swap winter and summer equipment without stacking to the ceiling.</li><li>A 10x15 holds a two bedroom home with appliances, while a 10x20 holds a three bedroom home.</li><li>Look for drive-up access, aisles wide enough for a trailer, and gate hours that cover early canyon mornings.</li></ul><Link href="/storage-search?location=Utah%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without signing a commercial lease. Contractors along the Wasatch Front store tools, materials, and site equipment between projects. Online sellers and Silicon Slopes founders hold inventory, packaging, and trade show kit close to home. Agents store staging furniture, while consultants and clinics archive files.</p><ul><li>A 10x10 or 10x15 with ground-floor loading works for inventory and stock.</li><li>A drive-up unit lets you back a truck or van into the space.</li><li>A climate-controlled 5x10 protects paper and hardware through Utah summers. Look for month-to-month terms, online payment, and early access hours.</li></ul><Link href="/storage-search?location=Utah%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>Utah campuses empty on a schedule. Students at the University of Utah, BYU, Utah Valley University, Utah State, Weber State, or Southern Utah University often need space between spring semester and autumn move-in.</p><ul><li>A 5x5 takes boxes, bedding, and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>A 10x10 can cover two rooms when split with a roommate.</li><li>Look for student rates near Salt Lake City, Provo, Orem, Logan, Ogden, or Cedar City, plus month-to-month terms.</li></ul><Link href="/storage-search?location=Utah%20student%20storage">Find student storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="utah-gear-heading">
        <div className="state-storage-heading"><h2 id="utah-gear-heading">Storing the gear that comes with living in Utah.</h2><p>Utah is known for five national parks, world-class powder, and more public land than almost anywhere else in the country. That reputation shows up in your garage.</p></div>
        <div className="utah-lifestyle-grid">
          <article><strong>Park City and Little Cottonwood</strong><p>Skis, boards, boot bags, and avalanche gear sit idle for seven months. A 5x5 keeps them out of the garage through summer.</p></article>
          <article><strong>Moab and the desert</strong><p>Jeeps, rooftop tents, recovery gear, mountain bikes, and climbing racks fit well in a drive-up unit with trailer access.</p></article>
          <article><strong>Lake Powell, Bear Lake, and the Great Salt Lake</strong><p>Boats, wakeboards, and paddleboards need outdoor parking or an enclosed unit from October onward.</p></article>
          <article><strong>St. George and the southern corridor</strong><p>Winter residents store RVs, trailers, and household goods between seasons.</p></article>
          <article><strong>Salt Lake City households</strong><p>Camping kit, hunting gear, and bulky sports equipment can free up real square footage at home.</p></article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="utah-climate-heading">
        <div className="state-storage-heading"><h2 id="utah-climate-heading">Does it snow in Utah, and what does that mean for your storage unit?</h2><p>Yes. Northern Utah receives heavy mountain snowfall through winter, valley temperatures regularly drop below freezing, and summers along the Wasatch Front run hot and dry. That annual swing, along with the low humidity, is what decides whether you need climate control.</p></div>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture that can crack or warp in dry heat</li>
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
            <p>A standard drive up unit works well for tools, patio furniture, plastic bins, sporting equipment and vehicles. Whichever you choose, lift boxes off the floor on pallets or shelving and leave a gap between your belongings and the walls.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="utah-vehicle-heading">
        <div className="state-storage-heading"><h2 id="utah-vehicle-heading">Parking space for your RV, boat and trailer between Utah trips.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Utah households run heavy on trailers, boats, campers, and off-road vehicles, and many HOAs restrict driveway parking. Choose uncovered outdoor parking, covered parking, or enclosed drive-up units.</p>
            <p>Filter for parking availability, gate hours, and vehicle length. Spaces range from 20 to 45 feet, so confirm the maximum length before you reserve, and check whether current registration and insurance are required.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Utah%20vehicle%20storage">Find vehicle storage near you in Utah <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="utah-size-guide-heading">
        <div className="state-storage-heading"><h2 id="utah-size-guide-heading">Find the right unit size for your Utah move.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p></div>
        <CardSlider trackClassName="state-size-grid">
          <article><div className="state-size-image"><Image src="/images/storage-guide/boxes.jpg" alt="Boxes and small items packed for a small storage unit" width={640} height={420} quality={90} /></div><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/threebedroom.jpg" alt="Furniture from a few rooms ready for a medium storage unit" width={640} height={420} quality={90} /></div><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/fourbedroom.jpg" alt="Contents of a full home ready for a large storage unit" width={640} height={420} quality={90} /></div><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="state-policy-section" aria-label="Utah storage rates, access, and rental terms">
        <div className="state-policy-grid">
          <article className="state-policy-card" aria-labelledby="utah-deals-heading">
            <h2 id="utah-deals-heading">Save on your first month with Utah storage deals.</h2>
            <p>Prices along the Wasatch Front swing with the moving season, so timing and location do most of the work for you.</p>
            <ul><li><strong>Book before May.</strong> Summer moves and student move-outs at BYU, Utah State and the University of Utah push rates up from May through August.</li><li><strong>Look one exit further.</strong> A facility in Lehi, Springville or West Jordan often costs less than the same size in Salt Lake City or Park City.</li><li><strong>Check the twelve month total.</strong> A free first month on a higher monthly rate can cost you more over a year than a lower rate with no offer.</li><li><strong>Ask for unlisted discounts.</strong> Military rates matter near Hill Air Force Base, and student rates are common near campus.</li></ul>
            <Link className="state-storage-guide-button" href="/storage-search?location=Utah%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </article>
          <article className="state-policy-card" aria-labelledby="utah-access-heading">
            <h2 id="utah-access-heading">Early gate hours and secure facilities across Utah.</h2>
            <p>Utah winters decide how easy your unit is to reach, so check access with snow in mind.</p>
            <ul><li><strong>Snow clearing.</strong> Ask how fast drive aisles and roll-up doors are plowed after a storm.</li><li><strong>Gate hours in Mountain Time.</strong> Early access matters if you load gear before a canyon trip.</li><li><strong>Security you can see.</strong> Look for gated entry, cameras covering every aisle, good lighting and individual door alarms.</li><li><strong>Pay and enter by app.</strong> Autopay and app or keypad entry save you a trip to the office.</li></ul>
            <Link className="state-storage-guide-button" href="/storage-search?location=Utah%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </article>
          <article className="state-policy-card" aria-labelledby="utah-terms-heading">
            <h2 id="utah-terms-heading">Flexible month to month storage for Utah moves and seasons.</h2>
            <p>Month to month rentals fit Utah's rhythm of ski seasons, summer road trips and new home builds.</p>
            <ul><li><strong>Minimum rental period.</strong> Most facilities rent by the month. Confirm there is no longer minimum attached to an offer rate.</li><li><strong>Move-out notice.</strong> Ten to fourteen days is typical. Put the date in your calendar when you sign.</li><li><strong>Switching sizes.</strong> Ask whether you can move to a bigger unit when the ski gear comes out without signing a new contract.</li><li><strong>Rate increases.</strong> Ask how often rates rise and how much notice you get.</li></ul>
            <Link className="state-storage-guide-button" href="/storage-search?location=Utah%20month%20to%20month%20storage">Find month to month storage <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="utah-choose-heading">
        <div className="state-storage-heading"><h2 id="utah-choose-heading">Your checklist for picking a Utah storage unit.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A sectional sofa or chest freezer decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Decide on climate control based on what you are storing and how long it stays.</p></article>
          <article><span>3</span><p>Set your radius. Weigh the saving against the drive you will actually make each month.</p></article>
          <article><span>4</span><p>Check access hours against your routine. Early starts and late finishes rule out some facilities.</p></article>
          <article><span>5</span><p>Compare the ongoing rate, not the offer. Ask what month two onward costs.</p></article>
          <article><span>6</span><p>Confirm insurance. Check your renters or homeowners policy first.</p></article>
          <article><span>7</span><p>Ask about the lock. Many operators specify a type.</p></article>
          <article><span>8</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
          <article><span>9</span><p>Visit if you can. Look at lighting, drainage, snow clearing, and the condition of neighbouring units.</p></article>
        </div>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-search?location=Utah">Find a facility and reserve online <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="state-storage-guide state-love" aria-labelledby="utah-love-heading">
        <div className="state-storage-heading"><h2 id="utah-love-heading">Why people love Utah.</h2><p>And why so many of them need a little extra space.</p></div>
        <div className="state-size-grid"><article><h3>Mountains on your doorstep</h3><p>The Wasatch Range sits minutes from Salt Lake City, Ogden and Provo, so you can ski in the morning and be back at your desk by lunch. That lifestyle comes with skis, bikes and camping gear that need a home.</p></article><article><h3>Five national parks</h3><p>Zion, Bryce Canyon, Arches, Canyonlands and Capitol Reef draw road trippers all year. If you own a trailer or RV for those trips, a covered space keeps it ready between adventures.</p></article><article><h3>A booming tech scene</h3><p>Silicon Slopes around Lehi and Draper keeps bringing new jobs and new residents. Many arrive before their home is ready, which makes short term storage part of the move.</p></article><article><h3>Young, growing families</h3><p>Utah has one of the youngest populations in the country. Growing households outgrow garages fast, and a nearby unit takes the pressure off.</p></article><article><h3>Four real seasons</h3><p>Hot, dry summers and snowy winters mean you rotate gear twice a year. Storing the off season keeps your home usable.</p></article><article><h3>Room to grow</h3><p>Communities like St. George, Saratoga Springs and Herriman keep expanding, with new homes and new storage facilities opening nearby.</p></article></div>
      </section>
      <section className="state-storage-faq" aria-labelledby="utah-faq-heading">
        <div className="state-storage-heading"><h2 id="utah-faq-heading">Your Utah self storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="utah-closing-heading">
        <div><h2 id="utah-closing-heading">Compare Utah storage units near you now.</h2><p>Search 457 facilities and 4,963 available units across Utah, compare current rates side by side, and reserve the unit that fits your space and schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=Utah">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Utah</span></nav>
    </main>
  );
}
