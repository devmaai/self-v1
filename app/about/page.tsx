import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/sections/ContactForm";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About SelfStorage.help | Founder Kriti and How We Help Storage Businesses",
  description:
    "Meet Kriti, the founder behind SelfStorage.help. Over 8 years helping businesses grow. List your storage business or grow it through organic search.",
  alternates: { canonical: "/about" },
};

// Add the founder photo at public/images/about/kriti.jpg and the LinkedIn URL here.
const FOUNDER_PHOTO = "/images/about/kriti.jpg";
const LINKEDIN_URL = "";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", FOUNDER_PHOTO));

const PATHS = [
  {
    title: "List your storage business",
    body: "Run a storage facility and want renters to find you here? Share your facility details and we will get your listing set up on SelfStorage.help.",
    cta: "List my storage business",
  },
  {
    title: "Grow your storage business organically",
    body: "Want more move-ins from search without paying per lead? We help storage operators win the map pack, rank city pages and show up in AI answers.",
    cta: "Grow my storage business",
  },
];

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kriti",
    jobTitle: "Founder",
    worksFor: { "@type": "Organization", name: "MAAI LLC", url: "https://www.selfstorage.help" },
    ...(LINKEDIN_URL ? { sameAs: [LINKEDIN_URL] } : {}),
  };

  return (
    <main className="about-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <section className="storage-size-guide-hero hero-photo hero-photo-guide">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">About</span></nav>
          <span className="storage-size-guide-eyebrow"><span /> About us</span>
          <h1>The people behind <em>SelfStorage.help</em></h1>
          <p>We help renters find the right storage unit, and we help storage businesses get found by the people searching for them.</p>
        </div>
      </section>

      <section className="about-founder" aria-labelledby="about-founder-heading">
        <div className="about-founder-photo">
          {hasPhoto ? (
            <Image src={FOUNDER_PHOTO} alt="Kriti, founder of SelfStorage.help" width={560} height={680} quality={90} priority />
          ) : (
            <div className="about-founder-initial" aria-hidden="true">K</div>
          )}
        </div>
        <div className="about-founder-copy">
          <span className="storage-search-label">Who runs SelfStorage.help</span>
          <h2 id="about-founder-heading">Hi, I am Kriti.</h2>
          <p>I founded SelfStorage.help and run it under MAAI LLC, a performance SEO agency registered in Wyoming. For over 8 years I have helped businesses grow through search, from consulting roles at large agencies to running my own agency for clients in the US, the UK and Australia.</p>
          <p>Storage is a local, search-driven business. Renters look for a unit when they need it, and they pick from what they find first. I built this site to make that search easier for renters, and to give independent storage operators a fair way to compete for those renters.</p>
          <p>If you run a storage business, you can work with me directly. No account managers, no hand-offs.</p>
          <div className="about-founder-actions">
            <a className="state-storage-cta" href="#about-contact">Get in touch <span aria-hidden="true">→</span></a>
            {LINKEDIN_URL ? <a className="about-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a> : null}
          </div>
        </div>
      </section>

      <section className="about-paths" aria-labelledby="about-paths-heading">
        <div className="storage-guide-heading">
          <span className="storage-search-label">For storage businesses</span>
          <h2 id="about-paths-heading">Two ways we can work together</h2>
        </div>
        <div className="about-paths-grid">
          {PATHS.map((item) => (
            <article className="about-path-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a className="state-storage-guide-button" href="#about-contact">{item.cta} <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
        <p className="about-paths-note">Looking for a unit instead? <Link href="/">Search storage near you</Link>.</p>
      </section>

      <section id="about-contact" className="about-contact" aria-labelledby="about-contact-heading">
        <div className="about-contact-copy">
          <span className="storage-search-label">Contact</span>
          <h2 id="about-contact-heading">Send us a message</h2>
          <p>Tell us about your storage business, your listing, or any question you have. You will hear back within one to two business days.</p>
          <ul>
            <li>Email: <a href="mailto:business@maai.agency">business@maai.agency</a></li>
            {LINKEDIN_URL ? <li>LinkedIn: <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Kriti</a></li> : null}
          </ul>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
