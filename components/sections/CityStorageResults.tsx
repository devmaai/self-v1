"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LocationPin from "@/components/ui/LocationPin";

export type CityStorageUnit = {
  size: string;
  price: string;
  regularPrice: string;
  quantity: string;
};

export type CityStorageFacility = {
  name: string;
  address: string;
  units: CityStorageUnit[];
  href: string;
  city: string;
  distanceMiles: number;
  isNearby: boolean;
  latitude: number;
  longitude: number;
};

type SortOption = "recommended" | "price" | "distance";

const PAGE_SIZE = 15;
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

function FacilityCard({ facility, city }: { facility: CityStorageFacility; city: string }) {
  const [expanded, setExpanded] = useState(false);
  const visibleUnits = expanded ? facility.units : facility.units.slice(0, UNIT_PREVIEW_COUNT);
  const hasMore = facility.units.length > UNIT_PREVIEW_COUNT;

  return (
    <article className="facility-card">
      <div className="facility-card-top">
        <div>
          <span className="facility-distance">{facility.isNearby ? `${facility.city} · ${facility.distanceMiles.toFixed(1)} mi away` : `In ${city}`}</span>
          <h3>{facility.name}</h3>
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
        <a href={facility.href}>View local options <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

export default function CityStorageResults({ city, facilities }: { city: string; facilities: CityStorageFacility[] }) {
  const [sort, setSort] = useState<SortOption>("recommended");
  const [page, setPage] = useState(1);

  const sortedFacilities = useMemo(() => {
    const sorted = [...facilities];
    if (sort === "price") sorted.sort((first, second) => lowestPrice(first) - lowestPrice(second));
    if (sort === "distance") sorted.sort((first, second) => first.distanceMiles - second.distanceMiles);
    return sorted;
  }, [facilities, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedFacilities.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleFacilities = sortedFacilities.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const coordinates = facilities.filter((facility) => Number.isFinite(facility.latitude) && Number.isFinite(facility.longitude));
  const latitudeValues = coordinates.map((facility) => facility.latitude);
  const longitudeValues = coordinates.map((facility) => facility.longitude);
  const minLatitude = Math.min(...latitudeValues);
  const maxLatitude = Math.max(...latitudeValues);
  const minLongitude = Math.min(...longitudeValues);
  const maxLongitude = Math.max(...longitudeValues);
  const latitudeSpan = Math.max(maxLatitude - minLatitude, 0.025);
  const longitudeSpan = Math.max(maxLongitude - minLongitude, 0.025);

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
          <p>Showing {visibleFacilities.length} of {facilities.length} facilities. Prices and availability can change, so confirm details before reserving.</p>
        </div>
        <label className="city-storage-sort">Sort by
          <select value={sort} onChange={(event) => changeSort(event.target.value as SortOption)}>
            <option value="recommended">Recommended</option>
            <option value="price">Lowest price</option>
            <option value="distance">Closest first</option>
          </select>
        </label>
      </div>

      <div className="city-storage-layout">
        <div>
          <div className="city-storage-list">
            {visibleFacilities.map((facility) => (
              <FacilityCard facility={facility} city={city} key={`${facility.name}-${facility.address}`} />
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
          <div className="map-grid" />
          <div className="map-route map-route-one" />
          <div className="map-route map-route-two" />
          {coordinates.map((facility, index) => {
            const left = 12 + ((facility.longitude - minLongitude) / longitudeSpan) * 76;
            const top = 82 - ((facility.latitude - minLatitude) / latitudeSpan) * 72;
            return (
              <Link
                className={`map-facility-marker${index === 0 ? " primary" : ""}`}
                href={facility.href}
                key={`${facility.name}-${facility.address}-map`}
                style={{ left: `${left}%`, top: `${top}%` }}
                title={`${facility.name}, ${facility.city}`}
                aria-label={`${facility.name}, ${facility.city}`}
              >
                <span>{index + 1}</span>
              </Link>
            );
          })}
          <div className="map-label">{city} area facilities</div>
          <span className="map-compass">N</span>
        </aside>
      </div>
    </section>
  );
}