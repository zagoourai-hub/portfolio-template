"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Disc, Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  genre?: string;
  duration?: string;
}

export const favoriteTracks: Track[] = [
  {
    id: "1",
    title: "Synthwave Dev Flow",
    artist: "Lofi Developer Beats",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Synthwave / Cyberpunk",
    duration: "6:12",
  },
  {
    id: "2",
    title: "Late Night Coding & Rain",
    artist: "Chillhop Music Lab",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: "Lofi Hip Hop",
    duration: "7:05",
  },
  {
    id: "3",
    title: "Deep Focus Ambient",
    artist: "Code & Coffee Soundscapes",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: "Ambient / Focus",
    duration: "5:44",
  },
];

export function MusicPlayerWidget() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = favoriteTracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % favoriteTracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + favoriteTracks.length) % favoriteTracks.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setProgress((cur / dur) * 100);

      const mins = Math.floor(cur / 60);
      const secs = Math.floor(cur % 60);
      setCurrentTimeStr(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-raised)]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
          <Disc className={`h-4 w-4 ${isPlaying ? "animate-spin" : ""}`} />
          <span>DEV FAVORITE SOUNDTRACK</span>
        </div>
        <span className="text-[var(--muted-foreground)]">
          {currentTrackIndex + 1} of {favoriteTracks.length}
        </span>
      </div>

      {/* Player Main Layout */}
      <div className="grid gap-6 sm:grid-cols-[180px_1fr] sm:items-center">
        {/* Cover Art */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--paper)] group">
          <Image
            src={currentTrack.cover}
            alt={currentTrack.title}
            fill
            sizes="180px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isPlaying && (
            <div className="absolute bottom-2 right-2 flex items-end gap-1 bg-black/60 backdrop-blur p-1.5 rounded-md">
              <span className="h-3 w-1 bg-[var(--accent)] animate-bounce" />
              <span className="h-5 w-1 bg-[var(--accent)] animate-bounce [animation-delay:0.2s]" />
              <span className="h-2 w-1 bg-[var(--accent)] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Controls & Track Metadata */}
        <div className="space-y-5">
          <div>
            <span className="font-mono text-[10px] font-semibold text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper)]">
              {currentTrack.genre}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mt-2">
              {currentTrack.title}
            </h3>
            <p className="font-mono text-xs text-[var(--muted-foreground)]">
              {currentTrack.artist}
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-1.5 font-mono text-xs">
            <div
              onClick={handleProgressClick}
              className="h-2 w-full rounded-full bg-[var(--paper)] border border-[var(--line)] cursor-pointer overflow-hidden relative"
            >
              <div
                className="h-full bg-[var(--accent)] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[var(--muted-foreground)]">
              <span>{currentTimeStr}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Playback Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="button-outline focus-ring p-2 min-h-0 rounded-full"
                type="button"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={togglePlay}
                className="button-primary focus-ring p-3 min-h-0 rounded-full text-[var(--accent-ink)]"
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="button-outline focus-ring p-2 min-h-0 rounded-full"
                type="button"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={toggleMute}
              className="button-outline focus-ring p-2 min-h-0 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              type="button"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tracklist Drawer */}
      <div className="border-t border-[var(--line)] pt-4 space-y-2">
        <span className="font-mono text-xs text-[var(--muted-foreground)]">Playlist Tracklist:</span>
        <div className="space-y-1.5 font-mono text-xs">
          {favoriteTracks.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setIsPlaying(true);
              }}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors cursor-pointer ${
                idx === currentTrackIndex
                  ? "border-[var(--accent)] bg-[var(--paper)] text-[var(--foreground)]"
                  : "border-[var(--line)] bg-[var(--paper-raised)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="text-[var(--accent)] font-semibold">{idx + 1}.</span>
                <span className="truncate font-medium">{track.title} — {track.artist}</span>
              </div>
              <span className="text-[10px] text-[var(--muted-foreground)] shrink-0 ml-2">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
