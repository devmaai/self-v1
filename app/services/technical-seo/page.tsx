import { Metadata } from "next";
import V2ServicePage from "@/components/v2/services/V2ServicePage";
import { technicalSeoContent } from "@/components/v2/services/technicalSeoContent";

export const metadata: Metadata = {
  title: "Technical SEO for Self-Storage | SelfStorage.help",
  description:
    "We fix the technical foundations of your self-storage website so Google can crawl it, renters can load it instantly, and your booking software converts the traffic you earn.",
};

export default function TechnicalSeoPage() {
  return <V2ServicePage {...technicalSeoContent} />;
}
