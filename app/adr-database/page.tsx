/**
 * ADR Database Page — Server Component
 * Layout: docs/component-library.md section 6 (Dashboard Layout)
 * Reads ?mode=adult|pediatric from URL (controlled by DatasetToggle client component)
 */

import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import DatasetToggle from "@/components/dashboard/DatasetToggle";
import OutcomeKpiCard from "@/components/dashboard/OutcomeKpiCard";
import TotalCasesBanner from "@/components/dashboard/TotalCasesBanner";
import DemographicSummary from "@/components/dashboard/DemographicSummary";
import AgeDistributionRows from "@/components/dashboard/AgeDistributionRows";
import DataStatisticsSection from "@/components/dashboard/DataStatisticsSection";
import BodySocMap from "@/components/dashboard/BodySocMap";
import {
  getDashboardSummary,
  getDashboardAgeDistribution,
  getDashboardStatistics,
} from "@/lib/api";
import type { DatasetMode, SeriousType } from "@/lib/types";

export const metadata = {
  title: "ADR Database | CanDrugAI",
  description: "Adverse Drug Reaction visualization dashboard — FAERS dataset",
};

// KPI outcome codes in display order
const OUTCOME_CODES: SeriousType[] = ["CA", "DE", "DS", "HL", "LT", "OT"];

interface AdrDatabasePageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function AdrDatabasePage({ searchParams }: AdrDatabasePageProps) {
  const { mode } = await searchParams;
  const datasetMode: DatasetMode = mode === "pediatric" ? "pediatric" : "adult";

  // Parallel fetch — 3 endpoints
  const [summary, ageDistribution, statistics] = await Promise.all([
    getDashboardSummary(datasetMode),
    getDashboardAgeDistribution(datasetMode),
    getDashboardStatistics(datasetMode),
  ]);

  return (
    <>
      <Navbar />

      {/* Page hero — subtle gradient header */}
      <div className="bg-linear-to-b from-brand-blue-50 to-white border-b border-neutral-200">
        <PageContainer className="py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            {/* Title block */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue-700 mb-1">
                FAERS Dataset
              </p>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Adverse Drug Reaction Database
              </h1>
              <p className="mt-1.5 text-sm text-neutral-600">
                Explore reported ADR signals from the FDA FAERS dataset
              </p>
            </div>

            {/* Dataset Toggle */}
            <Suspense>
              <DatasetToggle currentMode={datasetMode} />
            </Suspense>
          </div>
        </PageContainer>
      </div>

      <main className="min-h-screen bg-white py-10">
        <PageContainer className="space-y-8">

          {/* ── KPI Cards — 6 outcomes ───────────────────────── */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
              Outcome Categories
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {OUTCOME_CODES.map((code, i) => (
                <OutcomeKpiCard
                  key={code}
                  code={code}
                  count={summary.outcome_counts[code]}
                  index={i}
                />
              ))}
            </div>
          </section>

          {/* ── Total Reported Cases Banner ──────────────────── */}
          <section>
            <TotalCasesBanner summary={summary} />
          </section>

          {/* ── Demographic + Age Distribution ──────────────── */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
              Patient Demographics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <DemographicSummary summary={summary} />
              </div>
              <div className="md:col-span-2">
                <AgeDistributionRows distribution={ageDistribution} />
              </div>
            </div>
          </section>

          {/* ── SOC Body Map ──────────────────────────────────────── */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
              Body System Filter
            </p>
            <BodySocMap datasetMode={datasetMode} />
          </section>

          {/* ── Data Statistics ──────────────────────────────── */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
              Data Statistics
            </p>
            <DataStatisticsSection statistics={statistics} />
          </section>

        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
