import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
      },
    ],
    // Temporary but very effective fix for development
    unoptimized: true,
  },
};

export default nextConfig;