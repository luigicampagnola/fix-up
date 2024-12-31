"use client";
import { ChangeEvent, useState } from "react";
import { ContactForm, FieldData } from "./get-started-section";

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
    <div className={`field-${name}`}>
      <label
        htmlFor={id}
        className={`${invalid ? "text-red-500" : "text-black"} font-bold`}
      >
        {label}{" "}
        <span className={required ? "text-red" : "hidden"}>(Required)</span>
      </label>
      <input
        id={id}
        name="name"
        type={type}
        placeholder={placeholder}
        className={`${
          invalid
            ? "border-red-500 border-solid border-[2px]"
            : "border-black border-solid border-[2px]"
        }`}
      />
      <span
        className={`${
          invalid && warning ? "block" : "hidden"
        } border-red-500 border-solid border-[2px] bg-red-100 text-red-500`}
      >
        {formatWarning}
      </span>
      <span
        className={`${
          invalid && warning ? "block" : "hidden"
        } border-red-500 border-solid border-[2px] bg-red-100 text-red-500`}
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
    <div className={`field-${name}`}>
      <label
        htmlFor={id}
        className={`${invalid ? "text-red-500" : "text-black"} font-bold`}
      >
        {label}{" "}
        <span className={required ? "text-red" : "hidden"}>(Required)</span>
      </label>
      <input
        id={id}
        name="name"
        type="tel"
        placeholder={placeholder}
        // pattern="[0-9]{3} [0-9]{3} [0-9]{4}\d" improve this
        maxLength={12}
        onChange={(e) => checkNumber(e)}
        className={`${
          invalid
            ? "border-red-500 border-solid border-[2px]"
            : "border-black border-solid border-[2px]"
        }`}
      />
      <span
        className={`${
          invalid && warning ? "block" : "hidden"
        } border-red-500 border-solid border-[2px] bg-red-100 text-red-500`}
      >
        {formatWarning}
      </span>
      <span
        className={`${
          invalid && warning ? "block" : "hidden"
        } border-red-500 border-solid border-[2px] bg-red-100 text-red-500`}
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
      street: target.street.value.length > 3
    });
  }

  const { button, captcha, email, name, phone, street, title, warning } =
    contactForm;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <span>{warning}</span>
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
        <div>
          <label htmlFor="captcha">{captcha.label}</label>
          <span
            className={`${
              !validFields.captcha && warning ? "block" : "hidden"
            } border-red-500 border-solid border-[2px] bg-red-100 text-red-500`}
          >
            {captcha.warning}
          </span>
          {/** captcha pending */}
        </div>
        <button type="submit">{button.label}</button>
      </form>
    </>
  );
}
