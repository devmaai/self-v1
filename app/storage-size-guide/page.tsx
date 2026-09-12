import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Self Storage Size Guide | Find the Right Unit by What You Store",
  description:
    "Use this self storage size guide to find the right unit for yourself. Find exactly what size you need for a single room to a full house or a car, with a size chart available across the USA",
};

const storageScenarios = [
  {
    label: "A few items",
    title: "Boxes and seasonal items",
    range: "5' x 5'",
    area: "25 sq ft",
    items: "Holiday decorations, seasonal clothing, a small dresser, a chair, and a stack of boxes.",
    fit: "Good for clearing out a closet or storing between seasons.",
    boxSize: "small",
    image: "/images/storage-guide/boxes.jpg",
  },
  {
    label: "One room set",
    title: "One room of furniture",
    range: "5' x 10'",
    area: "50 sq ft",
    items: "A full bedroom set such as a bed frame, mattress, dresser, nightstand, and around ten to fifteen boxes.",
    fit: "Good for a single room during a renovation or move.",
    boxSize: "small-wide",
    image: "/images/storage-guide/5_10.jpg",
  },
  {
    label: "Kitchen",
    title: "Kitchen appliances and contents",
    range: "5' x 5' to 5' x 10'",
    area: "25 to 50 sq ft",
    items: "A refrigerator, stove, dishwasher, microwave, and boxes of cookware and dishes.",
    fit: "Good for a kitchen remodel or an appliance upgrade.",
    boxSize: "small",
    image: "/images/storage-guide/kitchen.jpg",
  },
  {
    label: "Popular size",
    title: "Studio or one bedroom apartment",
    range: "5' x 10' to 10' x 10'",
    area: "50 to 100 sq ft",
    items: "A bed, a sofa, a dining set, appliances, and boxes.",
    fit: "Choose 5' x 10' for a sparsely furnished space and 10' x 10' for a full one bedroom. Good for a first move or a short-term stay elsewhere.",
    boxSize: "medium",
    image: "/images/storage-guide/studio.jpg",
  },
  {
    label: "Most rented",
    title: "Two bedroom apartment",
    range: "10' x 10'",
    area: "100 sq ft",
    items: "Furniture from two bedrooms, a living room, major appliances, and boxes.",
    fit: "Good for a couple or a small family in transition.",
    boxSize: "medium-wide",
    image: "/images/storage-guide/twobedroom.jpg",
  },
  {
    label: "Whole home",
    title: "Three bedroom house",
    range: "10' x 15' to 10' x 20'",
    area: "150 to 200 sq ft",
    items: "Furniture from three bedrooms, living and dining rooms, appliances, and garage items.",
    fit: "Good for a full household move or a home renovation.",
    boxSize: "large",
    image: "/images/storage-guide/threebedroom.jpg",
  },
  {
    label: "Large home",
    title: "Four to five bedroom house",
    range: "10' x 20' to 10' x 30'",
    area: "200 to 300 sq ft",
    items: "The contents of a large home, including bulky furniture, appliances, and outdoor equipment.",
    fit: "Good for a large family relocation or long-term storage.",
    boxSize: "large-wide",
    image: "/images/storage-guide/fourbedroom.jpg",
  },
  {
    label: "Vehicle",
    title: "A car or vehicle",
    range: "10' x 15' to 10' x 20'",
    area: "150 to 200 sq ft",
    items: "A sedan or compact car with room to walk around it. Larger vehicles need 10' x 20' or more.",
    fit: "Good for seasonal storage or a car you use rarely.",
    boxSize: "vehicle",
    image: "/images/storage-guide/car.jpg",
  },
];

const sizeChart = [
  ["5' x 5'", "25 sq ft", "A small closet", "A few boxes, seasonal decor, small furniture"],
  ["5' x 10'", "50 sq ft", "A large walk-in closet", "One room of furniture, a mattress set, boxes"],
  ["5' x 15'", "75 sq ft", "A small bedroom", "A one bedroom apartment with appliances"],
  ["10' x 10'", "100 sq ft", "Half a one-car garage", "Contents of a one to two bedroom apartment"],
  ["10' x 15'", "150 sq ft", "A large bedroom", "Contents of a two to three bedroom home"],
  ["10' x 20'", "200 sq ft", "A standard one-car garage", "Contents of a three to four bedroom house, or a car"],
  ["10' x 30'", "300 sq ft", "A large one-car garage", "Contents of a four to five bedroom house, vehicles"],
];

const vehicleReference = [
  ["Motorcycle", "5' x 10'"],
  ["Sedan or compact car", "10' x 15' to 10' x 20'"],
  ["SUV, truck, or van", "10' x 20'"],
  ["Larger boat or small trailer", "10' x 20' to 10' x 30'"],
];

const businessReference = [
  ["Documents and files", "5' x 5' to 5' x 10'"],
  ["Inventory and stock", "10' x 10' to 10' x 20'"],
  ["Equipment and fixtures", "10' x 20' or larger"],
];

const faqs = [
  ["What size storage unit do I need?", "Start with what you plan to store rather than the dimensions. A few boxes fit in a 5x5. One room of furniture fits in a 5x10. A one to two bedroom apartment fits in a 10x10. You can start with a small size and usually upgrade as needed."],
  ["What is the smallest storage unit size?", "The smallest common size is a 5x5, which gives you 25 square feet, about the space of a small closet. Some facilities also offer locker style units under 5x5 for a handful of boxes or documents."],
  ["What is the largest storage unit size?", "The largest standard size is usually a 10x30, which gives you 300 square feet, close to a large one-car garage. It holds the contents of a four to five bedroom house along with bulky items and vehicles. Some facilities offer even larger drive-up or warehouse-style spaces."],
  ["What can fit in a 10x10 storage unit?", "A 10x10 holds the contents of a one to two bedroom apartment: a sofa, a bed and mattress, a dining set, a dresser, major appliances such as a refrigerator and washer, and around thirty medium boxes. Stacking upward toward the 8-foot ceiling lets you fit more."],
  ["How do I measure what I need?", "List your large furniture and count your boxes, then group everything by room. Match each group to the scenarios in this guide. Remember that most units are about 8 feet tall, so you can stack boxes and lighter items to use the full height."],
  ["Are storage units a standard height?", "Most storage units have ceilings around 8 feet, which means the square footage understates how much you can hold. Stacking safely and using sturdy, uniform boxes lets you make the most of the vertical space."],
  ["How big is a 5x5 storage unit?", "A 5x5 unit measures 5 feet by 5 feet, which works out to 25 square feet of floor space. With a standard ceiling around 8 feet, that gives you roughly 200 cubic feet to work with. It compares to a small closet."],
  ["How big is a 5x10 storage unit?", "A 5x10 unit measures 5 feet by 10 feet, or 50 square feet, about the size of a large walk-in closet. It comfortably holds one room of furniture: a mattress set, a dresser, a few chairs, and ten to fifteen boxes. Many people choose this size for a single bedroom set or the contents of a studio apartment."],
  ["How big is a 10x20 storage unit?", "A 10x20 unit measures 10 feet by 20 feet, or 200 square feet, about the footprint of a standard one-car garage. It holds the contents of a three to four bedroom house, or a car with room to spare. Choose it for a full household move or to store a vehicle indoors."],
];

export default function StorageSizeGuidePage() {
  return (
    <main className="storage-size-guide-page">
      <section className="storage-size-guide-hero">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Size guide</span>
          </nav>
          <span className="storage-size-guide-eyebrow"><span /> Storage planning guide</span>
          <h1>The self storage size guide, <em>built around what you store.</em></h1>
          <p>Skip the guesswork over square footage. Tell us what you are moving, whether that is one room, a full house, or a car, and this guide points you to the unit size that fits.</p>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="size-guide-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Start with what you store</span>
          <h2 id="size-guide-heading">What size storage unit do you need?</h2>
          <p>Use these common scenarios as a starting point. Leave room for walkways and check the facility's exact dimensions before you reserve.</p>
        </div>
        <div className="storage-size-guide-grid">
          {storageScenarios.map((scenario) => (
            <article className="storage-size-card" key={scenario.title}>
              <div className={`storage-box-visual storage-box-${scenario.boxSize}`}><img src={scenario.image} alt={`${scenario.title} storage facility`} /></div>
              <span className="storage-size-card-label">{scenario.label}</span>
              <h3>{scenario.title}</h3>
              <div className="storage-size-card-range"><strong>{scenario.range}</strong><span>{scenario.area}</span></div>
              <p><strong>What fits:</strong> {scenario.items}</p>
              <p className="storage-size-card-fit">{scenario.fit}</p>
              <Link href="/storage-search">Find units <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="storage-size-chart-section" aria-labelledby="size-chart-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Quick comparison</span>
          <h2 id="size-chart-heading">Storage unit size chart</h2>
          <p>Compare common unit dimensions with familiar spaces and the belongings they typically hold.</p>
        </div>
        <div className="storage-size-table-wrap">
          <table className="storage-size-table">
            <thead><tr><th>Unit size</th><th>Square footage</th><th>Comparable to</th><th>Typically holds</th></tr></thead>
            <tbody>{sizeChart.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="storage-size-note"><strong>Note:</strong> Most units stand about 8 feet tall, so the square footage understates how much you can hold. Stacking upward with sturdy boxes lets you use the full height.</p>
      </section>

      <section className="storage-size-feature storage-size-feature-vehicle" aria-labelledby="vehicle-heading">
        <div className="storage-size-feature-copy"><span className="storage-size-guide-label">Vehicle storage</span><h2 id="vehicle-heading">What size storage unit for a car?</h2><p>For a standard sedan or compact car, a 10x15 or 10x20 unit gives you enough length to park the vehicle and still open the doors and walk around it. A 10x20 is the safer choice for larger cars, since it matches a one-car garage. For an SUV, truck, or van, plan on 10x20 or larger, and a motorcycle fits comfortably in a 5x10.</p><p>If you are storing a vehicle for several months, ask the facility whether covered or climate-controlled options are available, and confirm the driveway and door clearances before you book so your vehicle fits through the opening.</p><div className="storage-reference-list"><strong>Vehicle quick reference</strong>{vehicleReference.map((row) => <div key={row[0]}><span>{row[0]}</span><b>{row[1]}</b></div>)}</div></div>
        <div className="storage-vehicle-visual"><img src="/images/storage-guide/vehiclestorage.jpg" alt="Vehicle storage" /><span className="storage-vehicle-caption">Room to park, open doors, and walk around</span></div>
      </section>

      <section className="storage-size-feature storage-size-feature-business" aria-labelledby="business-heading">
        <div className="storage-size-feature-copy"><span className="storage-size-guide-label">Business storage</span><h2 id="business-heading">Storage for your business</h2><p>Documents and files fit in a 5x5 or 5x10, depending on how many boxes and cabinets you need to keep on hand. Retail inventory, seasonal stock, and sample products usually call for a 10x10 to 10x20, which leaves room to shelve items and reach them easily. Equipment and larger fixtures may need 10x20 or more.</p><p>If you restock often, choose a size that lets you create an aisle down the middle. That way you can reach everything without unloading the whole unit each time you visit.</p><div className="storage-reference-list"><strong>Business quick reference</strong>{businessReference.map((row) => <div key={row[0]}><span>{row[0]}</span><b>{row[1]}</b></div>)}</div></div>
      </section>

      <section className="storage-size-faq" aria-labelledby="faq-heading"><div className="storage-size-guide-heading"><span className="storage-size-guide-label">Common questions</span><h2 id="faq-heading">Frequently asked storage size questions</h2></div><div className="storage-size-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="storage-size-guide-cta">
        <div><span className="storage-size-guide-label">Ready to reserve?</span><h2>Ready to reserve the right size?</h2></div>
        <Link href="/storage-search">Check storage unit near to you <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}