import { Info } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DashboardPageHeaderProps = {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
};

type DashboardPanelProps = {
  children: ReactNode;
  className?: string;
};

type DashboardStatus = "DRAFT" | "PUBLISHED" | "READY" | "NEXT";

type DashboardEmptyStateProps = {
  action?: ReactNode;
  description: string;
  title: string;
};

export function DashboardPageHeader({
  actions,
  description,
  eyebrow = "Content workspace",
  title,
}: DashboardPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between border-b border-[var(--line)]">
      <div className="max-w-2xl">
        <p className="font-sans text-[10px] font-bold tracking-wider text-[var(--accent)] uppercase">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--foreground)]">
          {title}
        </h1>
        <p className="mt-1 text-xs text-[var(--ink-soft)] leading-relaxed">{description}</p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function DashboardPanel({ children, className }: DashboardPanelProps) {
  return (
    <div
      className={cn(
        "dashboard-card p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DashboardPreviewNotice() {
  return (
    <aside
      aria-label="Status preview dashboard"
      className="flex gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_20%,transparent)] bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] px-4 py-3.5 text-xs"
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
      <p className="leading-relaxed text-[var(--muted-foreground)]">
        <span className="font-bold text-[var(--foreground)]">Frontend preview.</span> Data di layar ini
        masih template lokal. Login, simpan, publish, dan hapus akan aktif penuh setelah backend dikonfigurasi.
      </p>
    </aside>
  );
}

export function DashboardStatusBadge({ status }: { status: DashboardStatus }) {
  const config = {
    DRAFT: {
      label: "Draft",
      className: "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--accent)] border-0",
    },
    NEXT: {
      label: "Berikutnya",
      className: "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-0",
    },
    PUBLISHED: {
      label: "Published",
      className: "bg-green-500/10 text-green-500 dark:text-green-400 border-0",
    },
    READY: {
      label: "Siap ditinjau",
      className: "bg-green-500/10 text-green-500 dark:text-green-400 border-0",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider border",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

export function DashboardEmptyState({ action, description, title }: DashboardEmptyStateProps) {
  return (
    <div className="rounded-[20px] border border-dashed border-[var(--line-strong)] bg-[var(--paper-card)] px-6 py-12 text-center shadow-[14px_17px_40px_4px_rgba(112,144,176,0.08)] dark:shadow-none">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--accent)]">
        <Info aria-hidden="true" className="size-5" />
      </div>
      <h2 className="mt-4 text-base font-bold text-[var(--foreground)]">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[var(--ink-soft)]">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function DashboardBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0" href={href}>
      {label}
    </Link>
  );
}
