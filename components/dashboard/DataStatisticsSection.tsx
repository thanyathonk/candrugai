"use client";

/**
 * DataStatisticsSection — Full-width Horizontal Bar Chart
 * - Each bar = 100% width (independent metrics, no cross-comparison)
 * - ADR: stacked bar (MedDRA breakdown), hover shows SOC/HLGT/HLT/PT counts
 * - Others: solid bar, hover shows label + count
 * - All bars animate from 0 → full width on mount; counts animate from 0.
 */

import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { useCountUp, useMounted } from "@/lib/hooks";
import type { DashboardStatistics } from "@/lib/types";

// ── Colors ─────────────────────────────────────────────────────────────────────

const ADR_STACK_COLORS = {
  SOC:  "#93C5FD",
  HLGT: "#2DD4BF",
  HLT:  "#5EEAD4",
  PT:   "#6EE7B7",
};

const SOLID_COLORS: Record<string, string> = {
  drugs:             "#FB923C",
  drug_adr_pairs:    "#F87171",
  adr_protein_pairs: "#A78BFA",
};

// ── Tooltip ────────────────────────────────────────────────────────────────────

interface TooltipLine { label: string; value?: number; color?: string; isHeader?: boolean }

function Tooltip({ lines }: { lines: TooltipLine[] }) {
  return (
    <div className="absolute z-20 bottom-full left-4 mb-2.5 min-w-[240px] rounded-xl border border-neutral-200 bg-white shadow-xl px-4 py-3.5 pointer-events-none">
      {lines.map((l, i) => (
        l.isHeader ? (
          <p key={i} className="text-sm font-bold text-gray-900 mb-2">{l.label}</p>
        ) : (
          <div key={i} className="flex items-center gap-2.5 mt-1.5">
            {/* Colored circle dot */}
            {l.color && (
              <div
                className="h-3 w-3 rounded-full shrink-0 border border-white shadow-sm"
                style={{ backgroundColor: l.color }}
              />
            )}
            <span className="text-xs text-gray-600 flex-1">{l.label}</span>
            {l.value !== undefined && (
              <span className="text-xs font-semibold text-gray-900 tabular-nums ml-auto">
                {formatNumber(l.value)}
              </span>
            )}
          </div>
        )
      ))}
      {/* Arrow */}
      <div
        className="absolute left-6 top-full w-0 h-0"
        style={{
          borderLeft:  "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop:   "6px solid white",
        }}
      />
    </div>
  );
}

// ── Stacked Bar Row (ADR) ──────────────────────────────────────────────────────

interface StackedBarRowProps {
  label: string;
  segments: { key: string; value: number; color: string }[];
  total: number;
  tooltipLines: TooltipLine[];
  mounted: boolean;
  rowIndex: number;
}

function StackedBarRow({ label, segments, total, tooltipLines, mounted, rowIndex }: StackedBarRowProps) {
  const [hovered, setHovered] = useState(false);
  const animTotal = useCountUp(total, 1400, rowIndex * 120);

  return (
    <div
      className="flex items-center gap-4 py-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-32 shrink-0 text-right">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
      </div>

      <div className="relative flex-1 h-9 bg-neutral-100 rounded-lg overflow-visible cursor-default">
        {/* Full-width stacked bar — clips inside, grows via scaleX */}
        <div
          className="absolute inset-0 flex rounded-lg overflow-hidden"
          style={{
            transformOrigin: "left center",
            transform: mounted ? "scaleX(1)" : "scaleX(0)",
            transition: `transform 1100ms cubic-bezier(0.4, 0, 0.2, 1) ${rowIndex * 120}ms`,
          }}
        >
          {segments.map((seg) => {
            const pct = (seg.value / total) * 100;
            return (
              <div
                key={seg.key}
                className="h-full transition-opacity duration-200"
                style={{
                  width: `${pct}%`,
                  backgroundColor: seg.color,
                  opacity: hovered ? 1 : 0.85,
                }}
              />
            );
          })}
        </div>

        {/* Tooltip */}
        {hovered && <Tooltip lines={tooltipLines} />}
      </div>

      <div className="w-20 shrink-0">
        <span className="text-sm font-bold text-gray-900 tabular-nums">
          {formatNumber(animTotal)}
        </span>
      </div>
    </div>
  );
}

// ── Solid Bar Row ──────────────────────────────────────────────────────────────

interface SolidBarRowProps {
  label: string;
  value: number;
  color: string;
  tooltipLines: TooltipLine[];
  mounted: boolean;
  rowIndex: number;
}

function SolidBarRow({ label, value, color, tooltipLines, mounted, rowIndex }: SolidBarRowProps) {
  const [hovered, setHovered] = useState(false);
  const animValue = useCountUp(value, 1400, rowIndex * 120);

  return (
    <div
      className="flex items-center gap-4 py-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-32 shrink-0 text-right">
        <span className="text-sm font-semibold text-gray-800 leading-tight">{label}</span>
      </div>

      <div className="relative flex-1 h-9 bg-neutral-100 rounded-lg overflow-visible cursor-default">
        {/* Full-width solid bar — grows via scaleX */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundColor: color,
            opacity: hovered ? 1 : 0.85,
            boxShadow: hovered ? `0 2px 12px ${color}55` : "none",
            transformOrigin: "left center",
            transform: mounted ? "scaleX(1)" : "scaleX(0)",
            transition: `transform 1100ms cubic-bezier(0.4, 0, 0.2, 1) ${rowIndex * 120}ms, opacity 200ms, box-shadow 200ms`,
          }}
        />

        {/* Tooltip */}
        {hovered && <Tooltip lines={tooltipLines} />}
      </div>

      <div className="w-20 shrink-0">
        <span className="text-sm font-bold text-gray-900 tabular-nums">
          {formatNumber(animValue)}
        </span>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function DataStatisticsSection({ statistics }: { statistics: DashboardStatistics }) {
  const {
    total_adr_terms,
    total_drugs,
    total_drug_adr_pairs,
    total_adr_protein_pairs,
    meddra_distribution,
  } = statistics;

  const mounted = useMounted(100);

  const adrSegments = [
    { key: "SOC",  value: meddra_distribution.SOC,  color: ADR_STACK_COLORS.SOC  },
    { key: "HLGT", value: meddra_distribution.HLGT, color: ADR_STACK_COLORS.HLGT },
    { key: "HLT",  value: meddra_distribution.HLT,  color: ADR_STACK_COLORS.HLT  },
    { key: "PT",   value: meddra_distribution.PT,   color: ADR_STACK_COLORS.PT   },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-8 py-7 shadow-sm">
      <div className="flex flex-col gap-0.5">

        <StackedBarRow
          label="ADR"
          segments={adrSegments}
          total={total_adr_terms}
          mounted={mounted}
          rowIndex={0}
          tooltipLines={[
            { label: "ADR", isHeader: true },
            { label: `System Organ Class (SOC)`,        value: meddra_distribution.SOC,  color: ADR_STACK_COLORS.SOC  },
            { label: `High Level Group Terms (HLGT)`,   value: meddra_distribution.HLGT, color: ADR_STACK_COLORS.HLGT },
            { label: `High Level Terms (HLT)`,          value: meddra_distribution.HLT,  color: ADR_STACK_COLORS.HLT  },
            { label: `Preferred Terms (PT)`,            value: meddra_distribution.PT,   color: ADR_STACK_COLORS.PT   },
          ]}
        />

        <SolidBarRow
          label="Drugs"
          value={total_drugs}
          color={SOLID_COLORS.drugs}
          mounted={mounted}
          rowIndex={1}
          tooltipLines={[{ label: "Drugs", value: total_drugs, color: SOLID_COLORS.drugs }]}
        />

        <SolidBarRow
          label="Drug-ADR Pairs"
          value={total_drug_adr_pairs}
          color={SOLID_COLORS.drug_adr_pairs}
          mounted={mounted}
          rowIndex={2}
          tooltipLines={[{ label: "Drug-ADR Pairs", value: total_drug_adr_pairs, color: SOLID_COLORS.drug_adr_pairs }]}
        />

        <SolidBarRow
          label="ADR-Protein Pairs"
          value={total_adr_protein_pairs}
          color={SOLID_COLORS.adr_protein_pairs}
          mounted={mounted}
          rowIndex={3}
          tooltipLines={[{ label: "ADR-Protein Pairs", value: total_adr_protein_pairs, color: SOLID_COLORS.adr_protein_pairs }]}
        />
      </div>
    </div>
  );
}
