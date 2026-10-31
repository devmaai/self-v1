"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  calculateRecommendation,
  getItem,
  items,
  rooms,
  storageUnits,
  type Recommendation,
  type RoomId,
} from "@/lib/storageCalculator";

function formatVolume(volume: number) {
  return volume % 1 === 0 ? `${volume} cu ft` : `${volume.toFixed(1)} cu ft`;
}

function UnitVisual({ width, length }: { width: number; length: number }) {
  return (
    <div className="calculator-unit-visual" aria-label={`${width} by ${length} foot unit diagram`}>
      <div className={`calculator-unit-box calculator-unit-box-${width}-${length}`}>
        <span>{width}&apos;</span>
        <span>{length}&apos;</span>
      </div>
      <small>Top-down view</small>
    </div>
  );
}

function RoomIcon({ roomId }: { roomId: RoomId }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (roomId) {
    case "bedroom":
      return <svg {...commonProps}><path d="M3 19V9.5a1.5 1.5 0 0 1 3 0V12h12V9.5a1.5 1.5 0 0 1 3 0V19" /><path d="M3 15h18M6 12V9h5v3M3 19v2M21 19v2" /></svg>;
    case "living-room":
      return <svg {...commonProps}><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /><path d="M4 11h16a1 1 0 0 1 1 1v4H3v-4a1 1 0 0 1 1-1ZM5 16v3M19 16v3M8 11V9h8v2" /></svg>;
    case "kitchen":
      return <svg {...commonProps}><path d="M5 3v7M8 3v7M5 7h3M6.5 10v11M14 3v18M14 3c3 2 3 5 0 7M18 3v18M14 14h4" /></svg>;
    case "dining-room":
      return <svg {...commonProps}><path d="M3 8h18M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M7 13v8M17 13v8M12 3v5M9 5h6" /></svg>;
    case "home-office":
      return <svg {...commonProps}><path d="M4 4h16v11H4zM8 19h8M12 15v4M7 8h10M7 11h6" /></svg>;
    case "garage":
      return <svg {...commonProps}><path d="m3 10 9-7 9 7v10H3zM7 20v-6h10v6M9 9h6M9 12h6" /></svg>;
  }
}

export default function StorageCalculator() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [activeRooms, setActiveRooms] = useState<RoomId[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showAllItems, setShowAllItems] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const selectedItems = useMemo(
    () => Object.entries(selected)
      .map(([itemId, quantity]) => ({ item: getItem(itemId), itemId, quantity }))
      .filter((entry): entry is { item: NonNullable<ReturnType<typeof getItem>>; itemId: string; quantity: number } => Boolean(entry.item) && entry.quantity > 0),
    [selected],
  );
  const totalItems = selectedItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalVolume = selectedItems.reduce((sum, entry) => sum + entry.item.volume * entry.quantity, 0);
  const categories = ["All categories", ...Array.from(new Set(items.map((item) => item.category)))];
  const filteredItems = items.filter((item) => {
    const matchesSearch = `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All categories" || item.category === category;
    return matchesSearch && matchesCategory;
  });
  const visibleItems = showAllItems || search ? filteredItems : filteredItems.slice(0, 9);

  function addItem(itemId: string, amount = 1) {
    setSelected((current) => ({ ...current, [itemId]: (current[itemId] ?? 0) + amount }));
    setRecommendation(null);
  }

  function changeQuantity(itemId: string, quantity: number) {
    setSelected((current) => {
      const next = { ...current };
      if (quantity > 0) next[itemId] = Math.max(1, Math.floor(quantity));
      else delete next[itemId];
      return next;
    });
    setRecommendation(null);
  }

  function toggleRoom(roomId: RoomId) {
    const room = rooms.find((candidate) => candidate.id === roomId);
    if (!room) return;
    const isActive = activeRooms.includes(roomId);
    setActiveRooms((current) => isActive ? current.filter((id) => id !== roomId) : [...current, roomId]);
    setSelected((current) => {
      const next = { ...current };
      room.items.forEach(({ itemId, quantity }) => {
        const nextQuantity = (next[itemId] ?? 0) + (isActive ? -quantity : quantity);
        if (nextQuantity > 0) next[itemId] = nextQuantity;
        else delete next[itemId];
      });
      return next;
    });
    setRecommendation(null);
  }

  function showRecommendation() {
    setRecommendation(calculateRecommendation(selected));
  }

  return (
    <div className="storage-calculator-page">
      {!recommendation ? (
        <>
          <section className="calculator-hero">
            <div className="calculator-hero-inner">
              <div className="calculator-hero-copy">
                <span className="calculator-eyebrow"><span /> Free planning tool</span>
                <h1>Find the right <em>storage size</em>.</h1>
                <p>Tell us what you&apos;re storing, and we&apos;ll suggest a unit that leaves room to pack safely and move around.</p>
                <div className="calculator-hero-points">
                  <span><b>1</b> Pick rooms</span>
                  <span><b>2</b> Fine-tune items</span>
                  <span><b>3</b> Get your size</span>
                </div>
              </div>
              <div className="calculator-hero-image">
                <Image src="/images/climate-storage/indoor-unit.png" alt="Clean storage unit interior with packed belongings" fill priority sizes="(max-width: 800px) 100vw, 45vw" />
                <span className="calculator-image-caption">Make room for what matters.</span>
              </div>
            </div>
          </section>
          <main className="calculator-content">
            <div className="calculator-intro">
              <span className="calculator-label">Step 1 of 2</span>
              <h2>Start with a room, or add items one at a time.</h2>
              <p>Room presets are a quick starting point. You can review every item below and adjust the count before seeing your recommendation.</p>
            </div>
            <div className="calculator-guidance">
              <Image src="/images/storage-guide/boxes.jpg" alt="Moving boxes ready for storage" width={180} height={120} />
              <div><strong>Not sure where to start?</strong><span>Select every room you plan to store. We&apos;ll add a typical set of belongings, then you can adjust anything that doesn&apos;t match.</span></div>
            </div>
            <section className="calculator-workspace">
              <div className="calculator-selection">
                <div className="calculator-section-heading">
                  <div><span className="calculator-label">Quick add</span><h3>Which rooms are you storing?</h3></div>
                  {activeRooms.length > 0 && <span className="calculator-count">{activeRooms.length} selected</span>}
                </div>
                <div className="calculator-room-grid">
                  {rooms.map((room) => {
                    const active = activeRooms.includes(room.id);
                    return (
                      <button key={room.id} type="button" className={`calculator-room-card${active ? " is-selected" : ""}`} onClick={() => toggleRoom(room.id)} aria-pressed={active}>
                        <span className="calculator-room-icon"><RoomIcon roomId={room.id} /></span>
                        <span><strong>{room.label}</strong><small>{room.description}</small></span>
                        <span className="calculator-room-check" aria-hidden="true">{active ? "✓" : "+"}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="calculator-section-heading calculator-items-heading">
                  <div><span className="calculator-label">Fine tune</span><h3>Add individual items</h3></div>
                </div>
                <div className="calculator-item-filters">
                  <label className="calculator-search">
                    <span aria-hidden="true">⌕</span>
                    <input value={search} onChange={(event) => { setSearch(event.target.value); setShowAllItems(true); }} placeholder="Search furniture, appliances, boxes..." aria-label="Search items" />
                  </label>
                  <label className="calculator-category-filter">
                    <span className="sr-only">Filter items by category</span>
                    <select value={category} onChange={(event) => { setCategory(event.target.value); setShowAllItems(false); }} aria-label="Filter items by category">
                      {categories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}
                    </select>
                  </label>
                </div>
                <div className="calculator-item-list">
                  {visibleItems.map((item) => (
                    <div className="calculator-item-row" key={item.id}>
                      <div><strong>{item.name}</strong><small>{item.category} · {item.dimensions}</small></div>
                      <button type="button" onClick={() => addItem(item.id)} className="calculator-add-button">Add</button>
                    </div>
                  ))}
                </div>
                {!search && filteredItems.length > 9 && <button type="button" className="calculator-show-more" onClick={() => setShowAllItems((current) => !current)}>{showAllItems ? "Show fewer items" : `Show all ${filteredItems.length} items`}</button>}
              </div>
              <aside className="calculator-summary">
                <div className="calculator-summary-sticky">
                  <div className="calculator-summary-head"><div><span className="calculator-label">Your list</span><h3>Selected items</h3></div><strong>{totalItems} {totalItems === 1 ? "item" : "items"}</strong></div>
                  {selectedItems.length === 0 ? (
                    <div className="calculator-empty"><span aria-hidden="true">＋</span><p>Your selected items will appear here.</p><small>Choose a room above or add an item to get started.</small></div>
                  ) : (
                    <div className="calculator-selected-list">
                      {selectedItems.map(({ item, itemId, quantity }) => (
                        <div className="calculator-selected-row" key={itemId}>
                          <div><strong>{item.name}</strong><small>{formatVolume(item.volume * quantity)}</small></div>
                          <div className="calculator-quantity"><button type="button" aria-label={`Decrease ${item.name}`} onClick={() => changeQuantity(itemId, quantity - 1)}>−</button><span>{quantity}</span><button type="button" aria-label={`Increase ${item.name}`} onClick={() => changeQuantity(itemId, quantity + 1)}>+</button></div>
                          <button type="button" className="calculator-remove" aria-label={`Remove ${item.name}`} onClick={() => changeQuantity(itemId, 0)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="calculator-summary-total"><span>Estimated volume</span><strong>{formatVolume(totalVolume)}</strong></div>
                  <button type="button" className="calculator-primary-button" disabled={selectedItems.length === 0} onClick={showRecommendation}>See my recommended size <span aria-hidden="true">→</span></button>
                  <p className="calculator-summary-note">We allow space for packing gaps and safe access, so the recommendation is more practical than matching box volume alone.</p>
                </div>
              </aside>
            </section>
          </main>
        </>
      ) : (
        <RecommendationScreen recommendation={recommendation} totalItems={totalItems} onEdit={() => setRecommendation(null)} />
      )}
    </div>
  );
}

function RecommendationScreen({ recommendation, totalItems, onEdit }: { recommendation: Recommendation; totalItems: number; onEdit: () => void }) {
  const { unit, smaller, larger } = recommendation;
  return (
    <main className="calculator-result">
      <div className="calculator-result-inner">
        <button type="button" className="calculator-back-button" onClick={onEdit}>← Edit my items</button>
        <span className="calculator-eyebrow"><span /> Step 2 of 2</span>
        <h1>You&apos;ll likely need a <em>{unit.label}</em> unit.</h1>
        <p className="calculator-result-lede">That gives you enough usable room for about {formatVolume(recommendation.estimatedVolume)} of belongings, with space left to pack and reach your things.</p>
        <div className="calculator-result-grid">
          <section className="calculator-result-card calculator-result-main">
            <UnitVisual width={unit.width} length={unit.length} />
            <div><span className="calculator-label">Recommended size</span><h2>{unit.label} feet</h2><p>{unit.area} square feet of floor space</p><div className="calculator-result-image"><Image src="/images/climate-storage/indoor-corridor.png" alt="Storage facility corridor" fill sizes="160px" /></div></div>
          </section>
          <section className="calculator-result-card calculator-why"><span className="calculator-label">Why this works</span><h2>A little room to breathe.</h2><p>Your {totalItems} selected {totalItems === 1 ? "item fits" : "items fit"} within roughly {Math.round(recommendation.usableCapacity)} cubic feet of practical capacity. The remaining room accounts for awkward furniture shapes, packing gaps, and a walkway.</p><div className="calculator-efficiency"><span>Practical capacity</span><strong>{Math.round(recommendation.packingEfficiency * 100)}% of unit volume</strong></div></section>
        </div>
        <div className="calculator-alternatives"><h2>Compare nearby sizes</h2><div className="calculator-alternative-grid">{[smaller, larger].filter(Boolean).map((alternative) => <div className={`calculator-alternative${alternative?.id === unit.id ? " is-current" : ""}`} key={alternative?.id}><span>{alternative?.id === unit.id ? "Recommended" : alternative && alternative.area < unit.area ? "Smaller option" : "More room"}</span><strong>{alternative?.label}</strong><small>{alternative?.area} sq ft · {alternative?.capacity} cu ft</small></div>)}</div></div>
        <button type="button" className="calculator-secondary-button" onClick={onEdit}>Review or change my list</button>
        <p className="calculator-disclaimer">This is an estimate based on typical item sizes. Unit heights, access, and facility rules vary, so confirm dimensions with your chosen facility.</p>
      </div>
    </main>
  );
}
