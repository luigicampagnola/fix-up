import Form from "./form";
import { PhoneNumber } from "./types";

export interface FieldData {
  label?: string;
  placeholder?: string;
  required: boolean;
  warning: string;
  formatWarning?: string;
}

export interface ContactForm {
  title: string;
  warning: string; 
  name: FieldData;
  phone: FieldData;
  email: FieldData;
  street: FieldData
  captcha: FieldData;
  button: {
    label: string,
    url: string
  }
}

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: PhoneNumber;
  email?: string;
  address?: string;
  contactForm?: ContactForm;
}

export default function GetStartedSection({title, subtitle, description, phone, email, address, contactForm}: Props) {

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-wrap flex-col sm:flex-row items-center lg:justify-start">
        <div className="flex flex-col basis-7/12 w-7/12 pr-[75px]">
          <h1 className="font-bold text-[30px] md:text-[50px] leading-none uppercase pt-[50px] pb-[35px]">
            {title}{" "}
            <span className="text-forestgreen md:block">{subtitle}</span>
          </h1>
          {description && (
            <div
              className="text-center lg:text-left px-[10px] lg:px-0 py-7"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
        </div>
        {contactForm && 
          <div className="basis-5/12 w-5/12">
            <Form contactForm={contactForm} />
          </div>
        }
      </div>
    </section>
  );
}