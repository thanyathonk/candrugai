/**
 * PaginationBar — prev/next, page indicator, page size
 * docs/component-library.md 4.14
 * buttons: outline Gray-300 | active page: Blue-700 bg
 */

import type { Table } from "@tanstack/react-table";
import type { ReportRow } from "@/lib/types";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

interface PaginationBarProps {
  table: Table<ReportRow>;
  totalCount: number;
}

export default function PaginationBar({ table, totalCount }: PaginationBarProps) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const from = pageIndex * pageSize + 1;
  const to   = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-t border-neutral-200">
      {/* Left: results info */}
      <p className="text-xs text-neutral-600 shrink-0">
        Showing{" "}
        <span className="font-semibold text-gray-800">{from.toLocaleString()}–{to.toLocaleString()}</span>
        {" "}of{" "}
        <span className="font-semibold text-gray-800">{totalCount.toLocaleString()}</span>
        {" "}results
      </p>

      {/* Right: controls */}
      <div className="flex items-center gap-3">
        {/* Page size */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-neutral-600">Rows</span>
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-8 rounded-lg border border-neutral-200 bg-white px-2 text-xs text-gray-800 focus:border-brand-blue-500 focus:outline-none cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          {/* First */}
          <PageBtn
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            label="«"
            title="First page"
          />
          {/* Prev */}
          <PageBtn
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            label="‹"
            title="Previous page"
          />

          {/* Page numbers */}
          {getPageNumbers(pageIndex, pageCount).map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-1 text-neutral-600 text-xs select-none">…</span>
            ) : (
              <button
                key={p}
                onClick={() => table.setPageIndex(Number(p) - 1)}
                className={`h-8 min-w-[32px] rounded-lg px-2 text-xs font-medium transition-colors ${
                  Number(p) - 1 === pageIndex
                    ? "bg-brand-blue-700 text-white"
                    : "border border-neutral-200 bg-white text-gray-700 hover:bg-brand-blue-50 hover:border-neutral-300"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <PageBtn
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            label="›"
            title="Next page"
          />
          {/* Last */}
          <PageBtn
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            label="»"
            title="Last page"
          />
        </div>
      </div>
    </div>
  );
}

function PageBtn({
  onClick,
  disabled,
  label,
  title,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="h-8 w-8 rounded-lg border border-neutral-200 bg-white text-sm text-gray-700
        hover:bg-brand-blue-50 hover:border-neutral-300 transition-colors
        disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}

/** Generate page numbers with ellipsis for large page counts */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [];
  if (current < 4) {
    pages.push(1, 2, 3, 4, 5, "...", total);
  } else if (current > total - 5) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current, current + 1, current + 2, "...", total);
  }
  return pages;
}
