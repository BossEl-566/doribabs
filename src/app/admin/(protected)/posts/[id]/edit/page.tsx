
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { requireSchoolAdmin } from "@/lib/auth";
import ArticleForm from "@/components/admin/article-form";
import type { ArticleRecord } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Edit Article | Doribabs Admin",
  robots: { index: false },
};

type EditArticlePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;
  const { supabase } = await requireSchoolAdmin();

  const { data: article, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, category, content, status, is_featured, cover_image_path, created_at, updated_at, published_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Unable to load article:", error);
    throw new Error("Unable to load the selected article.");
  }

  if (!article) {
    notFound();
  }

  return (
    <ArticleForm
      initialArticle={article as ArticleRecord}
    />
  );
}
