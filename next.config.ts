import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "fixuproofing.com",
        port: '',
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: 'https',
        hostname: 'amazing-fireworks-dd56623770.strapiapp.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost:1337'
      }
    ],
  },
};

export default nextConfig;
