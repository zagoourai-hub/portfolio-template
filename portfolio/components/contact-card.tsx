"use client";

import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { DiscordIcon, GithubIcon } from "@/components/icons";
import { siteConfig } from "@/data/portfolio";

export function ContactCard() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText(siteConfig.discord);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !senderName) return;
    setSent(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] max-w-full overflow-hidden">
      {/* Contact Quick Actions */}
      <div className="space-y-6 max-w-full">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-5 sm:p-6 space-y-5">
          <h3 className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] border-b border-[var(--line)] pb-3">
            {"// Direct Connect"}
          </h3>

          {/* Email Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] min-w-0">
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              <Mail className="h-4 w-4 text-[var(--accent)] shrink-0" />
              <div className="truncate min-w-0">
                <p className="font-mono text-xs text-[var(--muted-foreground)]">Email Address</p>
                <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate">
                  {siteConfig.email}
                </p>
              </div>
            </div>
            <button
              onClick={copyEmail}
              className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0 shrink-0 w-full sm:w-auto"
              type="button"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="text-[var(--accent)] font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="font-mono">Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Discord Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] min-w-0">
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              <DiscordIcon className="h-4 w-4 text-[var(--cyan-accent)] shrink-0" />
              <div className="truncate min-w-0">
                <p className="font-mono text-xs text-[var(--muted-foreground)]">Discord Handle</p>
                <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate">
                  {siteConfig.discord}
                </p>
              </div>
            </div>
            <button
              onClick={copyDiscord}
              className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0 shrink-0 w-full sm:w-auto"
              type="button"
            >
              {copiedDiscord ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="text-[var(--accent)] font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="font-mono">Copy Discord</span>
                </>
              )}
            </button>
          </div>

          {/* GitHub Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] min-w-0">
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              <GithubIcon className="h-4 w-4 text-[var(--foreground)] shrink-0" />
              <div className="truncate min-w-0">
                <p className="font-mono text-xs text-[var(--muted-foreground)]">GitHub Profile</p>
                <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate">
                  github.com/example/risz
                </p>
              </div>
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0 font-mono shrink-0 w-full sm:w-auto text-center"
            >
              Visit Profile ↗
            </a>
          </div>
        </div>
      </div>

      {/* Quick Interactive Form */}
      <div className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-5 sm:p-8 space-y-6">
        <h3 className="font-mono text-xs sm:text-sm font-semibold text-[var(--foreground)] border-b border-[var(--line)] pb-3">
          {"// Send Quick Message"}
        </h3>

        {sent ? (
          <div className="rounded-lg border border-[var(--accent)] bg-[var(--paper)] p-5 sm:p-6 space-y-3 font-mono text-center">
            <p className="text-[var(--accent)] font-bold">✓ Message Formatted!</p>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Terima kasih <span className="text-[var(--foreground)] font-semibold">{senderName}</span>! Untuk mengirimkan langsung via email client kamu, klik tombol di bawah:
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=Message%20from%20${encodeURIComponent(senderName)}&body=${encodeURIComponent(message)}`}
              className="button-primary focus-ring text-xs inline-flex w-full sm:w-auto"
            >
              <span>Open Email App</span>
              <Send className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-[var(--muted-foreground)]">Nama / Handle:</label>
              <input
                id="name-input"
                type="text"
                required
                placeholder="misal: Budi (Temen Sekelas)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2.5 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message-input" className="text-[var(--muted-foreground)]">Pesan / Ide Project:</label>
              <textarea
                id="message-input"
                required
                rows={4}
                placeholder="Tulis pesan atau obrolan seputar koding..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2.5 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <button type="submit" className="button-primary focus-ring w-full text-xs">
              <span>Format Email Message</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
