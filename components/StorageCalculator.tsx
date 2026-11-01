"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  calculateRecommendation,
  getItem,
  itemGroups,
  items,
  PACKING_EFFICIENCY,
  rooms,
  storageUnits,
  unitContext,
  type ItemGroupId,
  type Recommendation,
  type RoomId,
  type StorageItem,
} from "@/lib/storageCalculator";
import { UnitFloorPlan } from "@/components/calculator/UnitFloorPlan";
import { VolumeVisual } from "@/components/calculator/VolumeVisual";

type SelectedItem = {
  item: StorageItem;
  itemId: string;
  quantity: number;
};

type GroupTab = {
  id: ItemGroupId | "all";
  label: string;
  count: number;
};

function formatVolume(volume: number) {
  return volume % 1 === 0 ? `${volume} cu ft` : `${volume.toFixed(1)} cu ft`;
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

function SelectedItemsPanel({
  selectedItems,
  totalVolume,
  liveRecommendation,
  onQuantityChange,
  onShowRecommendation,
  variant = "sidebar",
  reduceMotion,
}: {
  selectedItems: SelectedItem[];
  totalVolume: number;
  liveRecommendation: Recommendation | null;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onShowRecommendation: () => void;
  variant?: "sidebar" | "drawer";
  reduceMotion: boolean | null;
}) {
  const defaultUnit = storageUnits.find((unit) => unit.id === "10x10") ?? storageUnits[0];
  const unit = liveRecommendation?.unit ?? defaultUnit;
  const capacity = liveRecommendation?.usableCapacity ?? defaultUnit.capacity * PACKING_EFFICIENCY;

  return (
    <>
      {selectedItems.length === 0 ? (
        <div className="calculator-empty">
          <span aria-hidden="true">＋</span>
          <p>Your selected items will appear here.</p>
          <small>Choose a room above or add an item to get started.</small>
        </div>
      ) : (
        <div className={`calculator-selected-list${variant === "drawer" ? " is-drawer" : ""}`}>
          <AnimatePresence initial={false}>
            {selectedItems.map(({ item, itemId, quantity }) => (
              <motion.div
                layout
                key={itemId}
                className="calculator-selected-row"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <small>{formatVolume(item.volume * quantity)}</small>
                </div>
                <div className="calculator-quantity">
                  <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => onQuantityChange(itemId, quantity - 1)}>−</button>
                  <span>{quantity}</span>
                  <button type="button" aria-label={`Increase ${item.name}`} onClick={() => onQuantityChange(itemId, quantity + 1)}>+</button>
                </div>
                <button type="button" className="calculator-remove" aria-label={`Remove ${item.name}`} onClick={() => onQuantityChange(itemId, 0)}>Remove</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <VolumeVisual volume={totalVolume} capacity={capacity} unitLabel={liveRecommendation ? unit.label : "Your"} />

      <div className="calculator-summary-total">
        <span>Estimated volume</span>
        <motion.strong
          key={totalVolume}
          initial={reduceMotion ? false : { scale: 1.18, color: "#146fb5" }}
          animate={{ scale: 1, color: "#16334b" }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          {formatVolume(totalVolume)}
        </motion.strong>
      </div>

      <button
        type="button"
        className="calculator-primary-button"
        disabled={selectedItems.length === 0}
        onClick={onShowRecommendation}
      >
        See my recommended size <span aria-hidden="true">→</span>
      </button>
      <p className="calculator-summary-note">
        We allow space for packing gaps and safe access, so the recommendation is more practical than matching box volume alone.
      </p>
    </>
  );
}

export default function StorageCalculator() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [activeRooms, setActiveRooms] = useState<RoomId[]>([]);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<ItemGroupId | "all">("all");
  const [showAllItems, setShowAllItems] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bumpedItemId, setBumpedItemId] = useState<string | null>(null);
  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const workspaceRef = useRef<HTMLElement>(null);
  const bumpTimer = useRef<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const wasShowingRecommendation = useRef(false);

  const selectedItems = useMemo(
    () => Object.entries(selected)
      .map(([itemId, quantity]) => ({ item: getItem(itemId), itemId, quantity }))
      .filter((entry): entry is SelectedItem => entry.item !== undefined && entry.quantity > 0),
    [selected],
  );
  const totalItems = selectedItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalVolume = selectedItems.reduce((sum, entry) => sum + entry.item.volume * entry.quantity, 0);
  const liveRecommendation = useMemo(() => calculateRecommendation(selected), [selected]);

  const groupLabels = useMemo(
    () => new Map(itemGroups.map((group) => [group.id, group.label])),
    [],
  );
  const tabs = useMemo<GroupTab[]>(() => [
    { id: "all", label: "All", count: items.length },
    ...itemGroups.map((group) => ({
      id: group.id,
      label: group.label,
      count: items.filter((item) => item.group === group.id).length,
    })),
  ], []);
  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const groupLabel = groupLabels.get(item.group) ?? "";
    const matchesSearch = `${item.name} ${item.category} ${groupLabel} ${item.dimensions}`.toLowerCase().includes(normalizedSearch);
    const matchesGroup = activeGroup === "all" || item.group === activeGroup;
    return matchesSearch && matchesGroup;
  });
  const visibleItems = normalizedSearch || activeGroup !== "all"
    ? filteredItems
    : showAllItems
      ? filteredItems
      : filteredItems.slice(0, 9);
  const activeTabId = `calculator-tab-${activeGroup}`;

  useEffect(() => {
    if (!drawerOpen) return;
    const dialog = drawerRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    drawerCloseRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open && dialog.isConnected) dialog.close();
    };
  }, [drawerOpen]);

  useEffect(() => () => {
    if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
  }, []);

  useEffect(() => {
    if (recommendation) return;
    const node = workspaceRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsWorkspaceVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -90px 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [recommendation]);

  useEffect(() => {
    if (recommendation) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else if (wasShowingRecommendation.current) {
      workspaceRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    }
    wasShowingRecommendation.current = Boolean(recommendation);
  }, [recommendation]);

  function addItem(itemId: string, amount = 1) {
    setSelected((current) => ({ ...current, [itemId]: (current[itemId] ?? 0) + amount }));
    setRecommendation(null);
    setBumpedItemId(itemId);
    if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
    bumpTimer.current = window.setTimeout(() => setBumpedItemId(null), 360);
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

  function showRecommendationFromDrawer() {
    setDrawerOpen(false);
    showRecommendation();
  }

  function selectGroup(group: ItemGroupId | "all") {
    setActiveGroup(group);
    setShowAllItems(false);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
    if (!value) setShowAllItems(false);
  }

  function handleTabKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    const next = tabs[nextIndex];
    selectGroup(next.id);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleDialogClick(event: ReactMouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) setDrawerOpen(false);
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
          <main className={`calculator-content${totalItems > 0 ? " has-selection" : ""}`}>
            <div className="calculator-intro">
              <span className="calculator-label">Step 1 of 2</span>
              <h2>Start with a room, or add items one at a time.</h2>
              <p>Room presets are a quick starting point. You can review every item below and adjust the count before seeing your recommendation.</p>
            </div>
            <div className="calculator-guidance">
              <Image src="/images/storage-guide/boxes.jpg" alt="Moving boxes ready for storage" width={180} height={120} />
              <div><strong>Not sure where to start?</strong><span>Select every room you plan to store. We&apos;ll add a typical set of belongings, then you can adjust anything that doesn&apos;t match.</span></div>
            </div>
            <section className="calculator-workspace" ref={workspaceRef}>
              <div className="calculator-selection">
                <div className="calculator-section-heading">
                  <div><span className="calculator-label">Quick add</span><h3>Which rooms are you storing?</h3></div>
                  {activeRooms.length > 0 && <span className="calculator-count">{activeRooms.length} selected</span>}
                </div>
                <div className="calculator-room-grid">
                  {rooms.map((room) => {
                    const active = activeRooms.includes(room.id);
                    return (
                      <motion.button
                        key={room.id}
                        type="button"
                        className={`calculator-room-card${active ? " is-selected" : ""}`}
                        onClick={() => toggleRoom(room.id)}
                        aria-pressed={active}
                        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                      >
                        <span className="calculator-room-icon"><RoomIcon roomId={room.id} /></span>
                        <span><strong>{room.label}</strong><small>{room.description}</small></span>
                        <span className="calculator-room-check" aria-hidden="true">{active ? "✓" : "+"}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="calculator-section-heading calculator-items-heading">
                  <div><span className="calculator-label">Fine tune</span><h3>Add individual items</h3></div>
                </div>
                <div className="calculator-item-filters">
                  <label className="calculator-search">
                    <span aria-hidden="true">⌕</span>
                    <input
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Search furniture, appliances, boxes..."
                      aria-label="Search items"
                    />
                  </label>
                </div>
                <div className="calculator-group-tabs" role="tablist" aria-label="Filter items by room">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      ref={(node) => { tabRefs.current[index] = node; }}
                      type="button"
                      role="tab"
                      id={`calculator-tab-${tab.id}`}
                      aria-selected={activeGroup === tab.id}
                      aria-controls="calculator-item-panel"
                      tabIndex={activeGroup === tab.id ? 0 : -1}
                      className={`calculator-group-tab${activeGroup === tab.id ? " is-active" : ""}`}
                      onClick={() => selectGroup(tab.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                    >
                      {tab.label}<span>{tab.count}</span>
                    </button>
                  ))}
                </div>
                <div id="calculator-item-panel" role="tabpanel" aria-labelledby={activeTabId} className="calculator-item-list">
                  {visibleItems.length === 0 ? (
                    <div className="calculator-no-results">
                      <strong>{normalizedSearch ? `No items match “${search}”.` : "No items in this room yet."}</strong>
                      <span>
                        {activeGroup === "all"
                          ? "Try a different search."
                          : `Searching in ${groupLabels.get(activeGroup)}. Choose All to search every room.`}
                      </span>
                    </div>
                  ) : (
                    visibleItems.map((item) => (
                      <motion.div
                        className="calculator-item-row"
                        key={item.id}
                        animate={bumpedItemId === item.id && !reduceMotion
                          ? { scale: [1, 1.025, 1], backgroundColor: ["rgba(234,243,248,0)", "#eaf3f8", "rgba(234,243,248,0)"] }
                          : { scale: 1, backgroundColor: "rgba(234,243,248,0)" }}
                        transition={{ duration: 0.34, ease: "easeOut" }}
                      >
                        <div>
                          <strong>{item.name}</strong>
                          <small>
                            {activeGroup === "all" || normalizedSearch ? `${groupLabels.get(item.group)} · ` : ""}
                            {item.category} · {item.dimensions}
                          </small>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => addItem(item.id)}
                          className="calculator-add-button"
                          whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                        >
                          Add
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </div>
                {!normalizedSearch && activeGroup === "all" && filteredItems.length > 9 && (
                  <button type="button" className="calculator-show-more" onClick={() => setShowAllItems((current) => !current)}>
                    {showAllItems ? "Show fewer items" : `Show all ${filteredItems.length} items`}
                  </button>
                )}
              </div>
              <aside className="calculator-summary">
                <div className="calculator-summary-sticky">
                  <div className="calculator-summary-head">
                    <div><span className="calculator-label">Your list</span><h3>Selected items</h3></div>
                    <strong>{totalItems} {totalItems === 1 ? "item" : "items"}</strong>
                  </div>
                  <SelectedItemsPanel
                    selectedItems={selectedItems}
                    totalVolume={totalVolume}
                    liveRecommendation={liveRecommendation}
                    onQuantityChange={changeQuantity}
                    onShowRecommendation={showRecommendation}
                    variant="sidebar"
                    reduceMotion={reduceMotion}
                  />
                </div>
              </aside>
            </section>
          </main>

          <AnimatePresence>
            {totalItems > 0 && isWorkspaceVisible && (
              <motion.div
                className="calculator-mobile-bar"
                initial={reduceMotion ? false : { y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                role="region"
                aria-label="Selected items summary"
              >
                <button
                  type="button"
                  className="calculator-mobile-bar-total"
                  onClick={() => setDrawerOpen(true)}
                >
                  <strong>{totalItems} {totalItems === 1 ? "item" : "items"}</strong>
                  <span>{formatVolume(totalVolume)} · Review list</span>
                </button>
                <span className="sr-only" aria-live="polite">
                  {totalItems} {totalItems === 1 ? "item" : "items"}, {formatVolume(totalVolume)} selected
                </span>
                <button type="button" className="calculator-mobile-bar-button" onClick={showRecommendation}>
                  View unit size <span aria-hidden="true">→</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <dialog
            ref={drawerRef}
            className="calculator-drawer"
            aria-labelledby="calculator-drawer-title"
            onClose={() => setDrawerOpen(false)}
            onClick={handleDialogClick}
          >
            <div className="calculator-drawer-panel">
              <div className="calculator-drawer-handle" aria-hidden="true" />
              <div className="calculator-drawer-head">
                <div>
                  <span className="calculator-label">Your list</span>
                  <h3 id="calculator-drawer-title">Selected items</h3>
                </div>
                <div className="calculator-drawer-head-actions">
                  <strong>{totalItems} {totalItems === 1 ? "item" : "items"}</strong>
                  <button
                    ref={drawerCloseRef}
                    type="button"
                    className="calculator-drawer-close"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close selected items"
                  >
                    ×
                  </button>
                </div>
              </div>
              <SelectedItemsPanel
                selectedItems={selectedItems}
                totalVolume={totalVolume}
                liveRecommendation={liveRecommendation}
                onQuantityChange={changeQuantity}
                onShowRecommendation={showRecommendationFromDrawer}
                variant="drawer"
                reduceMotion={reduceMotion}
              />
            </div>
          </dialog>
        </>
      ) : (
        <RecommendationScreen recommendation={recommendation} totalItems={totalItems} onEdit={() => setRecommendation(null)} />
      )}
    </div>
  );
}

function RecommendationScreen({ recommendation, totalItems, onEdit }: { recommendation: Recommendation; totalItems: number; onEdit: () => void }) {
  const { unit, smaller, larger } = recommendation;
  const context = unitContext[unit.id] ?? unitContext["10x10"];
  return (
    <main className="calculator-result">
      <div className="calculator-result-inner">
        <button type="button" className="calculator-back-button" onClick={onEdit}>← Edit my items</button>
        <span className="calculator-eyebrow"><span /> Step 2 of 2</span>
        <h1>You&apos;ll likely need a <em>{unit.label}</em> unit.</h1>
        <p className="calculator-result-lede">That gives you enough usable room for about {formatVolume(recommendation.estimatedVolume)} of belongings, with space left to pack and reach your things.</p>
        <div className="calculator-result-grid">
          <section className="calculator-result-card calculator-result-main">
            <UnitFloorPlan width={unit.width} length={unit.length} />
            <div className="calculator-result-copy">
              <span className="calculator-label">Recommended size</span>
              <h2>{unit.label} feet</h2>
              <p>{unit.area} square feet of floor space</p>
              <p className="calculator-result-context">Roughly the size of {context.comparison}. Fits {context.fits}.</p>
              <div className="calculator-result-image"><Image src="/images/climate-storage/indoor-corridor.png" alt="Storage facility corridor" fill sizes="160px" /></div>
            </div>
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
