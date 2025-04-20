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
interface ServicesPageProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
  information: InformationSectionProps;
  options: ServicesSectionProps;
  highlights: HighlightsProps[];
  cta: CtaSectionProps;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const { data } = await fetchAPI<ServicesPageProps[]>({
    path: '/api/services',
    query: {
      locale: locale,
      filters: {
        slug: {
          $eq: slug,
        },
      },
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

  if (!data || data.length === 0) {
    notFound();
  }

  const { hero, information, options, highlights, cta } = data[0];
  const mainHighlights = highlights[0];
  const extraHighlights = highlights.length > 1 ? highlights[1] : null;
  return (
    <>
      {hero && <Hero {...hero} />}
      {mainHighlights && <Highlight {...mainHighlights} gridDisplay={true} />}
      {information && <Information {...information} />}
      {options && <Services {...options} disableLinking={true} />}
      {extraHighlights && <Highlight {...extraHighlights} />}
      {cta && <Cta {...cta} />}
    </>
  );
}
