import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";

import { ContactCard } from "@/components/contact-card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Halaman kontak developer untuk Risz Developer.",
};

export default function ContactPage() {
  return (
    <main className="page-shell py-[clamp(3.5rem,8vw,7rem)] space-y-10" id="main-content">
      <div className="space-y-4 border-b border-[var(--line)] pb-8">
        <Link className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring" href="/">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[var(--accent)]" />
          <span className="eyebrow">Get in Touch</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Kontak &amp; Kolaborasi
        </h1>

        <p className="max-w-2xl text-base text-[var(--muted-foreground)] leading-relaxed">
          Ingin ngobrol seputar koding, tanya-tanya project sekolah, atau ajak kolaborasi di hackathon? Pilih kontak di bawah atau kirim pesan singkat.
        </p>
      </div>

      <ContactCard />
    </main>
  );
}
