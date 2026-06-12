import type { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import V2AuditForm from "@/components/v2/V2AuditForm";

export const metadata: Metadata = {
  title: "Request a Free Audit | SelfStorage.help",
  description:
    "Request a free local SEO audit for your self-storage facility. We review your site, GBP, and local rankings and deliver a written report within five business days.",
};

export default function AuditPage() {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />

      <section className="final-cta">
        <div className="inner">
          <h2 className="final-h2">Request your free<br />facility audit.</h2>
          <p className="final-lead">Tell us about your facility. We review your site, GBP, and local rankings and send a written report within five business days. No sales call required to receive it.</p>
          <V2AuditForm />
          <div className="final-reassurance">
            <div className="fr-item">Free, no obligation</div>
            <div className="fr-item">Written report in 5 business days</div>
            <div className="fr-item">No sales call required</div>
            <div className="fr-item">Yours to keep regardless</div>
          </div>
        </div>
      </section>

      <V2Footer />
    </div>
  );
}
