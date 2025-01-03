'use client';

import Link from "next/link";
import { ScrollTo } from "./types";
import CardWidget3, { CardWidget3Props } from "./card-widget3";
import { useParams } from "next/navigation";

export interface BlogSectionProps {
  blogCards?: CardWidget3Props[];
  button?: ScrollTo;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function splitArray(arr: CardWidget3Props[], numParts: number) {
  const avg = arr.length / numParts;
  const out: CardWidget3Props[][] = [];
  let last = 0;
  while (last < arr.length) {
    out.push(arr.slice(last, Math.ceil(last + avg)));
    last += avg;
  }

  return out;
}

export default function BlogSection({ blogCards }: BlogSectionProps) {
  // const totalPage = (blogCards && blogCards.length / 7) || 1;
  const params = useParams();
  
  console.log('======>', params);
  // const chunkedArray = splitArray(blogCards, pages);

  // for(let i=0; i < totalPage; i++ ) {
  //   <Link href={}>{button.label}</Link>
  // }

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-midnightblue top-0 left-0 rounded-none w-full h-full absolute opacity-80" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap overflow-hidden lg:justify-center">
            {blogCards &&
              blogCards.map((card, index) => {
                const { title } = card;
                return <CardWidget3 key={`${title}-${index}`} {...card} />;
              })}
          </div>
        </div>
        <Link href={'page'}>Page</Link>
        
          {/* <div className="bg-forestgreen text-[14px] md:text-[15px] lg:text-[16px] font-bold rounded-lg mt-3 py-[15px] px-[30px] md:py-[20px] md:px-[40px] hover:scale-110 transition-all ">
            <Link href={button.cssSelector}>{button.label}</Link>
          </div> */}
      </div>
    </section>
  );
}
