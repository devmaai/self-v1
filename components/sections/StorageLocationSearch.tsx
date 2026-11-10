"use client";

import { FormEvent, useState } from "react";
import LocationPin from "@/components/ui/LocationPin";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { useStorageSearchSubmit } from "@/lib/useStorageSearchSubmit";

export default function StorageLocationSearch({
  id,
  heading = "Looking for a specific facility?",
  subtext = "Search by ZIP code, city, or state to find storage options in that area.",
}: { id?: string; heading?: string; subtext?: string } = {}) {
  const { submit, pending } = useStorageSearchSubmit();
  const [location, setLocation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(location);
  }

  return (
    <section id={id} className="storage-search-note" aria-labelledby="storage-location-search-heading">
      <div className="storage-location-search-content">
        <strong id="storage-location-search-heading">{heading}</strong>
        <span>{subtext}</span>
        <form className="storage-location-search-form" onSubmit={handleSubmit} role="search">
          <label className="sr-only" htmlFor="storage-location-search">Search by ZIP code, city, or state</label>
          <LocationPin className="storage-location-search-pin" />
          <LocationAutocomplete
            id="storage-location-search"
            value={location}
            onChange={setLocation}
            placeholder="Enter ZIP code, city, or state"
          />
          <button type="submit" disabled={pending}>Find units <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </section>
  );
}
