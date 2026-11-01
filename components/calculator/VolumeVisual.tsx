type VolumeVisualProps = {
  volume: number;
  capacity: number;
  unitLabel: string;
};

const COLUMNS = 4;
const ROWS = 4;
const LAYERS = 3;
const BOX_COUNT = COLUMNS * ROWS * LAYERS;

const BACK = { x: 160, y: 58 };
const AXIS_A = { x: 27.5, y: 13.75 };
const AXIS_B = { x: -27.5, y: 13.75 };
const BOX_HEIGHT = 14;
const BOX_HALF_WIDTH = 10;
const BOX_HALF_HEIGHT = 5;

type IsoBox = { i: number; j: number; k: number; order: number };

const boxes: IsoBox[] = [];
for (let k = 0; k < LAYERS; k += 1) {
  for (let i = 0; i < COLUMNS; i += 1) {
    for (let j = 0; j < ROWS; j += 1) {
      boxes.push({ i, j, k, order: k * 100 + i + j });
    }
  }
}
boxes.sort((a, b) => a.order - b.order || a.i - b.i);

export function VolumeVisual({ volume, capacity, unitLabel }: VolumeVisualProps) {
  const safeCapacity = Math.max(capacity, 1);
  const percent = volume <= 0 ? 0 : Math.min(100, Math.max(1, Math.round((volume / safeCapacity) * 100)));
  const visibleBoxes = percent === 0 ? 0 : Math.max(1, Math.round((percent / 100) * BOX_COUNT));
  const shownBoxes = boxes.slice(0, visibleBoxes);
  const capacityText = `${Math.round(safeCapacity)} cu ft practical capacity`;
  const statusText = percent === 0 ? "Ready for your items" : percent >= 90 ? "Nearly full" : "Room to pack and move";

  return (
    <div className="calculator-volume-visual">
      <svg
        viewBox="0 0 320 190"
        role="img"
        aria-label={`${unitLabel} unit estimated ${percent}% full`}
      >
        <title>{`${unitLabel} unit estimated ${percent}% full`}</title>
        <defs>
          <linearGradient id="unit-floor" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f8fcff" />
            <stop offset="1" stopColor="#e4f0f7" />
          </linearGradient>
          <linearGradient id="unit-wall-left" x1="0" x2="1">
            <stop offset="0" stopColor="#e6f3fa" />
            <stop offset="1" stopColor="#cfe5f1" />
          </linearGradient>
          <linearGradient id="unit-wall-right" x1="0" x2="1">
            <stop offset="0" stopColor="#d7eaf4" />
            <stop offset="1" stopColor="#c1dce9" />
          </linearGradient>
        </defs>

        {/* Floor */}
        <polygon points="160,58 270,113 160,168 50,113" fill="url(#unit-floor)" stroke="#8eb7d0" strokeWidth="1.2" />

        {/* Floor grid */}
        <g stroke="#c6d5e1" strokeWidth="0.7" opacity="0.75">
          {[1, 2, 3].map((j) => {
            const startX = BACK.x + AXIS_B.x * j;
            const startY = BACK.y + AXIS_B.y * j;
            return (
              <line
                key={`a-${j}`}
                x1={startX}
                y1={startY}
                x2={startX + AXIS_A.x * 4}
                y2={startY + AXIS_A.y * 4}
              />
            );
          })}
          {[1, 2, 3].map((i) => {
            const startX = BACK.x + AXIS_A.x * i;
            const startY = BACK.y + AXIS_A.y * i;
            return (
              <line
                key={`b-${i}`}
                x1={startX}
                y1={startY}
                x2={startX + AXIS_B.x * 4}
                y2={startY + AXIS_B.y * 4}
              />
            );
          })}
        </g>

        {/* Back walls */}
        <polygon points="50,113 160,58 160,18 50,73" fill="url(#unit-wall-left)" stroke="#8eb7d0" strokeWidth="1.2" />
        <polygon points="160,58 270,113 270,73 160,18" fill="url(#unit-wall-right)" stroke="#8eb7d0" strokeWidth="1.2" />
        <path d="M66 105 160 58 254 105" fill="none" stroke="#fff" strokeWidth="1" opacity=".8" />

        {/* Boxes, drawn back to front */}
        {shownBoxes.map(({ i, j, k }) => {
          const cx = BACK.x + (i + 0.5) * AXIS_A.x + (j + 0.5) * AXIS_B.x;
          const cy = BACK.y + (i + 0.5) * AXIS_A.y + (j + 0.5) * AXIS_B.y;
          const layerOffset = k * (BOX_HEIGHT + BOX_HALF_HEIGHT);
          const top = cy - BOX_HEIGHT - BOX_HALF_HEIGHT - layerOffset;
          const mid = cy - BOX_HEIGHT - layerOffset;
          const bottom = cy + BOX_HALF_HEIGHT;
          const alt = (i + j) % 2 === 0;
          return (
            <g key={`box-${i}-${j}-${k}`} stroke="#b97c2e" strokeWidth="0.7" strokeLinejoin="round">
              <polygon
                points={`${cx},${top} ${cx + BOX_HALF_WIDTH},${mid} ${cx},${mid + BOX_HALF_HEIGHT} ${cx - BOX_HALF_WIDTH},${mid}`}
                fill={alt ? "#f6c97d" : "#f2bd69"}
              />
              <polygon
                points={`${cx - BOX_HALF_WIDTH},${mid} ${cx},${mid + BOX_HALF_HEIGHT} ${cx},${bottom} ${cx - BOX_HALF_WIDTH},${cy}`}
                fill={alt ? "#d99a45" : "#cf8f3c"}
              />
              <polygon
                points={`${cx + BOX_HALF_WIDTH},${mid} ${cx},${mid + BOX_HALF_HEIGHT} ${cx},${bottom} ${cx + BOX_HALF_WIDTH},${cy}`}
                fill={alt ? "#e8ad5c" : "#dfa252"}
              />
            </g>
          );
        })}
      </svg>

      <div className="calculator-volume-meta">
        <div>
          <span>{unitLabel} unit</span>
          <small>{capacityText}</small>
        </div>
        <strong>{percent}% full</strong>
      </div>
      <div className="calculator-volume-bar" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>
      <p className="calculator-volume-status" aria-live="polite">{statusText}</p>
    </div>
  );
}
