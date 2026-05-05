"use client";

import { useEffect, useRef } from "react";

import { useMusicStore } from "@/features/player/store";

export function MusicPlayer() {
  const currentTrack = useMusicStore((state) => state.currentTrack);
  const interactionReady = useMusicStore((state) => state.interactionReady);
  const musicEnabled = useMusicStore((state) => state.musicEnabled);
  const unlockInteraction = useMusicStore((state) => state.unlockInteraction);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const unlock = () => unlockInteraction();

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [unlockInteraction]);

  useEffect(() => {
    if (!interactionReady || !currentTrack || !musicEnabled) {
      // Pause audio if music is disabled
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

    const audio = audioRef.current;
    let frame = 0;

    const fade = (target: number) => {
      const step = () => {
        if (!audio) {
          return;
        }

        const delta = target - audio.volume;
        if (Math.abs(delta) < 0.02) {
          audio.volume = target;
          return;
        }

        audio.volume = Math.max(0, Math.min(0.45, audio.volume + delta * 0.15));
        frame = window.requestAnimationFrame(step);
      };

      frame = window.requestAnimationFrame(step);
    };

    if (audio.src !== new URL(currentTrack, window.location.origin).toString()) {
      fade(0);
      window.setTimeout(async () => {
        audio.src = currentTrack;
        audio.load();
        try {
          await audio.play();
          fade(0.45);
        } catch {
          // User interaction is required; store unlock handles the next attempt.
        }
      }, 220);
    } else if (audio.paused) {
      void audio.play().then(() => fade(0.45)).catch(() => undefined);
    }

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [currentTrack, interactionReady, musicEnabled]);

  return null;
}
