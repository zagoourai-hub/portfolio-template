"use client";

import { useEffect, useState, use } from "react";
import { DashboardProjectForm } from "@/components/dashboard/dashboard-project-form";
import {
  DashboardBackLink,
  DashboardPageHeader,
  DashboardPanel,
  DashboardStatusBadge,
} from "@/components/dashboard/dashboard-ui";
import { Loader2 } from "lucide-react";

type DashboardProjectEditorPageProps = {
  params: Promise<{ id: string }>;
};

export default function DashboardProjectEditorPage({ params }: DashboardProjectEditorPageProps) {
  const { id } = use(params);

  const [project, setProject] = useState<{
    id: string;
    title: string;
    category: string;
    status: "DRAFT" | "PUBLISHED";
    summary: string;
    content: string;
    tags: string;
    repoUrl?: string;
    demoUrl?: string;
    imageUrl?: string;
    featured?: boolean;
    updatedAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        const data = await res.json();
        if (res.ok && data.project) {
          setProject(data.project);
        } else {
          setError(data.error || "Project tidak ditemukan.");
        }
      } catch {
        setError("Gagal memuat detail project.");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center px-4" id="main-content">
        <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted-foreground)]">
          <Loader2 className="size-5 animate-spin text-[var(--accent)]" />
          Memuat detail project...
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
        <DashboardBackLink href="/dashboard/projects" label="Kembali ke projects" />
        <div className="mt-6 rounded-[20px] border border-red-500/30 bg-red-500/10 p-4 text-red-500">
          {error || "Project tidak ditemukan."}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      <DashboardPageHeader
        actions={<DashboardBackLink href="/dashboard/projects" label="Kembali ke projects" />}
        description="Edit detail konten project yang tersimpan di database."
        title={project.title}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <DashboardStatusBadge status={project.status} />
        <p className="font-mono text-xs text-[var(--muted-foreground)]">
          Diperbarui {new Date(project.updatedAt).toLocaleDateString("id-ID")}
        </p>
      </div>

      <section aria-labelledby="project-editor-title" className="mt-8">
        <h2 className="sr-only" id="project-editor-title">
          Editor project {project.title}
        </h2>
        <DashboardPanel className="p-5 sm:p-6">
          <DashboardProjectForm initialProject={project} mode="edit" projectId={project.id} />
        </DashboardPanel>
      </section>
    </main>
  );
}
