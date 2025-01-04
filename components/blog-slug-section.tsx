import { LinkData, SlideImage } from "./types";
import BlogTopSection from "./blog-top-section";
import BlogPopularPost from "./blog-popular-post";
import BlogThemeSection from "./blog-theme-section";
import BlogTableContents from "./blog-table-contents";

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

  return (
    <section className="flex flex-col items-center overflow-hidden relative">
      <div className="bg-platinum top-0 left-0 rounded-none w-full h-full absolute" />
      <div className="basis-11/12 w-11/12 lg:basis-10/12 md:w-10/12 z-10 pt-12 pb-16 flex flex-col items-center lg:justify-start">
        <BlogTopSection {...blogTopSection} />
        <BlogPopularPost {...blogPopularPostSection} />
        <BlogTableContents {...blogThemeSection}/>
        <BlogThemeSection {...blogThemeSection} />
        
      </div>
    </section>
  );
}
