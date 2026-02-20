/**
 * ActiveFilterChips — แสดง active filters เป็น chips
 * docs/component-library.md 4.6
 * bg: Blue-50 | border: Blue-200 | text: Blue-700 | radius: rounded-full
 */

import type { DrugSearchFilters } from "@/app/drugsearch/DrugSearchClient";
import { SEX_LABELS, SERIOUS_TYPE_LABELS } from "@/lib/utils";

const FILTER_LABELS: Record<keyof DrugSearchFilters, string> = {
  ingredient:        "Ingredient",
  medicinal_product: "Product",
  reaction_meddrapt: "Reaction",
  nichd:             "NICHD",
  patient_sex:       "Sex",
  age_min:           "Age ≥",
  age_max:           "Age ≤",
  serious:           "Serious",
  serious_type:      "Type",
  date_start:        "From",
  date_end:          "To",
};

function formatFilterValue(key: keyof DrugSearchFilters, value: unknown): string {
  if (key === "patient_sex" && typeof value === "string") return SEX_LABELS[value] ?? value;
  if (key === "serious_type" && typeof value === "string") return SERIOUS_TYPE_LABELS[value] ?? value;
  if (key === "serious") return value ? "Yes" : "No";
  return String(value);
}

interface ActiveFilterChipsProps {
  filters: DrugSearchFilters;
  query: string;
  onRemove: (key: keyof DrugSearchFilters) => void;
  onClearQuery: () => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({
  filters,
  query,
  onRemove,
  onClearQuery,
  onClearAll,
}: ActiveFilterChipsProps) {
  const activeFilters = (
    Object.entries(filters) as [keyof DrugSearchFilters, unknown][]
  ).filter(([, v]) => v !== undefined && v !== "" && v !== null);

  const hasQuery = query.trim().length > 0;
  const totalActive = activeFilters.length + (hasQuery ? 1 : 0);

  if (totalActive === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      {/* Query chip */}
      {hasQuery && (
        <Chip label="Search" value={`"${query}"`} onRemove={onClearQuery} />
      )}

      {/* Filter chips */}
      {activeFilters.map(([key, value]) => (
        <Chip
          key={key}
          label={FILTER_LABELS[key]}
          value={formatFilterValue(key, value)}
          onRemove={() => onRemove(key)}
        />
      ))}

      {/* Clear all — show when ≥2 */}
      {totalActive >= 2 && (
        <button
          onClick={onClearAll}
          className="text-xs text-neutral-600 hover:text-brand-blue-700 transition-colors underline underline-offset-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

function Chip({
  label,
  value,
  onRemove,
}: {
  label: string;
  value: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-200 bg-brand-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-700">
      <span className="text-brand-blue-500">{label}:</span>
      <span>{value}</span>
      <button
        onClick={onRemove}
        className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-brand-blue-200 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="currentColor">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
}
