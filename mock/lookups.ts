/**
 * Mock data — Lookup lists (ingredients / reactions / nichd)
 * Shape: docs/api-contract.md section 5.x
 *
 * กฎ: ห้าม import ไฟล์นี้ใน component/page โดยตรง
 *     ให้เรียกผ่าน lib/api.ts เท่านั้น
 */

import type { LookupResults } from "@/lib/types";

// ── 5.1 /api/lookups/ingredients ─────────────────────────────────────────────

export const mockIngredientsLookup: LookupResults = {
  results: [
    "amoxicillin",
    "aspirin",
    "atorvastatin",
    "azithromycin",
    "clopidogrel",
    "ibuprofen",
    "levothyroxine",
    "lisinopril",
    "metformin",
    "metoprolol",
    "omeprazole",
    "sertraline",
    "simvastatin",
    "warfarin",
  ],
};

// ── 5.2 /api/lookups/reactions ────────────────────────────────────────────────

export const mockReactionsLookup: LookupResults = {
  results: [
    "Anaphylaxis",
    "Arrhythmia",
    "Diarrhoea",
    "Dizziness",
    "Fatigue",
    "Headache",
    "Hepatotoxicity",
    "Hypoglycaemia",
    "Lactic acidosis",
    "Myopathy",
    "Nausea",
    "Pruritus",
    "Rash",
    "Suicidal ideation",
    "Vomiting",
  ],
};

// ── 5.3 /api/lookups/nichd ────────────────────────────────────────────────────

export const mockNichdLookup: LookupResults = {
  results: [
    "term_neonatal",
    "infancy",
    "toddler",
    "early_childhood",
    "middle_childhood",
    "early_adolescence",
    "late_adolescence",
  ],
};
