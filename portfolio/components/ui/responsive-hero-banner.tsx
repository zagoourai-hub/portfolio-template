"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Code2, Play } from 'lucide-react';
import Link from 'next/link';

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface Partner {
    name: string;
    href: string;
}

interface ResponsiveHeroBannerProps {
    showHeader?: boolean;
    logoUrl?: string;
    backgroundImageUrl?: string;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    showHeader = false,
    logoUrl = "",
    backgroundImageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80",
    navLinks = [
        { label: "Home", href: "/", isActive: true },
        { label: "Projects", href: "/projects" },
        { label: "Tech Stack", href: "/#skills" },
        { label: "Workflow", href: "/#process" },
        { label: "Contact", href: "/contact" }
    ],
    ctaButtonText = "Contact",
    ctaButtonHref = "/contact",
    badgeLabel = "2026 // GenZ Dev",
    badgeText = "Fullstack Next.js 16 & Modern Web Architecture",
    title = "Koding Project Sekolah,",
    titleLine2 = "Tanpa AI Slop.",
    description = "Experience modern web development through clean code, type-safe architecture, and high-performance user interfaces.",
    primaryButtonText = "Explore Projects",
    primaryButtonHref = "/projects",
    secondaryButtonText = "Get in Touch",
    secondaryButtonHref = "/contact",
    partnersTitle = "Technologies & Tools I Use Daily",
    partners = [
        { name: "Next.js 16", href: "https://nextjs.org" },
        { name: "React 19", href: "https://react.dev" },
        { name: "Tailwind v4", href: "https://tailwindcss.com" },
        { name: "TypeScript", href: "https://www.typescriptlang.org" },
        { name: "Prisma v7", href: "https://www.prisma.io" }
    ]
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="w-full isolate overflow-hidden relative min-h-[85vh] flex flex-col justify-center">
            {/* Background Image with Ambient Overlay & Gradient Fade to Body */}
            <img
                src={backgroundImageUrl}
                alt=""
                className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 opacity-40 pointer-events-none"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--paper)]" />

            {/* Header (Only rendered if showHeader === true to avoid duplicating site header) */}
            {showHeader && (
                <header className="z-10 xl:top-4 relative">
                    <div className="mx-6">
                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 font-mono text-sm font-bold text-white"
                            >
                                <Code2 className="h-5 w-5 text-[var(--accent)]" />
                                <span>risz@dev</span>
                            </Link>

                            <nav className="hidden md:flex items-center gap-2">
                                <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                                    {navLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            className={`px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${
                                                link.isActive ? 'text-white' : 'text-white/70'
                                            }`}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                    <a
                                        href={ctaButtonHref}
                                        className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-2 text-sm font-medium text-[var(--accent-ink)] hover:bg-[var(--accent-strong)] font-mono transition-colors"
                                    >
                                        {ctaButtonText}
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </nav>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white"
                                aria-expanded={mobileMenuOpen}
                                aria-label="Toggle menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M4 5h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 19h16" />
                                </svg>
                            </button>
                        </div>

                        {mobileMenuOpen && (
                            <div className="md:hidden mt-4 rounded-2xl bg-black/90 backdrop-blur border border-white/10 p-4 space-y-3 font-mono text-sm">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="block text-white/90 hover:text-white py-1.5"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </header>
            )}

            {/* Hero Main Content */}
            <div className="z-10 relative py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mx-auto max-w-3xl text-center space-y-6">
                        <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
                            <span className="inline-flex items-center text-xs font-semibold text-[var(--accent-ink)] bg-[var(--accent)] rounded-full py-0.5 px-2.5 font-mono">
                                {badgeLabel}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-white/90 font-mono">
                                {badgeText}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] animate-fade-slide-in-2">
                            {title}
                            <br className="hidden sm:block" />
                            <span className="text-[var(--accent)] font-mono">{titleLine2}</span>
                        </h1>

                        <p className="text-base sm:text-lg animate-fade-slide-in-3 text-white/80 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:gap-4 pt-4 gap-3 items-center justify-center animate-fade-slide-in-4">
                            <a
                                href={primaryButtonHref}
                                className="inline-flex items-center gap-2 hover:bg-[var(--accent-strong)] text-sm font-mono font-semibold text-[var(--accent-ink)] bg-[var(--accent)] rounded-full py-3 px-6 transition-all transform hover:-translate-y-0.5"
                            >
                                {primaryButtonText}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-6 py-3 text-sm font-mono font-medium text-white ring-1 ring-white/15 backdrop-blur transition-all"
                            >
                                {secondaryButtonText}
                                <Play className="h-3.5 w-3.5 fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* Tech Badges Row */}
                    <div className="mx-auto mt-16 max-w-4xl space-y-4">
                        <p className="animate-fade-slide-in-1 text-xs font-mono text-white/60 text-center uppercase tracking-wider">
                            {partnersTitle}
                        </p>
                        <div className="flex flex-wrap animate-fade-slide-in-2 items-center justify-center gap-2 sm:gap-3">
                            {partners.map((partner, index) => (
                                <a
                                    key={index}
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/80 backdrop-blur transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    {partner.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;
