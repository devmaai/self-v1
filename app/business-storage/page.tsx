import type { Metadata } from "next";
import StorageTypePage from "@/components/sections/StorageTypePage";
import { businessStorage } from "@/lib/storageTypes";

export const metadata: Metadata = {
  title: "Business Storage Units Near Me | Commercial Storage | SelfStorage.help",
  description: "Compare business storage units near you for inventory, documents and equipment. Month-to-month commercial storage. Search and reserve in minutes.",
  alternates: { canonical: "/business-storage" },
};

export default function BusinessStoragePage() {
  return <StorageTypePage c={businessStorage} />;
}
