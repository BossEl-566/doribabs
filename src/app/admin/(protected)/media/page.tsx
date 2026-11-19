
import { FileImage, Images } from "lucide-react";
import { requireSchoolAdmin } from "@/lib/auth";

export default async function AdminMediaPage() {
  const { supabase } = await requireSchoolAdmin();

  const { data: media, error } = await supabase
    .from("media_assets")
    .select("id, storage_path, alt_text, is_public, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Media Library
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Manage website photographs, gallery assets,
          article images, and event pictures.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-green-50 p-3 text-green-700">
            <Images size={23} />
          </div>

          <div>
            <h3 className="font-bold">Uploaded Media</h3>
            <p className="mt-1 text-xs text-slate-500">
              Files registered in Supabase media_assets
            </p>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-red-600">
            Unable to retrieve media records.
          </p>
        ) : media?.length ? (
          <div className="divide-y divide-slate-100">
            {media.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center gap-4 py-4"
              >
                <div className="shrink-0 rounded-lg bg-slate-100 p-3 text-slate-500">
                  <FileImage size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {asset.storage_path.split("/").pop()}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {asset.alt_text || "No description"}
                  </p>
                </div>

                <span className="text-xs text-slate-400">
                  {asset.is_public ? "Gallery" : "Media"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl bg-slate-50 px-6 py-16 text-center">
            <FileImage size={36} className="text-slate-400" />

            <h3 className="mt-5 text-lg font-bold">
              Your media library is empty
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
              Uploaded school images and media records
              will appear here once the upload system is added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
