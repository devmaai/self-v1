import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "Kansas Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across Kansas, including Wichita, Overland Park, Kansas City, Olathe, Topeka, and Lawrence.",
};

export default function KansasStoragePage() {
  return <StateStoragePage config={{ state: "Kansas", abbreviation: "KS", region: "the Great Plains", cities: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka", "Lawrence"], description: "Compare storage units, prices, and amenities in Kansas communities from the metro area to the plains.", content: <><p>Kansas storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
