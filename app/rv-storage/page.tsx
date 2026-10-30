import type { Metadata } from "next";
import StorageTypePage from "@/components/sections/StorageTypePage";
import { rvStorage } from "@/lib/storageTypes";

export const metadata: Metadata = {
  title: "RV Storage Near Me: Covered, Indoor and Outdoor | SelfStorage.help",
  description: "Compare RV storage near you. Covered, indoor and outdoor RV storage facilities with month-to-month rentals. Search and reserve in minutes.",
  alternates: { canonical: "/rv-storage" },
};

export default function RvStoragePage() {
  return <StorageTypePage c={rvStorage} />;
}
