import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback. Source files live in /public/images.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;
