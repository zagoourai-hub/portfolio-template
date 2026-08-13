"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type ProjectData = {
  id?: string;
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
};

type DashboardProjectFormProps = {
  mode: "create" | "edit";
  initialProject?: ProjectData;
  projectId?: string;
};

const fieldClassName =
  "focus-ring mt-2 min-h-11 w-full rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]";

export function DashboardProjectForm({ mode, initialProject, projectId }: DashboardProjectFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState<ProjectData>({
    title: initialProject?.title || "",
    category: initialProject?.category || "School",
    status: initialProject?.status || "DRAFT",
    summary: initialProject?.summary || "",
    content: initialProject?.content || "",
    tags: initialProject?.tags || "",
    repoUrl: initialProject?.repoUrl || "",
    demoUrl: initialProject?.demoUrl || "",
    imageUrl: initialProject?.imageUrl || "",
    featured: initialProject?.featured || false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProject) {
      const t = setTimeout(() => {
        setFormData({
          title: initialProject.title || "",
          category: initialProject.category || "School",
          status: initialProject.status || "DRAFT",
          summary: initialProject.summary || "",
          content: initialProject.content || "",
          tags: initialProject.tags || "",
          repoUrl: initialProject.repoUrl || "",
          demoUrl: initialProject.demoUrl || "",
          imageUrl: initialProject.imageUrl || "",
          featured: initialProject.featured || false,
        });
      }, 0);
      return () => clearTimeout(t);
    }
  }, [initialProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal menyimpan project.");
        setSaving(false);
        return;
      }

      router.push("/dashboard/projects");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
      setSaving(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <fieldset className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-title">
            Judul project
          </label>
          <input
            className={fieldClassName}
            id="project-title"
            name="title"
            onChange={handleChange}
            placeholder="Contoh: Aplikasi jadwal tugas kelas"
            required
            value={formData.title}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-category">
            Jenis project
          </label>
          <select
            className={fieldClassName}
            id="project-category"
            name="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="School">School</option>
            <option value="Lab">Lab</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-status">
            Status publikasi
          </label>
          <select
            className={fieldClassName}
            id="project-status"
            name="status"
            onChange={handleChange}
            value={formData.status}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-summary">
            Ringkasan
          </label>
          <textarea
            className={`${fieldClassName} min-h-24 resize-y py-3 leading-6`}
            id="project-summary"
            name="summary"
            onChange={handleChange}
            placeholder="Jelaskan masalah singkat yang diselesaikan."
            required
            value={formData.summary}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-content">
            Konten / Cerita Lengkap
          </label>
          <textarea
            className={`${fieldClassName} min-h-36 resize-y py-3 leading-6`}
            id="project-content"
            name="content"
            onChange={handleChange}
            placeholder="Jelaskan pendekatan, tantangan, dan hasil akhir."
            required
            value={formData.content}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-tags">
            Tech stack (Tags)
          </label>
          <input
            className={fieldClassName}
            id="project-tags"
            name="tags"
            onChange={handleChange}
            placeholder="Next.js 16, React 19, Tailwind CSS"
            value={formData.tags}
          />
          <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">Pisahkan tiap teknologi dengan koma.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-repo-url">
            URL GitHub
          </label>
          <input
            className={fieldClassName}
            id="project-repo-url"
            name="repoUrl"
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            type="url"
            value={formData.repoUrl || ""}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="project-demo-url">
            URL Demo
          </label>
          <input
            className={fieldClassName}
            id="project-demo-url"
            name="demoUrl"
            onChange={handleChange}
            placeholder="https://demo.example.com"
            type="url"
            value={formData.demoUrl || ""}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-[var(--muted-foreground)]">
          Data akan disimpan ke database SQLite (`dev.db`).
        </p>
        <button className="button-primary flex shrink-0 items-center justify-center gap-2" disabled={saving} type="submit">
          {saving && <Loader2 className="size-4 animate-spin" />}
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Project Baru"}
        </button>
      </div>
    </form>
  );
}
