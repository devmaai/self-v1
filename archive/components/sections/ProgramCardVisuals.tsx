"use client";

const PIN_GRAD = (
  <defs>
    <linearGradient id="pcv-pin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#d4632e" />
      <stop offset="1" stopColor="#8a2f15" />
    </linearGradient>
  </defs>
);

function MapPin({ x, y, size = 16, you = false }: { x: number; y: number; size?: number; you?: boolean }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size})`}>
      <path
        d={`M${size / 2} 0 C${size * 0.1} 0 0 ${size * 0.25} 0 ${size * 0.5} C0 ${size * 0.8} ${size / 2} ${size} ${size / 2} ${size} C${size / 2} ${size} ${size} ${size * 0.8} ${size} ${size * 0.5} C${size} ${size * 0.25} ${size * 0.9} 0 ${size / 2} 0 Z`}
        fill={you ? "url(#pcv-pin)" : "#c7bca8"}
        stroke={you ? "#5a1f0f" : "#8a8270"}
        strokeWidth="0.5"
      />
      <circle cx={size / 2} cy={size * 0.42} r={size * 0.16} fill="#f5f0e8" />
    </g>
  );
}

/* ---------- 1. Local SEO & GBP — map pack rank climb ---------- */
export function LocalSeoVisual() {
  return (
    <svg className="pcv-svg" viewBox="0 0 240 140" aria-hidden="true">
      {PIN_GRAD}
      {/* faint grid */}
      <g stroke="#c7bca8" strokeWidth="0.5" opacity="0.55">
        {[28, 56, 84, 112].map((y) => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} />
        ))}
        {[60, 120, 180].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="140" />
        ))}
      </g>
      {/* faded competitor pins */}
      <MapPin x={48} y={42} size={14} />
      <MapPin x={170} y={36} size={14} />
      <MapPin x={200} y={92} size={14} />
      <MapPin x={70} y={108} size={14} />

      {/* ranking ladder card */}
      <g className="pcv-rank">
        <rect x="120" y="22" width="106" height="96" rx="4" fill="#f5f0e8" stroke="#c7bca8" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x="128"
            y={32 + i * 24}
            width="90"
            height="18"
            rx="2"
            fill={i === 0 ? "rgba(181,68,31,0.10)" : "transparent"}
            stroke={i === 0 ? "#b5441f" : "#c7bca8"}
            strokeWidth={i === 0 ? "1" : "0.6"}
          />
        ))}
        <text x="134" y="44" fontFamily="ui-monospace, monospace" fontSize="8" fill="#b5441f" fontWeight="600">#1</text>
        <text x="146" y="44" fontFamily="ui-monospace, monospace" fontSize="7" fill="#1a1614">your facility</text>
        <text x="134" y="68" fontFamily="ui-monospace, monospace" fontSize="8" fill="#6b6157">#2</text>
        <text x="134" y="92" fontFamily="ui-monospace, monospace" fontSize="8" fill="#6b6157">#3</text>
      </g>

      {/* big animated pin climbing from #3 toward #1 */}
      <g className="pcv-climber">
        <MapPin x={72} y={104} size={24} you />
      </g>
    </svg>
  );
}

/* ---------- 2. Technical SEO — speed gauge sweep ---------- */
export function TechnicalSeoVisual() {
  return (
    <svg className="pcv-svg" viewBox="0 0 240 140" aria-hidden="true">
      <defs>
        <linearGradient id="pcv-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b5441f" />
          <stop offset="0.6" stopColor="#d4a24c" />
          <stop offset="1" stopColor="#2d5a3d" />
        </linearGradient>
      </defs>
      {/* arc track */}
      <path d="M40 110 A 80 80 0 0 1 200 110" fill="none" stroke="#c7bca8" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 110 A 80 80 0 0 1 200 110" fill="none" stroke="url(#pcv-arc)" strokeWidth="4" strokeLinecap="round" />

      {/* tick marks */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const a = Math.PI * (1 - t);
        const x1 = 120 + Math.cos(a) * 64;
        const y1 = 110 - Math.sin(a) * 64;
        const x2 = 120 + Math.cos(a) * 72;
        const y2 = 110 - Math.sin(a) * 72;
        return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b6157" strokeWidth="1" />;
      })}

      {/* needle (animated) */}
      <g className="pcv-needle" style={{ transformOrigin: "120px 110px" }}>
        <line x1="120" y1="110" x2="120" y2="46" stroke="#1a1614" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="120" cy="110" r="6" fill="#1a1614" />
        <circle cx="120" cy="110" r="2.5" fill="#f5f0e8" />
      </g>

      {/* big number */}
      <text
        x="120"
        y="128"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="14"
        fontWeight="600"
        fill="#1a1614"
      >
        Core Web Vitals
      </text>

      {/* tiny bars rising */}
      <g transform="translate(20, 70)" className="pcv-bars">
        {[10, 14, 18].map((h, i) => (
          <rect key={i} x={i * 7} y={20 - h} width="4" height={h} fill="#b5441f" rx="1" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
      </g>
      <g transform="translate(204, 70)" className="pcv-bars">
        {[18, 14, 10].map((h, i) => (
          <rect key={i} x={i * 7} y={20 - h} width="4" height={h} fill="#d4a24c" rx="1" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- 3. Multi-Location SEO — network of pins ---------- */
export function MultiLocationVisual() {
  const nodes = [
    { x: 50, y: 40 },
    { x: 120, y: 26 },
    { x: 190, y: 50 },
    { x: 70, y: 100 },
    { x: 150, y: 108 },
    { x: 200, y: 96 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
  ];
  return (
    <svg className="pcv-svg" viewBox="0 0 240 140" aria-hidden="true">
      {PIN_GRAD}
      {/* connection lines */}
      <g className="pcv-edges" stroke="#b5441f" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity="0.55">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            style={{ animationDelay: `${i * 250}ms` }}
          />
        ))}
      </g>
      {/* pulsing rings on each pin */}
      {nodes.map((n, i) => (
        <circle
          key={`r-${i}`}
          cx={n.x}
          cy={n.y}
          r="6"
          fill="none"
          stroke="#b5441f"
          strokeWidth="1"
          className="pcv-pulse"
          style={{ animationDelay: `${i * 380}ms` }}
        />
      ))}
      {/* pins */}
      {nodes.map((n, i) => (
        <MapPin key={i} x={n.x} y={n.y + 6} size={14} you={i === 1 || i === 4} />
      ))}
    </svg>
  );
}
