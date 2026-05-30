import { Metadata } from "next";
import V2ServicePage from "@/components/v2/services/V2ServicePage";
import { backlinksContent } from "@/components/v2/services/backlinksContent";

export const metadata: Metadata = {
  title: "Backlink Building for Self-Storage | SelfStorage.help",
  description:
    "Hyper-local backlinks earned from real community sources — moving companies, real estate forums, neighbourhood groups. No black-hat tactics, no link farms.",
};

export default function BacklinksPage() {
  return <V2ServicePage {...backlinksContent} />;
}
