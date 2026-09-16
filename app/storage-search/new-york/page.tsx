import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import ShowMoreList from "@/components/ui/ShowMoreList";
import CardSlider from "@/components/ui/CardSlider";

export const metadata: Metadata = {
  title: "Find Storage Units In New York Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in New York near your location. Compare 878 facilities and 14,766 available units across Manhattan, Brooklyn, Queens, the Bronx, Buffalo and Rochester, with current monthly prices.",
};

const CITY_LINKS = [
  "New York City", "Brooklyn", "Queens", "Manhattan", "Bronx", "Staten Island", "Yonkers", "Mount Vernon", "New Rochelle", "White Plains", "Buffalo", "Rochester", "Syracuse", "Albany", "Schenectady", "Troy", "Niagara Falls", "West Seneca", "Penfield", "Henrietta", "Clifton Park", "Spring Valley", "Hempstead", "Hicksville", "Valley Stream", "West Babylon", "Huntington Station", "Commack", "Coram",
];

const PRICE_ROWS = [
  ["Locker or 4' x 4'", "$24 to $119", "A few boxes, files, seasonal clothing"],
  ["5' x 5'", "$56 to $216", "Boxes, bedding, a bike"],
  ["5' x 10'", "$75 to $250", "A studio or a single room"],
  ["10' x 10'", "$115 to $387", "A one bedroom apartment"],
  ["10' x 15'", "$200 to $500", "A two bedroom home with appliances"],
  ["10' x 20'", "$199 to $837", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$622 to $1,805", "A four bedroom home or commercial stock"],
];

const FAQS = [
  {
    question: "How much is a storage unit per month in New York?",
    answer: "A 5x5 typically runs $56 to $216 a month. A 10x10 typically runs $115 to $387. A 10x20 typically runs $199 to $837. Upstate and outer borough markets sit at the lower end, Manhattan and inner Brooklyn at the higher end.",
  },
  {
    question: "How much is storage in NYC?",
    answer: "Across New York City, a 5x5 averages around $97 a month and a climate controlled 10x10 averages around $359. Manhattan runs higher, with 5x5 units averaging around $216, while Queens and Staten Island sit well below the city average.",
  },
  {
    question: "What is the smallest storage unit you can rent?",
    answer: "Locker units are the smallest option, often around 4x4 or smaller, reached from an internal corridor. They hold files, boxes, seasonal clothing and sports equipment, and start at around $24 a month in parts of the state.",
  },
  {
    question: "What is mini storage?",
    answer: "Mini storage refers to the smaller unit sizes, typically locker units through to 5x10. It is the most common category in New York, since most renters are storing apartment overflow rather than the contents of a house.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or allow location access, then set a search radius. You will see every available unit within that radius with size, monthly rate, access hours and features, so you can compare before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A locker holds a few boxes. A 5x5 holds bedding, boxes and a bike. A 5x10 holds a studio or single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in New York?",
    answer: "Humid summers, freezing winters and coastal salt air all affect stored goods. Choose climate control for furniture, electronics, documents, photographs, instruments and anything staying in the unit beyond a season. Most city facilities are temperature controlled as standard.",
  },
  {
    question: "Do storage units accept deliveries?",
    answer: "Some New York facilities accept packages for tenants and a number offer an on site parcel drop point. Confirm whether deliveries are accepted in your name, whether someone signs for them during office hours, and whether a fee applies.",
  },
  {
    question: "Which New York facilities offer 24 hour access?",
    answer: "Availability varies by site, and multi storey city buildings are less likely to offer it than drive up yards. Filter your search for 24 hour access and check the listed hours, shown in Eastern Time, before you reserve.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most New York facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Do I need insurance on a storage unit in New York?",
    answer: "Most facilities require proof of coverage as a condition of the lease. Check your renters or homeowners policy first, since stored goods are often already covered, then confirm what the facility accepts before buying a separate plan.",
  },
  {
    question: "Are there first month free storage deals in New York?",
    answer: "Many New York operators run a first month free or a discount across the first three months, and some offer student, military and senior rates. Current promotions appear on individual listings.",
  },
  {
    question: "What do I need to bring on move in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across New York prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odour. Drain fuel from mowers and generators before storing them.",
  },
];

export default function NewYorkStoragePage() {
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
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>New York</div>
          <h1>Find <span className="state-storage-nowrap">storage units</span><br /><em>in New York near you.</em></h1>
          <p>Enter your neighbourhood or ZIP code and see every storage unit available within reach of you. New York has 878 storage facilities holding 14,766 available units right now, from Manhattan and the outer boroughs to Long Island, the Hudson Valley and across upstate. Compare monthly rates, unit sizes, access hours and features before you leave the apartment.</p>
          <Link className="state-storage-cta" href="/storage-search?location=New%20York">Search New York storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="ny-cities-heading">
        <div className="state-storage-heading"><h2 id="ny-cities-heading">Storage units near you in New York by city</h2><p>In New York the right unit is usually the one you can reach without a car. Rates shift block by block, and a facility one subway stop further out can cost noticeably less. Start with your city or borough and narrow by radius.</p></div>
        <ShowMoreList listClassName="state-city-grid">{CITY_LINKS.map((city) => <Link href={`/storage-search/new-york/${city.toLowerCase().replace(/\./g, "").replace(/ /g, "-")}`} key={city}>Storage Units In {city}<span aria-hidden="true">→</span></Link>)}</ShowMoreList>
        <p className="state-city-caption">Do not see your neighbourhood? Search by ZIP code and set your radius to one, five or ten miles.</p>
      </section>

      <section className="utah-pricing-section" aria-labelledby="ny-storage-heading">
        <div className="utah-pricing-heading"><h2 id="ny-storage-heading">How much is a storage unit per month in New York?</h2><p className="utah-pricing-intro">New York holds the widest price gap in the country between a city unit and an upstate one. The same 5x5 that averages around $56 a month on Staten Island averages around $216 in Manhattan.</p><p className="utah-pricing-caption">Typical monthly ranges by size across New York:</p></div>
        <div className="utah-price-table-wrap">
          <table className="utah-price-table">
            <thead><tr><th scope="col">Unit size</th><th scope="col">Typical monthly rate</th><th scope="col">What it holds</th></tr></thead>
            <tbody>{PRICE_ROWS.map(([size, price, use]) => <tr key={size}><th scope="row">{size}</th><td>{price}</td><td>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="utah-price-factors">
          <p>For a sense of the regional gap, a 5x5 averages around $97 a month across New York City, around $79 in Queens, around $76 in Rochester and around $67 in Syracuse. A climate controlled 10x10 in New York City averages around $359. Across Rochester, the average unit of any size sits near $171.</p>
          <h3>Six things move your price:</h3>
          <ul>
            <li>Borough and neighbourhood. Manhattan and inner Brooklyn price well above the outer boroughs and Westchester for identical square footage.</li>
            <li>Climate control. Most city facilities are indoor and temperature controlled by default, which is built into the rate.</li>
            <li>Floor and access. Ground floor and drive up units cost more than upper floor units reached by lift.</li>
            <li>Move in offers. First month free and discounted first three month promotions run across the state.</li>
            <li>Online rate versus counter rate. Rates advertised online usually sit below the price quoted in person.</li>
            <li>Term length. Committing to six or twelve months can reduce the monthly figure at independently run facilities.</li>
          </ul>
          <Link className="state-storage-guide-button" href="/storage-search?location=New%20York%20storage%20prices">Compare prices near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ny-mini-heading">
        <div className="state-storage-heading"><h2 id="ny-mini-heading">What is mini storage, and what is the smallest unit you can rent?</h2><p>Mini storage means the small end of the range, the units built for people who need a few square feet rather than a garage. In New York this is the most rented category in the state, because most renters are storing the overflow from an apartment rather than the contents of a house.</p></div>
        <div className="utah-price-factors">
          <ul>
            <li><strong>Locker units.</strong> The smallest option available, often around 4x4 or smaller, reached from a corridor rather than a door you drive to. Good for files, a few boxes, seasonal clothing and sports equipment. These start as low as $24 a month in parts of the Bronx and run to around $119 in Manhattan buildings.</li>
            <li><strong>5x5.</strong> Roughly a small walk in wardrobe. Holds boxes, bedding, a bike, a chest of drawers.</li>
            <li><strong>5x10.</strong> Roughly a large wardrobe or a small bedroom. Holds a studio apartment including a mattress.</li>
          </ul>
          <p>If you are storing less than a full room, price the locker option before the 5x5. In city facilities the gap between the two is often significant.</p>
          <Link className="state-storage-guide-button" href="/storage-search?location=New%20York%20small%20storage">Find small storage near you <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ny-needs-heading">
        <div className="state-storage-heading"><h2 id="ny-needs-heading">Find storage in New York by what you need it for.</h2><p>Your situation decides your unit better than a size chart does.</p></div>
        <CardSlider trackClassName="utah-needs-grid utah-needs-grid-4up">
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20family.jpg" alt="Household boxes moving into a storage unit" width={980} height={653} /></div><h3>Storage for apartment renters and city households</h3><p>You are paying some of the highest rent per square foot in the country, which makes storage the cheaper way to hold what you are not using this season. Winter coats and boots. Air conditioning units in winter and radiator covers in summer. Bikes, strollers, luggage, holiday decorations. Furniture from a previous apartment you intend to use again.</p><ul><li>Seasonal rotation: a locker or 5x5 handles clothing, sports gear and appliances you swap twice a year.</li><li>Between leases: a 5x10 or 10x10 holds a studio or one bedroom while you move.</li><li>Look for a facility within walking or short cab distance, lift access, trolleys available at the door, and a loading bay if you are arriving by van.</li></ul><Link href="/storage-search?location=New%20York%20apartment%20storage">Find apartment storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/proff%20and%20small%20business.jpg" alt="Business owner organizing inventory in a storage unit" width={640} height={640} /></div><h3>Professionals and small businesses</h3><p>You need square footage without signing a commercial lease at New York rates. Online sellers hold inventory, packaging and returns. Contractors and trades store tools and materials between jobs. Studios and production crews store props and equipment between shoots. Practices and firms archive files. Market and pop up traders store stock between weekends.</p><ul><li>Inventory and stock: a 10x10 or 10x15 with lift or ground floor access and room to load.</li><li>Tools and equipment: a drive up unit in the outer boroughs or Westchester, usually cheaper than the equivalent in the city core.</li><li>Records and electronics: a climate controlled 5x10 protects paper and hardware through humid summers. Look for month to month terms, online payment and invoicing, delivery acceptance, and access hours that cover early starts.</li></ul><Link href="/storage-search?location=New%20York%20business%20storage">Find business storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/storage%20for%20students.jpg" alt="Student moving belongings into a storage unit" width={980} height={653} /></div><h3>Storage for students</h3><p>New York campuses empty on a schedule, and few students want to move a full room twice a year. If you are at a university in the city, at a SUNY campus, or at a college upstate, a small unit over the summer usually costs less than replacing your furniture in September.</p><ul><li>Dorm or shared apartment: a locker or 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.</li><li>Splitting with housemates: a 10x10 covers two rooms and divides the cost.</li><li>Away for a semester or an internship: store your furniture rather than sublet around it, and look for student rates near campus or a subway line with month to month terms.</li></ul><Link href="/storage-search?location=New%20York%20student%20storage">Find student storage near you →</Link></article>
          <article><div className="utah-needs-image"><Image src="/images/state%20pages/long%20island.jpg" alt="Garage storage unit packed with seasonal gear, furniture, and a car parked outside" width={1536} height={1024} /></div><h3>Long Island, Westchester and upstate households</h3><p>Outside the city the use case changes. You have a garage, a driveway and a basement, and you are storing seasonal equipment rather than everyday overflow. Boats and jet skis from October through April. Snow blowers, patio furniture, lawn equipment. Camping and lake gear. Furniture held between houses.</p><ul><li>Seasonal equipment: a 10x10 or 10x15 with drive up access you can load straight from the truck.</li><li>Whole house between moves: a 10x20 holds a three bedroom home.</li><li>Look for drive up doors, ploughed and gritted drives through winter, and outdoor parking if you are storing a trailer.</li></ul><Link href="/storage-search?location=New%20York%20drive%20up%20storage">Find drive up storage near you →</Link></article>
        </CardSlider>
      </section>

      <section className="utah-content-section" aria-labelledby="ny-climate-heading">
        <div className="state-storage-heading"><h2 id="ny-climate-heading">Do you need climate controlled storage in New York?</h2><p>New York runs humid summers and long freezing winters, and coastal areas add salt air to that. The combination is harder on stored belongings than either extreme alone, which is why most city facilities are indoor and temperature controlled as standard.</p></div>
        <div className="utah-climate-grid">
          <article className="utah-climate-card utah-climate-yes">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20" /><path d="M3.3 7l17.4 10" /><path d="M20.7 7L3.3 17" /><path d="M9 4l3 2.8L15 4" /><path d="M9 20l3-2.8L15 20" /></svg>
              Choose a climate controlled unit if you are storing
            </h3>
            <ul>
              <li>Wooden and leather furniture, which warps in humidity and cracks in dry winter heat</li>
              <li>Electronics, appliances and anything containing a battery</li>
              <li>Photographs, artwork, vinyl records and paper documents</li>
              <li>Musical instruments</li>
              <li>Mattresses, upholstery and clothing kept beyond one season</li>
              <li>Anything metal near the coast, where salt air accelerates corrosion</li>
            </ul>
          </article>
          <article className="utah-climate-card utah-climate-no">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M7 21v-6h10v6" /></svg>
              Standard drive-up units
            </h3>
            <div className="utah-climate-image"><Image src="/images/storage-guide/car.jpg" alt="Car parked in an open drive-up storage unit" width={1290} height={860} /></div>
            <p>A standard drive up unit works well for tools, patio furniture, plastic bins, garden equipment and vehicles. Whichever you choose, lift boxes off the floor on pallets or shelving and leave a gap between your belongings and the walls.</p>
          </article>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ny-deliveries-heading">
        <div className="state-storage-heading"><h2 id="ny-deliveries-heading">Do storage units accept deliveries in New York?</h2><p>Some do. A growing number of New York facilities accept packages on behalf of tenants, and several offer a parcel drop point on site. This matters if you sell online, if you receive stock you cannot store at home, or if your building has no doorman.</p></div>
        <div className="utah-price-factors">
          <h3>Ask three questions before you rely on it:</h3>
          <ul>
            <li>Does the facility accept deliveries addressed to me, or only to the business?</li>
            <li>Are deliveries signed for during office hours only, and where are they held?</li>
            <li>Is there a fee per parcel or a limit on volume?</li>
          </ul>
          <p>If parcel handling is central to how you work, filter for facilities with on site management rather than kiosk operated sites, since someone needs to be there to take the delivery.</p>
          <Link className="state-storage-guide-button" href="/storage-search?location=New%20York%20package%20acceptance">Find facilities that accept deliveries <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ny-vehicle-heading">
        <div className="state-storage-heading"><h2 id="ny-vehicle-heading">Vehicle, boat and RV storage in New York.</h2></div>
        <div className="utah-vehicle-block">
          <div className="utah-feature-image"><Image src="/images/storage-guide/vehiclestorage.jpg" alt="Boat and RV storage spaces" width={1536} height={1024} /></div>
          <div className="utah-vehicle-block-text">
            <p>Street parking rules, alternate side regulations and winter weather all push vehicles into storage in New York. Your options:</p>
            <ul>
              <li>Enclosed units and indoor parking. The common choice in the city for cars and motorcycles, particularly over winter.</li>
              <li>Uncovered outdoor parking. The lowest cost option on Long Island and upstate for trailers, boats and RVs.</li>
              <li>Covered parking. Protection from snow load through the winter months.</li>
            </ul>
            <p>Filter for parking availability, gate hours and vehicle length. Spaces commonly run from 20 to 45 feet, so confirm the maximum length before you reserve, and check whether current registration and insurance are required.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=New%20York%20vehicle%20storage">Find vehicle storage near you in New York <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="state-storage-guide" aria-labelledby="ny-size-guide-heading">
        <div className="state-storage-heading"><h2 id="ny-size-guide-heading">Choose a unit size with confidence.</h2><p>Use your largest item, access needs, and storage duration as your starting point.</p><Link className="state-storage-guide-button" href="/storage-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <CardSlider trackClassName="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </CardSlider>
      </section>

      <section className="utah-policy-section" aria-label="New York storage rates, access, and rental terms">
        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="ny-deals-heading">Cheap storage units and first month free deals in New York.</h2>
            <p>Promotions move constantly in New York markets, so the lowest advertised rate today may differ next week. What to look for:</p>
            <p className="utah-policy-callout">Two questions to ask before you commit: what does my rate become once the promotion ends, and is there an administration fee or a required insurance charge on top of the monthly rent. Compare the twelve month cost rather than the first month, since increases after the first few months are common.</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=New%20York%20storage%20deals">See current offers near you <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li><strong>First month free.</strong> Widely offered on new rentals across the state.</li>
              <li><strong>Discounted first three months.</strong> Common at independently run facilities.</li>
              <li><strong>Student, military and senior rates.</strong> Ask directly, since these are often unadvertised.</li>
              <li><strong>Longer term rates.</strong> Committing to six or twelve months can reduce the monthly figure.</li>
              <li><strong>One stop further out.</strong> Extending your search into the outer boroughs, Westchester or over a bridge is usually the single biggest saving available.</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block utah-policy-block-alt">
          <div className="utah-policy-text">
            <h2 id="ny-access-heading">24 hour access and security at New York storage facilities.</h2>
            <p>Access hours vary widely, and multi storey city facilities often close earlier than you expect.</p>
            <p className="utah-policy-lead">Check before you rent:</p>
            <Link className="state-storage-guide-button" href="/storage-search?location=New%20York%2024%20hour%20access">Filter for 24 hour access <span aria-hidden="true">→</span></Link>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Gate and building hours, and whether they cover your schedule, listed in Eastern Time</li>
              <li>Closing time at weekends and on public holidays</li>
              <li>Whether the site is staffed, self service or kiosk operated</li>
              <li>Perimeter security, gated entry, camera coverage and lighting</li>
              <li>Individual unit alarms and the lock type required</li>
              <li>Lift access, trolley availability and loading bay space, which decide how long each visit takes</li>
            </ul>
          </div>
        </div>

        <div className="utah-policy-block">
          <div className="utah-policy-text">
            <h2 id="ny-terms-heading">Month to month and short term storage in New York.</h2>
            <p>Most New York storage units rent month to month, which suits a move, a renovation, a semester away or a season between apartments.</p>
            <p className="utah-policy-lead">Before you sign:</p>
          </div>
          <div className="utah-policy-list">
            <ul>
              <li>Confirm the minimum rental period. Most facilities rent by the month rather than the week.</li>
              <li>Confirm the notice period required before you move out</li>
              <li>Ask whether you can transfer to a larger or smaller unit mid rental</li>
              <li>Ask how rent increases are applied and how much notice you receive</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="utah-content-section" aria-labelledby="ny-choose-heading">
        <div className="state-storage-heading"><h2 id="ny-choose-heading">How to choose a self storage unit in New York.</h2><p>Work through this before you sign anything.</p></div>
        <div className="utah-steps-grid">
          <article><span>1</span><p>Size by your largest item. A mattress, a sofa or a bike frame decides your unit more than the number of boxes.</p></article>
          <article><span>2</span><p>Price the small end properly. Compare the locker option against the 5x5 before you default to the larger unit.</p></article>
          <article><span>3</span><p>Set your radius deliberately. One stop further out is usually the biggest saving on the table.</p></article>
          <article><span>4</span><p>Check how you will actually get there. If you have no car, the walk from the subway with a load matters more than the monthly rate.</p></article>
          <article><span>5</span><p>Check the loading route. Lift capacity, trolley availability and distance from the door decide how long every visit takes.</p></article>
          <article><span>6</span><p>Check access hours against your routine. City sites often close earlier than drive up yards.</p></article>
          <article><span>7</span><p>Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.</p></article>
          <article><span>8</span><p>Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.</p></article>
          <article><span>9</span><p>Read the newest reviews. Management changes affect service more than the building does.</p></article>
        </div>
        <Link className="state-storage-guide-button" href="/storage-search?location=New%20York">Find a facility and reserve online <span aria-hidden="true">→</span></Link>
      </section>

      <section className="state-storage-faq" aria-labelledby="ny-faq-heading">
        <div className="state-storage-heading"><h2 id="ny-faq-heading">New York storage questions, answered.</h2></div>
        <ShowMoreList listClassName="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</ShowMoreList>
      </section>

      <section className="utah-closing-cta" aria-labelledby="ny-closing-heading">
        <div><h2 id="ny-closing-heading">Find storage units in New York near your location today.</h2><p>Search 878 facilities and 14,766 available units across New York, compare current rates side by side, and reserve the unit that fits your space and your schedule.</p><small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small></div>
        <Link className="state-storage-cta" href="/storage-search?location=New%20York">Search storage units near you <span aria-hidden="true">→</span></Link>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">New York</span></nav>
    </main>
  );
}
