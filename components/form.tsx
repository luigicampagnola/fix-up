"use client";

import { useState } from "react";
import { FaCircleExclamation, FaRegEnvelopeOpen } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import type { ChangeEvent } from "react";
import { ContactForm } from "./types";
import { InputField, InputPhoneField } from "./input-fields";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface SponsorFile {
  documentId: string;
  url: string; 
}

interface Props {
  contactForm: ContactForm & {
    sponsors: {
      files: SponsorFile[];
    };
  };
}

export default function Form({ contactForm }: Props) {
  const [validFields, setValidFields] = useState({
    fullname: true,
    phone: true,
    email: true,
    street: true,
    captcha: true,
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  function handleRecaptchaChange(value: string | null): void {
    setRecaptchaValue(value);
    setValidFields(prev => ({
      ...prev,
      captcha: !!value
    }));
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      fullname: { value: string };
      phone: { value: string };
      email: { value: string };
      street: { value: string };
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setValidFields({
      fullname: target.fullname.value.length > 0,
      phone: target.phone.value.length === 12,
      captcha: !!recaptchaValue,
      email: emailRegex.test(target.email.value),
      street: target.street.value.length > 3,
    });

    if (!recaptchaValue || Object.values(validFields).some(field => !field)) {
      return;
    }
    //  submission logic here
  }

  const {
    button,
    captcha,
    email,
    name,
    phone,
    street,
    title,
    warning,
    sponsors,
  } = contactForm;

  const fieldsAreInvalid = Object.keys(validFields).some(
    (key) => validFields[key as keyof typeof validFields] === false
  );

  const sponsorImages = sponsors?.files?.map(
    (file) =>
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL || ""}${file.url}`
  ) || [];

  return (
    <div
      id="roofing-form"
      className="form bg-white shadow-custom-forestgreen-right rounded-sm m-[14px] md:m-0"
    >
      <form
        className="pt-[48px] px-[42px] md:px-[48] pb-[32px]"
        onSubmit={handleSubmit}
      >
        <div className="flex pb-2">
          <FaRegEnvelopeOpen className="text-forestgreen text-[35px]" />
          <h2 className="text-black font-bold text-[25px] uppercase pl-3">
            {title}
          </h2>
        </div>
        <div
          className={`${
            fieldsAreInvalid
              ? "border-internationOrange border-solid border p-4 bg-snow text-internationOrange text-[13px] font-medium flex"
              : "hidden"
          }`}
        >
          <div className="flex items-center">
            <FaCircleExclamation className="text-[28px] text-internationOrange" />
          </div>
          <p className="pl-4">{warning}</p>
        </div>
        <InputField
          id="fullname"
          name="fullname"
          labels={name}
          invalid={!validFields.fullname}
          type="text"
        />
        <InputPhoneField
          id="phone"
          name="phone"
          labels={phone}
          invalid={!validFields.phone}
        />
        <InputField
          id="email"
          name="email"
          labels={email}
          invalid={!validFields.email}
          type="email"
        />
        <InputField
          id="street"
          name="street"
          labels={street}
          invalid={!validFields.street}
          type="text"
        />
        <div className="flex flex-col py-2">
          <label
            className={`${
              !validFields.captcha ? "text-internationOrange" : "text-black"
            } font-bold text-[16px] uppercase`}
            htmlFor="captcha"
          >
            {captcha.label}
          </label>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleRecaptchaChange}
            hl="es"
            theme="light"
            size="normal"
          />
          <span
            className={`${
              !validFields.captcha && warning ? "block" : "hidden"
            } border-internationOrange border-solid border bg-snow text-internationOrange`}
          >
            {captcha.warning}
          </span>
        </div>
        <button
          className="w-full bg-forestgreen my-2 py-[10px] px-[15px] rounded text-white font-semibold hover:bg-midnightblue transition-all mb-[1rem]"
          type="submit"
        >
          {button.label}
        </button>
        {sponsorImages.length > 0 && (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {sponsorImages.map((image, index) => (
                <div
                  className="flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] min-w-0 px-2"
                  key={`slide-${index}`}
                >
                  <Image
                    alt={`Sponsor ${index + 1}`}
                    width={300}
                    height={200}
                    className="object-cover w-full h-auto"
                    src={image}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
