
import "server-only";

import { createClient } from "@supabase/supabase-js";

// ======================================================
// PUBLIC EVENT TYPES
// ======================================================

export type PublicSchoolEvent = {
  id: string;
  title: string;
  slug: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  cover_image_path: string | null;
  is_featured: boolean;
};

export type EventView = "upcoming" | "past";

type EventListingOptions = {
  view?: EventView;
  page?: number;
  pageSize?: number;
  search?: string;
  now: string;
};

export type EventListingResult = {
  items: PublicSchoolEvent[];
  total: number;
  page: number;
  pageSize: number;
};

// ======================================================
// PUBLIC SUPABASE CLIENT
// ======================================================

function publicDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing public Supabase environment variables."
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
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

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, "\\$&");
}

// ======================================================
// QUERY PUBLISHED SCHOOL EVENTS
// ======================================================

export async function getPublicEventListing({
  view = "upcoming",
  page = 1,
  pageSize = 9,
  search = "",
  now,
}: EventListingOptions): Promise<EventListingResult> {
  const safePage = Math.min(
    positiveInteger(page, 1),
    100000
  );

  const safePageSize = Math.min(
    positiveInteger(pageSize, 9),
    30
  );

  const safeSearch = search.trim().slice(0, 100);

  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize - 1;

  const supabase = publicDb();

  let query = supabase
    .from("events")
    .select(
      "id, title, slug, starts_at, ends_at, location, cover_image_path, is_featured",
      { count: "exact" }
    )
    .eq("status", "published");

  // The school stores timestamps in UTC.
  // We compare them with the current ISO timestamp.
  if (view === "past") {
    query = query.lt("starts_at", now);
  } else {
    query = query.gte("starts_at", now);
  }

  // Search real, published event titles.
  if (safeSearch) {
    query = query.ilike(
      "title",
      `%${escapeLike(safeSearch)}%`
    );
  }

  if (view === "upcoming") {
    query = query
      .order("is_featured", {
        ascending: false,
      })
      .order("starts_at", {
        ascending: true,
      });
  } else {
    query = query.order("starts_at", {
      ascending: false,
    });
  }

  const { data, error, count } = await query
    .order("id", {
      ascending: false,
    })
    .range(start, end);

  if (error) {
    console.error(
      "Public events listing failed:",
      error.message
    );

    throw new Error(
      "Unable to load published school events."
    );
  }

  return {
    items: (data ?? []) as PublicSchoolEvent[],
    total: count ?? 0,
    page: safePage,
    pageSize: safePageSize,
  };
}
