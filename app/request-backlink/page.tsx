import type { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import V2RequestForm from "@/components/v2/V2RequestForm";
import V2LeadPage from "@/components/v2/V2LeadPage";

export const metadata: Metadata = {
  title: "Get a Backlink from SelfStorage.help | For Storage Owners",
  description:
    "Request a backlink from SelfStorage.help, a self storage comparison site renters use to compare units in their city. Tell us about your facility and we will reply with placement options.",
};

export default function RequestBacklinkPage() {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="home" />

      <V2LeadPage
        title={<>Get a backlink from SelfStorage.help.</>}
        lead="SelfStorage.help is a self storage comparison site renters use to compare units in their city. A link from a relevant city page or storage guide points those renters, and search engines, to your facility."
        sections={[
          {
            heading: "Why a link from us helps",
            items: [
              "It comes from a site that covers self storage only",
              "It sits on pages about your city or your storage type",
              "It sends renters who are already comparing units",
              "It supports your local rankings and map pack visibility",
            ],
          },
          {
            heading: "How it works",
            steps: [
              "Tell us about your facility and website using the form.",
              "We check that your facility is a real, operating storage business in a city we cover.",
              "We reply by email within two business days with placement options and next steps.",
            ],
          },
          {
            heading: "Who this is for",
            body: <p>Self storage owners and operators in the US, from single facilities to regional portfolios. Links are placed on pages that match your location and services.</p>,
          },
        ]}
        form={<V2RequestForm kind="backlink" />}
        reassurance={["Storage businesses only", "Reply within 2 business days", "Placed on relevant pages"]}
      />

      <V2Footer />
    </div>
  );
}
