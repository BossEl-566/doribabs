
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { requireSchoolAdmin } from "@/lib/auth";

type PostsPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AdminPostsPage({
  searchParams,
}: PostsPageProps) {
  const { supabase } = await requireSchoolAdmin();
  const params = await searchParams;

  const status =
    params.status === "published" || params.status === "draft"
      ? params.status
      : "all";

  let query = supabase
    .from("posts")
    .select("id, title, category, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data: posts, error } = await query;

  const filters = [
    { label: "All Articles", value: "all" },
    { label: "Published", value: "published" },
    { label: "Drafts", value: "draft" },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          News & Blog
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Manage school announcements, academic news,
          achievements, and articles.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Link
                key={filter.value}
                href={
                  filter.value === "all"
                    ? "/admin/posts"
                    : `/admin/posts?status=${filter.value}`
                }
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  status === filter.value
                    ? "bg-[#176B49] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            Article publishing coming next
          </span>
        </div>

        {error ? (
          <p className="p-8 text-sm text-red-600">
            Unable to retrieve articles. Check your database
            connection and permissions.
          </p>
        ) : posts?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-5 font-semibold">
                      {post.title}
                    </td>
                    <td className="px-6 py-5 capitalize text-slate-500">
                      {post.category}
                    </td>
                    <td className="px-6 py-5 capitalize">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500">
                      {new Intl.DateTimeFormat("en-GH", {
                        dateStyle: "medium",
                        timeZone: "Africa/Accra",
                      }).format(new Date(post.created_at))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 50 && (
              <p className="border-t border-slate-100 p-4 text-xs text-slate-500">
                Showing the latest 50 matching articles.
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <div className="mb-5 rounded-2xl bg-green-50 p-5 text-green-700">
              <Newspaper size={32} />
            </div>

            <h3 className="text-lg font-bold">
              No articles found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
              This section is ready for your school news.
              We will add the rich-text article editor in
              the next development phase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
