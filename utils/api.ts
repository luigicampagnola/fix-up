import 'server-only'
import qs from 'qs';
import { APIResponse, SEOMetaTags } from './types';
import { ImageQueryFragment } from './constants';
const API_URL = process.env.API_URL || 'http://localhost:1337';
const production = process.env.NODE_ENV !== 'development';
const isPreview = process.env.RUNTIME_ENV === 'preview' || false;

export async function getPage(slug: string) {
  try {

    const res = await fetch(
      `https://amazing-fireworks-dd56623770.strapiapp.com/api/pages?filters[slug][$eq]=${slug}&populate=*`
      // `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*` // for dev
    );

    const data = await res.json();
    const page = data && data[0]; // Shows the first result

    return page || null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}



interface FetchAPIProps {
  path: string;
  isCollection?: boolean;
  options?: RequestInit;
  query?: QueryStringQuery;
  log?: {
    info: 'data' | 'errors' | 'verbose' | 'none',
    style?: 'default' | 'stringify'
  }
}

export async function fetchAPI<T>({ path, options, query, log = { info: 'none' } }: FetchAPIProps) {
  const parsedQuery = qs.stringify(query, { encodeValuesOnly: true })
  const url = new URL(`${path}${parsedQuery && '?' + parsedQuery}${isPreview ? '&preview=true' : ''}`, API_URL)
  const response = await fetch(url, { ...options, cache: isPreview ? 'no-store' : options?.cache });


  if (!response.ok) {
    const contentType = response.headers.get('Content-Type');
    const requestUrl = !production ? ` Request url: ${url}` : ''
    let errorMessage = `Request failed with status ${response.status} ${requestUrl}`;

    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = `Request failed: ${JSON.stringify({ error: errorData }, null, 2)} ${requestUrl}`;
    } else {
      const errorText = await response.text();
      errorMessage += ` (Non-JSON response: ${errorText.slice(0, 100)}) ${requestUrl}`;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json() as APIResponse<T>;
  if (log && log?.info === 'data') log.style === 'stringify' ? console.log('data', JSON.stringify(data)) : console.log('data', data);

  if (!data) throw new Error('No data found while fetching')

  return data;
}

export async function fetchSEOMetadata({ path }: { path: string }): Promise<SEOMetaTags | null> {
  const { data } = await fetchAPI<{ seo: SEOMetaTags }>({
    path: path,
    query: {
      populate: {
        seo: {
          fields: ['metaTitle', 'metaDescription'],
          populate: {
            metaImage: ImageQueryFragment
          },
        },
      },
    },
  });

  return data ? data?.seo : null;
}