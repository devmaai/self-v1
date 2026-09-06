import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "California Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across California, including Los Angeles, San Diego, San Jose, Sacramento, Fresno, and Oakland.",
};

export default function CaliforniaStoragePage() {
  return <StateStoragePage config={{ state: "California", abbreviation: "CA", region: "the Pacific Coast", cities: ["Los Angeles", "San Diego", "San Jose", "Sacramento", "Fresno", "Oakland"], description: "Compare storage units, prices, and amenities in California communities from the coast to the inland valleys.", content: <><p>California storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
