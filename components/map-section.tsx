import Link from "next/link";
import CustomGoogleMap from "./custom-google-map";
import { MapData } from "./types";

export interface MapSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mapData?: MapData[];
}

export default function MapSection({
  title,
  subtitle,
  description,
  mapData
}: MapSectionProps) {
  return (
    <>
      <section className="flex flex-col items-center overflow-hidden relative">
        <div className="bg-platinum top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
        <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-midnightblue text-[30px] md:text-[50px] leading-none uppercase text-center pt-[50px]">
              {title} <span className="text-forestgreen">{subtitle}</span>
            </h1>
            {description && (
              <div
                className="text-center text-black lg:text-left md:px-[10px] lg:px-0 py-7 text-[14px] md:text-[15px] lg:text-[16px]"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
              {mapData && mapData.map((map, index) => 
                <div key={`map-${index}`} className="flex flex-wrap overflow-hidden justify-center w-full">
                  <CustomGoogleMap center={map.center} zoom={map.zoom} />
                  {map.label && 
                    <div className="">
                      <Link className="text-black hover:text-forestgreen" href={map.link ? map.link : '/'}>{map.label}</Link>
                      {map.mapLocations && map.mapLocations?.map((location) => <p key={location}>{location}</p>)}
                    </div>
                  }
                </div>
              )
              }
          </div>
        </div>
      </section>
    </>
  );
}
