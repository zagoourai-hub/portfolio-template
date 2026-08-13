import { learningTracks, projects, siteConfig, techCategories } from "@/data/portfolio";

export type DashboardProjectStatus = "DRAFT" | "PUBLISHED";

export type DashboardPreviewProject = (typeof projects)[number] & {
  status: DashboardProjectStatus;
  updatedLabel: string;
};

const projectStatusBySlug: Record<(typeof projects)[number]["slug"], DashboardProjectStatus> = {
  "jadwal-belajar": "PUBLISHED",
  "papan-kelas": "DRAFT",
  "catatan-koding": "PUBLISHED",
};

const previewUpdates = ["Disiapkan untuk ditinjau", "Masih dalam draft", "Konten template aktif"];

export const dashboardPreviewProjects: readonly DashboardPreviewProject[] = projects.map((project, index) => ({
  ...project,
  status: projectStatusBySlug[project.slug],
  updatedLabel: previewUpdates[index] ?? "Konten template",
}));

export const dashboardPreviewSummary = {
  draftProjects: dashboardPreviewProjects.filter((project) => project.status === "DRAFT").length,
  learningTracks: learningTracks.length,
  publishedProjects: dashboardPreviewProjects.filter((project) => project.status === "PUBLISHED").length,
  skills: techCategories.reduce((total, category) => total + category.items.length, 0),
};

export const dashboardPreviewTasks = [
  {
    detail: "Cek nama, bio, dan link sebelum portfolio dipakai untuk melamar.",
    href: "/dashboard/profile",
    label: "Lengkapi profil owner",
    state: "NEXT",
  },
  {
    detail: "Review Papan Kelas Hub sebelum statusnya dipublish.",
    href: "/dashboard/projects/papan-kelas",
    label: "Tinjau project draft",
    state: "DRAFT",
  },
  {
    detail: "Pastikan stack yang ditampilkan masih sesuai proses belajarmu.",
    href: "/dashboard/skills",
    label: "Rapikan tech stack",
    state: "READY",
  },
] as const;

export const dashboardPreviewActivity = [
  {
    detail: "3 project contoh tersedia sebagai materi portfolio.",
    label: "Project template dimuat",
  },
  {
    detail: `${dashboardPreviewSummary.skills} skill berada dalam ${techCategories.length} kelompok.`,
    label: "Tech stack dipetakan",
  },
  {
    detail: `${learningTracks.length} tahap belajar siap ditampilkan di halaman publik.`,
    label: "Learning track disusun",
  },
] as const;

export const dashboardPreviewOwner = {
  handle: siteConfig.handle,
  name: siteConfig.name,
  role: siteConfig.role,
};
