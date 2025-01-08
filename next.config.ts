import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

interface WebpackBuildContext {
  buildId: string
  dev: boolean
  isServer: boolean
  defaultLoaders: { babel: any }
  webpack: typeof import('webpack')
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [
      'localhost',
      'cdn-ilbgjlh.nitrocdn.com',
      'fixuproofing.com',
      'amazing-fireworks-dd56623770.media.strapiapp.com',
      'localhost:1337',
      'maps.googleapis.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-ilbgjlh.nitrocdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'fixuproofing.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'amazing-fireworks-dd56623770.media.strapiapp.com',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost:1337'
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  webpack(config: Configuration, { isServer }: WebpackBuildContext) {
    return config
  }
}

export default nextConfig
