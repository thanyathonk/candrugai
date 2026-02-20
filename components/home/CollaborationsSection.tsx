"use client";

/**
 * CollaborationsSection — infinite marquee of bare logo images (no card)
 * docs/component-library.md 5.2
 */

import Image from "next/image";
import { collaborators, type Collaborator } from "@/mock/home";

function LogoItem({ item }: { item: Collaborator }) {
  if (item.logoSrc) {
    return (
      <div className="flex-shrink-0 pr-16 flex items-center justify-center">
        <Image
          src={item.logoSrc}
          alt={item.name}
          width={160}
          height={56}
          className="object-contain h-14 w-auto transition-all duration-300 hover:scale-105"
          title={item.name}
        />
      </div>
    );
  }

  /* Text fallback when no image is provided yet */
  return (
    <div
      className="flex-shrink-0 pr-16 flex items-center justify-center"
      title={item.name}
    >
      <span className="text-2xl font-bold text-neutral-300 hover:text-brand-blue-700 transition-colors tracking-tight select-none">
        {item.shortName}
      </span>
    </div>
  );
}

export default function CollaborationsSection() {
  const track = [
    ...collaborators,
    ...collaborators,
    ...collaborators,
    ...collaborators,
  ];

  return (
    <section className="border-b border-neutral-200 py-12 bg-white overflow-hidden">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8 mb-10">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-600">
          Research Collaborations &amp; Partners
        </p>
      </div>

      <div
        className="marquee-wrapper relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track flex items-center">
          {track.map((item, idx) => (
            <LogoItem key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
