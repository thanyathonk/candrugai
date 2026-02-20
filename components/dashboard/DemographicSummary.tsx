"use client";

/**
 * DemographicSummary — Male / Female / Unknown sex distribution
 * docs/component-library.md 4.10
 * Layout: column | Icon: 60–90px | Blue-700 (male), Green-700 (female)
 */

import { formatNumber } from "@/lib/utils";
import { useCountUp, useMounted } from "@/lib/hooks";
import type { DashboardSummary } from "@/lib/types";

/** ♂ Mars symbol — biological male */
function MaleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Male"
    >
      {/* Circle */}
      <circle cx="26" cy="38" r="16" stroke="currentColor" strokeWidth="5" fill="none" />
      {/* Arrow shaft */}
      <line x1="38" y1="26" x2="56" y2="8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* Arrow head */}
      <polyline points="44,8 56,8 56,20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** ♀ Venus symbol — biological female */
function FemaleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Female"
    >
      {/* Circle */}
      <circle cx="32" cy="24" r="16" stroke="currentColor" strokeWidth="5" fill="none" />
      {/* Vertical stem */}
      <line x1="32" y1="40" x2="32" y2="58" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* Horizontal cross */}
      <line x1="20" y1="51" x2="44" y2="51" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

interface DemographicSummaryProps {
  summary: DashboardSummary;
}

export default function DemographicSummary({ summary }: DemographicSummaryProps) {
  const { male, female, unknown } = summary.sex_distribution;
  const total = male + female + unknown || 1;

  const malePct   = Math.round((male    / total) * 100);
  const femalePct = Math.round((female  / total) * 100);
  const unknPct   = Math.round((unknown / total) * 100);

  // Animated counts
  const animMale    = useCountUp(male,    1300, 0);
  const animFemale  = useCountUp(female,  1300, 80);
  const animUnknown = useCountUp(unknown, 1300, 160);

  // Bar grows in after first paint
  const mounted = useMounted(120);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-900 mb-6">Sex Distribution</h3>

      {/* Male + Female — big blocks */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Male */}
        <div className="flex flex-col items-center rounded-2xl bg-brand-blue-50 border border-brand-blue-200 py-5 px-3">
          <MaleIcon className="h-14 w-14 text-brand-blue-700 mb-2" />
          <p className="text-2xl font-bold text-brand-blue-700 tabular-nums leading-none">
            {formatNumber(animMale)}
          </p>
          <p className="mt-1 text-xs font-medium text-brand-blue-700/70 uppercase tracking-wide">
            Male
          </p>
          <p className="mt-0.5 text-xs text-neutral-600">{malePct}%</p>
        </div>

        {/* Female */}
        <div className="flex flex-col items-center rounded-2xl bg-brand-green-50 border border-brand-green-200 py-5 px-3">
          <FemaleIcon className="h-14 w-14 text-brand-green-700 mb-2" />
          <p className="text-2xl font-bold text-brand-green-700 tabular-nums leading-none">
            {formatNumber(animFemale)}
          </p>
          <p className="mt-1 text-xs font-medium text-brand-green-700/70 uppercase tracking-wide">
            Female
          </p>
          <p className="mt-0.5 text-xs text-neutral-600">{femalePct}%</p>
        </div>
      </div>

      {/* Unknown — smaller row */}
      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-600">?</span>
          </div>
          <span className="text-sm text-neutral-600">Unknown</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-800 tabular-nums">
            {formatNumber(animUnknown)}
          </span>
          <span className="ml-1.5 text-xs text-neutral-600">({unknPct}%)</span>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="mt-auto">
        <p className="text-[11px] text-neutral-600 mb-1.5">Distribution</p>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="bg-brand-blue-700"
            style={{
              width: mounted ? `${malePct}%` : "0%",
              transition: "width 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            title={`Male ${malePct}%`}
          />
          <div
            className="bg-brand-green-700"
            style={{
              width: mounted ? `${femalePct}%` : "0%",
              transition: "width 1200ms cubic-bezier(0.4, 0, 0.2, 1) 80ms",
            }}
            title={`Female ${femalePct}%`}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-neutral-600">
          <span>♂ {malePct}%</span>
          <span>♀ {femalePct}%</span>
          <span>? {unknPct}%</span>
        </div>
      </div>
    </div>
  );
}
