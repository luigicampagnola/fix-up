import { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import { HighlightsProps } from '@/components/sections/highlights';
import Information, {
  InformationSectionProps,
} from '@/components/sections/information';
import Services, { ServicesSectionProps } from '@/components/sections/services';

import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: identifier } = await params;

  const { data } = await fetchAPI<{ slug: string }[]>({
    path: '/api/areas',
    query: {
      filters: {
        slug: {
          $eq: identifier,
        },
      },
      populate: {
        location: {
          fields: ['slug'],
        },
      },
    },
  });
  const { slug } = data[0];
  const response = await fetchSEOMetadata({
    path: '/api/areas',
    basePath: `/locations/${slug}/${identifier}`,
    slug: identifier,
  });
  return response;
}

interface LocationAreaProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
  information: InformationSectionProps;
  services: ServicesSectionProps;
  highlights: HighlightsProps;
  cta: CtaSectionProps;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await fetchAPI<LocationAreaProps[]>({
    path: '/api/areas',
    query: {
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
        services: {
          fields: ['title', 'subTitle'],
          populate: {
            cards: {
              fields: ['name', 'slug', 'description', 'slug'],
              populate: {
                cover: ImageQueryFragment,
              },
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

  const { hero, information, services } = data[0];
  return (
    <>
      {hero && <Hero {...hero} />}
      {information && <Information {...information} />}
      {services && <Services {...services} />}
    </>
  );
}
