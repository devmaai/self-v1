import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "New Jersey Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across New Jersey, including Newark, Jersey City, Paterson, Elizabeth, Edison, and Trenton.",
};

export default function NewJerseyStoragePage() {
  return <StateStoragePage config={{ state: "New Jersey", abbreviation: "NJ", region: "the Northeast", cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Trenton"], description: "Compare storage units, prices, and amenities in New Jersey communities near the coast, cities, and suburbs.", content: <><p>New Jersey storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
