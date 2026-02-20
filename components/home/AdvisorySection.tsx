/**
 * AdvisorySection — same design language as TeamSection (outer card + item hover)
 * Static grid, no slider (fewer members)
 */

import Image from "next/image";
import { advisoryTeam, type Advisor } from "@/mock/home";

function AdvisorItem({ advisor }: { advisor: Advisor }) {
  return (
    <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-brand-blue-50 transition-colors">
      {/* Avatar + badge */}
      <div className="relative flex-shrink-0">
        {/* Circle — 96×96 */}
        <div
          className={`
            h-24 w-24 rounded-full flex items-center justify-center
            text-2xl font-bold text-white shadow-md overflow-hidden
            ${advisor.photoSrc ? "" : advisor.avatarBg}
          `}
        >
          {advisor.photoSrc ? (
            <Image
              src={advisor.photoSrc}
              alt={advisor.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <span>{advisor.initials}</span>
          )}
        </div>

        {/* University badge — 32×32, top-right */}
        {advisor.universityLogoSrc && (
          <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full border-2 border-white bg-white shadow overflow-hidden flex items-center justify-center">
            <Image
              src={advisor.universityLogoSrc}
              alt={advisor.institution}
              width={28}
              height={28}
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {advisor.name}
        </p>
        <p className="text-xs text-neutral-500 leading-snug mt-1.5">
          {advisor.title}
        </p>
        <p className="text-[11px] text-brand-blue-700 mt-1 truncate">
          {advisor.institution}
        </p>
      </div>
    </div>
  );
}

export default function AdvisorySection() {
  return (
    <section className="py-20 bg-brand-blue-50">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue-700 mb-2">
            Advisory
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Our Advisory
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-xl">
            International experts guiding our research direction in pharmacovigilance
            and drug safety.
          </p>
        </div>

        {/* Outer card — mirrors TeamSection carousel card style */}
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          {/* Top accent bar */}
          {/* <div className="h-1 w-full bg-brand-blue-700" /> */}

          <div className="px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 content-start">
              {advisoryTeam.map((advisor) => (
                <AdvisorItem key={advisor.id} advisor={advisor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
