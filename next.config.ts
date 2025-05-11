import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { Redirect } from 'next/dist/lib/load-custom-routes';
import { REDIRECTS_STATIC_QUERY } from './utils/constants';
import { GlobalSeoRedirectsReponse } from './utils/types';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-ilbgjlh.nitrocdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-ilbgjlh.nitrocdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fixuproofing.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'amazing-fireworks-dd56623770.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**',
      },
    ],
  },

  async redirects(): Promise<Redirect[]> {
    try {
      const API_URL = process.env.API_URL || 'http://localhost:1337';
      const response = await fetch(
        `${API_URL}/api/global?${REDIRECTS_STATIC_QUERY}`
      );
      const responseObject =
        ((await response.json()) as GlobalSeoRedirectsReponse) || undefined;
      if (!responseObject || !responseObject?.data) {
        return [];
      }

      const {
        data: { redirects },
      } = responseObject;
      const redirectsArray = redirects.flatMap(
        ({ source, destination, permanent }) => ({
          source,
          destination,
          permanent,
        })
      );
      console.log('redirects', redirectsArray);
      return redirectsArray;
    } catch (error) {
      console.log('ERROR_CREATE_REDIRECTS', error);
      return [];
    }
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
