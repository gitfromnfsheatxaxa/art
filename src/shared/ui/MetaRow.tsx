type MetaRowProps = {
  label: string;
  value: string;
};

export function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="min-w-24 font-heading text-[11px] uppercase tracking-[0.18em] text-codex-gold/80">
        {label}
      </span>
      <span className="text-base text-codex-parchment/85">{value}</span>
    </div>
  );
}
