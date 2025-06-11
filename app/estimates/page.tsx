import EstimateForm from '@/components/forms/estimates';
import { HeroSectionProps } from '@/components/sections/hero';
import { CustomLink } from '@/components/shared/custom-link';
import RichText from '@/components/shared/rich-text';
import Section from '@/components/shared/section';
import { Locale } from '@/i18n/config';

import { fetchAPI } from '@/utils/api';
import { ImageQueryFragment, LinkQueryFragment } from '@/utils/constants';
import clsx from 'clsx';

import { getLocale } from 'next-intl/server';

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
    data: {
      hero: { title, subTitle, description, cta },
    },
  } = estimateResponse;
  return (
    <Section
      name="get-free-estimates"
      className={'flex flex-col items-center relative w-full h-full'}
    >
      <div
        className={' w-full flex flex-col justify-center bg-secondary py-20'}
      >
        <div
          className={
            'flex flex-col items-center container desktop:flex-row gap-14 justify-start'
          }
        >
          <div
            className={clsx(
              'flex flex-col h-full justify-center gap-4 max-w-6xl'
            )}
          >
            <h1 className="font-bold  desktop:text-left text-5xl tablet:text-6xl capitilize text-background">
              {title}
              <br />
              <span className="text-primary tablet:block">{subTitle}</span>
            </h1>
            {typeof description !== 'string' &&
            description !== undefined &&
            description !== null ? (
              <RichText
                className="text-background/90 text-base tablet:text-lg"
                content={description}
              />
            ) : (
              <p className="text-background/90 text-base tablet:text-lg">
                {description}
              </p>
            )}

            {cta && (
              <CustomLink className="mt-4 self-start" size="xl" {...cta} />
            )}
          </div>

          <div className="w-full max-w-md">
            <EstimateForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
