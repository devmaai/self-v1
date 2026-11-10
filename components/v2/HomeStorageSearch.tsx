"use client";

import { FormEvent, useState } from "react";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { useStorageSearchSubmit } from "@/lib/useStorageSearchSubmit";

export default function HomeStorageSearch() {
  const { submit, pending } = useStorageSearchSubmit();
  const [location, setLocation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(location);
  }

  return (
    <div className="home-storage-search">
      <div className="home-storage-search-copy">
        <strong>Looking for a storage facility?</strong>
        <span>Search by ZIP code or city to find storage options near you.</span>
      </div>
      <form onSubmit={handleSubmit} role="search">
        <label className="sr-only" htmlFor="home-storage-location">Search by ZIP code or city</label>
        <LocationAutocomplete
          id="home-storage-location"
          value={location}
          onChange={setLocation}
          placeholder="Enter ZIP code or city"
        />
        <button type="submit" disabled={pending}>Find units <span aria-hidden="true">→</span></button>
      </form>
    </div>
  );
}
