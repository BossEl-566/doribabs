
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { ArrowLeft, Newspaper } from "lucide-react";

import PostCard from "@/components/public/post-card";
import Pagination from "@/components/public/pagination";

import { getPublishedPosts } from "@/lib/public-content";
import { POST_CATEGORIES } from "@/lib/posts";

export const metadata: Metadata = {
  title: "School News & Blog | Doribabs School Complex",
  description:
    "Explore the latest news, academic achievements, announcements and activities from Doribabs School Complex.",
};

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 9;

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  await connection();

  const params = await searchParams;

  const category = POST_CATEGORIES.find(
    (item) => item.value === params.category
  )?.value;

  const page = Math.max(
    1,
    Math.min(1000, Number.parseInt(params.page ?? "1", 10) || 1)
  );

  const { items: posts, total } = await getPublishedPosts({
    page,
    pageSize: PAGE_SIZE,
    category,
  });

  const categories = [
    { value: "", label: "All News" },
    ...POST_CATEGORIES,
  ];

  return (
    <main className="min-h-screen bg-[#F8FAF8]">
      {/* Page introduction */}
      <section className="bg-[#EAF5EE] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#176B49]"
          >
            <ArrowLeft size={17} />
            Home
          </Link>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-bold text-[#176B49]">
            <Newspaper size={16} />
            THE LATEST FROM DORIBABS
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            News & Stories
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Stay connected with the latest school
            announcements, academic milestones, learner
            achievements and activities at Doribabs
            School Complex.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const active = (category ?? "") === item.value;

              return (
                <Link
                  key={item.value}
                  href={
                    item.value
                      ? `/blog?category=${item.value}`
                      : "/blog"
                  }
                  className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${
                    active
                      ? "bg-[#176B49] text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-green-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <p className="text-sm text-slate-400">
            {total} published article{total === 1 ? "" : "s"}
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                page={page}
                total={total}
                pageSize={PAGE_SIZE}
                basePath="/blog"
                query={
                  category ? { category } : {}
                }
              />
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-24 text-center">
            <Newspaper
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-6 text-xl font-bold text-slate-900">
              No articles available
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              There are no published articles matching
              this selection at the moment.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
