import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms and Conditions | SelfStorage.help",
  description:
    "Terms and Conditions for using SelfStorage.help, operated by MAAI LLC, a Wyoming limited liability company.",
  alternates: { canonical: "/terms" },
};

type Block =
  | { t: "h2" | "h3" | "p"; x: string }
  | { t: "ul" | "ol" | "lines"; i: string[] };

const ADDRESS = "309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801";

const CONTACT_LINES = [
  "Company: MAAI LLC",
  "Website: https://www.selfstorage.help/",
  "Email: business@maai.agency",
  `Registered Agent Address: ${ADDRESS}`,
];

const BLOCKS: Block[] = [
  { t: "h2", x: "1. Introduction and Acceptance" },
  { t: "p", x: `Welcome to SelfStorage.help (the "Site"), located at https://www.selfstorage.help/ and operated by MAAI LLC, doing business as SelfStorage.help ("Maai", "we", "us", or "our"), a Wyoming limited liability company with its registered agent address at ${ADDRESS}.` },
  { t: "p", x: `SelfStorage.help is an online platform that helps individuals and businesses discover, compare, and explore self-storage facilities across the United States, and that provides storage facility owners and operators with listings, lead referrals, and local search marketing services. These Terms and Conditions (the "Terms"), together with our Privacy Policy and any other policies or guidelines referenced on the Site, govern your access to and use of the Site, including its content, search functionality, listings, storage size calculators, and all related features and services (collectively, the "Services").` },
  { t: "p", x: "These Terms form a legally binding agreement between you and Maai. By accessing or using the Site in any way, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, do not use the Site." },
  { t: "p", x: `"You" means you and, where applicable, any employer, entity, agent, or contractor on whose behalf you use the Site. If you use the Site on behalf of an organization, you represent that you have authority to bind that organization to these Terms.` },
  { t: "p", x: "You must be at least 18 years old, or the age of majority in your state, to use the Services." },

  { t: "h2", x: "2. Company Information" },
  { t: "ul", i: [
    "Legal Company Name: MAAI LLC",
    "Trading Name: SelfStorage.help",
    "Website: https://www.selfstorage.help/",
    `Registered Agent Address: ${ADDRESS}`,
    "Wyoming Filing ID: 2025-001827715",
    "Contact Email: business@maai.agency",
  ] },
  { t: "p", x: "If you have questions, comments, or complaints about the Site, please contact us at the email above." },

  { t: "h2", x: "3. Description of the Services" },
  { t: "p", x: "SelfStorage.help is an online listing, comparison, and storage request matching platform. The Services may include:" },
  { t: "ul", i: [
    "Listings of self-storage facilities, including names, locations, contact details, unit sizes, and indicative prices.",
    "Search, filtering, and comparison tools.",
    "Storage size calculators and estimation tools.",
    "Educational content and guides about self-storage.",
    "Links to the websites or contact channels of storage facilities.",
    "A storage request form. When you submit a request, we match you with suitable storage facilities and send your details to them. If you choose a preferred facility or brand, we send your request to that facility.",
    "Paid services for storage facility owners and operators, including facility listings, lead referrals, backlinks, local SEO, answer engine optimization (AEO), generative engine optimization (GEO), and free GEO and AEO audits.",
  ] },
  { t: "p", x: "We are not a storage provider. We do not own, operate, manage, or lease any storage facility or unit. We do not rent units, take reservations, enter into rental agreements, or process rental payments on behalf of any facility. Any rental, reservation, payment, or agreement takes place solely between you and the storage facility." },

  { t: "h2", x: "4. Third-Party Storage Facilities and Listings" },
  { t: "h3", x: "4.1 Independent businesses" },
  { t: "p", x: `The storage facilities shown on the Site ("Storage Providers") are independent third-party businesses. They are not owned, operated, controlled, or represented by Maai.` },
  { t: "h3", x: "4.2 Commercial relationships and no endorsement" },
  { t: "p", x: "Some Storage Providers pay Maai for listings, placement, lead referrals, or marketing services. These commercial relationships may influence which facilities are shown, the order in which they appear, or which facilities are matched to your request. Maai is not an agent, partner, or joint venturer of any Storage Provider. A facility's appearance on the Site does not mean that the facility has reviewed, approved, authorized, or endorsed its listing or the Site, and it does not mean that Maai endorses or recommends the facility." },
  { t: "h3", x: "4.3 Source of listing information" },
  { t: "p", x: "Listing information (such as business names, addresses, phone numbers, unit sizes, prices, and descriptions) is compiled from publicly available sources, which may include provider websites, public business directories, and other public information. We may organize, summarize, and format this information for comparison purposes. We do not hold any ownership rights in, or license to, the Storage Providers' underlying data, branding, or content." },
  { t: "h3", x: "4.4 Third-party names and trademarks" },
  { t: "p", x: "Storage Provider names, logos, and trademarks are the property of their respective owners and are used only to identify the facilities and help users find and compare them. Their use does not imply any affiliation or endorsement." },

  { t: "h2", x: "5. Accuracy of Information; Verify Before You Rent" },
  { t: "p", x: "We make reasonable efforts to keep the Site useful and current, but facility information changes frequently and is not controlled by us. We do not guarantee that:" },
  { t: "ul", i: [
    "Any listing is complete, accurate, or up to date.",
    "A listed facility is open, operating, or still offers the displayed units.",
    "Prices, promotions, fees, or discounts shown are current or available.",
    "A unit of any particular size or type is available.",
    "Amenities, security features, access hours, climate control, insurance, or other details are accurate.",
  ] },
  { t: "p", x: "Prices and details shown are indicative only. You must confirm all details, including pricing, fees, availability, lease terms, insurance requirements, and access rules, directly with the Storage Provider before making any decision or entering into any agreement." },

  { t: "h2", x: "6. Your Dealings with Storage Providers" },
  { t: "p", x: "Any communication, negotiation, reservation, payment, rental agreement, or dispute between you and a Storage Provider is solely between you and that provider. Maai is not a party to those dealings. To the fullest extent permitted by law, we are not responsible for:" },
  { t: "ul", i: [
    "The quality, safety, condition, legality, or suitability of any facility or unit.",
    "Services, conduct, or representations of any Storage Provider.",
    "Rental rates, deposits, late fees, rate increases, or other charges.",
    "Security, access restrictions, lien or auction practices, or insurance coverage.",
    "Loss of, damage to, theft of, or destruction of any property stored at a facility.",
    "Any dispute arising from your agreement with a Storage Provider.",
  ] },
  { t: "p", x: "Please review each provider's rental agreement, fees, insurance requirements, and policies carefully before renting." },

  { t: "h2", x: "7. Storage Size Calculators and Estimates" },
  { t: "p", x: "Our calculators and tools are provided for general planning purposes only. Estimates rely on the information you provide and on general assumptions about item sizes and packing. Actual space needs may differ. We do not guarantee that a recommended unit size will fit your belongings. Please confirm your needs with the Storage Provider before renting." },

  { t: "h2", x: "8. Enquiries and Contact Forms" },
  { t: "p", x: "If you submit an enquiry or contact request through the Site, you authorize us to collect and use the information you provide (for example, your name, email, phone number, location, and storage needs) to process your request and to share it with the Storage Provider(s) we match you with, or the facility you choose, so they can respond to you. Storage Providers may pay Maai for these referrals. Information you submit is handled according to our Privacy Policy. We do not guarantee that any Storage Provider will respond, offer a particular price, or have a suitable unit available." },
  { t: "p", x: "If you provide a phone number, you agree that the Storage Provider(s) and/or Maai may contact you by phone, text, or email about your request." },

  { t: "h2", x: "9. Intellectual Property" },
  { t: "h3", x: "9.1 Our content" },
  { t: "p", x: `Original content created by or for Maai on the Site, including its design, layout, text, graphics, logos, software, calculators, our selection and arrangement of listings, and our compiled database as a whole (collectively, "Our Content"), is owned by or licensed to Maai and protected by US and international intellectual property laws.` },
  { t: "h3", x: "9.2 Third-party content" },
  { t: "p", x: "Third-party materials, including Storage Provider names, logos, trademarks, descriptions, and other proprietary content, remain the property of their respective owners. Nothing in these Terms transfers, or claims, ownership of that material." },
  { t: "h3", x: "9.3 Limited license to you" },
  { t: "p", x: "We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Site for your personal or internal business purposes of researching and comparing storage options." },

  { t: "h2", x: "10. Content Use Restrictions" },
  { t: "p", x: "Unless we expressly permit it in writing, or applicable law allows it, you agree not to:" },
  { t: "ol", i: [
    "Monitor, collect, extract, copy, or harvest Our Content through automated means, including robots, spiders, bots, crawlers, scrapers, or other data extraction tools.",
    "Use framing or similar techniques to enclose or reproduce any part of the Site or Our Content.",
    "Remove, alter, or hide any copyright, trademark, or other proprietary notice.",
    "Use Our Content or branding in a way that suggests an unauthorized association, endorsement, sponsorship, or affiliation with SelfStorage.help or Maai.",
    "Modify, reproduce, adapt, translate, or create derivative works from Our Content.",
    "Copy, download, archive, distribute, publish, transmit, sell, lease, license, or otherwise commercially exploit Our Content, including our compiled database of listings.",
    "Use the Site for any unlawful purpose or in a way that infringes the rights of others.",
    "Introduce viruses, malicious code, or other technology that may disrupt, damage, or interfere with the Site.",
    "Interfere with the normal operation or security of the Site, or attempt to gain unauthorized access to its systems, servers, or databases.",
    "Submit false, misleading, or fraudulent information through the Site.",
  ] },
  { t: "p", x: "Nothing in these Terms restricts activities expressly permitted by applicable law, including legitimate search engine indexing." },

  { t: "h2", x: "11. Third-Party Websites and Links" },
  { t: "p", x: "The Site may link to, or reference, third-party websites and businesses. We do not control and are not responsible for their content, policies, or practices. A link does not mean we endorse the site or business. You access third-party sites at your own risk and should review their terms and privacy policies." },

  { t: "h2", x: "12. User Responsibilities" },
  { t: "p", x: "You agree to use the Site lawfully and in line with these Terms, to provide accurate information in any form you submit, to respect the rights of others, and to not do anything that could harm, overload, or impair the Site. We may suspend or restrict your access if we reasonably believe you have violated these Terms." },

  { t: "h2", x: "13. Privacy" },
  { t: "p", x: "Your use of the Site is also governed by our Privacy Policy at https://www.selfstorage.help/privacy, which explains what information we collect, how we use it, whether and when we share it, how long we keep it, and your privacy choices and rights (including any rights under applicable state privacy laws such as the California Consumer Privacy Act). The Site is not directed to children under 13, and we do not knowingly collect their information." },

  { t: "h2", x: "14. Listing Corrections and Removal Requests" },
  { t: "p", x: "If you are a Storage Provider, business owner, or other person who believes information on the Site is inaccurate, outdated, misleading, or infringes your rights (including trademark, copyright, or other intellectual property rights), please email business@maai.agency with:" },
  { t: "ul", i: [
    "Your name, role, and contact details.",
    "The listing or page URL in question.",
    "A description of the issue and the correction or removal you request.",
    "Information that helps us verify your identity or authority.",
  ] },
  { t: "p", x: "We will review requests in good faith and may correct, update, or remove the information where appropriate. Submitting a request does not guarantee a particular outcome." },
  { t: "h3", x: "Copyright complaints" },
  { t: "p", x: "If you believe content on the Site infringes your copyright, you may send a notice to us at:" },
  { t: "lines", i: CONTACT_LINES },

  { t: "h2", x: "15. Disclaimer of Warranties" },
  { t: "p", x: `TO THE FULLEST EXTENT PERMITTED BY LAW, THE SITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, COMPLETENESS, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT ANY LISTING, PRICE, OR AVAILABILITY INFORMATION IS ACCURATE OR CURRENT. SOME JURISDICTIONS DO NOT ALLOW CERTAIN WARRANTY EXCLUSIONS, SO SOME OF THE ABOVE MAY NOT APPLY TO YOU.` },

  { t: "h2", x: "16. Limitation of Liability" },
  { t: "p", x: "TO THE FULLEST EXTENT PERMITTED BY LAW, MAAI AND ITS OWNERS, MEMBERS, OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES, AND REPRESENTATIVES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA, GOODWILL, OR STORED PROPERTY, ARISING OUT OF OR RELATED TO YOUR USE OF (OR INABILITY TO USE) THE SITE, YOUR RELIANCE ON ANY LISTING OR ESTIMATE, OR YOUR DEALINGS WITH ANY STORAGE PROVIDER, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES." },
  { t: "p", x: "TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SITE WILL NOT EXCEED ONE HUNDRED US DOLLARS (US$100)." },
  { t: "p", x: "Nothing in these Terms limits liability that cannot be limited under applicable law." },

  { t: "h2", x: "17. Indemnification" },
  { t: "p", x: "To the extent permitted by law, you agree to defend, indemnify, and hold harmless Maai and its owners, officers, directors, employees, and representatives from third-party claims, liabilities, damages, and reasonable expenses (including reasonable attorneys' fees) arising from your violation of these Terms, your misuse of the Site, or your infringement of any third party's rights." },
  { t: "p", x: "If you use the Site on behalf of an employer or other organization, you represent that you are authorized to accept these Terms on its behalf, and that organization is bound by these Terms, including this indemnification obligation." },

  { t: "h2", x: "18. Dispute Resolution" },
  { t: "p", x: "Any dispute arising from these Terms or the Site will be brought exclusively in the state or federal courts located in Sheridan County, Wyoming, and you consent to personal jurisdiction there." },

  { t: "h2", x: "19. Governing Law" },
  { t: "p", x: "These Terms are governed by the laws of the State of Wyoming, United States, without regard to its conflict-of-law rules, and by applicable US federal law." },

  { t: "h2", x: "20. Suspension and Termination" },
  { t: "p", x: "We may suspend, restrict, modify, or discontinue all or part of the Site at any time, with or without notice, including where reasonably necessary for operational, legal, or security reasons or if you violate these Terms. Sections that by their nature should survive termination (including Sections 4, 5, 6, 9, 10, 15, 16, 17, 18, and 19) will survive." },

  { t: "h2", x: "21. Changes to These Terms" },
  { t: "p", x: `We may update these Terms from time to time. Updated Terms will be posted on this page with a revised "Last Updated" date. Your continued use of the Site after changes are posted means you accept the updated Terms. If you do not agree, stop using the Site.` },

  { t: "h2", x: "22. General" },
  { t: "ul", i: [
    "Entire agreement: These Terms and the Privacy Policy are the entire agreement between you and Maai regarding the Site.",
    "Severability: If any provision is found unenforceable, the rest remains in effect.",
    "No waiver: Our failure to enforce any provision is not a waiver of it.",
    "Assignment: You may not assign these Terms without our consent. We may assign them in connection with a merger, acquisition, or sale of assets.",
    "Electronic communications: You consent to receive notices from us electronically, including by posting on the Site or by email.",
  ] },

  { t: "h2", x: "23. Contact Us" },
  { t: "lines", i: CONTACT_LINES },
];

export default function TermsPage() {
  return (
    <main className="legal-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Terms and Conditions", path: "/terms" }])) }} />

      <section className="storage-size-guide-hero hero-photo hero-photo-guide">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Terms and Conditions</span></nav>
          <span className="storage-size-guide-eyebrow"><span /> Legal</span>
          <h1>Terms and Conditions</h1>
          <p>Effective Date: 13 November 2026. Last Updated: 13 November 2026.</p>
        </div>
      </section>

      <article className="legal-body">
        {BLOCKS.map((b, idx) => {
          switch (b.t) {
            case "h2": return <h2 key={idx}>{b.x}</h2>;
            case "h3": return <h3 key={idx}>{b.x}</h3>;
            case "ul": return <ul key={idx}>{b.i.map((li, j) => <li key={j}>{li}</li>)}</ul>;
            case "ol": return <ol key={idx}>{b.i.map((li, j) => <li key={j}>{li}</li>)}</ol>;
            case "lines": return <p key={idx}>{b.i.map((line, j) => <span key={j}>{line}<br /></span>)}</p>;
            default: return <p key={idx}>{b.x}</p>;
          }
        })}
      </article>
    </main>
  );
}
