"use client";

import { useState } from "react";
import { FaCircleExclamation, FaRegEnvelopeOpen } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { ContactForm } from "./types";
import { InputField, InputPhoneField } from "./input-fields";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const ReCAPTCHADynamic = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

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
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  function handleRecaptchaChange(value: string | null) {
    setRecaptchaValue(value);
    setValidFields((prev) => ({ ...prev, captcha: !!value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      fullname: { value: string };
      phone: { value: string };
      email: { value: string };
      street: { value: string };
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setValidFields({
      fullname: target.fullname.value.length > 0,
      phone: target.phone.value.length === 12,
      email: emailRegex.test(target.email.value),
      street: target.street.value.length > 3,
      captcha: !!recaptchaValue,
    });

    if (
      target.fullname.value.length > 0 &&
      target.phone.value.length === 12 &&
      emailRegex.test(target.email.value) &&
      target.street.value.length > 3 &&
      recaptchaValue
    ) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: target.fullname.value,
            phone: target.phone.value,
            email: target.email.value,
            street: target.street.value,
          }),
        });
        if (!response.ok) {
          throw new Error(`response status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const { button, captcha, email, name, phone, street, title, warning, sponsors } = contactForm;
  const fieldsAreInvalid = Object.keys(validFields).some(
    (key) => validFields[key as keyof typeof validFields] === false
  );

  const sponsorImages =
    sponsors?.files?.map(
      (file) => `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL || ""}${file.url}`
    ) || [];

  return (
    <div className="form bg-white shadow-custom-forestgreen-right rounded-sm m-[14px] md:m-0">
      <form className="pt-[48px] px-[42px] md:px-[48] pb-[32px]" onSubmit={handleSubmit}>
        <div className="flex pb-2">
          <FaRegEnvelopeOpen className="text-forestgreen text-[35px]" />
          <h2 className="text-black font-bold text-[25px] uppercase pl-3">{title}</h2>
        </div>
        <div
          className={`${
            fieldsAreInvalid
              ? "border-internationOrange border p-4 bg-snow text-internationOrange text-[13px] font-medium flex"
              : "hidden"
          }`}
        >
          <FaCircleExclamation className="text-[28px]" />
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
          >
            {captcha.label}
          </label>
          <ReCAPTCHADynamic
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleRecaptchaChange}
            hl="es"
            theme="light"
            size="normal"
          />
          <span
            className={`${
              !validFields.captcha && warning ? "block" : "hidden"
            } border-internationOrange border bg-snow text-internationOrange`}
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
                  className="flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] px-2"
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
