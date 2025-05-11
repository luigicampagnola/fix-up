import { fetchAPI } from '@/utils/api';
import { Redirect } from 'next/dist/lib/load-custom-routes';

interface GlobalSeoRedirects {
  redirects: Redirect[];
}
export async function GET() {
  const { data } = await fetchAPI<GlobalSeoRedirects>({
    path: '/api/global',
    query: {
      populate: {
        redirects: {
          fields: ['source', 'destination', 'permanent'],
        },
      },
    },
  });
  if (!data) {
    return [];
  }
  const { redirects } = data;
  return Response.json({ ...redirects });
}
