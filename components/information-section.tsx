'use client';

import Image from 'next/image';
import { ImageData, Rates, ScrollTo } from './types';
import configs from './../environment.configs';
import GoogleRate from './google-rate';
import { useEffect, useRef, useState } from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageData;
  rates?: Rates;
  button?: ScrollTo;
};

export default function InformationSection({
  title,
  subtitle,
  description,
  image,
  rates,
  button,
}: Props) {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const STRAPI_URL =
    configs.BASE_URL || 'https://amazing-fireworks-dd56623770.strapiapp.com';

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith('http')
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : '/placeholder.png';

  useEffect(() => {
    // Guardamos las referencias al inicio del efecto
    const observedImageElement = imageRef.current;
    const observedContentElement = contentRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === observedImageElement) {
              setIsImageVisible(true);
            }
            if (entry.target === observedContentElement) {
              setIsContentVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (observedImageElement) {
      observer.observe(observedImageElement);
    }
    if (observedContentElement) {
      observer.observe(observedContentElement);
    }

    return () => {
      if (observedImageElement) {
        observer.unobserve(observedImageElement);
      }
      if (observedContentElement) {
        observer.unobserve(observedContentElement);
      }
    };
  }, []);

  return (
    <section className=' w-full flex text-sm tablet:text-base desktop:text-base font-normal text-black justify-center bg-gray-300'>
      <div className='basis-11/12 w-11/12 desktop:basis-10/12 desktop:w-10/12 py-24 flex flex-wrap flex-row desktop:max-w-7xl container'>
        <div
          ref={imageRef}
          className={`mt-5 desktop:mt-0 desktop:w-5/12 desktop:basis-5/12 w-full pr-3 order-2 desktop:order-1 
           transition-all duration-1000 ease-out
           opacity-0 -translate-x-24 ${
             isImageVisible ? 'animate-slide-left' : ''
           }`}
        >
          {image?.src?.url && (
            <Image
              className='rounded-lg object-cover shadow-lg h-64 tablet:h-[530px] desktop:h-[450px]'
              src={imageUrl}
              alt={image.alt || 'Imagen'}
              width={image.src.width || 1000}
              height={image.src.height || 750}
            />
          )}
          {rates && <GoogleRate rates={rates} />}
        </div>
        <div
          ref={contentRef}
          className={`information flex flex-col w-full basis-full desktop:w-7/12 desktop:basis-7/12 desktop:px-6 order-1 desktop:order-2 desktop:mt-24
           transition-all duration-1000 ease-out
           opacity-0 translate-y-6 ${
             isContentVisible ? 'animate-fade-up' : ''
           }`}
        >
          <h1 className='text-3xl tablet:text-4xl font-bold capitalize text-secondary  px-0 '>
            {title} <span className='text-primary'>{subtitle}</span>
          </h1>
          {description && (
            <div
              className=' desktop:text-left desktop:px-0 py-7 desktop:text-lg'
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
          {button && (
            <div className='flex justify-center desktop:justify-start pb-5'>
              <button className='bg-primary rounded font-semibold text-background py-4 px-8 hover:bg-primary/90 transition-colors duration-300'>
                {button?.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
