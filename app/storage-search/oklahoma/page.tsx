import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "Oklahoma Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across Oklahoma, including Oklahoma City, Tulsa, Norman, Edmond, Broken Arrow, and Lawton.",
};

export default function OklahomaStoragePage() {
  return <StateStoragePage config={{ state: "Oklahoma", abbreviation: "OK", region: "the Southern Plains", cities: ["Oklahoma City", "Tulsa", "Norman", "Edmond", "Broken Arrow", "Lawton"], description: "Compare storage units, prices, and amenities in Oklahoma communities across the state.", content: <><p>Oklahoma storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
