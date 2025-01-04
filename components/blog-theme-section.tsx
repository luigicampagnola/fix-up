import { BlogThemes } from "./blog-slug-section";

export default function BlogThemeSection({ blogThemes }: BlogThemes) {
  return (
    <section>
      {blogThemes &&
        blogThemes.map((theme, index) => (
          <article
            key={theme.title + index}
            className="text-black"
          >
            <h1 id={theme.cssSelector} className="text-[40px] font-extrabold my-2">{theme.title}</h1>
            <div
              className="text-[16px]"
              dangerouslySetInnerHTML={{ __html: theme.description }}
            ></div>
            <div className="bg-red">
              {theme.blogTips.map((tip, index) => (
                <div key={tip.title + index}>
                  <h2 id={tip.cssSelector} className="text-[30px] font-bold pt-2 pb-4">{tip.title}</h2>
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
