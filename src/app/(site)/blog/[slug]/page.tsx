
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { ArrowLeft, CalendarDays } from "lucide-react";

import RichText from "@/components/public/rich-text";
import {
  getPublishedPostBySlug,
  getPublicMediaUrl,
} from "@/lib/public-content";

import { POST_CATEGORIES } from "@/lib/posts";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Doribabs School Complex",
      robots: { index: false },
    };
  }

  return {
    title: `${post.title} | Doribabs School Complex`,
    description:
      post.excerpt ??
      "Latest news from Doribabs School Complex.",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  await connection();

  const { slug } = await params;

  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const imageUrl = getPublicMediaUrl(
    post.cover_image_path
  );

  const category =
    POST_CATEGORIES.find(
      (item) => item.value === post.category
    )?.label ?? "School News";

  const date = post.published_at
    ? new Intl.DateTimeFormat("en-GH", {
        dateStyle: "long",
        timeZone: "Africa/Accra",
      }).format(new Date(post.published_at))
    : null;

  return (
    <main className="min-h-screen bg-[#F8FAF8] px-5 py-12 sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#176B49]"
        >
          <ArrowLeft size={17} />
          All News & Stories
        </Link>

        <header className="mt-12">
          <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
            {category}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-lg leading-9 text-slate-600">
              {post.excerpt}
            </p>
          )}

          {date && (
            <p className="mt-7 flex items-center gap-2 text-sm text-slate-400">
              <CalendarDays size={17} />
              Published {date}
            </p>
          )}
        </header>

        {imageUrl && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-slate-100 bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
          <RichText content={post.content} />
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-[#176B49] hover:underline"
          >
            <ArrowLeft size={18} />
            Back to School News
          </Link>
        </div>
      </article>
    </main>
  );
}
