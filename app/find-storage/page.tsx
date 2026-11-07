import type { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import V2StorageForm from "@/components/v2/V2StorageForm";
import V2LeadPage from "@/components/v2/V2LeadPage";

export const metadata: Metadata = {
  title: "Find a Storage Unit Near You | SelfStorage.help",
  description:
    "Tell us where you need storage, the unit size and your budget, and we will match you with storage facilities near you that fit. Free, no obligation.",
};

export default async function FindStoragePage({
  searchParams,
}: {
  searchParams: Promise<{ unitSize?: string }>;
}) {
  const { unitSize } = await searchParams;
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />

      <V2LeadPage
        title={<>Find a storage unit near you.</>}
        lead="Tell us where you need space, the unit size and your budget. We will match you with storage facilities in your area that fit your move, your budget and your dates."
        sections={[
          {
            heading: "How it works",
            steps: [
              "Share your city, unit size, budget and dates using the form.",
              "We check storage facilities in your area against what you need.",
              "You receive options to compare, and you choose the one that suits you.",
            ],
          },
          {
            heading: "What you can ask for",
            items: [
              "Indoor, drive-up and climate controlled units",
              "Car, RV and boat storage",
              "Business and commercial storage",
              "Short-term or long-term rentals",
            ],
          },
          {
            heading: "Not sure what size you need?",
            body: <p>Use our <a href="/storage-unit-size-calculator">storage size calculator</a> or read the <a href="/storage-size-guide">storage size guide</a> before you send your request.</p>,
          },
        ]}
        form={<V2StorageForm initialUnitSize={unitSize} />}
        reassurance={["Free, no obligation", "Options matched to your budget", "You choose the facility"]}
      />

      <V2Footer />
    </div>
  );
}
