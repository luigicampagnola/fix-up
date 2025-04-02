'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { SlideImage } from './types';
import Image from 'next/image';
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface ImageSliderProps {
  slider: SlideImage[];
  position: number;
}

export default function ImageSlider({ slider, position }: ImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: position,
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='flex flex-row z-20 relative'>
      <button
        className='text-white absolute bg-black md:bg-transparent p-2 md:p-0 bg-opacity-60 md:relative top-[45%] left-0 md:left-auto md:top-auto md:z-auto z-10 text-[30px]  hover:text-forestgreen mr-5'
        onClick={scrollPrev}
      >
        {/* <FaAngleLeft /> */}
      </button>
      <div className='overflow-hidden hover:cursor-grab ' ref={emblaRef}>
        <div className='flex items-center'>
          {slider.map((slide, index) => (
            <div
              key={slide.alternativeText + index}
              className='flex-[0_0_100%] min-w-0'
            >
              <Image
                key={slide.alternativeText + index}
                src={`${slide.url}`}
                width={slide.width}
                height={slide.height}
                alt={slide.alternativeText}
              ></Image>
            </div>
          ))}
        </div>
      </div>
      <button
        className='text-white absolute bg-black md:bg-transparent p-2 md:p-0 bg-opacity-60 md:relative top-[45%] right-0 md:right-auto md:top-auto md:z-auto z-10 text-[30px]  hover:text-forestgreen ml-5'
        onClick={scrollNext}
      >
        {/* <FaAngleRight /> */}
      </button>
    </div>
  );
}
