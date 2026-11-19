
"use server";

import { revalidatePath } from "next/cache";

import { requireSchoolAdmin } from "@/lib/auth";
import {
  POST_CATEGORIES,
  getArticleText,
  type ArticleInput,
} from "@/lib/posts";

type ActionResult = {
  success: boolean;
  message: string;
  id?: string;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const IMAGE_PATH_PATTERN =
  /^posts\/[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$/i;

/**
 * Create or update a Doribabs article.
 *
 * All validation happens again on the server.
 */
export async function saveArticle(
  input: ArticleInput
): Promise<ActionResult> {
  const { supabase, user } = await requireSchoolAdmin();

  const title = input.title?.trim() ?? "";
  const slug = input.slug?.trim().toLowerCase() ?? "";
  const excerpt = input.excerpt?.trim() ?? "";

  if (title.length < 5 || title.length > 160) {
    return {
      success: false,
      message: "The article title must contain 5–160 characters.",
    };
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slug.length > 140) {
    return {
      success: false,
      message: "Please enter a valid URL slug.",
    };
  }

  if (excerpt.length > 400) {
    return {
      success: false,
      message: "The summary cannot exceed 400 characters.",
    };
  }

  const validCategory = POST_CATEGORIES.some(
    (category) => category.value === input.category
  );

  if (!validCategory) {
    return {
      success: false,
      message: "Please select a valid article category.",
    };
  }

  if (!["draft", "published"].includes(input.status)) {
    return {
      success: false,
      message: "Invalid publication status.",
    };
  }

  if (
    !input.content ||
    input.content.type !== "doc" ||
    !Array.isArray(input.content.content)
  ) {
    return {
      success: false,
      message: "The article content is invalid.",
    };
  }

  // Keep the database payload within a reasonable limit.
  if (JSON.stringify(input.content).length > 200_000) {
    return {
      success: false,
      message: "The article content is too large.",
    };
  }

  if (
    input.status === "published" &&
    getArticleText(input.content).length < 20
  ) {
    return {
      success: false,
      message: "Please write article content before publishing.",
    };
  }

  if (
    input.cover_image_path &&
    !IMAGE_PATH_PATTERN.test(input.cover_image_path)
  ) {
    return {
      success: false,
      message: "Invalid cover image path.",
    };
  }

  let existingPublishedAt: string | null = null;

  if (input.id) {
    if (!UUID_PATTERN.test(input.id)) {
      return {
        success: false,
        message: "Invalid article identifier.",
      };
    }

    const { data: existing, error: lookupError } =
      await supabase
        .from("posts")
        .select("id, published_at")
        .eq("id", input.id)
        .maybeSingle();

    if (lookupError || !existing) {
      return {
        success: false,
        message: "Article not found or access denied.",
      };
    }

    existingPublishedAt = existing.published_at;
  }

  const payload = {
    title,
    slug,
    excerpt,
    category: input.category,
    content: input.content,
    status: input.status,
    is_featured: Boolean(input.is_featured),
    cover_image_path: input.cover_image_path,
    published_at:
      input.status === "published"
        ? existingPublishedAt ?? new Date().toISOString()
        : null,
  };

  let result;

  if (input.id) {
    result = await supabase
      .from("posts")
      .update(payload)
      .eq("id", input.id)
      .select("id")
      .single();
  } else {
    result = await supabase
      .from("posts")
      .insert({
        ...payload,
        author_id: user.id,
      })
      .select("id")
      .single();
  }

  if (result.error) {
    console.error("Article save failed:", result.error);

    return {
      success: false,
      message:
        result.error.code === "23505"
          ? "An article with this URL slug already exists."
          : "Unable to save the article. Please try again.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/");

  return {
    success: true,
    message: "Article saved successfully.",
    id: result.data.id,
  };
}

/**
 * Delete an article.
 * Storage files are deliberately not deleted here,
 * because another article might use the same image.
 */
export async function deleteArticle(
  id: string
): Promise<ActionResult> {
  const { supabase } = await requireSchoolAdmin();

  if (!UUID_PATTERN.test(id)) {
    return {
      success: false,
      message: "Invalid article identifier.",
    };
  }

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    console.error("Article delete failed:", error);

    return {
      success: false,
      message: "Unable to delete this article.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/");

  return {
    success: true,
    message: "Article deleted successfully.",
  };
}
