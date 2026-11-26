"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { resolveStorageSearchDestination } from "@/lib/storageSearchLookup";

/** "small" | "medium" | "large" bucket used by the city results unit-size filter. */
export function sizeBucket(sqFt: number) {
  if (sqFt <= 50) return "small";
  if (sqFt <= 150) return "medium";
  return "large";
}

/** Location box that sends a calculator result to city listings, pre-filtered to that size. */
export default function SizeLocationSearch({ sqFt, label }: { sqFt: number; label: string }) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = location.trim();
    if (!query || pending) return;
    setPending(true);
    try {
      const destination = await resolveStorageSearchDestination(query);
      const joiner = destination.includes("?") ? "&" : "?";
      router.push(`${destination}${joiner}size=${sizeBucket(sqFt)}`);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="size-location-search" onSubmit={onSubmit} role="search">
      <label htmlFor="size-location-input">Or browse {label} units near you</label>
      <div className="size-location-row">
        <LocationAutocomplete id="size-location-input" value={location} onChange={setLocation} placeholder="ZIP code, city, or state" />
        <button type="submit" disabled={pending}>See units <span aria-hidden="true">→</span></button>
      </div>
    </form>
  );
}
