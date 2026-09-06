import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "New York Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across New York, including New York City, Buffalo, Rochester, Yonkers, Syracuse, and Albany.",
};

export default function NewYorkStoragePage() {
  return <StateStoragePage config={{ state: "New York", abbreviation: "NY", region: "the Northeast", cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"], description: "Compare storage units, prices, and amenities in New York communities from the Hudson Valley to western New York.", content: <><p>New York storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
