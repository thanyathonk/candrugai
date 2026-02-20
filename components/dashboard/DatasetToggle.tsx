"use client";

/**
 * DatasetToggle — Adult / Pediatric segmented control
 * docs/component-library.md 4.7
 */

import { useRouter } from "next/navigation";
import type { DatasetMode } from "@/lib/types";

const MODES: { value: DatasetMode; label: string; icon: string }[] = [
  { value: "adult",     label: "Adult",     icon: "👤" },
  { value: "pediatric", label: "Pediatric", icon: "🧒" },
];

interface DatasetToggleProps {
  currentMode: DatasetMode;
}

export default function DatasetToggle({ currentMode }: DatasetToggleProps) {
  const router = useRouter();

  const handleSelect = (mode: DatasetMode) => {
    router.push(`/adr-database?mode=${mode}`);
  };

  return (
    <div
      className="inline-flex rounded-2xl border border-neutral-200 bg-white p-1 shadow-sm"
      role="group"
      aria-label="Dataset mode"
    >
      {MODES.map(({ value, label, icon }) => {
        const active = currentMode === value;
        return (
          <button
            key={value}
            onClick={() => handleSelect(value)}
            className={`
              flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium
              transition-all duration-150 select-none
              ${active
                ? "bg-brand-blue-50 border border-brand-blue-200 text-brand-blue-700 font-semibold shadow-sm"
                : "border border-transparent text-neutral-600 hover:bg-brand-blue-50 hover:text-brand-blue-700"
              }
            `}
            aria-pressed={active}
          >
            <span className="text-base leading-none">{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
