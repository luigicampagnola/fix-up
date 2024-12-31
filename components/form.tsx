"use client";
import { ChangeEvent, useState } from "react";
import { ContactForm, FieldData } from "./get-started-section";
import { FaCircleExclamation, FaRegEnvelopeOpen } from "react-icons/fa6";

interface Props {
  contactForm: ContactForm;
}

interface InputFieldProps {
  labels: FieldData;
  id: string;
  name: string;
  invalid: boolean;
  type?: "text" | "email";
}

export function InputField({
  labels,
  id,
  name,
  invalid,
  type = "text",
}: InputFieldProps) {
  const { required, warning, formatWarning, label, placeholder } = labels;
  return (
    <div className={`field-${name} flex flex-col py-2`}>
      <label
        htmlFor={id}
        className={`${
          invalid ? "text-internationOrange" : "text-black"
        } font-bold text-[16px]`}
      >
        {label}{" "}
        <span
          className={
            required
              ? "text-internationOrange font-medium text-[13px] italic"
              : "hidden"
          }
        >
          (Required)
        </span>
      </label>
      <input
        id={id}
        name="name"
        type={type}
        placeholder={placeholder}
        className={`${
          invalid ? "border-internationOrange" : "border-black"
        } p-[10px] border-solid border text-[15px] text-black`}
      />
      <span
        className={`${
          invalid && formatWarning ? "block" : "hidden"
        } border-internationOrange border-solid border bg-snow text-internationOrange text-[15px] font-medium py-[13px] px-[24px] mt-[8px]`}
      >
        {formatWarning}
      </span>
      <span
        className={`${
          invalid && warning ? "block" : "hidden"
        } border-internationOrange border-solid border bg-snow text-internationOrange text-[15px] font-medium py-[13px] px-[24px] mt-[8px]`}
      >
        {warning}
      </span>
    </div>
  );
}

export function InputPhoneField({
  labels,
  id,
  name,
  invalid,
}: InputFieldProps) {
  const { required, warning, formatWarning, label, placeholder } = labels;

  function checkNumber(event: ChangeEvent<HTMLInputElement>) {
    // improve this
    event.preventDefault();
    const value = event.target.value;
    const regex = /^\d+$/;

    event.target.value = regex.test(value) ? value : "";
  }

  return (
    <div className={`field-${name} flex flex-col py-2`}>
      <label
        htmlFor={id}
        className={`${
          invalid ? "text-internationOrange" : "text-black"
        } font-bold text-[16px]`}
      >
        {label}{" "}
        <span
          className={
            required
              ? "text-internationOrange font-medium text-[13px] italic"
              : "hidden"
          }
        >
          (Required)
        </span>
      </label>
      <input
        id={id}
        name="name"
        type="tel"
        placeholder={placeholder}
        // pattern="[0-9]{3} [0-9]{3} [0-9]{4}\d" improve this
        maxLength={12}
        onChange={(e) => checkNumber(e)}
        className={`${invalid ? "border-internationOrange" : "border-black"}
            p-[10px] border-solid border text-[15px] text-black`}
      />
      <span
        className={`${
          invalid && formatWarning ? "block" : "hidden"
        } border-internationOrange border-solid border bg-snow text-internationOrange text-[15px] font-medium py-[13px] px-[24px] mt-[8px]`}
      >
        {formatWarning}
      </span>
      <span
        className={`${
          invalid && warning ? "block" : "hidden"
        } border-internationOrange border-solid border bg-snow text-internationOrange text-[15px] font-medium py-[13px] px-[24px] mt-[8px]`}
      >
        {warning}
      </span>
    </div>
  );
}

export default function Form({ contactForm }: Props) {
  const [validFields, setValidFields] = useState({
    fullname: true,
    phone: true,
    email: true,
    street: true,
    captcha: true,
  });

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

  const { button, captcha, email, name, phone, street, title, warning } =
    contactForm;
  
  const fieldsAreInvalid = Object.keys(validFields).some((key) => validFields[key as keyof typeof validFields] === false);

  return (
    <div className="form bg-white shadow-custom-forestgreen-right rounded-sm m-[14px] md:m-0">
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
      </form>
    </div>
  );
}
