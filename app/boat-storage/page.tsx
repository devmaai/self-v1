import type { Metadata } from "next";
import StorageTypePage from "@/components/sections/StorageTypePage";
import { boatStorage } from "@/lib/storageTypes";

export const metadata: Metadata = {
  title: "Boat Storage Near Me: Indoor, Covered and Outdoor | SelfStorage.help",
  description: "Compare boat storage near you. Indoor, covered and outdoor boat storage units with trailer parking. Search and reserve in minutes.",
  alternates: { canonical: "/boat-storage" },
};

export default function BoatStoragePage() {
  return <StorageTypePage c={boatStorage} />;
}
