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

export async function generateMetadata() {
  const data = await fetchSEOMetadata({ path: '/api/home' });

  return data;
}
interface HomePageProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
  sponsors: SponsorSectionProps;
  information: InformationSectionProps;
  services: ServicesSectionProps;
  highlights: HighlightsProps;
  maps: MapsSectionProps;
  cta: CtaSectionProps;
}
export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const { data } = await fetchAPI<HomePageProps>({
    path: '/api/home',
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
        sponsors: {
          fields: ['title'],
          populate: { images: ImageQueryFragment },
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
        maps: {
          fields: ['title', 'subTitle', 'description'],
          populate: {
            locations: {
              fields: ['name', 'slug', 'mapUrl'],
              populate: {
                areas: {
                  fields: ['name', 'slug'],
                },
              },
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

  const { hero, sponsors, information, services, highlights, maps, cta } = data;

  return (
    <>
      {hero && <Hero {...hero} />}
      {sponsors && <Sponsors {...sponsors} />}
      {information && <Information {...information} />}
      {services && <Services {...services} />}
      {highlights && <Highlight {...highlights} />}
      {maps && <Maps {...maps} />}
      {cta && <Cta {...cta} />}
    </>
  );
}
