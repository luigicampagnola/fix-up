'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  IconChevronLeft,
  IconChevronRight,
  IconStarFilled,
} from '@tabler/icons-react';
import { Review } from '@/utils/types';

export function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  };

  return (
    <div className='relative mx-auto w-full px-4'>
      <div className='relative h-[17rem] w-full'>
        <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-between px-0'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='data-allow-shifts'
          >
            <Button
              variant='outline'
              size='icon'
              className='rounded-full shadow-sm'
              onClick={goToPrevious}
              aria-label='Previous review'
            >
              <IconChevronLeft className='h-5 w-5' />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='data-allow-shifts'
          >
            <Button
              variant='outline'
              size='icon'
              className='rounded-full shadow-sm'
              onClick={goToNext}
              aria-label='Next review'
            >
              <IconChevronRight className='h-5 w-5' />
            </Button>
          </motion.div>
        </div>

        <div className='relative h-full w-full overflow-hidden'>
          <AnimatePresence initial={false} custom={direction} mode='wait'>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={transition}
              className='absolute inset-0 px-12'
            >
              <ReviewCard review={reviews[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className='mt-2 flex justify-center gap-2'>
        {reviews.map((_, index) => (
          <motion.button
            key={index}
            className={cn(
              'h-2 rounded-full transition-all',
              currentIndex === index ? 'bg-primary' : 'bg-foreground/40'
            )}
            initial={false}
            animate={{
              width: currentIndex === index ? 16 : 8,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { name, content, rate, date } = review;
  return (
    <div className='flex h-full w-full flex-col items-center py-4 text-center'>
      <motion.div
        className='mb-2 flex'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <IconStarFilled
              className={cn(
                'h-5 w-5',
                i < rate ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
              )}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.h3
        className='mb-1 text-lg font-semibold'
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {name}
      </motion.h3>
      {date && (
        <motion.p
          className='mb-4 text-sm text-foreground/40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {formatDate({ date: date })}
        </motion.p>
      )}

      <motion.p
        className='text-foreground line-clamp-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {content}
      </motion.p>
    </div>
  );
}
