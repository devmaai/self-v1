import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    return [
      // Serve the TinaCMS admin SPA at the clean /admin URL
      // (Next does not auto-resolve /admin to /admin/index.html).
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
