import { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import { HighlightsProps } from '@/components/sections/highlights';
import Information, {
  InformationSectionProps,
} from '@/components/sections/information';
import Maps, { Location, MapsSectionProps } from '@/components/sections/maps';
import Services, { ServicesSectionProps } from '@/components/sections/services';
import { Locale } from '@/i18n/config';

import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';

import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  return await fetchSEOMetadata({
    path: '/api/locations',
    basePath: `/locations/${location}`,
    slug: location,
  });
}

interface LocationsProps extends Location {
  documentID: string;
  hero: HeroSectionProps;
  map: Omit<MapsSectionProps, 'locations'>;
  information: InformationSectionProps;
  services: ServicesSectionProps;
  highlights: HighlightsProps;
  cta: CtaSectionProps;
}

export default async function Page({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const locale = (await getLocale()) as Locale;

  const { data } = await fetchAPI<LocationsProps[]>({
    path: '/api/locations',
    query: {
      locale: locale,
      filters: {
        slug: {
          $eq: location,
        },
      },
      fields: ['name', 'slug', 'mapUrl'],
      populate: {
        areas: {
          fields: ['name', 'slug'],
        },
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
        map: {
          fields: ['title', 'subTitle', 'description'],
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

  const { hero, information, services, map, areas, name, slug, mapUrl } =
    data[0];

  const locations: Location[] = [
    { name: name, slug: slug, mapUrl: mapUrl, areas: areas },
  ];
  return (
    <>
      {hero && <Hero {...hero} />}
      {map && <Maps {...map} locations={locations} />}
      {information && <Information {...information} />}
      {services && <Services {...services} />}
    </>
  );
}
