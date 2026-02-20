/**
 * Shared utility functions
 */

/** Format number with comma separator (e.g. 71944 → "71,944") */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/** Capitalize first letter */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Map serious_type code → full label */
export const SERIOUS_TYPE_LABELS: Record<string, string> = {
  CA: "Congenital Anomaly",
  DE: "Death",
  DS: "Disabling",
  HL: "Hospitalization",
  LT: "Life Threatening",
  OT: "Other",
};

/** Map patient_sex code → readable label */
export const SEX_LABELS: Record<string, string> = {
  M: "Male",
  F: "Female",
  UNK: "Unknown",
};
