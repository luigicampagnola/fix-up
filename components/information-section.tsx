'use client'

import Image from "next/image";
import { ImageData, Rates, ScrollTo } from "./types";
import configs from "./../environment.configs";
import GoogleRate from "./google-rate";
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
 
 const STRAPI_URL = configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

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
       rootMargin: '50px'
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
   <section className="option-section bg-white w-full flex text-sm md:text-base lg:text-base font-normal text-black justify-center">
     <div className="basis-11/12 w-11/12 lg:basis-10/12 lg:w-10/12 py-24 flex flex-wrap flex-row">
       <div 
         ref={imageRef}
         className={`mt-5 lg:mt-0 lg:w-5/12 lg:basis-5/12 w-full pr-3 order-2 lg:order-1 
           transition-all duration-1000 ease-out
           opacity-0 -translate-x-24 ${isImageVisible ? 'animate-slide-left' : ''}`}
       >
         {image?.src?.url && (
           <Image
             className="rounded-lg object-cover shadow-lg h-64 md:h-[530px] lg:h-[450px]"
             src={imageUrl}
             alt={image.alt || "Imagen"}
             width={image.src.width || 1000}
             height={image.src.height || 750}
           />
         )}
         {rates && <GoogleRate rates={rates} />}
       </div>
       <div 
         ref={contentRef}
         className={`information flex flex-col w-full basis-full lg:w-7/12 lg:basis-7/12 lg:px-6 order-1 lg:order-2 lg:mt-24
           transition-all duration-1000 ease-out
           opacity-0 translate-y-6 ${isContentVisible ? 'animate-fade-up' : ''}`}
       >
         <h1 className="text-3xl md:text-5xl font-bold uppercase leading-none text-midnightblue text-center lg:text-left px-0 md:px-12 lg:px-0">
           {title} <span className="text-forestgreen">{subtitle}</span>
         </h1>
         {description && (
           <div
             className="text-center lg:text-left px-3 lg:px-0 py-7 lg:text-lg"
             dangerouslySetInnerHTML={{ __html: description }}
           ></div>
         )}
         {button && (
           <div className="flex justify-center lg:justify-start pb-5">
             <button className="bg-forestgreen rounded font-semibold text-white py-4 px-8 hover:bg-forestgreen/90 transition-colors duration-300">
               {button?.label}
             </button>
           </div>
         )}
       </div>
     </div>
   </section>
 );
}