
export const MEDIA_BUCKET = "doribabs-media";

export const MEDIA_PAGE_SIZE = 18;

export type MediaAsset = {
  id: string;
  storage_path: string;
  alt_text: string;
  caption: string | null;
  is_public: boolean;
  created_by: string | null;
  created_at: string;
};

export type MediaFilter =
  | "all"
  | "gallery"
  | "other";

export type MediaActionResult = {
  success: boolean;
  message: string;
};

export function getMediaFilename(path: string): string {
  return path.split("/").pop() ?? path;
}

export function getMediaFolder(path: string): string {
  return path.split("/")[0] ?? "media";
}

export function getAltTextFromFilename(
  filename: string
): string {
  return (
    filename
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180) || "School photograph"
  );
}
