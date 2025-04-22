import ArticlesGrid from '@/components/sections/articles-grid';
import Section from '@/components/shared/section';
import { fetchAPI, fetchSEOMetadata } from '@/utils/api';
import { ImageQueryFragment } from '@/utils/constants';
import { Article, Image } from '@/utils/types';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const targetPage = page === undefined ? 1 : parseInt(page);
  const { data, meta } = await fetchAPI<Article[]>({
    path: '/api/articles',
    query: {
      pagination: {
        page: targetPage,
        pageSize: 3,
      },
      fields: ['title', 'slug', 'description', 'content', 'publishedAt'],
      populate: {
        cover: ImageQueryFragment,
        category: {
          fields: ['name', 'slug'],
        },
      },
    },
  });

  if (!data || data.length === 0 || meta === null || meta === undefined) {
    notFound();
  }
  const {
    pagination: { total },
  } = meta;

  return (
    <>
      <NuqsAdapter>
        <Section name='hero-blog' className='relative w-full h-64 bg-secondary'>
          <div className='relative container mx-auto h-full flex items-center justify-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-background'>
              BLOGS
            </h1>
          </div>
        </Section>
        <ArticlesGrid
          articles={data}
          page={targetPage}
          limit={3}
          total={total}
        />
      </NuqsAdapter>
    </>
  );
}
