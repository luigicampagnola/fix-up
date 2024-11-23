import CardWidget, { CardWidgetProps } from "./card-widget";

export type ServicesSectionProps = {
  title: string;
  subtitle: string;
  cards: CardWidgetProps[];
};

export default function ServicesSection({
  title,
  subtitle,
  cards,
}: ServicesSectionProps) {
  return (
    <div className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="basis-10/12 w-10/12 z-10 pt-12 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <h1 className="">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {cards.map((card, index) => {
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
  );
}
