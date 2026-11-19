
import type { Metadata } from "next";

import { requireSchoolAdmin } from "@/lib/auth";
import MediaLibrary from "@/components/admin/media-library";

export const metadata: Metadata = {
  title: "Media Library | Doribabs Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminMediaPage() {
  await requireSchoolAdmin();

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Media Library
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Upload, organise and manage the schools
          photographs, article covers, event images
          and public gallery collection.
        </p>
      </div>

      <MediaLibrary mode="manager" />
    </div>
  );
}
