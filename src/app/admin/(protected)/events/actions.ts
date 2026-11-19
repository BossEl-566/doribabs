
"use server";

import { revalidatePath } from "next/cache";

import { requireSchoolAdmin } from "@/lib/auth";
import {
  ghLocalToISOString,
  type SchoolEventInput,
} from "@/lib/events";

import { getArticleText } from "@/lib/posts";

type EventActionResult = {
  success: boolean;
  message: string;
  id?: string;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const IMAGE_PATTERN =
  /^events\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/i;

function revalidateEventPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
}

/**
 * Create or update a school event.
 */
export async function saveSchoolEvent(
  input: SchoolEventInput
): Promise<EventActionResult> {
  const { supabase } = await requireSchoolAdmin();

  const title = input.title?.trim() ?? "";
  const slug = input.slug?.trim().toLowerCase() ?? "";
  const location = input.location?.trim() ?? "";

  // Title validation
  if (title.length < 5 || title.length > 160) {
    return {
      success: false,
      message:
        "The event title must contain between 5 and 160 characters.",
    };
  }

  // URL slug validation
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    slug.length > 140
  ) {
    return {
      success: false,
      message: "Please enter a valid event URL slug.",
    };
  }

  if (location.length > 200) {
    return {
      success: false,
      message: "The location cannot exceed 200 characters.",
    };
  }

  if (!["draft", "published"].includes(input.status)) {
    return {
      success: false,
      message: "Invalid publication status.",
    };
  }

  // Validate start and end date values.
  const startsAt = ghLocalToISOString(input.starts_at);

  if (!startsAt) {
    return {
      success: false,
      message: "Please enter a valid event start date and time.",
    };
  }

  let endsAt: string | null = null;

  if (input.ends_at) {
    endsAt = ghLocalToISOString(input.ends_at);

    if (!endsAt) {
      return {
        success: false,
        message: "Please enter a valid event end date and time.",
      };
    }

    if (new Date(endsAt) < new Date(startsAt)) {
      return {
        success: false,
        message:
          "The event end date cannot be earlier than the start date.",
      };
    }
  }

  // Rich-text document validation
  if (
    !input.description ||
    input.description.type !== "doc" ||
    !Array.isArray(input.description.content)
  ) {
    return {
      success: false,
      message: "Invalid event description.",
    };
  }

  if (JSON.stringify(input.description).length > 200_000) {
    return {
      success: false,
      message: "The event description is too large.",
    };
  }

  if (
    input.status === "published" &&
    getArticleText(input.description).length < 20
  ) {
    return {
      success: false,
      message:
        "Please write an event description before publishing.",
    };
  }

  if (
    input.cover_image_path &&
    !IMAGE_PATTERN.test(input.cover_image_path)
  ) {
    return {
      success: false,
      message: "Invalid event cover image path.",
    };
  }

  if (input.id && !UUID_PATTERN.test(input.id)) {
    return {
      success: false,
      message: "Invalid event identifier.",
    };
  }

  const payload = {
    title,
    slug,
    description: input.description,
    starts_at: startsAt,
    ends_at: endsAt,
    location: location || null,
    cover_image_path: input.cover_image_path,
    status: input.status,
    is_featured: Boolean(input.is_featured),
  };

  let result;

  if (input.id) {
    // Update an existing event.
    result = await supabase
      .from("events")
      .update(payload)
      .eq("id", input.id)
      .select("id")
      .single();
  } else {
    // Create a new event.
    result = await supabase
      .from("events")
      .insert(payload)
      .select("id")
      .single();
  }

  if (result.error) {
    console.error("Event save error:", result.error);

    return {
      success: false,
      message:
        result.error.code === "23505"
          ? "An event with this URL slug already exists."
          : "Unable to save the event. Please try again.",
    };
  }

  revalidateEventPages();

  return {
    success: true,
    message:
      input.status === "published"
        ? "Event published successfully."
        : "Event saved as draft.",
    id: result.data.id,
  };
}

/**
 * Delete an existing event.
 */
export async function deleteSchoolEvent(
  id: string
): Promise<EventActionResult> {
  const { supabase } = await requireSchoolAdmin();

  if (!UUID_PATTERN.test(id)) {
    return {
      success: false,
      message: "Invalid event identifier.",
    };
  }

  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    console.error("Event deletion failed:", error);

    return {
      success: false,
      message: "Unable to delete the event.",
    };
  }

  revalidateEventPages();

  return {
    success: true,
    message: "Event deleted successfully.",
  };
}
