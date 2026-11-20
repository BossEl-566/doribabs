
import "server-only";

import { createClient } from "@supabase/supabase-js";
import { POST_CATEGORIES } from "@/lib/posts";

// ======================================================
// PUBLIC BLOG TYPES
// ======================================================

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  cover_image_path: string | null;
  published_at: string | null;
  is_featured: boolean;
};

type BlogOptions = {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
};

export type BlogListingResult = {
  items: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
};

// ======================================================
// SUPABASE PUBLIC CLIENT
// ======================================================

function publicDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}

// ======================================================
// HELPERS
// ======================================================

function positiveInteger(
  value: number | undefined,
  fallback: number
) {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 1
  ) {
    return fallback;
  }

  return value;
}

// Escape LIKE wildcard characters so searches
// behave as literal text rather than wildcard input.
function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, "\\$&");
}

// ======================================================
// QUERY PUBLISHED BLOG POSTS
// ======================================================

export async function getPublicBlogListing(
  options: BlogOptions = {}
): Promise<BlogListingResult> {
  const page = Math.min(
    positiveInteger(options.page, 1),
    100000
  );

  const pageSize = Math.min(
    positiveInteger(options.pageSize, 9),
    30
  );

  const requestedCategory = options.category?.trim() ?? "";

  const validCategories = new Set<string>(
    POST_CATEGORIES.map((item) => item.value)
  );

  const category = validCategories.has(requestedCategory)
    ? requestedCategory
    : "";

  const search = (options.search ?? "")
    .trim()
    .slice(0, 100);

  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const supabase = publicDb();

  // Only published posts are eligible for public display.
  let query = supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, category, cover_image_path, published_at, is_featured",
      { count: "exact" }
    )
    .eq("status", "published");

  // Apply category filtering across all published posts.
  if (category) {
    query = query.eq("category", category);
  }

  // Search published post headlines.
  // This is database-side search, not client filtering.
  if (search) {
    query = query.ilike(
      "title",
      `%${escapeLike(search)}%`
    );
  }

  // Featured content first, followed by recent stories.
  const { data, error, count } = await query
    .order("is_featured", {
      ascending: false,
    })
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("id", {
      ascending: false,
    })
    .range(start, end);

  if (error) {
    console.error(
      "Public blog listing failed:",
      error.message
    );

    throw new Error(
      "Unable to load published school news."
    );
  }

  return {
    items: (data ?? []) as BlogPost[],
    total: count ?? 0,
    page,
    pageSize,
  };
}
