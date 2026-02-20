/**
 * Home Page — Server Component
 * Research website for CanDrugAI project
 * Layout: docs/ui-pages.md section 2
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CollaborationsSection from "@/components/home/CollaborationsSection";
import AimsSection from "@/components/home/AimsSection";
import TeamSection from "@/components/home/TeamSection";
import AdvisorySection from "@/components/home/AdvisorySection";

export const metadata = {
  title: "CanDrugAI — Adverse Drug Reaction Research Platform",
  description:
    "Open-access ADR database powered by FDA FAERS data for adult and pediatric pharmacovigilance research.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1) Hero banner */}
        <HeroSection />

        {/* 2) Research collaborations */}
        <CollaborationsSection />

        {/* 3) Aims / Mission */}
        <AimsSection />

        {/* 4) Research team */}
        <TeamSection />

        {/* 6) Advisory board */}
        <AdvisorySection />
      </main>

      <Footer />
    </>
  );
}
