import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";

import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";
import { ClockSection } from "@/components/ui/clock-section";
import { GalleryGridBlock } from "@/components/ui/gallery-grid-block";
import { GlassmorphismAbout } from "@/components/ui/glassmorphism-about";
import { RuixenFeatureSection } from "@/components/ui/ruixen-feature-section";
import { Timeline } from "@/components/ui/timeline";
import { FeaturedGlobeSection } from "@/components/featured-globe-section";
import { HeroTerminal } from "@/components/hero-terminal";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { TechStack } from "@/components/tech-stack";
import { ScrollReveal } from "@/components/scroll-reveal";
import { learningTracks, projects, siteConfig, timelineItems } from "@/data/portfolio";

export default function Home() {
  return (
    <main id="main-content">
      {/* RESPONSIVE HERO BANNER */}
      <ResponsiveHeroBanner
        badgeLabel="2026 // GenZ Dev"
        badgeText="Belajar Fullstack Web & Ngulik Next.js 16"
        title="Koding Project Sekolah,"
        titleLine2="Tanpa AI Slop"
        description="Experience modern web development through clean code, type-safe architecture, and high-performance user interfaces."
        primaryButtonText="Explore Projects"
        primaryButtonHref="/projects"
        secondaryButtonText="Get in Touch"
        secondaryButtonHref="/contact"
        ctaButtonText="Contact Me"
        ctaButtonHref="/contact"
        partnersTitle="Technologies & Tools I Use Daily"
      />

      {/* RUIXEN FEATURE MATRIX SECTION */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)] border-b border-[var(--line)]">
        <ScrollReveal>
          <RuixenFeatureSection />
        </ScrollReveal>
      </section>

      {/* ABOUT ME SECTION (GLASSMORPHISM PORTFOLIO BLOCK FROM 21ST.DEV) */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)]" id="about">
        <ScrollReveal>
          <GlassmorphismAbout />
        </ScrollReveal>
      </section>

      {/* 21ST.DEV CLOCK SECTION */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)] border-t border-[var(--line)]" id="clock">
        <ScrollReveal>
          <ClockSection />
        </ScrollReveal>
      </section>

      {/* GALLERY GRID BLOCK (21ST.DEV) */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)] border-t border-[var(--line)]" id="gallery">
        <ScrollReveal>
          <GalleryGridBlock />
        </ScrollReveal>
      </section>

      {/* DEVELOPER CLI & BIO SECTION */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)] border-t border-[var(--line)]">
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-full">
                <span className="eyebrow max-w-full flex-wrap text-[11px] sm:text-xs">
                  <Code2 className="h-3.5 w-3.5 shrink-0" />
                  <span>Terminal Environment // {siteConfig.handle}</span>
                </span>
                <span className="h-3 w-px bg-[var(--line)] hidden sm:inline-block" />
                <span className="text-xs font-mono text-[var(--muted-foreground)]">
                  {siteConfig.role}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                Interactive CLI <br />
                <span className="text-[var(--accent)] font-mono">Developer Playground</span>
              </h2>

              <p className="max-w-[34rem] text-base leading-relaxed text-[var(--muted-foreground)]">
                Gunakan widget terminal CLI di bawah untuk menyalin command setup project atau melihat konfigurasi environment developer.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link className="button-primary focus-ring" href="/projects">
                  <span>View All Case Studies</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link className="button-secondary focus-ring" href="/contact">
                  <span>Send Message</span>
                </Link>
              </div>
            </div>

            {/* HERO TERMINAL CLI WIDGET */}
            <div className="w-full max-w-full overflow-hidden">
              <HeroTerminal />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* TECH STACK MATRIX SECTION */}
      <section className="border-y border-[var(--line)] bg-[var(--paper-raised)] py-[clamp(3.5rem,8vw,7rem)]" id="skills">
        <div className="page-shell space-y-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Developer Toolkit"
              title="Stack koding yang dipakai"
              description="Teknologi web modern yang dipelajari dan dipakai buat bikin project sekolah & aplikasi web interaktif."
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <TechStack />
          </ScrollReveal>
        </div>
      </section>

      {/* 21ST.DEV TIMELINE SECTION */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)]" id="timeline">
        <ScrollReveal>
          <Timeline
            subtitle="21st.dev Timeline"
            title="Rekam Jejak Belajar Koding"
            description="Perjalanan belajar dari dasar HTML/CSS hingga merakit aplikasi fullstack modern dengan Next.js 16."
            items={timelineItems}
          />
        </ScrollReveal>
      </section>

      {/* 21ST.DEV FEATURED GLOBE SECTION */}
      <section className="border-t border-[var(--line)] bg-[var(--paper-raised)] py-[clamp(3.5rem,8vw,7rem)]">
        <div className="page-shell">
          <ScrollReveal>
            <FeaturedGlobeSection />
          </ScrollReveal>
        </div>
      </section>

      {/* WORKFLOW / LEARNING TRACKS */}
      <section className="border-t border-[var(--line)] py-[clamp(3.5rem,8vw,7rem)]" id="process">
        <div className="page-shell space-y-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Workflow & Journey"
              title="3 langkah cara belajar koding"
              description="Metode belajar sederhana: pahami fondasi, bikin project kecil, dokumentasikan di GitHub."
            />
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {learningTracks.map((track, idx) => (
              <ScrollReveal key={track.step} delay={idx * 0.1}>
                <div
                  className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-6 space-y-4 relative overflow-hidden group hover:border-[var(--accent)] transition-colors h-full"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-2xl font-bold text-[var(--accent)]">{track.step}</span>
                    <Terminal className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">{track.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{track.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="border-t border-[var(--line)] bg-[var(--paper-raised)] py-[clamp(3.5rem,8vw,7rem)]" id="work">
        <div className="page-shell space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <ScrollReveal className="flex-1">
              <SectionHeading
                eyebrow="Featured Projects"
                title="Hasil ngulik & tugas sekolah"
                description="Beberapa contoh project yang sudah dibuat dari latihan HTML/CSS sampai Next.js fullstack."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Link className="button-secondary focus-ring w-fit text-xs font-mono" href="/projects">
                <span>View All Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid gap-8">
            <ScrollReveal>
              <ProjectCard featured preload project={projects[0]} />
            </ScrollReveal>
            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal>
                <ProjectCard project={projects[1]} />
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <ProjectCard project={projects[2]} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CALLOUT SECTION */}
      <section className="page-shell py-[clamp(3.5rem,8vw,7rem)]">
        <ScrollReveal>
          <div className="rounded-xl border border-[var(--line)] bg-gradient-to-br from-[var(--paper-raised)] to-[var(--paper-card)] p-8 sm:p-12 space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <span className="eyebrow">Ready to collaborate?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] max-w-xl">
              Punya ide project sekolah atau mau ngobrol seputar koding?
            </h2>

            <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-lg leading-relaxed">
              Template portfolio ini siap pakai untuk kamu sesuaikan. Ganti data profil, upload project kamu, dan tunjukkan hasil belajarmu ke dunia.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link className="button-primary focus-ring" href="/contact">
                <span>Buka Halaman Kontak</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline focus-ring"
              >
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
