type DropCapProps = {
  letter: string;
};

export function DropCap({ letter }: DropCapProps) {
  return (
    <span className="float-left mr-3 mt-1 font-heading text-6xl leading-[0.78] text-codex-gold drop-shadow-[0_0_14px_rgba(232,199,127,0.55)]">
      {letter}
    </span>
  );
}
