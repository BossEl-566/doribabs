
"use server";

import { revalidatePath } from "next/cache";

import { requireSchoolAdmin } from "@/lib/auth";

import {
  MEDIA_BUCKET,
  type MediaActionResult,
  type MediaAsset,
} from "@/lib/media";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function refreshMediaPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/media");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/events");
  revalidatePath("/gallery");
}

/**
 * Update an image's descriptive information
 * and its public-gallery visibility.
 */
export async function updateMediaAsset(
  id: string,
  altText: string,
  caption: string,
  isPublic: boolean
): Promise<MediaActionResult> {
  const { supabase } = await requireSchoolAdmin();

  if (!UUID_PATTERN.test(id)) {
    return {
      success: false,
      message: "Invalid media identifier.",
    };
  }

  const cleanAlt = altText.trim();
  const cleanCaption = caption.trim();

  if (cleanAlt.length < 3 || cleanAlt.length > 200) {
    return {
      success: false,
      message:
        "Alternative text must contain 3–200 characters.",
    };
  }

  if (cleanCaption.length > 500) {
    return {
      success: false,
      message:
        "The image caption cannot exceed 500 characters.",
    };
  }

  const { data, error } = await supabase
    .from("media_assets")
    .update({
      alt_text: cleanAlt,
      caption: cleanCaption || null,
      is_public: isPublic === true,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    console.error("Media update failed:", error);

    return {
      success: false,
      message: "Unable to update the selected image.",
    };
  }

  refreshMediaPages();

  return {
    success: true,
    message: "Image details updated successfully.",
  };
}

/**
 * Safely delete an unused media asset.
 *
 * PostgreSQL foreign keys prevent deleting
 * media records referenced by articles/events.
 */
export async function deleteMediaAsset(
  id: string
): Promise<MediaActionResult> {
  const { supabase } = await requireSchoolAdmin();

  if (!UUID_PATTERN.test(id)) {
    return {
      success: false,
      message: "Invalid media identifier.",
    };
  }

  // Retrieve the registered media record.
  const { data: asset, error: lookupError } =
    await supabase
      .from("media_assets")
      .select(
        "id, storage_path, alt_text, caption, is_public, created_by, created_at"
      )
      .eq("id", id)
      .maybeSingle();

  if (lookupError || !asset) {
    return {
      success: false,
      message: "Media file not found.",
    };
  }

  // Show a friendly error if the image is in use.
  const [postsResult, eventsResult] = await Promise.all([
    supabase
      .from("posts")
      .select("id")
      .eq("cover_image_path", asset.storage_path)
      .limit(1),

    supabase
      .from("events")
      .select("id")
      .eq("cover_image_path", asset.storage_path)
      .limit(1),
  ]);

  if (postsResult.error || eventsResult.error) {
    return {
      success: false,
      message:
        "Unable to verify image usage. Deletion cancelled.",
    };
  }

  if (
    (postsResult.data?.length ?? 0) > 0 ||
    (eventsResult.data?.length ?? 0) > 0
  ) {
    return {
      success: false,
      message:
        "This image is being used by a school article or event. Remove it from that content before deleting it.",
    };
  }

  // Delete the custom metadata record first.
  // The foreign keys also protect against a
  // concurrent new article/event reference.
  const { data: deleted, error: deleteError } =
    await supabase
      .from("media_assets")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

  if (deleteError || !deleted) {
    return {
      success: false,
      message:
        deleteError?.code === "23503"
          ? "This image is still referenced by content."
          : "Unable to delete the media record.",
    };
  }

  // Delete the physical object through Storage API.
  const { error: storageError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .remove([asset.storage_path]);

  if (storageError) {
    console.error(
      "Storage removal failed:",
      storageError
    );

    // Restore metadata when physical deletion fails.
    const { error: restoreError } = await supabase
      .from("media_assets")
      .insert(asset as MediaAsset);

    if (restoreError) {
      console.error(
        "Media metadata restoration failed:",
        restoreError
      );
    }

    return {
      success: false,
      message: restoreError
        ? "Storage cleanup failed and metadata could not be restored. Check Supabase Storage."
        : "Storage deletion failed. Media metadata was restored.",
    };
  }

  refreshMediaPages();

  return {
    success: true,
    message: "Unused media file deleted successfully.",
  };
}
