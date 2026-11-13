import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy | SelfStorage.help",
  description:
    "How SelfStorage.help, operated by MAAI LLC, collects, uses, shares and protects your personal information, and the privacy rights you have.",
  alternates: { canonical: "/privacy" },
};

type Item = string | { b: string; x: string };
type Block =
  | { t: "h2" | "h3" | "p"; x: string }
  | { t: "ul"; i: Item[] }
  | { t: "lines"; i: string[] };

const BLOCKS: Block[] = [
  { t: "h2", x: "1. Who We Are" },
  { t: "p", x: `SelfStorage.help (the "Site"), located at https://www.selfstorage.help/, is operated by MAAI LLC, doing business as SelfStorage.help ("Maai", "we", "us", or "our"), a Wyoming limited liability company with its registered agent address at 309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801.` },
  { t: "p", x: "This Privacy Policy explains what personal information we collect when you use the Site, how we use and share it, how long we keep it, and the choices and rights you have. It should be read together with our Terms and Conditions at https://www.selfstorage.help/terms." },

  { t: "h2", x: "2. Information We Collect" },
  { t: "h3", x: "2.1 Information you give us" },
  { t: "p", x: "We collect the information you enter into forms on the Site. Depending on the form, this may include:" },
  { t: "ul", i: [
    { b: "Storage request forms (renters):", x: "your name, email address, phone number, location or ZIP code, the unit size or type you need, your move-in date, the items you plan to store, and any preferred facility or brand." },
    { b: "Business forms (storage facility owners and operators):", x: "your name, job title, business name, facility address, website, email address, phone number, and details of the service you request, such as a facility listing, a backlink, an audit, or SEO services." },
    { b: "Contact form:", x: "your name, email address, and the content of your message." },
    { b: "Emails you send us:", x: "your email address and the content of your message." },
  ] },
  { t: "h3", x: "2.2 Information collected automatically" },
  { t: "p", x: "When you visit the Site, we and our service providers automatically collect certain technical information, such as your IP address, browser type, device type, approximate location derived from your IP address, pages visited, referring pages, and the date and time of your visit. We collect this through server logs, cookies, and similar technologies (see Section 6)." },
  { t: "h3", x: "2.3 Information from public sources" },
  { t: "p", x: "Storage facility listings on the Site are compiled from publicly available business information, such as provider websites and public business directories. This information relates to businesses, not to individual renters." },

  { t: "h2", x: "3. How We Use Your Information" },
  { t: "p", x: "We use personal information to:" },
  { t: "ul", i: [
    "Process your storage request and match you with suitable storage facilities, or send your request to the facility or brand you choose.",
    "Respond to enquiries and provide the services storage facility owners and operators request from us.",
    "Contact you by email, phone, or text about your request.",
    "Operate, maintain, secure, and improve the Site, including preventing spam and fraudulent form submissions.",
    "Understand how visitors use the Site so we can improve its content and features.",
    "Comply with legal obligations and enforce our Terms and Conditions.",
  ] },

  { t: "h2", x: "4. How We Share Your Information" },
  { t: "p", x: "We do not sell your personal information for money. We share personal information only as described below." },
  { t: "ul", i: [
    { b: "Storage Providers:", x: "When you submit a storage request, we share the details you provide with the storage facilities we match you with, or with the facility you choose, so they can contact you about your request. Some Storage Providers pay us for these referrals. Once a Storage Provider receives your details, its own privacy policy governs how it uses them." },
    { b: "Service providers:", x: "We use trusted third parties to run the Site on our behalf, including website hosting (Vercel), website security and spam protection (Cloudflare, including Cloudflare Turnstile), email delivery (Resend), and website analytics and tag management (Google Tag Manager and related Google services). These providers may process personal information only as needed to provide their services to us." },
    { b: "Legal reasons:", x: "We may disclose information if required by law, or if we believe in good faith that disclosure is needed to protect our rights, your safety, or the safety of others, or to investigate fraud." },
    { b: "Business transfers:", x: "If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction." },
  ] },
  { t: "p", x: `Sharing your storage request with Storage Providers that pay us for referrals may be treated as a "sale" or "sharing" of personal information under some US state privacy laws. See Section 8 for your rights.` },

  { t: "h2", x: "5. Phone, Text, and Email Communications" },
  { t: "p", x: "If you provide a phone number in a storage request, you agree that the Storage Provider(s) and/or Maai may contact you by phone, text, or email about your request. You can opt out of text messages by replying STOP, and out of marketing emails by using the unsubscribe link or emailing us." },

  { t: "h2", x: "6. Cookies and Similar Technologies" },
  { t: "p", x: "The Site uses cookies and similar technologies to keep the Site secure, prevent spam, and measure how visitors use the Site. These include:" },
  { t: "ul", i: [
    { b: "Essential and security cookies:", x: "used by Cloudflare to protect the Site and verify that form submissions come from real people." },
    { b: "Analytics cookies:", x: "set through Google Tag Manager to help us understand traffic and page performance." },
  ] },
  { t: "p", x: "You can block or delete cookies through your browser settings. Blocking some cookies may affect how the Site works. You can also learn how Google uses data at https://policies.google.com/technologies/partner-sites." },
  { t: "p", x: `Some browsers send "Do Not Track" signals. There is no common standard for responding to these signals, so the Site does not currently respond to them. Where required by law, we honor Global Privacy Control (GPC) signals as an opt-out of sale or sharing.` },

  { t: "h2", x: "7. How Long We Keep Your Information" },
  { t: "p", x: "We keep personal information only for as long as needed for the purposes described in this Privacy Policy, including to fulfill your request, keep business records, resolve disputes, and meet legal obligations. Storage request details are generally kept for up to 24 months after your last contact with us, unless a longer period is required by law." },

  { t: "h2", x: "8. Your Privacy Rights" },
  { t: "p", x: "Depending on where you live, you may have the right to:" },
  { t: "ul", i: [
    "Know what personal information we have collected about you and how we use and share it.",
    "Access a copy of your personal information.",
    "Correct inaccurate personal information.",
    "Delete your personal information.",
    "Opt out of the sale or sharing of your personal information, or of its use for targeted advertising.",
    "Appeal a decision we make about your request.",
  ] },
  { t: "p", x: "Residents of California and other states with consumer privacy laws may have additional rights under those laws. We will not discriminate against you for exercising your privacy rights." },
  { t: "p", x: `To make a request, email business@maai.agency with the subject line "Privacy Request". We may need to verify your identity before we respond. You may use an authorized agent to make a request on your behalf, and we may ask for proof of their authority.` },

  { t: "h2", x: "9. Data Security" },
  { t: "p", x: "We use reasonable technical and organizational measures to protect personal information, including encrypted connections (HTTPS) and spam and bot protection on our forms. No method of transmission or storage is completely secure, so we cannot guarantee absolute security." },

  { t: "h2", x: "10. Children's Privacy" },
  { t: "p", x: "The Site is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child under 13 has given us personal information, contact us at business@maai.agency and we will delete it." },

  { t: "h2", x: "11. International Users" },
  { t: "p", x: "The Site is intended for users in the United States. Our service providers may process information in the United States and other countries. By using the Site, you understand that your information may be processed outside your country of residence." },

  { t: "h2", x: "12. Third-Party Websites" },
  { t: "p", x: "The Site links to third-party websites, including the websites of Storage Providers. We are not responsible for the privacy practices of those websites. Please review their privacy policies." },

  { t: "h2", x: "13. Changes to This Privacy Policy" },
  { t: "p", x: `We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date. Your continued use of the Site after changes are posted means you accept the updated Privacy Policy.` },

  { t: "h2", x: "14. Contact Us" },
  { t: "lines", i: [
    "Company: MAAI LLC",
    "Website: https://www.selfstorage.help/",
    "Email: business@maai.agency",
    "Registered Agent Address: 309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801",
  ] },
];

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])) }} />

      <section className="storage-size-guide-hero hero-photo hero-photo-guide">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Privacy Policy</span></nav>
          <span className="storage-size-guide-eyebrow"><span /> Legal</span>
          <h1>Privacy Policy</h1>
          <p>Effective Date: 13 November 2026. Last Updated: 13 November 2026.</p>
        </div>
      </section>

      <article className="legal-body">
        {BLOCKS.map((b, idx) => {
          switch (b.t) {
            case "h2": return <h2 key={idx}>{b.x}</h2>;
            case "h3": return <h3 key={idx}>{b.x}</h3>;
            case "ul": return (
              <ul key={idx}>
                {b.i.map((li, j) => typeof li === "string"
                  ? <li key={j}>{li}</li>
                  : <li key={j}><strong>{li.b}</strong> {li.x}</li>)}
              </ul>
            );
            case "lines": return <p key={idx}>{b.i.map((line, j) => <span key={j}>{line}<br /></span>)}</p>;
            default: return <p key={idx}>{b.x}</p>;
          }
        })}
      </article>
    </main>
  );
}
