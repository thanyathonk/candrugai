import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";

const golosText = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-golos-text",
  display: "swap",
  preload: false,   // ไม่ block render ระหว่างรอ download font
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "CanDrugAI",
  description: "Adverse Drug Reaction Database powered by FAERS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${golosText.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
