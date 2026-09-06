import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "Texas Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across Texas, including Houston, San Antonio, Dallas, Austin, Fort Worth, and El Paso.",
};

export default function TexasStoragePage() {
  return <StateStoragePage config={{ state: "Texas", abbreviation: "TX", region: "the South", cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso"], description: "Compare storage units, prices, and amenities in Texas communities from the Gulf Coast to West Texas.", content: <><p>Texas storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
