import StateZipSearch from "@/components/sections/StateZipSearch";

/** Dark banner: "Enter your ZIP to find storage near you" with the shared search box. */
export default function StorageZipBanner({ id }: { id: string }) {
  return (
    <aside className="storage-calculator-banner storage-zip-banner" aria-label="Find storage near you">
      <p>Enter your ZIP code to find storage near you.</p>
      <StateZipSearch id={id} />
    </aside>
  );
}
