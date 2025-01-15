"use client";

import Image from "next/image";
import { ImageData, Options } from "./types";
import configs from "./../environment.configs";
import CheckWidget2 from "./check-widget2";
import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageData;
  options?: Options[];
  position?: string;
};

export default function OptionSection2({
  title,
  subtitle,
  description,
  image,
  options,
  position,
}: Props) {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const STRAPI_URL =
    configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith("http")
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : "/placeholder.png";

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
        rootMargin: "50px",
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
    <section className="option-section bg-white w-full flex text-sm md:text-base lg:text-base font-normal text-black justify-center ">
      <div
        className={`basis-11/12 w-11/12 lg:w-10/12 xl:basis-[80%] max-w-[1140px] py-24 flex items-center lg:max-w-7xl ${
          position === "left"
            ? "flex-col-reverse xl:flex-row-reverse"
            : "flex-col lg:flex-row"
        }`}
      >
        <div
          ref={imageRef}
          className={`shadow-custom-forestgreen rounded-lg mt-5 lg:mt-0 w-full h-full xl:max-w-[414px] pr-3 
           transition-all duration-1000 ease-out
           ${
             position === "left"
               ? `opacity-0 translate-x-24 ${
                   isImageVisible ? "animate-slide-right" : ""
                 }`
               : `opacity-0 -translate-x-24 ${
                   isImageVisible ? "animate-slide-left" : ""
                 }`
           }`}
        >
          {image && title && (
            <Image
              className="rounded-lg object-cover h-full"
              src={imageUrl}
              alt={image.alt || "Imagen"}
              width={image.src.width || 1000}
              height={image.src.height || 750}
            />
          )}
        </div>
        <div
          ref={contentRef}
          className={`information ${
            position === "left" ? "xl:mr-4" : ""
          } xl:max-w-[706px] lg:px-6 
         transition-all duration-1000 ease-out
         opacity-0 translate-y-6 ${isContentVisible ? "animate-fade-up" : ""}`}
        >
          <h1 className="text-3xl md:text-5xl font-bold uppercase leading-none text-midnightblue text-center lg:text-left px-0 md:px-12 lg:px-0 mt-12">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {description && (
            <p
              className="text-center lg:text-left px-3 lg:px-0 py-7"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          )}
          <div className="flex flex-wrap">
            {options &&
              options.map((option) => (
                <CheckWidget2
                  key={option.label}
                  label={option.label}
                  description={option.description}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
