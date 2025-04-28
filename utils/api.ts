import 'server-only';
import qs from 'qs';
import { APIResponse, SEOMetaTags } from './types';
import { QueryStringQuery } from './qs';
import { parseLocale } from '@/lib/utils';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { i18n, Locale } from '@/i18n/config';
const API_URL = process.env.API_URL || 'http://localhost:1337';
const production = process.env.NODE_ENV !== 'development';
const isPreview = process.env.RUNTIME_ENV === 'preview' || false;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://fixuproofing.com';

interface FetchAPIProps {
  path: string;
  isCollection?: boolean;
  options?: RequestInit;
  query?: QueryStringQuery;
  log?: {
    info: 'data' | 'errors' | 'verbose' | 'none';
    style?: 'default' | 'stringify';
  };
  disableLocale?: boolean;
}

export async function fetchAPI<T>({
  path,
  options,
  query,
  log = { info: 'none' },
  disableLocale = false,
}: FetchAPIProps) {
  const parsedLocale = disableLocale
    ? {}
    : { locale: parseLocale(query?.locale) };
  const parsedQuery = qs.stringify(
    { ...query, ...parsedLocale },
    { encodeValuesOnly: true }
  );
  const url = new URL(
    `${path}${parsedQuery && '?' + parsedQuery}${
      isPreview ? '&preview=true' : ''
    }`,
    API_URL
  );
  const response = await fetch(url, {
    ...options,
    cache: isPreview ? 'no-store' : options?.cache,
  });

  if (!response.ok) {
    const contentType = response.headers.get('Content-Type');
    const requestUrl = !production ? ` Request url: ${url}` : '';
    let errorMessage = `Request failed with status ${response.status} ${requestUrl}`;

    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = `Request failed: ${JSON.stringify(
        { error: errorData },
        null,
        2
      )} ${requestUrl}`;
    } else {
      const errorText = await response.text();
      errorMessage += ` (Non-JSON response: ${errorText.slice(
        0,
        100
      )}) ${requestUrl}`;
    }

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as APIResponse<T>;
  if (log && log?.info === 'data')
    log.style === 'stringify'
      ? console.log('data', JSON.stringify(data))
      : console.log('data', data);

  if (!data) throw new Error('No data found while fetching');

  return data;
}

export async function fetchSEOSchema() {
  const t = await getTranslations('GenericSEO');

  const tAddress = t.raw('address') as {
    streetAddress: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  const tGeo = t.raw('geo') as { latitude: number; longitude: number };
  const tSocials = t.raw('socials') as {
    facebook: string;
    yelp: string;
    google: string;
  };

  const sameAs = [tSocials.facebook, tSocials.yelp, tSocials.google];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: t('businessName'),
      identifier: t('license'),
      url: BASE_URL,
      logo: `${BASE_URL}/fixup.svg`,
      sameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#localbusiness`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: tAddress.streetAddress,
        addressLocality: tAddress.city,
        addressRegion: tAddress.region,
        postalCode: tAddress.postalCode,
        addressCountry: tAddress.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: tGeo.latitude,
        longitude: tGeo.longitude,
      },
      name: t('businessName'),
      email: t('email'),
      identifier: t('license'),
      telephone: t('telephone'),
      url: BASE_URL,
      openingHours: t('openingHours'),
      image: `${BASE_URL}/opengraph-image.png`,
      description: `${t('description')} Licensed as ${t('license')}.`,
      sameAs,
      parentOrganization: {
        '@id': `${BASE_URL}/#organization`,
      },
    },
  ];
}

export async function fetchSEOMetadata({
  path,
  basePath,
  slug,
}: {
  path: string;
  basePath: string;
  slug?: string;
}): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('GenericSEO');
  const canonicalPath = basePath === '' ? '/' : basePath;
  const canonicalURL = `${BASE_URL}${basePath}?locale=${locale}`;

  const tOg = t.raw('og') as { title: string; description: string };
  const tAddress = t.raw('address') as {
    streetAddress: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  const tGeo = t.raw('geo') as { latitude: number; longitude: number };

  const defaults: Metadata = {
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalURL,
      languages: {
        'en-us': `${canonicalPath}?locale=en-us`,
        'es-us': `${canonicalPath}?locale=es-us`,
        'x-default': `${canonicalPath}?locale=${i18n.defaultLocale}`,
      },
    },
    keywords: t('keywords').split(','),
    authors: [{ name: t('author'), url: BASE_URL }],
    robots: { index: true, follow: true },
    openGraph: {
      title: tOg.title,
      description: tOg.description,
      type: 'website',
      url: canonicalURL,
      locale: locale === 'es-us' ? 'es_US' : 'en_US',
      siteName: t('siteName'),
    },
    twitter: {
      card: 'summary_large_image',
      title: tOg.title,
      description: tOg.description,
    },
    other: {
      'geo.region': `${tAddress.country}-${tAddress.region}`,
      'geo.placename': tAddress.city,
      'geo.position': `${tGeo.latitude};${tGeo.longitude}`,
      ICBM: `${tGeo.latitude};${tGeo.longitude}`,
      'og:locale:alternate': locale === 'es-us' ? 'en_US' : 'es_US',
    },
  };

  const filters = slug
    ? {
        filters: {
          slug: {
            $eq: slug,
          },
        },
      }
    : undefined;

  interface SEOResponse {
    seo: SEOMetaTags;
  }
  const { data } = await fetchAPI<SEOResponse>({
    path,
    query: {
      locale: locale,
      ...filters,
      populate: {
        seo: {
          fields: ['metaTitle', 'metaDescription', 'keywords'],
          populate: {
            metaImage: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            metaSocial: {
              fields: ['socialNetwork', 'title', 'description'],
              populate: {
                image: {
                  fields: ['url', 'alternativeText', 'width', 'height'],
                },
              },
            },
          },
        },
      },
    },
  });
  // this is on porpuse since the data is returned as an Array when a filter is passed
  const parsedDataArray = data as unknown as SEOResponse[];
  const { seo } = parsedDataArray.length > 0 ? parsedDataArray[0] : data;

  if (!seo || !seo.metaTitle) {
    return {
      ...defaults,
      title: t('title'),
      description: t('description'),
      openGraph: {
        ...defaults.openGraph,
        images: [
          {
            url: `${BASE_URL}/opengraph-image.png`,
            width: 1200,
            height: 630,
            alt: t('siteName'),
          },
        ],
      },
      twitter: {
        ...defaults.twitter,
        images: [
          {
            url: `${BASE_URL}/opengraph-image.png`,
            width: 1200,
            height: 630,
            alt: t('siteName'),
          },
        ],
      },
    };
  }

  const { metaTitle, metaDescription, metaImage, metaSocial, keywords } = seo;

  const defaultImageUrl = `${BASE_URL}/opengraph-image.png`;
  const imageUrl = metaImage?.url
    ? metaImage.url.startsWith('http')
      ? metaImage.url
      : `${BASE_URL}${metaImage.url}`
    : defaultImageUrl;

  const facebookMeta = metaSocial?.find(
    (social) => social.socialNetwork === 'Facebook'
  );
  const xMeta = metaSocial?.find((social) => social.socialNetwork === 'X');

  const facebookImageUrl = facebookMeta?.image?.url
    ? facebookMeta.image.url.startsWith('http')
      ? facebookMeta.image.url
      : `${BASE_URL}${facebookMeta.image.url}`
    : imageUrl;
  const xImageUrl = xMeta?.image?.url
    ? xMeta.image.url.startsWith('http')
      ? xMeta.image.url
      : `${BASE_URL}${xMeta.image.url}`
    : imageUrl;

  return {
    ...defaults,
    title: metaTitle,
    description: metaDescription,
    keywords: keywords ? keywords.split(',') : defaults.keywords,
    openGraph: {
      ...defaults.openGraph,
      title: facebookMeta?.title || metaTitle,
      description: facebookMeta?.description || metaDescription,
      url: canonicalURL,
      images: [
        {
          url: facebookImageUrl,
          width: facebookMeta?.image?.width || metaImage?.width || 1200,
          height: facebookMeta?.image?.height || metaImage?.height || 630,
          alt:
            facebookMeta?.image?.alternativeText ||
            metaImage?.alternativeText ||
            t('siteName'),
        },
      ],
    },
    twitter: {
      ...defaults.twitter,
      title: xMeta?.title || metaTitle,
      description: xMeta?.description || metaDescription,
      images: [
        {
          url: xImageUrl,
          width: xMeta?.image?.width || metaImage?.width || 1200,
          height: xMeta?.image?.height || metaImage?.height || 630,
          alt:
            xMeta?.image?.alternativeText ||
            metaImage?.alternativeText ||
            t('siteName'),
        },
      ],
    },
  };
}
