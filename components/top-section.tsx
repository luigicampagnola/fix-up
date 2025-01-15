"use client";
import { usePathname } from "next/navigation";
import { FaRegCheckCircle } from "react-icons/fa";
import { ScrollTo, TextList, BackgroundImage } from "./types";
import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  description: string;
  benefits?: TextList[];
  button?: ScrollTo;
  titlePosition?: string;
  backgroundImage?: BackgroundImage;
};

export default function TopSection({
  title,
  subtitle,
  description,
  benefits,
  button,
  titlePosition,
  backgroundImage,
}: Props) {
  const pathName = usePathname();
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observedElement = contentRef.current; // Guardamos la referencia en una variable

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
    <section
      className="flex flex-col items-center overflow-hidden relative h-632px md:h-[704px] lg:h-[689px]"
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
        className={`basis-10/12 w-10/12 z-10 pt-12 flex flex-col items-center lg:max-w-[1140px] mx-auto justify-center
          transition-all duration-1000 ease-out
          opacity-0 translate-y-6 ${isVisible ? "animate-fade-up" : ""}`}
      >
        <div className={`flex w-full justify-${titlePosition}`}>
          <h1 className="text-[39px] md:text-[60px] lg:text-[65px] font-bold uppercase leading-none text-center lg:text-left text-white">
            {title}{" "}
            <span className="text-forestgreen lg:block">{subtitle}</span>
          </h1>
        </div>
        <div className={`flex lg:w-full lg:justify-${titlePosition}`}>
          <p
            className="text-[14px] md:text-[15px] text-center lg:text-left lg:text-[16px] pt-[30px] pb-[14px] text-white"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="flex flex-wrap lg:w-full sm:justify-start md:justify-center lg:justify-start">
          {benefits &&
            benefits.map((benefit, index) => (
              <div key={`${pathName}-${index}`} className="flex items-center">
                <FaRegCheckCircle className="text-forestgreen text-[25px]" />{" "}
                <p className="text-[14px] md:text-[15px] lg:text-[16px] ml-2 mr-3 font-semibold text-white">
                  {benefit.values}
                </p>
              </div>
            ))}
        </div>
        {button && (
          <div
            className={`flex w-full justify-left lg:justify-${button?.position}`}
          >
            <button className="py-4 px-7 md:px-9 md:py-4 lg:px-10 lg:py-5 mt-5 text-[14px] md:text-[15px] lg:text-[16px] bg-forestgreen rounded font-semibold text-white hover:bg-forestgreen/90 transition-colors duration-300">
              {button?.label}
            </button>
          </div>
        )}
      </div>
      <div className="rotate-180 overflow-hidden left-0 w-full mt-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-custom-width block relative left-1/2 -translate-x-2/4"
          viewBox="0 0 2600 131.1"
          preserveAspectRatio="none"
        >
          <path
            className="fill-white origin-center rotate-0"
            d="M0 0L2600 0 2600 69.1 0 0z"
          ></path>
          <path
            className="fill-white origin-center rotate-0 opacity-50"
            d="M0 0L2600 0 2600 69.1 0 69.1z"
          ></path>
          <path
            className="fill-white origin-center rotate-0 opacity-25"
            d="M2600 0L0 0 0 130.1 2600 69.1z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
