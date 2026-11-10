import type { Metadata } from "next";
import StorageCalculator from "@/components/StorageCalculator";
import StoragePriceGuide from "@/components/sections/StoragePriceGuide";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Free Storage Size Calculator | SelfStorage.help",
  description:
    "Estimate the storage unit size you need, then compare live monthly prices for 5x5, 5x10, 10x10, and 10x20 units across the United States.",
};

export default function StorageUnitSizeCalculatorPage() {
  return (
    <>
      <StorageCalculator />
      <StoragePriceGuide />
    </>
  );
}
