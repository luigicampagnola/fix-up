'use client';

import Link from 'next/link';
import { BlogThemes } from './blog-slug-section';
import { useState } from 'react';
// import { FaAngleUp } from "react-icons/fa";

export default function BlogTableContents({ blogThemes }: BlogThemes) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className='text-black w-full'>
      <div className='w-full'>
        <div className='p-5 border border-solid border-metalSilver flex justify-between items-center'>
          <h1 className='text-[20px] md:text-[22px] lg:text-[24px] font-bold'>
            Table of Contents
          </h1>
          {/* <FaAngleUp
            aria-label="show-content"
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? "" : "rotate-180"} transition-all text-[24px] font-thin cursor-pointer delay-100 duration-150`}
          /> */}
        </div>

        <ol
          className={`text-[14px] md:text-[15px] lg:text-[16px] flex flex-col border border-solid border-metalSilver p-5 ${
            isOpen ? 'flex' : 'hidden'
          } transition-all overflow-hidden delay-150 duration-300`}
        >
          {blogThemes &&
            blogThemes.map((theme, index) => (
              <li className='my-1' key={theme.title + '-t' + index}>
                <div className='flex'>
                  <p className='pr-1'>{index + 1}.</p>
                  <Link
                    href={`#${theme.cssSelector}`}
                    aria-label={theme.title}
                    className='hover:underline'
                  >
                    {theme.title}
                  </Link>
                </div>
                <ol className='pl-5'>
                  {theme &&
                    theme.blogTips.map((tip, jndex) => (
                      <li
                        className='flex my-1'
                        key={tip.title + '-tip' + jndex}
                      >
                        <p className='pr-1'>{`${index}.${jndex + 1}. `}</p>
                        <Link
                          className='hover:underline'
                          href={`#${tip.cssSelector}`}
                          aria-label={tip.title}
                        >
                          {tip.title}
                        </Link>
                      </li>
                    ))}
                </ol>
              </li>
            ))}
        </ol>
      </div>
    </section>
  );
}
