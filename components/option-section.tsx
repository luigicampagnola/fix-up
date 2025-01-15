"use client";

import CheckWidget from "./check-widget";
import { Options } from "./types";
import { useEffect, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  topDescription?: string;
  options?: Options[];
  middleDescription?: string;
  bottomDescription?: string;
  descriptionWithLink?: string;
};

export default function OptionSection({
  title,
  subtitle,
  topDescription,
  options,
  middleDescription,
  bottomDescription,
  descriptionWithLink,
}: Props) {
  const [visibleElements, setVisibleElements] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleElements((prev) => ({
                ...prev,
                [id]: true,
              }));
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

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="option-section bg-platinum w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className="basis-11/12 w-11/12 lg:basis-10/12 lg:w-10/12 py-[100] flex flex-col items-center">
        <h1 className="text-[30px] md:text-[50px] font-bold uppercase leading-none text-center text-midnightblue px-0 md:px-[50px] lg:px-0">
          {title} <span className="text-forestgreen">{subtitle}</span>
        </h1>
        {topDescription && (
          <p className="text-center lg:text-left py-5 lg:p-5">
            {topDescription}
          </p>
        )}
        <div className="flex flex-wrap">
          {options &&
            options.map((option, index) => (
              <CheckWidget
                key={option.label}
                label={option.label}
                description={option.description}
                className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${
                    visibleElements[`option-${index}`]
                      ? `${
                          index % 3 === 0
                            ? "animate-fadeInLeft"
                            : index % 3 === 1
                            ? "animate-fadeInRight"
                            : "animate-fadeInUp"
                        } opacity-100 translate-y-0`
                      : "opacity-0 translate-y-8"
                  }`}
                data-id={`option-${index}`}
              />
            ))}
          {descriptionWithLink && middleDescription && (
            <div className="w-full">
              <div
                className="pt-[20px] pb-[10px] basis-full lg:w-full flex justify-center"
                dangerouslySetInnerHTML={{ __html: middleDescription }}
              ></div>
              <div className="pb-[20px] basis-full w-full flex justify-center">
                <p
                  className="text-center"
                  dangerouslySetInnerHTML={{ __html: descriptionWithLink }}
                ></p>
              </div>
            </div>
          )}
        </div>
        {!descriptionWithLink && middleDescription && (
          <p className="pt-5 pb-[15px] text-center lg:text-left">
            {middleDescription}
          </p>
        )}
        {bottomDescription && (
          <p className="text-center lg:text-left">{bottomDescription}</p>
        )}
      </div>
    </section>
  );
}
