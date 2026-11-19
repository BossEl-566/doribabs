
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  page: number;
  total: number;
  pageSize: number;
  basePath: string;
  query?: Record<string, string>;
};

export default function Pagination({
  page,
  total,
  pageSize,
  basePath,
  query = {},
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  function hrefFor(targetPage: number) {
    const params = new URLSearchParams(query);

    if (targetPage > 1) {
      params.set("page", String(targetPage));
    } else {
      params.delete("page");
    }

    const search = params.toString();

    return `${basePath}${search ? `?${search}` : ""}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-7"
    >
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-3">
        {page > 1 && (
          <Link
            href={hrefFor(page - 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ChevronLeft size={17} />
            Previous
          </Link>
        )}

        {page < totalPages && (
          <Link
            href={hrefFor(page + 1)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-4 py-3 text-sm font-semibold text-white hover:bg-[#105638]"
          >
            Next
            <ChevronRight size={17} />
          </Link>
        )}
      </div>
    </nav>
  );
}
