
import Link from "next/link";
import CardWidget2, { CardWidget2Props } from "./card-widget2";
import { ScrollTo } from "./types";

export type FinancingProgramSectionProps = {
  title?: string;
  subtitle?: string;
  cards?: CardWidget2Props[];
  button?: ScrollTo;
};

export default function FinancingProgramSection({
  title,
  subtitle,
  cards,
  button,
}: FinancingProgramSectionProps) {

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[30px] md:text-[50px] leading-none uppercase text-center pt-[50px] pb-[35px]">
            {title}{" "}
            <span className="text-forestgreen">{subtitle}</span>
          </h1>
          <div className="flex flex-wrap overflow-hidden lg:justify-center">
            {cards && cards.map((card, index) => {
              const { name, image, options, title, subtitle, link } = card;
              return (
                <CardWidget2
                  key={`${title}-${index}`}
                  name={name}
                  image={image}
                  options={options}
                  title={title}
                  subtitle={subtitle}
                  link={link}
                />
              );
            })}
          </div>
        </div>
        {button?.cssSelector && button.label &&
          <div className="bg-forestgreen text-[14px] md:text-[15px] lg:text-[16px] font-bold rounded-lg mt-3 py-[15px] px-[30px] md:py-[20px] md:px-[40px] hover:scale-110 transition-all ">
            <Link href={button.cssSelector}>{button.label}</Link>
          </div>
        }
      </div>
    </section>
  );
}
