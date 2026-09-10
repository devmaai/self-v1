import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";

const BASE_URL = "https://selfstorage.help";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/audit",
    "/contact",
    "/blog",
    "/storage-search",
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
    "/storage-search/salt-lake-city",
    ...["american-fork", "apple-valley", "bluffdale", "bountiful", "cedar-city", "centerville", "clearfield", "clinton", "draper", "farmington", "garden-city", "grantsville", "heber-city", "herriman", "highland", "hooper", "hurricane", "kearns", "layton", "lehi", "lindon", "logan", "magna", "midvale", "millcreek", "mountain-green", "murray", "north-logan", "north-ogden", "north-salt-lake", "ogden", "orem", "park-city", "parowan", "payson", "pleasant-grove", "providence", "provo", "richmond", "riverdale", "riverton", "roosevelt", "salt-lake-city", "sandy", "saratoga-springs", "south-jordan", "south-salt-lake", "spanish-fork", "springville", "st-george", "sunset", "syracuse", "taylorsville", "tooele", "washington", "west-bountiful", "west-jordan", "west-point", "west-valley-city", "woods-cross"].map((city) => `/storage-search/${city}`),
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
