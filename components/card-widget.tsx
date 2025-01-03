import Image from "next/image";
import { ImageData, LinkData } from "./types";
import configs from "./../environment.configs";

type Option = {
  values: string;
};

export type CardWidgetProps = {
  name?: string;
  image?: ImageData;
  title?: string;
  subtitle?: string;
  options?: Option[];
  link?: LinkData;
};

export default function CardWidget({
  name,
  image,
  title,
  subtitle,
  options,
  link,
}: CardWidgetProps) {
  const STRAPI_URL =
    configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith("http")
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : "/placeholder.png";

  // Default dimensions for the image
  const DEFAULT_WIDTH = 1000;
  const DEFAULT_HEIGHT = 750;

  return (
    <div className="box-widget lg:w-4/12 lg:basis-4/12 flex flex-col">
      <div className="bg-white rounded-lg flex-1 flex flex-col mb-[10px] md:mb-[20px] mx-[10px]">
        <div className="">
          {image && (
            <Image
              className="rounded-lg"
              src={imageUrl}
              alt={image.alt || "Roofing image"}
              width={image?.src?.width ?? DEFAULT_WIDTH}
              height={image?.src?.height ?? DEFAULT_HEIGHT}
            />
          )}
        </div>
        <div className="px-[20px] md:px-[30px] pb-[30px]">
          <h3 className="text-[20px] md:text-[23px] pt-[30px] pb-[20px] text-midnightblue font-bold leading-tight">
            {title} <span className="lg:block">{subtitle}</span>
          </h3>
          <ul className="font-medium pb-[20px]">
            {options?.map((option, index) => (
              <li
                key={`${name}-${index}`}
                className="text-[15px] md:text-[14px] text-black"
              >
                {option?.values}
              </li>
            ))}
          </ul>
          {link && (
            <div className="flex">
              <a
                className="font-semibold rounded-md text-[15px] py-[12px] px-[20px] hover:bg-midnightblue text-white bg-forestgreen capitalize leading-none"
                href={link.url}
              >
                {link.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
