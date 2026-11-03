"use client";

import { useState } from "react";
import type { StorageSizePrice } from "@/lib/storagePriceGuide";
import {
  unitFloorPlans,
  type FloorPlanBlock,
  type FloorPlanBlockKind,
} from "@/lib/storageCalculator";

type StoragePriceExplorerProps = {
  sizes: StorageSizePrice[];
};

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 380;
const PLAN_LEFT = 52;
const PLAN_RIGHT = 28;
const PLAN_TOP = 24;
const PLAN_BOTTOM = 52;
const PLAN_WIDTH = VIEW_WIDTH - PLAN_LEFT - PLAN_RIGHT;
const PLAN_HEIGHT = VIEW_HEIGHT - PLAN_TOP - PLAN_BOTTOM;

const KIND_META: Record<FloorPlanBlockKind, { label: string; color: string }> = {
  bed: { label: "Bed", color: "#8fb8d4" },
  sofa: { label: "Seating", color: "#d8a17f" },
  dresser: { label: "Dresser", color: "#a9c8dc" },
  table: { label: "Table", color: "#c9b07a" },
  box: { label: "Boxes", color: "#c28a3c" },
  vehicle: { label: "Vehicle", color: "#8fa3b2" },
};

const KIND_ORDER: FloorPlanBlockKind[] = ["bed", "sofa", "dresser", "table", "box", "vehicle"];

function money(value: number | null) {
  return value === null ? null : `$${value.toLocaleString("en-US")}`;
}

function ItemDetails({
  kind,
  x,
  y,
  width,
  height,
}: {
  kind: FloorPlanBlockKind;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  if (width < 18 || height < 12) return null;

  switch (kind) {
    case "bed":
      return (
        <>
          <rect
            x={x + 4}
            y={y + 4}
            width={Math.max(5, width * 0.2)}
            height={Math.max(5, height - 8)}
            rx={2}
            fill="#fff"
            opacity=".68"
          />
          <line
            x1={x + Math.max(8, width * 0.3)}
            y1={y + 4}
            x2={x + Math.max(8, width * 0.3)}
            y2={y + height - 4}
            stroke="#8fb8d4"
            strokeWidth="1"
            opacity=".75"
          />
        </>
      );
    case "sofa":
      return (
        <>
          <line
            x1={x + width / 3}
            y1={y + 4}
            x2={x + width / 3}
            y2={y + height - 4}
            stroke="#d8a17f"
            strokeWidth="1"
            opacity=".7"
          />
          <line
            x1={x + (2 * width) / 3}
            y1={y + 4}
            x2={x + (2 * width) / 3}
            y2={y + height - 4}
            stroke="#d8a17f"
            strokeWidth="1"
            opacity=".7"
          />
          <line
            x1={x + 4}
            y1={y + height * 0.28}
            x2={x + width - 4}
            y2={y + height * 0.28}
            stroke="#d8a17f"
            strokeWidth="1"
            opacity=".55"
          />
        </>
      );
    case "dresser":
      return (
        <>
          <line
            x1={x + 4}
            y1={y + height / 2}
            x2={x + width - 4}
            y2={y + height / 2}
            stroke="#8fb8d4"
            strokeWidth="1"
            opacity=".6"
          />
          <circle cx={x + width / 2} cy={y + height / 2} r="1.5" fill="#8fb8d4" opacity=".8" />
        </>
      );
    case "table":
      return (
        <rect
          x={x + 4}
          y={y + 4}
          width={Math.max(4, width - 8)}
          height={Math.max(4, height - 8)}
          rx={2}
          fill="none"
          stroke="#c9b07a"
          strokeWidth="1"
          opacity=".65"
        />
      );
    case "box":
      return (
        <>
          <line
            x1={x + width / 2}
            y1={y + 3}
            x2={x + width / 2}
            y2={y + height - 3}
            stroke="#c28a3c"
            strokeWidth="1"
            opacity=".55"
          />
          <line
            x1={x + 3}
            y1={y + height / 2}
            x2={x + width - 3}
            y2={y + height / 2}
            stroke="#c28a3c"
            strokeWidth="1"
            opacity=".55"
          />
        </>
      );
    case "vehicle":
      return (
        <>
          <line
            x1={x + width * 0.7}
            y1={y + 4}
            x2={x + width * 0.7}
            y2={y + height - 4}
            stroke="#8fa3b2"
            strokeWidth="1"
            opacity=".75"
          />
          <rect
            x={x + width * 0.22}
            y={y + height * 0.2}
            width={width * 0.42}
            height={height * 0.6}
            rx={3}
            fill="none"
            stroke="#8fa3b2"
            strokeWidth="1"
            opacity=".55"
          />
        </>
      );
    default:
      return null;
  }
}

function FloorPlanItem({
  block,
  scale,
  floorX,
  floorY,
  index,
}: {
  block: FloorPlanBlock;
  scale: number;
  floorX: number;
  floorY: number;
  index: number;
}) {
  const x = floorX + block.x * scale;
  const y = floorY + block.y * scale;
  const width = block.w * scale;
  const height = block.h * scale;
  const showLabel = width >= 42 && height >= 24;

  return (
    <g
      className={`storage-price-plan-item is-${block.kind}`}
      style={{ animationDelay: `${index * 28}ms` }}
    >
      <rect
        className="storage-price-plan-item-body"
        x={x}
        y={y}
        width={width}
        height={height}
        rx={Math.min(4, Math.min(width, height) * 0.18)}
      />
      <ItemDetails kind={block.kind} x={x} y={y} width={width} height={height} />
      {showLabel && (
        <text
          className="storage-price-plan-item-label"
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {block.label}
        </text>
      )}
    </g>
  );
}

export default function StoragePriceExplorer({ sizes }: StoragePriceExplorerProps) {
  const [selectedId, setSelectedId] = useState(sizes[0]?.id ?? "");
  const selected = sizes.find((size) => size.id === selectedId) ?? sizes[0];

  if (!selected) return null;

  const scale = Math.min(
    PLAN_WIDTH / Math.max(selected.length, 1),
    PLAN_HEIGHT / Math.max(selected.width, 1),
  );
  const floorWidth = selected.length * scale;
  const floorHeight = selected.width * scale;
  const floorX = PLAN_LEFT + (PLAN_WIDTH - floorWidth) / 2;
  const floorY = PLAN_TOP + (PLAN_HEIGHT - floorHeight) / 2;
  const gridStep = selected.length <= 5 ? 1 : selected.length <= 15 ? 2 : 5;
  const gridSize = scale * gridStep;
  const doorWidth = Math.min(scale * 3, floorWidth * 0.22);
  const doorStart = floorX + floorWidth * 0.42;
  const dimensionY = floorY + floorHeight + 26;
  const dimensionX = floorX - 26;

  const blocks = unitFloorPlans[selected.id] ?? [];
  const presentKinds = new Set(blocks.map((block) => block.kind));
  const legendKinds = KIND_ORDER.filter((kind) => presentKinds.has(kind));

  const startingPrice = money(selected.from);
  const rangeLow = money(selected.typicalLow);
  const rangeHigh = money(selected.typicalHigh);
  const typicalRange =
    rangeLow && rangeHigh ? `${rangeLow}–${rangeHigh}/mo` : null;
  const priceAnnouncement = startingPrice
    ? `starting at ${startingPrice} per month`
    : "live local rates";

  return (
    <section
      className="storage-price-explorer"
      role="region"
      aria-labelledby="storage-size-comparison-title"
    >
      <div className="storage-price-explorer-copy">
        <span className="storage-price-label">Size comparison</span>
        <h3 id="storage-size-comparison-title">Compare unit sizes at a glance</h3>
        <p>
          Choose a size to see its floor plan, floor area, and live starting price. Every plan is
          drawn to the same scale so you can judge the difference.
        </p>

        <div
          className="storage-price-size-options"
          role="group"
          aria-label="Choose a storage unit size"
        >
          {sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              className={`storage-price-size-option${size.id === selected.id ? " is-selected" : ""}`}
              aria-pressed={size.id === selected.id}
              aria-controls="storage-price-plan"
              onClick={() => setSelectedId(size.id)}
            >
              <strong>{size.label}</strong>
              <span>{size.area} sq ft</span>
            </button>
          ))}
        </div>

        <p className="storage-price-explorer-note">
          <span aria-hidden="true" />
          Live move-in rates in USD per month. Prices vary by city and availability.
        </p>
      </div>

      <div className="storage-price-explorer-visual" id="storage-price-plan">
        <p className="sr-only" aria-live="polite">
          {selected.label} feet, {selected.area} square feet, {priceAnnouncement}.
        </p>

        <div className="storage-price-plan-head">
          <div
            className="storage-price-plan-selected storage-price-plan-swap"
            key={`selected-${selected.id}`}
          >
            <span className="storage-price-plan-eyebrow">Selected size</span>
            <strong className="storage-price-plan-size">
              {selected.label}
              <small>ft</small>
            </strong>
            <span className="storage-price-plan-area">{selected.area} sq ft of floor space</span>
          </div>

          <div
            className={`storage-price-plan-price storage-price-plan-swap${startingPrice ? "" : " is-live"}`}
            key={`price-${selected.id}`}
          >
            <span>{startingPrice ? "From" : "Live rates"}</span>
            {startingPrice ? (
              <strong>
                {startingPrice}
                <small>/mo</small>
              </strong>
            ) : (
              <strong className="is-text">Check local availability</strong>
            )}
            <span>{startingPrice ? "starting move-in rate" : "prices vary by location"}</span>
          </div>
        </div>

        <div className="storage-price-plan-frame">
          <span className="storage-price-plan-scale">Drawn to scale</span>
          <svg
            key={selected.id}
            className="storage-price-plan-svg"
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            role="img"
            aria-labelledby="storage-price-plan-title"
          >
            <title id="storage-price-plan-title">
              {`Top-down floor plan of a ${selected.label} foot storage unit, ${selected.area} square feet, drawn to scale`}
            </title>
            <desc>{selected.fits}</desc>
            <defs>
              <pattern
                id="storage-price-plan-grid"
                width={gridSize}
                height={gridSize}
                patternUnits="userSpaceOnUse"
                x={floorX}
                y={floorY}
              >
                <rect width={gridSize} height={gridSize} fill="#f8fbfd" />
                <path
                  d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                  fill="none"
                  stroke="#d3e4ee"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>

            <g className="storage-price-plan-unit">
              <rect
                className="storage-price-plan-floor"
                x={floorX}
                y={floorY}
                width={floorWidth}
                height={floorHeight}
                rx={6}
                fill="url(#storage-price-plan-grid)"
              />

              {blocks.map((block, index) => (
                <FloorPlanItem
                  key={`${selected.id}-${block.kind}-${index}`}
                  block={block}
                  scale={scale}
                  floorX={floorX}
                  floorY={floorY}
                  index={index}
                />
              ))}

              <rect
                className="storage-price-plan-border"
                x={floorX}
                y={floorY}
                width={floorWidth}
                height={floorHeight}
                rx={6}
              />
              <line
                className="storage-price-plan-door-gap"
                x1={doorStart}
                y1={floorY + floorHeight}
                x2={doorStart + doorWidth}
                y2={floorY + floorHeight}
              />
              <path
                className="storage-price-plan-door"
                d={`M ${doorStart} ${floorY + floorHeight} A ${doorWidth} ${doorWidth} 0 0 1 ${doorStart + doorWidth} ${floorY + floorHeight - doorWidth}`}
              />
            </g>

            <g className="storage-price-plan-dimensions" aria-hidden="true">
              <line x1={floorX} y1={dimensionY} x2={floorX + floorWidth} y2={dimensionY} />
              <line x1={floorX} y1={dimensionY - 5} x2={floorX} y2={dimensionY + 5} />
              <line
                x1={floorX + floorWidth}
                y1={dimensionY - 5}
                x2={floorX + floorWidth}
                y2={dimensionY + 5}
              />
              <text x={floorX + floorWidth / 2} y={dimensionY + 18} textAnchor="middle">
                {selected.length} ft
              </text>

              <line x1={dimensionX} y1={floorY} x2={dimensionX} y2={floorY + floorHeight} />
              <line x1={dimensionX - 5} y1={floorY} x2={dimensionX + 5} y2={floorY} />
              <line
                x1={dimensionX - 5}
                y1={floorY + floorHeight}
                x2={dimensionX + 5}
                y2={floorY + floorHeight}
              />
              <text
                x={dimensionX - 14}
                y={floorY + floorHeight / 2}
                textAnchor="middle"
                transform={`rotate(-90 ${dimensionX - 14} ${floorY + floorHeight / 2})`}
              >
                {selected.width} ft
              </text>
            </g>
          </svg>
        </div>

        {legendKinds.length > 0 && (
          <ul className="storage-price-plan-legend" aria-label="Floor plan key">
            {legendKinds.map((kind) => (
              <li key={kind}>
                <span
                  className="storage-price-plan-legend-dot"
                  style={{ background: KIND_META[kind].color }}
                  aria-hidden="true"
                />
                {KIND_META[kind].label}
              </li>
            ))}
          </ul>
        )}

        <div
          className="storage-price-plan-fit storage-price-plan-swap"
          key={`fit-${selected.id}`}
        >
          <span>Typically fits</span>
          <p>{selected.fits}</p>
        </div>

        <div
          className="storage-price-plan-meta storage-price-plan-swap"
          key={`meta-${selected.id}`}
        >
          <span>{typicalRange ? `Typical range ${typicalRange}` : "Live local rates"}</span>
          {selected.sampleSize > 0 && (
            <span>
              {selected.sampleSize} live listing{selected.sampleSize === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
