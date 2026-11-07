import type { Metadata } from "next";
import StorageTypePage from "@/components/sections/StorageTypePage";
import { studentStorage } from "@/lib/storageTypes";

export const metadata: Metadata = {
  title: "Student Storage Near Campus: Small, Flexible Units | SelfStorage.help",
  description: "Compare student storage near your college. Small storage units for summer break, study abroad and moves between dorms, with month-to-month rentals.",
  alternates: { canonical: "/student-storage" },
};

export default function StudentStoragePage() {
  return <StorageTypePage c={studentStorage} />;
}
