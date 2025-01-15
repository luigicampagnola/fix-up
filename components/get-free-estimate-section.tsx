import { FaHouse } from "react-icons/fa6";
import Form from "./form";
import { ContactForm, PhoneNumber } from "./types";
import { FaEnvelope, FaPhone } from "react-icons/fa";

interface SponsorFile {
  documentId: string;
  url: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: PhoneNumber;
  email?: string;
  address?: string;
  contactForm?: ContactForm & {
    sponsors?: {
      files: SponsorFile[];
    };
  };
}

export default function GetFreeEstimateSection({
  title,
  subtitle,
  description,
  phone,
  email,
  address,
  contactForm,
}: Props) {
  return (
    <section
      className="flex flex-col items-center overflow-hidden relative lg:h-[792px]"
      style={{
        backgroundImage: `url(${contactForm?.backgroundImage.backgroundImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="max-w-[1440px] basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-wrap flex-col sm:flex-row items-center lg:justify-start lg:max-w-7xl">
        <div className="flex flex-col basis-full w-full lg:basis-7/12 lg:w-7/12 lg:pr-[75px]">
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
          <div className="basis-full w-full lg:basis-5/12 lg:w-5/12">
            <Form contactForm={contactForm} />
          </div>
        )}
      </div>
      <div className="rotate-180 overflow-hidden left-0 w-full mt-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-custom-width block relative left-1/2 -translate-x-2/4"
          viewBox="0 0 2600 131.1"
          preserveAspectRatio="none"
        >
          <path
            className="fill-white origin-center rotate-0"
            d="M0 0L2600 0 2600 69.1 0 0z"
          ></path>
          <path
            className="fill-white origin-center rotate-0 opacity-50"
            d="M0 0L2600 0 2600 69.1 0 69.1z"
          ></path>
          <path
            className="fill-white origin-center rotate-0 opacity-25"
            d="M2600 0L0 0 0 130.1 2600 69.1z"
          ></path>
        </svg>{" "}
      </div>
    </section>
  );
}
