import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://fixuproofing.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/admin',
          '/api',
          '/content-manager',
          '/graphql',
          '/staging',
          '/testing',
          '/stagingoct',
          '/url-generator',
        ],
      },
      {
        userAgent: 'YandexBot',
        disallow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
