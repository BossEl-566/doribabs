
import type { Metadata } from "next";

import { requireSchoolAdmin } from "@/lib/auth";
import ArticleForm from "@/components/admin/article-form";

export const metadata: Metadata = {
  title: "New Article | Doribabs Admin",
  robots: { index: false },
};

export default async function NewArticlePage() {
  await requireSchoolAdmin();

  return <ArticleForm />;
}
