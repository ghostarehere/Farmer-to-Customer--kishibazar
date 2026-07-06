// ══════════════════════════════════════════════════════════════
// MiniChart — Lightweight inline bar chart (no external chart lib)
// ══════════════════════════════════════════════════════════════
export default function MiniChart({ data, color, height = 70 }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: color,
            borderRadius: "3px 3px 0 0",
            height: `${(v / max) * height}px`,
            opacity: 0.75 + (0.25 * i) / data.length,
            minHeight: 2,
            transition: "height .5s",
          }}
        />
      ))}
    </div>
  );
}
