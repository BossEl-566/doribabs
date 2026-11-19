
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PencilLine } from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";
import ArticlePreview from "@/components/admin/article-preview";
import type { JSONContent } from "@tiptap/react";

type PreviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PreviewArticlePage({
  params,
}: PreviewPageProps) {
  const { id } = await params;
  const { supabase } = await requireSchoolAdmin();

  const { data: article, error } = await supabase
    .from("posts")
    .select(
      "id, title, excerpt, category, content, status, cover_image_path, created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to retrieve the article preview.");
  }

  if (!article) {
    notFound();
  }

  const coverUrl = article.cover_image_path
    ? supabase.storage
        .from("doribabs-media")
        .getPublicUrl(article.cover_image_path)
        .data.publicUrl
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>

        <Link
          href={`/admin/posts/${article.id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white hover:bg-[#105638]"
        >
          <PencilLine size={17} />
          Edit Article
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-7 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
            {article.category}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
            {article.status}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 text-sm text-slate-400">
          {new Intl.DateTimeFormat("en-GH", {
            dateStyle: "long",
            timeZone: "Africa/Accra",
          }).format(new Date(article.created_at))}
        </p>

        {article.excerpt && (
          <p className="mt-7 text-lg leading-8 text-slate-500">
            {article.excerpt}
          </p>
        )}

        {coverUrl && (
          <div className="my-9 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={article.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <div className="mt-9 border-t border-slate-100 pt-7">
          <ArticlePreview
            content={article.content as JSONContent}
          />
        </div>
      </div>
    </div>
  );
}
