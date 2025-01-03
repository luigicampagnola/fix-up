import Image from "next/image";
import { ImageData } from "./types";
import configs from '../environment.configs'

export interface CardWidget3Props {
  name?: string;
  image?: ImageData;
  title?: string;
  description?: string;
  date?: string;
};

export default function CardWidget3({
  image,
  title,
  description,
  date
}: CardWidget3Props) {
  const STRAPI_URL = configs.BASE_URL || "https://amazing-fireworks-dd56623770.strapiapp.com";

  const imageUrl = image?.src?.url
    ? image.src.url.startsWith('http')
      ? image.src.url
      : `${STRAPI_URL}${image.src.url}`
    : "/placeholder.png";

  // Default dimensions for the image
  const DEFAULT_WIDTH = 1000;
  const DEFAULT_HEIGHT = 750;

  return (
    <div className="box-widget lg:w-4/12 lg:basis-4/12 flex flex-col">
      <div className="bg-white rounded-lg flex-1 flex flex-col mb-[10px] md:mb-[20px] mx-[10px]">
        <div className="relative">
          {image && (
            <Image
              className="rounded-lg"
              src={imageUrl}
              alt={image.alt || "Roofing image"}
              width={DEFAULT_WIDTH}
              height={DEFAULT_HEIGHT}
            />
          )}
          <p className="bg-forestgreen p-1 text-[14px] uppercase text-white">Blog</p>
        </div>
        <div className="px-[20px] md:px-[30px] pb-[30px]">
          <h3 className="text-[20px] md:text-[23px] pt-[30px] pb-[20px] text-midnightblue font-bold leading-tight">
            {title}
          </h3>
          <p className="text-[14px] text-black">{description}</p>
          <p className="text-[12px] text-black w-full py-2 px-3 border-t border-solid border-black">{date}</p>
        </div>
      </div>
    </div>
  );
}