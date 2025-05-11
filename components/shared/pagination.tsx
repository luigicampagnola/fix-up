'use client';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from '@tabler/icons-react';
import { Button } from '../ui/button';
import { useQueryState } from 'nuqs';

interface PaginationProps {
  pages: number;
  current: number;
}

export default function Pagination({ pages, current }: PaginationProps) {
  const [, setPagination] = useQueryState('page');

  const handlePageChange = (pageNumber: number) => {
    setPagination(pageNumber.toString(), { shallow: false });
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];

    range.push(1);

    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(pages - 1, current + delta);

    if (rangeStart > 2) {
      range.push('ellipsis-start');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    if (rangeEnd < pages - 1) {
      range.push('ellipsis-end');
    }

    if (pages > 1) {
      range.push(pages);
    }

    return range;
  };

  if (pages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav className='flex items-center justify-center space-x-1'>
      <Button
        variant='outline'
        size='sm'
        className='h-8 w-8 p-0'
        onClick={() => handlePageChange(Math.max(1, current - 1))}
        disabled={current === 1}
        aria-label='Go to previous page'
      >
        <IconChevronLeft className='h-4 w-4' />
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <Button
              key={`${page}-${index}`}
              variant='ghost'
              size='sm'
              className='h-8 w-8 p-0 cursor-default'
              disabled
            >
              <IconPlus className='h-4 w-4' />
            </Button>
          );
        }

        const pageNumber = page as number;
        return (
          <Button
            key={index}
            variant={current === pageNumber ? 'default' : 'outline'}
            size='sm'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant='outline'
        size='sm'
        className='h-8 w-8 p-0'
        onClick={() => handlePageChange(Math.min(pages, current + 1))}
        disabled={current === pages}
        aria-label='Go to next page'
      >
        <IconChevronRight className='h-4 w-4' />
      </Button>
    </nav>
  );
}
