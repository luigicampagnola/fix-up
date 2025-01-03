"use client";

import Image from "next/image";
import { Rates } from "./types";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";

type Props = {
  rates: Rates;
};

export default function GoogleRate({ rates }: Props) {
  const [slide, setSlide] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const { comments, googleLogo, label, subLabel } = rates;
  const readMoreLabel = readMore ? "Hide" : "Read more";

  const nextSlide = () => {
    if (rates && slide + 1 < rates.comments.length) {
      setSlide(slide + 1);
    }
  };

  const prevSlide = () => {
    if (slide - 1 >= 0) {
      setSlide(slide - 1);
    }
  };
console.log(googleLogo.url, '---------------?');

  return (
    <div className="bg-white py-[15px] px-[20px] rounded-lg mx-[5px] mt-[-100px] relative z-10">
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
        {comments.map((comment, index) => (
          <div
            key={`star-${index}`}
            className={`${index === slide ? "flex" : "hidden"}`}
          >
            {Array(comment.rate)
              .fill("stars")
              .map((star, index) => (
                <FaStar
                  key={`${star}-${index}`}
                  className="text-yellow-400 text-[20px]"
                />
              ))}
          </div>
        ))}
      </div>
      <div className="rates">
        {comments.map((comment, index) => {
          const message = comment.comment;
          const maxLength = 200;
          const updatedText =
            message.length > maxLength
              ? message.substring(0, readMore ? message.length : maxLength)
              : message;

          return (
            <div
              key={`comment-${index}`}
              className={`${
                index === slide ? "flex" : "hidden"
              } flex flex-col items-start`}
            >
              <p
                className={`comment text-[15px] font-[500] border-t border-solid border-antiflaswhite pt-[10px] transition-all duration-500 ease-in-out overflow-hidden ${
                  readMore ? "max-h-60" : "max-h-20"
                }`}
              >
                {updatedText}
                {readMore ? "" : "..."}
              </p>
              <button
                className="text-[13.5px] text-chinesesilver"
                onClick={() => setReadMore(!readMore)}
              >
                {readMoreLabel}
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="border-chinesesilver border border-solid rounded-full p-1 mr-1"
        onClick={() => prevSlide()}
      >
        <FaAngleLeft className="text-chinesesilver" />
      </button>
      <button
        className="border-chinesesilver border border-solid rounded-full p-1 ml-1"
        onClick={() => nextSlide()}
      >
        <FaAngleRight className="text-chinesesilver" />
      </button>
    </div>
  );
}
