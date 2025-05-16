import { fetchAPI } from '@/utils/api';
import { NextResponse } from 'next/server';

interface Service {
  name: string;
  slug: string;
  updatedAt: string;
}

interface Location {
  name: string;
  slug: string;
  areas: Area[];
}

interface Area {
  name: string;
  slug: string;
  updatedAt: string;
}

interface Article {
  title: string;
  slug: string;
  updatedAt: string;
}

export async function GET() {
  const locales = ['en-us', 'es-us'];

  // Fetch dynamic pages from Strapi
  const servicesResponse = await fetchAPI<Service[]>({
    path: '/api/services',
    query: {
      fields: ['name', 'slug'],
    },
  });
  const locationsResponse = await fetchAPI<Location[]>({
    path: '/api/locations',
    query: {
      fields: ['slug'],
      populate: {
        areas: {
          fields: ['name', 'slug'],
        },
      },
    },
  });
  const articlesResponse = await fetchAPI<Article[]>({
    path: '/api/articles',
    query: {
      fields: ['title', 'slug'],
    },
  });

  const services = servicesResponse.data || [];
  const locations = locationsResponse.data || [];
  const articles = articlesResponse.data || [];

  const staticPages = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Financing',
      path: '/financing',
    },
    {
      label: 'About Us',
      path: '/about-us',
    },
    {
      label: 'Blog',
      path: '/blog',
    },
    {
      label: 'Estimates',
      path: '/estimates',
    },
    {
      label: 'Privacy Policy',
      path: '/privacy-policy',
    },
  ];

  // Generate sitemap entries for static pages
  const staticUrls = staticPages.flatMap(({ label, path }) =>
    locales.map((locale) => ({
      label: `${label} [${locale}]`,
      path: `${path}?locale=${locale}`,
    }))
  );

  // Generate sitemap entries for services
  const serviceUrls = services.flatMap(({ name, slug }) =>
    locales.map((locale) => ({
      label: `${name} [${locale}]`,
      path: `/services/${slug}?locale=${locale}`,
    }))
  );

  // Generate sitemap entries for locations with nested areas
  const locationUrls = locations.flatMap(({ slug: locationSlug, areas }) =>
    (areas || []).flatMap(({ name, slug: areaSlug }) =>
      locales.map((locale) => ({
        label: `${name} [${locale}]`,
        path: `/locations/${locationSlug}/${areaSlug}?locale=${locale}`,
      }))
    )
  );

  // Generate sitemap entries for articles
  const articleUrls = articles.flatMap(({ title, slug }) =>
    locales.map((locale) => ({
      label: `${title} [${locale}]`,
      path: `/blog/${slug}?locale=${locale}`,
    }))
  );

  const paths = [
    ...staticUrls,
    ...serviceUrls,
    ...locationUrls,
    ...articleUrls,
  ];

  return NextResponse.json({ data: [...paths] });
}
