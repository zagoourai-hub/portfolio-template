"use client";

import { RefreshCw } from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/dashboard-ui";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60dvh] w-full max-w-[1440px] items-center px-4 py-7 sm:px-6 lg:px-8" id="main-content">
      <DashboardEmptyState
        action={
          <button className="button-primary focus-ring" onClick={reset} type="button">
            Coba lagi
            <RefreshCw aria-hidden="true" className="size-4" />
          </button>
        }
        description="Preview dashboard tidak bisa ditampilkan sekarang. Coba muat ulang halaman tanpa membagikan detail error internal."
        title="Dashboard belum berhasil dimuat"
      />
    </main>
  );
}
