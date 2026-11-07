import type { Metadata } from "next";
import ConsumerChrome from "@/components/layout/ConsumerChrome";

// Kept out of search for now; /agency is the main page for storage owners.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConsumerChrome>{children}</ConsumerChrome>;
}
