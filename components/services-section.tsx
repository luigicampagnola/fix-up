import { ServicesSectionProps } from "./types";
import CardWidget from "./card-widget";

export default function ServicesSection({
  title,
  subtitle,
  cards,
}: ServicesSectionProps) {
  return (
    <div className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[30px] md:text-[50px] leading-none uppercase text-center pt-[50px] pb-[35px]">
            {title}{" "}
            <span className="text-forestgreen md:block">{subtitle}</span>
          </h1>
          <div className="flex flex-wrap overflow-hidden">
            {cards.map((card, index) => {
              const { name, image, options, title, subtitle, link } = card;
              const formattedOptions = options.map((option) => option.option);

              return (
                <CardWidget
                  key={`${title}-${index}`}
                  name={name}
                  image={image}
                  options={formattedOptions}
                  title={title}
                  subtitle={subtitle}
                  link={link}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
