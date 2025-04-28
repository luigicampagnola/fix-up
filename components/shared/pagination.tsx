'use client';
import { Button } from '../ui/button';
import { useQueryState } from 'nuqs';

interface PaginationProps {
  pages: number;
  current: number;
}
export default function Pagination({ pages, current }: PaginationProps) {
  const [, setPagination] = useQueryState('page');
  return (
    <nav className='inline-flex'>
      {Array.from({ length: pages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Button
            key={index}
            variant={current === index + 1 ? 'default' : 'outline'}
            size='sm'
            className='mx-1 h-8 w-8 p-0'
            onClick={() => {
              setPagination(pageNumber.toString(), { shallow: false });
            }}
          >
            {pageNumber}
          </Button>
        );
      })}
    </nav>
  );
}
