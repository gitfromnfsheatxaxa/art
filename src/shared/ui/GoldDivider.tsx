type GoldDividerProps = {
  width?: number;
  className?: string;
};

export function GoldDivider({ width = 180, className }: GoldDividerProps) {
  return (
    <svg
      width={width}
      height="20"
      viewBox={`0 0 ${width} 20`}
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2={width} y2="10" stroke="#D4AF77" strokeWidth="0.75" opacity="0.55" />
      <circle cx={width / 2} cy="10" r="3.5" fill="#D4AF77" opacity="0.9" />
      <circle cx={width / 2 - 22} cy="10" r="1.5" fill="#D4AF77" opacity="0.5" />
      <circle cx={width / 2 + 22} cy="10" r="1.5" fill="#D4AF77" opacity="0.5" />
      <line x1={width / 2 - 42} y1="10" x2={width / 2 - 26} y2="10" stroke="#D4AF77" strokeWidth="1" opacity="0.35" />
      <line x1={width / 2 + 26} y1="10" x2={width / 2 + 42} y2="10" stroke="#D4AF77" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}
