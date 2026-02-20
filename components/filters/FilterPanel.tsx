/**
 * FilterPanel — collapsible on mobile, always visible desktop
 * docs/ui-pages.md 4.2 + docs/component-library.md 4.5/4.6
 */

"use client";

import { useState } from "react";
import type { DrugSearchFilters } from "@/app/drugsearch/DrugSearchClient";

const NICHD_OPTIONS = [
  { value: "", label: "All groups" },
  { value: "term_neonatal",    label: "Neonatal (0–27d)" },
  { value: "infancy",          label: "Infancy (1–12m)" },
  { value: "toddler",          label: "Toddler (1–2yr)" },
  { value: "early_childhood",  label: "Early Childhood (3–5yr)" },
  { value: "middle_childhood", label: "Middle Childhood (6–11yr)" },
  { value: "early_adolescence",label: "Early Adolescence (12–14yr)" },
  { value: "late_adolescence", label: "Late Adolescence (15–17yr)" },
];

const SEX_OPTIONS = [
  { value: "", label: "Any" },
  { value: "M",   label: "Male" },
  { value: "F",   label: "Female" },
  { value: "UNK", label: "Unknown" },
];

const SERIOUS_TYPE_OPTIONS = [
  { value: "",   label: "Any" },
  { value: "CA", label: "CA — Congenital Anomaly" },
  { value: "DE", label: "DE — Death" },
  { value: "DS", label: "DS — Disabling" },
  { value: "HL", label: "HL — Hospitalization" },
  { value: "LT", label: "LT — Life Threatening" },
  { value: "OT", label: "OT — Other" },
];

interface FilterPanelProps {
  filters: DrugSearchFilters;
  onChange: (partial: Partial<DrugSearchFilters>) => void;
  onClear: () => void;
  activeCount: number;
}

export default function FilterPanel({
  filters,
  onChange,
  onClear,
  activeCount,
}: FilterPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-full md:w-64 shrink-0">
      {/* Mobile toggle button */}
      <button
        className="md:hidden w-full flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm mb-2"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M3 4h18M7 8h10M11 12h2" />
          </svg>
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-brand-blue-700 px-2 py-0.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </span>
        <svg
          className={`h-4 w-4 text-neutral-600 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Panel body */}
      <div
        className={`
          rounded-2xl border border-neutral-200 bg-white shadow-sm p-5 space-y-5
          ${open ? "block" : "hidden md:block"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 4h18M7 8h10M11 12h2" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">Filters</span>
            {activeCount > 0 && (
              <span className="rounded-full bg-brand-blue-700 px-2 py-0.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-brand-blue-700 hover:underline font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Ingredient */}
          <FilterField label="Ingredient">
            <FilterInput
              placeholder="e.g. ibuprofen"
              value={filters.ingredient ?? ""}
              onChange={(v) => onChange({ ingredient: v })}
            />
          </FilterField>

          {/* Medicinal product */}
          <FilterField label="Medicinal Product">
            <FilterInput
              placeholder="e.g. ADVIL"
              value={filters.medicinal_product ?? ""}
              onChange={(v) => onChange({ medicinal_product: v })}
            />
          </FilterField>

          {/* Reaction */}
          <FilterField label="Reaction (MedDRA PT)">
            <FilterInput
              placeholder="e.g. Nausea"
              value={filters.reaction_meddrapt ?? ""}
              onChange={(v) => onChange({ reaction_meddrapt: v })}
            />
          </FilterField>

          {/* Divider */}
          <div className="h-px bg-neutral-200" />

          {/* NICHD */}
          <FilterField label="NICHD Group">
            <FilterSelect
              value={filters.nichd ?? ""}
              onChange={(v) => onChange({ nichd: v })}
              options={NICHD_OPTIONS}
            />
          </FilterField>

          {/* Patient Sex */}
          <FilterField label="Patient Sex">
            <FilterSelect
              value={filters.patient_sex ?? ""}
              onChange={(v) => onChange({ patient_sex: v as DrugSearchFilters["patient_sex"] })}
              options={SEX_OPTIONS}
            />
          </FilterField>

          {/* Age range */}
          <FilterField label="Age Range (years)">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={200}
                placeholder="Min"
                value={filters.age_min ?? ""}
                onChange={(e) =>
                  onChange({ age_min: e.target.value ? Number(e.target.value) : undefined })
                }
                className={inputCls + " flex-1"}
              />
              <span className="text-xs text-neutral-600">–</span>
              <input
                type="number"
                min={0}
                max={200}
                placeholder="Max"
                value={filters.age_max ?? ""}
                onChange={(e) =>
                  onChange({ age_max: e.target.value ? Number(e.target.value) : undefined })
                }
                className={inputCls + " flex-1"}
              />
            </div>
          </FilterField>

          {/* Divider */}
          <div className="h-px bg-neutral-200" />

          {/* Serious */}
          <FilterField label="Serious Report">
            <div className="flex gap-2">
              {[
                { value: undefined, label: "Any" },
                { value: true,      label: "Yes" },
                { value: false,     label: "No"  },
              ].map(({ value, label }) => {
                const active = filters.serious === value;
                return (
                  <button
                    key={String(value)}
                    onClick={() => onChange({ serious: value })}
                    className={`flex-1 rounded-xl border py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "bg-brand-blue-50 border-brand-blue-200 text-brand-blue-700"
                        : "border-neutral-200 bg-white text-neutral-600 hover:bg-brand-blue-50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </FilterField>

          {/* Serious type */}
          <FilterField label="Serious Type">
            <FilterSelect
              value={filters.serious_type ?? ""}
              onChange={(v) => onChange({ serious_type: v as DrugSearchFilters["serious_type"] })}
              options={SERIOUS_TYPE_OPTIONS}
            />
          </FilterField>

          {/* Date range */}
          <FilterField label="Date Range">
            <div className="space-y-1.5">
              <input
                type="date"
                value={filters.date_start ?? ""}
                onChange={(e) => onChange({ date_start: e.target.value || undefined })}
                className={inputCls}
              />
              <input
                type="date"
                value={filters.date_end ?? ""}
                onChange={(e) => onChange({ date_end: e.target.value || undefined })}
                className={inputCls}
              />
            </div>
          </FilterField>
        </div>
      </div>
    </aside>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-gray-800 placeholder:text-neutral-600 " +
  "focus:border-brand-blue-500 focus:ring-1 focus:ring-brand-blue-200 focus:outline-none " +
  "hover:border-neutral-300 transition-colors";

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function FilterInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls + " cursor-pointer"}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
