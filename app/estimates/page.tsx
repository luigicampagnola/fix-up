import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import { Locale } from '@/i18n/config';

import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';

import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

// export async function generateMetadata(): Promise<Metadata | undefined> {
//   const data = await fetchSEOMetadata({
//     path: '/api/home',
//   });
//   if (data) {
//     const { metaTitle, metaDescription } = data;
//     return { title: metaTitle, description: metaDescription } as Metadata;
//   }
// }
interface EstimatePageProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
}
export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const estimateResponse = await fetchAPI<EstimatePageProps>({
    path: '/api/global',
    query: {
      locale: locale,
      populate: {
        hero: {
          fields: ['title', 'subTitle', 'description'],
          populate: {
            background: ImageQueryFragment,
            cta: LinkQueryFragment,
            highlights: {
              fields: ['title'],
            },
          },
        },
      },
    },
  });
  const {
    data: { hero },
  } = estimateResponse;
  return <>{hero && <Hero {...hero} displayForm={true} size='big' />}</>;
}
