"use client";

import {
  ExternalLink,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  Wrench,
  X,
  Bell,
  Moon,
  Sun,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { dashboardPreviewOwner } from "@/data/dashboard-preview";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
};

type DashboardNavigationProps = {
  className: string;
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
  id?: string;
  onClose?: () => void;
};

const dashboardNavigation = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/profile", icon: UserRound, label: "Profile" },
  { href: "/dashboard/skills", icon: Wrench, label: "Skills" },
  { href: "/dashboard/learning-tracks", icon: GraduationCap, label: "Learning tracks" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
] as const;

function DashboardNavigation({ className, closeButtonRef, id, onClose }: DashboardNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Berhasil Keluar (Logout)", {
        description: "Sesi owner Anda telah ditutup secara aman.",
      });
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 500);
    } catch {
      toast.error("Gagal Logout", {
        description: "Terjadi kesalahan saat mengakhiri sesi.",
      });
    }
  };

  return (
    <aside
      aria-label="Navigasi dashboard"
      className={cn("flex w-[18rem] flex-col border-r border-[var(--line)] bg-[var(--paper-raised)]", className)}
      id={id}
    >
      {/* Brand Logo in Horizon UI Style */}
      <div className="flex min-h-[5.5rem] items-center justify-between border-b border-[var(--line)] px-6">
        <Link className="focus-ring flex items-center gap-1.5 font-sans text-xl font-bold tracking-tight uppercase" href="/dashboard" onClick={onClose}>
          <span className="text-[var(--foreground)]">PORTFOLIO</span>
          <span className="text-[var(--accent)] font-light">CMS</span>
        </Link>
        {onClose ? (
          <button
            aria-label="Tutup navigasi"
            className="focus-ring grid size-10 place-items-center rounded-full text-[var(--muted-foreground)] hover:bg-[var(--paper)] hover:text-[var(--foreground)]"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>

      {/* Owner Info Widget */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] font-bold text-[var(--accent-ink)] text-xs uppercase">
            {dashboardPreviewOwner.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-[var(--foreground)]">{dashboardPreviewOwner.name}</p>
            <p className="mt-0.5 truncate text-[10px] text-[var(--muted-foreground)] tracking-wide uppercase font-medium">{dashboardPreviewOwner.role}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-[var(--line)] mx-6" />

      {/* Sidebar navigation list */}
      <nav aria-label="Menu workspace" className="flex-1 py-6">
        <ul className="space-y-1.5">
          {dashboardNavigation.map((item) => {
            const isActive = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-12 items-center gap-4 py-3 pl-8 transition-colors",
                    isActive
                      ? "font-bold text-[var(--foreground)]"
                      : "font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                  href={item.href}
                  onClick={onClose}
                >
                  <Icon className={cn("size-5", isActive ? "text-[var(--accent)]" : "text-[var(--muted-foreground)]")} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm tracking-wide">{item.label}</span>
                  {isActive ? (
                    <div className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-[var(--accent)]" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Horizon-style Bottom Premium/System Card */}
      <div className="px-5 py-4">
        <div className="relative rounded-[20px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] p-5 text-center text-white shadow-md">
          <div className="mx-auto -mt-10 flex size-10 items-center justify-center rounded-full bg-[var(--paper-raised)] text-[var(--accent)] shadow-sm">
            <Sparkles className="size-4" />
          </div>
          <h3 className="mt-3 text-xs font-bold text-white tracking-wider uppercase">Horizon Theme</h3>
          <p className="mt-1 text-[10px] text-white/80 leading-normal">
            Sistem dashboard portfolio yang disesuaikan dengan estetika Horizon UI.
          </p>
          <Link
            href="/"
            onClick={onClose}
            className="mt-4 block w-full rounded-xl bg-white py-2 text-[10px] font-bold text-[#1b254b] hover:bg-white/90 transition-all shadow-sm"
          >
            Buka Portfolio
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--line)] p-4 flex flex-col gap-1.5">
        <Link
          className="focus-ring flex min-h-10 items-center justify-between rounded-xl px-4 text-xs font-semibold text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
          href="/"
          onClick={onClose}
        >
          <span>Lihat website</span>
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </Link>
        <button
          className="focus-ring flex min-h-10 w-full items-center justify-between rounded-xl px-4 text-xs font-semibold text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-red-500"
          onClick={handleLogout}
          type="button"
        >
          <span>Logout</span>
          <LogOut aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </aside>
  );
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMobileNavigationOpen = useRef(false);

  const pathname = usePathname();
  const router = useRouter();

  // Dark/Light Mode theme switcher state
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/dashboard/projects?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push(`/dashboard/projects`);
      }
    }
  };

  const handleNotificationsClick = () => {
    toast.custom((t) => (
      <div className="w-full max-w-sm rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-card)]/95 backdrop-blur-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-[var(--accent)]" />
            <h3 className="text-sm font-bold text-[var(--foreground)] font-sans">Notifikasi Sistem</h3>
          </div>
          <span className="rounded-full bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold">3 Baru</span>
        </div>
        <div className="space-y-3 font-sans">
          <div className="text-xs space-y-1">
            <p className="font-semibold text-[var(--foreground)]">Database Terhubung</p>
            <p className="text-[var(--muted-foreground)]">Menggunakan SQLite lokal di databases/dev.db.</p>
          </div>
          <div className="text-xs space-y-1">
            <p className="font-semibold text-[var(--foreground)]">Fase Frontend Selesai</p>
            <p className="text-[var(--muted-foreground)]">Seluruh preview halaman CMS dan portfolio aktif.</p>
          </div>
          <div className="text-xs space-y-1">
            <p className="font-semibold text-[var(--foreground)]">Sesi Aktif</p>
            <p className="text-[var(--muted-foreground)]">Masuk sebagai owner@example.com.</p>
          </div>
        </div>
        <div className="flex justify-end pt-2 border-t border-[var(--line)]">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3.5 py-1.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-[10px] font-bold text-[var(--accent-ink)] transition-colors"
          >
            Tandai Dibaca
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    const t = setTimeout(() => {
      setTheme(isLight ? "light" : "dark");
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      setTheme("light");
      toast.success("Mode Terang Aktif", {
        description: "Dashboard menggunakan warna terang Horizon UI.",
      });
    } else {
      document.documentElement.classList.remove("light");
      setTheme("dark");
      toast.success("Mode Gelap Aktif", {
        description: "Dashboard menggunakan warna gelap Horizon UI.",
      });
    }
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavigationOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (isMobileNavigationOpen) {
      mobileCloseButtonRef.current?.focus();
    } else if (wasMobileNavigationOpen.current) {
      mobileMenuButtonRef.current?.focus();
    }

    wasMobileNavigationOpen.current = isMobileNavigationOpen;
  }, [isMobileNavigationOpen]);

  // Compute page headers for Floating Horizon Navbar
  const getHeaderInfo = (path: string) => {
    if (path === "/dashboard") {
      return { segment: "Main Dashboard", title: "Overview" };
    }
    if (path.startsWith("/dashboard/profile")) {
      return { segment: "Profile", title: "Profile & Kontak" };
    }
    if (path.startsWith("/dashboard/skills")) {
      return { segment: "Skills", title: "Keahlian & Tag" };
    }
    if (path.startsWith("/dashboard/learning-tracks")) {
      return { segment: "Learning Tracks", title: "Jalur Belajar" };
    }
    if (path.startsWith("/dashboard/projects")) {
      if (path.includes("/new")) {
        return { segment: "Projects / Tambah", title: "Tambah Project Baru" };
      }
      const parts = path.split("/");
      if (parts.length > 3) {
        return { segment: "Projects / Edit", title: "Edit Detail Project" };
      }
      return { segment: "Projects", title: "Daftar Project" };
    }
    return { segment: "Dashboard", title: "Workspace" };
  };

  const { segment, title } = getHeaderInfo(pathname);

  // Profile avatar fallback initials
  const initials = dashboardPreviewOwner.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-[100dvh] dashboard-theme bg-[var(--paper)] text-[var(--foreground)] lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
      {/* Sidebar for Desktop */}
      <DashboardNavigation className="hidden min-h-[100dvh] lg:sticky lg:top-0 lg:flex shrink-0" />

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileNavigationOpen ? (
        <>
          <button
            aria-label="Tutup navigasi dashboard"
            className="fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--paper)_50%,transparent)] backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileNavigationOpen(false)}
            type="button"
          />
          <DashboardNavigation
            className="fixed inset-y-0 left-0 z-50 min-h-[100dvh] lg:hidden"
            closeButtonRef={mobileCloseButtonRef}
            id="dashboard-mobile-navigation"
            onClose={() => setIsMobileNavigationOpen(false)}
          />
        </>
      ) : null}

      {/* Main Content Area */}
      <div
        aria-hidden={isMobileNavigationOpen || undefined}
        className="min-w-0 flex flex-col min-h-screen py-4 lg:py-6"
        inert={isMobileNavigationOpen || undefined}
      >
        {/* Floating Header Navbar (Horizon UI Style) */}
        <header className="sticky top-4 z-30 mx-4 lg:mx-8 flex items-center justify-between rounded-3xl bg-[color-mix(in_srgb,var(--paper-raised)_70%,transparent)] p-3 shadow-md backdrop-blur-md border border-[var(--line)]">
          {/* Breadcrumbs & Title */}
          <div className="flex flex-col pl-2">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-[var(--ink-soft)] tracking-wider uppercase">
              <span className="opacity-80">Pages</span>
              <span className="opacity-50">/</span>
              <span className="text-[var(--foreground)] font-bold">{segment}</span>
            </div>
            <div className="mt-0.5 text-lg lg:text-xl font-bold tracking-tight text-[var(--foreground)]">
              {title}
            </div>
            <span className="sr-only">ONLINE</span>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex items-center gap-2 rounded-full bg-[var(--paper-raised)] p-1.5 shadow-inner border border-[var(--line)]">
            {/* Search Input (Desktop) */}
            <div className="relative hidden md:block pl-1">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--ink-soft)]" />
              <input
                type="search"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="h-8 w-36 rounded-full bg-[var(--paper)] pl-8 pr-3 text-xs font-medium text-[var(--foreground)] placeholder:text-[var(--ink-soft)] border-0 focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
              />
            </div>

            {/* Mobile menu trigger */}
            <button
              aria-controls={isMobileNavigationOpen ? "dashboard-mobile-navigation" : undefined}
              aria-expanded={isMobileNavigationOpen}
              aria-label="Buka navigasi dashboard"
              className="grid size-8 place-items-center rounded-full text-[var(--foreground)] hover:bg-[var(--paper)] lg:hidden"
              onClick={() => setIsMobileNavigationOpen(true)}
              ref={mobileMenuButtonRef}
              type="button"
            >
              <Menu aria-hidden="true" className="size-4" />
            </button>

            {/* Notification trigger */}
            <button
              onClick={handleNotificationsClick}
              className="grid size-8 place-items-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--paper)] hover:text-[var(--foreground)]"
            >
              <Bell className="size-4" />
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className="grid size-8 place-items-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--paper)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Ubah tema"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            {/* User Profile avatar bubble */}
            <button
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-[10px] uppercase shadow-sm"
              aria-label="Menu admin"
              onClick={() => router.push("/dashboard/profile")}
            >
              {initials}
            </button>
          </div>
        </header>

        {/* Page Content wrapper */}
        <div className="flex-1 mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
