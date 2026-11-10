"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { resolveStorageSearchDestination } from "@/lib/storageSearchLookup";

/** Shared submit handler for every location search box. */
export function useStorageSearchSubmit() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const submit = useCallback(
    async (rawQuery: string) => {
      const query = rawQuery.trim();
      if (!query || pending) return;
      setPending(true);
      try {
        router.push(await resolveStorageSearchDestination(query));
      } finally {
        // Navigation unmounts the form; this only matters if it fails.
        setPending(false);
      }
    },
    [pending, router],
  );

  return { submit, pending };
}
