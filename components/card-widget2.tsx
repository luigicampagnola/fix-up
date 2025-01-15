"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageData, LinkData } from "./types";
import configs from "../environment.configs";

type Option = {
  values: string;
};

export type CardWidget2Props = {
  name?: string;
  image?: ImageData;
  title?: string;
  subtitle?: string;
  options?: Option[];
  link?: LinkData;
};

export default function CardWidget2({
  name,
  image,
  title,
  subtitle,
  options,
  link,
}: CardWidget2Props) {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const element = document.querySelector(`[data-id="${name}"]`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [name]);

  return (
    <div
      className={`box-widget lg:w-6/12 lg:basis-6/12 flex flex-col transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      data-id={name}
    >
      <div className="bg-white rounded-lg flex-1 flex flex-col mb-[10px] md:mb-[20px] mx-[10px]">
        <div className="image">
          {image && (
            <Image
              className="rounded-lg"
              src={imageUrl}
              alt={image.alt || "Roofing image"}
              width={DEFAULT_WIDTH}
              height={DEFAULT_HEIGHT}
            />
          )}
        </div>
        <div className="px-[20px] md:px-[30px] pb-[30px]">
          <h3 className="text-[20px] md:text-[23px] pt-[15px] pb-[15px] text-midnightblue font-bold leading-tight">
            {title} <span className="lg:block">{subtitle}</span>
          </h3>
          <ul className="font-medium">
            {options?.map((option, index) => (
              <li
                key={`${name}-${index}`}
                className="text-[15px] md:text-[14px] text-black"
              >
                {option?.values}
              </li>
            ))}
          </ul>
          {link && (
            <div className="flex">
              <a
                className="font-semibold rounded-md text-[15px] py-[12px] px-[20px] hover:bg-midnightblue text-white bg-forestgreen capitalize leading-none"
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
