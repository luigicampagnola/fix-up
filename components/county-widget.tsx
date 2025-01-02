import Image from "next/image";
import Link from "next/link";

type Props = {
  image?: {
    url: string;
  };
  title?: string;
  description?: string;
  link?: string;
};

export default function CountyWidget({
  title,
  description,
  link,
  image,
}: Props) {
  const strapiURL = process.env.STRAPI_URL;

  return (
    <div className="w-full basis-full">
      <div className="bg-brightgray rounded-[20px] pt-[20px] px-[20px] pb-[10px] my-[10px] flex flex-col items-center lg:items-start">
        {image && link && (
          <Link
            href={link}
            className="mb-[15px] lg:mb-0 lg:mr-[10px] w-full flex justify-center"
          >
            <Image
              src={`${strapiURL}${image.url}`}
              width={100}
              height={100}
              className=""
              alt={"s"}
            />
          </Link>
        )}
        <div className="pt-[8px] pb-[16px] flex flex-col items-center">
          {title && link && (
            <Link
              href={link}
              className="pt-1 md:pt-3 font-bold leading-[1.2] text-[20px] md:text-[18px] lg:text-[19px] text-midnightblue text-center"
            >
              {title}
            </Link>
          )}
          {description && (
            <p className="text-[14px] text-black font-medium md:text-[13.5px] lg:text-[14.5px] text-center mt-4">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
