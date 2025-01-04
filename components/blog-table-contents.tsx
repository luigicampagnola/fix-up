import Link from "next/link";
import { BlogThemes } from "./blog-slug-section";

export default function BlogTableContents({ blogThemes }: BlogThemes) {
  return (
    <section className="text-black">
      <div className="">
        <h1>Table Contents</h1>
        <ol className="flex flex-col">
          {blogThemes &&
            blogThemes.map((theme, index) => (
              <li key={theme.title + "-t" + index}>
                <Link href={theme.cssSelector} aria-label={theme.title} className="hover:underline" >
                  {theme.title}
                </Link>
                <ol>
                  {theme && theme.blogTips.map((tip, jndex) => 
                  <li key={tip.title + "-tip" + jndex}>
                    <Link className="hover:underline" href={tip.cssSelector} aria-label={tip.title}>{tip.title}</Link>
                  </li>
                  )}
                </ol>
              </li>
            ))}
        </ol>
      </div>
    </section>
  );
}
