import { fetchAPI } from '@/utils/api';
import { MetadataRoute } from 'next';

interface Service {
  slug: string;
  updatedAt: string;
}

interface Location {
  slug: string;
  areas: Area[];
}

interface Area {
  name: string;
  slug: string;
  updatedAt: string;
}

interface Article {
  slug: string;
  updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://fixuproofing.com';
  const locales = ['en-us', 'es-us'];
  const currentDate = new Date().toISOString().split('T')[0];

  // Fetch dynamic pages from Strapi
  const servicesResponse = await fetchAPI<Service[]>({
    path: '/api/services',
    query: {
      fields: ['slug', 'updatedAt'],
    },
  });
  const locationsResponse = await fetchAPI<Location[]>({
    path: '/api/locations',
    query: {
      fields: ['slug'],
      populate: {
        areas: {
          fields: ['name', 'slug', 'updatedAt'],
        },
      },
    },
  });
  const articlesResponse = await fetchAPI<Article[]>({
    path: '/api/articles',
    query: {
      fields: ['slug', 'updatedAt'],
    },
  });

  const services = servicesResponse.data || [];
  const locations = locationsResponse.data || [];
  const articles = articlesResponse.data || [];

  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: 1.0, lastmod: currentDate },
    {
      path: '/financing',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: currentDate,
    },
    {
      path: '/about-us',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: currentDate,
    },
    {
      path: '/blog',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      path: '/estimates',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: currentDate,
    },
    {
      path: '/privacy-policy',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: currentDate,
    },
  ];

  // Generate sitemap entries for static pages
  const staticUrls = staticPages.flatMap(
    ({ path, changefreq, priority, lastmod }) =>
      locales.map(locale => ({
        url: `${BASE_URL}${path}?locale=${locale}`,
        lastModified: lastmod,
        changeFrequency: changefreq as 'daily' | 'weekly' | 'monthly',
        priority: priority,
      }))
  );

  // Generate sitemap entries for services
  const serviceUrls = services.flatMap(({ slug, updatedAt }) =>
    locales.map(locale => ({
      url: `${BASE_URL}/services/${slug}?locale=${locale}`,
      lastModified: new Date(updatedAt).toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Generate sitemap entries for locations with nested areas
  const locationUrls = locations.flatMap(({ slug: locationSlug, areas }) =>
    (areas || []).flatMap(({ slug: areaSlug, updatedAt }) =>
      locales.map(locale => ({
        url: `${BASE_URL}/locations/${locationSlug}/${areaSlug}?locale=${locale}`,
        lastModified: new Date(updatedAt).toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    )
  );

  // Generate sitemap entries for articles
  const articleUrls = articles.flatMap(({ slug, updatedAt }) =>
    locales.map(locale => ({
      url: `${BASE_URL}/blog/${slug}?locale=${locale}`,
      lastModified: new Date(updatedAt).toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticUrls, ...serviceUrls, ...locationUrls, ...articleUrls];
}
