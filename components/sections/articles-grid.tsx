import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconCalendar } from '@tabler/icons-react';
import { Article } from '@/utils/types';
import { CustomImage } from '../shared/custom-image';
import { formatDate } from '@/lib/utils';
import { CustomLink } from '../shared/custom-link';
import Pagination from '../shared/pagination';

interface ArticlesGridProps {
  limit?: number;
  page: number;
  total: number;
  articles: Article[];
}

export default function ArticlesGrid({
  limit = 9,
  page = 1,
  total,
  articles,
}: ArticlesGridProps) {
  const totalPages = Math.ceil(total / limit);
  return (
    <div className='container mx-auto py-12'>
      <div className='grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8'>
        {articles.map(
          (
            { title, description, publishedAt, cover, category, slug },
            index
          ) => (
            <article
              key={`article-category-item-${index}`}
              className='relative isolate flex flex-col border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow'
            >
              <CustomLink
                url={`/blog/${slug}`}
                styled={false}
                className='absolute inset-0 z-10'
              />
              <div className='relative h-48 w-full'>
                <CustomImage {...cover} fill className='object-cover' />
                {category && (
                  <div className='absolute top-3 right-3'>
                    <Badge
                      variant='outline'
                      className='bg-muted text-foreground font-medium'
                    >
                      {category.name}
                    </Badge>
                  </div>
                )}
              </div>

              <div className='flex flex-col flex-grow p-5'>
                <h2 className='text-lg font-bold mb-2 line-clamp-2'>{title}</h2>
                <p className='text-sm mb-4 line-clamp-3'>{description}</p>
                <div className='mt-auto flex items-center text-xs text-gray-500'>
                  <IconCalendar className='h-3 w-3 mr-1' />
                  {formatDate({ date: publishedAt })}
                </div>
              </div>
            </article>
          )
        )}
      </div>
      {totalPages > 1 && (
        <div className='flex justify-center mt-12'>
          <Pagination current={page} pages={totalPages} />
        </div>
      )}
    </div>
  );
}
