"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeStorageSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = location.trim();
    if (!value) return;
    router.push(`/storage-search?location=${encodeURIComponent(value)}`);
  }

  return (
    <div className="home-storage-search">
      <div className="home-storage-search-copy">
        <strong>Looking for a storage facility?</strong>
        <span>Search by ZIP code or city to find storage options near you.</span>
      </div>
      <form onSubmit={handleSubmit} role="search">
        <label className="sr-only" htmlFor="home-storage-location">Search by ZIP code or city</label>
        <input
          id="home-storage-location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter ZIP code or city"
          autoComplete="postal-code"
        />
        <button type="submit">Find units <span aria-hidden="true">→</span></button>
      </form>
    </div>
  );
}
