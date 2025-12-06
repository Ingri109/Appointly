import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects for removed legacy routes
  async redirects() {
    return [
      {
        source: '/Profile',
        destination: '/Account',
        permanent: true,
      },
      {
        source: '/Rezerwacja',
        destination: '/Booking',
        permanent: true,
      },
    ];
  },
  // Image optimization for external sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
