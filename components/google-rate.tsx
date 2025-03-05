"use client";

import Image from "next/image";
import { Rates } from "./types";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";

type Props = {
  rates: Rates;
};

export default function GoogleRate({ rates }: Props) {
  const [slide, setSlide] = useState(0);
  const { comments, googleLogo, label, subLabel } = rates;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % comments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [comments.length]);

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide + 1) % comments.length);
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? comments.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="bg-white py-[15px] px-[20px] rounded-lg mx-[5px] mt-[-100px] relative z-10 overflow-hidden shadow-md">
      <p className="text-[14px] font-bold">{label}</p>
      <p className="text-[14px]">{subLabel}</p>
      <div className="flex justify-between pt-[10px] pb-[15px]">
        <Image
          className="w-[90px] h-[30px]"
          src={googleLogo.url}
          alt="google-logo"
          width={90}
          height={30}
        />
        <div className="flex items-center space-x-1">
          {Array(comments[slide].rate)
            .fill("stars")
            .map((_, starIndex) => (
              <FaStar
                key={`star-${starIndex}`}
                className="text-yellow-400 text-[20px]"
              />
            ))}
        </div>
      </div>
      <div className="relative w-full h-[200px] overflow-hidden">
        <div
          className="absolute flex transition-transform duration-700 ease-in-out w-full"
          style={{
            transform: `translateX(-${slide * 100}%)`,
          }}
        >
          {comments.map((comment, index) => (
            <div
              key={`comment-${index}`}
              className="w-full flex-shrink-0 px-[20px]"
            >
              <p className="text-[15px] font-[500] border-t border-solid border-antiflaswhite pt-[10px]">
                {comment.comment}
              </p>
              <p className="text-[14px] font-semibold text-midnightblue mt-2">
                {comment.name}
              </p>
              <p className="text-[12px] text-dimgray">{comment.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="border-chinesesilver border border-solid rounded-full p-2 mr-2 hover:bg-chinesesilver transition"
          onClick={prevSlide}
        >
          <FaAngleLeft className="text-chinesesilver" />
        </button>
        <button
          className="border-chinesesilver border border-solid rounded-full p-2 ml-2 hover:bg-chinesesilver transition"
          onClick={nextSlide}
        >
          <FaAngleRight className="text-chinesesilver" />
        </button>
      </div>
    </div>
  );
}
