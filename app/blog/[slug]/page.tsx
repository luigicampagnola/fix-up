import Cta from '@/components/sections/cta';
import Hero from '@/components/sections/hero';
import MarkdownParser from '@/components/shared/markdown-parser';
import { formatDate } from '@/lib/utils';
import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment } from '@/utils/constants';
import { Article, SEOMetaTags } from '@/utils/types';

import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await fetchAPI<BlogsDetailsPage[]>({
    path: '/api/articles',
    query: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: ['title', 'slug', 'description'],
      populate: {
        cover: ImageQueryFragment,
      },
    },
  });
  const metaTags: Pick<
    SEOMetaTags,
    'metaTitle' | 'metaDescription' | 'metaImage'
  > = {
    metaTitle: data[0]?.title,
    metaDescription: data[0]?.description,
    metaImage: data[0]?.cover,
  };

  return await fetchSEOMetadata({
    path: '/api/articles',
    basePath: `/blog/${slug}`,
    slug: slug,
    data: metaTags,
  });
}

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
      fields: ['title', 'slug', 'description', 'publishedAt', 'body'],
      populate: {
        cover: ImageQueryFragment,
      },
    },
  });

  if (!data || data.length === 0) {
    notFound();
  }

  const { body, title, cover, publishedAt } = data[0];
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
      {body && (
        <div className='my-20 flex flex-col container justify-center items-center'>
          <MarkdownParser content={body} className='tablet:prose-lg' />
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
