import Link from "next/link";

const TYPES = [
  { href: "/climate-controlled-storage", title: "Climate controlled storage", body: "Steady temperature and humidity for furniture, documents and keepsakes." },
  { href: "/car-storage", title: "Car storage", body: "Indoor, covered and outdoor storage for classic, collector and spare cars." },
  { href: "/rv-storage", title: "RV storage", body: "Covered, indoor and outdoor spaces for motorhomes, trailers and campers." },
  { href: "/boat-storage", title: "Boat storage", body: "Indoor, covered and outdoor storage for boats on their trailers." },
  { href: "/business-storage", title: "Business storage", body: "Commercial storage units for inventory, documents and equipment." },
  { href: "/storage-size-guide", title: "Storage size guide", body: "Find the unit size that fits what you need to store." },
];

export default function StorageTypeLinks({ current }: { current?: string }) {
  const items = TYPES.filter((t) => t.href !== current);
  return (
    <section className="storage-type-links" aria-labelledby="storage-type-links-heading">
      <div className="storage-size-guide-heading">
        <span className="storage-size-guide-label">Explore storage types</span>
        <h2 id="storage-type-links-heading">Find the right type of storage</h2>
      </div>
      <div className="storage-type-links-grid">
        {items.map((t) => (
          <Link key={t.href} href={t.href} className="storage-type-link-card">
            <strong>{t.title}</strong>
            <span>{t.body}</span>
            <em>Learn more →</em>
          </Link>
        ))}
      </div>
    </section>
  );
}
