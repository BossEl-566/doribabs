
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { requireSchoolAdmin } from "@/lib/auth";
import EventForm from "@/components/admin/event-form";

import type { SchoolEventRecord } from "@/lib/events";

export const metadata: Metadata = {
  title: "Edit Event | Doribabs Admin",
  robots: {
    index: false,
    follow: false,
  },
};

type EditEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({
  params,
}: EditEventPageProps) {
  const { id } = await params;

  const { supabase } = await requireSchoolAdmin();

  const { data: event, error } = await supabase
    .from("events")
    .select(
      "id, title, slug, description, starts_at, ends_at, location, cover_image_path, status, is_featured, created_at, updated_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Event lookup failed:", error);

    throw new Error("Unable to load the selected event.");
  }

  if (!event) {
    notFound();
  }

  return (
    <EventForm
      initialEvent={event as SchoolEventRecord}
    />
  );
}
