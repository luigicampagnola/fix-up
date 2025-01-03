import CardWidget, { CardWidgetProps } from "./card-widget";
import { BackgroundImage } from "./types";

export type ServicesSectionProps = {
  title?: string;
  subtitle?: string;
  cards?: CardWidgetProps[];
  backgroundImage: BackgroundImage;
};

export default function ServicesSection({
  title,
  subtitle,
  cards,
  backgroundImage,
}: ServicesSectionProps) {
  return (
    <section
      className="flex flex-col items-center overflow-hidden relative"
      style={{
        backgroundImage: `url(${backgroundImage?.backgroundImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[30px] md:text-[50px] leading-none uppercase text-center pt-[50px] pb-[35px]">
            {title}{" "}
            <span className="text-forestgreen md:block">{subtitle}</span>
          </h1>
          <div className="flex flex-wrap overflow-hidden lg:justify-center">
            {cards &&
              cards.map((card, index) => {
                const { name, image, options, title, subtitle, link } = card;
                return (
                  <CardWidget
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
      </div>
    </section>
  );
}
