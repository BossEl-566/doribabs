
import Link from "next/link";

import {
  Eye,
  Newspaper,
  PencilLine,
  Plus,
  Star,
} from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";
import DeletePostButton from "@/components/admin/delete-post-button";

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
    .select(
      "id, title, excerpt, category, status, is_featured, created_at"
    )
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
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            News & Blog
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Create and manage news, academic updates,
            achievements, and school announcements.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#105638]"
        >
          <Plus size={19} />
          Create Article
        </Link>
      </div>

      {/* Content table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
            Showing {posts?.length ?? 0} articles
          </span>
        </div>

        {error ? (
          <div
            role="alert"
            className="p-8 text-sm text-red-600"
          >
            Unable to retrieve articles. Please check
            the database connection.
          </div>
        ) : posts?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="max-w-80 px-6 py-5">
                      <div className="flex items-center gap-2">
                        <p className="line-clamp-2 font-semibold text-slate-900">
                          {post.title}
                        </p>

                        {post.is_featured && (
                          <Star
                            size={15}
                            className="shrink-0 fill-orange-400 text-orange-400"
                          />
                        )}
                      </div>

                      {post.excerpt && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                          {post.excerpt}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-5 capitalize text-slate-500">
                      {post.category}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          post.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-xs text-slate-500">
                      {new Intl.DateTimeFormat("en-GH", {
                        dateStyle: "medium",
                        timeZone: "Africa/Accra",
                      }).format(new Date(post.created_at))}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/posts/${post.id}/preview`}
                          title="Preview"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={15} />
                          Preview
                        </Link>

                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          title="Edit"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-50"
                        >
                          <PencilLine size={15} />
                          Edit
                        </Link>

                        <DeletePostButton
                          id={post.id}
                          title={post.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 50 && (
              <p className="border-t border-slate-100 p-4 text-xs text-slate-500">
                Displaying the latest 50 matching articles.
                Pagination will be added as the content library grows.
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <div className="mb-5 rounded-2xl bg-green-50 p-5 text-green-700">
              <Newspaper size={34} />
            </div>

            <h3 className="text-lg font-bold">
              No articles found
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              Start sharing the latest stories, school
              achievements, activities, and important
              announcements with parents and visitors.
            </p>

            <Link
              href="/admin/posts/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white hover:bg-[#105638]"
            >
              <Plus size={18} />
              Create First Article
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
