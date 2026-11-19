
"use client";

import {
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/react";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  ImagePlus,
  LoaderCircle,
  MapPin,
  Save,
  Send,
  Star,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { saveSchoolEvent } from
  "@/app/admin/(protected)/events/actions";

import {
  EMPTY_EVENT_DESCRIPTION,
  eventSlugify,
  isoToGhLocal,
  type EventStatus,
  type SchoolEventInput,
  type SchoolEventRecord,
} from "@/lib/events";

import ArticleEditor from "./article-editor";
import ArticlePreview from "./article-preview";

type EventFormProps = {
  initialEvent?: SchoolEventRecord;
};

export default function EventForm({
  initialEvent,
}: EventFormProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const isEditing = Boolean(initialEvent);

  // Event information
  const [title, setTitle] = useState(
    initialEvent?.title ?? ""
  );

  const [slug, setSlug] = useState(
    initialEvent?.slug ?? ""
  );

  const [slugEdited, setSlugEdited] = useState(
    isEditing
  );

  const [location, setLocation] = useState(
    initialEvent?.location ?? ""
  );

  const [startsAt, setStartsAt] = useState(
    isoToGhLocal(initialEvent?.starts_at ?? null)
  );

  const [endsAt, setEndsAt] = useState(
    isoToGhLocal(initialEvent?.ends_at ?? null)
  );

  const [description, setDescription] =
    useState<JSONContent>(
      initialEvent?.description ??
        EMPTY_EVENT_DESCRIPTION
    );

  const [coverPath, setCoverPath] =
    useState<string | null>(
      initialEvent?.cover_image_path ?? null
    );

  const [isFeatured, setIsFeatured] = useState(
    initialEvent?.is_featured ?? false
  );

  // Interface state
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const coverUrl = coverPath
    ? supabase.storage
        .from("doribabs-media")
        .getPublicUrl(coverPath).data.publicUrl
    : null;

  const isBusy = isSaving || isUploading;

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(eventSlugify(value));
    }
  }

  /**
   * Upload the event cover image.
   * The file is also registered in media_assets.
   */
  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);
    setMessage(null);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    // Standard Supabase uploads work best with smaller files.
    const maxSize = 6 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Please select an image smaller than 6 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error(
          "Your session has expired. Please sign in again."
        );
      }

      const extension =
        file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : "jpg";

      const path =
        `events/${crypto.randomUUID()}.${extension}`;

      // Upload to Supabase Storage.
      const { error: uploadError } =
        await supabase.storage
          .from("doribabs-media")
          .upload(path, file, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: false,
          });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Register the image in the media library.
      const { error: mediaError } = await supabase
        .from("media_assets")
        .insert({
          storage_path: path,
          alt_text: title.trim() || file.name,
          created_by: user.id,
          is_public: false,
        });

      if (mediaError) {
        // Roll back the uploaded object.
        const { error: cleanupError } =
          await supabase.storage
            .from("doribabs-media")
            .remove([path]);

        if (cleanupError) {
          console.error(
            "Unable to clean up uploaded object:",
            cleanupError
          );
        }

        throw new Error(mediaError.message);
      }

      setCoverPath(path);
      setMessage("Event cover uploaded successfully.");
    } catch (err) {
      console.error("Event image upload failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload the event image."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  /**
   * Save draft or publish.
   */
  async function handleSave(status: EventStatus) {
    if (isBusy) return;

    setError(null);
    setMessage(null);

    // Basic client-side validation.
    if (title.trim().length < 5) {
      setError("Please enter a valid event title.");
      return;
    }

    if (!startsAt) {
      setError("Please select an event start date and time.");
      return;
    }

    if (endsAt && endsAt < startsAt) {
      setError(
        "The event end time cannot be earlier than its start time."
      );
      return;
    }

    setIsSaving(true);

    const payload: SchoolEventInput = {
      id: initialEvent?.id,
      title,
      slug,
      description,
      starts_at: startsAt,
      ends_at: endsAt || null,
      location,
      cover_image_path: coverPath,
      status,
      is_featured: isFeatured,
    };

    try {
      const result = await saveSchoolEvent(payload);

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      console.error("Event save failed:", err);

      setError(
        "Something went wrong while saving the event."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Back */}
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-700"
      >
        <ArrowLeft size={18} />
        Back to Events
      </Link>

      {/* Page heading */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {isEditing ? "Edit School Event" : "Create School Event"}
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Add event information, schedule details,
          photographs, and publishing settings.
        </p>
      </div>

      {/* Feedback */}
      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <span>{error}</span>
          <button
            type="button"
            aria-label="Dismiss error"
            onClick={() => setError(null)}
          >
            <X size={17} />
          </button>
        </div>
      )}

      {message && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 xl:col-span-2">
          {/* Event information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <CalendarDays size={22} />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Event Information
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Basic details about the school event
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Event Title *
                </label>

                <input
                  id="event-title"
                  type="text"
                  maxLength={160}
                  value={title}
                  onChange={(e) =>
                    handleTitleChange(e.target.value)
                  }
                  placeholder="e.g. Annual Speech and Prize-Giving Day"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />
              </div>

              {/* Slug */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="event-slug"
                    className="text-sm font-semibold"
                  >
                    Event URL
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setSlug(eventSlugify(title));
                      setSlugEdited(false);
                    }}
                    className="text-xs font-semibold text-green-700 hover:underline"
                  >
                    Regenerate
                  </button>
                </div>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-green-700">
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-xs text-slate-500">
                    /events/
                  </span>

                  <input
                    id="event-slug"
                    value={slug}
                    maxLength={140}
                    onChange={(e) => {
                      setSlug(eventSlugify(e.target.value));
                      setSlugEdited(true);
                    }}
                    placeholder="event-url"
                    className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="event-location"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                >
                  <MapPin size={16} />
                  Event Location
                </label>

                <input
                  id="event-location"
                  type="text"
                  maxLength={200}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Doribabs School Assembly Hall"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />
              </div>
            </div>
          </section>

          {/* Event schedule */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Clock3 size={22} />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Event Schedule
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  All times are Ghana Standard Time (GMT)
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="event-start"
                  className="mb-2 block text-sm font-semibold"
                >
                  Start Date & Time *
                </label>

                <input
                  id="event-start"
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label
                  htmlFor="event-end"
                  className="mb-2 block text-sm font-semibold"
                >
                  End Date & Time
                </label>

                <input
                  id="event-end"
                  type="datetime-local"
                  value={endsAt}
                  min={startsAt || undefined}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-green-700"
                />
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500">
              The end date is optional. You can also add
              previous school events for archival purposes.
            </p>
          </section>

          {/* Event description */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">
                  Event Description
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Explain the programme and important details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {isPreview ? (
                  <>
                    <X size={16} />
                    Close Preview
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Preview
                  </>
                )}
              </button>
            </div>

            {isPreview ? (
              <div className="min-h-80 rounded-xl border border-slate-200 p-6">
                <h3 className="mb-5 text-2xl font-bold">
                  {title || "Untitled Event"}
                </h3>

                <ArticlePreview content={description} />
              </div>
            ) : (
              <ArticleEditor
                initialContent={description}
                onChange={setDescription}
              />
            )}
          </section>
        </div>

        {/* Settings sidebar */}
        <aside className="space-y-6">
          {/* Publish settings */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Event Publishing
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Published events become available to visitors.
              Drafts remain restricted to administrators.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSave("published")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176B49] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#105638] disabled:opacity-50"
              >
                {isSaving ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={18} />
                )}

                {isSaving
                  ? "Saving..."
                  : initialEvent?.status === "published"
                    ? "Update Published Event"
                    : "Publish Event"}
              </button>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSave("draft")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <Save size={18} />

                {initialEvent?.status === "published"
                  ? "Unpublish & Save Draft"
                  : "Save as Draft"}
              </button>
            </div>
          </section>

          {/* Event cover */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Event Cover Image
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Choose an image that represents the school event.
            </p>

            {coverUrl ? (
              <div className="relative mt-5 overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl}
                  alt={title || "Event cover"}
                  className="aspect-video w-full object-cover"
                />

                <button
                  type="button"
                  disabled={isBusy}
                  aria-label="Remove event cover"
                  onClick={() => setCoverPath(null)}
                  className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-600 shadow-md disabled:opacity-50"
                >
                  <X size={17} />
                </button>
              </div>
            ) : (
              <div className="mt-5 flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                <ImagePlus size={34} />
                <span className="mt-3 text-xs">
                  No cover image
                </span>
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50">
              {isUploading ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <ImagePlus size={18} />
              )}

              {isUploading ? "Uploading..." : "Choose Image"}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={isBusy}
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              JPG, PNG or WebP • Maximum 6 MB
            </p>
          </section>

          {/* Homepage feature */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Star size={21} />
              </div>

              <div>
                <h3 className="font-bold">
                  Featured Event
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Highlight this event on the website homepage.
                </p>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) =>
                  setIsFeatured(e.target.checked)
                }
                className="h-4 w-4 accent-[#176B49]"
              />

              Feature on Homepage
            </label>

            <p className="mt-3 text-xs text-slate-400">
              Only published events can appear publicly.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
