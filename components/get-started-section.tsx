"use client";

import { useEffect, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import Form from "./form";
import { BackgroundImage, ContactForm, PhoneNumber } from "./types";
import { FaEnvelope, FaPhone } from "react-icons/fa";

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: PhoneNumber;
  email?: string;
  address?: string;
  contactForm?: ContactForm;
  backgroundImage?: BackgroundImage;
}

export default function GetStartedSection({
  title,
  subtitle,
  description,
  phone,
  email,
  address,
  contactForm,
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
    <section
      className="flex flex-col items-center overflow-hidden relative lg:h-[792px]"
      style={{
        backgroundImage: `url(${contactForm?.backgroundImage?.backgroundImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="max-w-[1440px] basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-wrap flex-col sm:flex-row items-center lg:justify-start">
        <div
          className={`flex flex-col basis-full w-full lg:basis-7/12 lg:w-7/12 lg:pr-[75px] transition-all duration-700 ${
            visibleElements["title-section"]
              ? "opacity-100 slide-up"
              : "opacity-0"
          }`}
          data-id="title-section"
        >
          <h1 className="font-bold text-center lg:text-left text-[39px] md:text-[60px] lg:text-[50px] leading-none uppercase pb-0 md:pb-[10px] md:pt-[30px] lg:pt-[50px] lg:pb-[35px]">
            {title}{" "}
            <span className="text-forestgreen md:block">{subtitle}</span>
          </h1>
          {description && (
            <div
              className="text-center lg:text-left px-[10px] lg:px-0 py-7 text-[14px] md:text-[15px] lg:text-[16px]"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
          <div className="flex flex-col items-center lg:items-start text-[13px] md:text-[15px] lg:text-[16px] pb-[25px] lg:pb-0">
            {phone && (
              <a
                href={`tel:${phone?.href}`}
                className="flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen"
              >
                <FaPhone className="text-forestgreen rotate-90" />
                <span>{phone.label}</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen"
              >
                <FaEnvelope className="text-forestgreen" />
                <span>{email}</span>
              </a>
            )}
            {address && (
              <p className="flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen">
                <FaHouse className="text-forestgreen" />
                <span>{address}</span>
              </p>
            )}
          </div>
        </div>
        {contactForm && (
          <div
            className={`basis-full w-full lg:basis-5/12 lg:w-5/12 bg-red transition-all duration-700 ${
              visibleElements["form-section"]
                ? "opacity-100 slide-right"
                : "opacity-0"
            }`}
            data-id="form-section"
          >
            <Form contactForm={contactForm} />
          </div>
        )}
      </div>
    </section>
  );
}
