'use client';

import Image from 'next/image';
import { Rates } from './types';
import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaStar } from 'react-icons/fa';
import { Button } from './ui/button';

type Props = {
  rates: Rates;
};

export default function GoogleRate({ rates }: Props) {
  const [slide, setSlide] = useState(0);
  const { comments, googleLogo, label, subLabel } = rates;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % comments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [comments.length]);

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide + 1) % comments.length);
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? comments.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className='bg-background p-8 rounded-lg relative z-10 overflow-hidden shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='inline-flex gap-x-1 items-center justify-end'>
          <h4 className='text-2xl font-bold'>Our Client Reviews</h4>
        </div>
        <div className='flex flex-col justify-end items-end'>
          <Image
            className='w-24 h-7'
            src={googleLogo.url}
            alt='google-logo'
            width={90}
            height={30}
          />
          <p className='text-xs text-right tracking-tighter'>{`(${subLabel})`}</p>
        </div>
      </div>
      <div className='mt-2 relative w-full h-[10rem] overflow-x-hidden'>
        <div
          className='absolute flex transition-transform duration-700 ease-in-out w-full'
          style={{
            transform: `translateX(-${slide * 100}%)`,
          }}
        >
          {comments.map(({ comment, name, date }, index) => (
            <div
              key={`comment-${index}`}
              className='w-full flex-shrink-0 space-y-2'
            >
              <p className='text-sm border-t border-solid border-antiflaswhite line-clamp-5 text-justify'>
                {comment}
              </p>
              <div className='inline-flex flex-col'>
                <p className='text-sm font-semibold text-secondary'>{name}</p>
                <p className='text-sm text-dimgray'>{date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <Button
          aria-label='previous slide'
          className='size-10'
          variant='outline'
          rounded='full'
          onClick={prevSlide}
        >
          <FaAngleLeft className='text-muted-foborder-muted-foreground' />
        </Button>
        <Button
          aria-label='next slide'
          className='size-10'
          variant='outline'
          rounded='full'
          onClick={nextSlide}
        >
          <FaAngleRight className='text-muted-foborder-muted-foreground' />
        </Button>
      </div>
    </div>
  );
}
