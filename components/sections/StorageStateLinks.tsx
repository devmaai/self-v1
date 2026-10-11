import Link from "next/link";

export const STORAGE_STATES = [
  { name: "Utah", href: "/storage-search/utah" },
  { name: "California", href: "/storage-search/california" },
  { name: "New York", href: "/storage-search/new-york" },
  { name: "Missouri", href: "/storage-search/missouri" },
];

export default function StorageStateLinks() {
  return (
    <section className="storage-state-links" aria-labelledby="storage-by-state-heading">
      <div>
        <span className="storage-search-label">Explore more locations</span>
        <h2 id="storage-by-state-heading">Storage by state</h2>
      </div>
      <div className="storage-state-grid">
        {STORAGE_STATES.map((state) => (
          <Link href={state.href} key={state.name}>{state.name}</Link>
        ))}
      </div>
    </section>
  );
}
