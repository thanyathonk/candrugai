/**
 * AimsSection — 2-column layout: aims text (left) + aim.png (right)
 */

import Image from "next/image";

const AIMS = [
  {
    id: 1,
    text: "To develop an end-to-end AI platform for screening anticancer compounds that can predict drug targets, active compound properties, mechanisms of action, and drug toxicity or side effects.",
  },
  {
    id: 2,
    text: "To discover/design chemical structures and predict the properties/functions of drugs or small molecules, including anticancer derivatives, using ML/DL combined with structural bioinformatics techniques.",
  },
  {
    id: 3,
    text: "To synthesize/confirm chemical structures and test the efficacy of derivatives against various types of cancer.",
  },
];

export default function AimsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

          {/* ── Left column: Aims ──────────────────────────────────────────── */}
          <div>
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue-700 mb-3">
              Research Aims
            </p>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
              Aims
            </h2>

            {/* Numbered aim list */}
            <ol className="space-y-8">
              {AIMS.map((aim) => (
                <li key={aim.id} className="flex gap-5 items-center justify-center">
                  {/* Number circle */}
                  <div className="flex-shrink-0 flex h-10 w-10 items-center  justify-center rounded-full bg-brand-blue-700 text-white text-sm font-bold leading-none shadow-sm">
                    {String(aim.id).padStart(2, "0")}
                  </div>

                  {/* Text */}
                  <p className="text-base text-gray-700 leading-relaxed pt-1.5">
                    {aim.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Right column: image ────────────────────────────────────────── */}
          <div className="relative w-full flex items-center justify-center">
            <Image
              src="/aim.webp"
              alt="Research Aims Diagram"
              width={640}
              height={520}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
