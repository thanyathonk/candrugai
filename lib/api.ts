/**
 * API Client — CanDrugAI
 * Source of truth: docs/api-contract.md
 *
 * ใช้งาน:
 *   - NEXT_PUBLIC_USE_MOCK=true  → return mock data โดยตรง (default)
 *   - NEXT_PUBLIC_USE_MOCK=false → fetch backend จริง, fallback mock ถ้า fail
 *
 * กฎ:
 *   - Component/Page ต้องเรียกผ่าน api.ts เท่านั้น
 *   - ห้าม import จาก mock/ โดยตรงใน component
 *   - Return types ต้องตรงกับ lib/types.ts เสมอ
 */

import type {
  DatasetMode,
  DashboardSummary,
  AgeDistribution,
  DashboardStatistics,
  ReportListResponse,
  ReportDetail,
  LookupResults,
  SearchReportsParams,
} from "@/lib/types";

import {
  mockDashboardSummary,
  mockAgeDistribution,
  mockDashboardStatistics,
} from "@/mock/dashboard";
import { mockReportListResponse, mockReportDetail } from "@/mock/reports";
import {
  mockIngredientsLookup,
  mockReactionsLookup,
  mockNichdLookup,
} from "@/mock/lookups";

// ── Config ────────────────────────────────────────────────────────────────────

/** true = use mock data (default); false = try real backend */
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

/** Backend base URL — ถ้าไม่ set ใช้ same-origin */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

/**
 * safeFetch — fetch with timeout + auto-fallback to mock data
 *
 * @param path         API path เช่น "/api/dashboard/summary?dataset_mode=adult"
 * @param mockFallback ฟังก์ชัน return mock data ถ้า fetch fail
 * @param timeoutMs    timeout ก่อน abort (default 10s)
 */
async function safeFetch<T>(
  path: string,
  mockFallback: () => T,
  timeoutMs = 10_000
): Promise<T> {
  if (USE_MOCK) {
    return mockFallback();
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timer);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);
    const isAbort = err instanceof DOMException && err.name === "AbortError";
    console.warn(
      `[api] ${isAbort ? "timeout" : "error"} on ${path} — falling back to mock`,
      isAbort ? "" : err
    );
    return mockFallback();
  }
}

/** Build query string from a params object (skip undefined values) */
function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return qs ? `?${qs}` : "";
}

// ── Dashboard endpoints ───────────────────────────────────────────────────────

/**
 * GET /api/dashboard/summary
 * KPI cards (CA/DE/DS/HL/LT/OT) + total cases banner + sex distribution
 */
export async function getDashboardSummary(
  datasetMode: DatasetMode
): Promise<DashboardSummary> {
  return safeFetch(
    `/api/dashboard/summary?dataset_mode=${datasetMode}`,
    () => mockDashboardSummary[datasetMode]
  );
}

/**
 * GET /api/dashboard/age-distribution
 * Age group distribution bars
 */
export async function getDashboardAgeDistribution(
  datasetMode: DatasetMode
): Promise<AgeDistribution> {
  return safeFetch(
    `/api/dashboard/age-distribution?dataset_mode=${datasetMode}`,
    () => mockAgeDistribution[datasetMode]
  );
}

/**
 * GET /api/dashboard/statistics
 * ADR terms / drugs / drug-ADR pairs / MedDRA breakdown
 */
export async function getDashboardStatistics(
  datasetMode: DatasetMode
): Promise<DashboardStatistics> {
  return safeFetch(
    `/api/dashboard/statistics?dataset_mode=${datasetMode}`,
    () => mockDashboardStatistics[datasetMode]
  );
}

// ── Search endpoints ──────────────────────────────────────────────────────────

/**
 * GET /api/search/reports
 * Table results with pagination + sorting
 */
export async function searchReports(
  params: SearchReportsParams
): Promise<ReportListResponse> {
  const { dataset_mode, ...rest } = params;

  return safeFetch(
    `/api/search/reports${buildQuery({ dataset_mode, ...rest })}`,
    () => mockReportListResponse
  );
}

/**
 * GET /api/reports/{safetyreportid}
 * Full report detail
 */
export async function getReportDetail(
  safetyreportid: string
): Promise<ReportDetail> {
  return safeFetch(
    `/api/reports/${encodeURIComponent(safetyreportid)}`,
    () => mockReportDetail
  );
}

// ── Lookup endpoints ──────────────────────────────────────────────────────────

/**
 * GET /api/lookups/ingredients
 * Ingredient autocomplete / dropdown
 */
export async function lookupIngredients(
  q?: string,
  limit = 50
): Promise<LookupResults> {
  return safeFetch(
    `/api/lookups/ingredients${buildQuery({ q, limit })}`,
    () =>
      q
        ? { results: mockIngredientsLookup.results.filter((r) => r.includes(q.toLowerCase())) }
        : mockIngredientsLookup
  );
}

/**
 * GET /api/lookups/reactions
 * Reaction term autocomplete / dropdown
 */
export async function lookupReactions(
  q?: string,
  limit = 50
): Promise<LookupResults> {
  return safeFetch(
    `/api/lookups/reactions${buildQuery({ q, limit })}`,
    () =>
      q
        ? {
            results: mockReactionsLookup.results.filter((r) =>
              r.toLowerCase().includes(q.toLowerCase())
            ),
          }
        : mockReactionsLookup
  );
}

/**
 * GET /api/lookups/nichd
 * NICHD pediatric age group list
 */
export async function lookupNichd(): Promise<LookupResults> {
  return safeFetch("/api/lookups/nichd", () => mockNichdLookup);
}
