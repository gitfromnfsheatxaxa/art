"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/shared/lib/utils";

type KenBurnsBackgroundProps = {
  src: string;
  alt?: string;
  active?: boolean;
  direction?: "in" | "out";
  priority?: boolean;
  objectPosition?: string;
  overlayClassName?: string;
  className?: string;
  onPortraitDetected?: (isPortrait: boolean) => void;
};

export function KenBurnsBackground({
  src,
  alt = "",
  active = true,
  direction = "in",
  priority,
  objectPosition = "50% 50%",
  overlayClassName,
  className,
  onPortraitDetected,
}: KenBurnsBackgroundProps) {
  const [isPortrait, setIsPortrait] = useState(false);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const portrait = img.naturalHeight > img.naturalWidth;
    setIsPortrait(portrait);
    onPortraitDetected?.(portrait);
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-[-10%]"
        initial={{ scale: direction === "in" ? 1 : 1.12 }}
        animate={{ scale: active ? (direction === "in" ? 1.12 : 1) : 1.03 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
          sizes="100vw"
          onLoad={handleImageLoad}
        />
      </motion.div>
      {!isPortrait && <div className={cn("absolute inset-0 codex-vignette", overlayClassName)} />}
    </div>
  );
}
