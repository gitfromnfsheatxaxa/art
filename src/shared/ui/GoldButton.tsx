import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type GoldButtonProps = {
  href: string;
  label: string;
  secondary?: boolean;
  className?: string;
};

export function GoldButton({ href, label, secondary, className }: GoldButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 border px-5 py-3 font-heading text-[11px] uppercase tracking-[0.24em] transition-all duration-300",
        secondary
          ? "border-codex-gold/40 bg-transparent text-codex-gold hover:border-codex-glow hover:text-codex-glow"
          : "border-codex-gold bg-codex-gold text-codex-dark hover:scale-[1.03] hover:bg-codex-glow",
        className,
      )}
    >
      <span>{label}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
