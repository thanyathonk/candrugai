/**
 * ResearchDiagramSection — pipeline infographic
 * docs/ui-pages.md section 2.4 (Research Diagram)
 * Built with CSS — no external image needed
 */

import { pipelineSteps } from "@/mock/home";

const STEP_STYLES = [
  { dot: "bg-brand-blue-700",  ring: "ring-brand-blue-200",  text: "text-brand-blue-700"  },
  { dot: "bg-brand-blue-500",  ring: "ring-brand-blue-200",  text: "text-brand-blue-500"  },
  { dot: "bg-brand-blue-500",  ring: "ring-brand-blue-200",  text: "text-brand-blue-500"  },
  { dot: "bg-brand-green-700", ring: "ring-brand-green-200", text: "text-brand-green-700" },
  { dot: "bg-brand-green-700", ring: "ring-brand-green-200", text: "text-brand-green-700" },
  { dot: "bg-brand-green-500", ring: "ring-brand-green-200", text: "text-brand-green-500" },
];

export default function ResearchDiagramSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue-700 mb-2">
            Methodology
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Research Pipeline
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-xl leading-relaxed">
            From raw FDA FAERS data to an open pharmacovigilance platform — our end-to-end
            data science pipeline.
          </p>
        </div>

        {/* Pipeline card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm overflow-x-auto">
          {/* Steps row */}
          <div className="flex items-start gap-0 min-w-[560px]">
            {pipelineSteps.map((step, idx) => {
              const style = STEP_STYLES[idx] ?? STEP_STYLES[0];
              const isLast = idx === pipelineSteps.length - 1;

              return (
                <div key={step.id} className="flex items-start flex-1">
                  {/* Step block */}
                  <div className="flex flex-col items-center flex-1">
                    {/* Circle icon */}
                    <div
                      className={`
                        flex h-14 w-14 items-center justify-center rounded-full
                        text-2xl ring-4 ring-offset-2 ${style.dot} ${style.ring}
                        shadow-sm
                      `}
                    >
                      <span>{step.icon}</span>
                    </div>

                    {/* Step number */}
                    <span className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${style.text}`}>
                      Step {idx + 1}
                    </span>

                    {/* Label */}
                    <p className="mt-1 text-xs font-semibold text-gray-800 text-center whitespace-pre-line leading-snug">
                      {step.label}
                    </p>
                  </div>

                  {/* Connector arrow */}
                  {!isLast && (
                    <div className="flex items-center self-start mt-6 px-1 text-neutral-300">
                      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Gradient progress bar */}
          <div className="mt-8 h-1.5 w-full rounded-full bg-linear-to-r from-brand-blue-700 to-brand-green-500" />

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-4 justify-center">
            {[
              { label: "Data Acquisition & Preprocessing", color: "bg-brand-blue-700" },
              { label: "Analysis & Signal Detection",      color: "bg-brand-green-700" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-neutral-600">
                <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom summary cards */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "MedDRA Hierarchy",    value: "SOC → PT",    sub: "4-level classification" },
            { label: "Signal Detection",     value: "PRR & ROR",   sub: "Quantitative methods" },
            { label: "NICHD Groups",         value: "7 groups",    sub: "Pediatric age bands" },
            { label: "Data Coverage",        value: "2012–2025",   sub: "13 years of FAERS" },
          ].map(({ label, value, sub }) => (
            <div
              key={label}
              className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm text-center"
            >
              <p className="text-xs text-neutral-600 mb-1">{label}</p>
              <p className="text-base font-bold text-gray-900">{value}</p>
              <p className="text-[10px] text-neutral-600 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
