import Cta, { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import Highlight, { HighlightsProps } from '@/components/sections/highlights';
import Information, {
  InformationSectionProps,
} from '@/components/sections/information';

import { ServicesSectionProps } from '@/components/sections/services';
import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';

import { Metadata } from 'next';
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
interface ServicesPageProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
  information: InformationSectionProps;
  programs: ServicesSectionProps;
  steps: HighlightsProps;
  cta: CtaSectionProps;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchAPI<ServicesPageProps>({
    path: '/api/financing',
    query: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        hero: {
          fields: ['title', 'subTitle', 'description', 'displayForm'],
          populate: {
            background: ImageQueryFragment,
            cta: LinkQueryFragment,
            highlights: {
              fields: ['title'],
            },
          },
        },
        information: {
          fields: ['title', 'subTitle', 'description', 'displayReviews'],
        },
        steps: {
          fields: ['title', 'subTitle', 'label', 'description'],
          populate: {
            items: {
              fields: ['title', 'description'],
            },
            cta: {
              fields: ['label', 'url'],
            },
          },
        },
        cta: {
          fields: ['title', 'subtitle', 'description'],
          populate: {
            button: LinkQueryFragment,
          },
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  const { hero, information, steps, cta } = data;

  return (
    <>
      <Hero {...hero} />
      <Information {...information} />
      <Highlight {...steps} />
      <Cta {...cta} />
    </>
  );
}
