"use client";

import { useEffect, useState } from "react";
import { Eye, Loader2, CheckCircle2 } from "lucide-react";
import { DashboardPageHeader, DashboardPanel } from "@/components/dashboard/dashboard-ui";

const fieldClassName =
  "focus-ring mt-2 min-h-11 w-full rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]";

export default function DashboardProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    avatarUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        if (res.ok && data.profile) {
          setFormData({
            name: data.profile.name || "",
            title: data.profile.title || "",
            bio: data.profile.bio || "",
            email: data.profile.email || "",
            githubUrl: data.profile.githubUrl || "",
            linkedinUrl: data.profile.linkedinUrl || "",
            avatarUrl: data.profile.avatarUrl || "",
          });
        }
      } catch {
        setError("Gagal memuat profil.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal memperbarui profil.");
        setSaving(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center px-4" id="main-content">
        <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted-foreground)]">
          <Loader2 className="size-5 animate-spin text-[var(--accent)]" />
          Memuat data profil...
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      <DashboardPageHeader
        description="Atur identitas dan detail kontak yang tersimpan di database untuk portfolio publik."
        title="Profile dan kontak"
      />

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)]">
        <section aria-labelledby="profile-form-title">
          <h2 className="sr-only" id="profile-form-title">
            Form profile owner
          </h2>
          <DashboardPanel className="p-5 sm:p-6">
            {error && (
              <div className="mb-6 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                <CheckCircle2 className="size-4" />
                Profil berhasil disimpan ke database!
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <fieldset className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="profile-name">
                    Nama tampilan
                  </label>
                  <input
                    className={fieldClassName}
                    id="profile-name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={formData.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="profile-title">
                    Title / Peran
                  </label>
                  <input
                    className={fieldClassName}
                    id="profile-title"
                    name="title"
                    onChange={handleChange}
                    required
                    value={formData.title}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="profile-email">
                    Email kontak
                  </label>
                  <input
                    className={fieldClassName}
                    id="profile-email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={formData.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="profile-github">
                    URL GitHub
                  </label>
                  <input
                    className={fieldClassName}
                    id="profile-github"
                    name="githubUrl"
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    value={formData.githubUrl}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="profile-linkedin">
                    URL LinkedIn
                  </label>
                  <input
                    className={fieldClassName}
                    id="profile-linkedin"
                    name="linkedinUrl"
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedinUrl}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="profile-bio">
                    Bio singkat
                  </label>
                  <textarea
                    className={`${fieldClassName} min-h-32 resize-y py-3 leading-6`}
                    id="profile-bio"
                    name="bio"
                    onChange={handleChange}
                    value={formData.bio}
                  />
                </div>
              </fieldset>
              <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-[var(--muted-foreground)]">Data tersimpan di SQLite `dev.db` via API `/api/admin/profile`.</p>
                <button className="button-primary flex shrink-0 items-center justify-center gap-2" disabled={saving} type="submit">
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {saving ? "Menyimpan..." : "Simpan Profil"}
                </button>
              </div>
            </form>
          </DashboardPanel>
        </section>

        <aside aria-labelledby="public-snapshot-title">
          <DashboardPanel className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[var(--cyan-accent)]">
              <Eye aria-hidden="true" className="size-4" />
              <p className="font-mono text-xs">LIVE DATABASE SNAPSHOT</p>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]" id="public-snapshot-title">
              {formData.name || "Nama Owner"}
            </h2>
            <p className="mt-1 font-mono text-sm text-[var(--accent)]">{formData.title || "Title Owner"}</p>
            <p className="mt-5 text-sm leading-6 text-[var(--muted-foreground)]">{formData.bio || "Belum ada bio."}</p>
            <dl className="mt-6 space-y-4 border-t border-[var(--line)] pt-5 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[var(--muted-foreground)]">Email</dt>
                <dd className="text-right text-[var(--foreground)]">{formData.email || "-"}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[var(--muted-foreground)]">GitHub</dt>
                <dd className="truncate text-right text-[var(--foreground)]">{formData.githubUrl || "-"}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[var(--muted-foreground)]">LinkedIn</dt>
                <dd className="truncate text-right text-[var(--foreground)]">{formData.linkedinUrl || "-"}</dd>
              </div>
            </dl>
          </DashboardPanel>
        </aside>
      </div>
    </main>
  );
}
