import type { NextConfig } from "next";

// Deployed to GitHub Pages as a static site (glass-ui.crenspire.com, via public/CNAME).
const nextConfig: NextConfig = {
  output: "export",
  // Each route becomes route/index.html, which static hosts resolve unambiguously.
  trailingSlash: true,
  // Pages has no image optimisation server.
  images: { unoptimized: true },
};

export default nextConfig;
