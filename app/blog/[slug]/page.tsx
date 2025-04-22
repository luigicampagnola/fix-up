import Cta, { CtaSectionProps } from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import RichText, { RichTextProps } from '@/components/shared/rich-text';
import { formatDate } from '@/lib/utils';
import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment } from '@/utils/constants';
import { Article, Image } from '@/utils/types';

import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
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
interface BlogsDetailsPage extends Article {
  id: number;
  documentID: string;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchAPI<BlogsDetailsPage[]>({
    path: '/api/articles',
    query: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: ['title', 'slug', 'description', 'content', 'publishedAt'],
      populate: {
        cover: ImageQueryFragment,
      },
    },
  });

  if (!data || data.length === 0) {
    notFound();
  }

  const { content, title, cover, publishedAt } = data[0];
  const dateFormated = formatDate({ date: publishedAt });
  const tGenericCTA = await getTranslations('GenericCTA');

  return (
    <>
      {title && (
        <Hero
          title={title}
          background={cover}
          description={`Last updated: ${dateFormated}`}
          size='small'
          align='center'
          width='small'
        />
      )}
      {content && (
        <div className='my-20 flex flex-col container justify-center items-center'>
          <RichText content={content} className='tablet:prose-lg' />
        </div>
      )}
      <Cta
        title={tGenericCTA('title')}
        subtitle={tGenericCTA('subtitle')}
        description={tGenericCTA('description')}
        button={{ label: tGenericCTA('button'), url: '/estimates' }}
      />
    </>
  );
}
