import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "South Dakota Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across South Dakota, including Sioux Falls, Rapid City, Aberdeen, Brookings, Watertown, and Pierre.",
};

export default function SouthDakotaStoragePage() {
  return <StateStoragePage config={{ state: "South Dakota", abbreviation: "SD", region: "the Northern Plains", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown", "Pierre"], description: "Compare storage units, prices, and amenities in South Dakota communities across the plains and Black Hills.", content: <><p>South Dakota storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
