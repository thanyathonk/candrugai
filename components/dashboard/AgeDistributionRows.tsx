"use client";

/**
 * AgeDistributionRows — Horizontal Stacked Bar Chart
 *
 * Each bar shows the age group total AND its sex breakdown:
 *   ████ Male (brand-blue-700) | ████ Female (brand-green-700) | ░░ Unknown (neutral-300)
 *
 * Hover: dims other bars + shows a sex-breakdown tooltip.
 * Bars and count labels animate in on mount.
 */

import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { useCountUp, useMounted } from "@/lib/hooks";
import type { AgeDistribution, AgeGroup } from "@/lib/types";

// ── Design-system colours ─────────────────────────────────────────────────────

const C_MALE    = "#3F51B5"; // brand-blue-700
const C_FEMALE  = "#35A265"; // brand-green-700
const C_UNKNOWN = "#BBC6CE"; // neutral-300

// ── Tooltip ───────────────────────────────────────────────────────────────────

interface TooltipProps {
  group: AgeGroup;
  visible: boolean;
}

function SexTooltip({ group, visible }: TooltipProps) {
  const sb  = group.sex_breakdown;
  if (!sb || !visible) return null;

  const total      = group.count;
  const malePct    = Math.round((sb.male    / total) * 100);
  const femalePct  = Math.round((sb.female  / total) * 100);
  const unknPct    = 100 - malePct - femalePct;

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+8px)] z-20 bg-white border border-neutral-200 rounded-xl shadow-xl px-3.5 py-3 w-52 pointer-events-none">
      {/* Header */}
      <p className="text-xs font-bold text-gray-900 mb-2">{group.label}</p>

      {/* Male */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: C_MALE }} />
        <span className="text-xs text-gray-700 flex-1">♂ Male</span>
        <span className="text-xs font-semibold text-gray-900 tabular-nums ml-3.5">{formatNumber(sb.male)}</span>
        <span className="text-[10px] text-neutral-500 w-8 text-right tabular-nums">{malePct}%</span>
      </div>

      {/* Female */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: C_FEMALE }} />
        <span className="text-xs text-gray-700 flex-1">♀ Female</span>
        <span className="text-xs font-semibold text-gray-900 tabular-nums">{formatNumber(sb.female)}</span>
        <span className="text-[10px] text-neutral-500 w-8 text-right tabular-nums">{femalePct}%</span>
      </div>

      {/* Unknown */}
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: C_UNKNOWN }} />
        <span className="text-xs text-gray-700 flex-1">? Unknown</span>
        <span className="text-xs font-semibold text-gray-900 tabular-nums">{formatNumber(sb.unknown)}</span>
        <span className="text-[10px] text-neutral-500 w-8 text-right tabular-nums">{unknPct}%</span>
      </div>

      {/* Divider + total */}
      <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Total</span>
        <span className="text-xs font-bold text-gray-900 tabular-nums">{formatNumber(total)}</span>
      </div>

      {/* Arrow pointing left */}
      <div
        className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
        style={{
          borderTop:    "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderRight:  "6px solid white",
        }}
      />
    </div>
  );
}

// ── Individual Bar Row ────────────────────────────────────────────────────────

interface AgeBarRowProps {
  group: AgeGroup;
  idx: number;
  maxCount: number;
  total: number;
  hoveredIdx: number | null;
  mounted: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function AgeBarRow({
  group, idx, maxCount, total, hoveredIdx, mounted, onEnter, onLeave,
}: AgeBarRowProps) {
  const widthPct   = (group.count / maxCount) * 100;
  const sharePct   = Math.round((group.count / total) * 100);
  const isHovered  = hoveredIdx === idx;
  const isAnyHover = hoveredIdx !== null;

  // Sex segment widths (as % of the bar's own width)
  const sb       = group.sex_breakdown;
  const maleSeg  = sb ? (sb.male    / group.count) * 100 : 50;
  const femSeg   = sb ? (sb.female  / group.count) * 100 : 50;
  // unknown fills the remainder

  const barDelay   = idx * 60;
  const countDelay = idx * 60 + 80;
  const animCount  = useCountUp(group.count, 1200, countDelay);

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Age group label */}
      <div className="w-20 shrink-0 text-right">
        <span className="text-xs font-semibold text-gray-800 leading-none">
          {group.label}
        </span>
      </div>

      {/* Bar track — relative so tooltip can anchor to it */}
      <div
        className="relative flex-1 h-6 rounded-md bg-neutral-100 overflow-visible"
        style={{ opacity: isAnyHover && !isHovered ? 0.3 : 1, transition: "opacity 200ms" }}
      >
        {/* Vertical grid lines */}
        {[25, 50, 75].map((g) => (
          <div
            key={g}
            className="absolute top-0 bottom-0 w-px bg-white/70 z-10 pointer-events-none"
            style={{ left: `${g}%` }}
          />
        ))}

        {/* Stacked segments — clipped within the bar's total width */}
        <div
          className="absolute left-0 top-0 h-full rounded-md overflow-hidden flex"
          style={{
            width: mounted ? `${widthPct}%` : "0%",
            transition: `width 1000ms cubic-bezier(0.4, 0, 0.2, 1) ${barDelay}ms`,
            boxShadow: isHovered ? `0 0 0 2px ${C_MALE}44` : "none",
          }}
        >
          {/* Male */}
          <div
            style={{
              width: `${maleSeg}%`,
              backgroundColor: C_MALE,
              transition: "opacity 200ms",
            }}
          />
          {/* Female */}
          <div
            style={{
              width: `${femSeg}%`,
              backgroundColor: C_FEMALE,
              transition: "opacity 200ms",
            }}
          />
          {/* Unknown — fills remainder */}
          <div
            className="flex-1"
            style={{ backgroundColor: C_UNKNOWN }}
          />
        </div>

        {/* Count label — always outside bar */}
        <span
          className="absolute top-1/2 -translate-y-1/2 text-[11px] font-semibold tabular-nums text-gray-900 pointer-events-none"
          style={{ left: `calc(${widthPct}% + 6px)` }}
        >
          {formatNumber(animCount)}
        </span>

        {/* Hover tooltip — anchored to right edge of bar container */}
        <SexTooltip group={group} visible={isHovered} />
      </div>

      {/* % of total */}
      <div className="w-9 shrink-0 text-left ml-10">
        <span className="text-[11px] tabular-nums font-semibold text-gray-700">
          {sharePct}%
        </span>
      </div>
    </div>
  );
}

// ── Main Chart ────────────────────────────────────────────────────────────────

interface AgeDistributionRowsProps {
  distribution: AgeDistribution;
}

export default function AgeDistributionRows({ distribution }: AgeDistributionRowsProps) {
  const { age_groups } = distribution;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const mounted = useMounted(100);

  if (age_groups.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm flex items-center justify-center min-h-[300px]">
        <p className="text-sm text-neutral-600">No age distribution data</p>
      </div>
    );
  }

  const maxCount = Math.max(...age_groups.map((g) => g.count), 1);
  const total    = age_groups.reduce((s, g) => s + g.count, 0);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm h-full flex flex-col">

      {/* ── Title + legend ── */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Age Distribution</h3>

        {/* Sex legend chips */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-5 rounded-sm" style={{ backgroundColor: C_MALE }} />
            <span className="text-[11px] font-medium text-gray-600">♂ Male</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-5 rounded-sm" style={{ backgroundColor: C_FEMALE }} />
            <span className="text-[11px] font-medium text-gray-600">♀ Female</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-5 rounded-sm" style={{ backgroundColor: C_UNKNOWN }} />
            <span className="text-[11px] font-medium text-gray-600">? Unknown</span>
          </div>
          <span className="text-xs text-neutral-500 bg-neutral-100 rounded-full px-2 py-0.5 tabular-nums">
            n = {formatNumber(total)}
          </span>
        </div>
      </div>

      {/* ── Chart wrapper ── */}
      <div className="flex gap-3 flex-1 min-h-0">

        {/* Rotated Y-axis label */}
        <div className="flex items-center justify-center w-5 shrink-0">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest text-gray-700 whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Age Group
          </span>
        </div>

        {/* Plot area */}
        <div className="flex-1 flex flex-col justify-between gap-1.5 overflow-visible">
          {age_groups.map((group, idx) => (
            <AgeBarRow
              key={group.label}
              group={group}
              idx={idx}
              maxCount={maxCount}
              total={total}
              hoveredIdx={hoveredIdx}
              mounted={mounted}
              onEnter={() => setHoveredIdx(idx)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}

          {/* X-axis ticks */}
          <div className="flex pl-22 pr-10 justify-between mt-1">
            {[0, 25, 50, 75, 100].map((g) => (
              <span key={g} className="text-[10px] font-medium text-gray-600 leading-none">
                {g === 0 ? "0" : g === 100 ? "Max" : `${g}%`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
