"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import type { LocationSuggestion } from "@/lib/locationSuggestion";

type Props = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: LocationSuggestion) => void;
  onSuggestionsChange?: (suggestions: LocationSuggestion[]) => void;
  placeholder?: string;
  className?: string;
};

type SuggestionsResponse = { suggestions?: LocationSuggestion[] };

export default function LocationAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  onSuggestionsChange,
  placeholder = "Enter ZIP code, city, or state",
  className = "",
}: Props) {
  const router = useRouter();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-locations`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  const query = value.trim();

  useEffect(() => {
    onSuggestionsChange?.(suggestions);
  }, [onSuggestionsChange, suggestions]);

  useEffect(() => {
    if (!open || query.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/location-search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Location search failed: ${response.status}`);
        const result = (await response.json()) as SuggestionsResponse;
        setSuggestions(result.suggestions ?? []);
      } catch (caught) {
        if ((caught as Error).name !== "AbortError") {
          setSuggestions([]);
          setError("We couldn't load suggestions. Try submitting your search.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, query]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  function selectSuggestion(suggestion: LocationSuggestion) {
    onChange(suggestion.label);
    setOpen(false);
    setActiveIndex(-1);
    setGeoError("");
    if (onSelect) onSelect(suggestion);
    else router.push(suggestion.href);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!open) {
        setOpen(true);
        return;
      }
      if (!suggestions.length) return;
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => {
        if (current < 0) return direction === 1 ? 0 : suggestions.length - 1;
        return (current + direction + suggestions.length) % suggestions.length;
      });
      return;
    }

    if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      const suggestion = suggestions[activeIndex];
      if (suggestion) selectSuggestion(suggestion);
    }
  }

  function handleGeolocate() {
    if (geoLoading) return;
    if (!navigator.geolocation) {
      setGeoError("Your browser doesn't support location search. Try a ZIP code instead.");
      return;
    }

    setGeoLoading(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `/api/location-search?lat=${encodeURIComponent(latitude)}&lng=${encodeURIComponent(longitude)}`,
          );
          if (!response.ok) throw new Error("Location lookup failed");
          const result = (await response.json()) as SuggestionsResponse;
          const suggestion = result.suggestions?.[0];
          if (!suggestion) throw new Error("No nearby location found");
          selectSuggestion(suggestion);
        } catch {
          setGeoError("We couldn't find storage near your location. Try a ZIP code.");
        } finally {
          setGeoLoading(false);
        }
      },
      (geoPositionError) => {
        setGeoLoading(false);
        setGeoError(
          geoPositionError.code === geoPositionError.PERMISSION_DENIED
            ? "Location permission was denied. Try a ZIP code instead."
            : "We couldn't get your location. Try a ZIP code instead.",
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  const showEmpty = open && !loading && !error && query.length >= 2 && suggestions.length === 0;
  const activeOptionId = activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined;

  return (
    <div className={`location-autocomplete ${className}`.trim()} ref={wrapperRef}>
      <input
        id={inputId}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeOptionId}
      />

      {open && (
        <div className="location-suggestions" id={listId} role="listbox" aria-label="Location suggestions">
          <button
            type="button"
            className="location-geo"
            onClick={handleGeolocate}
            onMouseDown={(event) => event.preventDefault()}
            disabled={geoLoading}
          >
            <LocationPin className="location-geo-pin" />
            <span>{geoLoading ? "Finding your location…" : "Use my current location"}</span>
          </button>

          {geoError && <p className="location-suggestion-status location-suggestion-error">{geoError}</p>}
          {loading && <p className="location-suggestion-status">Searching locations…</p>}
          {error && <p className="location-suggestion-status location-suggestion-error">{error}</p>}

          {!loading && !error && suggestions.map((suggestion, index) => (
            <button
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              id={`${listId}-option-${index}`}
              className={index === activeIndex ? "location-suggestion active" : "location-suggestion"}
              key={suggestion.href}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="location-suggestion-copy">
                <span className="location-suggestion-label">{suggestion.label}</span>
                <span className="location-suggestion-secondary">{suggestion.secondary}</span>
              </span>
              <span className="location-suggestion-tag">{suggestion.type === "zip" ? "ZIP" : "City"}</span>
            </button>
          ))}

          {showEmpty && (
            <p className="location-suggestion-status">
              No matches yet. Check the spelling or try a nearby ZIP code.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
