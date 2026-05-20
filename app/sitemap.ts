import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { getAllPostSlugs } from "@/lib/posts";

const BASE_URL = "https://selfstorage.help";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/contact",
    "/case-studies",
    "/resources",
    "/blog",
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

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${BASE_URL}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...blogEntries];
}
