import Image from "next/image";
import { ImageData, Rates, ScrollTo } from "./types";
import configs from "./../environment.configs";
import GoogleRate from "./google-rate";


type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageData;
  rates?: Rates;
  button?: ScrollTo;
};

export default function InformationSection({
  title,
  subtitle,
  description,
  image,
  rates,
  button,
}: Props) {

  const STRAPI_URL = configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith('http')
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : "/placeholder.png";

  return (
    <section className="option-section bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className="basis-11/12 w-11/12 lg:basis-10/12 lg:w-10/12 py-[100] flex flex-wrap flex-row">
        <div className="mt-[20px] lg:mt-0 lg:w-5/12 lg:basis-5/12 w-full pr-[10px] order-2 lg:order-1">
          {image?.src?.url && (
            <Image
              className="rounded-lg object-cover shadow-custom-forestgreen h-[250px] md:h-[530px] lg:h-[450px]"
              src={imageUrl}
              alt={image.alt || "Imagen"}
              width={image.src.width || 1000}
              height={image.src.height || 750}
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
