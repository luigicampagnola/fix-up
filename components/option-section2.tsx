import Image from "next/image";
import { ImageData, Options } from "./types";
import configs from "./../environment.configs";
import CheckWidget2 from "./check-widget2";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageData;
  options?: Options[];
  position?: string;
};

export default function OptionSection2({
  title,
  subtitle,
  description,
  image,
  options,
  position,
}: Props) {
  const STRAPI_URL =
    configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith("http")
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : "/placeholder.png";

  console.log(position, "position");

  return (
    <section className="option-section bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div
        className={`basis-11/12 w-11/12 lg:w-10/12 xl:basis-[80%] max-w-[1140px] py-[100] flex items-center ${
          position === "left"
            ? "flex-col-reverse xl:flex-row-reverse"
            : "flex-col lg:flex-row"
        }`}
      >
        <div className="shadow-custom-forestgreen rounded-lg mt-[20px] lg:mt-0 w-full h-full  xl:max-w-[414px] pr-[10px]">
          {image && title && (
            <Image
              className="rounded-lg object-cover h-full"
              src={imageUrl}
              alt={image.alt || "Imagen"}
              width={image.src.width || 1000}
              height={image.src.height || 750}
            />
          )}
        </div>
        <div
          className={`information ${
            position === "left" ? "xl:mr-[16px]" : ""
          }  xl:max-w-[706px] lg:px-[25px]`}
        >
          <h1 className="text-[30px] md:text-[50px] font-bold uppercase leading-none text-midnightblue text-center lg:text-left px-0 md:px-[50px] lg:px-0 mt-[3rem]">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {description && (
            <p
              className="text-center lg:text-left px-[10px] lg:px-0 py-7"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          )}
          <div className="flex flex-wrap">
            {options &&
              options.map((option) => (
                <CheckWidget2
                  key={option.label}
                  label={option.label}
                  description={option.description}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
