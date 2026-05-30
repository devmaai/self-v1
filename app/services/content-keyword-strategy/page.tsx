import { Metadata } from "next";
import V2ServicePage from "@/components/v2/services/V2ServicePage";
import { contentStrategyContent } from "@/components/v2/services/contentStrategyContent";

export const metadata: Metadata = {
  title: "Content Writing For Self-Storage Business Owners",
  description:
    "Unit size guides, city pages, and seasonal content built to rank for the searches your renters actually make and compound in traffic value year after year.",
};

export default function ContentKeywordStrategyPage() {
  return <V2ServicePage {...contentStrategyContent} />;
}
