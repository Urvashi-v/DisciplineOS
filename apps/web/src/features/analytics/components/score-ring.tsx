interface ScoreRingProps {
  value: number;
  size?: number;
}

/** Circular progress ring used for the Discipline Score. Token-driven strokes. */
export function ScoreRing({ value, size = 88 }: ScoreRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const strokeWidth = 6;
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        className="stroke-muted"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="stroke-foreground transition-[stroke-dashoffset] duration-1000 ease-out"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground text-sm font-semibold"
      >
        {clamped}
      </text>
    </svg>
  );
}
