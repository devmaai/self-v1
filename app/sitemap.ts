import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";
import { CITY_STATES } from "@/lib/cityStates";
import { STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";

const BASE_URL = "https://selfstorage.help";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/agency",
    "/audit",
    "/contact",
    "/blog",
    "/storage-search/utah",
    "/storage-search/california",
    "/storage-search/new-york",
    "/storage-search/missouri",
    "/storage-search/florida",
    "/storage-search/new-jersey",
    "/storage-search/oklahoma",
    "/storage-search/kansas",
    "/storage-search/texas",
    "/storage-search/south-dakota",
    ...Object.entries(CITY_STATES)
      .map(([citySlug, state]) => {
        const stateSlug = STATE_PAGE_SLUGS[state];
        return stateSlug ? `/storage-search/${stateSlug}/${citySlug}` : null;
      })
      .filter((path): path is string => path !== null),
    "/services/local-seo-gbp-optimization",
    "/services/technical-seo",
    "/services/content-keyword-strategy",
    "/services/multi-location-seo",
    "/services/backlinks",
    "/services/Aeo%26Geo",
    "/services/SEO-reporting",
    "/who-we-serve/independent-facility-owners",
    "/who-we-serve/multi-location-operators",
    "/who-we-serve/new-facility-openings",
    "/who-we-serve/vehicle-rv-boat-storage",
    "/who-we-serve/storage-warehouse",
    "/who-we-serve/containers",
    "/who-we-serve/furniture-depositories",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
