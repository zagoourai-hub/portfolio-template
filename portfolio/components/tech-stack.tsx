import { Cpu, Layers, Terminal } from "lucide-react";
import { getPublicSkillGroups } from "@/server/public";
import { ScrollReveal } from "./scroll-reveal";

export async function TechStack() {
  const groups = await getPublicSkillGroups();

  const icons = [
    <Terminal key="core" className="h-4 w-4 text-[var(--accent)]" />,
    <Layers key="frameworks" className="h-4 w-4 text-[var(--cyan-accent)]" />,
    <Cpu key="tools" className="h-4 w-4 text-[var(--accent)]" />,
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {groups.map((group, idx) => (
        <ScrollReveal key={group.id} delay={idx * 0.15} duration={0.8}>
          <div
            className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-6 space-y-4 hover:border-[var(--line-strong)] transition-all h-full"
          >
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
              {icons[idx % icons.length]}
              <h3 className="font-mono text-sm font-semibold text-[var(--foreground)]">
                {group.name}
              </h3>
            </div>

            <ul className="space-y-3 font-mono text-xs">
              {group.skills.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col space-y-1 rounded border border-[var(--line)] bg-[var(--paper)] p-3 hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--foreground)]">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--line)] text-[var(--accent)] bg-[var(--paper-card)]">
                      {item.level}
                    </span>
                  </div>
                  <p className="text-[var(--muted-foreground)] font-sans text-xs">
                    {item.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
