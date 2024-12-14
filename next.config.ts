import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "fixuproofing.com",
        port: '',
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
