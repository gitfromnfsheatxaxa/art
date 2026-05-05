"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { LoadingScreen } from "@/shared/ui/LoadingScreen";

type PreloaderProps = {
  imageSources: string[];
  audioSources?: string[];
  onReady?: () => void;
};

export function Preloader({ imageSources, audioSources, onReady }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // Stable reference — avoids re-running effect when parent re-renders with inline [] default
  const stableAudio = useMemo(() => audioSources ?? [], [audioSources]);

  const assets = useMemo(
    () => [...new Set([...imageSources, ...stableAudio])],
    [imageSources, stableAudio],
  );

  useEffect(() => {
    const total = assets.length;

    if (total === 0) {
      setVisible(false);
      onReadyRef.current?.();
      return;
    }

    let isMounted = true;
    let loaded = 0;

    const finishOne = () => {
      if (!isMounted) return;
      loaded += 1;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        window.setTimeout(() => {
          if (!isMounted) return;
          setVisible(false);
          onReadyRef.current?.();
        }, 700);
      }
    };

    imageSources.forEach((src) => {
      const img = new window.Image();
      img.onload = finishOne;
      img.onerror = finishOne;
      img.src = src;
    });

    stableAudio.forEach((src) => {
      const audio = new window.Audio();
      audio.preload = "auto";
      audio.oncanplaythrough = finishOne;
      audio.onerror = finishOne;
      audio.src = src;
      audio.load();
    });

    return () => {
      isMounted = false;
    };
    // Only re-run when the actual asset set changes, not on every render cycle.
    // onReady is accessed via ref so it's always current without being a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  return <LoadingScreen progress={progress} visible={visible} />;
}
