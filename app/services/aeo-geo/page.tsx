import { Metadata } from "next";
import V2ServicePage from "@/components/v2/services/V2ServicePage";
import { aeoGeoContent } from "@/components/v2/services/aeoGeoContent";

export const metadata: Metadata = {
  title: "AEO & GEO — AI Search Visibility for Self-Storage | SelfStorage.help",
  description:
    "Get cited by ChatGPT, Perplexity, Gemini, and Google AI Overviews when renters ask about storage. Schema, entity authority, and answer-first content built for self-storage operators.",
};

export default function AeoGeoPage() {
  return <V2ServicePage {...aeoGeoContent} />;
}
