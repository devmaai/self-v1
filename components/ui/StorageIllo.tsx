export default function StorageIllo() {
  return (
    <svg className="storage-illo" viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#b5441f" opacity="0.3" />
        </pattern>
        <linearGradient id="doorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a24c" />
          <stop offset="100%" stopColor="#b5441f" />
        </linearGradient>
      </defs>

      {/* background panel */}
      <rect x="30" y="40" width="340" height="360" fill="url(#dots)" rx="3" />

      {/* ground line */}
      <line x1="20" y1="400" x2="380" y2="400" stroke="#1a1614" strokeWidth="2" />

      {/* storage facility building */}
      <g>
        <polygon points="60,140 340,140 320,120 80,120" fill="#1a1614" />
        <rect x="60" y="140" width="280" height="260" fill="#2d2622" />

        {/* doors row 1 */}
        {[
          { x: 80, fill: "#d4a24c" },
          { x: 130, fill: "#b5441f" },
          { x: 180, fill: "#d4a24c" },
          { x: 230, fill: "#8a2f15" },
          { x: 280, fill: "#d4a24c" },
        ].map(({ x, fill }) => (
          <g key={x} transform={`translate(${x}, 160)`}>
            <rect width="40" height="60" fill={fill} />
            <line x1="20" y1="4" x2="20" y2="60" stroke="#1a1614" strokeWidth="1" opacity="0.3" />
            {[4, 14, 24, 34, 44, 54].map((y) => (
              <line key={y} x1="4" y1={y} x2="36" y2={y} stroke="#1a1614" strokeWidth="0.5" opacity="0.4" />
            ))}
          </g>
        ))}

        {/* doors row 2 */}
        {[
          { x: 80, fill: "#b5441f" },
          { x: 130, fill: "#d4a24c" },
          { x: 180, fill: "#8a2f15" },
          { x: 230, fill: "#d4a24c" },
          { x: 280, fill: "#b5441f" },
        ].map(({ x, fill }) => (
          <g key={x} transform={`translate(${x}, 240)`}>
            <rect width="40" height="60" fill={fill} />
            <line x1="20" y1="4" x2="20" y2="60" stroke="#1a1614" strokeWidth="1" opacity="0.3" />
            {[14, 24, 34, 44].map((y) => (
              <line key={y} x1="4" y1={y} x2="36" y2={y} stroke="#1a1614" strokeWidth="0.5" opacity="0.4" />
            ))}
          </g>
        ))}

        {/* base row */}
        <rect x="60" y="320" width="280" height="80" fill="#1a1614" />
        <rect x="60" y="320" width="280" height="4" fill="#d4a24c" />
      </g>

      {/* search magnifier accent */}
      <g transform="translate(300, 50)">
        <circle cx="25" cy="25" r="22" fill="#f5f0e8" stroke="#1a1614" strokeWidth="2" />
        <circle cx="25" cy="25" r="14" fill="none" stroke="#b5441f" strokeWidth="2.5" />
        <line x1="36" y1="36" x2="48" y2="48" stroke="#1a1614" strokeWidth="3" strokeLinecap="round" />
        <text
          x="25"
          y="30"
          textAnchor="middle"
          fontFamily="var(--font-fraunces), serif"
          fontSize="10"
          fill="#b5441f"
          fontWeight="700"
        >
          #1
        </text>
      </g>
    </svg>
  );
}
