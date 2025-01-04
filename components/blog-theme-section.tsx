import { BlogThemes } from "./blog-slug-section";

export default function BlogThemeSection({ blogThemes }: BlogThemes) {
  return (
    <section>
      {blogThemes &&
        blogThemes.map((theme, index) => (
          <article
            key={theme.title + index}
            id={theme.cssSelector}
            className="text-black"
          >
            <h1 className="text-[40px] font-extrabold">{theme.title}</h1>
            <div
              className="text-[16px]"
              dangerouslySetInnerHTML={{ __html: theme.description }}
            ></div>
            <div className="bg-red">
              {theme.blogTips.map((tip, index) => (
                <div id={tip.cssSelector} key={tip.title + index}>
                  <h2 className="text-[30px] font-bold pt-2 pb-4">{tip.title}</h2>
                  <div
                    className="pb-2"
                    dangerouslySetInnerHTML={{ __html: tip.description }}
                  ></div>
                </div>
              ))}
            </div>
          </article>
        ))}
    </section>
  );
}
