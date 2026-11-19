
import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Newspaper } from "lucide-react";

import {
  getPublicMediaUrl,
  type PublicPost,
} from "@/lib/public-content";

import { POST_CATEGORIES } from "@/lib/posts";

type PostCardProps = {
  post: PublicPost;
};

export default function PostCard({
  post,
}: PostCardProps) {
  const imageUrl = getPublicMediaUrl(
    post.cover_image_path
  );

  const category =
    POST_CATEGORIES.find(
      (item) => item.value === post.category
    )?.label ?? "School News";

  const publicationDate = post.published_at
    ? new Intl.DateTimeFormat("en-GH", {
        dateStyle: "medium",
        timeZone: "Africa/Accra",
      }).format(new Date(post.published_at))
    : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/blog/${post.slug}`}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#EAF5EE]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-green-700">
              <Newspaper size={45} strokeWidth={1.4} />
            </div>
          )}

          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#176B49]">
            {category}
          </span>
        </div>

        <div className="p-6">
          {publicationDate && (
            <p className="text-xs font-medium text-slate-400">
              {publicationDate}
            </p>
          )}

          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug tracking-tight text-slate-950 transition group-hover:text-[#176B49]">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176B49]">
            Read Article
            <ArrowUpRight size={18} />
          </div>
        </div>
      </Link>
    </article>
  );
}
