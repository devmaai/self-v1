import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CITY_STATES } from "@/lib/cityStates";
import { STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";

const BASE_URL = "https://selfstorage.help";

/** mtime of a file, or null when it does not exist. */
function fileMtime(absPath: string): Date | null {
  try {
    return fs.statSync(absPath).mtime;
  } catch {
    return null;
  }
}

/**
 * Stable lastModified for a static route, derived from the route's own
 * page.tsx (or the dynamic city template for city pages). Falls back to the
 * sitemap file itself so the value is identical on every request within a
 * deploy instead of changing like `new Date()` would.
 */
function routeMtime(routePath: string): Date {
  const appDir = path.join(process.cwd(), "app");
  const clean = routePath.replace(/^\/+/, "");
  const candidates = clean
    ? [path.join(appDir, clean, "page.tsx")]
    : [path.join(appDir, "page.tsx")];

  // City pages render from the [state]/[city] template.
  if (clean.startsWith("storage-search/")) {
    candidates.push(path.join(appDir, "storage-search", "[state]", "[city]", "page.tsx"));
  }

  for (const candidate of candidates) {
    const mtime = fileMtime(candidate);
    if (mtime) return mtime;
  }
  return fileMtime(path.join(appDir, "sitemap.ts")) ?? new Date("2026-01-01T00:00:00.000Z");
}

/** Stable lastModified for a blog post: frontmatter date, else md file mtime. */
function postMtime(slug: string, frontmatterDate: string): Date {
  if (frontmatterDate) {
    const parsed = new Date(frontmatterDate);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return (
    fileMtime(path.join(process.cwd(), "content", "posts", `${slug}.md`)) ??
    new Date("2026-01-01T00:00:00.000Z")
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/services/aeo-geo",
    "/services/seo-reporting",
    "/who-we-serve/independent-facility-owners",
    "/who-we-serve/multi-location-operators",
    "/who-we-serve/new-facility-openings",
    "/who-we-serve/vehicle-rv-boat-storage",
    "/who-we-serve/storage-warehouse",
    "/who-we-serve/containers",
    "/who-we-serve/furniture-depositories",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((routePath) => ({
    url: `${BASE_URL}${routePath}`,
    lastModified: routeMtime(routePath),
    changeFrequency: "weekly",
    priority: routePath === "" ? 1.0 : 0.7,
  }));

  // getAllPosts() returns only published posts, so drafts never enter the sitemap.
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: postMtime(post.slug, post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
