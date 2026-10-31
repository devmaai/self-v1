export type RoomId = "bedroom" | "living-room" | "kitchen" | "dining-room" | "home-office" | "garage";

export type StorageItem = {
  id: string;
  name: string;
  category: string;
  volume: number;
  dimensions: string;
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

export const items: StorageItem[] = [
  { id: "twin-bed-frame", name: "Twin bed frame", category: "Beds", volume: 32, dimensions: "6' x 3' x 1.5'" },
  { id: "full-bed-frame", name: "Full bed frame", category: "Beds", volume: 42, dimensions: "6' x 4.5' x 1.5'" },
  { id: "queen-bed-frame", name: "Queen bed frame", category: "Beds", volume: 48, dimensions: "6.5' x 5' x 1.5'", rooms: ["bedroom"] },
  { id: "king-bed-frame", name: "King bed frame", category: "Beds", volume: 60, dimensions: "7' x 6' x 1.5'" },
  { id: "twin-mattress", name: "Twin mattress", category: "Mattresses", volume: 18, dimensions: "6.25' x 3.25' x 0.75'" },
  { id: "full-mattress", name: "Full mattress", category: "Mattresses", volume: 23, dimensions: "6.25' x 4.5' x 0.75'" },
  { id: "queen-mattress", name: "Queen mattress", category: "Mattresses", volume: 26, dimensions: "6.7' x 5' x 0.75'", rooms: ["bedroom"] },
  { id: "king-mattress", name: "King mattress", category: "Mattresses", volume: 32, dimensions: "6.7' x 6.3' x 0.75'" },
  { id: "loveseat", name: "Loveseat", category: "Sofas", volume: 55, dimensions: "5' x 3' x 3'", },
  { id: "two-seater-sofa", name: "2-seater sofa", category: "Sofas", volume: 68, dimensions: "6' x 3' x 3'" },
  { id: "three-seater-sofa", name: "3-seater sofa", category: "Sofas", volume: 90, dimensions: "7.5' x 3.5' x 3'", rooms: ["living-room"] },
  { id: "sectional-sofa", name: "Sectional sofa", category: "Sofas", volume: 140, dimensions: "9' x 7' x 3'" },
  { id: "dresser", name: "Dresser", category: "Furniture", volume: 35, dimensions: "5' x 1.5' x 3.5'", rooms: ["bedroom"] },
  { id: "nightstand", name: "Nightstand", category: "Furniture", volume: 8, dimensions: "2' x 1.5' x 2.5'", rooms: ["bedroom"] },
  { id: "wardrobe", name: "Wardrobe", category: "Furniture", volume: 45, dimensions: "3' x 2' x 4'" },
  { id: "coffee-table", name: "Coffee table", category: "Tables", volume: 20, dimensions: "4' x 2' x 1.5'", rooms: ["living-room"] },
  { id: "side-table", name: "Side table", category: "Tables", volume: 8, dimensions: "2' x 2' x 2'", rooms: ["living-room"] },
  { id: "dining-table", name: "Dining table", category: "Tables", volume: 45, dimensions: "6' x 3' x 2.5'", rooms: ["dining-room"] },
  { id: "dining-chair", name: "Dining chair", category: "Chairs", volume: 8, dimensions: "2' x 2' x 3'", rooms: ["dining-room"] },
  { id: "desk", name: "Desk", category: "Desks", volume: 32, dimensions: "5' x 2.5' x 2.5'", rooms: ["home-office"] },
  { id: "office-chair", name: "Office chair", category: "Chairs", volume: 12, dimensions: "2.5' x 2.5' x 4'", rooms: ["home-office"] },
  { id: "bookshelf", name: "Bookshelf", category: "Furniture", volume: 30, dimensions: "3' x 1' x 6'", rooms: ["home-office"] },
  { id: "refrigerator", name: "Refrigerator", category: "Appliances", volume: 75, dimensions: "3' x 3' x 6'", rooms: ["kitchen"] },
  { id: "dishwasher", name: "Dishwasher", category: "Appliances", volume: 35, dimensions: "2' x 2' x 3'", rooms: ["kitchen"] },
  { id: "microwave", name: "Microwave", category: "Appliances", volume: 5, dimensions: "2' x 1.5' x 1'", rooms: ["kitchen"] },
  { id: "television", name: "Television", category: "Electronics", volume: 8, dimensions: "4.5' x 0.5' x 2.5'", rooms: ["living-room"] },
  { id: "garage-shelving", name: "Garage shelving", category: "Garage", volume: 32, dimensions: "4' x 2' x 4'", rooms: ["garage"] },
  { id: "bicycle", name: "Bicycle", category: "Garage", volume: 18, dimensions: "6' x 2' x 4'", rooms: ["garage"] },
  { id: "small-box", name: "Small moving box", category: "Boxes", volume: 2.5, dimensions: "1.5' x 1' x 1.5'" },
  { id: "medium-box", name: "Medium moving box", category: "Boxes", volume: 4.5, dimensions: "2' x 1.5' x 1.5'", rooms: ["bedroom", "living-room", "kitchen", "dining-room", "home-office"] },
  { id: "large-box", name: "Large moving box", category: "Boxes", volume: 8, dimensions: "2.5' x 2' x 1.5'", rooms: ["garage"] },
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
