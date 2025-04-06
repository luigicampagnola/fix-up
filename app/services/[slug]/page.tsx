import Cta, { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import Highlight, { HighlightsProps } from '@/components/sections/highlights';
import Information, {
  InformationSectionProps,
} from '@/components/sections/information';
import Maps, { MapsSectionProps } from '@/components/sections/maps';
import Services, { ServicesSectionProps } from '@/components/sections/services';
import Sponsors, { SponsorSectionProps } from '@/components/sections/sponsors';
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
  sponsors: SponsorSectionProps;
  information: InformationSectionProps;
  options: ServicesSectionProps;
  highlights: HighlightsProps;
  maps: MapsSectionProps;
  cta: CtaSectionProps;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchAPI<ServicesPageProps[]>({
    // log: { info: 'data', style: 'stringify' },
    path: '/api/services',
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
        options: {
          fields: ['title', 'subTitle'],
          populate: {
            cards: {
              fields: ['name', 'slug', 'description', 'slug'],
              populate: {
                cover: ImageQueryFragment,
              },
            },
          },
        },
        highlights: {
          fields: ['title', 'subTitle', 'label'],
          populate: {
            items: {
              fields: ['title', 'description'],
            },
            cta: {
              fields: ['label', 'url'],
            },
          },
        },
      },
    },
  });

  if (!data || data.length === 0) {
    notFound();
  }

  const { hero, sponsors, information, options, highlights, maps, cta } =
    data[0];

  return (
    <>
      <Hero {...hero} />
      {/* <Sponsors {...sponsors} />
      <Information {...information} />
      <Services {...options} />
      <Highlight {...highlights} />
      <Maps {...maps} />
      <Cta {...cta} /> */}
    </>
  );
}
