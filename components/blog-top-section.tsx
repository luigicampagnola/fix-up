"use client";

import Image from "next/image";
import { BlogTop } from "./blog-slug-section";
import { FaFacebook, FaLinkedin, FaShareAlt, FaTwitter } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function BlogTopSection({ image, sharedLinks }: BlogTop) {
  const { label, facebook, twitter } = sharedLinks;
  const pathname = usePathname();
  const host = window.location.origin;
  const pageURL = `${host}${pathname}`;

  const shareToTwitter = () => {
    const text = encodeURIComponent(twitter);
    const url = encodeURIComponent(pageURL);
    const tweetURL = `https://x.com/intent/post?text=${text}%20${url}`;
    window.open(tweetURL, "_blank");
  };

  const shareToLinkedin = () => {
    const shareUrl = encodeURIComponent(pageURL);
    const linkedinUrl = `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${shareUrl}`;
    window.open(linkedinUrl, "_blank");
  };

  return (
    <article className="flex flex-col items-center">
      <div className="w-full h-auto">
        <Image
          src={image.url}
          alt={image.alternativeText || "roof blog"}
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="text-black flex w-full items-center py-5">
        <p className="font-semibold text-[20px] md:text-[22px] lg:text-[24px]">
          {label}
        </p>
        <FaShareAlt className="text-[16px] mx-2" />
        <a
          className="p-3 mx-1 bg-blue-900 hover:bg-opacity-80"
          href={facebook}
          aria-label="share to facebook"
          target="_blank"
        >
          <FaFacebook className="text-white" />
        </a>
        <a
          className="p-3 mx-1 bg-blue-400 hover:bg-opacity-80"
          href={'#'}
          aria-label="share to twitter"
          onClick={() => shareToTwitter()}
        >
          <FaTwitter className="text-white" />
        </a>
        <a
          className="p-3 mx-1 bg-blue-600 hover:bg-opacity-80"
          href={'#'}
          aria-label="share to linkedin"
          onClick={() => shareToLinkedin()}
        >
          <FaLinkedin className="text-white" />
        </a>
      </div>
    </article>
  );
}
