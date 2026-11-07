import { Metadata } from "next";
import V2LeadPage from "@/components/v2/V2LeadPage";
import V2ContactForm from "@/components/v2/V2ContactForm";

export const metadata: Metadata = {
  title: "Contact | SelfStorage.help",
  description:
    "Contact SelfStorage.help for business enquiries, sales, partnerships or any other question. We reply within one to two business days.",
};

export default function ContactPage() {
  return (
    <V2LeadPage
      title={<>Contact SelfStorage.help.</>}
      lead="Send us a business enquiry, a sales question, a partnership idea or anything else. Your message goes straight to our team, and you will hear back within one to two business days."
      sections={[
        {
          heading: "We can help with",
          items: [
            "Business and sales enquiries",
            "Partnerships and collaborations",
            "Press and media requests",
            "Questions about the site or your data",
          ],
        },
        {
          heading: "Looking for something specific?",
          body: (
            <>
              <p>Need a storage unit? <a href="/find-storage">Find storage near you</a>.</p>
              <p>Own a storage facility? <a href="/list-your-facility">List your facility</a>, <a href="/request-backlink">get a backlink</a> or <a href="/audit">request a free GEO &amp; AEO audit</a>.</p>
            </>
          ),
        },
        {
          heading: "Email us directly",
          body: <p><a href="mailto:business@maai.agency">business@maai.agency</a></p>,
        },
      ]}
      form={<V2ContactForm />}
      reassurance={["Reply within 1 to 2 business days", "Straight to our team"]}
    />
  );
}
