
import type { Metadata } from "next";

import { requireSchoolAdmin } from "@/lib/auth";
import EventForm from "@/components/admin/event-form";

export const metadata: Metadata = {
  title: "Create Event | Doribabs Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewEventPage() {
  await requireSchoolAdmin();

  return <EventForm />;
}
