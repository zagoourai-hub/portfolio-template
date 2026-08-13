export default function DashboardLoading() {
  return (
    <main aria-busy="true" className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10" id="main-content">
      <div className="animate-pulse">
        <div className="h-3 w-28 rounded bg-[var(--line)]" />
        <div className="mt-4 h-10 w-72 max-w-full rounded bg-[var(--paper-card)]" />
        <div className="mt-3 h-5 w-full max-w-xl rounded bg-[var(--paper-card)]" />
        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
          <div className="h-72 rounded-[14px] border border-[var(--line)] bg-[var(--paper-raised)]" />
          <div className="h-72 rounded-[14px] border border-[var(--line)] bg-[var(--paper-raised)]" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-[14px] border border-[var(--line)] bg-[var(--paper-raised)]" />
          <div className="h-40 rounded-[14px] border border-[var(--line)] bg-[var(--paper-raised)]" />
          <div className="h-40 rounded-[14px] border border-[var(--line)] bg-[var(--paper-raised)]" />
        </div>
      </div>
      <p className="sr-only">Memuat dashboard preview</p>
    </main>
  );
}
