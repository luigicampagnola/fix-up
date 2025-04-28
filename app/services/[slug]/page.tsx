import Cta, { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import Highlight, { HighlightsProps } from '@/components/sections/highlights';
import Information, {
  InformationSectionProps,
} from '@/components/sections/information';
import Services, { ServicesSectionProps } from '@/components/sections/services';
import { RichTextProps } from '@/components/shared/rich-text';
import { Locale } from '@/i18n/config';
import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';
import { Image } from '@/utils/types';

import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return await fetchSEOMetadata({
    path: '/api/services',
    basePath: `/services/${slug}`,
    slug: slug,
  });
}

interface ServicesPageProps {
  id: number;
  documentID: string;
  name: string;
  cover: Image;
  description: RichTextProps['content'];
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
      fields: ['name', 'description'],
      populate: {
        cover: ImageQueryFragment,
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

  const {
    hero,
    information,
    options,
    highlights,
    cta,
    name,
    description,
    cover,
  } = data[0];
  const mainHighlights = highlights[0];
  const extraHighlights = highlights.length > 1 ? highlights[1] : null;

  const tContactUs = await getTranslations('ContactUs');
  return (
    <>
      {/* Generic Page for smaller sub services with only one hero for SEO */}
      {hero ? (
        <Hero {...hero} />
      ) : (
        <Hero
          title={name}
          description={description}
          background={cover}
          cta={{ label: tContactUs('label'), url: '/estimates' }}
        />
      )}
      {/* Rest of the components */}
      {mainHighlights && <Highlight {...mainHighlights} gridDisplay={true} />}
      {information && <Information {...information} />}
      {options && <Services {...options} disableLinking={true} />}
      {extraHighlights && <Highlight {...extraHighlights} />}
      {cta && <Cta {...cta} />}
    </>
  );
}
