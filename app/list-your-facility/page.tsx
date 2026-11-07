import type { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import V2RequestForm from "@/components/v2/V2RequestForm";
import V2LeadPage from "@/components/v2/V2LeadPage";

export const metadata: Metadata = {
  title: "List Your Storage Facility | SelfStorage.help",
  description:
    "List your self storage facility on SelfStorage.help so renters comparing units in your city can find your sizes, prices and contact details.",
};

export default function ListYourFacilityPage() {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="home" />

      <V2LeadPage
        title={<>List your storage facility on SelfStorage.help.</>}
        lead="Renters use SelfStorage.help to compare storage units in their city. Add your facility so they can see your unit sizes, prices and contact details when they search."
        sections={[
          {
            heading: "What to send us",
            items: [
              "Facility name and address",
              "Unit sizes and types, such as drive-up, indoor or climate controlled",
              "Starting prices or your current rates",
              "Your website and the best contact for renters",
            ],
          },
          {
            heading: "What happens next",
            steps: [
              "Send your facility details using the form.",
              "We review them and set up your listing on the matching city page.",
              "We confirm by email within two business days. You can ask us to update your details at any time.",
            ],
          },
          {
            heading: "Want more than a listing?",
            body: <p>If you also want to rank higher on Google Maps and in AI answers, <a href="/audit">request a free GEO &amp; AEO audit</a> of your storage business.</p>,
          },
        ]}
        form={<V2RequestForm kind="listing" />}
        reassurance={["Free to request", "Reply within 2 business days", "Update your details anytime"]}
      />

      <V2Footer />
    </div>
  );
}
