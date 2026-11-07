"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import { resolveStorageSearchHref } from "@/lib/storageSearchLookup";

/**
 * ZIP or city search used on state pages. A known state or published city goes
 * straight to its page; anything else opens the Find storage form.
 */
export default function StateZipSearch({ id = "state-zip", className = "" }: { id?: string; className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const location = query.trim();
    if (!location) return;
    const href = resolveStorageSearchHref(location);
    router.push(href.startsWith("/storage-search?location=") ? `/find-storage?location=${encodeURIComponent(location)}` : href);
  }

  return (
    <form className={`storage-search-form state-zip-search ${className}`} onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor={id}>Enter your ZIP code or city name</label>
      <LocationPin className="storage-search-pin" />
      <input id={id} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter your ZIP code or city name" autoComplete="postal-code" />
      <button type="submit">Find units <span aria-hidden="true">→</span></button>
    </form>
  );
}
