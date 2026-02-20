"use client";

/**
 * BodySocMap — Interactive MedDRA SOC body map
 *
 * Layout:
 *   LEFT  (~42 %): PT list panel
 *     • Default : prompt to click a body system
 *     • Selected: top-20 Preferred Terms with animated bars
 *   RIGHT (~58 %): Real body illustration (public/body.svg, 3143 × 7792)
 *     overlaid with a transparent SVG of the same viewBox that renders
 *     the 27 animated SOC dots — guarantee pixel-perfect registration.
 *
 * Dot sizing  : proportional to totalCount (min r=55, max r=105 in SVG units).
 * Tooltip     : HTML div, position converted from SVG→container px.
 * Colours     : design-system tokens only.
 * Data        : mock/soc-pt.ts for PT lists.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SOC_POINTS,
  SOC_CATEGORY_COLORS,
  type SocPoint,
  type SocCategory,
} from "@/lib/socMap";
import { SOC_TOP_PTS, type SocTopPts, type PtCount } from "@/mock/soc-pt";
import { formatNumber } from "@/lib/utils";
import type { DatasetMode } from "@/lib/types";

// ── Constants ─────────────────────────────────────────────────────────────────

const SVG_W = 3143;
const SVG_H = 7792;

const MAX_TOTAL = Math.max(...SOC_POINTS.map((p) => p.totalCount));

function dotR(count: number) {
  return 55 + ((count / MAX_TOTAL) * 50); // 55 – 105 SVG units
}

const SOC_PT_MAP: Record<string, SocTopPts> = Object.fromEntries(
  SOC_TOP_PTS.map((s) => [s.socCode, s])
);

// ── Pre-compute overall Top-20 across all SOCs (sum duplicates) ───────────────

const _ptAgg = new Map<string, number>();
SOC_TOP_PTS.forEach(({ topPts }) => {
  topPts.forEach(({ pt, count }) => {
    _ptAgg.set(pt, (_ptAgg.get(pt) ?? 0) + count);
  });
});

const OVERALL_TOP_20: PtCount[] = [..._ptAgg.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([pt, count]) => ({ pt, count }));

const OVERALL_SOC_DATA: SocTopPts = {
  socCode: "ALL",
  socName: "All Body Systems",
  topPts: OVERALL_TOP_20,
};

// ── SOC Dot (SVG element) ─────────────────────────────────────────────────────

interface SocDotProps {
  point: SocPoint;
  selected: boolean;
  hovered: boolean;
  onSelect: (soc: string) => void;
  onHoverStart: (soc: string) => void;
  onHoverEnd: () => void;
}

function SocDot({ point, selected, hovered, onSelect, onHoverStart, onHoverEnd }: SocDotProps) {
  const colors  = SOC_CATEGORY_COLORS[point.category];
  const baseR   = dotR(point.totalCount);
  const targetR = selected ? baseR + 22 : hovered ? baseR + 14 : baseR;
  const fillCol = selected ? "#35A265" : colors.fill;
  const strokeC = selected ? "#35A265" : "white";

  return (
    <g
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(point.soc)}
      onMouseEnter={() => onHoverStart(point.soc)}
      onMouseLeave={() => onHoverEnd()}
    >
      {/* Expanding pulse ring */}
      <motion.circle
        cx={point.x} cy={point.y}
        r={baseR + 10}
        fill="none"
        stroke={selected ? "#35A265" : colors.fill}
        strokeWidth={selected ? 18 : 10}
        animate={{
          r: [baseR + 10, baseR + (selected ? 140 : 90)],
          opacity: [0.65, 0],
        }}
        transition={{ repeat: Infinity, duration: selected ? 1.1 : 3.2, ease: "easeOut" }}
      />

      {/* White halo — keeps dot readable on the body illustration */}
      <motion.circle
        cx={point.x} cy={point.y}
        fill="white"
        animate={{ r: targetR + 22 }}
        transition={{ duration: 0.2 }}
      />

      {/* Main dot */}
      <motion.circle
        cx={point.x} cy={point.y}
        fill={fillCol}
        stroke={strokeC}
        strokeWidth={selected ? 18 : 12}
        animate={{ r: targetR, fill: fillCol }}
        transition={{ duration: 0.2 }}
      />

      {/* Tick when selected */}
      {selected && (
        <motion.path
          d={`M ${point.x - 28} ${point.y} L ${point.x - 10} ${point.y + 22} L ${point.x + 32} ${point.y - 22}`}
          fill="none" stroke="white" strokeWidth="18"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </g>
  );
}

// ── Hover Tooltip ─────────────────────────────────────────────────────────────

interface DotTooltipProps {
  point: SocPoint;
  pts: SocTopPts | undefined;
  containerW: number;
  containerH: number;
}

function DotTooltip({ point, pts, containerW, containerH }: DotTooltipProps) {
  const colors = SOC_CATEGORY_COLORS[point.category];

  // SVG → container pixel conversion
  const px = (point.x / SVG_W) * containerW;
  const py = (point.y / SVG_H) * containerH;

  const flipX = point.x > SVG_W / 2;
  const flipY = point.y > SVG_H * 0.72;

  return (
    <motion.div
      key={point.soc}
      initial={{ opacity: 0, scale: 0.9, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.14 }}
      className="absolute pointer-events-none z-30 bg-white border border-neutral-200 rounded-xl shadow-xl px-3.5 py-3 w-52"
      style={{
        left:      flipX ? `${px - 8}px`  : `${px + 12}px`,
        top:       flipY ? `${py - 8}px`  : `${py + 4}px`,
        transform: flipX
          ? flipY ? "translate(-100%,-100%)" : "translate(-100%,-50%)"
          : flipY ? "translate(0,-100%)"     : "translate(0,-50%)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: colors.fill }} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
          {colors.label}
        </span>
      </div>
      <p className="text-xs font-bold text-gray-900 leading-snug mb-2">{point.name}</p>
      {pts && pts.topPts.slice(0, 3).map((p, i) => (
        <div key={i} className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] text-neutral-400 w-3.5 shrink-0">{i + 1}.</span>
          <span className="text-[11px] text-gray-700 flex-1 truncate">{p.pt}</span>
          <span className="text-[10px] font-semibold text-neutral-600 tabular-nums">
            {formatNumber(p.count)}
          </span>
        </div>
      ))}
      <p className="mt-2 text-[10px] text-brand-blue-700 font-medium">Click to see all 20 →</p>
    </motion.div>
  );
}

// ── PT List (left panel) ──────────────────────────────────────────────────────
// isOverall = true  → default "Top 20 Drug Reactions" view (all SOCs combined)
// isOverall = false → focused view for a single selected SOC

interface PtListProps {
  socData: SocTopPts;
  category: SocCategory | null;  // null when showing overall
  isOverall: boolean;
}

// Design-system blue used for the overall / unfiltered state
const OVERALL_COLOR = "#3F51B5"; // brand-blue-700

function PtList({ socData, category, isOverall }: PtListProps) {
  const catColors  = category ? SOC_CATEGORY_COLORS[category] : null;
  const barColor   = catColors?.fill ?? OVERALL_COLOR;
  const maxCount   = socData.topPts[0]?.count ?? 1;

  return (
    <motion.div
      key={socData.socCode}         // re-mounts + re-animates on SOC change
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col h-full"
    >
      {/* ── Panel header ── */}
      <div className="px-4 pt-4 pb-3 border-b border-neutral-100 shrink-0">
        {isOverall ? (
          <>
            {/* Overall — blue accent bar */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: OVERALL_COLOR }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
                All Body Systems
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-snug">
              Top 20 Drug Reactions
            </p>
            <p className="text-xs text-neutral-600 mt-0.5">
              Click a dot on the body map to filter by system
            </p>
          </>
        ) : (
          <>
            {/* SOC-specific — category colour */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: barColor }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
                {catColors?.label ?? ""}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-snug">{socData.socName}</p>
            <p className="text-xs text-neutral-600 mt-0.5">Top 20 Preferred Terms (PT)</p>
          </>
        )}
      </div>

      {/* ── Scrollable PT rows ── */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {socData.topPts.map((item, i) => {
          const barPct = (item.count / maxCount) * 100;
          return (
            <motion.div
              key={item.pt}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.022 }}
              className="flex items-center gap-2 py-1.5 group"
            >
              {/* Rank */}
              <span className="text-[10px] text-neutral-400 w-5 text-right shrink-0 tabular-nums">
                {i + 1}
              </span>

              {/* Name + animated bar */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-800 leading-tight truncate group-hover:text-gray-900">
                  {item.pt}
                </p>
                <div className="mt-0.5 h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: barColor }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${barPct}%` }}
                    transition={{ duration: 0.55, delay: i * 0.022, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Count */}
              <span className="text-[11px] font-semibold text-gray-700 tabular-nums shrink-0 w-14 text-right">
                {formatNumber(item.count)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BodySocMap({ datasetMode }: { datasetMode: DatasetMode }) {
  const [selectedSoc, setSelectedSoc] = useState<string | null>(null);
  const [hoveredSoc,  setHoveredSoc]  = useState<string | null>(null);

  // Track rendered container size for tooltip pixel-position conversion
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setContainerSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const handleSelect = useCallback((soc: string) => {
    setSelectedSoc((prev) => (prev === soc ? null : soc));
  }, []);

  const hoveredPoint  = hoveredSoc  ? SOC_POINTS.find((p) => p.soc === hoveredSoc)  : null;
  const selectedPoint = selectedSoc ? SOC_POINTS.find((p) => p.soc === selectedSoc) : null;

  // Left panel always shows data — fall back to overall top-20 when nothing selected
  const activeSocData = selectedSoc ? (SOC_PT_MAP[selectedSoc] ?? OVERALL_SOC_DATA) : OVERALL_SOC_DATA;
  const isOverall     = !selectedSoc;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">

      {/* ── Section Header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            ADR Distribution by System Organ Class (SOC)
          </h3>
          <p className="mt-0.5 text-xs text-neutral-600">
            27 MedDRA SOC groups — click a dot to explore top adverse reactions
          </p>
        </div>

        <AnimatePresence>
          {selectedPoint && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedSoc(null)}
              className="flex items-center gap-1.5 bg-brand-blue-50 border border-brand-blue-200 rounded-full pl-2.5 pr-2 py-1 text-xs font-semibold text-brand-blue-700 hover:bg-brand-blue-200/50 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-brand-green-700 shrink-0" />
              {selectedPoint.shortName}
              <span className="ml-0.5 text-brand-blue-500 text-sm leading-none">×</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Two-column body ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] h-[600px]">

        {/* ── LEFT: PT list — always visible ────────────────────────────── */}
        <div className="border-r border-neutral-100 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <PtList
              key={activeSocData.socCode}          // triggers re-animation on change
              socData={activeSocData}
              category={selectedPoint?.category ?? null}
              isOverall={isOverall}
            />
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Body map ────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center bg-white p-4 overflow-hidden">

          {/*
            Inner wrapper has the EXACT aspect ratio of body.svg (3143:7792).
            Both the <img> and the overlay <svg> sit inside it, sharing the
            same bounding box → dot coordinates stay perfectly registered.
          */}
          <div
            ref={mapContainerRef}
            className="relative h-full"
            style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}
          >
            {/* Body illustration */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/body.svg"
              alt="Human body anatomy"
              className="absolute inset-0 w-full h-full"
              draggable={false}
            />

            {/* Dot overlay — same coordinate space as body.svg */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
            >
              {SOC_POINTS.map((point) => (
                <SocDot
                  key={point.soc}
                  point={point}
                  selected={selectedSoc === point.soc}
                  hovered={hoveredSoc === point.soc}
                  onSelect={handleSelect}
                  onHoverStart={setHoveredSoc}
                  onHoverEnd={() => setHoveredSoc(null)}
                />
              ))}
            </svg>

            {/* Tooltip — positioned relative to mapContainerRef */}
            <AnimatePresence>
              {hoveredPoint && containerSize.w > 0 && (
                <DotTooltip
                  key={hoveredPoint.soc}
                  point={hoveredPoint}
                  pts={SOC_PT_MAP[hoveredPoint.soc]}
                  containerW={containerSize.w}
                  containerH={containerSize.h}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
