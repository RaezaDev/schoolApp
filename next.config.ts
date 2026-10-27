import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    const singleSchoolSlug = process.env.NEXT_PUBLIC_SINGLE_SCHOOL_SLUG;
    if (singleSchoolSlug) {
      return [
        {
          source: "/",
          destination: `/s/${singleSchoolSlug}`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
