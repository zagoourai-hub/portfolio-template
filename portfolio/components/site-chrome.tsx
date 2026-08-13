"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isWorkspaceRoute = pathname === "/login" || pathname.startsWith("/dashboard");

  return (
    <>
      {!isWorkspaceRoute ? (
        <>
          <ScrollProgressBar />
          <SiteHeader />
        </>
      ) : null}
      {children}
      {!isWorkspaceRoute ? <SiteFooter /> : null}
    </>
  );
}
