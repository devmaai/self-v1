import type { Metadata } from "next";
import StorageTypePage from "@/components/sections/StorageTypePage";
import { carStorage } from "@/lib/storageTypes";

export const metadata: Metadata = {
  title: "Car Storage Near Me: Indoor, Covered and Outdoor | SelfStorage.help",
  description: "Compare car storage near you. Indoor, covered and outdoor car storage units with month-to-month rentals. Search and reserve in minutes.",
  alternates: { canonical: "/car-storage" },
};

export default function CarStoragePage() {
  return <StorageTypePage c={carStorage} />;
}
