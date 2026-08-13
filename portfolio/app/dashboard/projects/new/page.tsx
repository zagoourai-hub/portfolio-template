import { DashboardProjectForm } from "@/components/dashboard/dashboard-project-form";
import { DashboardBackLink, DashboardPageHeader, DashboardPanel } from "@/components/dashboard/dashboard-ui";

export default function DashboardNewProjectPage() {
  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      <DashboardPageHeader
        actions={<DashboardBackLink href="/dashboard/projects" label="Kembali ke projects" />}
        description="Isi detail karya yang ingin kamu tampilkan pada portfolio publik."
        title="Tambah project"
      />

      <section aria-labelledby="new-project-form-title" className="mt-8">
        <h2 className="sr-only" id="new-project-form-title">
          Form project baru
        </h2>
        <DashboardPanel className="p-5 sm:p-6">
          <DashboardProjectForm mode="create" />
        </DashboardPanel>
      </section>
    </main>
  );
}
