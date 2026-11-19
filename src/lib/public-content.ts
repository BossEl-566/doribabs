
import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { JSONContent } from "@tiptap/react";

import { MEDIA_BUCKET } from "@/lib/media";
import { POST_CATEGORIES } from "@/lib/posts";

// ============================================================
// PUBLIC CONTENT TYPES
// ============================================================

export type PublicPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  cover_image_path: string | null;
  published_at: string | null;
  created_at: string;
  is_featured: boolean;
};

export type PublicPostDetail = PublicPost & {
  content: JSONContent;
};

export type PublicEvent = {
  id: string;
  title: string;
  slug: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  cover_image_path: string | null;
  is_featured: boolean;
};

export type PublicEventDetail = PublicEvent & {
  description: JSONContent;
};

export type PublicGalleryImage = {
  id: string;
  storage_path: string;
  alt_text: string;
  caption: string | null;
};

// ============================================================
// QUERY OPTIONS
// ============================================================

type PageOptions = {
  page?: number;
  pageSize?: number;
};

type PostOptions = PageOptions & {
  category?: string;
  featuredFirst?: boolean;
};

type EventOptions = PageOptions & {
  mode?: "upcoming" | "past";
  now: string;
  featuredFirst?: boolean;
};

// ============================================================
// PUBLIC SUPABASE CLIENT
// ============================================================

/**
 * Creates a Supabase client for public website content.
 *
 * Important:
 * - Does not use administrator cookies.
 * - Does not use a service-role or secret key.
 * - Relies on Row Level Security.
 * - Does not persist authentication sessions.
 */
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

// ============================================================
// PUBLIC MEDIA URL
// ============================================================

/**
 * Generate a public URL for an image stored
 * in the Doribabs Supabase Storage bucket.
 */
export function getPublicMediaUrl(
  path: string | null | undefined
): string | null {
  if (!path) return null;

  const supabase = publicDb();

  const { data } = supabase.storage
    .from(MEDIA_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

// ============================================================
// PUBLISHED POSTS
// ============================================================

/**
 * Fetch published articles.
 *
 * Standard ordering:
 * Newest published articles first.
 *
 * featuredFirst = true:
 * Featured articles appear first, then newest first
 * within each featured/non-featured group.
 *
 * Supports category filtering and pagination.
 */
export async function getPublishedPosts({
  page = 1,
  pageSize = 9,
  category,
  featuredFirst = false,
}: PostOptions = {}) {
  const supabase = publicDb();

  const safePage = Math.max(1, Math.floor(page) || 1);
  const safePageSize = Math.max(
    1,
    Math.min(100, Math.floor(pageSize) || 9)
  );

  const from = (safePage - 1) * safePageSize;

  let query = supabase
    .from("posts")
    .select(
      "id,title,slug,excerpt,category,cover_image_path,published_at,created_at,is_featured",
      { count: "exact" }
    )
    .eq("status", "published");

  // Apply optional category filtering.
  if (
    category &&
    POST_CATEGORIES.some(
      (item) => item.value === category
    )
  ) {
    query = query.eq("category", category);
  }

  // Prioritise featured articles on the homepage.
  if (featuredFirst) {
    query = query.order("is_featured", {
      ascending: false,
    });
  }

  // Always order by publication date within each group.
  query = query
    .order("published_at", {
      ascending: false,
    })
    .order("id", {
      ascending: false,
    });

  const { data, count, error } = await query.range(
    from,
    from + safePageSize - 1
  );

  if (error) {
    console.error("Public posts query failed:", error);

    throw new Error(
      "Unable to load school articles."
    );
  }

  return {
    items: (data ?? []) as PublicPost[],
    total: count ?? 0,
  };
}

// ============================================================
// SINGLE PUBLISHED ARTICLE
// ============================================================

/**
 * Fetch a published article using its URL slug.
 *
 * Draft articles are not returned.
 */
export async function getPublishedPostBySlug(
  slug: string
): Promise<PublicPostDetail | null> {
  const supabase = publicDb();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,title,slug,excerpt,category,content,cover_image_path,published_at,created_at,is_featured"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Public article lookup failed:",
      error
    );

    throw new Error(
      "Unable to load the selected article."
    );
  }

  return data as PublicPostDetail | null;
}

// ============================================================
// PUBLISHED SCHOOL EVENTS
// ============================================================

/**
 * Fetch published school events.
 *
 * mode = "upcoming":
 * Events starting now or in the future.
 * Earliest dates first.
 *
 * mode = "past":
 * Events whose start time has passed.
 * Most recently started first.
 *
 * featuredFirst = true:
 * Featured events are prioritised before date ordering.
 *
 * Supports pagination.
 */
export async function getPublishedEvents({
  page = 1,
  pageSize = 9,
  mode = "upcoming",
  now,
  featuredFirst = false,
}: EventOptions) {
  const supabase = publicDb();

  const safePage = Math.max(1, Math.floor(page) || 1);
  const safePageSize = Math.max(
    1,
    Math.min(100, Math.floor(pageSize) || 9)
  );

  const from = (safePage - 1) * safePageSize;

  let query = supabase
    .from("events")
    .select(
      "id,title,slug,starts_at,ends_at,location,cover_image_path,is_featured",
      { count: "exact" }
    )
    .eq("status", "published");

  // Prioritise featured events when requested.
  if (featuredFirst) {
    query = query.order("is_featured", {
      ascending: false,
    });
  }

  if (mode === "upcoming") {
    query = query
      .gte("starts_at", now)
      .order("starts_at", {
        ascending: true,
      });
  } else {
    query = query
      .lt("starts_at", now)
      .order("starts_at", {
        ascending: false,
      });
  }

  // Stable ordering when event dates are identical.
  query = query.order("id", {
    ascending: false,
  });

  const { data, count, error } = await query.range(
    from,
    from + safePageSize - 1
  );

  if (error) {
    console.error(
      "Public events query failed:",
      error
    );

    throw new Error(
      "Unable to load school events."
    );
  }

  return {
    items: (data ?? []) as PublicEvent[],
    total: count ?? 0,
  };
}

// ============================================================
// SINGLE PUBLISHED EVENT
// ============================================================

/**
 * Retrieve an individual published school event.
 *
 * Unpublished events are not returned.
 */
export async function getPublishedEventBySlug(
  slug: string
): Promise<PublicEventDetail | null> {
  const supabase = publicDb();

  const { data, error } = await supabase
    .from("events")
    .select(
      "id,title,slug,description,starts_at,ends_at,location,cover_image_path,is_featured"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Public event lookup failed:",
      error
    );

    throw new Error(
      "Unable to load the selected event."
    );
  }

  return data as PublicEventDetail | null;
}

// ============================================================
// PUBLIC PHOTO GALLERY
// ============================================================

/**
 * Fetch images approved for the public gallery.
 *
 * Only records with is_public = true are returned.
 *
 * Images are ordered newest first.
 */
export async function getPublicGallery({
  page = 1,
  pageSize = 12,
}: PageOptions = {}) {
  const supabase = publicDb();

  const safePage = Math.max(1, Math.floor(page) || 1);
  const safePageSize = Math.max(
    1,
    Math.min(100, Math.floor(pageSize) || 12)
  );

  const from = (safePage - 1) * safePageSize;

  const { data, count, error } = await supabase
    .from("media_assets")
    .select(
      "id,storage_path,alt_text,caption",
      { count: "exact" }
    )
    .eq("is_public", true)
    .order("created_at", {
      ascending: false,
    })
    .order("id", {
      ascending: false,
    })
    .range(
      from,
      from + safePageSize - 1
    );

  if (error) {
    console.error(
      "Public gallery query failed:",
      error
    );

    throw new Error(
      "Unable to load the school gallery."
    );
  }

  return {
    items: (data ?? []) as PublicGalleryImage[],
    total: count ?? 0,
  };
}
