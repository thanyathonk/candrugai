/**
 * TypeScript type definitions — CanDrugAI
 * Source of truth: docs/api-contract.md
 *
 * กฎ: ทุก type ต้องอิง api-contract.md แบบ 1:1
 *     ห้ามสร้าง shape ใหม่โดยไม่อิงเอกสาร
 */

// ── Enums / Literals ──────────────────────────────────────────────────────────

export type DatasetMode  = "adult" | "pediatric";
export type PatientSex   = "M" | "F" | "UNK";
export type SeriousType  = "CA" | "DE" | "DS" | "HL" | "LT" | "OT";
export type SortOrder    = "asc" | "desc";

// ── Standard wrappers ─────────────────────────────────────────────────────────

/** Standard list response (section 1.2 in api-contract.md) */
export interface ListResponse<T> {
  total_count: number;
  page: number;
  page_size: number;
  results: T[];
}

/** Standard error response (section 1.3) */
export interface ApiError {
  error: true;
  message: string;
  detail?: string;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

/**
 * GET /api/dashboard/summary
 * (section 2.1)
 */
export interface DashboardSummary {
  dataset_mode: DatasetMode;
  year_range: { start: number; end: number };
  total_reports: number;
  outcome_counts: Record<SeriousType, number>;
  sex_distribution: {
    male: number;
    female: number;
    unknown: number;
  };
}

/**
 * GET /api/dashboard/age-distribution
 * (section 2.2)
 */
export interface AgeGroup {
  label: string;
  min: number;
  max: number;
  count: number;
  sex_breakdown?: {
    male: number;
    female: number;
    unknown: number;
  };
}

export interface AgeDistribution {
  dataset_mode: DatasetMode;
  age_groups: AgeGroup[];
}

/**
 * GET /api/dashboard/statistics
 * (section 2.3)
 */
export interface DashboardStatistics {
  dataset_mode: DatasetMode;
  total_adr_terms: number;
  total_drugs: number;
  total_drug_adr_pairs: number;
  total_adr_protein_pairs: number;
  meddra_distribution: {
    SOC: number;
    HLGT: number;
    HLT: number;
    PT: number;
  };
}

// ── Search ────────────────────────────────────────────────────────────────────

/**
 * Single row in GET /api/search/reports response
 * (section 3.1)
 */
export interface ReportRow {
  safetyreportid: string;
  ingredient: string;
  medicinal_product: string;
  reaction_meddrapt: string;
  nichd: string;
  patient_sex: PatientSex;
  age_years: number | null;
  serious: boolean;
  serious_type: SeriousType;
  drug_indication: string;
  drug_administration: string;
  index_date: string;
}

export type ReportListResponse = ListResponse<ReportRow>;

/**
 * Query params for GET /api/search/reports
 * (section 3.1)
 */
export interface SearchReportsParams {
  dataset_mode: DatasetMode;
  q?: string;
  ingredient?: string;
  medicinal_product?: string;
  reaction_meddrapt?: string;
  nichd?: string;
  patient_sex?: PatientSex;
  age_min?: number;
  age_max?: number;
  serious?: boolean;
  serious_type?: SeriousType;
  soc_code?: string;        // MedDRA SOC code filter (future backend)
  date_start?: string;
  date_end?: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: SortOrder;
}

// ── Report Detail ─────────────────────────────────────────────────────────────

/**
 * GET /api/reports/{safetyreportid}
 * (section 4.1)
 */
export interface ReportDetail {
  safetyreportid: string;
  dataset_mode: DatasetMode;
  index_date: string;
  patient: {
    patient_sex: PatientSex;
    age_years: number | null;
    nichd: string;
  };
  serious: boolean;
  serious_flags: Record<SeriousType, boolean>;
  drug_indication: string;
  drug_administration: string;
  drugs: { ingredient: string; medicinal_product: string }[];
  reactions: { reaction_meddrapt: string; meddra_soc_names: string }[];
}

// ── Lookups ───────────────────────────────────────────────────────────────────

/**
 * GET /api/lookups/ingredients | /api/lookups/reactions | /api/lookups/nichd
 * (section 5.x)
 */
export interface LookupResults {
  results: string[];
}
