"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Code, ExternalLink } from "lucide-react";

import type { PortfolioProject } from "@/data/portfolio";
import { ProjectArt } from "@/components/project-art";
import { GithubIcon } from "@/components/icons";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type ProjectCardProps = {
  project: PortfolioProject;
  preload?: boolean;
  featured?: boolean;
};

export function ProjectCard({
  project,
  preload = false,
  featured = false,
}: ProjectCardProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <CardContainer containerClassName="w-full">
      <CardBody
        className={`group relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-5 sm:p-6 transition-all hover:border-[var(--line-strong)] w-full ${
          featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:items-center" : ""
        }`}
      >
        <CardItem
          translateZ="60"
          className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--paper)] aspect-[16/10] group-hover:border-[var(--accent)] transition-colors w-full"
        >
          {showCode && project.snippet ? (
            <div className="h-full w-full p-4 font-mono text-xs text-[var(--accent)] bg-[var(--paper-card)] overflow-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--line)] text-[var(--muted-foreground)]">
                <span>{"// snippet: "}{project.slug}.ts</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCode(false);
                  }}
                  className="text-[var(--accent)] hover:underline"
                  type="button"
                >
                  Show Visual
                </button>
              </div>
              <pre className="whitespace-pre-wrap">{project.snippet}</pre>
            </div>
          ) : (
            <>
              <ProjectArt preload={preload} project={project} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper-raised)] via-transparent to-transparent opacity-60 pointer-events-none" />
            </>
          )}

          {project.snippet && !showCode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCode(true);
              }}
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded border border-[var(--line)] bg-[var(--paper-raised)] px-2.5 py-1 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors z-10"
              type="button"
            >
              <Code className="h-3.5 w-3.5" />
              <span>Code</span>
            </button>
          )}
        </CardItem>

        <div className="mt-5 lg:mt-0 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <CardItem
              translateZ="40"
              className="flex items-center justify-between gap-2"
            >
              <span className="eyebrow">{project.label}</span>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">{project.year}</span>
            </CardItem>

            <CardItem
              translateZ="50"
              as="h3"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
            >
              <Link className="focus-ring" href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </CardItem>

            <CardItem
              translateZ="40"
              as="p"
              className="text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-3"
            >
              {project.summary}
            </CardItem>

            <CardItem
              translateZ="30"
              className="flex flex-wrap gap-1.5 pt-2"
            >
              {project.skills.map((skill) => (
                <span className="tech-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </CardItem>
          </div>

          <CardItem
            translateZ="50"
            className="flex items-center justify-between pt-4 border-t border-[var(--line)] w-full"
          >
            <Link
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent)] hover:underline focus-ring"
              href={`/projects/${project.slug}`}
            >
              <span>Read Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-ring"
                  aria-label={`GitHub repo for ${project.title}`}
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring"
                  aria-label={`Live demo for ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
