import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  title?: string;
  link?: string;
  locations?: string[];
};

export default function MapWidget({
  title,
  link,
  locations,
}: Props) {

  return (
    <div className="w-full basis-full">
      <div className="bg-brightgray rounded-[20px] pt-[20px] px-[20px] pb-[10px] my-[10px] flex flex-col items-center lg:items-start">
        
        <div className="pt-[8px] pb-[16px] flex flex-col items-center">
          {title && link && (
            <Link
              href={link}
              className="pt-1 md:pt-3 font-bold leading-[1.2] text-[20px] md:text-[18px] lg:text-[19px] text-midnightblue text-center"
            >
              {title}
            </Link>
          )}
          {locations && 
            locations.map((location, index) => 
              <div key={location + index} className="text-black hover:text-forestgreen">
                <FaMapMarkerAlt />
                <p className="text-[14px] font-medium md:text-[13.5px] lg:text-[14.5px] text-center mt-4">
                  {location}
                </p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
