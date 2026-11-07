import type { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import V2AuditForm from "@/components/v2/V2AuditForm";
import V2LeadPage from "@/components/v2/V2LeadPage";

export const metadata: Metadata = {
  title: "Free GEO & AEO Audit for Your Storage Business | SelfStorage.help",
  description:
    "Request a free GEO & AEO audit for your self-storage facility. We review your website, Google Business Profile, local rankings and AI answer visibility, and send a written report within five business days.",
};

export default function AuditPage() {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="home" />

      <V2LeadPage
        title={<>Request a free GEO &amp; AEO audit of your storage business.</>}
        lead="Find out how your facility shows up when renters search on Google Maps, in local results and in AI answers such as ChatGPT, Perplexity and Google AI Overviews."
        sections={[
          {
            heading: "What the audit covers",
            items: [
              "Technical health of your website",
              "Google Business Profile completeness and gaps",
              "Current keyword rankings and map pack position",
              "Competitor landscape in your trade area",
              "Whether AI answer engines mention your facility",
              "Content gaps and your backlink profile",
            ],
          },
          {
            heading: "What to expect",
            steps: [
              "Send us your facility details using the form.",
              "We review your site, profile and rankings.",
              "You receive a written report with prioritized recommendations within five business days.",
            ],
          },
          {
            heading: "Who this is for",
            body: <p>Independent storage owners and multi-location operators in the US who want more move-ins from search. You keep the report whether you work with us or not.</p>,
          },
        ]}
        form={<V2AuditForm />}
        reassurance={["Free, no obligation", "Written report in 5 business days", "No sales call required"]}
      />

      <V2Footer />
    </div>
  );
}
