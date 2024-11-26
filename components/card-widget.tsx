import Image from "next/image";

export type CardWidgetProps = {
  name: string;
  image: {
    alt: string;
    src: string;
  };
  title: string;
  subtitle: string;
  options: string[];
  link?: {
    label: string;
    url: string;
  };
};

export default function CardWidget({
  name,
  image,
  title,
  subtitle,
  options,
  link,
}: CardWidgetProps) {
  const { alt, src } = image;

  return (
    <div className="box-widget lg:w-4/12 lg:basis-4/12 flex flex-col">
      <div className="bg-white rounded-lg flex-1 flex flex-col mb-[10px] md:mb-[20px] mx-[10px]">
        <div className="">
          <Image
            className="rounded-lg"
            src={src}
            alt={alt}
            width={1000}
            height={750}
          />
        </div>
        <div className="px-[20px] md:px-[30px] pb-[30px]">
          <h3 className="text-[20px] md:text-[23px] pt-[30px] pb-[20px] text-midnightblue font-bold leading-tight">
            {title} <span className="lg:block">{subtitle}</span>
          </h3>
          <ul className="font-medium pb-[20px]">
            {options.map((option, index) => (
              <li
                key={`${name}-${index}`}
                className="text-[15px] md:text-[14px] text-black"
              >
                {option}
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
