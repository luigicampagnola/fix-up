"use client";
import { usePathname } from "next/navigation";
import { FaRegCheckCircle } from "react-icons/fa";
import { ScrollTo, TextList } from "./types";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  benefits?: TextList[];
  button?: ScrollTo;
};

export default function TopSection({
  title,
  subtitle,
  description,
  benefits,
  button,
}: Props) {
  const pathName = usePathname();

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80 transition-background transition-border-radius transition-opacity hover:opacity-75"></div>
      <div className="basis-10/12 w-10/12 z-10 pt-12 flex flex-col items-center lg:justify-start">
        <h1 className="text-[39px] md:text-[60px] lg:text-[65px] font-bold uppercase leading-none text-center lg:text-left">
          {title}{" "}
          <span className="text-forestgreen lg:block">{subtitle}</span>
        </h1>
        <p className="text-[14px] md:text-[15px] text-center lg:text-left lg:text-[16px] pt-[30px] pb-[14px]">
          {description}
        </p>
        <div className="flex flex-wrap justify-center">
          {benefits &&
            benefits.map((benefit, index) => (
              <div key={`${pathName}-${index}`} className="flex items-center">
                <FaRegCheckCircle className="text-forestgreen text-[25px]" />{" "}
                <p className="text-[14px] md:text-[15px] lg:text-[16px] ml-2 mr-3 font-semibold">
                  {benefit.values}
                </p>
              </div>
            ))}
        </div>
        <button className="py-4 px-7 md:px-9 md:py-4 lg:px-10 lg:py-5 mt-5 text-[14px] md:text-[15px] lg:text-[16px] bg-forestgreen rounded font-semibold">
          {button?.label}
        </button>
      </div>
      <div className="rotate-180 overflow-hidden left-0 w-full">
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
