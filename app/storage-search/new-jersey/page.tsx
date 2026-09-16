import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";
import { getStorageRows, priceNumber } from "@/lib/liveStorageData";

// Next.js requires a literal number here for its static route-segment-config
// analysis — it cannot be an imported constant. Keep in sync with
// STORAGE_DATA_REVALIDATE in lib/liveStorageData.ts.
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Cheap Self Storage in New Jersey | Compare Units & Prices by City",
  description: "Compare cheap self storage across New Jersey. See live unit sizes, move-in prices and availability by city, from Jersey City to the shore and South Jersey.",
};

const CITY_LINKS = [
  { name: "Jersey City", county: "Hudson", demand: "High-rise apartments with no basements, constant movement to and from New York" },
  { name: "Union City", county: "Hudson", demand: "Extreme density, walk-up apartments, households combining" },
  { name: "Atlantic City", county: "Atlantic", demand: "Seasonal shore rentals, hospitality shift work, salt air and island humidity" },
  { name: "Neptune City", county: "Monmouth", demand: "Beach gear, seasonal rental furnishings, compact shore homes" },
  { name: "Gloucester City", county: "Camden", demand: "Older rowhomes, damp basements, Philadelphia side price comparison" },
];

const SIZE_TABLE = [
  { size: "5' x 5'", holds: "Boxes, bedding, seasonal gear" },
  { size: "5' x 10'", holds: "A studio or a single bedroom" },
  { size: "10' x 10'", holds: "A one bedroom apartment" },
  { size: "10' x 15'", holds: "A two or three bedroom home" },
  { size: "10' x 20'", holds: "A full household or a vehicle" },
];

const FAQS = [
  {
    question: "How much does a storage unit cost in New Jersey?",
    answer: "Live move-in prices across the state start from {{from_price}}. New Jersey prices above the national average, with Hudson County highest, the shore counties peaking seasonally, and South Jersey the most affordable part of the state.",
  },
  {
    question: "Which part of New Jersey has the cheapest storage?",
    answer: "South Jersey generally offers the lowest rates, particularly across Camden, Gloucester, Burlington and Salem counties. Inland sites away from the shore and away from the Hudson County waterfront are consistently cheaper than comparable units nearer either.",
  },
  {
    question: "Is storage cheaper in New Jersey than New York City?",
    answer: "Usually yes, which is why many New York residents store on this side of the river. Jersey City and Union City still carry New Jersey's highest rates, so looking further toward Bayonne, Secaucus or North Bergen lowers the figure again for the same unit size.",
  },
  {
    question: "Do I need climate controlled storage in New Jersey?",
    answer: "For furniture, clothing, mattresses, books, documents, electronics and anything upholstered, yes. Humid summers, cold winters and coastal salt air all cause mildew, warping and corrosion. Tools, plastic totes, garden equipment and sports gear are fine in a standard unit.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds a large closet worth of contents. A 5x10 fits a studio or a bedroom set. A 10x10 covers a one bedroom apartment. A 10x15 handles a two or three bedroom home. A 10x20 takes a full household or a vehicle.",
  },
  {
    question: "When are storage prices lowest in New Jersey?",
    answer: "Demand peaks from late May through August with the moving season and the shore season, and eases from November through February. A late autumn or winter booking usually secures a lower ongoing monthly rate for the same unit.",
  },
  {
    question: "Can I rent a storage unit month to month in New Jersey?",
    answer: "Most facilities across the state rent month to month with no long term contract. Confirm the move-out notice period before you sign, since many require ten to fourteen days written notice and late notice generally means paying for another month.",
  },
  {
    question: "Can I store a car, boat or RV in New Jersey?",
    answer: "Yes. Outdoor parking is easier to find away from the dense northern towns, particularly in South Jersey and the inland shore counties, and it is priced by length rather than unit size. Measure including the trailer tongue and outboard before booking.",
  },
];

function fillPrice(text: string, fromPrice: string) {
  return text.replace(/\{\{from_price\}\}/g, fromPrice);
}

function priceRange(prices: number[]): [number, number] | null {
  if (!prices.length) return null;
  const sorted = [...prices].sort((first, second) => first - second);
  const low = sorted[Math.floor(sorted.length * 0.1)] ?? sorted[0];
  const high = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.9))];
  return [Math.round(low), Math.round(high)];
}

export default async function NewJerseyStoragePage() {
  const rows = await getStorageRows();
  const njRows = rows.filter((row) => row.state === "NJ");
  const prices = njRows.map((row) => priceNumber(row.price)).filter((value) => Number.isFinite(value));
  const fromPrice = prices.length ? `$${Math.min(...prices)}` : "our listed rates";
  const listingCount = njRows.length ? njRows.length.toLocaleString() : "hundreds of";
  const facilityCount = new Set(njRows.map((row) => row.facility_id)).size;

  // Prefer New Jersey's own live prices per size; fall back to the nationwide
  // sample when the in-state sample for that size is too thin to trust.
  const priceRows = SIZE_TABLE.map(({ size, holds }) => {
    const njSizePrices = njRows.filter((row) => row.size.trim() === size).map((row) => priceNumber(row.price)).filter(Number.isFinite);
    const source = njSizePrices.length >= 15 ? njSizePrices : rows.filter((row) => row.size.trim() === size).map((row) => priceNumber(row.price)).filter(Number.isFinite);
    const range = priceRange(source);
    return { size, holds, range };
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: fillPrice(faq.answer, fromPrice) },
    })),
  };

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="state-storage-hero">
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>New Jersey</div>
          <h1>Cheap <span className="state-storage-nowrap">self storage</span><br /><em>in New Jersey.</em></h1>
          <p>New Jersey is the most densely populated state in the country, and storage here is shaped by that fact more than any other. Housing stock runs to older homes without garages, walk-up apartments without basements, and shore properties that sit empty for half the year. Enter your city or ZIP code and compare live unit sizes, move-in prices and availability across {listingCount} listings statewide, then use the guidance below to work out what you should be paying and what to check before you sign.</p>
          <Link className="state-storage-cta" href="/storage-search?location=New%20Jersey">Search New Jersey storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="nj-cities-heading">
        <div className="state-storage-heading"><h2 id="nj-cities-heading">Storage units by city in New Jersey</h2><p>Start with your own town, then check one or two neighbouring markets before booking. In a state this compact, a fifteen minute drive regularly changes the monthly rate for an identical unit.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.map((city) => <Link href={`/storage-search/new-jersey/${city.name.toLowerCase().replace(/ /g, "-")}`} key={city.name}>Storage Units In {city.name}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">If your town is not listed, search by postcode above. Facilities serving the smaller boroughs almost always appear under a neighbouring municipality.</p>
        <div className="utah-price-factors">
          <ul>
            {CITY_LINKS.map((city) => <li key={city.name}><strong>{city.name}</strong> ({city.county} County): {city.demand}.</li>)}
          </ul>
        </div>
      </section>

      <section className="utah-pricing-section" aria-labelledby="nj-storage-heading">
        <div className="utah-pricing-heading">
          <h2 id="nj-storage-heading">How much does self storage cost in New Jersey?</h2>
          <p className="utah-pricing-intro">New Jersey prices above the national average, though the spread within the state is wide enough that two identical units forty minutes apart can differ substantially. Live move-in prices across the state start from {fromPrice}.</p>
          <p className="utah-pricing-caption">Typical monthly ranges by size across New Jersey:</p>
        </div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{priceRows.map(({ size, holds, range }) => <tr key={size}><th scope="row">{size}</th><td>{range ? `$${range[0]} to $${range[1]}` : "Contact facility"}</td><td>{holds}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors">
          <p>Hudson County and the towns facing Manhattan carry the highest rates in New Jersey. Jersey City, Union City, Hoboken, West New York and North Bergen all draw demand from New York residents storing on this side of the river, and that pressure shows in the monthly figure. Rates ease as you move west and south through Essex, Union and Middlesex counties.</p>
          <p>The shore counties price on a season rather than a location. Monmouth, Ocean, Atlantic and Cape May all see rates and availability tighten from late spring into summer as rentals turn over and seasonal workers arrive, then soften through the winter. Booking in October rather than May often changes the standing rate for the same unit.</p>
          <p>South Jersey is the most affordable part of the state. Camden, Gloucester, Burlington and Salem counties generally price below both the Hudson County band and the shore, and households comparing across the Delaware River often find better value on the New Jersey side.</p>
          <h3>Five things move your price:</h3>
          <ul>
            <li>Distance from the Hudson County waterfront. Rates ease sharply as you move west and south.</li>
            <li>Season, along the shore. Monmouth, Ocean, Atlantic and Cape May tighten every summer and soften every winter.</li>
            <li>Climate control. Humid summers and cold winters make it worth the premium for most household goods.</li>
            <li>Drive up versus elevator access. Dense towns lean on elevator buildings, which cost more and take longer to load.</li>
            <li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=New%20Jersey%20storage%20prices">Compare prices near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="nj-needs-heading">
        <div className="state-storage-heading"><h2 id="nj-needs-heading">Find storage in New Jersey by what you need it for.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid utah-needs-grid-4up">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/seasonal%20residents.jpg" alt="Storage unit packed with beach gear and seasonal furnishings for a Jersey Shore rental" width={1536} height={1024} /></div><h3>Storage for Jersey Shore residents and renters</h3><p>Shore properties in Monmouth, Ocean, Atlantic and Cape May counties sit empty for half the year, and what you leave behind through the off season needs somewhere drier than a garage. Storage holds furniture, beach gear and seasonal rental furnishings between tenants.</p><ul><li>Between rental seasons: a 10x10 holds the furniture from a shore rental.</li><li>Beach gear and bikes: a 5x10 covers boards, chairs, umbrellas and bikes for the whole household.</li><li>Look for climate control against salt air, month to month terms, and a facility that stays open through the off season.</li></ul><Link href="/storage-search?location=New%20Jersey%20shore%20storage">Find shore storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Family moving boxes into a storage unit" width={980} height={653} /></div><h3>Storage for New Jersey families</h3><p>Older homes without garages and walk-up apartments without basements leave New Jersey families short on space in a way newer housing stock elsewhere does not. Storage takes the overflow: seasonal clothing, holiday decorations, sports equipment, and the furniture you are holding between homes.</p><ul><li>Clearing a walk-up apartment: a 5x10 holds seasonal items and a bike.</li><li>Between homes or mid-renovation: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.</li><li>Look for ground floor or drive-up access, climate control for anything wooden or upholstered, and gate hours that suit a weekend load.</li></ul><Link href="/storage-search?location=New%20Jersey%20families">Find family storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without a commercial lease, and Hudson and Essex County rents make that math attractive. Contractors store tools and materials between jobs, online sellers hold inventory, and firms archive files rather than pay office rates for paper.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with ground floor access and room to load a van.</li><li>Tools and equipment: a drive up unit you can back into directly.</li><li>Records and electronics: a climate controlled 5x10 protects paper and hardware through humid summers.</li><li>Look for month to month terms, online payment and invoicing, and access hours that cover early starts.</li></ul><Link href="/storage-search?location=New%20Jersey%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>New Jersey campuses empty every summer, and hauling a full room home twice a year rarely makes sense. If you are at Rutgers, Princeton, Montclair State, TCNJ or Seton Hall, a small unit over the break usually costs less than replacing your furniture in September.</p><ul><li>Dorm or shared apartment: a 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Look for student rates, a facility close to campus, climate control for anything you care about, and month to month terms so you stop paying the week you return.</li></ul><Link href="/storage-search?location=New%20Jersey%20student%20storage">Find student storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="nj-climate-heading">
        <div className="state-storage-heading"><h2 id="nj-climate-heading">Climate controlled storage in New Jersey</h2><p>New Jersey gives you humid summers, cold winters and a real freeze and thaw cycle, and the swing between the two is what damages stored belongings. Summer humidity encourages mildew in fabric, cardboard, upholstery, books and clothing. Winter cold cracks vinyl and plastics, ruins batteries and makes upholstery brittle, while repeated expansion and contraction loosens joints in wood furniture and cracks leather.</p></div>
        <ul className="utah-climate-regions">
          <li><strong>Hudson County and the waterfront.</strong> Density means more items coming straight out of older, damp basements. Clean and dry everything before it goes in.</li>
          <li><strong>The shore counties.</strong> Salt air adds corrosion on top of humidity. Metal fittings, hardware, bike components and electronics all suffer over a season near the water.</li>
          <li><strong>South Jersey and inland towns.</strong> Standard humid-summer, cold-winter risk applies without the added salt air, so the same general rules cover most household goods.</li>
        </ul>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Furniture, mattresses and clothing, which take on mildew in a humid summer</li>
              <li>Electronics, documents, photographs, books and artwork</li>
              <li>Musical instruments</li>
              <li>Anything metal along the shore or bay side, where salt air adds corrosion to the list</li>
            </ul>
          </article>
          <article className="utah-climate-card utah-climate-no">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M7 21v-6h10v6" /></svg>
              Standard drive-up units
            </h3>
            <div className="utah-climate-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in an open drive-up storage unit" width={1290} height={860} /></div>
            <p>Standard units cost less and work well for plastic totes, tools, luggage, garden equipment, patio furniture, sports gear and holiday decorations. Whichever you choose, lift boxes off the floor, use breathable covers rather than sealed plastic, and leave a gap at the walls so air can move.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="nj-vehicle-heading">
        <div className="state-storage-heading"><h2 id="nj-vehicle-heading">Boat, RV, and vehicle storage in New Jersey.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Dense towns and HOA rules routinely rule out keeping a boat, RV or extra car at home in New Jersey. Outdoor parking is easier to find away from the dense northern towns, particularly in South Jersey and the inland shore counties. Your options:</p>
            <ul>
              <li>Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs.</li>
              <li>Covered parking. Shade and cover for gelcoat, seals, upholstery and tyres.</li>
              <li>Enclosed drive up units. Full protection for classic cars, motorcycles and smaller boats.</li>
            </ul>
            <p>Vehicle storage is priced by length rather than unit size. Measure including the trailer tongue and outboard, and confirm whether current registration and insurance are required before you reserve.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=New%20Jersey%20vehicle%20storage">Find boat and RV storage near you <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="nj-size-guide-heading">
        <div className="state-storage-heading"><h2 id="nj-size-guide-heading">Choose a unit size with confidence.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <CardSlider trackClassName="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
      </section>

      <section className="utah-policy-section" aria-label="New Jersey storage rates, access, and rental terms">
        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="nj-deals-heading">First month free deals and promotional pricing in New Jersey.</h2>
            <p>First-month promotions are widespread across New Jersey. What to check before the discount decides your choice for you:</p>
            <p className="utah-policy-callout">Confirm whether the price you are seeing is a promotional first-month rate, what the standing figure becomes, and how often rates are reviewed. Compare the ongoing monthly rate rather than the introductory offer alone, since the figure that matters is what you pay in month three.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=New%20Jersey%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li><strong>First month free or discounted.</strong> Common across Hudson County and the shore.</li>
              <li><strong>Off season shore bookings.</strong> Reserve in spring for shore season storage, since coastal inventory fills first.</li>
              <li><strong>Winter bookings inland.</strong> A late autumn or winter booking usually secures a lower standing rate.</li>
              <li><strong>Ask for unadvertised rates.</strong> Student, military and senior discounts are common and rarely listed.</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="nj-access-heading">Loading access and security at New Jersey storage facilities.</h2>
            <p>In dense towns the availability of a loading bay or legal parking affects your move more than a few dollars on the monthly rate.</p>
            <p className="utah-policy-lead">Check before you rent:</p>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Whether the unit is drive-up or reached by elevator, and the elevator dimensions if you are moving furniture</li>
              <li>Whether carts and dollies are provided at no charge</li>
              <li>Gate hours and office hours, which usually differ</li>
              <li>How the facility manages humidity if you are storing textiles, documents or electronics</li>
              <li>How the facility handles snow clearing if you need access through the winter</li>
              <li>Near the coast: site elevation, drainage and how access is managed during a coastal storm or nor&apos;easter</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="nj-terms-heading">Month to month storage and the lien process in New Jersey.</h2>
            <p>Most New Jersey storage units rent month to month, which suits a move, a renovation, a season away or a period between homes.</p>
            <p className="utah-policy-lead">Before you sign:</p>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Check the insurance requirement against your renters or homeowners policy, since off-premises contents cover often already applies</li>
              <li>Confirm the move-out notice period, which is commonly ten to fourteen days</li>
              <li>Read the agreement. New Jersey has a self-service storage facility statute that allows a facility to place a lien on stored goods and eventually sell them when rent goes unpaid, so ask what the late fee schedule and the notice process look like before you sign</li>
              <li>Ask how rent increases are applied and how much notice you receive</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="nj-choose-heading">
        <div className="state-storage-heading"><h2 id="nj-choose-heading">How to choose a self storage unit in New Jersey.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. Beds, sofas and appliances decide your unit more than your box count.</p></article>
          <article><span>2</span><p>Compare a few towns rather than booking the first unit near you. A fifteen minute drive regularly changes the rate.</p></article>
          <article><span>3</span><p>Decide on climate control. Humidity, cold and, near the coast, salt air are what damage stored goods here.</p></article>
          <article><span>4</span><p>Check loading access. A loading bay or legal parking matters more in dense towns than the rate itself.</p></article>
          <article><span>5</span><p>Confirm the standing rate, not the promotional one. Ask what month three costs.</p></article>
          <article><span>6</span><p>Check insurance against your renters or homeowners policy before buying a facility add-on.</p></article>
          <article><span>7</span><p>Confirm the move-out notice period, commonly ten to fourteen days in New Jersey.</p></article>
          <article><span>8</span><p>Book shore season storage early. Coastal inventory fills first heading into summer.</p></article>
        </div>
        <Link className="state-storage-guide-button" href="/storage-search?location=New%20Jersey">Find a facility and reserve online <span aria-hidden="true">→</span></Link>
      </section>

      <section className="state-storage-faq" aria-labelledby="nj-faq-heading">
        <div className="state-storage-heading"><h2 id="nj-faq-heading">New Jersey self storage FAQs</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{fillPrice(faq.answer, fromPrice)}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="nj-closing-heading">
        <div><h2 id="nj-closing-heading">Find storage units in New Jersey near your location today.</h2><p>Search {facilityCount ? `${facilityCount.toLocaleString()} facilities and ` : ""}{listingCount} available listings across New Jersey, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=New%20Jersey">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">New Jersey</span></nav>
    </main>
  );
}
