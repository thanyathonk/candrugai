"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PageContainer from "./PageContainer";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "ADR Database", href: "/adr-database" },
  { label: "Drug Search", href: "/drugsearch" },
  { label: "Resources",  href: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <PageContainer>
          <nav className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_full.png"
                alt="CanDrugAI"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop menu */}
            <ul className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors hover:text-brand-blue-700 ${
                      pathname === href
                        ? "text-brand-blue-700"
                        : "text-gray-600"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="rounded-full bg-brand-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-500"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden flex flex-col items-center justify-center h-10 w-10 rounded-xl hover:bg-neutral-100 transition-colors focus:outline-none"
            >
              {/* 3 bars that animate to X */}
              <span
                className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 mt-[5px] ${
                  open ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 mt-[5px] ${
                  open ? "-translate-y-[11px] -rotate-45" : ""
                }`}
              />
            </button>
          </nav>
        </PageContainer>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Slide-down panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="mx-4 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
          {/* Nav links */}
          <ul className="py-2">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                      active
                        ? "text-brand-blue-700 bg-brand-blue-50"
                        : "text-gray-700 hover:bg-neutral-50 hover:text-brand-blue-700"
                    }`}
                  >
                    {/* Active indicator dot */}
                    <span
                      className={`h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors ${
                        active ? "bg-brand-blue-700" : "bg-neutral-300"
                      }`}
                    />
                    {label}
                    {active && (
                      <span className="ml-auto text-[10px] font-semibold text-brand-blue-500 uppercase tracking-wide">
                        Current
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="mx-5 h-px bg-neutral-100" />

          {/* CTA */}
          <div className="p-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-blue-700 py-3 text-sm font-semibold text-white hover:bg-brand-blue-500 transition-colors shadow-sm"
            >
              Contact Us
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
