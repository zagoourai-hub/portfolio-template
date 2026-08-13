import { ArrowRight, BookOpenCheck, FolderKanban, Layers3, Rocket, Wrench } from "lucide-react";
import Link from "next/link";

import {
  DashboardPageHeader,
  DashboardPanel,
  DashboardPreviewNotice,
  DashboardStatusBadge,
} from "@/components/dashboard/dashboard-ui";
import {
  dashboardPreviewActivity,
  dashboardPreviewProjects,
  dashboardPreviewSummary,
  dashboardPreviewTasks,
} from "@/data/dashboard-preview";

const overviewMetrics = [
  {
    caption: "siap tampil di portfolio publik",
    icon: Rocket,
    label: "Published projects",
    value: dashboardPreviewSummary.publishedProjects,
  },
  {
    caption: "masih perlu owner review",
    icon: FolderKanban,
    label: "Draft projects",
    value: dashboardPreviewSummary.draftProjects,
  },
  {
    caption: "dalam kelompok yang bisa diedit",
    icon: Wrench,
    label: "Skills",
    value: dashboardPreviewSummary.skills,
  },
] as const;

export default function DashboardPage() {
  const draftProject = dashboardPreviewProjects.find((project) => project.status === "DRAFT");
  const totalProjectCount = dashboardPreviewProjects.length;

  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      {/* Dynamic Subheading Section */}
      <DashboardPageHeader
        actions={
          <Link className="button-primary focus-ring text-xs" href="/dashboard/projects/new">
            Tambah project
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        }
        description="Pantau kesiapan konten portfolio, lalu buka bagian yang perlu kamu rapikan."
        title="Ruang kerja portfolio"
      />

      {/* Preview alert */}
      <DashboardPreviewNotice />

      {/* Mini Statistics Cards in Horizon UI Style */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {overviewMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className="dashboard-card flex items-center gap-4 p-5" key={metric.label}>
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--accent)]">
                <Icon aria-hidden="true" className="size-6" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[var(--ink-soft)] tracking-wider uppercase">{metric.label}</span>
                <p className="mt-0.5 text-2xl font-bold text-[var(--foreground)] tabular-nums tracking-tight">
                  {metric.value}
                </p>
                <p className="mt-0.5 text-[10px] text-[var(--ink-soft)] leading-normal truncate">{metric.caption}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Main Grid: Readiness & Next Review */}
      <section aria-labelledby="readiness-title" className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
        <DashboardPanel className="relative overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] p-6 sm:p-7 text-white border-0 flex flex-col justify-between min-h-[220px]">
          <div className="absolute right-0 top-0 size-36 bg-white/5 rounded-bl-full pointer-events-none" />
          <div>
            <span className="font-sans text-[10px] font-extrabold tracking-widest text-white/70 uppercase">CONTENT READINESS</span>
            <h2 className="mt-3 text-xl lg:text-2xl font-bold tracking-tight text-white" id="readiness-title">
              {totalProjectCount} project template sudah punya fondasi konten.
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/80">
              Fokus berikutnya adalah review project draft dan mengganti detail contoh dengan karya yang benar-benar kamu bangun.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-3xl font-extrabold tabular-nums tracking-tight text-white">
                {dashboardPreviewSummary.publishedProjects}/{totalProjectCount}
              </p>
              <p className="text-[10px] text-white/70 tracking-wide">template siap ditampilkan</p>
            </div>
            <Link className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#1b254b] hover:bg-white/90 transition-all shadow-sm" href="/dashboard/projects">
              Review projects
            </Link>
          </div>
        </DashboardPanel>

        <DashboardPanel className="flex flex-col justify-between min-h-[220px] p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold tracking-wider text-[var(--accent)] uppercase">NEXT REVIEW</span>
                <h3 className="mt-2 text-base font-bold text-[var(--foreground)] tracking-tight">
                  {draftProject?.title ?? "Belum ada project draft"}
                </h3>
              </div>
              {draftProject ? <DashboardStatusBadge status={draftProject.status} /> : null}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
              {draftProject?.summary ?? "Mulai dari sebuah project kecil yang ingin kamu dokumentasikan."}
            </p>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-3.5">
            {draftProject ? (
              <Link className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline" href={`/dashboard/projects/${draftProject.slug}`}>
                Buka editor preview
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            ) : null}
          </div>
        </DashboardPanel>
      </section>

      {/* Grid: Tasks & Prepared Data */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)]">
        <section aria-labelledby="next-actions-title">
          <div className="flex items-center gap-2">
            <BookOpenCheck aria-hidden="true" className="size-4.5 text-[var(--accent)]" />
            <h2 className="text-base font-bold tracking-tight text-[var(--foreground)]" id="next-actions-title">
              Langkah editing berikutnya
            </h2>
          </div>
          <div className="mt-4 overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--paper-card)] shadow-[14px_17px_40px_4px_rgba(112,144,176,0.08)] dark:shadow-none divide-y divide-[var(--line)]">
            {dashboardPreviewTasks.map((task) => (
              <Link
                className="focus-ring group flex items-start justify-between gap-4 px-6 py-4 transition-colors hover:bg-[var(--secondary)]"
                href={task.href}
                key={task.label}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-[var(--foreground)] tracking-tight">{task.label}</h3>
                    <DashboardStatusBadge status={task.state} />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">{task.detail}</p>
                </div>
                <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--ink-soft)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="activity-title">
          <div className="flex items-center gap-2">
            <Layers3 aria-hidden="true" className="size-4.5 text-[var(--accent)]" />
            <h2 className="text-base font-bold tracking-tight text-[var(--foreground)]" id="activity-title">
              Data yang disiapkan
            </h2>
          </div>
          <DashboardPanel className="mt-4 p-6">
            <ul className="space-y-6">
              {dashboardPreviewActivity.map((item, idx) => (
                <li className="relative pl-6 pb-2" key={item.label}>
                  {idx < dashboardPreviewActivity.length - 1 ? (
                    <span className="absolute left-1.5 top-3 h-full w-px bg-[var(--line)]" />
                  ) : null}
                  <span className="absolute left-0 top-1.5 size-3 rounded-full border-2 border-[var(--accent)] bg-[var(--paper-card)]" />
                  <p className="text-xs font-bold text-[var(--foreground)] leading-snug">{item.label}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{item.detail}</p>
                </li>
              ))}
            </ul>
          </DashboardPanel>
        </section>
      </div>
    </main>
  );
}
