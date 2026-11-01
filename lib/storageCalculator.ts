export type RoomId = "bedroom" | "living-room" | "kitchen" | "dining-room" | "home-office" | "garage";

export type ItemGroupId = "bedroom" | "living-room" | "kitchen-dining" | "home-office" | "garage" | "boxes";

export type StorageItem = {
  id: string;
  name: string;
  category: string;
  volume: number;
  dimensions: string;
  group: ItemGroupId;
  rooms?: RoomId[];
};

export type StorageUnit = {
  id: string;
  label: string;
  width: number;
  length: number;
  area: number;
  capacity: number;
};

export type Recommendation = {
  unit: StorageUnit;
  smaller?: StorageUnit;
  larger?: StorageUnit;
  estimatedVolume: number;
  usableCapacity: number;
  packingEfficiency: number;
};

export const PACKING_EFFICIENCY = 0.65;

export const rooms: Array<{ id: RoomId; label: string; description: string; items: Array<{ itemId: string; quantity: number }> }> = [
  { id: "bedroom", label: "Bedroom", description: "Bed, dresser, nightstand, and boxes", items: [{ itemId: "queen-bed-frame", quantity: 1 }, { itemId: "queen-mattress", quantity: 1 }, { itemId: "dresser", quantity: 1 }, { itemId: "nightstand", quantity: 1 }, { itemId: "medium-box", quantity: 10 }] },
  { id: "living-room", label: "Living room", description: "Sofa, tables, media, and boxes", items: [{ itemId: "three-seater-sofa", quantity: 1 }, { itemId: "coffee-table", quantity: 1 }, { itemId: "side-table", quantity: 2 }, { itemId: "television", quantity: 1 }, { itemId: "medium-box", quantity: 6 }] },
  { id: "kitchen", label: "Kitchen", description: "Appliances, tableware, and boxes", items: [{ itemId: "refrigerator", quantity: 1 }, { itemId: "dishwasher", quantity: 1 }, { itemId: "microwave", quantity: 1 }, { itemId: "medium-box", quantity: 8 }] },
  { id: "dining-room", label: "Dining room", description: "Table, chairs, and boxes", items: [{ itemId: "dining-table", quantity: 1 }, { itemId: "dining-chair", quantity: 6 }, { itemId: "medium-box", quantity: 4 }] },
  { id: "home-office", label: "Home office", description: "Desk, chair, shelf, and boxes", items: [{ itemId: "desk", quantity: 1 }, { itemId: "office-chair", quantity: 1 }, { itemId: "bookshelf", quantity: 1 }, { itemId: "medium-box", quantity: 5 }] },
  { id: "garage", label: "Garage", description: "Shelving, tools, and larger boxes", items: [{ itemId: "garage-shelving", quantity: 2 }, { itemId: "bicycle", quantity: 2 }, { itemId: "large-box", quantity: 10 }] },
];

export const itemGroups: Array<{ id: ItemGroupId; label: string; description: string }> = [
  { id: "bedroom", label: "Bedroom", description: "Beds, mattresses, and bedroom furniture" },
  { id: "living-room", label: "Living room", description: "Sofas, tables, and media" },
  { id: "kitchen-dining", label: "Kitchen & dining", description: "Appliances, tables, and chairs" },
  { id: "home-office", label: "Home office", description: "Desks, chairs, and shelving" },
  { id: "garage", label: "Garage & outdoor", description: "Shelving, tools, and bikes" },
  { id: "boxes", label: "Boxes & misc", description: "Moving boxes and small items" },
];

export const items: StorageItem[] = [
  { id: "twin-bed-frame", name: "Twin bed frame", category: "Beds", volume: 32, dimensions: "6' x 3' x 1.5'", group: "bedroom" },
  { id: "full-bed-frame", name: "Full bed frame", category: "Beds", volume: 42, dimensions: "6' x 4.5' x 1.5'", group: "bedroom" },
  { id: "queen-bed-frame", name: "Queen bed frame", category: "Beds", volume: 48, dimensions: "6.5' x 5' x 1.5'", rooms: ["bedroom"], group: "bedroom" },
  { id: "king-bed-frame", name: "King bed frame", category: "Beds", volume: 60, dimensions: "7' x 6' x 1.5'", group: "bedroom" },
  { id: "twin-mattress", name: "Twin mattress", category: "Mattresses", volume: 18, dimensions: "6.25' x 3.25' x 0.75'", group: "bedroom" },
  { id: "full-mattress", name: "Full mattress", category: "Mattresses", volume: 23, dimensions: "6.25' x 4.5' x 0.75'", group: "bedroom" },
  { id: "queen-mattress", name: "Queen mattress", category: "Mattresses", volume: 26, dimensions: "6.7' x 5' x 0.75'", rooms: ["bedroom"], group: "bedroom" },
  { id: "king-mattress", name: "King mattress", category: "Mattresses", volume: 32, dimensions: "6.7' x 6.3' x 0.75'", group: "bedroom" },
  { id: "loveseat", name: "Loveseat", category: "Sofas", volume: 55, dimensions: "5' x 3' x 3'", group: "living-room" },
  { id: "two-seater-sofa", name: "2-seater sofa", category: "Sofas", volume: 68, dimensions: "6' x 3' x 3'", group: "living-room" },
  { id: "three-seater-sofa", name: "3-seater sofa", category: "Sofas", volume: 90, dimensions: "7.5' x 3.5' x 3'", rooms: ["living-room"], group: "living-room" },
  { id: "sectional-sofa", name: "Sectional sofa", category: "Sofas", volume: 140, dimensions: "9' x 7' x 3'", group: "living-room" },
  { id: "dresser", name: "Dresser", category: "Furniture", volume: 35, dimensions: "5' x 1.5' x 3.5'", rooms: ["bedroom"], group: "bedroom" },
  { id: "nightstand", name: "Nightstand", category: "Furniture", volume: 8, dimensions: "2' x 1.5' x 2.5'", rooms: ["bedroom"], group: "bedroom" },
  { id: "wardrobe", name: "Wardrobe", category: "Furniture", volume: 45, dimensions: "3' x 2' x 4'", group: "bedroom" },
  { id: "coffee-table", name: "Coffee table", category: "Tables", volume: 20, dimensions: "4' x 2' x 1.5'", rooms: ["living-room"], group: "living-room" },
  { id: "side-table", name: "Side table", category: "Tables", volume: 8, dimensions: "2' x 2' x 2'", rooms: ["living-room"], group: "living-room" },
  { id: "dining-table", name: "Dining table", category: "Tables", volume: 45, dimensions: "6' x 3' x 2.5'", rooms: ["dining-room"], group: "kitchen-dining" },
  { id: "dining-chair", name: "Dining chair", category: "Chairs", volume: 8, dimensions: "2' x 2' x 3'", rooms: ["dining-room"], group: "kitchen-dining" },
  { id: "desk", name: "Desk", category: "Desks", volume: 32, dimensions: "5' x 2.5' x 2.5'", rooms: ["home-office"], group: "home-office" },
  { id: "office-chair", name: "Office chair", category: "Chairs", volume: 12, dimensions: "2.5' x 2.5' x 4'", rooms: ["home-office"], group: "home-office" },
  { id: "bookshelf", name: "Bookshelf", category: "Furniture", volume: 30, dimensions: "3' x 1' x 6'", rooms: ["home-office"], group: "home-office" },
  { id: "refrigerator", name: "Refrigerator", category: "Appliances", volume: 75, dimensions: "3' x 3' x 6'", rooms: ["kitchen"], group: "kitchen-dining" },
  { id: "dishwasher", name: "Dishwasher", category: "Appliances", volume: 35, dimensions: "2' x 2' x 3'", rooms: ["kitchen"], group: "kitchen-dining" },
  { id: "microwave", name: "Microwave", category: "Appliances", volume: 5, dimensions: "2' x 1.5' x 1'", rooms: ["kitchen"], group: "kitchen-dining" },
  { id: "television", name: "Television", category: "Electronics", volume: 8, dimensions: "4.5' x 0.5' x 2.5'", rooms: ["living-room"], group: "living-room" },
  { id: "garage-shelving", name: "Garage shelving", category: "Garage", volume: 32, dimensions: "4' x 2' x 4'", rooms: ["garage"], group: "garage" },
  { id: "bicycle", name: "Bicycle", category: "Garage", volume: 18, dimensions: "6' x 2' x 4'", rooms: ["garage"], group: "garage" },
  { id: "small-box", name: "Small moving box", category: "Boxes", volume: 2.5, dimensions: "1.5' x 1' x 1.5'", group: "boxes" },
  { id: "medium-box", name: "Medium moving box", category: "Boxes", volume: 4.5, dimensions: "2' x 1.5' x 1.5'", rooms: ["bedroom", "living-room", "kitchen", "dining-room", "home-office"], group: "boxes" },
  { id: "large-box", name: "Large moving box", category: "Boxes", volume: 8, dimensions: "2.5' x 2' x 1.5'", rooms: ["garage"], group: "boxes" },
];

export const storageUnits: StorageUnit[] = [
  [5, 5], [5, 10], [5, 15], [10, 10], [10, 15], [10, 20], [10, 25], [10, 30],
].map(([width, length]) => ({
  id: `${width}x${length}`,
  label: `${width} × ${length}`,
  width,
  length,
  area: width * length,
  capacity: width * length * 8,
}));

export type UnitContext = {
  comparison: string;
  fits: string;
};

export const unitContext: Record<string, UnitContext> = {
  "5x5": {
    comparison: "a small closet",
    fits: "about a dozen medium boxes, seasonal gear, and a chair",
  },
  "5x10": {
    comparison: "a walk-in closet",
    fits: "a queen bed, a dresser, a TV, and several medium boxes",
  },
  "5x15": {
    comparison: "a small bedroom",
    fits: "a one-bedroom apartment without large appliances",
  },
  "10x10": {
    comparison: "a standard bedroom",
    fits: "a one-bedroom apartment, including a sofa, bed, dresser, and kitchen appliances",
  },
  "10x15": {
    comparison: "a large bedroom",
    fits: "a two-bedroom apartment or a small home",
  },
  "10x20": {
    comparison: "a one-car garage",
    fits: "a three-bedroom home, including large furniture and appliances",
  },
  "10x25": {
    comparison: "a one-car garage with extra workspace",
    fits: "a three- or four-bedroom home or a small business inventory",
  },
  "10x30": {
    comparison: "a large one-car garage or a small two-car garage",
    fits: "a large home, vehicle, or business inventory",
  },
};

export type FloorPlanBlockKind = "bed" | "sofa" | "dresser" | "table" | "box" | "vehicle";

export type FloorPlanBlock = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  kind: FloorPlanBlockKind;
};

// Coordinates are in feet: x runs along the unit length, y along the width.
export const unitFloorPlans: Record<string, FloorPlanBlock[]> = {
  "5x5": [
    { x: 0.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 2.8, y: 0.5, w: 1.7, h: 2, label: "Boxes", kind: "box" },
    { x: 0.5, y: 2.8, w: 2, h: 1.7, label: "Boxes", kind: "box" },
    { x: 2.8, y: 2.8, w: 1.7, h: 1.7, label: "Boxes", kind: "box" },
  ],
  "5x10": [
    { x: 0.5, y: 0, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 7.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 7.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
  ],
  "5x15": [
    { x: 0.5, y: 0, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 7.5, y: 0, w: 5, h: 1.5, label: "Dresser", kind: "dresser" },
    { x: 7.5, y: 2, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 10, y: 2, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 12.5, y: 2, w: 2, h: 2, label: "Boxes", kind: "box" },
  ],
  "10x10": [
    { x: 0.5, y: 0.5, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 8, y: 0.5, w: 1.5, h: 5, label: "Dresser", kind: "dresser" },
    { x: 0.5, y: 6, w: 7.5, h: 3, label: "Sofa", kind: "sofa" },
    { x: 8, y: 6, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 8, y: 8, w: 2, h: 2, label: "Boxes", kind: "box" },
  ],
  "10x15": [
    { x: 0.5, y: 0.5, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 8, y: 0.5, w: 1.5, h: 5, label: "Dresser", kind: "dresser" },
    { x: 0.5, y: 6, w: 7.5, h: 3, label: "Sofa", kind: "sofa" },
    { x: 8, y: 6, w: 3, h: 3, label: "Table", kind: "table" },
    { x: 11.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
  ],
  "10x20": [
    { x: 0.5, y: 0.5, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 8, y: 0.5, w: 1.5, h: 5, label: "Dresser", kind: "dresser" },
    { x: 0.5, y: 6, w: 7.5, h: 3, label: "Sofa", kind: "sofa" },
    { x: 8, y: 6, w: 3, h: 3, label: "Table", kind: "table" },
    { x: 11.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
  ],
  "10x25": [
    { x: 0.5, y: 0.5, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 8, y: 0.5, w: 1.5, h: 5, label: "Dresser", kind: "dresser" },
    { x: 0.5, y: 6, w: 7.5, h: 3, label: "Sofa", kind: "sofa" },
    { x: 8, y: 6, w: 3, h: 3, label: "Table", kind: "table" },
    { x: 11.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 19, y: 0.5, w: 3, h: 3, label: "Table", kind: "table" },
  ],
  "10x30": [
    { x: 0.5, y: 0.5, w: 6.5, h: 5, label: "Queen bed", kind: "bed" },
    { x: 8, y: 0.5, w: 1.5, h: 5, label: "Dresser", kind: "dresser" },
    { x: 0.5, y: 6, w: 7.5, h: 3, label: "Sofa", kind: "sofa" },
    { x: 8, y: 6, w: 3, h: 3, label: "Table", kind: "table" },
    { x: 11.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 11.5, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 14, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 0.5, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 2.8, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 5.1, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 16.5, y: 7.4, w: 2, h: 2, label: "Boxes", kind: "box" },
    { x: 19, y: 0.5, w: 3, h: 3, label: "Table", kind: "table" },
    { x: 22.5, y: 0.5, w: 7, h: 4.5, label: "Vehicle", kind: "vehicle" },
  ],
};

export function getItem(itemId: string) {
  return items.find((item) => item.id === itemId);
}

export function calculateRecommendation(selected: Record<string, number>): Recommendation | null {
  const estimatedVolume = Object.entries(selected).reduce((total, [itemId, quantity]) => {
    const item = getItem(itemId);
    return item && Number.isFinite(quantity) && quantity > 0 ? total + item.volume * Math.floor(quantity) : total;
  }, 0);
  if (estimatedVolume <= 0) return null;
  const unitIndex = storageUnits.findIndex((unit) => estimatedVolume <= unit.capacity * PACKING_EFFICIENCY);
  const selectedIndex = unitIndex === -1 ? storageUnits.length - 1 : unitIndex;
  return {
    unit: storageUnits[selectedIndex],
    smaller: storageUnits[selectedIndex - 1],
    larger: storageUnits[selectedIndex + 1],
    estimatedVolume,
    usableCapacity: storageUnits[selectedIndex].capacity * PACKING_EFFICIENCY,
    packingEfficiency: PACKING_EFFICIENCY,
  };
}
