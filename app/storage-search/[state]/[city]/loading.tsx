export default function Loading() {
  return (
    <main className="city-storage-loading" aria-live="polite" aria-busy="true">
      <div className="city-storage-spinner" aria-hidden="true" />
      <p>Finding storage units near you...</p>
    </main>
  );
}