import { NextRequest, NextResponse } from "next/server";
import { CITY_STATES } from "@/lib/cityStates";
import { STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";

// City pages moved from /storage-search/{city} to /storage-search/{state}/{city}.
// Redirect old single-segment city links (bookmarks, indexed search results)
// to the new nested URL instead of letting them 404. Anything that isn't a
// known city slug (state hub pages, legacy static pages) passes through.
export function middleware(request: NextRequest) {
  const citySlug = request.nextUrl.pathname.match(/^\/storage-search\/([^/]+)\/?$/)?.[1];
  if (!citySlug) return NextResponse.next();

  const state = CITY_STATES[citySlug];
  const stateSlug = state ? STATE_PAGE_SLUGS[state] : undefined;
  if (!stateSlug) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/storage-search/${stateSlug}/${citySlug}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/storage-search/:citySlug",
};
