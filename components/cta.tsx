"use client";
import { BackgroundImage } from "./types";
import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: BackgroundImage;
  button: {
    label: string;
    url: string;
  };
};

export default function Cta({
  title,
  subtitle,
  description,
  backgroundImage,
  button,
}: Props) {
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
        rootMargin: "50px",
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section
      className="flex flex-col items-center overflow-hidden relative h-632px md:h-[448px]"
      style={{
        backgroundImage: `url(${backgroundImage?.backgroundImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80 transition-all duration-300 hover:opacity-75"></div>
      <div
        ref={contentRef}
        className={`basis-10/12 z-10 py-[60px] px-[15px] md:py-[80px] sm:px-[20] flex flex-col items-center lg:max-w-[1140px] mx-auto justify-center
          transition-all duration-1000 ease-out
          opacity-0 translate-y-6 ${isVisible ? "animate-fade-up" : ""}`}
      >
        <div>
          <h1 className="text-[30px] sm:text-[50px] font-bold uppercase leading-none text-center text-white">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
        </div>
        <div className="flex lg:w-full lg:justify-center lg:px-[144px]">
          <p className="text-[14px] sm:text-[15px] text-center lg:text-[16px] pt-[30px] pb-[14px] text-white">
            {description}
          </p>
        </div>
        <div className="flex w-full justify-center lg:justify-center">
          <button className="py-4 px-7 md:px-9 md:py-4 lg:px-10 lg:py-5 mt-5 text-[14px] md:text-[15px] lg:text-[16px] bg-forestgreen rounded font-semibold text-white hover:bg-forestgreen/90 transition-colors duration-300">
            {button?.label}
          </button>
        </div>
      </div>
    </section>
  );
}
