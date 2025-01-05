"use client";
import { FaAngleRight, FaCalendarAlt } from "react-icons/fa";
import { BackgroundImage, LinkData } from "./types";
import Link from "next/link";

type Props = {
  title?: string;
  subtitle?: string;
  date?: string,
  titlePosition?: string;
  backgroundImage?: BackgroundImage;
  button?: LinkData;
};

export default function TopSection2({
  title,
  subtitle,
  date,
  titlePosition,
  backgroundImage,
  button
}: // image,
Props) {

  return (
    <section
      className="flex flex-col items-center overflow-hidden relative h-[350px] md:h-[704px] lg:h-[689px]"
      style={{
        backgroundImage: `url(${backgroundImage?.backgroundImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80 transition-background transition-border-radius transition-opacity hover:opacity-75"></div>
      <div className="basis-10/12 w-10/12 z-10 pt-12 flex flex-col items-center lg:max-w-[1140px] mx-auto justify-center">
        <div className={`flex flex-col w-full justify-${titlePosition}`}>
          {button && 
            <div className="flex pb-5 justify-center lg:justify-start text-white">
              <Link className="text-[14px] md:text-[15px] lg:text-[16px] pr-2 hover:text-forestgreen" href={button.url} >{button.label }</Link>
              <FaAngleRight className="text-[24px]" />
              <p className="text-[14px] md:text-[15px] lg:text-[16px] pl-2">Blog Details</p>
            </div>
          }
          <h1 className="text-[30px] md:text-[50px] lg:text-[65px] font-bold uppercase leading-none text-center lg:text-left">
            {title}{" "}
            <span className="text-forestgreen lg:block">{subtitle}</span>
          </h1>
          <div className="flex pt-5 justify-center lg:justify-start items-center">
            <FaCalendarAlt className="text-forestgreen text-[16px] lg:text-[24px]" />
            <p className="ml-3 text-[14px] md:text-[15px] lg:text-[16px] text-white">{date}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
