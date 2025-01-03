import Link from "next/link";
import CustomGoogleMap from "./custom-google-map";
import { MapData } from "./types";
import { FaMapMarkerAlt } from "react-icons/fa";

export interface MapSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mapsData?: MapData[];
}

export default function MapSection({
  title,
  subtitle,
  description,
  mapsData,
}: MapSectionProps) {
  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-platinum top-0 left-0 rounded-none w-full h-full absolute opacity-100" />
      <div className="max-w-7xl basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-midnightblue text-[30px] md:text-[50px] leading-none uppercase text-center pt-[50px] max-w-4xl">
            {title} <span className="text-forestgreen">{subtitle}</span>
          </h1>
          {description && (
            <div
              className="text-center text-black py-7 text-[14px] md:text-[15px] lg:text-[16px] max-w-5xl"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
          {mapsData && (
            <div className="flex justify-center items-center flex-wrap">
              {mapsData.map((map, index) => (
                <div
                  key={`map-${index}`}
                  className="flex flex-wrap overflow-hidden justify-center basis-full w-full bg-white border rounded-2xl p-5 lg:basis-5/12 lg:w-5/12 mb-4 lg:mb-0 lg:mx-3"
                >
                  {map.link ? (
                    <iframe
                      src={map.link}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <p>No map available</p>
                  )}
                  {map.label && (
                    <div className="z-10 w-full flex justify-center flex-col items-center">
                      <Link
                        className="text-black hover:text-forestgreen text-[16px] lg:text-[18px] font-bold pt-4"
                        aria-label={map.label}
                        href={map.link ? map.link : "/"}
                      >
                        {map.label}
                      </Link>
                      {map.mapLocations && (
                        <div className="flex justify-center flex-wrap w-full basis-full md:w-10/12 md:basis-10/12 lg:w-11/12 lg:basis-11/12 pt-3">
                          {map.mapLocations.map((location, index) => (
                            <div
                              key={location.label + index}
                              className="flex items-center px-1 md:px-2 text-black hover:text-forestgreen text-[14px] md:text-[15px] lg:text-[16px]"
                            >
                              <FaMapMarkerAlt />
                              <p className="pl-[2px] font-medium">
                                {location.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
