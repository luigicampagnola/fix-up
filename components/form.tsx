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
    sponsors?: {
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
  const [showValidMessage, setShowValidMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  function handleRecaptchaChange(value: string | null) {
    setRecaptchaValue(value);
    setValidFields((prev) => ({ ...prev, captcha: !!value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
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
          setSubmitting(false);
          throw new Error(`response status: ${response.status}`);
        }

        if (response.ok) {
          setShowValidMessage(true);
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
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

  if (showValidMessage) setTimeout(() => setShowValidMessage(false), 3000);

  const sponsorImages =
    sponsors?.files?.map(
      (file) => `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL || ""}${file.url}`
    ) || [];

  return (
    <div
      id="Form"
      className="form bg-white shadow-custom-forestgreen-right rounded-sm m-[14px] md:m-0 relative"
    >
      <div
        className={`${
          showValidMessage ? "opacity-100 z-10 flex flex-col" : "opacity-0 -z-10 hidden"
        } transition-opacity ease-in-out delay-75 duration-100 absolute border-4 border-solid border-white bg-forestgreen text-white p-5 rounded-md bottom-0 right-0 z-10 w-full`}
      >
        <h6 className="font-bold border-b-4 border-midnightblue text-white text-[20px]">
          Thank You for Your Submission!
        </h6>
        <p className="left-5 pt-4">
          We have received your contact request along with your personal
          information. Our team will review your details and reach out to you
          promptly. Please check your inbox (and your spam folder just in case)
          for our response. We appreciate your trust and look forward to
          connecting with you soon. Have a great day!
        </p>
      </div>
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

          <div className="recaptcha-container">
            {recaptchaKey && (
              <ReCAPTCHADynamic
                sitekey={recaptchaKey}
                onChange={handleRecaptchaChange}
                hl="es"
                theme="light"
              />
            )}
          </div>
          <span
            className={`${
              !validFields.captcha && warning ? "block" : "hidden"
            } border-internationOrange border bg-snow text-internationOrange`}
          >
            {captcha.warning}
          </span>
        </div>
        <button
          className="w-full bg-forestgreen my-2 py-[10px] px-[15px] flex justify-center rounded text-white font-semibold hover:bg-midnightblue transition-all mb-[1rem]"
          type="submit"
        >
          {submitting && (
            <svg
              className="animate-spin h-5 w-5 mr-3 fill-forestgreen ..."
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="30"
                strokeLinecap="round"
              ></circle>
            </svg>
          )}
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
