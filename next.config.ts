import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // The ZIP directory is read from disk at request time, so it has to be
  // bundled with the routes that resolve arbitrary ZIP codes.
  outputFileTracingIncludes: {
    "/api/location-search": ["./data/us-zip-codes.json"],
    "/storage-search/zip/[zip]": ["./data/us-zip-codes.json"],
  },
  images: {
    // Quality values used by <Image quality={...}> across the site.
    // Required to be declared starting in Next.js 16.
    qualities: [90, 95],
    // City photos on the homepage are served from Unsplash.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async rewrites() {
    return [
      // Serve the TinaCMS admin SPA at the clean /admin URL
      // (Next does not auto-resolve /admin to /admin/index.html).
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
  async redirects() {
    return [
      // Search queries sent to /storage-search?location=... still go to the
      // home page search. The bare /storage-search URL is the Storage by state hub.
      { source: "/storage-search", has: [{ type: "query", key: "location" }], destination: "/", permanent: false },
      // The Storage by state hub moved to /storage-state-usa.
      { source: "/storage-search", destination: "/storage-state-usa", permanent: true },
      // Keep the previous sitemap URL working while Search Console switches
      // to the standard metadata route.
      { source: "/sitemap/sitemap.xml", destination: "/sitemap.xml", permanent: true },
      // Retired blog posts: duplicate and off-topic content.
      { source: "/blog/can-you-live-in-a-storage-unit-is-it-legal", destination: "/blog/can-you-live-in-a-storage-unit", permanent: true },
      { source: "/blog/removal-costs-calculator-uk-pickfords-global-network", destination: "/blog", permanent: true },
      { source: "/blog/welcome-to-the-blog", destination: "/blog", permanent: true },
      // NOTE: legacy mixed-case / &-encoded service URLs redirect to their
      // lowercase canonicals in middleware.ts (exact, case-sensitive match).
      // next.config redirects match case-insensitively and would self-loop.
    ];
  },
};

export default nextConfig;
