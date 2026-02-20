/**
 * HeroSection — bg_homepage.png background with gradient overlay
 * docs/component-library.md 5.1
 */

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[520px] flex items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/bg_homepage.webp"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — brand-blue → brand-green, semi-transparent */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-brand-blue-700/88 via-brand-blue-500/75 to-brand-green-700/85" /> */}

      {/* Subtle vignette at bottom */}
      {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-blue-700/40 to-transparent" /> */}

      {/* Decorative blobs */}
      {/* <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" /> */}
      {/* <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-2xl" /> */}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-8 py-24">
        <div className="max-w-2xl">
          {/* Pre-label */}
          {/* <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green-200 animate-pulse" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Pharmacovigilance Research · FAERS Dataset
            </span>
          </div> */}

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            CanDrug<span className="text-brand-green-200">AI</span>
          </h1>

          <p className="mt-4 text-xl font-medium text-white/80 leading-relaxed">
            Uncovering Adverse Drug Reaction Signals
          </p>
          <p className="mt-2 text-base text-white/65 max-w-xl leading-relaxed">
            An open-access platform for exploring ADR case reports from the FDA FAERS dataset
            across adult and pediatric populations — powered by signal detection and open data.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: "Reports",       value: "71,944" },
              { label: "ADR Terms",     value: "12,345" },
              { label: "Drugs",         value: "2,345"  },
              { label: "Year Coverage", value: "2012–2025" },
            ].map(({ label, value }) => (
              <div key={label} className="text-white">
                <p className="text-xl font-bold leading-none">{value}</p>
                <p className="text-xs text-white/60 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/adr-database"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3 text-sm font-semibold text-brand-blue-700 shadow-md hover:bg-brand-blue-50 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Explore Database
            </Link>
            <Link
              href="/drugsearch"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
              Drug Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
