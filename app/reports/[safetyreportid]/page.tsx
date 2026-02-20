import PageContainer from "@/components/layout/PageContainer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface ReportDetailPageProps {
  params: Promise<{ safetyreportid: string }>;
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { safetyreportid } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-10">
        <PageContainer>
          {/* Back link */}
          <Link
            href="/drugsearch"
            className="inline-flex items-center gap-1 text-sm text-brand-blue-700 hover:underline mb-6"
          >
            ← Back to Drug Search
          </Link>

          {/* Report header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Report Detail</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Safety Report ID:{" "}
              <span className="font-medium text-gray-700">{safetyreportid}</span>
            </p>
          </div>

          {/* Patient Info */}
          <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Patient Information
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {["Sex", "Age (years)", "NICHD group", "Serious", "Index Date"].map(
                (field) => (
                  <div key={field}>
                    <p className="text-xs text-neutral-600">{field}</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">—</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Seriousness Flags */}
          <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Seriousness Flags
            </h2>
            <div className="flex gap-3 flex-wrap text-xs">
              {["CA", "DE", "DS", "HL", "LT", "OT"].map((flag) => (
                <span
                  key={flag}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-600"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>

          {/* Drugs + Reactions */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[160px]">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Drugs</h2>
              <p className="text-sm text-neutral-600">[ drug list ]</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[160px]">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Adverse Reactions
              </h2>
              <p className="text-sm text-neutral-600">[ reaction list ]</p>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
