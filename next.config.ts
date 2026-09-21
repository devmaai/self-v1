import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Quality values used by <Image quality={...}> across the site.
    // Required to be declared starting in Next.js 16.
    qualities: [90, 95],
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
      // The storage search page is now served at "/" (the home page); the
      // former marketing homepage moved to /agency.
      { source: "/storage-search", destination: "/", permanent: true },
      // NOTE: legacy mixed-case / &-encoded service URLs redirect to their
      // lowercase canonicals in middleware.ts (exact, case-sensitive match).
      // next.config redirects match case-insensitively and would self-loop.
    ];
  },
};

export default nextConfig;
