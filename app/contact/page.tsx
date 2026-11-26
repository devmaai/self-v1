import { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import V2LeadPage from "@/components/v2/V2LeadPage";
import V2ContactForm from "@/components/v2/V2ContactForm";

export const metadata: Metadata = {
  title: "Contact | SelfStorage.help",
  description:
    "Contact SelfStorage.help for business inquiries, sales, partnerships or any other question. We reply within one to two business days.",
};

export default function ContactPage() {
  return (
    <div className="v2-home agency-brand">
      <V2Interactions />
      <V2Nav variant="home" />

      <V2LeadPage
        title={<>Contact SelfStorage.help.</>}
        lead="Send us a business inquiry, a sales question, a partnership idea or anything else. Your message goes straight to our team, and you will hear back within one to two business days."
        sections={[
          {
            heading: "We can help with",
            items: [
              "Business and sales inquiries",
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
                <p>Own a storage facility? <a href="/list-your-facility">List your facility</a> or <a href="/audit">request a free GEO &amp; AEO audit</a>.</p>
              </>
            ),
          },
          {
            heading: "Email us directly",
            body: <p><a href="mailto:business@maai.agency">business@maai.agency</a></p>,
          },
        ]}
        variant="light"
        image="https://images.unsplash.com/photo-1758599543152-a73184816eba?auto=format&fit=crop&w=1800&q=80"
        highlights={["Sales and partnerships", "Press and media", "Reply in 1 to 2 days"]}
        eyebrow="Get in touch"
        formTitle="Send us a message"
        formSub="Your message goes straight to our team."
        form={<V2ContactForm />}
        reassurance={["Reply within 1 to 2 business days", "Straight to our team"]}
      />

      <V2Footer />
    </div>
  );
}
