import Link from "next/link";
import { LinkData } from "./types";

interface Props {
  createdby?: LinkData;
  privacypolicy?: LinkData;
  copyright?: string;
}

export default function BottomBar({
  createdby,
  privacypolicy,
  copyright,
}: Props) {
  return (
    <section className="bg-midnightblue w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className="font-semibold w-11/12 basis-11/12 md:basis-10/12 md:w-10/12 lg:basis-9/12 lg:w-9/12 text-white flex flex-wrap md:flex-row items-center">
        {copyright && (
          <div className="w-full basis-full lg:basis-5/12 lg:w-5/12 py-2 md:py-3 lg:text-start text-center">
            <p className="mb-2 md:mb-0">{copyright}</p>
          </div>
        )}
        {privacypolicy && (
          <div className="w-full basis-full lg:basis-2/12 lg:w-2/12 py-2 md:py-3 text-center lg:text-start">
            <Link
              className="transition-all mb-2 md:mb-0 hover:text-forestgreen"
              href={privacypolicy?.label}
            >
              {privacypolicy?.label}
            </Link>
          </div>
        )}
        {createdby && (
          <div className="w-full basis-full lg:basis-5/12 lg:w-5/12 py-2 md:py-3 text-center lg:text-right">
            <a
              className="transition-all mb-2 md:mb-0 hover:text-forestgreen"
              href={createdby.url}
            >
              {createdby.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
