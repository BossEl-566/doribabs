
import type { JSONContent } from "@tiptap/react";

export type EventStatus = "draft" | "published";

export const EMPTY_EVENT_DESCRIPTION: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export type SchoolEventInput = {
  id?: string;
  title: string;
  slug: string;
  description: JSONContent;
  starts_at: string;
  ends_at: string | null;
  location: string;
  cover_image_path: string | null;
  status: EventStatus;
  is_featured: boolean;
};

export type SchoolEventRecord = Omit<
  SchoolEventInput,
  "starts_at" | "ends_at" | "location"
> & {
  id: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export function eventSlugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140)
    .replace(/-+$/, "");
}

/**
 * Ghana uses GMT (UTC+00:00) throughout the year.
 *
 * Convert a datetime-local value such as
 * "2026-12-12T09:30" to a UTC ISO timestamp.
 */
export function ghLocalToISOString(
  value: string
): string | null {
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
  ) {
    return null;
  }

  const parsed = new Date(`${value}:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  // Reject impossible calendar dates and times.
  if (parsed.toISOString().slice(0, 16) !== value) {
    return null;
  }

  return parsed.toISOString();
}

/**
 * Convert a database timestamp to the
 * local date-time input format used in Ghana.
 */
export function isoToGhLocal(value: string | null): string {
  if (!value) return "";

  return new Date(value).toISOString().slice(0, 16);
}

export function formatSchoolEventDate(
  value: string
): string {
  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Accra",
  }).format(new Date(value));
}
