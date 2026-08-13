"use client";

import { useEffect, useState } from "react";
import { Braces, Loader2, Plus, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { DashboardPageHeader, DashboardPanel } from "@/components/dashboard/dashboard-ui";

type SkillItem = {
  id: string;
  name: string;
  level: string;
  category: string;
};

type SkillGroupItem = {
  id: string;
  name: string;
  order: number;
  skills: SkillItem[];
};

export default function DashboardSkillsPage() {
  const [groups, setGroups] = useState<SkillGroupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newGroupModal, setNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [newSkillModal, setNewSkillModal] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Daily");
  const [newSkillCategory, setNewSkillCategory] = useState("General");

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (res.ok && data.groups) {
        setGroups(data.groups);
      }
    } catch {
      setError("Gagal memuat data skill.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/skills");
        const data = await res.json();
        if (!ignore && res.ok && data.groups) {
          setGroups(data.groups);
        }
      } catch {
        if (!ignore) setError("Gagal memuat data skill.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "group",
          data: { name: newGroupName.trim(), order: groups.length + 1 },
        }),
      });

      if (res.ok) {
        toast.success("Kelompok Skill Berhasil Dibuat!");
        setNewGroupName("");
        setNewGroupModal(false);
        fetchSkills();
      }
    } catch {
      toast.error("Gagal membuat kelompok skill.");
    }
  };

  const handleCreateSkill = async (e: React.FormEvent, groupId: string) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "skill",
          data: {
            name: newSkillName.trim(),
            level: newSkillLevel,
            category: newSkillCategory,
            groupId,
          },
        }),
      });

      if (res.ok) {
        toast.success("Item Skill Berhasil Ditambahkan!");
        setNewSkillName("");
        setNewSkillModal(null);
        fetchSkills();
      }
    } catch {
      toast.error("Gagal membuat item skill.");
    }
  };

  const confirmDeleteItem = (id: string, type: "group" | "skill", name?: string) => {
    const label = type === "group" ? `Kelompok "${name || "ini"}"` : `Skill "${name || "ini"}"`;
    
    toast.custom((t) => (
      <div className="w-full max-w-md rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-card)]/95 backdrop-blur-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Hapus {type === "group" ? "Kelompok Skill" : "Item Skill"}?</h3>
            <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed">
              Apakah Anda yakin ingin menghapus {label}? Data yang dihapus tidak dapat dikembalikan.
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
              await executeDeleteItem(id, type);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-semibold text-white transition-colors"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    ), { duration: 8000 });
  };

  const executeDeleteItem = async (id: string, type: "group" | "skill") => {
    try {
      const res = await fetch(`/api/admin/skills?id=${id}&type=${type}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(`${type === "group" ? "Kelompok" : "Item"} Skill Berhasil Dihapus`);
        fetchSkills();
      } else {
        toast.error("Gagal menghapus item.");
      }
    } catch {
      toast.error("Gagal menghapus item.");
    }
  };

  const totalSkills = groups.reduce((total, group) => total + group.skills.length, 0);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center px-4" id="main-content">
        <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted-foreground)]">
          <Loader2 className="size-5 animate-spin text-[var(--accent)]" />
          Memuat data keahlian...
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      <DashboardPageHeader
        description="Kelola kelompok keahlian dan skill tech stack tersimpan di database."
        title="Skills dan tech stack"
      />

      <section aria-labelledby="skills-inventory-title" className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div>
            <p className="font-mono text-xs text-[var(--cyan-accent)]">SKILL INVENTORY</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]" id="skills-inventory-title">
              {totalSkills} kemampuan dalam {groups.length} kelompok
            </h2>
          </div>
          <button
            className="button-primary flex items-center gap-2 text-sm"
            onClick={() => setNewGroupModal(true)}
            type="button"
          >
            <Plus className="size-4" />
            Tambah Kelompok Skill
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Modal Tambah Group */}
        {newGroupModal && (
          <form className="mt-4 flex items-center gap-3 rounded-md border border-[var(--line)] bg-[var(--paper-raised)] p-4" onSubmit={handleCreateGroup}>
            <input
              className="focus-ring min-h-11 flex-1 rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm text-[var(--foreground)]"
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Nama Kelompok Baru (e.g. Frontend Stack)"
              required
              value={newGroupName}
            />
            <button className="button-primary text-sm" type="submit">
              Simpan Group
            </button>
            <button className="button-outline text-sm" onClick={() => setNewGroupModal(false)} type="button">
              Batal
            </button>
          </form>
        )}

        <div className="mt-6 space-y-6">
          {groups.map((group) => (
            <DashboardPanel key={group.id}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">{group.name}</h3>
                  <span className="font-mono text-xs text-[var(--cyan-accent)]">{group.skills.length} ITEMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="focus-ring inline-flex items-center gap-1 rounded-md border border-[var(--line-strong)] px-2.5 py-1 font-mono text-xs text-[var(--foreground)] hover:bg-[var(--paper)]"
                    onClick={() => setNewSkillModal(group.id)}
                    type="button"
                  >
                    <Plus className="size-3" />
                    Tambah Skill
                  </button>
                  <button
                    aria-label={`Hapus kelompok ${group.name}`}
                    className="focus-ring p-1 text-[var(--muted-foreground)] hover:text-red-400"
                    onClick={() => confirmDeleteItem(group.id, "group", group.name)}
                    type="button"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Inline Tambah Skill */}
              {newSkillModal === group.id && (
                <form className="flex flex-wrap items-center gap-3 border-b border-[var(--line)] bg-[var(--paper-raised)] px-5 py-3" onSubmit={(e) => handleCreateSkill(e, group.id)}>
                  <input
                    className="focus-ring min-h-10 min-w-40 flex-1 rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Nama Skill (e.g. Next.js 16)"
                    required
                    value={newSkillName}
                  />
                  <input
                    className="focus-ring min-h-10 w-28 rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    placeholder="Level (e.g. Primary)"
                    value={newSkillLevel}
                  />
                  <input
                    className="focus-ring min-h-10 w-28 rounded-md border border-[var(--line-strong)] bg-[var(--paper)] px-3 text-sm"
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    placeholder="Kategori"
                    value={newSkillCategory}
                  />
                  <button className="button-primary text-xs" type="submit">
                    Simpan
                  </button>
                  <button className="button-outline text-xs" onClick={() => setNewSkillModal(null)} type="button">
                    Batal
                  </button>
                </form>
              )}

              <ul className="divide-y divide-[var(--line)]">
                {group.skills.length === 0 ? (
                  <li className="px-5 py-4 text-sm text-[var(--muted-foreground)]">Belum ada skill di kelompok ini.</li>
                ) : (
                  group.skills.map((skill) => (
                    <li className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6" key={skill.id}>
                      <div className="flex items-center gap-3">
                        <Braces aria-hidden="true" className="size-4 shrink-0 text-[var(--cyan-accent)]" />
                        <h4 className="text-sm font-medium text-[var(--foreground)]">{skill.name}</h4>
                        <span className="rounded-md border border-[var(--line-strong)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)]">
                          {skill.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="shrink-0 rounded-md border border-[var(--line-strong)] px-2 py-1 font-mono text-[11px] text-[var(--accent)]">
                          {skill.level}
                        </span>
                        <button
                          aria-label={`Hapus ${skill.name}`}
                          className="focus-ring p-1 text-[var(--muted-foreground)] hover:text-red-400"
                          onClick={() => confirmDeleteItem(skill.id, "skill", skill.name)}
                          type="button"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </DashboardPanel>
          ))}
        </div>
      </section>
    </main>
  );
}
