import Image from "next/image";
import { Rates, ScrollTo } from "./types";
import GoogleRate from "./google-rate";

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
  rates,
  button,
  description,
}: Props) {
  // Remove the comments for the code below to work with the images that came from strapi
  // const STRAPI_URL = "http://localhost:1337/"; // change this in the envs
  // const imageURL = image && `${STRAPI_URL}${image.url}`;

  return (
    <section className="option-section bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className=" basis-11/12 w-11/12 lg:basis-10/12 lg:w-10/12 py-[100] flex flex-wrap flex-row">
        <div className="mt-[20px] lg:mt-0 lg:w-5/12 lg:basis-5/12 w-full pr-[10px] order-2 lg:order-1">
          {image && title && (
            <Image
              className="shadow-custom-forestgreen rounded-lg object-cover h-[250px] md:h-[530px] lg:h-[450px]"
              src={image.url}
              alt={title}
              width={1000}
              height={800}
            />
          )}
          {rates && 
            <GoogleRate rates={rates} />
          }
        </div>
        <div className="information flex flex-col w-full basis-full lg:w-7/12 lg:basis-7/12 lg:px-[25px] order-1 lg:order-2">
          <h1 className="text-[30px] md:text-[50px] font-bold uppercase leading-none text-midnightblue text-center lg:text-left px-0 md:px-[50px] lg:px-0">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {description && (
            <div
              className="text-center lg:text-left px-[10px] lg:px-0 py-7"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
          {button && 
            <div className="flex justify-center lg:justify-start pb-[20px]">
              <button className="bg-forestgreen rounded font-semibold text-white py-[15px] px-[30px]" >{button?.label}</button>
            </div>
          }
        </div>
      </div>
    </section>
  );
}
