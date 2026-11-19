
"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ImagePlus,
  Images,
  LoaderCircle,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import {
  MEDIA_BUCKET,
  MEDIA_PAGE_SIZE,
  getAltTextFromFilename,
  getMediaFolder,
  type MediaAsset,
  type MediaFilter,
} from "@/lib/media";

import {
  deleteMediaAsset,
  updateMediaAsset,
} from "@/app/admin/(protected)/media/actions";

type MediaLibraryProps = {
  mode?: "manager" | "picker";
  onSelect?: (asset: MediaAsset) => void;
};

export default function MediaLibrary({
  mode = "manager",
  onSelect,
}: MediaLibraryProps) {
  const supabase = useMemo(() => createClient(), []);
  const isPicker = mode === "picker";

  // Listing state
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");

  // Image details
  const [selected, setSelected] = useState<MediaAsset | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [busy, setBusy] = useState(false);

  // Feedback
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const totalPages = Math.max(
    1,
    Math.ceil(total / MEDIA_PAGE_SIZE)
  );

  function refresh() {
    setRevision((value) => value + 1);
  }

  function getImageUrl(path: string): string {
    return supabase.storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(path).data.publicUrl;
  }

  // Load current page from Supabase.
  useEffect(() => {
    let active = true;

    async function loadMedia() {
      setLoading(true);

      let query = supabase
        .from("media_assets")
        .select(
          "id, storage_path, alt_text, caption, is_public, created_by, created_at",
          { count: "exact" }
        )
        .order("created_at", { ascending: false });

      if (filter === "gallery") {
        query = query.eq("is_public", true);
      }

      if (filter === "other") {
        query = query.eq("is_public", false);
      }

      if (search) {
        // Only safe characters enter the PostgREST filter.
        query = query.or(
          `alt_text.ilike.%${search}%,caption.ilike.%${search}%,storage_path.ilike.%${search}%`
        );
      }

      const from = page * MEDIA_PAGE_SIZE;

      const { data, error: loadError, count } =
        await query.range(
          from,
          from + MEDIA_PAGE_SIZE - 1
        );

      if (!active) return;

      if (loadError) {
        console.error("Media listing error:", loadError);
        setAssets([]);
        setTotal(0);
        setError("Unable to load the Media Library.");
      } else {
        setAssets((data ?? []) as MediaAsset[]);
        setTotal(count ?? 0);
        setError("");
      }

      setLoading(false);
    }

    void loadMedia();

    return () => {
      active = false;
    };
  }, [supabase, page, filter, search, revision]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanSearch = searchInput
      .trim()
      .replace(/[^a-zA-Z0-9 _-]/g, "")
      .slice(0, 80);

    setSearch(cleanSearch);
    setPage(0);
  }

  function changeFilter(value: MediaFilter) {
    setFilter(value);
    setPage(0);
  }

  function openDetails(asset: MediaAsset) {
    setSelected(asset);
    setAltText(asset.alt_text);
    setCaption(asset.caption ?? "");
    setIsPublic(asset.is_public);
    setNotice("");
    setError("");
  }

  /**
   * Upload a small batch of images sequentially.
   * Each file receives its own unique Storage path.
   */
  async function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);

    if (files.length === 0) return;

    if (files.length > 10) {
      setError("Please upload up to 10 images at a time.");
      input.value = "";
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");

    let successful = 0;
    const failures: string[] = [];

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

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        setProgress(
          `Uploading ${i + 1} of ${files.length}`
        );

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
          failures.push(`${file.name}: unsupported format`);
          continue;
        }

        if (file.size > 6 * 1024 * 1024) {
          failures.push(`${file.name}: exceeds 6 MB`);
          continue;
        }

        const extension =
          file.type === "image/png"
            ? "png"
            : file.type === "image/webp"
              ? "webp"
              : "jpg";

        const path =
          `gallery/${crypto.randomUUID()}.${extension}`;

        try {
          const { error: uploadError } =
            await supabase.storage
              .from(MEDIA_BUCKET)
              .upload(path, file, {
                contentType: file.type,
                cacheControl: "3600",
                upsert: false,
              });

          if (uploadError) {
            throw new Error(uploadError.message);
          }

          const { error: registerError } =
            await supabase
              .from("media_assets")
              .insert({
                storage_path: path,
                alt_text: getAltTextFromFilename(
                  file.name
                ),
                caption: null,
                is_public: false,
                created_by: user.id,
              });

          if (registerError) {
            // Roll back this newly uploaded object.
            const { error: cleanupError } =
              await supabase.storage
                .from(MEDIA_BUCKET)
                .remove([path]);

            if (cleanupError) {
              console.error(
                "Upload cleanup failed:",
                cleanupError
              );
            }

            throw new Error(registerError.message);
          }

          successful++;
        } catch (fileError) {
          console.error(
            "File upload failed:",
            file.name,
            fileError
          );

          failures.push(file.name);
        }
      }

      if (successful > 0) {
        setNotice(
          `${successful} image(s) uploaded successfully.`
        );

        setPage(0);
        setFilter("all");
        setSearch("");
        setSearchInput("");
        refresh();
      }

      if (failures.length > 0) {
        setError(
          `${failures.length} file(s) failed: ${failures
            .slice(0, 3)
            .join(", ")}`
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload images."
      );
    } finally {
      setUploading(false);
      setProgress("");
      input.value = "";
    }
  }

  async function saveDetails() {
    if (!selected || busy) return;

    setBusy(true);
    setError("");

    try {
      const result = await updateMediaAsset(
        selected.id,
        altText,
        caption,
        isPublic
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSelected(null);
      setNotice(result.message);
      refresh();
    } catch {
      setError("Unable to save image details.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteSelected() {
    if (!selected || busy) return;

    const confirmed = window.confirm(
      "Permanently delete this image?\n\n" +
      "An image used by an article or event cannot be deleted. " +
      "This action cannot be undone."
    );

    if (!confirmed) return;

    setBusy(true);
    setError("");

    try {
      const result = await deleteMediaAsset(
        selected.id
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSelected(null);
      setNotice(result.message);

      if (assets.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        refresh();
      }
    } catch {
      setError("Unable to delete the image.");
    } finally {
      setBusy(false);
    }
  }

  async function copyUrl(path: string) {
    try {
      await navigator.clipboard.writeText(
        getImageUrl(path)
      );

      setNotice("Image URL copied.");
    } catch {
      setError("Unable to copy the image URL.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Images size={21} className="text-green-700" />
              {isPicker
                ? "Select an Image"
                : "Media Collection"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {total} matching media file(s)
            </p>
          </div>

          {!isPicker && (
            <label
              className={`inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#105638] ${
                uploading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              {uploading ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <UploadCloud size={18} />
              )}

              {uploading ? progress : "Upload Images"}

              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mt-5 flex gap-2"
        >
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={searchInput}
              onChange={(e) =>
                setSearchInput(e.target.value)
              }
              placeholder="Search images or descriptions..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-green-700"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap gap-2">
          {(
            [
              ["all", "All Images"],
              ["gallery", "Public Gallery"],
              ["other", "Other Media"],
            ] as const
          ).map(([value, label]) => (
            <button
              type="button"
              key={value}
              onClick={() => changeFilter(value)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                filter === value
                  ? "bg-[#176B49] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      {notice && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <Check size={18} />
          {notice}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Media grid */}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white">
          <LoaderCircle
            size={29}
            className="animate-spin text-green-700"
          />
        </div>
      ) : assets.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <button
              type="button"
              key={asset.id}
              onClick={() =>
                isPicker
                  ? onSelect?.(asset)
                  : openDetails(asset)
              }
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(asset.storage_path)}
                  alt={asset.alt_text || "School image"}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {asset.is_public && (
                  <span className="absolute left-2 top-2 rounded-full bg-green-700 px-2.5 py-1 text-[10px] font-semibold text-white">
                    Gallery
                  </span>
                )}
              </div>

              <div className="p-3">
                <p className="line-clamp-2 text-xs font-semibold text-slate-900">
                  {asset.alt_text || "Untitled image"}
                </p>

                <p className="mt-2 text-[11px] capitalize text-slate-400">
                  {getMediaFolder(asset.storage_path)}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">
          <div className="mb-5 rounded-2xl bg-green-50 p-5 text-green-700">
            <ImagePlus size={32} />
          </div>

          <h3 className="text-lg font-bold">
            No images found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
            {isPicker
              ? "Try a different search or image filter."
              : "Upload photographs to start building your school's media collection."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">
            Page {page + 1} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-200 p-2.5 disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 p-2.5 disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Edit image details modal */}
      {selected && !isPicker && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close image details"
            onClick={() => !busy && setSelected(null)}
            className="absolute inset-0 bg-slate-950/60"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-details-title"
            className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3
                id="media-details-title"
                className="text-xl font-bold"
              >
                Image Details
              </h3>

              <button
                type="button"
                aria-label="Close"
                disabled={busy}
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-50"
              >
                <X size={21} />
              </button>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(selected.storage_path)}
              alt={selected.alt_text}
              className="mb-5 max-h-72 w-full rounded-xl bg-slate-100 object-contain"
            />

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="media-alt"
                  className="mb-2 block text-sm font-semibold"
                >
                  Alternative Text *
                </label>

                <input
                  id="media-alt"
                  value={altText}
                  maxLength={200}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-700"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Describe the image for accessibility.
                </p>
              </div>

              <div>
                <label
                  htmlFor="media-caption"
                  className="mb-2 block text-sm font-semibold"
                >
                  Caption
                </label>

                <textarea
                  id="media-caption"
                  value={caption}
                  maxLength={500}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-green-700"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) =>
                    setIsPublic(e.target.checked)
                  }
                  className="h-4 w-4 accent-green-700"
                />
                Show in Public Gallery
              </label>

              <p className="break-all text-xs text-slate-400">
                {selected.storage_path}
              </p>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={saveDetails}
                  className="rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {busy ? "Processing..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyUrl(selected.storage_path)
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold"
                >
                  <Copy size={16} />
                  Copy URL
                </button>

                <button
                  type="button"
                  disabled={busy}
                  onClick={deleteSelected}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
