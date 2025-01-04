"use client";

import { ScrollTo } from "./types";
import CardWidget3, { CardWidget3Props } from "./card-widget3";
import { useState } from "react";

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
  const [currentPage, changeCurrentPage] = useState(0);
  const totalPages = (blogCards && blogCards.length / 7) || 1;

  let chunkedArray: CardWidget3Props[][] = [];

  if (blogCards) {
    chunkedArray = splitArray(blogCards, totalPages);
  }

  const nextPageButton = []; // maybe I can use Link to scroll up but other implementation is need

  for (let i = 0; i < totalPages; i++) {
    nextPageButton.push(i + 1);
  }

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-white top-0 left-0 rounded-none w-full h-full absolute" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap overflow-hidden lg:justify-center">
            {chunkedArray &&
              chunkedArray[currentPage].map((card, index) => {
                const { title } = card;
                return <CardWidget3 key={`${title}-${index}`} {...card} />;
              })}
          </div>
        </div>
        {nextPageButton && (
          <div className="flex w-full justify-center">
            {nextPageButton.map((button, index) => (
              <button
                className={`mx-1 text-[18px] ${currentPage === index ? 'text-forestgreen font-semibold' : 'text-black'}`}
                key={`button-${index}`}
                onClick={() => changeCurrentPage(index)}
              >
                {button}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
