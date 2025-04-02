'use client';

import Image from 'next/image';
import { SlideImage } from './types';
import ImageSlider from './image-slider';
import { useState } from 'react';
// import { FaTimes } from "react-icons/fa";
import ReactDOM from 'react-dom';

export interface SliderSectionProps {
  slider?: SlideImage[];
}

export default function SliderSection({ slider }: SliderSectionProps) {
  const [showSlider, setShowSlider] = useState(false);
  const [slideSelected, setSelectedSlide] = useState(0);

  const onClickSlide = (show: boolean, selected: number) => {
    setShowSlider(show);
    setSelectedSlide(selected);
  };

  return (
    <section className='flex flex-col items-center overflow-hidden relative -mt-1'>
      <div className='bg-white top-0 left-0 rounded-none w-full h-full absolute' />
      <div className='basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start lg:max-w-7xl'>
        {slider && (
          <div className='flex flex-col md:flex-row items-center w-full flex-wrap'>
            {slider.map((slide, index) => (
              <div
                key={slide.alternativeText + index}
                onClick={() => onClickSlide(!showSlider, index)}
                className='relative p-2 md:basis-6/12 md:w-6/12 lg:basis-4/12 lg:w-4/12 lg:h-[245px] overflow-hidden'
              >
                <Image
                  className='my-1 overflow-hidden'
                  src={`${slide.url}`}
                  width={slide.width}
                  height={slide.height}
                  alt={slide.alternativeText}
                ></Image>
                <div className='absolute top-0 h-full w-full bg-black opacity-0 hover:opacity-20 transition-all' />
              </div>
            ))}
            {showSlider &&
              ReactDOM.createPortal(
                <div className='fixed flex justify-center items-center top-0 right-0 z-[10000] bg-black bg-opacity-80 w-full h-full'>
                  <div className='flex flex-col w-full basis-full md:basis-11/12 md:w-11/12 lg:basis-8/12 lg:w-8/12'>
                    <div className='top-2 right-2 absolute'>
                      {/* <FaTimes
                      onClick={() => setShowSlider(false)}
                      className="text-[20px] text-white hover:text-forestgreen"
                    /> */}
                    </div>
                    <ImageSlider slider={slider} position={slideSelected} />
                    <div className='text-white text-[18px] font-bold text-center mt-10'>
                      Roofing photos projects
                    </div>
                  </div>
                </div>,
                document.body
              )}
          </div>
        )}
      </div>
    </section>
  );
}
