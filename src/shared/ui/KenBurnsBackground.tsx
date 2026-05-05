"use client";

import { memo, useState } from "react";
import Image from "next/image";

import { cn } from "@/shared/lib/utils";

type KenBurnsBackgroundProps = {
  src: string;
  alt?: string;
  active?: boolean;
  direction?: "in" | "out";
  /** When true, portrait images use object-contain so the full artwork is visible.
   *  Leave false (default) for full-bleed backgrounds that should always fill the screen. */
  portraitContain?: boolean;
  priority?: boolean;
  objectPosition?: string;
  overlayClassName?: string;
  className?: string;
  onPortraitDetected?: (isPortrait: boolean) => void;
};

export const KenBurnsBackground = memo(function KenBurnsBackground({
  src,
  alt = "",
  active = true,
  direction = "in",
  portraitContain = false,
  priority,
  objectPosition = "50% 50%",
  overlayClassName,
  className,
  onPortraitDetected,
}: KenBurnsBackgroundProps) {
  const [isPortrait, setIsPortrait] = useState(false);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const portrait = img.naturalHeight > img.naturalWidth * 1.1;
    setIsPortrait(portrait);
    onPortraitDetected?.(portrait);
  };

  const effectivePortrait = portraitContain && isPortrait;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", effectivePortrait && "bg-codex-dark", className)}>
      <div
        className={cn(
          "absolute inset-[-10%]",
          active
            ? direction === "in"
              ? "animate-ken-burns-in"
              : "animate-ken-burns-out"
            : undefined,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={effectivePortrait ? "object-contain" : "object-cover"}
          style={{ objectPosition }}
          sizes="100vw"
          onLoad={handleImageLoad}
        />
      </div>
      {!effectivePortrait && <div className={cn("absolute inset-0 codex-vignette", overlayClassName)} />}
    </div>
  );
});
