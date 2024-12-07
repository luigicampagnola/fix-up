import Image from "next/image";
import { Rates, ScrollTo } from "./types";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: { url: string };
  rates?: Rates;
  button?: ScrollTo;
};

export default function InformationSection({
  title,
  subtitle,
  image,
  // rates,
  // button,
  description,
}: Props) {
  const STRAPI_URL = "http://localhost:1337/"; // change this in the envs

  return (
    <section className="option-section bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className=" basis-11/12 w-11/12 lg:basis-10/12 lg:w-10/12 py-[100] flex flex-col lg:flex-row items-center">
        <div className="shadow-custom-forestgreen rounded-lg mt-[20px] lg:mt-0 w-full h-full lg:h-[650px] pr-[10px] order-2 lg:order-1">
          {image && title && (
            <Image
              className="rounded-lg object-cover h-full"
              src={`${STRAPI_URL}${image.url}`}
              alt={title}
              width={1000}
              height={800}
            />
          )}
        </div>
        <div className="information lg:px-[25px] order-1 lg:order-2">
          <h1 className="text-[30px] md:text-[50px] font-bold uppercase leading-none text-midnightblue text-center lg:text-left px-0 md:px-[50px] lg:px-0">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {description && (
            <p className="text-center lg:text-left px-[10px] lg:px-0 py-7" dangerouslySetInnerHTML={{__html: description}}>
            </p>
          )}
          <div className="flex flex-wrap"></div>
        </div>
      </div>
    </section>
  );
}
