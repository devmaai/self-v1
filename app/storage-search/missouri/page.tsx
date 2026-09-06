import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "Missouri Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across Missouri, including Kansas City, St. Louis, Springfield, Columbia, Independence, and Jefferson City.",
};

export default function MissouriStoragePage() {
  return <StateStoragePage config={{ state: "Missouri", abbreviation: "MO", region: "the Midwest", cities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence", "Jefferson City"], description: "Compare storage units, prices, and amenities in Missouri communities across the Ozarks, plains, and major metro areas.", content: <><p>Missouri storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
