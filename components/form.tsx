"use client";

import { useState } from "react";
import { FaCircleExclamation, FaRegEnvelopeOpen } from "react-icons/fa6";
import { ContactForm } from "./types";
import { InputField, InputPhoneField } from "./input-fields";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  contactForm: ContactForm;
}

export default function Form({ contactForm }: Props) {
  const [validFields, setValidFields] = useState({
    fullname: true,
    phone: true,
    email: true,
    street: true,
    captcha: true,
  });
  const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay()]);

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
      captcha: true, // improve this,
      email: emailRegex.test(target.email.value),
      street: target.street.value.length > 3,
    });
  }

  const { button, captcha, email, name, phone, street, title, warning, sponsors } =
    contactForm;
  const fieldsAreInvalid = Object.keys(validFields).some((key) => validFields[key as keyof typeof validFields] === false);

  return (
    <div id="roofing-form" className="form bg-white shadow-custom-forestgreen-right rounded-sm m-[14px] md:m-0">
      <form className="pt-[48px] px-[42px] md:px-[48] pb-[32px]" onSubmit={handleSubmit}>
        <div className="flex pb-2">
          <FaRegEnvelopeOpen className="text-forestgreen text-[35px]" />
          <h2 className="text-black font-bold text-[25px] uppercase pl-3">
            {title}
          </h2>
        </div>
        <div className={`${
            fieldsAreInvalid
              ? "border-internationOrange border-solid border p-4 bg-snow text-internationOrange text-[13px] font-medium flex"
              : "hidden"
          }`}>
        <div className="flex items-center">
          <FaCircleExclamation className="text-[28px] text-internationOrange" />
        </div>
        <p className="pl-4">
          {warning}
        </p>
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
          <span
            className={`${
              !validFields.captcha && warning ? "block" : "hidden"
            } border-internationOrange border-solid border bg-snow text-internationOrange`}
          >
            {captcha.warning}
          </span>
          {/** captcha pending */}
        </div>
        <button
          className="w-full bg-forestgreen my-2 py-[10px] px-[15px] rounded text-white font-semibold hover:bg-midnightblue transition-all"
          type="submit"
        >
          {button.label}
        </button>

        {sponsors && // work in progress
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
             {sponsors.map((sponsor, index) => <div className="flex-[0_0_100%] min-w-0" key={`slide-${index}`}><Image alt="ahuvo" width={100} height={100} src={sponsor}/></div>)}
            </div>
          </div>
        }
      </form>
    </div>
  );
}
