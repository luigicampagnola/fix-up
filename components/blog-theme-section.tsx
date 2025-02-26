import { BlogThemes } from "./blog-slug-section";

export default function BlogThemeSection({ blogThemes }: BlogThemes) {

  const formatTextWithLineBreaks = (text: string | null | undefined) =>
  text ? text.replace(/\n/g, "<br>") : "";


  return (
    <section className="pt-5 pb-10">
      {blogThemes &&
        blogThemes.map((theme, index) => (
          <article key={theme.title + index} className="text-black">
            <h1
              id={theme.cssSelector}
              className="leading-tight text-[30px] md:text-[36px] lg:text-[40px] font-extrabold my-3 lg:my-2"
            >
              {theme.title}
            </h1>
            <div
              className="text-[14px] md:text-[15px] lg:text-[16px]"
              dangerouslySetInnerHTML={{
                __html: formatTextWithLineBreaks(theme.description),
              }}
            ></div>
            <div>
              {theme.blogTips.map((tip, index) => (
                <div key={tip.title + index}>
                  <h2
                    id={tip.cssSelector}
                    className="text-[20px] md:text-[24px] lg:text-[30px] font-bold pt-2 pb-4"
                  >
                    {tip.title}
                  </h2>
                  <div
                    className="text-[14px] md:text-[15px] lg:text-[16px] pb-2"
                    dangerouslySetInnerHTML={{
                      __html: formatTextWithLineBreaks(tip.description),
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </article>
        ))}
    </section>
  );
}
