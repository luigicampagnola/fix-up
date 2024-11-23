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
    <div className="box-widget bg-white">
      <div className="rounded-lg">
        <Image src={src} alt={alt} width={1000} height={750}/>
      </div>
      <div className="px-[30px]">
        <h3 className="lg:text-[23px] font-bold">
          {title} <span className="block">{subtitle}</span>
        </h3>
        <ul>
          {options.map((option, index) => (
            <li key={`${name}-${index}`} className="text-[14px]">
              {option}
            </li>
          ))}
        </ul>
      </div>
      {link && (
        <a
          className="font-semibold p-5 hover:bg-midnightblue text-white bg-forestgreen"
          href={link.url}
        >
          {link.label}
        </a>
      )}
    </div>
  );
}
