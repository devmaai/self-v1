import type { Metadata } from "next";
import StorageCalculator from "@/components/StorageCalculator";

export const metadata: Metadata = {
  title: "Storage Unit Size Calculator | SelfStorage.help",
  description: "List your rooms or individual items to estimate the storage unit size you need.",
};

export default function StorageUnitSizeCalculatorPage() {
  return <StorageCalculator />;
}
