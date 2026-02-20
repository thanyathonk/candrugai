"use client";

/**
 * TeamSection — auto-sliding carousel, 3×3 grid per slide
 * - 23 members → 3 slides (9 + 9 + 5)
 * - Green progress bar shows time until next advance
 * - Pauses on hover; resumes on mouse leave
 * - Mouse/touch drag to navigate
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { researchTeam, type TeamMember } from "@/mock/home";

const INTERVAL_MS = 6000;

// Responsive items per slide: mobile=3 (1×3), tablet=6 (2×3), desktop=9 (3×3)
function usePerSlide() {
  const [perSlide, setPerSlide] = useState(9); // SSR-safe default
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640)       setPerSlide(3);
      else if (window.innerWidth < 1024) setPerSlide(6);
      else                               setPerSlide(9);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perSlide;
}

// ── Single member item ─────────────────────────────────────────────────────

function MemberItem({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-5 min-w-0 p-4 rounded-2xl hover:bg-brand-green-50 transition-colors">
      {/* Avatar + badge wrapper */}
      <div className="relative flex-shrink-0">
        {/* Large circle — 96×96 */}
        <div
          className={`
            h-24 w-24 rounded-full flex items-center justify-center
            text-2xl font-bold text-white shadow-md overflow-hidden
            ${member.photoSrc ? "" : member.avatarBg}
          `}
        >
          {member.photoSrc ? (
            <Image
              src={member.photoSrc}
              alt={member.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <span>{member.initials}</span>
          )}
        </div>

        {/* University badge — 32×32, top-right */}
        {member.universityLogoSrc && (
          <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full border-2 border-white bg-white shadow overflow-hidden flex items-center justify-center">
            <Image
              src={member.universityLogoSrc}
              alt={member.affiliation}
              width={28}
              height={28}
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Name + role */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {member.name}
        </p>
        <p className="text-xs text-neutral-500 leading-snug mt-1.5">
          {member.role}
        </p>
        <p className="text-[11px] text-brand-blue-700 mt-1 truncate">
          {member.affiliation}
        </p>
      </div>
    </div>
  );
}

// ── Progress bar (CSS animation, key-reset trick) ──────────────────────────

function ProgressBar({
  slideKey,
  paused,
  duration,
}: {
  slideKey: string;
  paused: boolean;
  duration: number;
}) {
  return (
    <div className="h-1 w-full bg-neutral-100 overflow-hidden">
      <div
        key={slideKey}
        className="h-full bg-brand-green-500 rounded-full"
        style={{
          animation: `carousel-progress ${duration}ms linear forwards`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export default function TeamSection() {
  const perSlide = usePerSlide();

  // Recompute slides whenever perSlide changes
  const slides: TeamMember[][] = [];
  for (let i = 0; i < researchTeam.length; i += perSlide) {
    slides.push(researchTeam.slice(i, i + perSlide));
  }

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState("0-0");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef<number | null>(null);

  // Reset to slide 0 when perSlide changes (e.g. rotate phone)
  useEffect(() => {
    setCurrent(0);
    setProgressKey(`0-${Date.now()}`);
  }, [perSlide]);

  // Navigate to a slide
  const goTo = useCallback(
    (idx: number, resetProgress = true) => {
      if (transitioning) return;
      const target = (idx + slides.length) % slides.length;
      if (target === current && !resetProgress) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(target);
        setTransitioning(false);
        if (resetProgress) setProgressKey(`${target}-${Date.now()}`);
      }, 280);
    },
    [current, transitioning, slides.length]
  );

  // Auto-advance
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) {
        const next = (current + 1) % slides.length;
        goTo(next);
      }
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, paused, goTo, slides.length]);

  // Reset progress bar when slide changes
  useEffect(() => {
    setProgressKey(`${current}-${Date.now()}`);
  }, [current]);

  // ── Drag / swipe handlers ────────────────────────────────────────────────

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return; // ignore tiny movements
    if (delta < 0) goTo(current + 1);
    else goTo(current - 1);
  };

  return (
    <section className="py-20 bg-brand-green-50">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700 mb-2">
            People
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Research Team
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-xl">
            Multidisciplinary researchers combining AI, pharmacology, data science,
            and clinical expertise across {researchTeam.length} members.
          </p>
        </div>

        {/* Carousel card */}
        <div
          className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Green progress bar — top of card */}
          {/* <ProgressBar
            slideKey={progressKey}
            paused={paused}
            duration={INTERVAL_MS}
          /> */}

          {/* Slide content — min-h matches 3 full rows per breakpoint */}
          <div
            className={`px-6 py-8 min-h-[464px] sm:min-h-[464px] transition-opacity duration-[280ms] ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 content-start">
              {slides[current].map((m) => (
                <MemberItem key={m.id} member={m} />
              ))}
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`
                rounded-full transition-all duration-300 focus:outline-none
                ${
                  idx === current
                    ? "w-7 h-2.5 bg-brand-green-700"
                    : "w-2.5 h-2.5 bg-neutral-300 hover:bg-brand-green-200"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
