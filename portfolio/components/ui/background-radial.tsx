"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundRadialProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "emerald" | "cyan" | "grid";
}

export function BackgroundRadial({
  className,
  children,
  variant = "emerald",
}: BackgroundRadialProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-raised)]", className)}>
      {/* ibelick style radial gradient background layer */}
      {variant === "grid" ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--paper)] bg-[radial-gradient(#242938_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      ) : variant === "cyan" ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--paper-raised)] bg-[radial-gradient(circle_600px_at_50%_200px,rgba(0,240,255,0.14),transparent)]" />
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--paper-raised)] bg-[radial-gradient(circle_600px_at_50%_200px,rgba(0,229,153,0.14),transparent)]" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
