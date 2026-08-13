"use client";

import Image from "next/image";
import { useState } from "react";

import type { PortfolioProject } from "@/data/portfolio";

type ProjectArtProps = {
  project: PortfolioProject;
  preload?: boolean;
};

export function ProjectArt({ project, preload = false }: ProjectArtProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (project.image && project.imageAlt && !imageFailed) {
    return (
      <Image
        alt={project.imageAlt}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        fill
        onError={() => setImageFailed(true)}
        preload={preload}
        sizes="(min-width: 1024px) 58vw, 100vw"
        src={project.image}
      />
    );
  }

  const isImageFallback = Boolean(project.image);

  return (
    <div
      aria-hidden={isImageFallback ? undefined : true}
      aria-label={isImageFallback ? "Visual project belum tersedia" : undefined}
      className={`project-art project-art-${project.visual}`}
      role={isImageFallback ? "img" : undefined}
    >
      {isImageFallback ? <span className="project-art-unavailable">Visual belum tersedia</span> : null}
      <span className="project-art-frame" />
      <span className="project-art-mark" />
      <span className="project-art-line" />
    </div>
  );
}
