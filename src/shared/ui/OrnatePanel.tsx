import { cn } from "@/shared/lib/utils";

type OrnatePanelProps = {
  className?: string;
  children: React.ReactNode;
};

export function OrnatePanel({ className, children }: OrnatePanelProps) {
  return <div className={cn("codex-frame relative", className)}>{children}</div>;
}
