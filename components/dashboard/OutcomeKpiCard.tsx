"use client";

/**
 * OutcomeKpiCard — CA / DE / DS / HL / LT / OT
 * Each outcome has its own unique color; hover fills card with that color's tint.
 */

import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { useCountUp } from "@/lib/hooks";
import type { SeriousType } from "@/lib/types";

interface OutcomeColor {
  accent: string;    // main color  (bar, badge text, count on hover)
  bg: string;        // soft tint   (card + badge bg on hover)
  border: string;    // light shade (border + badge border on hover)
  defaultBadgeBg: string; // badge bg at rest
  fullLabel: string;
}

const OUTCOME_COLORS: Record<SeriousType, OutcomeColor> = {
  CA: {
    accent:         "#7C3AED",
    bg:             "#F5F3FF",
    border:         "#DDD6FE",
    defaultBadgeBg: "#F5F3FF",
    fullLabel:      "Congenital Anomaly",
  },
  DE: {
    accent:         "#DC2626",
    bg:             "#FEF2F2",
    border:         "#FECACA",
    defaultBadgeBg: "#FEF2F2",
    fullLabel:      "Death",
  },
  DS: {
    accent:         "#EA580C",
    bg:             "#FFF7ED",
    border:         "#FED7AA",
    defaultBadgeBg: "#FFF7ED",
    fullLabel:      "Disabling",
  },
  HL: {
    accent:         "#3F51B5",
    bg:             "#E2EDFE",
    border:         "#BCCBF0",
    defaultBadgeBg: "#E2EDFE",
    fullLabel:      "Hospitalization",
  },
  LT: {
    accent:         "#D97706",
    bg:             "#FFFBEB",
    border:         "#FDE68A",
    defaultBadgeBg: "#FFFBEB",
    fullLabel:      "Life Threatening",
  },
  OT: {
    accent:         "#0D9488",
    bg:             "#F0FDFA",
    border:         "#99F6E4",
    defaultBadgeBg: "#F0FDFA",
    fullLabel:      "Other",
  },
};

interface OutcomeKpiCardProps {
  code: SeriousType;
  count: number;
  index?: number;
}

export default function OutcomeKpiCard({ code, count, index = 0 }: OutcomeKpiCardProps) {
  const [hovered, setHovered] = useState(false);
  const c = OUTCOME_COLORS[code];
  const animatedCount = useCountUp(count, 1400, index * 80);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl border shadow-sm cursor-default transition-shadow duration-200 hover:shadow-md"
      style={{
        backgroundColor: hovered ? c.bg        : "#ffffff",
        borderColor:     hovered ? c.border     : "#E3E3E3",
        transition:      "background-color 200ms, border-color 200ms, box-shadow 200ms",
      }}
    >
      {/* Top accent bar — thickens on hover */}
      {/* <div
        className="absolute inset-x-0 top-0 transition-all duration-200"
        style={{
          height:          hovered ? "5px" : "4px",
          backgroundColor: c.accent,
        }}
      /> */}

      <div className="px-5 pt-6 pb-5 text-center">
        {/* Code badge */}
        <div
          className="inline-flex items-center justify-center rounded-xl border px-3 py-1 mb-3 transition-colors duration-200"
          style={{
            backgroundColor: hovered ? c.border : c.defaultBadgeBg,
            borderColor:     c.border,
          }}
        >
          <span
            className="text-xl font-bold leading-none"
            style={{ color: c.accent }}
          >
            {code}
          </span>
        </div>

        {/* Count */}
        <p
          className="text-lg tabular-nums transition-colors duration-200"
          style={{
            color:      hovered ? c.accent : "#111827",
            fontWeight: hovered ? 700 : 600,
          }}
        >
          {formatNumber(animatedCount)}
        </p>

        {/* Full label */}
        <p
          className="mt-1 text-[11px] leading-tight min-h-[2em] transition-colors duration-200"
          style={{ color: hovered ? c.accent : "#949CA1" }}
        >
          {c.fullLabel}
        </p>
      </div>
    </div>
  );
}
