export type PortfolioProject = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  year: string;
  skills: readonly string[];
  challenge: string;
  approach: string;
  outcome: string;
  image?: string;
  imageAlt?: string;
  visual: "paper" | "grid" | "rail";
  category: "School" | "Lab" | "Personal";
  githubUrl?: string;
  demoUrl?: string;
  snippet?: string;
};

export const siteConfig = {
  name: "Risz Developer",
  handle: "@riszdeveloper",
  role: "GenZ Student & Fullstack Dev",
  status: "ONLINE // Open for Collab",
  email: "risz@example.com",
  github: "https://github.com/example/risz",
  discord: "risz_dev#0001",
  location: "Jawa Barat, Indonesia",
  bio: "Pelajar SMA / SMK yang suka ngulik Web Engineering, Next.js, dan bikin tool bermanfaat buat temen sekolah & komunitas.",
  description:
    "Portfolio developer anti-ai-slop untuk pelajar & programmer GenZ. Tempat nampilin project sekolah, eksperimen koding, dan journey belajar fullstack web.",
  navigation: [
    { href: "/projects", label: "Projects" },
    { href: "/#skills", label: "Tech Stack" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/music", label: "Music" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const projects = [
  {
    slug: "jadwal-belajar",
    label: "Project Sekolah",
    title: "Jadwal Belajar Pro",
    summary:
      "Aplikasi web responsif buat atur jadwal pelajaran, counter deadline tugas, dan track jam belajar harian tanpa distrasi.",
    year: "Kelas 11 // 2026",
    category: "School",
    skills: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    challenge:
      "Bikin daftar mata pelajaran & deadline tugas tetep gampang dibaca pas pelajaran makin banyak tanpa bikin lemot di HP terjangkau.",
    approach:
      "Pake Vanilla JS & CSS grid layout. Data disimpan di LocalStorage biar tetep keseed pas browser ditutup tanpa butuh server.",
    outcome:
      "Dipakai temen sekelas buat ngatur tugas mingguan. Dapet insight penting tentang manajemen state browser native.",
    image: "/image.png",
    imageAlt: "Preview aplikasi Jadwal Belajar Pro",
    visual: "paper",
    githubUrl: "https://github.com/example/jadwal-belajar",
    demoUrl: "https://jadwal-belajar.example.com",
    snippet: `// LocalStorage auto-save state
const saveTasks = (tasks) => {
  localStorage.setItem('student_tasks', JSON.stringify(tasks));
  renderTaskList(tasks);
};`,
  },
  {
    slug: "papan-kelas",
    label: "Latihan React & Next.js",
    title: "Papan Kelas Hub",
    summary:
      "Dashboard pengumuman interaktif kelas dengan widget piket harian, countdown ujian, dan card catatan bersama.",
    year: "Latihan Mandiri // 2026",
    category: "Lab",
    skills: ["React 19", "Next.js 16", "Tailwind CSS v4", "TypeScript"],
    challenge:
      "Memecah UI kompleks jadi komponen React modular tanpa re-render berlebihan saat widget diperbarui.",
    approach:
      "Menggunakan Next.js App Router dengan Server Components untuk data statis & Zustand untuk UI state interaktif.",
    outcome:
      "Belajar struktur komponen Next.js yang bersih, type-safety TypeScript, dan utility Tailwind CSS v4.",
    image: "/images/studio-hero.png",
    imageAlt: "Preview dashboard Papan Kelas Hub",
    visual: "grid",
    githubUrl: "https://github.com/example/papan-kelas",
    demoUrl: "https://papan-kelas.example.com",
    snippet: `// Server Action sample for announcements
export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  await db.announcement.create({ data: { title } });
  revalidatePath("/");
}`,
  },
  {
    slug: "catatan-koding",
    label: "Project Pribadi",
    title: "Catatan Koding DevLog",
    summary:
      "Platform catatan teknis markdown personal tempat nyimpen error log, snippet berguna, dan cheatsheet koding.",
    year: "Project Akhir Pekan // 2026",
    category: "Personal",
    skills: ["Next.js 16", "Prisma", "SQLite", "Tailwind v4"],
    challenge:
      "Mendokumentasikan error & solusi koding secara konsisten dengan fitur pencarian cepat berdasar tag/bahasa.",
    approach:
      "Bikin SQLite DB lewat Prisma ORM, render Markdown dengan syntax highlighter, dan filter pencarian real-time.",
    outcome:
      "Log error koding jadi lebih terstruktur, hemat waktu saat ketemu bug serupa di kemudian hari.",
    image: "/images/studio-contact.png",
    imageAlt: "Preview platform Catatan Koding",
    visual: "rail",
    githubUrl: "https://github.com/example/catatan-koding",
    demoUrl: "https://catatan-koding.example.com",
    snippet: `// Search query filter
export async function searchNotes(query: string) {
  return prisma.note.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { tags: { has: query } }
      ]
    }
  });
}`,
  },
] as const satisfies readonly PortfolioProject[];

export const techCategories = [
  {
    name: "Languages & Core",
    items: [
      { name: "TypeScript", level: "Primary", desc: "Type-safe app logic" },
      { name: "JavaScript (ES6+)", level: "Core", desc: "DOM & Async API" },
      { name: "HTML5 & Semantic DOM", level: "Core", desc: "Accessible structure" },
      { name: "CSS3 & Modern Layouts", level: "Core", desc: "Flex, Grid, Container queries" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    items: [
      { name: "Next.js 16 (App Router)", level: "Daily", desc: "Fullstack SSG/SSR web" },
      { name: "React 19", level: "Daily", desc: "Component architecture" },
      { name: "Tailwind CSS v4", level: "Daily", desc: "Utility-first styling" },
      { name: "Zustand & TanStack Query", level: "Daily", desc: "Client & Server state" },
    ],
  },
  {
    name: "Tools & Ecosystem",
    items: [
      { name: "Git & GitHub", level: "Daily", desc: "Version control & CI/CD" },
      { name: "Prisma v7", level: "Learning", desc: "ORM & SQLite/Postgres DB" },
      { name: "VS Code & Neovim", level: "Primary", desc: "Developer environment" },
      { name: "Node.js & Bun", level: "Primary", desc: "Runtime & Package manager" },
    ],
  },
] as const;

export const timelineItems = [
  {
    id: "1",
    date: "2026 - Present",
    title: "Next.js 16 & Fullstack Web Architecture",
    subtitle: "Tingkat Lanjut // Open Source & Independent Labs",
    description: "Membangun aplikasi web fullstack menggunakan Next.js App Router, Route Handlers, TypeScript type safety, Prisma ORM, dan styling Tailwind CSS v4.",
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Prisma"],
    current: true,
  },
  {
    id: "2",
    date: "2025",
    title: "React Component & State Management",
    subtitle: "Latihan Mandiri & Project Sekolah",
    description: "Memecah UI kompleks menjadi komponen React modular. Menggunakan Zustand untuk client UI state dan TanStack Query v5 untuk server caching.",
    tags: ["React 19", "Zustand", "TanStack Query", "REST API"],
  },
  {
    id: "3",
    date: "2024",
    title: "Fondasi Web & First Project",
    subtitle: "Awal Belajar Web Engineering",
    description: "Mempelajari struktur Semantic HTML5, CSS Flexbox/Grid responsif, JavaScript ES6+ DOM manipulation, serta version control Git/GitHub.",
    tags: ["HTML5", "CSS3", "JavaScript", "Git & GitHub"],
  },
] as const;

export const learningTracks = [
  {
    step: "01",
    title: "Web Engine Fundamentals",
    description: "Kuasai HTML semantic, CSS modern (Flex/Grid/CSS Vars), & JS async sebelum pakai framework.",
  },
  {
    step: "02",
    title: "Fullstack React & Next.js",
    description: "Bangun aplikasi interaktif dengan Next.js App Router, Route Handlers, dan Tailwind CSS v4.",
  },
  {
    step: "03",
    title: "Ship & Document",
    description: "Push kode ke GitHub, pasang Vercel deployment, dan tulis documentation yang jelas.",
  },
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
