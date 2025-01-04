import Image from "next/image";
import Link from "next/link";
import { BlogPopularPosts } from "./blog-slug-section";

export default function BlogPopularPost({label, popularPosts}: BlogPopularPosts) {
    return (
      <article className="bg-white text-black p-[30px] flex flex-col w-5/12 shadow-lg rounded-lg">
          <h3 className="text-[24px] font-bold">{label}</h3>
          {popularPosts.map((post, index) => (
            <div key={`${post.title}-${index}`} className="flex mt-7">
              <div className="max-w-[94px] h-auto rounded-lg">
                <Image
                  className="rounded-lg"
                  src={post.image.url}
                  alt={post.image.alternativeText || "roof blog"}
                  width={post.image.width}
                  height={post.image.height}
                />
              </div>
              <div className="flex flex-col pl-5">
                <Link className="font-bold text-[16px] hover:text-forestgreen transition-all" href={post.link.url} aria-label={post.link.label}>
                  {post.title}
                </Link>
                <p className="text-[12px]">{post.date}</p>
              </div>
            </div>
          ))}
        </article>
    )
  }
  