import { Metadata } from "next";
import V2ServicePage from "@/components/v2/services/V2ServicePage";
import { multiLocationContent } from "@/components/v2/services/multiLocationContent";

export const metadata: Metadata = {
  title: "Multi-Location SEO for Self-Storage | SelfStorage.help",
  description:
    "Scale local SEO across every facility you operate without pitting your own locations against each other for the same keywords.",
};

export default function MultiLocationSeoPage() {
  return <V2ServicePage {...multiLocationContent} />;
}
