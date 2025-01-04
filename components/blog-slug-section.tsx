import Image from "next/image";
import { LinkData, SlideImage } from "./types";
import { FaFacebook, FaLinkedin, FaShareAlt, FaTwitter } from "react-icons/fa";
import BlogTopSection from "./blog-top-section";

export interface BlogTop {
  image: SlideImage;
  sharedLinks: {
    label: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

export interface BlogTip {
  title: string;
  cssSelector: string;
  description: string;
}

export interface BlogTheme {
  title: string;
  cssSelector: string;
  description: string;
  blogTips: BlogTip[];
}

export interface BlogThemes {
  blogThemes: BlogTheme[];
}

export interface BlogPost {
  title: string;
  date: string;
  image: SlideImage;
  link: LinkData;
}

export interface BlogPopularPosts {
  label: string;
  popularPosts: BlogPost[];
}

interface BlogSlugSectionProps {
  blogTopSection: BlogTop;
  blogPopularPostSection: BlogPopularPosts;
  blogThemeSection: BlogThemes;
}

export default function BlogSlugSection({
  blogTopSection,
  blogPopularPostSection,
  blogThemeSection,
}: BlogSlugSectionProps) {
  console.log(blogTopSection, "==================< 1");
  // console.log(blogPopularPostSection, '==================< 2');
  // console.log(blogThemeSection, '==================< 3');

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-platinum top-0 left-0 rounded-none w-full h-full absolute" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <BlogTopSection {...blogTopSection} />
      </div>
    </section>
  );
}
