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
    <section className="bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div>
        {copyright && <p>{copyright}</p>}
        {privacypolicy && (
          <Link href={privacypolicy?.label}>{privacypolicy?.label}</Link>
        )}
        {createdby && <a href={createdby.url}>{createdby.label}</a>}
      </div>
    </section>
  );
}
