
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
  CheckCircle2,
  Eye,
  ImagePlus,
  LoaderCircle,
  Save,
  Send,
  Star,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { saveArticle } from "@/app/admin/(protected)/posts/actions";
import MediaPicker from "@/components/admin/media-picker";

import {
  EMPTY_ARTICLE,
  POST_CATEGORIES,
  slugify,
  type ArticleInput,
  type ArticleRecord,
  type PostCategory,
  type PostStatus,
} from "@/lib/posts";

import ArticleEditor from "./article-editor";
import ArticlePreview from "./article-preview";

type ArticleFormProps = {
  initialArticle?: ArticleRecord;
};

export default function ArticleForm({
  initialArticle,
}: ArticleFormProps) {
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const isEditing = Boolean(initialArticle);

  // Article fields
  const [title, setTitle] = useState(initialArticle?.title ?? "");

  const [slug, setSlug] = useState(initialArticle?.slug ?? "");

  const [slugEdited, setSlugEdited] = useState(isEditing);

  const [excerpt, setExcerpt] = useState(
    initialArticle?.excerpt ?? ""
  );

  const [category, setCategory] = useState<PostCategory>(
    initialArticle?.category ?? "news"
  );

  const [content, setContent] = useState<JSONContent>(
    initialArticle?.content ?? EMPTY_ARTICLE
  );

  const [coverPath, setCoverPath] = useState<string | null>(
    initialArticle?.cover_image_path ?? null
  );

  const [isFeatured, setIsFeatured] = useState(
    initialArticle?.is_featured ?? false
  );
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const coverUrl = coverPath
    ? supabase.storage
        .from("doribabs-media")
        .getPublicUrl(coverPath).data.publicUrl
    : null;

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(slugify(value));
    }
  }

  /**
   * Upload an article cover image to Supabase.
   */
  async function handleCoverUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);
    setInfo(null);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("The maximum image size is 10 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    let uploadedPath: string | null = null;

    try {
      const extension =
        file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : "jpg";

      const path = `posts/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("doribabs-media")
        .upload(path, file, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      uploadedPath = path;

      // Register the file in the CMS media library.
      const { error: mediaError } = await supabase
        .from("media_assets")
        .insert({
          storage_path: path,
          alt_text: title.trim() || file.name,
          is_public: false,
        });

      if (mediaError) {
        // Avoid leaving an unregistered object behind.
        await supabase.storage
          .from("doribabs-media")
          .remove([path]);

        uploadedPath = null;

        throw new Error(mediaError.message);
      }

      setCoverPath(path);
      setInfo("Cover image uploaded successfully.");
    } catch (err) {
      console.error("Cover upload error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload the image."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  /**
   * Save the article as either draft or published.
   */
  async function handleSave(status: PostStatus) {
    if (isSaving || isUploading) return;

    setError(null);
    setInfo(null);
    setIsSaving(true);

    const payload: ArticleInput = {
      id: initialArticle?.id,
      title,
      slug,
      excerpt,
      category,
      content,
      status,
      is_featured: isFeatured,
      cover_image_path: coverPath,
    };

    try {
      const result = await saveArticle(payload);

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      console.error("Article save error:", err);

      setError(
        "Something went wrong while saving. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  const isBusy = isSaving || isUploading;

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      {/* Top navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          {initialArticle?.status === "published"
            ? "Currently Published"
            : isEditing
              ? "Saved Draft"
              : "New Article"}
        </div>
      </div>

      {/* Page heading */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {isEditing ? "Edit Article" : "Create New Article"}
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          {isEditing
            ? "Update your school content and publication details."
            : "Share school news, announcements and achievements."}
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

      {info && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <CheckCircle2 size={18} />
          {info}
        </div>
      )}

      {/* Main layout */}
      <div className="grid items-start gap-6 xl:grid-cols-3">
        {/* Main Editor Column */}
        <div className="space-y-6 xl:col-span-2">
          {/* Article details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Article Information
            </h3>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="article-title"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Article Title
                </label>

                <input
                  id="article-title"
                  value={title}
                  onChange={(event) =>
                    handleTitleChange(event.target.value)
                  }
                  placeholder="Enter a compelling article title"
                  maxLength={160}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />
              </div>

              {/* Slug */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label
                    htmlFor="article-slug"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    URL Slug
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setSlug(slugify(title));
                      setSlugEdited(false);
                    }}
                    className="text-xs font-semibold text-green-700 hover:underline"
                  >
                    Generate from title
                  </button>
                </div>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-green-700">
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-xs text-slate-500">
                    /blog/
                  </span>

                  <input
                    id="article-slug"
                    value={slug}
                    onChange={(event) => {
                      setSlug(slugify(event.target.value));
                      setSlugEdited(true);
                    }}
                    maxLength={140}
                    placeholder="article-url"
                    className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label
                  htmlFor="article-excerpt"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Short Description
                </label>

                <textarea
                  id="article-excerpt"
                  rows={4}
                  maxLength={400}
                  value={excerpt}
                  onChange={(event) =>
                    setExcerpt(event.target.value)
                  }
                  placeholder="Write a short summary for homepage article cards..."
                  className="w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-7 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {excerpt.length}/400 characters
                </p>
              </div>
            </div>
          </section>

          {/* Rich-text editor */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">
                  Article Content
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Create and format your content
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
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
              <div className="min-h-80 rounded-xl border border-slate-200 bg-white p-6">
                <h1 className="mb-5 text-3xl font-bold text-slate-950">
                  {title || "Untitled Article"}
                </h1>

                {excerpt && (
                  <p className="mb-6 text-slate-500">
                    {excerpt}
                  </p>
                )}

                <ArticlePreview content={content} />
              </div>
            ) : (
              <ArticleEditor
                initialContent={content}
                onChange={setContent}
              />
            )}
          </section>
        </div>

        {/* Settings sidebar */}
        <aside className="space-y-6">
          {/* Publishing */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Publishing
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Draft articles remain hidden from public
              visitors until published.
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
                  : initialArticle?.status === "published"
                    ? "Update Published Article"
                    : "Publish Article"}
              </button>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleSave("draft")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <Save size={18} />

                {initialArticle?.status === "published"
                  ? "Unpublish & Save Draft"
                  : "Save Draft"}
              </button>
            </div>

            {initialArticle?.status === "published" && (
              <p className="mt-4 text-xs leading-6 text-amber-700">
                Saving this published article as a draft
                removes it from the public content feed.
              </p>
            )}
          </section>

          {/* Category */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Category
            </h3>

            <p className="mb-4 mt-2 text-xs text-slate-500">
              Choose where this article belongs.
            </p>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as PostCategory)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-green-700"
            >
              {POST_CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </section>

          {/* Cover Image */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Featured Image
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              This image will appear on the article card
              and article details page.
            </p>

            {coverUrl ? (
              <div className="relative mt-5 overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl}
                  alt={title || "Article cover"}
                  className="aspect-video w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setCoverPath(null)}
                  disabled={isBusy}
                  aria-label="Remove article cover"
                  className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-600 shadow-md disabled:opacity-50"
                >
                  <X size={17} />
                </button>
              </div>
            ) : (
              <div className="mt-5 flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                <ImagePlus size={34} />
                <span className="mt-3 text-xs">
                  No cover image selected
                </span>
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
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
                onChange={handleCoverUpload}
                disabled={isBusy}
                className="hidden"
              />
            </label>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              JPG, PNG or WebP. Maximum 10 MB.
            </p>
          </section>

          {/* Featured on homepage */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600">
                <Star size={20} />
              </div>

              <div>
                <h3 className="text-sm font-bold">
                  Featured Article
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Highlight this article in the homepage
                  featured-news section.
                </p>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(event) =>
                  setIsFeatured(event.target.checked)
                }
                className="h-4 w-4 accent-[#176B49]"
              />

              Feature this article
            </label>

<button
  type="button"
  disabled={isBusy}
  onClick={() => setMediaPickerOpen(true)}
  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-50"
>
  <ImagePlus size={18} />
  Select from Media Library
</button>


            <p className="mt-3 text-xs text-slate-400">
              Only published articles will appear publicly.
            </p>
          </section>
        </aside>
      </div>

<MediaPicker
  open={mediaPickerOpen}
  onClose={() => setMediaPickerOpen(false)}
  onSelect={(asset) => {
    setCoverPath(asset.storage_path);
    setInfo("Existing image selected successfully.");
  }}
/>

    </div>
  );
}
