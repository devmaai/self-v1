import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import RevealSection from "@/components/ui/RevealSection";

export const metadata: Metadata = {
  title: "Contact | SelfStorage.help",
  description:
    "Start with an audit, book a call, or send us a question. We reply to every message within two-three business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        headline={<>Let us help you <em>fill more units</em>.</>}
        subheadline="Start with an audit, book a call, or send us a question. We reply to every message within two-three business day."
      />

      <RevealSection className="contact-options">
        <div className="container">
          <div className="contact-options-grid">
            <div className="contact-option">
              <h3>Free audit</h3>
              <p>
                Tell us about your facility and we will send a full local visibility audit within
                two-three business days.
              </p>
              <a href="mailto:business@maai.agency?subject=Free+Audit+Request">
                Request an audit
              </a>
            </div>

            {/* <div className="contact-option">
              <h3>Book a call</h3>
              <p>
                Talk to our team about your facility, your goals, and whether we are a fit.
              </p>
              <a href="#">Book a 30-minute call</a>
            </div> */}

            <div className="contact-option">
              <h3>Send a message</h3>
              <p>A quick question, a specific situation, or just an introduction.</p>
              <a href="mailto:business@maai.agency">Send us a message</a>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="contact-direct">
        <div className="container">
          <h2 className="section-title">Direct contact</h2>
          <div className="contact-direct-grid">
            <div className="contact-direct-item">
              <h4>Email</h4>
              <a href="mailto:business@maai.agency">business@maai.agency</a>
            </div>
            <div className="contact-direct-item">
              <h4>Audit requests</h4>
              <p>Response within three business days</p>
            </div>
            {/* <div className="contact-direct-item">
              <h4>Strategy calls</h4>
              <p>Booked within five business days</p>
            </div>
            <div className="contact-direct-item">
              <h4>General messages</h4>
              <p>Response within one business day</p>
            </div> */}
            <div className="contact-direct-item">
              <h4>Mailing address</h4>
              <p>MAAI LLC, Wyoming, USA</p>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
