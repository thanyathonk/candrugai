/**
 * Next.js App Router loading.tsx
 * แสดงอัตโนมัติขณะ page.tsx กำลัง fetch data (Suspense boundary)
 * Style: skeleton shimmer ตาม docs/component-library.md section 4.15
 */

export default function AdrDatabaseLoading() {
  return (
    <div className="min-h-screen bg-white py-10">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8 animate-pulse">

        {/* Page title skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-8 w-80 rounded-lg bg-neutral-200" />
          <div className="h-4 w-56 rounded-lg bg-neutral-200" />
        </div>

        {/* Toggle skeleton */}
        <div className="mb-8 h-14 rounded-2xl bg-neutral-200" />

        {/* KPI cards skeleton — 6 cards */}
        <div className="mb-8 grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-neutral-200 h-24" />
          ))}
        </div>

        {/* Total banner skeleton */}
        <div className="mb-8 h-20 rounded-[18px] bg-neutral-200" />

        {/* Demographic + Age distribution skeleton */}
        <div className="mb-8 grid grid-cols-3 gap-6">
          <div className="col-span-1 rounded-2xl bg-neutral-200 min-h-[200px]" />
          <div className="col-span-2 rounded-2xl bg-neutral-200 min-h-[200px]" />
        </div>

        {/* Statistics skeleton — 3 cards */}
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-neutral-200 min-h-[140px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
