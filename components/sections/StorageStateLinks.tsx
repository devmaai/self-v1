import Link from "next/link";

export const STORAGE_STATES = [
  { name: "Utah", href: "/storage-search/utah" },
  { name: "California", href: "/storage-search/california" },
  { name: "New York", href: "/storage-search/new-york" },
  { name: "Missouri", href: "/storage-search/missouri" },
];

export default function StorageStateLinks({ label = "Explore more locations", heading = "Storage by state" }: { label?: string; heading?: string } = {}) {
  return (
    <section className="storage-state-links" aria-labelledby="storage-by-state-heading">
      <div>
        <span className="storage-search-label">{label}</span>
        <h2 id="storage-by-state-heading">{heading}</h2>
      </div>
      <div className="storage-state-grid">
        {STORAGE_STATES.map((state) => (
          <Link href={state.href} key={state.name}>{state.name}</Link>
        ))}
      </div>
    </section>
  );
}
