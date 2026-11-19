
import type { JSONContent } from "@tiptap/react";

export const POST_CATEGORIES = [
  { value: "news", label: "School News" },
  { value: "academics", label: "Academics" },
  { value: "achievements", label: "Achievements" },
  { value: "notice", label: "Announcements / Notices" },
] as const;

export type PostCategory =
  (typeof POST_CATEGORIES)[number]["value"];

export type PostStatus = "draft" | "published";

export const EMPTY_ARTICLE: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export type ArticleInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: PostCategory;
  content: JSONContent;
  status: PostStatus;
  is_featured: boolean;
  cover_image_path: string | null;
};

export type ArticleRecord = ArticleInput & {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140)
    .replace(/-+$/, "");
}

export function getArticleText(content: JSONContent): string {
  const parts: string[] = [];

  function visit(node: JSONContent) {
    if (typeof node.text === "string") {
      parts.push(node.text);
    }

    node.content?.forEach(visit);
  }

  visit(content);

  return parts.join(" ").trim();
}
