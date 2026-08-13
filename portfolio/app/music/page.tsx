import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HeadphoneOff, Headphones, Music2, Radio, Sparkles } from "lucide-react";

import { MusicPlayerWidget } from "@/components/ui/music-player-widget";

export const metadata: Metadata = {
  title: "Favorite Music",
  description: "Daftar musik favorit & playlist lofi/synthwave pengiring koding Risz Developer.",
};

export default function MusicPage() {
  const genres = [
    { name: "Synthwave & Cyberpunk", desc: "Beat tempo tinggi buat koding late night & debugging jam 2 pagi.", count: "12 Tracks" },
    { name: "Lofi Hip Hop & Rain", desc: "Suara santai & hujan buat nulis komponen React & TypeScript.", count: "24 Tracks" },
    { name: "Deep Focus Ambient", desc: "Frekuensi binaural & drone synth buat deep work tanpa distrasi.", count: "8 Tracks" },
  ] as const;

  return (
    <main className="page-shell py-[clamp(3.5rem,8vw,7rem)] space-y-10" id="main-content">
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--line)] pb-8">
        <Link className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring" href="/">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2">
          <Headphones className="h-5 w-5 text-[var(--accent)]" />
          <span className="eyebrow">Dev Soundtracks</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Musik Favorit &amp; Lofi Coding Beats
        </h1>

        <p className="max-w-2xl text-base text-[var(--muted-foreground)] leading-relaxed">
          Musik adalah komponen penting saat ngulik kode. Berikut adalah playlist favorit dan audio player interaktif untuk mendengarkan lagu-lagu fokus koding.
        </p>
      </div>

      {/* Interactive Music Player Widget */}
      <div className="max-w-3xl mx-auto">
        <MusicPlayerWidget />
      </div>

      {/* Music Genre Highlights */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--accent)]" />
          <h2 className="text-xl font-bold text-[var(--foreground)]">Kategori Playlist Koding</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {genres.map((g) => (
            <div
              key={g.name}
              className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-6 space-y-3 hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--accent)] font-semibold">{g.count}</span>
                <Radio className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">{g.name}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
