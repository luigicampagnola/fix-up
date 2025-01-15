'use client'

import Image from "next/image";
import { ImageData, LinkData } from "./types";
import configs from "./../environment.configs";
import { useEffect, useRef, useState } from 'react';

type Option = {
  values: string;
};

export type CardWidgetProps = {
  name?: string;
  image?: ImageData;
  title?: string;
  subtitle?: string;
  options?: Option[];
  link?: LinkData;
};

export default function CardWidget({
  name,
  image,
  title,
  subtitle,
  options,
  link,
}: CardWidgetProps) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const STRAPI_URL =
    configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith("http")
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : "/placeholder.png";

  const DEFAULT_WIDTH = 1000;
  const DEFAULT_HEIGHT = 750;

  useEffect(() => {
    const observedElement = cardRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`box-widget lg:w-4/12 lg:basis-4/12 flex flex-col transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="bg-white rounded-lg flex-1 flex flex-col mb-3 md:mb-5 mx-3">
        <div>
          {image && (
            <Image
              className="rounded-lg"
              src={imageUrl}
              alt={image.alt || "Roofing image"}
              width={image?.src?.width ?? DEFAULT_WIDTH}
              height={image?.src?.height ?? DEFAULT_HEIGHT}
            />
          )}
        </div>
        <div className="px-5 md:px-8 pb-8">
          <h3 className="text-xl md:text-2xl pt-8 pb-5 text-midnightblue font-bold leading-tight">
            {title} <span className="lg:block">{subtitle}</span>
          </h3>
          <ul className="font-medium pb-5">
            {options?.map((option, index) => (
              <li
                key={`${name}-${index}`}
                className="text-sm md:text-base text-black"
              >
                {option?.values}
              </li>
            ))}
          </ul>
          {link && (
            <div className="flex">
              <a
                className="font-semibold rounded-md text-base py-3 px-5 hover:bg-midnightblue text-white bg-forestgreen capitalize leading-none"
                href={link.url}
              >
                {link.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}