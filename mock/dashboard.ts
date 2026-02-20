/**
 * Mock data — ADR Dashboard
 * Shape: docs/api-contract.md sections 2.1 / 2.2 / 2.3
 *
 * กฎ: ห้าม import ไฟล์นี้ใน component/page โดยตรง
 *     ให้เรียกผ่าน lib/api.ts เท่านั้น
 */

import type {
  DatasetMode,
  DashboardSummary,
  AgeDistribution,
  DashboardStatistics,
} from "@/lib/types";

// ── 2.1 /api/dashboard/summary ───────────────────────────────────────────────

export const mockDashboardSummary: Record<DatasetMode, DashboardSummary> = {
  adult: {
    dataset_mode: "adult",
    year_range: { start: 2012, end: 2025 },
    total_reports: 71944,
    outcome_counts: { CA: 580, DE: 7000, DS: 200, HL: 8000, LT: 3468, OT: 12000 },
    sex_distribution: { male: 28600, female: 11600, unknown: 31744 },
  },
  pediatric: {
    dataset_mode: "pediatric",
    year_range: { start: 2012, end: 2025 },
    total_reports: 18420,
    outcome_counts: { CA: 310, DE: 1200, DS: 95, HL: 3200, LT: 870, OT: 4100 },
    sex_distribution: { male: 9800, female: 7100, unknown: 1520 },
  },
};

// ── 2.2 /api/dashboard/age-distribution ──────────────────────────────────────

// sex_breakdown totals are consistent with mockDashboardSummary sex_distribution
// Adult  : male 28 600  female 11 600  unknown 31 744
// Pediatric: male  9 800  female  7 100  unknown  1 520
export const mockAgeDistribution: Record<DatasetMode, AgeDistribution> = {
  adult: {
    dataset_mode: "adult",
    age_groups: [
      {
        label: "18–30 Years", min: 18, max: 30,  count: 12400,
        sex_breakdown: { male: 4900,  female: 1990,  unknown:  5510 },
      },
      {
        label: "31–45 Years", min: 31, max: 45,  count: 21800,
        sex_breakdown: { male: 8730,  female: 3500,  unknown:  9570 },
      },
      {
        label: "46–60 Years", min: 46, max: 60,  count: 18600,
        sex_breakdown: { male: 7450,  female: 2980,  unknown:  8170 },
      },
      {
        label: "61–75 Years", min: 61, max: 75,  count: 13200,
        sex_breakdown: { male: 5290,  female: 2120,  unknown:  5790 },
      },
      {
        label: "75+ Years",   min: 76, max: 999, count:  5944,
        sex_breakdown: { male: 2230,  female: 1010,  unknown:  2704 },
      },
    ],
  },
  pediatric: {
    dataset_mode: "pediatric",
    age_groups: [
      {
        label: "0–2 Years",   min: 0,  max: 2,  count: 2100,
        sex_breakdown: { male: 1120,  female:  815,  unknown:   165 },
      },
      {
        label: "3–5 Years",   min: 3,  max: 5,  count: 3200,
        sex_breakdown: { male: 1700,  female: 1230,  unknown:   270 },
      },
      {
        label: "6–11 Years",  min: 6,  max: 11, count: 5800,
        sex_breakdown: { male: 3100,  female: 2240,  unknown:   460 },
      },
      {
        label: "12–17 Years", min: 12, max: 17, count: 7320,
        sex_breakdown: { male: 3880,  female: 2815,  unknown:   625 },
      },
    ],
  },
};

// ── 2.3 /api/dashboard/statistics ────────────────────────────────────────────

export const mockDashboardStatistics: Record<DatasetMode, DashboardStatistics> = {
  adult: {
    dataset_mode: "adult",
    total_adr_terms: 10019,
    total_drugs: 2345,
    total_drug_adr_pairs: 56789,
    total_adr_protein_pairs: 38420,
    meddra_distribution: { SOC: 27, HLGT: 331, HLT: 1429, PT: 8232 },
  },
  pediatric: {
    dataset_mode: "pediatric",
    total_adr_terms: 6780,
    total_drugs: 1120,
    total_drug_adr_pairs: 24300,
    total_adr_protein_pairs: 15600,
    meddra_distribution: { SOC: 27, HLGT: 118, HLT: 390, PT: 6780 },
  },
};
