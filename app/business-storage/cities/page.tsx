import type { Metadata } from "next";
import StorageTypeCitiesPage from "@/components/sections/StorageTypeCitiesPage";
import { TYPE_CITIES } from "@/lib/storageTypeCities";

export const revalidate = 604800;

const c = TYPE_CITIES["business-storage"];

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: "/business-storage/cities" },
};

export default function Page() {
  return <StorageTypeCitiesPage c={c} />;
}
