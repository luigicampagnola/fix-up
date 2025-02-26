import Image from "next/image";
import Link from "next/link";
import { LinkData } from "./types";

export interface CardWidget3Props {
  name?: string;
  image?: {
    alternativeText: string;
    url: string;
    height: number;
    width: number;
  };
  title?: string;
  description?: string;
  date?: string;
  link?: LinkData;
};

export default function CardWidget3({
  image,
  title,
  description,
  date,
  link
}: CardWidget3Props) {

  return (
    <div className="box-widget md:w-6/12 md:basis-6/12 lg:w-4/12 lg:basis-4/12 flex flex-col">
      <div className="bg-white rounded-lg h-[562px] flex flex-col mb-[10px] md:mb-[20px] mx-[10px] shadow-lg">
        <Link href={link ? link.url : '#'} aria-label={link?.label} className="relative h-[230px] overflow-hidden">
          {image && (
            <Image
              className="rounded-lg w-full h-auto"
              src={image.url}
              alt={image.alternativeText || "Roofing image"}
              width={image.width}
              height={image.height}
            />
          )}
          <p className="bg-forestgreen py-1 px-3  absolute top-0 right-0 m-3 rounded-full text-[14px] uppercase text-white">Blog</p>
        </Link>
        <div className="px-[20px] md:px-[30px] pb-[30px]">
          <h3 className="text-[18px] md:text-[20px] pt-[30px] pb-[20px] text-midnightblue font-bold leading-tight">
            <Link href={link ? link.url : '#'} aria-label={link?.label}>{title}</Link>
          </h3>
          <div>
            <p className="text-[15px] md:text-[15px] lg:text-[16px] text-black mb-[25px]">{description}</p>
          </div>
        </div>
        <div className="align-bottom">
          <p className="text-[12px] text-black w-full py-2 px-3 border-t border-solid border-black">{date}</p>
        </div>
      </div>
    </div>
  );
}