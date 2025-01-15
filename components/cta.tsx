"use client";
import { BackgroundImage } from "./types";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: BackgroundImage;
  button: {
    label: string;
    url: string;
  };
};

export default function Cta({
  title,
  subtitle,
  description,
  backgroundImage,
  button,
}: // image,
Props) {
  return (
    <section
      className="flex flex-col items-center overflow-hidden relative h-632px md:h-[448px]"
      style={{
        backgroundImage: `url(${backgroundImage?.backgroundImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-[#131245] top-0 left-0 rounded-none w-full h-full absolute opacity-80 transition-background transition-border-radius transition-opacity hover:opacity-75"></div>
      <div className="basis-10/12 z-10 py-[60px] px-[15px] md:py-[80px] sm:px-[20] flex flex-col items-center lg:max-w-[1140px] mx-auto justify-center">
        <div className={``}>
          <h1 className="text-[30px] sm:text-[50px] font-bold uppercase leading-none text-center">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
        </div>
        <div className={`flex lg:w-full lg:justify-center lg:px-[144px]`}>
          <p className="text-[14px] sm:text-[15px] text-center lg:text-[16px] pt-[30px] pb-[14px]">
            {description}
          </p>
        </div>
        <div className={`flex w-full justify-center lg:justify-center`}>
          <button className="py-4 px-7 md:px-9 md:py-4 lg:px-10 lg:py-5 mt-5 text-[14px] md:text-[15px] lg:text-[16px] bg-forestgreen rounded font-semibold">
            {button?.label}
          </button>
        </div>
      </div>
    </section>
  );
}
