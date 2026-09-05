import Link from "next/link";

const STATES = [
  { name: "Utah", href: "/storage-search/utah" },
  { name: "California", href: "/storage-search?location=California" },
  { name: "New York", href: "/storage-search?location=New%20York" },
  { name: "Missouri", href: "/storage-search?location=Missouri" },
  { name: "Florida", href: "/storage-search?location=Florida" },
  { name: "New Jersey", href: "/storage-search?location=New%20Jersey" },
  { name: "Oklahoma", href: "/storage-search?location=Oklahoma" },
  { name: "Kansas", href: "/storage-search?location=Kansas" },
  { name: "Texas", href: "/storage-search?location=Texas" },
  { name: "South Dakota", href: "/storage-search?location=South%20Dakota" },
];

export default function StorageStateLinks() {
  return (
    <section className="storage-state-links" aria-labelledby="storage-by-state-heading">
      <div>
        <span className="storage-search-label">Explore more locations</span>
        <h2 id="storage-by-state-heading">Storage by state</h2>
      </div>
      <div className="storage-state-grid">
        {STATES.map((state) => (
          <Link href={state.href} key={state.name}>{state.name}</Link>
        ))}
      </div>
    </section>
  );
}
