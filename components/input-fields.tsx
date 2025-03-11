import { ChangeEvent } from "react";
import { FieldData } from "./types";

interface InputFieldProps {
  labels: FieldData;
  id: string;
  name: string;
  invalid: boolean;
  type?: "text" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Asegúrate de que se pase el onChange
}

export function InputField({
  labels,
  id,
  name,
  invalid,
  type = "text",
  value,
  onChange,
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
        name={name}
        type={type}
        placeholder={placeholder}
        value={value} // Aquí se asegura que el valor esté controlado
        onChange={onChange} // Se pasa el onChange aquí
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
  value,
  onChange,
}: InputFieldProps) {
  const { required, warning, formatWarning, label, placeholder } = labels;

  function checkNumber(event: ChangeEvent<HTMLInputElement>) {
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
        name={name}
        type="tel"
        placeholder={placeholder}
        value={value} // Controla el valor aquí también
        onChange={onChange} // Y pasa el onChange aquí
        maxLength={12}
        onInput={checkNumber}
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
