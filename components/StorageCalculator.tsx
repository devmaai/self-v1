"use client";

import Link from "next/link";
import StateZipSearch from "@/components/sections/StateZipSearch";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  FINDER_CATEGORIES,
  FINDER_FURNITURE_COLORS,
  FINDER_ITEMS,
  FINDER_ROOMS,
  FINDER_UNITS,
  type FinderCategory,
  type FinderIconName,
  type FinderItemType,
  type FinderRoom,
  type FinderUnit,
} from "@/lib/storageSizeFinder";
import V2StorageForm from "@/components/v2/V2StorageForm";

const ICON_PATHS: Record<FinderIconName, ReactNode> = {
  sofa: <><path d="M4 12V8a3 3 0 013-3h10a3 3 0 013 3v4M2 14a2 2 0 012-2h1a2 2 0 012 2v1h10v-1a2 2 0 012-2h1a2 2 0 012 2v5H2v-5zM6 20v2m12-2v2" /></>,
  chair: <><path d="M6 19V5a2 2 0 012-2h8a2 2 0 012 2v14M6 12h12M6 19h12" /></>,
  table: <><path d="M4 10h16M6 10v9m12-9v9M4 10l2-4h12l2 4" /></>,
  tv: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M9 21h6m-3-4v4" /></>,
  shelf: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M4 9h16M4 15h16" /></>,
  round: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2.5" /></>,
  bed: <><path d="M3 18v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 18h18M3 18v2m18-2v2M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" /></>,
  box: <><path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" /></>,
  fridge: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M9 6h6M9 10h.01" /></>,
  bike: <><circle cx="6" cy="17" r="3.5" /><circle cx="18" cy="17" r="3.5" /><path d="M6 17l4-8h5l3 8M10 9L8 6h3" /></>,
  tool: <><path d="M14 7l3 3-8.5 8.5a2.1 2.1 0 01-3-3L14 7zM14 7l-2.5-2.5M17 10l2.5 2.5" /></>,
  grill: <><circle cx="12" cy="11" r="7" /><path d="M8 21l2-4m6 4l-2-4M9 11h6" /></>,
};

function ItemIcon({ name, size = 18 }: { name: FinderIconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function shade(hex: string, factor: number) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  if (factor >= 0) {
    r += (255 - r) * factor;
    g += (255 - g) * factor;
    b += (255 - b) * factor;
  } else {
    r *= 1 + factor;
    g *= 1 + factor;
    b *= 1 + factor;
  }
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

const DIAMOND: Array<[number, number]> = [
  [160, 72],
  [138, 85],
  [182, 85],
  [116, 98],
  [160, 98],
  [204, 98],
  [138, 111],
  [182, 111],
  [160, 124],
];

function vizCube(cx: number, cy: number, color: string, delay: number, key: number) {
  const top = shade(color, 0.34);
  const right = shade(color, -0.2);
  const stroke = "rgba(15,23,42,.18)";
  return (
    <g className="viz-cube" style={{ animationDelay: `${delay}ms` }} key={key}>
      <polygon points={`${cx - 22},${cy} ${cx},${cy + 12} ${cx},${cy + 34} ${cx - 22},${cy + 22}`} fill={color} stroke={stroke} strokeWidth=".6" />
      <polygon points={`${cx + 22},${cy} ${cx},${cy + 12} ${cx},${cy + 34} ${cx + 22},${cy + 22}`} fill={right} stroke={stroke} strokeWidth=".6" />
      <polygon points={`${cx},${cy - 12} ${cx + 22},${cy} ${cx},${cy + 12} ${cx - 22},${cy}`} fill={top} stroke={stroke} strokeWidth=".6" />
    </g>
  );
}

function VolumeVisual({
  volume,
  capacity,
  tags,
  caption,
  animate,
  width,
}: {
  volume: number;
  capacity: number;
  tags: FinderItemType[];
  caption: string;
  animate: boolean;
  width: number;
}) {
  const count = volume > 0 ? Math.min(27, Math.max(1, Math.round((volume / capacity) * 27))) : 0;
  const cubes = [];
  for (let i = 0; i < count; i += 1) {
    const level = Math.floor(i / 9);
    const point = DIAMOND[i % 9];
    const color = FINDER_FURNITURE_COLORS[tags[i % tags.length] ?? "boxes"];
    cubes.push(vizCube(point[0], point[1] - 22 * level, color, animate ? i * 22 : 0, i));
  }

  return (
    <svg viewBox="0 0 320 205" aria-label="Your items filling a storage unit" role="img">
      <ellipse cx="160" cy="172" rx="118" ry="22" fill="rgba(15,23,42,.06)" />
      {cubes}
      <g fill="none" strokeLinejoin="round">
        <polygon points="160,15 94,54 160,93" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="5 4" />
        <polygon points="226,54 160,15 160,93" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="5 4" />
        <polygon points="160,15 94,54 94,120 160,159" fill="rgba(20,111,181,.05)" stroke="#0F172A" strokeWidth="2" />
        <polygon points="160,15 226,54 226,120 160,159" fill="rgba(20,111,181,.09)" stroke="#0F172A" strokeWidth="2" />
      </g>
      <g stroke="#146FB5" strokeWidth="1.6" fill="#146FB5">
        <line x1="94" y1="24" x2="226" y2="24" strokeDasharray="5 4" />
        <line x1="90" y1="28" x2="98" y2="20" />
        <line x1="222" y1="28" x2="230" y2="20" />
        <line x1="246" y1="54" x2="246" y2="120" strokeDasharray="5 4" />
        <line x1="242" y1="58" x2="250" y2="50" />
        <line x1="242" y1="124" x2="250" y2="116" />
        <text x="160" y="16" textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".14em" }}>
          {width} FT
        </text>
        <text x="258" y="92" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".14em" }}>
          8 FT
        </text>
      </g>
      <text x="160" y="196" textAnchor="middle" fill="#64748B" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: ".22em" }}>
        {caption}
      </text>
    </svg>
  );
}

function searchHref(unit: FinderUnit | null) {
  return `/storage-search?location=${encodeURIComponent(unit ? `${unit.label} storage` : "storage units")}`;
}

function formUnitSize(unit: FinderUnit) {
  const depth = unit.sq / unit.w;
  return `${unit.w}' × ${depth}'`;
}

function recommend(volume: number) {
  return FINDER_UNITS.find((unit) => unit.cap >= volume * 1.1) ?? FINDER_UNITS[FINDER_UNITS.length - 1];
}

export default function StorageCalculator() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [category, setCategory] = useState<FinderCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [displayedVolume, setDisplayedVolume] = useState(0);

  const displayedRef = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const workspaceRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const itemById = useMemo(() => new Map(FINDER_ITEMS.map((item) => [item.id, item])), []);

  const totalVolume = useMemo(
    () => Object.entries(selected).reduce((sum, [id, quantity]) => sum + (itemById.get(id)?.vol ?? 0) * quantity, 0),
    [selected, itemById],
  );

  const totalCount = useMemo(
    () => Object.values(selected).reduce((sum, quantity) => sum + quantity, 0),
    [selected],
  );

  const recommendation = totalVolume > 0 ? recommend(totalVolume) : null;
  const activeUnit = recommendation ?? FINDER_UNITS[2];
  const fillPct = recommendation ? Math.round((totalVolume / activeUnit.cap) * 100) : 0;

  const tags = useMemo(() => {
    const collected: FinderItemType[] = [];
    Object.entries(selected).forEach(([id, quantity]) => {
      const item = itemById.get(id);
      if (!item) return;
      for (let i = 0; i < quantity; i += 1) collected.push(item.type);
    });
    if (!collected.length) return ["boxes"] as FinderItemType[];
    const out: FinderItemType[] = [];
    let index = 0;
    while (collected.length) {
      out.push(collected.splice(index % collected.length, 1)[0]);
      index += 1;
    }
    return out;
  }, [selected, itemById]);

  const filteredItems = useMemo(
    () => FINDER_ITEMS.filter((item) => {
      const matchesCategory = category === "all" || item.cat === category;
      const matchesQuery = !query || item.name.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    }),
    [category, query],
  );

  const recIndex = recommendation ? FINDER_UNITS.indexOf(recommendation) : -1;
  const smaller = recommendation && recIndex > 0 ? FINDER_UNITS[recIndex - 1] : null;
  const larger = recommendation && recIndex < FINDER_UNITS.length - 1 ? FINDER_UNITS[recIndex + 1] : null;
  const headroom = recommendation ? Math.round(((recommendation.cap - totalVolume) / recommendation.cap) * 100) : 0;
  const over = recommendation ? recommendation.cap < totalVolume * 1.1 : false;

  useEffect(() => {
    const from = displayedRef.current;
    const to = totalVolume;
    if (from === to) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 420);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (to - from) * eased);
      displayedRef.current = next;
      setDisplayedVolume(next);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [totalVolume]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  function showToast(message: string) {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 1500);
  }

  function addOne(id: string) {
    const wasSelected = (selected[id] ?? 0) > 0;
    if (!wasSelected) showToast(`Added ${itemById.get(id)?.name ?? "item"}`);
    setSelected((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function removeOne(id: string) {
    setSelected((prev) => {
      const next = { ...prev };
      const quantity = (next[id] ?? 0) - 1;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  }

  function addRoom(room: FinderRoom) {
    const existingSets = Math.min(
      ...Object.entries(room.items).map(([id, quantity]) => Math.floor((selected[id] ?? 0) / quantity)),
    );
    setSelected((prev) => {
      const next = { ...prev };
      Object.entries(room.items).forEach(([id, quantity]) => {
        next[id] = (next[id] ?? 0) + quantity;
      });
      return next;
    });
    showToast(existingSets > 0 ? `Added another ${room.name} set` : `Added ${room.name} set`);
  }

  function clearAll() {
    setSelected({});
  }

  function showRecommendation() {
    if (recommendation) {
      setFormOpen(false);
      setModalOpen(true);
      return;
    }
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const compareCard = (unit: FinderUnit | null, label: string, mine = false) => (
    <div className={`mc${mine ? " me" : ""}`}>
      {label}
      <b>{unit ? unit.label : "–"}</b>
      {unit ? `$${unit.price}/MO` : "NONE"}
    </div>
  );

  return (
    <div className="storage-calculator-page">
      <section className="storage-size-guide-hero hero-photo hero-photo-calculator">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span aria-current="page">Size calculator</span>
          </nav>
          <h1>Free storage size calculator, <em>built around what you store.</em></h1>
          <StateZipSearch id="calculator-hero-zip" className="storage-size-guide-hero-search" />
        </div>
      </section>

      <div className="size-finder">
        <section className="calc" id="calculator" ref={workspaceRef}>
          <div className="container">
            <div className="section-head reveal">
              <h2>Find the right <em>size storage unit</em>.</h2>
              <p>Start with a room preset for speed, then fine-tune with individual items. Your list and volume estimate update live on the right.</p>
            </div>
            <div className="calc-grid">
              <div className="calc-left">
                <div className="panel reveal">
                  <div className="panel-label"><h3>Quick add</h3></div>
                  <p className="panel-sub">One tap adds a typical set of items for that space. Tap again to add another set.</p>
                  <div className="rooms">
                    {FINDER_ROOMS.map((room) => {
                      const roomCount = Object.values(room.items).reduce((sum, quantity) => sum + quantity, 0);
                      const sets = Math.min(
                        ...Object.entries(room.items).map(([id, quantity]) => Math.floor((selected[id] ?? 0) / quantity)),
                      );
                      return (
                        <button
                          key={room.id}
                          type="button"
                          className={`room-card${sets > 0 ? " on" : ""}`}
                          onClick={() => addRoom(room)}
                          aria-label={`Add ${room.name} set`}
                        >
                          <span className="room-add"><PlusIcon /></span>
                          <span className="room-ico"><ItemIcon name={room.ico} size={19} /></span>
                          <h4>{room.name}</h4>
                          <p>{room.desc}</p>
                          <span className="rc-n">
                            {sets > 0 ? `${sets}× SET${sets > 1 ? "S" : ""} ADDED` : `${roomCount} ITEMS`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="panel reveal">
                  <div className="panel-label"><h3>Fine tune</h3></div>
                  <p className="panel-sub">Search the catalog and add exactly what&apos;s coming with you. Use + and − right on each item.</p>
                  <div className="search-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value.trim().toLowerCase())}
                      placeholder="Search items — try 'sofa' or 'box'"
                      autoComplete="off"
                      aria-label="Search items"
                    />
                  </div>
                  <div className="chips">
                    {FINDER_CATEGORIES.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`chip${category === option.id ? " on" : ""}`}
                        onClick={() => setCategory(option.id)}
                        aria-pressed={category === option.id}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="items">
                    {filteredItems.map((item) => {
                      const quantity = selected[item.id] ?? 0;
                      return (
                        <div className={`item-row${quantity > 0 ? " has" : ""}`} key={item.id}>
                          <span className="item-ico"><ItemIcon name={item.ico} /></span>
                          <div className="item-info">
                            <h5>{item.name}</h5>
                            <span><b>{item.vol} CU FT</b> · {item.dims}</span>
                          </div>
                          <div className="ctl">
                            {quantity > 0 ? (
                              <>
                                <button type="button" className="stp" onClick={() => removeOne(item.id)} aria-label={`Remove one ${item.name}`}>−</button>
                                <output>{quantity}</output>
                                <button type="button" className="stp" onClick={() => addOne(item.id)} aria-label={`Add one more ${item.name}`}>+</button>
                              </>
                            ) : (
                              <button type="button" className="addbtn" onClick={() => addOne(item.id)} aria-label={`Add ${item.name}`}>
                                <PlusIcon />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {filteredItems.length === 0 && (
                      <p className="no-match">No items match. Try a different word or category.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="listpanel reveal">
                <div className="sticky-panel" aria-live="polite">
                  <div className="list-head">
                    <h3>Your list<span className="count-badge">{totalCount}</span></h3>
                    <button type="button" className="clear-btn" onClick={clearAll}>Clear all</button>
                  </div>

                  {totalCount === 0 ? (
                    <div className="empty-state">
                      <div className="es-ico">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
                          <path d="M3 8l9 5 9-5M12 13v8" />
                        </svg>
                      </div>
                      <b>Nothing added yet</b>
                      <p>Pick a room preset above, or add items from the catalog.</p>
                    </div>
                  ) : (
                    <div className="list-items">
                      {Object.entries(selected).map(([id, quantity]) => {
                        const item = itemById.get(id);
                        if (!item) return null;
                        return (
                          <div className="li-row" key={id}>
                            <button type="button" className="qbtn del" onClick={() => removeOne(id)} aria-label={`Remove one ${item.name}`}>−</button>
                            <span className="li-qty">{quantity}×</span>
                            <b>{item.name}</b>
                            <span className="li-vol">{item.vol * quantity} CU FT</span>
                            <button type="button" className="qbtn" onClick={() => addOne(id)} aria-label={`Add one more ${item.name}`}>+</button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="viz-wrap">
                    <VolumeVisual
                      volume={totalVolume}
                      capacity={activeUnit.cap}
                      tags={tags}
                      caption={`UNIT ${recommendation ? activeUnit.label : "—"} · ${activeUnit.cap} CU FT PACKED`}
                      animate
                      width={activeUnit.w}
                    />
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <div className="total-row">
                      <span className="t-label">Estimated volume</span>
                      <span className="big-count"><span>{displayedVolume}</span><small>CU FT</small></span>
                    </div>
                    <div className={`rec-line${recommendation ? " on" : ""}`}>
                      <span>Recommended unit</span>
                      <b>{recommendation ? `${activeUnit.label} ft` : "–"}</b>
                    </div>
                    <div className="fill-bar-wrap">
                      <div className="fill-meta">
                        <span>{recommendation ? `Fill of a ${activeUnit.label} unit` : "Fill of your unit"}</span>
                        <b>{fillPct}%</b>
                      </div>
                      <div className="fill-bar">
                        <i style={{ width: `${Math.min(100, fillPct)}%` }} className={fillPct > 90 ? "hi" : undefined} />
                      </div>
                    </div>
                    <button type="button" className="btn btn-coral btn-lg see-rec" onClick={showRecommendation} disabled={!recommendation}>
                      See my recommended size
                    </button>
                    <p className="cta-hint">
                      {recommendation
                        ? `About ${Math.round(totalVolume * 1.1)} cu ft with 10% headroom for a walkway`
                        : "Add at least one item to get a size."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mobile-bar">
          <div className="mb-vol">
            <b><span>{displayedVolume}</span> CU FT</b>
            <small>ESTIMATED</small>
          </div>
          <button type="button" className="btn btn-coral" onClick={showRecommendation}>My size</button>
        </div>

        <div className={`toast${toastMessage ? " show" : ""}`} role="status">{toastMessage}</div>

        {modalOpen && recommendation && (
          <div
            className="modal-backdrop open"
            role="dialog"
            aria-modal="true"
            aria-label="Your recommended storage size"
            onClick={(event) => {
              if (event.target === event.currentTarget) setModalOpen(false);
            }}
          >
            <div className="modal">
              <button ref={closeButtonRef} type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">×</button>
              {formOpen ? (
                <>
                  <span className="modal-tag">YOUR SIZE IS READY</span>
                  <h3 className="modal-form-title">Find your unit</h3>
                  <p className="modal-form-intro">
                    We selected {recommendation.label} based on what you&apos;re storing. Add your details and we&apos;ll help you find matching options.
                  </p>
                  <V2StorageForm initialUnitSize={formUnitSize(recommendation)} />
                  <button type="button" className="modal-back" onClick={() => setFormOpen(false)}>← Back to my recommendation</button>
                </>
              ) : (
                <>
                  <span className="modal-tag">YOUR SIZE</span>
                  <h3>{recommendation.label}</h3>
                  <div className="m-meta">{recommendation.sq} SQ FT · ~{recommendation.cap} CU FT</div>
                  <p className="m-fits">{recommendation.fits}</p>
                  <ul className="m-why">
                    {over ? (
                      <li className="warn">Your items may be more than a {recommendation.label} holds comfortably. Ask a facility about two units.</li>
                    ) : (
                      <li>Your {totalCount} items pack to about <b>{Math.round(totalVolume)} cu ft</b>. This unit holds {recommendation.cap}, leaving about {headroom}% headroom.</li>
                    )}
                    <li>Headroom covers awkward shapes, a slim walkway, and the box you forgot to count.</li>
                    {larger && (
                      <li>Sizing up &ldquo;just in case&rdquo; costs <b>${larger.price - recommendation.price}/mo</b> more for space you may not use.</li>
                    )}
                  </ul>
                  <div className="m-cmp">
                    {compareCard(smaller, "SMALLER")}
                    {compareCard(recommendation, "YOUR SIZE", true)}
                    {compareCard(larger, "LARGER")}
                  </div>
                  <div className="m-price"><b>${recommendation.price}</b><span>/ MO SAMPLE RATE</span></div>
                  <div className="m-actions">
                    {/* <Link href={searchHref(recommendation)} className="btn btn-ghost">Find storage</Link> */}
                    <button type="button" className="btn btn-coral" onClick={() => setFormOpen(true)}>Get storage options</button>
                    {/* <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Keep editing</button> */}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
