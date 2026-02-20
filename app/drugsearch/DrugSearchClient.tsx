"use client";

/**
 * DrugSearchClient — client component that owns all search/filter/table state
 * Receives initial data from page.tsx (Server Component)
 */

import { useState, useEffect, useCallback, useTransition } from "react";
import ReportsTable from "@/components/table/ReportsTable";
import FilterPanel from "@/components/filters/FilterPanel";
import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import { searchReports } from "@/lib/api";
import type { ReportRow, SearchReportsParams, SeriousType, PatientSex } from "@/lib/types";

// ── Filter state type ─────────────────────────────────────────────────────────

export interface DrugSearchFilters {
  ingredient?: string;
  medicinal_product?: string;
  reaction_meddrapt?: string;
  nichd?: string;
  patient_sex?: PatientSex | "";
  age_min?: number;
  age_max?: number;
  serious?: boolean;
  serious_type?: SeriousType | "";
  date_start?: string;
  date_end?: string;
}

const EMPTY_FILTERS: DrugSearchFilters = {};

// ── Component ─────────────────────────────────────────────────────────────────

interface DrugSearchClientProps {
  initialData: ReportRow[];
  initialTotal: number;
}

export default function DrugSearchClient({
  initialData,
  initialTotal,
}: DrugSearchClientProps) {
  const [query, setQuery]       = useState("");
  const [filters, setFilters]   = useState<DrugSearchFilters>(EMPTY_FILTERS);
  const [data, setData]         = useState<ReportRow[]>(initialData);
  const [total, setTotal]       = useState(initialTotal);
  const [isPending, startTransition] = useTransition();

  // Active filter count (for filter panel badge)
  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== "" && v !== null
  ).length;

  // Fetch/filter data whenever query or filters change
  useEffect(() => {
    // Build params
    const params: SearchReportsParams = {
      dataset_mode: "adult",
      q: query || undefined,
      ingredient: filters.ingredient || undefined,
      medicinal_product: filters.medicinal_product || undefined,
      reaction_meddrapt: filters.reaction_meddrapt || undefined,
      nichd: filters.nichd || undefined,
      patient_sex: (filters.patient_sex || undefined) as PatientSex | undefined,
      age_min: filters.age_min,
      age_max: filters.age_max,
      serious: filters.serious,
      serious_type: (filters.serious_type || undefined) as SeriousType | undefined,
      date_start: filters.date_start,
      date_end: filters.date_end,
    };

    startTransition(async () => {
      const res = await searchReports(params);

      // Client-side filter of mock data (simulates backend filtering)
      const filtered = res.results.filter((row) => {
        if (params.q) {
          const q = params.q.toLowerCase();
          const hit =
            row.ingredient.toLowerCase().includes(q) ||
            row.medicinal_product.toLowerCase().includes(q) ||
            row.reaction_meddrapt.toLowerCase().includes(q);
          if (!hit) return false;
        }
        if (params.ingredient && !row.ingredient.toLowerCase().includes(params.ingredient.toLowerCase())) return false;
        if (params.medicinal_product && !row.medicinal_product.toLowerCase().includes(params.medicinal_product.toLowerCase())) return false;
        if (params.reaction_meddrapt && !row.reaction_meddrapt.toLowerCase().includes(params.reaction_meddrapt.toLowerCase())) return false;
        if (params.nichd && row.nichd !== params.nichd) return false;
        if (params.patient_sex && row.patient_sex !== params.patient_sex) return false;
        if (params.age_min !== undefined && (row.age_years ?? 0) < params.age_min) return false;
        if (params.age_max !== undefined && (row.age_years ?? 999) > params.age_max) return false;
        if (params.serious !== undefined && row.serious !== params.serious) return false;
        if (params.serious_type && row.serious_type !== params.serious_type) return false;
        if (params.date_start && row.index_date < params.date_start) return false;
        if (params.date_end && row.index_date > params.date_end) return false;
        return true;
      });

      setData(filtered);
      setTotal(filtered.length);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  const handleFilterChange = useCallback(
    (partial: Partial<DrugSearchFilters>) => {
      setFilters((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setQuery("");
    setFilters(EMPTY_FILTERS);
  }, []);

  const handleRemoveFilter = useCallback((key: keyof DrugSearchFilters) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Search bar ── */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl">
          {/* Search icon */}
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              className="h-5 w-5 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
          </div>
          <input
            type="search"
            placeholder="Search ingredient, product, or reaction..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full rounded-2xl border border-neutral-200 bg-white
              py-3 pl-12 pr-5 text-base text-gray-800
              placeholder:text-neutral-600
              shadow-sm
              hover:border-neutral-300
              focus:border-brand-blue-500 focus:ring-2 focus:ring-brand-blue-200 focus:outline-none
              transition-colors
            "
          />
          {/* Clear button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-gray-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Active filter chips ── */}
      <ActiveFilterChips
        filters={filters}
        query={query}
        onRemove={handleRemoveFilter}
        onClearQuery={() => setQuery("")}
        onClearAll={handleClearAll}
      />

      {/* ── Filter panel + Table ── */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearAll}
          activeCount={activeFilterCount}
        />

        <ReportsTable
          data={data}
          totalCount={total}
          isLoading={isPending}
          onClearFilters={handleClearAll}
        />
      </div>
    </div>
  );
}
