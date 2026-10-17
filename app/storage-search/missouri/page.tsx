import type { Metadata } from "next";
import Link from "next/link";
import { isCityPublished } from "@/lib/cityStates";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Find Storage Units In Missouri Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Missouri near your location. Compare 617 facilities and 6,545 available units across Kansas City, St. Louis, Springfield, St. Charles and Independence, with current monthly prices.",
};

const CITY_LINKS = [
  "Kansas City", "St. Louis", "Springfield", "St. Charles", "Independence", "O'Fallon", "Lee's Summit", "St. Peters", "Blue Springs", "Florissant", "Chesterfield", "Wentzville", "Ballwin", "Liberty", "Lake St. Louis", "Kirkwood", "Fenton", "Raytown", "Maryland Heights", "Gladstone",
];

const PRICE_ROWS = [
  ["Locker", "$23 to $49", "A few boxes, files, seasonal clothing"],
  ["5' x 5'", "$23 to $67", "Boxes, bedding, a bike"],
  ["5' x 10'", "$45 to $90", "A single room, tools, garden equipment"],
  ["10' x 10'", "$59 to $135", "A one bedroom apartment"],
  ["10' x 15'", "$93 to $172", "A two bedroom home with appliances"],
  ["10' x 20'", "$90 to $293", "A three bedroom home or a vehicle"],
  ["10' x 30' and larger", "$259 to $472", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much does a storage unit cost in Missouri?",
    answer: "A 5x5 typically runs $23 to $67 a month. A 10x10 typically runs $59 to $135. A 10x20 typically runs $90 to $293. The average unit of any size runs around $123 a month in Independence, $127 in Springfield, $135 in Kansas City, and $153 in St. Louis.",
  },
  {
    question: "How much is a small storage unit in Missouri?",
    answer: "Locker units start at around $23 a month. A 5x5 typically runs $23 to $67, and a 5x10 typically runs $45 to $90, depending on city, climate control, and access.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or allow location access, then set a search radius. You will see every available unit within that radius with size, monthly rate, access hours, and features, so you can compare before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A locker holds a few boxes and files. A 5x5 holds bedding, boxes, and a bike. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in Missouri?",
    answer: "Humid summers and freezing winters make climate control worthwhile for furniture, electronics, documents, photographs, instruments, mattresses, and clothing. Tools, bins, lawn equipment, and vehicles are usually fine in a standard drive-up unit.",
  },
  {
    question: "Can I go to my storage unit anytime?",
    answer: "Some Missouri facilities offer 24 hour gate access, others run limited gate hours, and office hours are almost always shorter than gate hours. Filter for 24 hour access and confirm both sets of hours before you reserve.",
  },
  {
    question: "Can I pay my storage rent online?",
    answer: "Most Missouri facilities accept online payment and offer autopay, and many allow you to reserve and sign online before your first visit. Filter for online payment if you would rather not handle billing in person.",
  },
  {
    question: "How do I find cheap storage units in Missouri?",
    answer: "Compare the twelve month cost rather than the first month, check the next suburb out, ask about waived administration fees and deposits, ask for student, military, and senior rates, and reserve online rather than at the counter.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Missouri facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Can I store a boat, RV, or car in Missouri?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking, and enclosed units, with heavy demand around the lake regions through winter. Confirm the maximum permitted length and whether registration and insurance are required.",
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
    answer: "Facilities across Missouri prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks, and anything that generates odour. Drain fuel from mowers, blowers, and generators before storing them.",
  },
];

export default function MissouriStoragePage() {
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
    { name: "Missouri", path: "/storage-search/missouri" },
  ]);

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="state-storage-hero">
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>Missouri</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in Missouri near you.</em></h1>
          <p>Enter your city or ZIP code and see every storage unit available within driving distance of you. Missouri has 617 storage facilities holding 6,545 available units right now, from Kansas City across to St. Louis and down through the Ozarks. Compare monthly rates, unit sizes, access hours, and features before you leave the house.</p>
          <Link className="state-storage-cta" href="/storage-search?location=Missouri">Search Missouri storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="mo-cities-heading">
        <div className="state-storage-heading"><h2 id="mo-cities-heading">Browse low cost storage units in Missouri's top cities.</h2><p>Missouri rates vary by suburb as much as by city, and the difference between two facilities ten minutes apart is often significant. Start with your city and narrow by radius from there.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.filter((city) => isCityPublished(city.toLowerCase().replace(/'/g, "").replace(/\./g, "").replace(/ /g, "-"))).map((city) => <Link href={`/storage-search/missouri/${city.toLowerCase().replace(/'/g, "").replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">Do not see your town? Search by ZIP code and set your radius to five, ten, or twenty five miles.</p>
      </section>

      <section className="utah-pricing-section" aria-labelledby="mo-storage-heading">
        <div className="utah-pricing-heading"><h2 id="mo-storage-heading">What you will pay for a storage unit in Missouri.</h2><p className="utah-pricing-intro">Missouri sits below the national average across most unit sizes. Small units start at around $8 to $12 a month on promotional rates in St. Louis, St. Peters, and Lake St. Louis, and the average unit statewide runs well under what the same space costs on either coast.</p><p className="utah-pricing-caption">Typical monthly ranges by size across Missouri:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors">
          <p>City averages give you a benchmark. The average unit of any size now runs around $123 a month in Independence, around $127 in Springfield, around $135 in Kansas City, and around $153 in St. Louis.</p>
          <p>Within a city the spread can be just as wide. In St. Louis, Downtown West carries the lowest average rent in the city at around $77 a month, well below the citywide figure.</p>
          <h3>Five things move your price:</h3>
          <ul>
            <li>Suburb and neighbourhood. The gap between two suburbs in the same metro is often larger than the gap between Kansas City and St. Louis.</li>
            <li>Climate control. Missouri runs humid summers and freezing winters, so temperature controlled units carry a premium and are worth it for most household goods.</li>
            <li>Drive up access. Convenience costs more and saves you time on every visit.</li>
            <li>Move in offers. First month free and discounted first three month promotions run across the state.</li>
            <li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=Missouri%20storage%20prices">Compare prices near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="mo-needs-heading">
        <div className="state-storage-heading"><h2 id="mo-needs-heading">Missouri storage for every reason you need the space.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for Missouri families</h3><p>Missouri households run four distinct seasons of equipment, and most homes fill the basement and garage long before they run out of things to keep. Storage takes the overflow: patio furniture and mowers through winter, snow blowers and holiday decorations through summer, sports equipment, tools, and the furniture you are holding between houses.</p><ul><li>Clearing the garage or basement: a 5x10 holds seasonal items, tools, and sports gear.</li><li>Between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.</li><li>Look for drive up access, ground floor units, gritted and cleared drives through winter, and gate hours that suit a weekend load.</li></ul><Link href="/storage-search?location=Missouri%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging, and returns. Landscaping and seasonal services store equipment out of season, while practices and firms archive files.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with drive up access and room to load a van.</li><li>Tools and equipment: a drive up unit you can back into directly, with 24 hour gate access for early starts.</li><li>Records, samples, and electronics: a climate controlled 5x10 protects paper and hardware through humid summers. Look for month to month terms, online payment and invoicing, and autopay so billing runs without a monthly phone call.</li></ul><Link href="/storage-search?location=Missouri%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>Missouri campuses empty every summer, and moving a full room home twice a year rarely makes sense. If you are in Columbia, Springfield, St. Louis, Kansas City, Rolla, or Warrensburg, a small unit over the break usually costs less than replacing your furniture in August.</p><ul><li>Dorm or shared apartment: a locker or 5x5 takes boxes, bedding, and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Look for student rates, a facility close to campus, climate control for anything you care about, and month to month terms so you stop paying the week you return.</li></ul><Link href="/storage-search?location=Missouri%20student%20storage">Find student storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="mo-climate-heading">
        <div className="state-storage-heading"><h2 id="mo-climate-heading">Protect your belongings from Missouri humidity with climate control.</h2><p>Missouri puts stored belongings through a full annual cycle. Summers run hot and humid, winters drop well below freezing, and spring and autumn swing sharply between the two. Humidity is the part people underestimate, since it causes mould, mildew, and rust in a standard unit long before the cold does any damage.</p></div>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture, which warps in humidity and cracks in dry winter cold</li>
              <li>Mattresses, upholstery, bedding, and clothing</li>
              <li>Electronics, appliances, and anything containing a battery</li>
              <li>Photographs, artwork, vinyl records, books, and paper documents</li>
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
            <p>A standard drive up unit works well for tools, plastic bins, garden and lawn equipment, patio furniture, and vehicles. Whichever you choose, lift boxes off the floor on pallets or shelving, use breathable covers rather than sealed plastic, and leave a gap at the walls so air can move.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="mo-vehicle-heading">
        <div className="state-storage-heading"><h2 id="mo-vehicle-heading">Covered and outdoor RV, boat and vehicle storage across Missouri.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Between the Lake of the Ozarks, Table Rock, Truman Lake, and the rivers, Missouri has a high rate of boat and trailer ownership, and most subdivisions restrict keeping them at home. Winter takes them off the water for roughly half the year.</p>
            <ul>
              <li>Boats and trailers out of season. Covered or enclosed parking from October through April.</li>
              <li>RVs and campers. Outdoor parking sized to length, with easy in and out access for a long vehicle.</li>
              <li>Cars and motorcycles. An enclosed drive up unit keeps them off the street through winter.</li>
            </ul>
            <p>Filter for parking availability, gate width, and turning space, and confirm the maximum permitted length before you reserve.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=Missouri%20vehicle%20storage">Find vehicle storage near you in Missouri <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="mo-locker-heading">
        <div className="state-storage-heading"><h2 id="mo-locker-heading">Locker storage and the smallest units in Missouri.</h2><p>If you are storing less than a full room, price the locker option before you default to a 5x5. Lockers are the smallest units available, reached from an internal corridor rather than a door you drive to, and they start at around $23 a month across much of the state.</p></div>
        <div className="utah-price-factors">
          <h3>Lockers suit:</h3>
          <ul className="utah-climate-regions">
            <li>Business records and archived files</li>
            <li>Seasonal clothing and sports equipment</li>
            <li>Student belongings over the summer</li>
            <li>Anything you need out of the house but not out of reach</li>
          </ul>
          <p>Filter by size to see locker and 5x5 units side by side, since in many facilities the price gap between the two is larger than the space gap.</p>
          <Link className="state-storage-guide-button" href="/storage-search?location=Missouri%20locker%20storage">Compare locker and 5x5 units <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="mo-size-guide-heading">
        <div className="state-storage-heading"><h2 id="mo-size-guide-heading">Pick a Missouri unit size that fits your load.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p></div>
        <CardSlider trackClassName="state-size-grid">
          <article><div className="state-size-image"><Image src="/images/storage-guide/boxes.jpg" alt="Boxes and small items packed for a small storage unit" width={640} height={420} quality={90} /></div><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/threebedroom.jpg" alt="Furniture from a few rooms ready for a medium storage unit" width={640} height={420} quality={90} /></div><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><div className="state-size-image"><Image src="/images/storage-guide/fourbedroom.jpg" alt="Contents of a full home ready for a large storage unit" width={640} height={420} quality={90} /></div><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="state-policy-section" aria-label="Missouri storage rates, access, and rental terms">
        <div className="state-policy-grid">
          <article className="state-policy-card" aria-labelledby="mo-deals-heading">
            <h2 id="mo-deals-heading">Missouri storage specials and first month savings.</h2>
            <p>Missouri storage is affordable by national standards, and a little comparison can lower your cost further.</p>
            <ul><li><strong>Compare metros.</strong> Rates in Independence and Springfield often run below St. Louis and Kansas City.</li><li><strong>Look one suburb out.</strong> Prices between neighboring suburbs can differ more than any promotion.</li><li><strong>Ask about student and military rates.</strong> Discounts are common near Mizzou, Fort Leonard Wood and Whiteman Air Force Base, and they are rarely advertised.</li><li><strong>Right size first.</strong> Paying for a 10x10 when a 5x10 fits is the most common way to overpay.</li></ul>
            <Link className="state-storage-guide-button" href="/storage-search?location=Missouri%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </article>
          <article className="state-policy-card" aria-labelledby="mo-access-heading">
            <h2 id="mo-access-heading">Access hours, security, and paying your rent online in Missouri.</h2>
            <p>Missouri weather swings from humid summers to icy winters, so check access for both.</p>
            <ul><li><strong>Winter access.</strong> Ask whether drive aisles are plowed and treated for ice.</li><li><strong>Gate hours in Central Time.</strong> Confirm weekend and holiday hours as well as weekday hours.</li><li><strong>Security.</strong> Look for perimeter fencing, gated entry, cameras and good lighting.</li><li><strong>Online tools.</strong> Autopay, online reservations and app entry make your unit easier to live with.</li></ul>
            <Link className="state-storage-guide-button" href="/storage-search?location=Missouri%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </article>
          <article className="state-policy-card" aria-labelledby="mo-terms-heading">
            <h2 id="mo-terms-heading">Short stays and month to month rentals in Missouri.</h2>
            <p>Most Missouri units rent month to month, which suits a move, a renovation, a semester away or a lake season.</p>
            <ul><li><strong>Minimum rental period.</strong> Confirm whether the facility rents by the month or offers shorter stays.</li><li><strong>Notice period.</strong> Ask how many days of notice you need to give before moving out.</li><li><strong>Switching units.</strong> Ask whether you can transfer to a different size mid rental.</li><li><strong>Seasonal storage.</strong> Boat and RV owners can book covered spaces for the off season around the Ozarks lakes.</li></ul>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="mo-choose-heading">
        <div className="state-storage-heading"><h2 id="mo-choose-heading">Choosing a Missouri storage unit, step by step.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A sectional sofa, a chest freezer, or a mower decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Price the small end properly. Compare the locker against the 5x5 before you default to the larger unit.</p></article>
          <article><span>3</span><p>Decide on climate control. Humidity, not cold, is what damages most stored goods here.</p></article>
          <article><span>4</span><p>Check the next suburb out. It is usually the biggest saving on the table.</p></article>
          <article><span>5</span><p>Check access hours against your routine. Gate hours and office hours are rarely the same.</p></article>
          <article><span>6</span><p>Check winter access. Ask how the drive and the doors are cleared after snow.</p></article>
          <article><span>7</span><p>Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.</p></article>
          <article><span>8</span><p>Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.</p></article>
          <article><span>9</span><p>Set up autopay and online access. It removes the most common cause of an unexpected fee.</p></article>
          <article><span>10</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
        </div>
        <div className="state-storage-button-row"><Link className="state-storage-guide-button" href="/storage-search?location=Missouri">Find a facility and reserve online <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="state-storage-guide state-love" aria-labelledby="mo-love-heading">
        <div className="state-storage-heading"><h2 id="mo-love-heading">Why people love Missouri.</h2><p>And why so many of them need a little extra space.</p></div>
        <div className="state-size-grid"><article><h3>Two great cities</h3><p>Kansas City is known for barbecue and jazz, and St. Louis for the Gateway Arch and its historic neighborhoods. Both give you big city amenities at a lower cost of living.</p></article><article><h3>Affordable living</h3><p>Housing in Missouri often costs less than the national average, so you get more home for the money, and storage prices tend to follow.</p></article><article><h3>The Ozarks and the lakes</h3><p>Lake of the Ozarks and Table Rock Lake draw boaters and anglers every summer. Covered boat and RV storage protects your gear in the off season.</p></article><article><h3>Right in the middle</h3><p>A central location makes Missouri a natural base for road trips and for small businesses that ship across the country.</p></article><article><h3>Universities and colleges</h3><p>Mizzou in Columbia, Washington University and Saint Louis University fill up each fall, and students need a place for their things over the summer.</p></article><article><h3>Four distinct seasons</h3><p>Humid summers and cold winters mean seasonal gear rotates through the year. Climate controlled storage protects furniture and electronics from the swings.</p></article></div>
      </section>
      <section className="state-storage-faq" aria-labelledby="mo-faq-heading">
        <div className="state-storage-heading"><h2 id="mo-faq-heading">Missouri self storage FAQs.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="mo-closing-heading">
        <div><h2 id="mo-closing-heading">Find a Missouri storage unit close to you today.</h2><p>Search 617 facilities and 6,545 available units across Missouri, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=Missouri">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Missouri</span></nav>
    </main>
  );
}
