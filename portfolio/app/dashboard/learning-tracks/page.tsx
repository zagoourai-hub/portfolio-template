"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Route, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { DashboardPageHeader, DashboardPanel } from "@/components/dashboard/dashboard-ui";

type LearningTrackItem = {
  id: string;
  title: string;
  provider: string;
  status: string;
  certificateUrl?: string | null;
  order: number;
};

export default function DashboardLearningTracksPage() {
  const [tracks, setTracks] = useState<LearningTrackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTrackModal, setNewTrackModal] = useState(false);
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [certificateUrl, setCertificateUrl] = useState("");

  const fetchTracks = async () => {
    try {
      const res = await fetch("/api/admin/learning-tracks");
      const data = await res.json();
      if (res.ok && data.tracks) {
        setTracks(data.tracks);
      }
    } catch {
      setError("Gagal memuat learning tracks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/learning-tracks");
        const data = await res.json();
        if (!ignore && res.ok && data.tracks) {
          setTracks(data.tracks);
        }
      } catch {
        if (!ignore) setError("Gagal memuat learning tracks.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreateTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !provider.trim()) return;

    try {
      const res = await fetch("/api/admin/learning-tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          provider: provider.trim(),
          status,
          certificateUrl: certificateUrl.trim() || undefined,
          order: tracks.length + 1,
        }),
      });

      if (res.ok) {
        toast.success("Learning Track Berhasil Dibuat!");
        setTitle("");
        setProvider("");
        setCertificateUrl("");
        setNewTrackModal(false);
        fetchTracks();
      }
    } catch {
      toast.error("Gagal membuat learning track.");
    }
  };

  const confirmDeleteTrack = (id: string, titleStr: string) => {
    toast.custom((t) => (
      <div className="w-full max-w-md rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-card)]/95 backdrop-blur-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Hapus Learning Track?</h3>
            <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed">
              Apakah Anda yakin ingin menghapus track <span className="font-semibold text-[var(--foreground)]">&quot;{titleStr}&quot;</span>? Data tidak dapat dikembalikan.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--line)]">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] text-xs font-medium text-[var(--muted-foreground)] hover:bg-[var(--paper-raised)] hover:text-[var(--foreground)] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t);
              await executeDeleteTrack(id);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-semibold text-white transition-colors"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    ), { duration: 8000 });
  };

  const executeDeleteTrack = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/learning-tracks?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Learning Track Berhasil Dihapus");
        fetchTracks();
      } else {
        toast.error("Gagal menghapus learning track.");
      }
    } catch {
      toast.error("Gagal menghapus learning track.");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center px-4" id="main-content">
        <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted-foreground)]">
          <Loader2 className="size-5 animate-spin text-[var(--accent)]" />
          Memuat data learning tracks...
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      <DashboardPageHeader
        description="Susun perjalanan belajarmu menjadi urutan yang mudah dipahami recruiter dan pengunjung portfolio."
        title="Learning tracks"
      />

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
        <section aria-labelledby="track-list-title">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Route aria-hidden="true" className="size-4 text-[var(--accent)]" />
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--foreground)]" id="track-list-title">
                Urutan belajar tersimpan ({tracks.length})
              </h2>
            </div>
            <button
              className="button-primary flex items-center gap-2 text-sm"
              onClick={() => setNewTrackModal(true)}
              type="button"
            >
              <Plus className="size-4" />
              Tambah Track
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Form Modal Tambah Track */}
          {newTrackModal && (
            <form className="mt-4 space-y-4 rounded-md border border-[var(--line)] bg-[var(--paper-raised)] p-5" onSubmit={handleCreateTrack}>
              <h3 className="font-semibold text-[var(--foreground)]">Tambah Learning Track Baru</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)]">Judul Track</label>
                  <input
                    className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Web Engine Fundamentals"
                    required
                    value={title}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)]">Provider / Penyelenggara</label>
                  <input
                    className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="e.g. Self-taught / Dicoding"
                    required
                    value={provider}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)]">Status</label>
                  <select
                    className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)]">URL Sertifikat (Optional)</label>
                  <input
                    className="focus-ring mt-1 min-h-10 w-full rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setCertificateUrl(e.target.value)}
                    placeholder="https://sertifikat.com/123"
                    value={certificateUrl}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="button-primary text-xs" type="submit">
                  Simpan Track
                </button>
                <button className="button-outline text-xs" onClick={() => setNewTrackModal(false)} type="button">
                  Batal
                </button>
              </div>
            </form>
          )}

          <ol className="mt-4 overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--paper-raised)]">
            {tracks.length === 0 ? (
              <li className="p-6 text-center text-sm text-[var(--muted-foreground)]">Belum ada learning track yang tersimpan.</li>
            ) : (
              tracks.map((track, index) => (
                <li className="grid gap-4 border-b border-[var(--line)] p-5 last:border-b-0 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:p-6" key={track.id}>
                  <p className="font-mono text-xl font-semibold tracking-[-0.05em] text-[var(--cyan-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold tracking-[-0.025em] text-[var(--foreground)]">{track.title}</h3>
                      <span className="rounded-md border border-[var(--line-strong)] px-2 py-0.5 font-mono text-[11px] text-[var(--accent)]">
                        {track.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">Provider: {track.provider}</p>
                  </div>
                  <div>
                    <button
                      aria-label={`Hapus track ${track.title}`}
                      className="focus-ring p-1 text-[var(--muted-foreground)] hover:text-red-400"
                      onClick={() => confirmDeleteTrack(track.id, track.title)}
                      type="button"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ol>
        </section>

        <aside aria-labelledby="track-guidance-title">
          <DashboardPanel className="p-5 sm:p-6">
            <p className="font-mono text-xs text-[var(--cyan-accent)]">DATABASE PERSISTENCE</p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]" id="track-guidance-title">
              Data tersimpan di SQLite DB
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">
              Perubahan pada learning track langsung ter-update di database via API Route Handler `/api/admin/learning-tracks`.
            </p>
          </DashboardPanel>
        </aside>
      </div>
    </main>
  );
}
