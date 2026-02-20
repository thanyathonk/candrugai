/**
 * ReportsTable — TanStack Table v8, sorting, pagination, row click
 * docs/component-library.md 4.13
 * header bg: Blue-50 | header text: Blue-700 | row hover: Blue-50
 */

"use client";

import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
import PaginationBar from "./PaginationBar";
import type { ReportRow, SeriousType } from "@/lib/types";
import { SEX_LABELS, SERIOUS_TYPE_LABELS } from "@/lib/utils";

// ── Column definitions ────────────────────────────────────────────────────────

const col = createColumnHelper<ReportRow>();

const OUTCOME_COLOR: Record<SeriousType, string> = {
  CA: "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-200",
  DE: "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-200",
  DS: "bg-brand-blue-50 text-brand-blue-500 border-brand-blue-200",
  HL: "bg-brand-green-50 text-brand-green-700 border-brand-green-200",
  LT: "bg-neutral-200 text-neutral-600 border-neutral-300",
  OT: "bg-brand-blue-50 text-brand-blue-500 border-neutral-200",
};

const SEX_COLOR: Record<string, string> = {
  M:   "bg-brand-blue-50 text-brand-blue-700",
  F:   "bg-brand-green-50 text-brand-green-700",
  UNK: "bg-neutral-200 text-neutral-600",
};

const COLUMNS = [
  col.accessor("safetyreportid", {
    header: "Report ID",
    cell: (i) => (
      <span className="font-mono text-xs text-brand-blue-700">{i.getValue()}</span>
    ),
  }),
  col.accessor("ingredient", {
    header: "Ingredient",
    cell: (i) => <span className="font-medium capitalize">{i.getValue()}</span>,
  }),
  col.accessor("medicinal_product", {
    header: "Product",
    cell: (i) => <span className="text-neutral-600">{i.getValue()}</span>,
  }),
  col.accessor("reaction_meddrapt", {
    header: "ADR (MedDRA PT)",
    cell: (i) => <span>{i.getValue()}</span>,
  }),
  col.accessor("patient_sex", {
    header: "Sex",
    cell: (i) => {
      const v = i.getValue();
      return (
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${SEX_COLOR[v] ?? ""}`}>
          {SEX_LABELS[v] ?? v}
        </span>
      );
    },
  }),
  col.accessor("age_years", {
    header: "Age",
    cell: (i) => {
      const v = i.getValue();
      return <span className="tabular-nums">{v !== null ? `${v} yr` : "—"}</span>;
    },
  }),
  col.accessor("serious_type", {
    header: "Seriousness",
    cell: (i) => {
      const v = i.getValue() as SeriousType;
      return (
        <span
          className={`inline-block rounded-xl border px-2.5 py-0.5 text-[11px] font-bold ${OUTCOME_COLOR[v]}`}
          title={SERIOUS_TYPE_LABELS[v]}
        >
          {v}
        </span>
      );
    },
  }),
  col.accessor("index_date", {
    header: "Date",
    cell: (i) => <span className="tabular-nums text-neutral-600">{i.getValue()}</span>,
  }),
];

// ── Sorting icon ──────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: "asc" | "desc" | false }) {
  if (!direction) {
    return (
      <svg className="h-3 w-3 text-brand-blue-200" viewBox="0 0 8 12" fill="currentColor">
        <path d="M4 0L7 4H1L4 0Z" />
        <path d="M4 12L1 8H7L4 12Z" />
      </svg>
    );
  }
  return direction === "asc" ? (
    <svg className="h-3 w-3 text-brand-blue-700" viewBox="0 0 8 6" fill="currentColor">
      <path d="M4 0L8 6H0L4 0Z" />
    </svg>
  ) : (
    <svg className="h-3 w-3 text-brand-blue-700" viewBox="0 0 8 6" fill="currentColor">
      <path d="M4 6L0 0H8L4 6Z" />
    </svg>
  );
}

// ── Skeleton rows ─────────────────────────────────────────────────────────────

function SkeletonRows({ cols, rows = 8 }: { cols: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="animate-pulse border-t border-neutral-200">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-4 py-3">
              <div className={`h-4 rounded bg-neutral-200 ${c === 0 ? "w-20" : "w-full"}`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ReportsTableProps {
  data: ReportRow[];
  totalCount: number;
  isLoading?: boolean;
  onClearFilters?: () => void;
}

export default function ReportsTable({
  data,
  totalCount,
  isLoading = false,
  onClearFilters,
}: ReportsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "index_date", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns: COLUMNS,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Actual total comes from server; for mock we use data.length
    manualPagination: false,
  });

  const isEmpty = !isLoading && data.length === 0;

  return (
    <div className="flex-1 rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden min-w-0">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {/* Header */}
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-brand-blue-50">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-brand-blue-700 whitespace-nowrap select-none"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className={`flex items-center gap-1.5 ${
                          header.column.getCanSort()
                            ? "cursor-pointer hover:text-brand-blue-700"
                            : "cursor-default"
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <SortIcon direction={header.column.getIsSorted()} />
                        )}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              <SkeletonRows cols={COLUMNS.length} rows={10} />
            ) : isEmpty ? (
              /* Empty state */
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-brand-blue-50 border border-brand-blue-200 flex items-center justify-center">
                      <svg className="h-6 w-6 text-brand-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-800">ไม่พบข้อมูลที่ตรงกับเงื่อนไข</p>
                    <p className="text-xs text-neutral-600">ลองเปลี่ยนคำค้นหาหรือล้าง filter</p>
                    {onClearFilters && (
                      <button
                        onClick={onClearFilters}
                        className="mt-1 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-brand-blue-50 transition-colors"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() =>
                    router.push(`/reports/${row.original.safetyreportid}`)
                  }
                  className="border-t border-neutral-200 hover:bg-brand-blue-50 cursor-pointer transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isEmpty && (
        <PaginationBar table={table} totalCount={Math.min(totalCount, data.length)} />
      )}
    </div>
  );
}
