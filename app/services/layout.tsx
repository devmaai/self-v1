import type { Metadata } from "next";

// Service pages are kept out of search for now; /agency is the main service page.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
