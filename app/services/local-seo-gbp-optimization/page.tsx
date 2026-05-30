import { Metadata } from "next";
import V2ServicePage from "@/components/v2/services/V2ServicePage";
import { localSeoContent } from "@/components/v2/services/localSeoContent";

export const metadata: Metadata = {
  title: "Local SEO & Google Business Profile Optimization | SelfStorage.help",
  description:
    "Our Local SEO and Google Maps program puts your facility in front of renters the moment they search for storage in your area.",
};

export default function LocalSeoGbpPage() {
  return <V2ServicePage {...localSeoContent} />;
}
