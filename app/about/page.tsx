import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About SelfStorage.help | Find Self Storage & Storage Units",
  description:
    "Learn about SelfStorage.help and how we help you find self-storage facilities and storage units across the United States.",
  alternates: { canonical: "/about" },
};

const needs = [
  "Moving to a new home",
  "Decluttering or downsizing",
  "Renovating your home",
  "Storing seasonal belongings",
  "Keeping furniture and personal items",
  "Managing business inventory",
  "Looking for additional space for your belongings",
];

const faqs = [
  {
    question: "What is SelfStorage.help?",
    answer:
      "SelfStorage.help is a platform designed to help people find and explore self-storage facilities and storage units across the United States.",
  },
  {
    question: "How can I find a storage unit near me?",
    answer:
      "You can use SelfStorage.help to search for storage facilities in your area and explore the available storage options.",
  },
  {
    question: "What should I consider when choosing a storage unit?",
    answer:
      "Consider factors such as location, storage unit size, accessibility, facility features, security, and price when comparing storage options.",
  },
  {
    question: "Who uses self-storage?",
    answer:
      "Self-storage can be useful for homeowners, renters, students, families, people moving or renovating, and businesses that need additional space for belongings or inventory.",
  },
  {
    question: "How do I choose the right storage unit size?",
    answer:
      "The right unit size depends on what you plan to store. Consider the number and size of your belongings and whether you'll need additional space to access items while they're in storage.",
  },
];

export default function AboutPage() {
  const faqSchema = faqPageSchema(faqs);
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <main className="about-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="storage-size-guide-hero">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span aria-current="page">About</span>
          </nav>
          <span className="storage-size-guide-eyebrow"><span /> About us</span>
          <h1>About <em>SelfStorage.help</em></h1>
          <p>Finding the right self-storage unit shouldn&apos;t require hours of searching through different websites and storage facilities.</p>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="about-intro-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Making it easier</span>
          <h2 id="about-intro-heading">Making It Easier to Find the Right Storage Unit</h2>
        </div>
        <div className="storage-size-feature-copy">
          <p><strong>SelfStorage.help</strong> helps people across the United States discover storage units and self-storage facilities in their area. Our goal is to make it easier to explore storage options, compare facilities, and find a solution that fits your space, location, and needs.</p>
          <p>Whether you&apos;re moving to a new home, downsizing, renovating, storing business inventory, or simply need some extra space, we&apos;re here to make your storage search easier.</p>
        </div>
        <Link className="state-storage-cta" href="/">Find a storage unit near you <span aria-hidden="true">→</span></Link>
      </section>

      <section className="storage-size-chart-section" aria-labelledby="about-near-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Find storage near you</span>
          <h2 id="about-near-heading">Find Self-Storage Near You</h2>
          <p>When you need storage, location matters.</p>
        </div>
        <div className="storage-size-feature-copy">
          <p>SelfStorage.help helps you discover self-storage facilities near you, making it easier to explore available options in your city or area. Instead of searching across multiple websites, you can use our platform as a starting point for finding storage facilities that may fit your requirements.</p>
          <p>From small storage units for personal belongings to larger spaces for household items or business needs, we help you explore different storage options in one place.</p>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="about-compare-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Compare options</span>
          <h2 id="about-compare-heading">Compare Storage Facilities and Options</h2>
          <p>Not every storage facility is the same.</p>
        </div>
        <div className="storage-size-feature-copy">
          <p>Storage units can vary by size, location, accessibility, amenities, pricing, and other features. That&apos;s why having useful information about different facilities can help you make a more informed decision.</p>
          <p>SelfStorage.help brings together information about storage facilities and storage units to help you understand your options before choosing where to store your belongings.</p>
          <p>Our goal is to make the process of researching self storage near you simpler and more convenient.</p>
        </div>
      </section>

      <section className="storage-size-chart-section" aria-labelledby="about-needs-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Different needs</span>
          <h2 id="about-needs-heading">Storage for Different Needs</h2>
          <p>People need storage for many different reasons. You may be:</p>
        </div>
        <div className="state-size-grid">
          {needs.map((need) => (
            <article key={need}><h3>{need}</h3></article>
          ))}
        </div>
        <p className="storage-size-note">Whatever your reason for needing storage, finding the right <strong>storage unit</strong> starts with knowing what options are available in your area.</p>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="about-why-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Why SelfStorage.help?</span>
          <h2 id="about-why-heading">Why SelfStorage.help?</h2>
        </div>
        <div className="storage-size-feature-copy">
          <p>Searching for a storage unit can be time-consuming when information is spread across different websites.</p>
          <p>SelfStorage.help is designed to give you a simpler way to find and explore self-storage facilities.</p>
          <p>We focus on making storage information easier to discover and understand, so you can spend less time searching and more time deciding which storage option is right for you.</p>
          <p><strong>Our goal is simple: Help people find storage units and self-storage facilities that fit their needs.</strong></p>
        </div>
      </section>

      <section className="storage-size-chart-section" aria-labelledby="about-mission-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Our mission</span>
          <h2 id="about-mission-heading">Our Mission</h2>
        </div>
        <div className="storage-size-feature-copy">
          <p>Our mission is to make finding self-storage easier across the United States.</p>
          <p>We&apos;re continuously working to improve SelfStorage.help and provide useful information that helps people discover storage facilities, understand their options, and make better-informed storage decisions.</p>
          <p>As the platform grows, we&apos;re focused on building a helpful resource for anyone searching for storage units near them.</p>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="about-start-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Start searching</span>
          <h2 id="about-start-heading">Start Your Storage Search</h2>
          <p>Looking for a storage unit near you?</p>
        </div>
        <div className="storage-size-feature-copy">
          <p>Start exploring self-storage facilities and discover storage options in your area.</p>
        </div>
        <Link className="state-storage-cta" href="/">Find a storage unit near you <span aria-hidden="true">→</span></Link>
      </section>

      <section className="storage-size-faq" aria-labelledby="about-faq-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Common questions</span>
          <h2 id="about-faq-heading">Frequently Asked Questions</h2>
        </div>
        <div className="storage-size-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>
          ))}
        </div>
      </section>

      <section className="storage-size-guide-cta">
        <div><span className="storage-size-guide-label">Ready to start?</span><h2>Find a storage unit near you.</h2></div>
        <Link href="/">Find a storage unit near you <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
