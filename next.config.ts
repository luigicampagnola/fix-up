import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-ilbgjlh.nitrocdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-ilbgjlh.nitrocdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fixuproofing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "amazing-fireworks-dd56623770.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost:1337",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
