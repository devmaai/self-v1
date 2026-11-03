export type FinderIconName =
  | "sofa"
  | "chair"
  | "table"
  | "tv"
  | "shelf"
  | "round"
  | "bed"
  | "box"
  | "fridge"
  | "bike"
  | "tool"
  | "grill";

export type FinderCategory = "living" | "bedroom" | "dining" | "office" | "boxes" | "outdoor";

export type FinderItemType = "seat" | "table" | "dresser" | "boxes" | "vehicle" | "bed";

export type FinderItem = {
  id: string;
  name: string;
  dims: string;
  vol: number;
  cat: FinderCategory;
  ico: FinderIconName;
  type: FinderItemType;
};

export type FinderRoom = {
  id: string;
  name: string;
  desc: string;
  ico: FinderIconName;
  items: Record<string, number>;
};

export type FinderUnit = {
  id: string;
  label: string;
  w: number;
  sq: number;
  cap: number;
  price: number;
  fits: string;
};

export const FINDER_ITEMS: FinderItem[] = [
  { id: "sofa3", name: "Sofa (3-seat)", dims: "84 × 36 × 34 IN", vol: 45, cat: "living", ico: "sofa", type: "seat" },
  { id: "sofa2", name: "Loveseat", dims: "58 × 36 × 34 IN", vol: 30, cat: "living", ico: "sofa", type: "seat" },
  { id: "armchair", name: "Armchair", dims: "36 × 36 × 32 IN", vol: 20, cat: "living", ico: "chair", type: "seat" },
  { id: "coffee", name: "Coffee table", dims: "48 × 24 × 18 IN", vol: 12, cat: "living", ico: "table", type: "table" },
  { id: "tv", name: "TV 55\"", dims: "48 × 6 × 30 IN", vol: 8, cat: "living", ico: "tv", type: "dresser" },
  { id: "bookcase", name: "Bookcase", dims: "36 × 14 × 72 IN", vol: 25, cat: "living", ico: "shelf", type: "dresser" },
  { id: "rug", name: "Rug (rolled)", dims: "60 × 14 × 14 IN", vol: 7, cat: "living", ico: "round", type: "dresser" },
  { id: "floorlamp", name: "Floor lamp", dims: "16 × 16 × 66 IN", vol: 6, cat: "living", ico: "round", type: "table" },
  { id: "bedq", name: "Queen bed + mattress", dims: "84 × 60 × 24 IN", vol: 55, cat: "bedroom", ico: "bed", type: "bed" },
  { id: "bedt", name: "Twin bed + mattress", dims: "75 × 39 × 24 IN", vol: 28, cat: "bedroom", ico: "bed", type: "bed" },
  { id: "dresser", name: "Dresser", dims: "60 × 20 × 32 IN", vol: 22, cat: "bedroom", ico: "shelf", type: "dresser" },
  { id: "nightstand", name: "Nightstand", dims: "20 × 16 × 24 IN", vol: 5, cat: "bedroom", ico: "shelf", type: "dresser" },
  { id: "wardrobebox", name: "Wardrobe box", dims: "24 × 24 × 48 IN", vol: 16, cat: "bedroom", ico: "box", type: "boxes" },
  { id: "mirror", name: "Mirror", dims: "36 × 4 × 60 IN", vol: 5, cat: "bedroom", ico: "round", type: "dresser" },
  { id: "diningtable", name: "Dining table", dims: "72 × 38 × 30 IN", vol: 35, cat: "dining", ico: "table", type: "table" },
  { id: "chair", name: "Dining chair", dims: "20 × 20 × 36 IN", vol: 7, cat: "dining", ico: "chair", type: "seat" },
  { id: "sideboard", name: "Sideboard", dims: "60 × 20 × 34 IN", vol: 24, cat: "dining", ico: "shelf", type: "dresser" },
  { id: "desk", name: "Desk", dims: "60 × 30 × 30 IN", vol: 24, cat: "office", ico: "table", type: "table" },
  { id: "officechair", name: "Office chair", dims: "26 × 26 × 48 IN", vol: 10, cat: "office", ico: "chair", type: "seat" },
  { id: "filingcabinet", name: "Filing cabinet", dims: "18 × 18 × 52 IN", vol: 10, cat: "office", ico: "shelf", type: "dresser" },
  { id: "shelfunit", name: "Shelf unit", dims: "36 × 14 × 72 IN", vol: 25, cat: "office", ico: "shelf", type: "dresser" },
  { id: "boxsmall", name: "Small box", dims: "16 × 12 × 12 IN", vol: 2, cat: "boxes", ico: "box", type: "boxes" },
  { id: "boxmed", name: "Medium box", dims: "18 × 14 × 16 IN", vol: 3, cat: "boxes", ico: "box", type: "boxes" },
  { id: "boxlarge", name: "Large box", dims: "22 × 18 × 20 IN", vol: 5, cat: "boxes", ico: "box", type: "boxes" },
  { id: "boxxl", name: "XL box", dims: "24 × 20 × 22 IN", vol: 6, cat: "boxes", ico: "box", type: "boxes" },
  { id: "fridge", name: "Refrigerator", dims: "36 × 36 × 70 IN", vol: 45, cat: "boxes", ico: "fridge", type: "vehicle" },
  { id: "washer", name: "Washing machine", dims: "27 × 27 × 39 IN", vol: 16, cat: "boxes", ico: "fridge", type: "vehicle" },
  { id: "dryer", name: "Dryer", dims: "27 × 27 × 39 IN", vol: 16, cat: "boxes", ico: "fridge", type: "vehicle" },
  { id: "vacuum", name: "Vacuum cleaner", dims: "16 × 12 × 44 IN", vol: 5, cat: "boxes", ico: "round", type: "boxes" },
  { id: "luggage", name: "Suitcase", dims: "20 × 10 × 30 IN", vol: 4, cat: "boxes", ico: "box", type: "boxes" },
  { id: "bike", name: "Bicycle", dims: "68 × 10 × 44 IN", vol: 15, cat: "outdoor", ico: "bike", type: "vehicle" },
  { id: "ladder", name: "Ladder", dims: "24 × 20 × 72 IN", vol: 14, cat: "outdoor", ico: "tool", type: "vehicle" },
  { id: "lawnmower", name: "Lawn mower", dims: "30 × 24 × 36 IN", vol: 14, cat: "outdoor", ico: "tool", type: "vehicle" },
  { id: "toolchest", name: "Tool chest", dims: "36 × 20 × 24 IN", vol: 10, cat: "outdoor", ico: "tool", type: "vehicle" },
  { id: "grill", name: "BBQ grill", dims: "48 × 24 × 44 IN", vol: 24, cat: "outdoor", ico: "grill", type: "vehicle" },
  { id: "patiochairs", name: "Patio chairs (set of 4)", dims: "30 × 30 × 40 IN", vol: 15, cat: "outdoor", ico: "chair", type: "seat" },
];

export const FINDER_ROOMS: FinderRoom[] = [
  { id: "studio", name: "Studio apt", desc: "Bed, seating, boxes for a compact flat", ico: "bed", items: { bedt: 1, sofa2: 1, coffee: 1, nightstand: 1, boxmed: 4, boxsmall: 2 } },
  { id: "bed1", name: "1-bed apt", desc: "Full one-bedroom household", ico: "bed", items: { bedq: 1, sofa3: 1, dresser: 1, nightstand: 1, tv: 1, bookcase: 1, boxlarge: 6, boxsmall: 4 } },
  { id: "bed2", name: "2-bed home", desc: "Two bedrooms plus living space", ico: "bed", items: { bedq: 1, bedt: 1, sofa3: 1, dresser: 2, nightstand: 2, coffee: 1, tv: 1, diningtable: 1, chair: 4, boxlarge: 8, boxsmall: 6 } },
  { id: "bed3", name: "3-bed home", desc: "A full family home, packed", ico: "bed", items: { bedq: 2, bedt: 1, sofa3: 1, sofa2: 1, dresser: 3, nightstand: 3, diningtable: 1, chair: 6, sideboard: 1, bookcase: 2, fridge: 1, washer: 1, boxlarge: 10, boxsmall: 8 } },
  { id: "office", name: "Office", desc: "Desk, storage and files", ico: "tool", items: { desk: 2, officechair: 2, filingcabinet: 2, shelfunit: 2, boxmed: 6 } },
  { id: "garage", name: "Garage", desc: "Tools, wheels and yard gear", ico: "tool", items: { ladder: 1, lawnmower: 1, toolchest: 1, bike: 2, grill: 1, patiochairs: 1, boxlarge: 4 } },
];

export const FINDER_UNITS: FinderUnit[] = [
  { id: "5x5", label: "5×5", w: 5, sq: 25, cap: 125, price: 59, fits: "A closet. Boxes, bins and small furniture." },
  { id: "5x10", label: "5×10", w: 5, sq: 50, cap: 250, price: 89, fits: "A small studio. Mattress, boxes and a sofa." },
  { id: "10x10", label: "10×10", w: 10, sq: 100, cap: 500, price: 129, fits: "Two to three rooms of a home." },
  { id: "10x15", label: "10×15", w: 10, sq: 150, cap: 750, price: 159, fits: "Three to four rooms, appliances included." },
  { id: "10x20", label: "10×20", w: 10, sq: 200, cap: 1000, price: 199, fits: "A whole home, garage included." },
];

export const FINDER_CATEGORIES: { id: FinderCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "living", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "office", label: "Office" },
  { id: "boxes", label: "Boxes & misc" },
  { id: "outdoor", label: "Outdoor" },
];

export const FINDER_FURNITURE_COLORS: Record<FinderItemType, string> = {
  bed: "#DCEBF6",
  seat: "#F6E3D5",
  dresser: "#E8F2FA",
  table: "#F1E7D0",
  boxes: "#F7CF8A",
  vehicle: "#D9E2E8",
};
