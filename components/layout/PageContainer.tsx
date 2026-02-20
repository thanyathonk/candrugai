import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable page container — max-width 1280px, centered, responsive padding
 * ใช้ wrap content ทุกหน้า (ไม่รวม Navbar/Footer ที่ full-width)
 */
export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
