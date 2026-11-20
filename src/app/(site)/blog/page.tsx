
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Newspaper,
  Search,
  Sparkles,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";
import { POST_CATEGORIES } from "@/lib/posts";

import {
  getPublicBlogListing,
  type BlogPost,
} from "@/lib/public-blog-listing";

import {
  getPublicMediaUrl,
} from "@/lib/public-content";

// ======================================================
// METADATA
// ======================================================

export const metadata: Metadata = {
  title: "School News & Blog | Doribabs School Complex",
  description:
    "Read the latest school news, announcements, achievements, academic updates and stories from Doribabs School Complex.",
  openGraph: {
    title: "News & Blog | Doribabs School Complex",
    description:
      "Discover the latest stories, school announcements and achievements from Doribabs.",
    images: [
      {
        url: "/images/school-achievement-and-award4.jpg",
        alt: "Doribabs School Complex achievements",
      },
    ],
  },
};

// ======================================================
// PAGE TYPES
// ======================================================

type BlogPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    category?: string | string[];
    q?: string | string[];
  }>;
};

type BlogUrlOptions = {
  page?: number;
  category?: string;
  search?: string;
};

// ======================================================
// GENERAL HELPERS
// ======================================================

const PAGE_SIZE = 9;

function firstParam(
  value: string | string[] | undefined
): string {
  return Array.isArray(value)
    ? value[0] ?? ""
    : value ?? "";
}

function getBlogUrl({
  page = 1,
  category = "",
  search = "",
}: BlogUrlOptions) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (search) {
    params.set("q", search);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query
    ? `/blog?${query}`
    : "/blog";
}

function formatCategory(category: string) {
  return category
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Accra",
  }).format(date);
}

function getCover(post: BlogPost) {
  if (post.cover_image_path) {
    const url = getPublicMediaUrl(
      post.cover_image_path
    );

    if (url) {
      return {
        src: url,
        alt: post.title,
      };
    }
  }

  return {
    src: "/images/school-building-and-compound4.jpg",
    alt: "Doribabs School Complex campus photograph",
  };
}

// ======================================================
// FEATURED ARTICLE CARD
// ======================================================

function FeaturedArticle({
  post,
}: {
  post: BlogPost;
}) {
  const cover = getCover(post);
  const date = formatDate(post.published_at);

  return (
    <article className="group relative isolate min-h-[440px] overflow-hidden rounded-3xl bg-[#103D2C] text-white sm:min-h-[520px] lg:h-full">
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#071C12]/95 via-[#071C12]/50 to-black/5" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-9 lg:p-10">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white backdrop-blur-sm">
            <Sparkles size={14} />
            {post.is_featured
              ? "Featured Story"
              : "Top Story"}
          </span>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/80">
            <span className="text-[#FFCA75]">
              {formatCategory(post.category)}
            </span>

            {date && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {date}
              </span>
            )}
          </div>

          <h3 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            <Link
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="after:absolute after:inset-0 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-white"
            >
              {post.title}
            </Link>
          </h3>

          {post.excerpt && (
            <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-7 text-white/80">
              {post.excerpt}
            </p>
          )}

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#FFCA75] transition group-hover:gap-3">
            Read Full Story
            <ArrowUpRight size={19} />
          </span>
        </div>
      </div>
    </article>
  );
}

// ======================================================
// SECONDARY SPOTLIGHT ARTICLE
// ======================================================

function SpotlightArticle({
  post,
}: {
  post: BlogPost;
}) {
  const cover = getCover(post);
  const date = formatDate(post.published_at);

  return (
    <article className="group flex min-h-[210px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:shadow-lg sm:min-h-[235px]">
      <div className="relative w-[39%] shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 640px) 40vw, 22vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-orange-700">
          {formatCategory(post.category)}
        </p>

        <h3 className="mt-3 line-clamp-3 text-base font-extrabold leading-snug text-slate-950 transition group-hover:text-[#176B49] sm:text-xl">
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            {post.title}
          </Link>
        </h3>

        {date && (
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={13} />
            {date}
          </p>
        )}

        <Link
          href={`/blog/${encodeURIComponent(post.slug)}`}
          aria-label={`Read ${post.title}`}
          className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#176B49]"
        >
          Read Story
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// STANDARD ARTICLE CARD
// ======================================================

function BlogArticleCard({
  post,
}: {
  post: BlogPost;
}) {
  const cover = getCover(post);
  const date = formatDate(post.published_at);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      <Link
        href={`/blog/${encodeURIComponent(post.slug)}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        aria-label={`Read ${post.title}`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {post.is_featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#F4A43C] px-3 py-1.5 text-[10px] font-extrabold text-[#103D2C] shadow-sm">
            <Sparkles size={12} />
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-[#EAF5EE] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-[#176B49]">
            {formatCategory(post.category)}
          </span>

          {date && (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays size={13} />
              {date}
            </span>
          )}
        </div>

        <h3 className="mt-5 line-clamp-3 text-xl font-extrabold leading-snug tracking-tight text-slate-950 transition group-hover:text-[#176B49]">
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? (
          <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-slate-600">
            {post.excerpt}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <Link
          href={`/blog/${encodeURIComponent(post.slug)}`}
          className="mt-7 inline-flex items-center gap-2 self-start text-sm font-extrabold text-[#176B49] transition group-hover:gap-3"
        >
          Read Article
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// PAGINATION
// ======================================================

function BlogPagination({
  currentPage,
  totalPages,
  category,
  search,
}: {
  currentPage: number;
  totalPages: number;
  category: string;
  search: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const firstVisible = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4)
  );

  const lastVisible = Math.min(
    totalPages,
    firstVisible + 4
  );

  const pageNumbers = Array.from(
    { length: lastVisible - firstVisible + 1 },
    (_, index) => firstVisible + index
  );

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={
            getBlogUrl({
              page: currentPage - 1,
              category,
              search,
            }) + "#latest-stories"
          }
          className="inline-flex h-11 items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-green-50"
        >
          <ChevronLeft size={17} />
          Previous
        </Link>
      ) : (
        <span className="inline-flex h-11 cursor-not-allowed items-center gap-1 rounded-xl border border-slate-100 px-4 text-sm text-slate-400">
          <ChevronLeft size={17} />
          Previous
        </span>
      )}

      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={
            getBlogUrl({
              page: number,
              category,
              search,
            }) + "#latest-stories"
          }
          aria-current={
            number === currentPage ? "page" : undefined
          }
          className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-sm font-extrabold transition ${
            number === currentPage
              ? "bg-[#176B49] text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-green-50"
          }`}
        >
          {number}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={
            getBlogUrl({
              page: currentPage + 1,
              category,
              search,
            }) + "#latest-stories"
          }
          className="inline-flex h-11 items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-green-50"
        >
          Next
          <ChevronRight size={17} />
        </Link>
      ) : (
        <span className="inline-flex h-11 cursor-not-allowed items-center gap-1 rounded-xl border border-slate-100 px-4 text-sm text-slate-400">
          Next
          <ChevronRight size={17} />
        </span>
      )}
    </nav>
  );
}

// ======================================================
// BLOG LISTING PAGE
// ======================================================

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  await connection();

  const params = await searchParams;

  const rawCategory = firstParam(
    params.category
  ).trim();

  const search = firstParam(params.q)
    .trim()
    .slice(0, 100);

  const allowedCategories = POST_CATEGORIES.map(
    (item) => item.value
  );


const category = allowedCategories.some(
  (value) => value === rawCategory
)
  ? rawCategory
  : "";


  const rawPage = Number.parseInt(
    firstParam(params.page),
    10
  );

  const requestedPage =
    Number.isSafeInteger(rawPage) && rawPage > 0
      ? Math.min(rawPage, 100000)
      : 1;

  let result = await getPublicBlogListing({
    page: requestedPage,
    pageSize: PAGE_SIZE,
    category,
    search,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(result.total / PAGE_SIZE)
  );

  // Handle page numbers that are beyond the results.
  if (
    result.total > 0 &&
    requestedPage > totalPages
  ) {
    result = await getPublicBlogListing({
      page: totalPages,
      pageSize: PAGE_SIZE,
      category,
      search,
    });
  }

  const currentPage = result.page;
  const posts = result.items;
  const total = result.total;

  // Show the editorial spotlight only on the
  // unfiltered first page.
  const showSpotlight =
    currentPage === 1 &&
    !category &&
    !search &&
    posts.length > 0;

  const spotlightPosts = showSpotlight
    ? posts.slice(0, 3)
    : [];

  // Prevent duplicates between spotlight and grid.
  const remainingPosts = showSpotlight
    ? posts.slice(3)
    : posts;

  const firstResult =
    total > 0
      ? (currentPage - 1) * PAGE_SIZE + 1
      : 0;

  const lastResult =
    total > 0
      ? Math.min(currentPage * PAGE_SIZE, total)
      : 0;

  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: PHOTOGRAPHIC HERO
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] text-white">
        <Image
          src="/images/random-students-picture1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/90 to-[#071C12]/70" />

        <div className="relative mx-auto grid min-h-[590px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs font-semibold text-white/75"
              >
                <Link
                  href="/"
                  className="hover:text-[#FFCA75]"
                >
                  Home
                </Link>

                <ChevronRight size={14} />

                <span className="text-[#FFCA75]">
                  News & Blog
                </span>
              </nav>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  The Doribabs Journal
                </span>
              </div>

              <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Stories.
                <span className="block text-[#F4B45C]">
                  Moments.
                </span>
                Achievements.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                Explore school announcements,
                student achievements, academic updates,
                activities and stories from the
                Doribabs community.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#latest-stories"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  Explore School News
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  School Events
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* School photography */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl border border-white/20 bg-white/10">
                <Image
                  src="/images/school-achievement-and-award4.jpg"
                  alt="Doribabs School Complex achievements"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/school-culture-dance3.jpg"
                  alt="Cultural performances at Doribabs"
                  fill
                  sizes="(max-width: 1024px) 50vw, 23vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/computer-lab2.jpg"
                  alt="Computer learning at Doribabs"
                  fill
                  sizes="(max-width: 1024px) 50vw, 23vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: FEATURED ARTICLES
          ================================================== */}

      {showSpotlight && (
        <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                    <Newspaper size={17} />
                    From Our Community
                  </span>

                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                    In the Spotlight
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-8 text-slate-500">
                    Discover highlighted school stories
                    and recent announcements.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
              <Reveal className="min-h-full">
                <FeaturedArticle
                  post={spotlightPosts[0]}
                />
              </Reveal>

              {spotlightPosts.length > 1 && (
                <div className="grid gap-6">
                  {spotlightPosts.slice(1).map(
                    (post, index) => (
                      <Reveal
                        key={post.id}
                        delay={(index + 1) * 0.1}
                      >
                        <SpotlightArticle post={post} />
                      </Reveal>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          SECTION 3: ARTICLE SEARCH & CATEGORY FILTERS
          ================================================== */}

      <section
        id="latest-stories"
        className="scroll-mt-32 bg-[#F6F9F6] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <BookOpen size={17} />
                  School News Centre
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  {search
                    ? "Search Results"
                    : category
                    ? formatCategory(category)
                    : "All News & Stories"}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-500">
                  Browse published school news,
                  announcements, activities and
                  community updates.
                </p>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition hover:gap-3"
              >
                View School Events
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          {/* Search form */}
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <form
                action="/blog"
                method="get"
                role="search"
                className="flex flex-col gap-3 sm:flex-row"
              >
                {category && (
                  <input
                    type="hidden"
                    name="category"
                    value={category}
                  />
                )}

                <div className="relative flex-1">
                  <Search
                    size={20}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    name="q"
                    defaultValue={search}
                    maxLength={100}
                    placeholder="Search news headlines..."
                    aria-label="Search news headlines"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-[#FAFCFA] py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#176B49] px-7 text-sm font-bold text-white transition hover:bg-[#105638]"
                >
                  <Search size={17} />
                  Search News
                </button>

                {(search || category) && (
                  <Link
                    href="/blog#latest-stories"
                    className="inline-flex h-13 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Reset
                  </Link>
                )}
              </form>
            </div>
          </Reveal>

          {/* Category links */}
          <div
            aria-label="Filter by category"
            className="mt-8 flex flex-wrap gap-2"
          >
            <Link
              href={
                getBlogUrl({ search }) +
                "#latest-stories"
              }
              aria-current={
                !category ? "page" : undefined
              }
              className={`rounded-full px-5 py-3 text-xs font-extrabold transition sm:text-sm ${
                !category
                  ? "bg-[#176B49] text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-200 hover:bg-green-50"
              }`}
            >
              All Stories
            </Link>

            {allowedCategories.map((value) => (
              <Link
                key={value}
                href={
                  getBlogUrl({
                    category: value,
                    search,
                  }) + "#latest-stories"
                }
                aria-current={
                  category === value
                    ? "page"
                    : undefined
                }
                className={`rounded-full px-5 py-3 text-xs font-extrabold transition sm:text-sm ${
                  category === value
                    ? "bg-[#176B49] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-green-200 hover:bg-green-50"
                }`}
              >
                {formatCategory(value)}
              </Link>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <p className="text-sm text-slate-500">
              {total > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {firstResult}–{lastResult}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">
                    {total}
                  </span>{" "}
                  published articles
                </>
              ) : (
                "No matching published articles"
              )}
            </p>

            <span className="text-xs font-semibold text-slate-500">
              {search
                ? `Headline search: "${search}"`
                : "Featured stories first"}
            </span>
          </div>

          {/* Article grid */}
          {remainingPosts.length > 0 ? (
            <div className="mt-9 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post, index) => (
                <Reveal
                  key={post.id}
                  delay={Math.min(index * 0.05, 0.2)}
                  className="h-full"
                >
                  <BlogArticleCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : total === 0 ? (
            <Reveal>
              <div className="mt-9 rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-green-50 text-[#176B49]">
                  {search || category ? (
                    <Search size={32} />
                  ) : (
                    <Newspaper size={32} />
                  )}
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                  {search || category
                    ? "No matching articles found"
                    : "School stories are coming soon"}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-8 text-slate-500">
                  {search || category
                    ? "Try another headline search or choose a different category."
                    : "Published articles from the Doribabs administration will appear here."}
                </p>

                {(search || category) && (
                  <Link
                    href="/blog#latest-stories"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white"
                  >
                    View All Stories
                    <ArrowRight size={17} />
                  </Link>
                )}
              </div>
            </Reveal>
          ) : (
            <p className="mt-9 text-sm text-slate-500">
              The articles on this page are displayed
              in the spotlight above.
            </p>
          )}

          {/* Pagination */}
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
            search={search}
          />
        </div>
      </section>

      {/* ==================================================
          SECTION 4: PHOTOGRAPHIC SCHOOL HIGHLIGHTS
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <ImageIcon size={18} />
                  Life in Pictures
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Around Doribabs
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-600">
                  A photographic glimpse of learning,
                  achievements and activities across
                  our school community.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition hover:gap-3"
              >
                Visit Our Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[
              {
                src: "/images/school-culture-dance4.jpg",
                alt: "School cultural activities",
                label: "Culture & Creativity",
              },
              {
                src: "/images/school-achievement-and-award21.jpg",
                alt: "Doribabs school achievements",
                label: "Achievements",
              },
              {
                src: "/images/computer-lab4.jpeg",
                alt: "Computer laboratory learning",
                label: "Digital Learning",
              },
              {
                src: "/images/regimental-band3.jpg",
                alt: "Regimental band activities",
                label: "School Activities",
              },
            ].map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.07}
              >
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <p className="absolute inset-x-4 bottom-5 text-xs font-extrabold text-white sm:text-base">
                    {photo.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: KEEP EXPLORING
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-24">
        <Image
          src="/images/school-borad-with-some-tudent-group-pics4.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071C12]/85" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-[#FFCA75]">
              <Sparkles size={17} />
              Stay Connected
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              More Than News.
              <span className="mt-2 block text-[#F4A43C]">
                A Growing Community.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Explore upcoming school events,
              our academic programmes and life
              at Doribabs School Complex.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#123B29] transition hover:bg-[#FFCA75]"
              >
                Upcoming Events
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/student-life"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Explore Student Life
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
