
import type { ReactNode } from "react";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <div className="min-w-0 flex-1">
        {children}
      </div>

      <SiteFooter />
    </div>
  );
}
