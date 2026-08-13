"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
  KeyRound,
  ShieldAlert,
  Terminal,
  Fingerprint,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "motion/react";
import type { Transition } from "motion/react";

// ─── Motion helpers ───────────────────────────────────────────────────────────
const spring: Transition = { type: "spring", stiffness: 80, damping: 20 };

function fadeUpProps(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay },
  };
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      const msg = "Email dan password wajib diisi.";
      setError(msg);
      toast.error(msg, {
        description: "Pastikan semua kolom telah terisi sebelum melanjutkan.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "Kredensial salah atau tidak terverifikasi.";
        setError(errorMsg);
        toast.error("Gagal melakukan login", { description: errorMsg });
        setLoading(false);
        return;
      }

      toast.success("Otentikasi Berhasil!", {
        description: "Mengalihkan Anda ke Dashboard Owner...",
      });

      setTimeout(() => {
        router.push(fromPath);
        router.refresh();
      }, 700);
    } catch {
      const netMsg = "Terjadi kesalahan jaringan. Coba beberapa saat lagi.";
      setError(netMsg);
      toast.error("Kesalahan Sistem", { description: netMsg });
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-400"
        >
          <KeyRound className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <label
          className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
          htmlFor="owner-email"
        >
          Email Identity
        </label>
        <input
          autoComplete="email"
          className="focus-ring min-h-[46px] w-full rounded-xl border border-[var(--line-strong)] bg-[var(--paper-raised)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 transition-colors hover:border-[var(--accent)]/40 focus:border-[var(--accent)]"
          id="owner-email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="owner@example.com"
          type="email"
          value={email}
          required
        />
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label
          className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
          htmlFor="owner-password"
        >
          Access Key / Password
        </label>
        <div className="relative">
          <input
            autoComplete="current-password"
            className="focus-ring min-h-[46px] w-full rounded-xl border border-[var(--line-strong)] bg-[var(--paper-raised)] pl-4 pr-12 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 transition-colors hover:border-[var(--accent)]/40 focus:border-[var(--accent)]"
            id="owner-password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            type={showPassword ? "text" : "password"}
            value={password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        className="button-primary mt-2 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Verifikasi...</span>
          </>
        ) : (
          <>
            <LockKeyhole className="size-4" />
            <span>Masuk ke Control Plane</span>
          </>
        )}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-[100dvh] flex-col lg:flex-row"
    >
      {/* ── LEFT: Branding Panel ─────────────────────────────────────────── */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-[var(--paper-raised)] lg:w-[42%] lg:h-[100dvh] lg:sticky lg:top-0 lg:self-start">
        {/* Radial glow top-right corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,153,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Radial glow bottom-left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Right border separator (desktop only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-px lg:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--line-strong) 20%, var(--accent)/30 50%, var(--line-strong) 80%, transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col gap-8 p-8 lg:p-12 lg:justify-center">
          {/* Back link */}
          <motion.div {...fadeUpProps(0)}>
            <Link
              href="/"
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 font-mono text-xs text-[var(--muted-foreground)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5" />
              <span>Ke Portfolio Publik</span>
            </Link>
          </motion.div>

          {/* Brand block */}
          <motion.div {...fadeUpProps(0.08)} className="space-y-4">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
              <ShieldAlert className="size-3.5" aria-hidden="true" />
              <span>Restricted Access</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] lg:text-4xl">
              Control Plane
              <br />
              <span className="text-[var(--ink-soft)]">&amp; Administrasi</span>
            </h1>

            {/* Description */}
            <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--muted-foreground)]">
              Ruang administrasi terisolasi untuk mengelola profil teknis, kurasi
              proyek, kelompok keahlian, dan log pembelajaran.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.ul
            {...fadeUpProps(0.16)}
            className="hidden space-y-3 lg:block"
            aria-label="Fitur control plane"
          >
            {[
              { icon: Terminal, label: "Manajemen konten portofolio" },
              { icon: ShieldCheck, label: "Session httpOnly terenkripsi" },
              { icon: Fingerprint, label: "Akses eksklusif pemilik" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)]">
                  <Icon className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-[var(--muted-foreground)]">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Footer badge */}
        <motion.div
          {...fadeUpProps(0.24)}
          className="relative z-10 flex items-center justify-between border-t border-[var(--line)] px-8 py-5 lg:px-12"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted-foreground)]">
            <ShieldCheck className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
            <span>httpOnly Session</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
            v1.0.0
          </span>
        </motion.div>
      </div>

      {/* ── RIGHT: Auth Panel ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:h-[100dvh] lg:px-12 lg:py-16 lg:overflow-y-auto">
        <div className="w-full max-w-[420px]">
          {/* Panel header */}
          <motion.div {...fadeUpProps(0.1)} className="mb-8">
            {/* OWNER ONLY badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--paper-raised)] px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                Owner Only
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Otentikasi Owner
            </h2>
            <p className="mt-1.5 text-sm text-[var(--muted-foreground)]">
              Gunakan kredensial terdaftar pada database sistem.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="mb-8 h-px w-full bg-[var(--line)]"
            aria-hidden="true"
          />

          {/* Form */}
          <motion.div {...fadeUpProps(0.22)}>
            <Suspense
              fallback={
                <div className="py-10 text-center font-mono text-xs text-[var(--muted-foreground)]">
                  Menyiapkan form...
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </motion.div>

          {/* Footer note */}
          <motion.p
            {...fadeUpProps(0.3)}
            className="mt-8 text-center font-mono text-[11px] text-[var(--muted-foreground)]/60"
          >
            Akses terbatas untuk pemilik portofolio.{" "}
            <span className="text-[var(--muted-foreground)]">
              Pendaftaran publik dinonaktifkan.
            </span>
          </motion.p>
        </div>
      </div>
    </main>
  );
}
