"use client";

import { FormEvent, useState } from "react";
import LocationPin from "@/components/ui/LocationPin";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { useStorageSearchSubmit } from "@/lib/useStorageSearchSubmit";

/**
 * ZIP or city search used on state pages. A ZIP, state, or published city goes
 * straight to its page; anything else falls back to the homepage search.
 */
export default function StateZipSearch({
  id = "state-zip",
  className = "",
  defaultValue = "",
}: {
  id?: string;
  className?: string;
  defaultValue?: string;
}) {
  const { submit, pending } = useStorageSearchSubmit();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(query);
  }

  return (
    <form className={`storage-search-form state-zip-search ${className}`} onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor={id}>Enter your ZIP code or city name</label>
      <LocationPin className="storage-search-pin" />
      <LocationAutocomplete id={id} value={query} onChange={setQuery} placeholder="Enter your ZIP code or city name" />
      <button type="submit" disabled={pending}>Find units <span aria-hidden="true">→</span></button>
    </form>
  );
}
