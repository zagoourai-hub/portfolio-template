"use client";

import React, { useEffect, useState } from "react";
import { Clock as ClockIcon, Globe, Moon, Sparkles, Sun, Zap } from "lucide-react";

export interface TimeZoneOption {
  city: string;
  label: string;
  zone: string;
  offset: string;
}

const timeZones: TimeZoneOption[] = [
  { city: "Jawa Barat", label: "WIB (Local)", zone: "Asia/Jakarta", offset: "GMT+7" },
  { city: "Tokyo", label: "JST", zone: "Asia/Tokyo", offset: "GMT+9" },
  { city: "London", label: "BST", zone: "Europe/London", offset: "GMT+1" },
  { city: "San Francisco", label: "PST", zone: "America/Los_Angeles", offset: "GMT-7" },
];

export function ClockSection() {
  const [selectedZone, setSelectedZone] = useState<TimeZoneOption>(timeZones[0]);
  const [time, setTime] = useState<{ hours: string; minutes: string; seconds: string; ampm: string; fullDate: string }>({
    hours: "00",
    minutes: "00",
    seconds: "00",
    ampm: "AM",
    fullDate: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const isWib = selectedZone.zone === "Asia/Jakarta";
      
      const options: Intl.DateTimeFormatOptions = {
        timeZone: selectedZone.zone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !isWib,
      };

      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: selectedZone.zone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);

      let hours = "00";
      let minutes = "00";
      let seconds = "00";
      let ampm = isWib ? "24H" : "AM";

      parts.forEach((part) => {
        if (part.type === "hour") hours = part.value;
        if (part.type === "minute") minutes = part.value;
        if (part.type === "second") seconds = part.value;
        if (part.type === "dayPeriod") ampm = part.value.toUpperCase();
      });

      const dateStr = new Intl.DateTimeFormat("id-ID", dateOptions).format(now);

      setTime({
        hours,
        minutes,
        seconds,
        ampm,
        fullDate: dateStr,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedZone]);

  const hourNumber = parseInt(time.hours, 10);
  const isNight = selectedZone.zone === "Asia/Jakarta"
    ? hourNumber >= 18 || hourNumber < 6
    : time.ampm === "PM"
      ? hourNumber >= 6 && hourNumber !== 12
      : hourNumber < 6 || hourNumber === 12;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--line-strong)] bg-[var(--paper-raised)]/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
      {/* 21st.dev Ambient Radial Light */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(0,229,153,0.08),transparent)] pointer-events-none" />

      {/* Top Bar Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--line)] pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-card)] text-[var(--accent)] shadow-xl">
            <ClockIcon className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">21st.dev Live Clock</span>
              <span className="font-mono text-xs text-[var(--accent)]">{selectedZone.offset}</span>
            </div>
            <h3 className="font-bold text-xl text-[var(--foreground)]">Developer Live Time &amp; Zone</h3>
          </div>
        </div>

        <div className="status-badge w-fit">
          <span className="dot-live" />
          <span>{selectedZone.city.toUpperCase()}{" // LIVE"}</span>
        </div>
      </div>

      {/* Main Clock Grid */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        {/* Left Column: Digital Flip Display */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)]">
            {isNight ? (
              <Moon className="h-4 w-4 text-[var(--cyan-accent)]" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400" />
            )}
            <span>{time.fullDate || "Loading local date..."}</span>
          </div>

          {/* 21st.dev Digital Clock Digit Cards */}
          <div className="flex items-center gap-2 sm:gap-4 font-mono">
            {/* Hours */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--paper)]/90 px-4 sm:px-6 py-4 min-w-[75px] sm:min-w-[110px] shadow-inner backdrop-blur">
              <span className="text-4xl sm:text-6xl font-extrabold text-[var(--foreground)] tracking-tight">
                {time.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--muted-foreground)] font-semibold uppercase mt-1">
                HOURS
              </span>
            </div>

            <span className="text-3xl sm:text-5xl font-bold text-[var(--accent)] animate-pulse">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--paper)]/90 px-4 sm:px-6 py-4 min-w-[75px] sm:min-w-[110px] shadow-inner backdrop-blur">
              <span className="text-4xl sm:text-6xl font-extrabold text-[var(--accent)] tracking-tight">
                {time.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--muted-foreground)] font-semibold uppercase mt-1">
                MINUTES
              </span>
            </div>

            <span className="text-3xl sm:text-5xl font-bold text-[var(--accent)] animate-pulse">:</span>

            {/* Seconds & AM/PM */}
            <div className="flex flex-col justify-between gap-2">
              <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 min-w-[50px] sm:min-w-[65px]">
                <span className="text-lg sm:text-2xl font-bold text-[var(--cyan-accent)]">
                  {time.seconds}
                </span>
                <span className="text-[9px] text-[var(--muted-foreground)] font-semibold">SEC</span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--accent-ink)] bg-[var(--accent)] rounded-lg px-2.5 py-1 text-center shadow">
                {time.ampm}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            Zona waktu saat ini: <strong className="text-[var(--foreground)]">{selectedZone.city}</strong> ({selectedZone.label}). Jam ini berdetik secara real-time langsung di browser kamu.
          </p>
        </div>

        {/* Right Column: Timezone Selector Buttons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] border-b border-[var(--line)] pb-2">
            <Globe className="h-4 w-4 text-[var(--accent)]" />
            <span>Pilih Zona Waktu Dunia:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeZones.map((tz) => (
              <button
                key={tz.city}
                onClick={() => setSelectedZone(tz)}
                className={`flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs transition-all text-left ${
                  selectedZone.city === tz.city
                    ? "border-[var(--accent)] bg-[var(--paper)] text-[var(--foreground)] shadow-md"
                    : "border-[var(--line)] bg-[var(--paper-raised)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--line-strong)]"
                }`}
                type="button"
              >
                <div>
                  <p className="font-bold text-sm text-[var(--foreground)]">{tz.city}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">{tz.label}</p>
                </div>
                <span className="text-[10px] font-semibold text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-card)]">
                  {tz.offset}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
