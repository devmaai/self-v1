import { unitFloorPlans } from "@/lib/storageCalculator";

type UnitFloorPlanProps = {
  width: number;
  length: number;
};

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 230;
const PADDING = 34;

export function UnitFloorPlan({ width, length }: UnitFloorPlanProps) {
  const blocks = unitFloorPlans[`${width}x${length}`] ?? [];
  const scale = Math.min(
    (VIEW_WIDTH - PADDING * 2) / Math.max(length, 1),
    (VIEW_HEIGHT - PADDING * 2) / Math.max(width, 1),
  );
  const unitWidth = length * scale;
  const unitHeight = width * scale;
  const x = (VIEW_WIDTH - unitWidth) / 2;
  const y = (VIEW_HEIGHT - unitHeight) / 2;
  const gridId = `floor-grid-${width}-${length}`;
  const doorWidth = Math.min(scale * 3, unitWidth * 0.26);
  const doorStart = x + unitWidth * 0.42;
  const fontSize = Math.max(7, Math.min(10, scale * 0.9));

  return (
    <div className="calculator-floor-plan">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="img"
        aria-labelledby={`floor-title-${width}-${length}`}
      >
        <title id={`floor-title-${width}-${length}`}>
          Top-down floor plan of a {width} by {length} foot storage unit
        </title>
        <defs>
          <pattern
            id={gridId}
            width={scale}
            height={scale}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="#d6e1ea" strokeWidth="0.7" />
          </pattern>
        </defs>

        <rect x={x} y={y} width={unitWidth} height={unitHeight} fill={`url(#${gridId})`} />

        {blocks.map((block, index) => {
          const blockX = x + block.x * scale;
          const blockY = y + block.y * scale;
          const blockWidth = block.w * scale;
          const blockHeight = block.h * scale;
          return (
            <g key={`${block.kind}-${index}`} className={`calculator-floor-block is-${block.kind}`}>
              <rect
                x={blockX}
                y={blockY}
                width={blockWidth}
                height={blockHeight}
                rx={block.kind === "bed" ? 2 : 1}
              />
              {blockWidth > 26 && blockHeight > 14 && (
                <text
                  x={blockX + blockWidth / 2}
                  y={blockY + blockHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={fontSize}
                >
                  {block.label}
                </text>
              )}
            </g>
          );
        })}

        <rect
          x={x}
          y={y}
          width={unitWidth}
          height={unitHeight}
          fill="none"
          stroke="#146fb5"
          strokeWidth="3"
          rx="2"
        />

        <line
          x1={doorStart}
          y1={y + unitHeight}
          x2={doorStart + doorWidth}
          y2={y + unitHeight}
          stroke="#ffffff"
          strokeWidth="4"
        />
        <path
          d={`M ${doorStart} ${y + unitHeight} A ${doorWidth} ${doorWidth} 0 0 1 ${doorStart + doorWidth} ${y + unitHeight - doorWidth}`}
          fill="none"
          stroke="#9abed5"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        <text
          x={x + unitWidth / 2}
          y={y + unitHeight + 20}
          textAnchor="middle"
          className="calculator-floor-dim"
        >
          {length} ft
        </text>
        <text
          x={x - 14}
          y={y + unitHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${x - 14} ${y + unitHeight / 2})`}
          className="calculator-floor-dim"
        >
          {width} ft
        </text>
      </svg>
      <small>
        Top-down floor plan · {width} × {length} ft
      </small>
    </div>
  );
}
