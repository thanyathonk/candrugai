/**
 * DrugSearch Page — Server Component (thin shell)
 * Fetches initial data server-side, passes to DrugSearchClient
 * Interactivity (search/filter/sort/paginate) handled by client component
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import DrugSearchClient from "./DrugSearchClient";
import { searchReports } from "@/lib/api";

export const metadata = {
  title: "Drug Search | CanDrugAI",
  description: "Search and explore adverse drug reaction reports from FAERS",
};

export default async function DrugSearchPage() {
  const initial = await searchReports({ dataset_mode: "adult" });

  return (
    <>
      <Navbar />

      {/* Page hero */}
      <div className="bg-linear-to-b from-brand-blue-50 to-white border-b border-neutral-200">
        <PageContainer className="py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue-700 mb-1">
            FAERS Dataset
          </p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Drug Search</h1>
          <p className="mt-1.5 text-sm text-neutral-600">
            Search and explore individual ADR case reports by drug, reaction, or patient profile
          </p>
        </PageContainer>
      </div>

      <main className="min-h-screen bg-white py-10">
        <PageContainer>
          <DrugSearchClient
            initialData={initial.results}
            initialTotal={initial.total_count}
          />
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
