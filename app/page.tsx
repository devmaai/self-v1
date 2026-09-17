import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import CityExplorer from "@/components/sections/CityExplorer";

export const metadata: Metadata = {
  title: "Storage Search | Find A Storage Unit Near You",
  description: "Compare storage options in your area and find a space that fits your move, your budget, and your plans.",
};

const STORAGE_TYPES = [
  { icon: "box", title: "Self Storage", body: "Self-storage units are most commonly used to store personal items, furniture, and excess belongings. Units come in different sizes, from small lockers to large spaces.", href: "/storage-search?location=Self%20Storage" },
  { icon: "car", title: "Car Storage", body: "Collector, vintage, classic, or spare cars often need a space to be stored. Choose from indoor, covered, or outdoor options for the protection your vehicle needs.", href: "/storage-search?location=Car%20Storage" },
  { icon: "rv", title: "RV Storage", body: "RV storage is designed for motorhomes, travel trailers, and campers, with options such as electrical hookups, covered spaces, and wide driveways.", href: "/storage-search?location=RV%20Storage" },
  { icon: "boat", title: "Boat Storage", body: "Boat storage can be indoor, covered, or outdoor. Facilities may have restrictions on the size and type of boats they can accommodate.", href: "/storage-search?location=Boat%20Storage" },
  { icon: "climate", title: "Climate Controlled", body: "Climate-controlled self-storage protects your belongings from environmental changes by maintaining consistent temperature and humidity levels.", href: "/storage-search?location=Climate%20Controlled" },
  { icon: "business", title: "Business Storage", body: "Small businesses and entrepreneurs often need additional space to store inventory, documents, and equipment. Business storage is designed to fit those needs.", href: "/storage-search?location=Business%20Storage" },
];

type StorageTypeIconName = (typeof STORAGE_TYPES)[number]["icon"];

function StorageTypeIcon({ name }: { name: StorageTypeIconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (name === "car") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M9 29h30l-3-9H14l-5 9Z" /><path {...common} d="M12 29v5m24-5v5M15 24h18M13 34h4m14 0h4" /><circle {...common} cx="15" cy="29" r="2" /><circle {...common} cx="33" cy="29" r="2" /></svg>;
  if (name === "rv") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M8 14h25a7 7 0 0 1 7 7v12H8V14Z" /><path {...common} d="M40 26h3v7h-3M13 18h13v9H13zM17 37a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm19 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /></svg>;
  if (name === "boat") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M12 28h25l-4 8H16l-4-8Zm4 0 3-11h9l5 11M23 17v-6m0 0h8l-4 4" /><path {...common} d="M9 39c4-3 7 3 11 0 4-3 7 3 11 0 4-3 7 3 10 0" /></svg>;
  if (name === "climate") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M24 9v20M24 29a6 6 0 1 0 4 6V9a4 4 0 0 0-8 0v26a6 6 0 1 0 4-6Z" /><path {...common} d="M11 17h6m-6 7h6m14-7h6m-6 7h6" /></svg>;
  if (name === "business") return <svg viewBox="0 0 48 48" aria-hidden="true"><rect {...common} x="7" y="11" width="25" height="25" rx="2" /><path {...common} d="M14 36V19h11v17M12 16h15M36 23v13m-5-6h10m-8-5 3-3 3 3" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M8 15h32v22H8zM8 15l5-5h22l5 5M16 15v22m16-22v22M8 27h32" /><path {...common} d="M20 21h8" /></svg>;
}

const UNIT_SIZES = [
  { image: "/images/storage-guide/boxes.jpg", title: "Small Units", range: "25 to 75 SQ FT", sizes: ["5' x 5'", "5' x 10'", "5' x 15'"], looksLike: "A closet, a half bathroom, or a small bedroom.", fits: "Small furniture and personal items stored in boxes to the contents that make up a small bedroom." },
  { image: "/images/storage-guide/threebedroom.jpg", title: "Medium Units", range: "75 to 200 SQ FT", sizes: ["10' x 10'", "10' x 15'", "10' x 20'"], looksLike: "An average bedroom or a small garage depending on the unit size.", fits: "The contents of a one-bedroom apartment to the contents of a two-to-three bedroom house." },
  { image: "/images/storage-guide/fourbedroom.jpg", title: "Large Units", range: "200 to 300 SQ FT", sizes: ["10' x 25'", "10' x 30'"], looksLike: "A large bedroom to a two-car garage depending on the unit size.", fits: "The contents of a three-bedroom house or full garage to the contents of a four or five-bedroom house." },
];

export default async function StorageSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;

  return (
    <main className="storage-search-page">
      <CityExplorer initialLocation={location ?? ""} />

      <section className="storage-types" aria-labelledby="storage-types-heading">
        <div className="storage-guide-heading">
          <span className="storage-search-label">Find the right fit</span>
          <h2 id="storage-types-heading">Types of self storage</h2>
          <p>Learn more about the types of self storage to identify what type of storage unit you need.</p>
        </div>
        <div className="storage-types-grid">
          {STORAGE_TYPES.map((type) => (
            <article className="storage-type-item" key={type.title}>
              <div className="storage-type-icon"><StorageTypeIcon name={type.icon} /></div>
              <div><h3>{type.title}</h3><p>{type.body}</p><Link href={type.href}>Learn about {type.title} <span aria-hidden="true">→</span></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="unit-size-guide" className="unit-size-guide" aria-labelledby="unit-size-heading">
        <div className="storage-guide-heading">
          <span className="storage-guide-symbol" aria-hidden="true">↕</span>
          <h2 id="unit-size-heading">Picking a storage unit size</h2>
          <p>Use our storage unit size guide to identify what size storage unit you need.</p>
          <Link className="storage-guide-link" href="/storage-size-guide">View the full size guide <span aria-hidden="true">→</span></Link>
        </div>
        <div className="unit-size-grid">
          {UNIT_SIZES.map((unit) => (
            <article className="unit-size-card" key={unit.title}>
              <div className="unit-size-image"><Image src={unit.image} alt={`${unit.title} storage guide`} width={800} height={500} sizes="(max-width: 540px) 100vw, 33vw" /></div>
              <h3>{unit.title}</h3><span className="unit-size-range">{unit.range}</span>
              <div className="unit-size-tags">{unit.sizes.map((size) => <span key={size}>{size}</span>)}</div>
              <p><strong>Looks Like:</strong> {unit.looksLike}</p><p><strong>Fits:</strong> {unit.fits}</p>
            </article>
          ))}
        </div>
      </section>

      <StorageLocationSearch />

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Featured cities and storage guides</span></nav>
    </main>
  );
}
