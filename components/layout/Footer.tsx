import Link from "next/link";
import Image from "next/image";
import PageContainer from "./PageContainer";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "ADR Database", href: "/adr-database" },
  { label: "Drug Search", href: "/drugsearch" },
  { label: "Resources", href: "/resources" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-10 mt-16">
      <PageContainer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/logo_full.png"
                alt="CanDrugAI"
                width={130}
                height={38}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-2 text-xs text-neutral-600 max-w-xs leading-relaxed">
              Adverse Drug Reaction database
              for research use only — not a diagnostic tool.
            </p>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap gap-4">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-neutral-600 hover:text-brand-blue-700 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-600">
          © {new Date().getFullYear()} CanDrugAI. All rights reserved.
        </div>
      </PageContainer>
    </footer>
  );
}
