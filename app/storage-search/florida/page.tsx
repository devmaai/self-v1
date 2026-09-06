import type { Metadata } from "next";
import StateStoragePage from "@/components/sections/StateStoragePage";

export const metadata: Metadata = {
  title: "Florida Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across Florida, including Jacksonville, Miami, Tampa, Orlando, St. Petersburg, and Tallahassee.",
};

export default function FloridaStoragePage() {
  return <StateStoragePage config={{ state: "Florida", abbreviation: "FL", region: "the Southeast", cities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Tallahassee"], description: "Compare storage units, prices, and amenities in Florida communities from the Panhandle to South Florida.", content: <><p>Florida storage customers use units for apartment moves, home renovations, business inventory, outdoor gear, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></> }} />;
}
