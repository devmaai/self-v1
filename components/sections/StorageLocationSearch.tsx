"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import { resolveStorageSearchHref } from "@/lib/storageSearchLookup";

export default function StorageLocationSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = location.trim();
    if (!value) return;
    router.push(resolveStorageSearchHref(value));
  }

  return (
    <section className="storage-search-note" aria-labelledby="storage-location-search-heading">
      <div className="storage-search-note-mark" aria-hidden="true">+</div>
      <div className="storage-location-search-content">
        <strong id="storage-location-search-heading">Looking for a specific facility?</strong>
        <span>Search by ZIP code, city, or state to find storage options in that area.</span>
        <form className="storage-location-search-form" onSubmit={handleSubmit} role="search">
          <label className="sr-only" htmlFor="storage-location-search">Search by ZIP code, city, or state</label>
          <LocationPin className="storage-location-search-pin" />
          <input
            id="storage-location-search"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter ZIP code, city, or state"
            autoComplete="postal-code"
          />
          <button type="submit">Find units <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </section>
  );
}
