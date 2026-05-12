"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { LoadingScreen } from "@/shared/ui/LoadingScreen";

type PreloaderProps = {
  /** Hero/critical images that should preload before showing content */
  imageSources: string[];
  /** Additional images to preload asynchronously in background (don't block FCP) */
  backgroundImages?: string[];
  audioSources?: string[];
  onReady?: () => void;
};

export function Preloader({ imageSources, backgroundImages, onReady }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // Critical images that must load before hiding preloader
  const assets = useMemo(
    () => [...new Set(imageSources)],
    [imageSources],
  );

  // Background images that load async (don't block FCP)
  const backgroundAssets = useMemo(
    () => [...new Set(backgroundImages ?? [])],
    [backgroundImages],
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
        }, 200);
      }
    };

    assets.forEach((src) => {
      const img = new window.Image();
      img.onload = finishOne;
      img.onerror = finishOne;
      img.src = src;
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  // Preload background images without blocking
  useEffect(() => {
    backgroundAssets.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [backgroundAssets]);

  return <LoadingScreen progress={progress} visible={visible} />;
}
