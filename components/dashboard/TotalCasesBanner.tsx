"use client";

/**
 * TotalCasesBanner — gradient banner แสดง total reported cases
 * docs/component-library.md 4.9
 * Height: 72–96px | Gradient: Blue-700 → Green-700 | radius: 18px
 */

import { formatNumber } from "@/lib/utils";
import { useCountUp } from "@/lib/hooks";
import type { DashboardSummary } from "@/lib/types";

interface TotalCasesBannerProps {
  summary: DashboardSummary;
}

export default function TotalCasesBanner({ summary }: TotalCasesBannerProps) {
  const { total_reports, year_range, dataset_mode } = summary;
  const animatedTotal = useCountUp(total_reports, 1600, 200);

  return (
    <div className="relative overflow-hidden rounded-[18px] bg-linear-to-r from-brand-blue-700 to-brand-green-700 px-8 py-0 min-h-[84px] flex items-center justify-between">
      {/* Decorative circles */}
      <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-white/5" />
      <div className="absolute -right-4 -bottom-6 h-28 w-28 rounded-full bg-white/5" />
      <div className="absolute right-24 top-2 h-16 w-16 rounded-full bg-white/5" />

      {/* Left: main text */}
      <div className="relative z-10">
        <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-0.5">
          Total Reported Cases
        </p>
        <p className="text-white text-3xl font-bold tabular-nums leading-none">
          {formatNumber(animatedTotal)}
        </p>
      </div>

      {/* Center divider */}
      <div className="relative z-10 hidden md:block h-10 w-px bg-white/20 mx-6" />

      {/* Right: year range + mode badge */}
      <div className="relative z-10 text-right hidden md:block">
        <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-0.5">
          Year Range
        </p>
        <p className="text-white text-xl font-semibold">
          {year_range.start} – {year_range.end}
        </p>
      </div>

      {/* Mode badge */}
      <div className="relative z-10 ml-6 hidden md:flex">
        <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white capitalize">
          {dataset_mode}
        </span>
      </div>
    </div>
  );
}
