
import { CalendarDays, MapPin } from "lucide-react";
import { requireSchoolAdmin } from "@/lib/auth";

export default async function AdminEventsPage() {
  const { supabase } = await requireSchoolAdmin();

  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, location, starts_at, status")
    .order("starts_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          School Events
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Organise school programmes, upcoming activities,
          celebrations, and important events.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h3 className="font-bold">Event Directory</h3>
          <p className="mt-1 text-xs text-slate-400">
            Latest 50 scheduled and previous events
          </p>
        </div>

        {error ? (
          <p className="p-8 text-sm text-red-600">
            Unable to retrieve school events.
          </p>
        ) : events?.length ? (
          <div className="divide-y divide-slate-100">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-wrap items-center justify-between gap-4 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                    <CalendarDays size={22} />
                  </div>

                  <div>
                    <p className="font-semibold">
                      {event.title}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {new Intl.DateTimeFormat("en-GH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Africa/Accra",
                      }).format(new Date(event.starts_at))}
                    </p>

                    {event.location && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                        <MapPin size={13} />
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    event.status === "published"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <div className="mb-5 rounded-2xl bg-orange-50 p-5 text-orange-600">
              <CalendarDays size={32} />
            </div>

            <h3 className="text-lg font-bold">
              No school events yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
              School programmes, academic events, and
              celebrations will appear here once created.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
