import Image from "next/image";
import { BlogTop } from "./blog-slug-section";
import { FaFacebook, FaLinkedin, FaShareAlt, FaTwitter } from "react-icons/fa";

export default function BlogTopSection({image, sharedLinks}: BlogTop) {
  const {label, facebook, twitter, linkedin} = sharedLinks;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-auto">
        <Image
          src={image.url}
          alt={image.alternativeText}
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="text-black flex w-full items-center py-5">
        <p className="font-semibold text-[24px]">{label}</p>
        <FaShareAlt className="text-[16px] mx-2" />
        <a
          className="p-3 mx-1 bg-blue-900 hover:bg-opacity-80"
          href={facebook}
          aria-label="share to facebook"
        >
          <FaFacebook className="text-white" />
        </a>
        <a
          className="p-3 mx-1 bg-blue-400 hover:bg-opacity-80"
          href={twitter}
          aria-label="share to twitter"
        >
          <FaTwitter className="text-white" />
        </a>
        <a
          className="p-3 mx-1 bg-blue-600 hover:bg-opacity-80"
          href={linkedin}
          aria-label="share to linkedin"
        >
          <FaLinkedin className="text-white" />
        </a>
      </div>
    </div>
  );
}
