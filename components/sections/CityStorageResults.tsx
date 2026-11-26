"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LocationPin from "@/components/ui/LocationPin";
import FacilityMap from "@/components/sections/FacilityMap";

export type CityStorageUnit = {
  size: string;
  price: string;
  regularPrice: string;
  quantity: string;
  features?: string[];
};

export type CityStorageFacility = {
  name: string;
  address: string;
  units: CityStorageUnit[];
  href: string;
  city: string;
  state: string;
  distanceMiles: number;
  isNearby: boolean;
  latitude: number;
  longitude: number;
};

type SortOption = "recommended" | "price" | "distance";

const FEATURE_FILTERS = [
  { key: "climate", label: "Climate controlled" },
  { key: "drive-up", label: "Drive-up access" },
  { key: "indoor", label: "Indoor" },
  { key: "ground-floor", label: "Ground floor" },
  { key: "vehicle", label: "Vehicle, RV and boat" },
];

const SIZE_FILTERS = [
  { key: "all", label: "All sizes" },
  { key: "small", label: "Small (up to 5x10)" },
  { key: "medium", label: "Medium (10x10 to 10x15)" },
  { key: "large", label: "Large (10x20 and up)" },
];

const PRICE_FILTERS = [
  { key: "all", label: "Any price", min: 0, max: Infinity },
  { key: "under-50", label: "Under $50/mo", min: 0, max: 50 },
  { key: "50-100", label: "$50 to $100/mo", min: 50, max: 100 },
  { key: "100-150", label: "$100 to $150/mo", min: 100, max: 150 },
  { key: "150-250", label: "$150 to $250/mo", min: 150, max: 250 },
  { key: "250-plus", label: "$250/mo and up", min: 250, max: Infinity },
];

function matchesPrice(price: string, filter: string) {
  if (filter === "all") return true;
  const range = PRICE_FILTERS.find((item) => item.key === filter);
  if (!range) return true;
  const value = priceValue(price);
  return Number.isFinite(value) && value >= range.min && (range.max === Infinity ? true : value < range.max);
}

function squareFeet(size: string) {
  const [width, length] = (size.match(/\d+(\.\d+)?/g) ?? []).map(Number);
  return width && length ? width * length : 0;
}

function matchesSize(size: string, filter: string) {
  if (filter === "all") return true;
  const area = squareFeet(size);
  if (filter === "small") return area > 0 && area <= 50;
  if (filter === "medium") return area > 50 && area <= 150;
  return area > 150;
}

const PAGE_SIZE = 10;
const UNIT_PREVIEW_COUNT = 3;

function paginationItems(page: number, pageCount: number) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  if (page <= 4) return [1, 2, 3, 4, "...", pageCount];
  if (page >= pageCount - 3) return [1, "...", pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  return [1, "...", page - 1, page, page + 1, "...", pageCount];
}

function priceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, "")) || Number.POSITIVE_INFINITY;
}

function lowestPrice(facility: CityStorageFacility) {
  return facility.units.reduce((lowest, unit) => Math.min(lowest, priceValue(unit.price)), Number.POSITIVE_INFINITY);
}

function FacilityCard({ facility, city, mapIndex }: { facility: CityStorageFacility; city: string; mapIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const visibleUnits = expanded ? facility.units : facility.units.slice(0, UNIT_PREVIEW_COUNT);
  const hasMore = facility.units.length > UNIT_PREVIEW_COUNT;

  return (
    <article className="facility-card">
      <div className="facility-card-top">
        <div>
          <span className="facility-distance">{facility.isNearby ? `${facility.city} · ${facility.distanceMiles.toFixed(1)} mi away` : `In ${city}`}</span>
          <h3><span className="facility-map-index" aria-label={`Map marker ${mapIndex}`}>{mapIndex}</span>{facility.name}</h3>
          <p>{facility.address}</p>
        </div>
        <div className="facility-pin"><LocationPin /></div>
      </div>
      <div className="facility-unit-options">
        {visibleUnits.map((unit, index) => (
          <div className="facility-unit-row" key={`${unit.size}-${index}`}>
            <span className="facility-unit">{unit.size}</span>
            <span className="facility-price">
              {unit.regularPrice && unit.regularPrice !== unit.price && <del>{unit.regularPrice}</del>}
              <strong>{unit.price}</strong>
            </span>
          </div>
        ))}
      </div>
      {hasMore && (
        <button type="button" className="facility-view-all" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Show fewer units" : `View all ${facility.units.length} units`}
        </button>
      )}
      <div className="facility-card-bottom">
        <div className="facility-signals"><span className="facility-online">From live sheet</span></div>
        <a href={`mailto:business@maai.agency?subject=${encodeURIComponent(`Quote request: ${facility.name}`)}&body=${encodeURIComponent(`Hi,\n\nI'd like a quote for ${facility.name} (${facility.address}).\n\nThanks!`)}`}>Get quote <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

export default function CityStorageResults({ city, facilities }: { city: string; facilities: CityStorageFacility[] }) {
  const [sort, setSort] = useState<SortOption>("recommended");
  const [features, setFeatures] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Arrive pre-filtered when coming from the size calculator (?size=small|medium|large).
  useEffect(() => {
    const size = new URLSearchParams(window.location.search).get("size");
    if (size && SIZE_FILTERS.some((f) => f.key === size)) setSizeFilter(size);
  }, []);
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep only the units that match every chosen filter, then drop facilities
  // left with no matching units, so prices and counts reflect the filters.
  const filteredFacilities = useMemo(() => facilities
    .map((facility) => ({
      ...facility,
      units: facility.units.filter((unit) =>
        matchesSize(unit.size, sizeFilter) && matchesPrice(unit.price, priceFilter) && features.every((feature) => unit.features?.includes(feature))),
    }))
    .filter((facility) => facility.units.length > 0), [facilities, features, sizeFilter, priceFilter]);

  const sortedFacilities = useMemo(() => {
    const sorted = [...filteredFacilities];
    if (sort === "price") sorted.sort((first, second) => lowestPrice(first) - lowestPrice(second));
    if (sort === "distance") sorted.sort((first, second) => first.distanceMiles - second.distanceMiles);
    if (sort === "recommended") {
      // Balance distance and price: rank on each, then sort by the combined rank.
      const byPrice = [...sorted].sort((a, b) => lowestPrice(a) - lowestPrice(b));
      const byDistance = [...sorted].sort((a, b) => a.distanceMiles - b.distanceMiles);
      const score = (facility: CityStorageFacility) => byPrice.indexOf(facility) + byDistance.indexOf(facility);
      sorted.sort((a, b) => score(a) - score(b));
    }
    return sorted;
  }, [filteredFacilities, sort]);

  const featureCounts = useMemo(() => Object.fromEntries(FEATURE_FILTERS.map(({ key }) => [
    key,
    facilities.filter((facility) => facility.units.some((unit) => unit.features?.includes(key))).length,
  ])), [facilities]);

  function toggleFeature(key: string) {
    setFeatures((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
    setPage(1);
  }

  function changeSize(value: string) {
    setSizeFilter(value);
    setPage(1);
  }

  function changePrice(value: string) {
    setPriceFilter(value);
    setPage(1);
  }

  function clearFilters() {
    setFeatures([]);
    setSizeFilter("all");
    setPriceFilter("all");
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(sortedFacilities.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleFacilities = sortedFacilities.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [currentPage, sort, features, sizeFilter, priceFilter]);

  function changeSort(value: SortOption) {
    setSort(value);
    setPage(1);
  }

  return (
    <section className="city-storage-results" aria-labelledby="city-results-heading">
      <div className="city-storage-results-head">
        <div>
          <span className="city-storage-label">{city}</span>
          <h2 id="city-results-heading">Storage units near you</h2>
          <p>Showing {visibleFacilities.length} of {sortedFacilities.length} facilities{sortedFacilities.length !== facilities.length ? ` (filtered from ${facilities.length})` : ""}. Prices and availability can change, so confirm details before reserving.</p>
        </div>
        <a className="city-size-calc-cta" href="/storage-unit-size-calculator">
          <span className="city-size-calc-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" /></svg>
          </span>
          <span className="city-size-calc-text">
            <strong>Not sure of your size?</strong>
            <span>Use the free size calculator <span aria-hidden="true">→</span></span>
          </span>
        </a>
      </div>

      <div className="city-storage-toolbar">
        <div className="city-storage-filters" role="group" aria-label="Filter storage units">
          <span className="city-storage-filter-label">Filter by</span>
          {FEATURE_FILTERS.map((filter) => (
            <button
              type="button"
              key={filter.key}
              className={features.includes(filter.key) ? "city-filter-chip active" : "city-filter-chip"}
              aria-pressed={features.includes(filter.key)}
              onClick={() => toggleFeature(filter.key)}
              disabled={featureCounts[filter.key] === 0}
            >
              {filter.label}
            </button>
          ))}
          {(features.length > 0 || sizeFilter !== "all" || priceFilter !== "all") && (
            <button type="button" className="city-filter-clear" onClick={clearFilters}>Clear all</button>
          )}
        </div>
        <div className="city-storage-selects">
          <label className="city-storage-sort">Unit size
            <select value={sizeFilter} onChange={(event) => changeSize(event.target.value)}>
              {SIZE_FILTERS.map((filter) => <option key={filter.key} value={filter.key}>{filter.label}</option>)}
            </select>
          </label>
          <label className="city-storage-sort">Price range
            <select value={priceFilter} onChange={(event) => changePrice(event.target.value)}>
              {PRICE_FILTERS.map((filter) => <option key={filter.key} value={filter.key}>{filter.label}</option>)}
            </select>
          </label>
          <label className="city-storage-sort">Sort by
            <select value={sort} onChange={(event) => changeSort(event.target.value as SortOption)}>
              <option value="recommended">Recommended</option>
              <option value="price">Lowest price</option>
              <option value="distance">Closest first</option>
            </select>
          </label>
        </div>
      </div>

      {sortedFacilities.length === 0 && (
        <div className="city-storage-empty">
          <p>No units in {city} match these filters right now.</p>
          <button type="button" className="city-filter-clear" onClick={clearFilters}>Clear filters</button>
        </div>
      )}

      <div className="city-storage-layout">
        <div>
          <div className="city-storage-list" ref={listRef}>
            {visibleFacilities.map((facility, index) => (
              <FacilityCard facility={facility} city={city} mapIndex={index + 1} key={`${facility.name}-${facility.address}`} />
            ))}
          </div>
          {pageCount > 1 && (
            <nav className="city-storage-pagination" aria-label="Storage facility pages">
              <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1} aria-label="Previous page">←</button>
              {paginationItems(currentPage, pageCount).map((pageNumber, index) => typeof pageNumber === "number" ? (
                <button type="button" className={pageNumber === currentPage ? "active" : ""} onClick={() => setPage(pageNumber)} key={pageNumber} aria-current={pageNumber === currentPage ? "page" : undefined}>{pageNumber}</button>
              ) : <span className="city-storage-pagination-gap" key={`gap-${index}`}>...</span>)}
              <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={currentPage === pageCount} aria-label="Next page">→</button>
            </nav>
          )}
        </div>

        <aside className="city-storage-map" aria-label={`${city} storage facility map`}>
          <FacilityMap city={city} facilities={visibleFacilities} />
          <div className="map-label">Numbers match the listings shown</div>
        </aside>
      </div>
    </section>
  );
}
