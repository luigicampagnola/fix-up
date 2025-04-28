import Cta, { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import { HeroSectionProps } from '@/components/sections/hero';
import Highlight, { HighlightsProps } from '@/components/sections/highlights';
import Information, {
  InformationSectionProps,
} from '@/components/sections/information';
import { Locale } from '@/i18n/config';

import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';

import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return await fetchSEOMetadata({
    path: '/api/about',
    basePath: '/about-us',
  });
}
interface ServicesPageProps {
  id: number;
  documentID: string;
  title: string;
  hero: HeroSectionProps;
  information: InformationSectionProps;
  faqs: HighlightsProps;
  cta: CtaSectionProps;
}
export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const { data } = await fetchAPI<ServicesPageProps>({
    path: '/api/about',
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
        information: {
          fields: ['title', 'subTitle', 'description', 'displayReviews'],
        },
        faqs: {
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

  const { hero, information, faqs, cta } = data;

  return (
    <>
      {hero && <Hero {...hero} />}

      {faqs && <Highlight {...faqs} gridDisplay={true} />}
      {information && <Information {...information} />}
      {cta && <Cta {...cta} />}
    </>
  );
}
