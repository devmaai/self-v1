import { NextRequest, NextResponse } from "next/server";
import { CITY_STATES } from "@/lib/cityStates";
import { STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";

// City pages moved from /storage-search/{city} to /storage-search/{state}/{city}.
// Redirect old single-segment city links (bookmarks, indexed search results)
// to the new nested URL instead of letting them 404. Anything that isn't a
// known city slug (state hub pages, legacy static pages) passes through.
//
// Legacy service URLs also redirect to their lowercase canonicals here
// (exact, case-sensitive match): next.config redirects match
// case-insensitively and would self-loop /services/seo-reporting.
const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  "/services/SEO-reporting": "/services/seo-reporting",
  // Browsers and the old sitemap request this %26-encoded; Next may surface
  // the pathname either decoded (&) or still-encoded, so handle both.
  "/services/Aeo&Geo": "/services/aeo-geo",
  "/services/Aeo%26Geo": "/services/aeo-geo",
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const canonical = LEGACY_SERVICE_REDIRECTS[pathname];
  if (canonical) {
    const url = request.nextUrl.clone();
    url.pathname = canonical;
    return NextResponse.redirect(url, 308);
  }

  const citySlug = pathname.match(/^\/storage-search\/([^/]+)\/?$/)?.[1];
  if (!citySlug) return NextResponse.next();

  const state = CITY_STATES[citySlug];
  const stateSlug = state ? STATE_PAGE_SLUGS[state] : undefined;
  if (!stateSlug) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/storage-search/${stateSlug}/${citySlug}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/storage-search/:citySlug", "/services/:slug"],
};
