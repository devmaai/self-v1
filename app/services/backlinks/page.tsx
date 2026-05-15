import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import FeatureList from "@/components/sections/FeatureList";
import AeoGeoComparisonTable from "@/components/sections/AeoGeoComparisonTable";
import ContentBlock from "@/components/sections/ContentBlock";
import CardGrid from "@/components/sections/CardGrid";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Generate Backlinks For Your Business",
  description:
    "",
};

export default function BacklinksPage() {
  return (
    <>
      <PageHero
        eyebrow="Authority Building · Backlink Service"
        headline="Backlinks That Actually Help Independent Storage Facilities Rank Higher"
        subheadline={"Most self-storage owners have heard of backlinks, but few understand how they work or why they matter. Quality backlinks act like trusted votes of confidence that tell Google and AI engines your facility is a legitimate, authoritative business in your local area.\nWe build hyper-local, relevant backlinks that boost your Google Maps rankings, strengthen your AEO and GEO visibility, and help you compete against national chains without black-hat tactics or low-quality spam links."}
        primaryCta={{ label: "Get Your Free Backlink & Authority Audit", href: "/contact" }}
        note="Specialized for self-storage • Transparent process • Results in 90 days"
      />

      <MarqueeBanner
        items={[
          "Hyper-local backlinks",
          "No black-hat tactics",
          "Storage-specific publications",
          "Community-sourced placements",
          "Built for AEO and GEO",
          "Transparent reporting",
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="The problem"
        headline="Without Strong Backlinks, You’re Fighting an Uphill Battle"
        bulletTitleSuffix=""
        intro={"Even with a great Google Business Profile and optimized website, many independent operators stay stuck on page 2 because they lack authority signals."}
        items={[
          {
            num: "1",
            title: "Invisible to Google ",
            desc: "Your site has very few external websites linking to it, so Google does not see you as an authoritative local business worth ranking above your competition.",
          },
          {
            num: "2",
            title: "Outranked by national chains ",
            desc: "Larger storage brands have hundreds of strong backlinks pointing at them. Without your own, breaking into the top three of the map pack is extremely difficult.",
          },
          {
            num: "3",
            title: "Weak AI visibility ",
            desc: "AI engines rely heavily on brand authority and mentions across the web. Without meaningful backlinks, your facility is rarely recommended in AI-generated answers.",
          },
          {
            num: "4",
            title: "Wasted effort on other SEO ",
            desc: "You optimize your GBP and create content, but without backlinks Google still gives more weight to competitors who carry stronger votes of confidence.",
          },
          {
            num: "5",
            title: "Risky or ineffective links ",
            desc: "Many owners end up with spammy, irrelevant backlinks from past agencies or shortcuts. The wrong links can actually hurt your rankings instead of helping them.",
          },
          {
            num: "6",
            title: "The fix ",
            desc: "The next section shows how we earn backlinks for storage operators using channels most agencies do not even know exist.",
          },
        ]}
      />

      <ContentBlock
        variant="warm"
        label="What makes us different"
        headline="We source links from the communities your tenants already live in."
        body={
          <>
            <p>
              Generic link-building chases the same exhausted directories and guest post sites
              every other agency uses. We do the opposite. Our placements come from real local
              communities where your future tenants are already asking where to store their things.
            </p>
            <p>
              When someone is about to move, they do not start on Google. They start in a local
              Facebook moms group, in a city subreddit, in a real estate forum, or in a
              neighborhood community board. They ask where to find a clean storage unit, who is
              reliable, who has climate control near a specific neighborhood.
            </p>
            <p>
              Those mentions and recommendations turn into the most powerful kind of backlink
              there is: a link earned in context, from a place where the person already trusts the
              recommendation. Google reads these signals strongly. AI engines weight them even
              more heavily, because they reflect real human authority rather than manufactured
              links.
            </p>
            <p>
              Most SEO agencies do not work this channel because it is slow, manual, and requires
              understanding the community you are operating in. We do because the links you earn
              here are the ones that actually move rankings for storage operators.
            </p>
            <div className="callout-box">
              The average self-storage backlink profile we audit has zero links from local
              community sources. We typically build between 18 and 30 in the first 90 days alone.
            </div>
          </>
        }
      />

      <CardGrid
        variant="light"
        cols={4}
        label="The four community channels we work"
        cards={[
          {
            eyebrow: "City moms groups · Neighborhood watch · Buy nothing groups",
            title: "Local Facebook Groups",
            body: "City-specific moms groups, neighborhood groups, and “what’s happening in” groups where moves and storage come up daily.",
          },
          {
            eyebrow: "r/dallas · r/moving · r/declutter",
            title: "City and Lifestyle Subreddits",
            body: "r/yourcity, r/AskYourCity, r/moving, and storage-adjacent subs where recommendations get upvoted and indexed.",
          },
          {
            eyebrow: "BiggerPockets · Local Realtor blogs · Landlord forums",
            title: "American Real Estate Forums",
            body: "BiggerPockets, real estate investor forums, and local Realtor association blogs where moves trigger storage referrals.",
          },
          {
            eyebrow: "Moving companies · Apartment complexes · Chamber of commerce",
            title: "Local Partner and Business Networks",
            body: "Movers, real estate agents, apartment complexes, and local business directories that already refer storage customers offline.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        showDividers={false}
        label="Our approach"
        headline="How We Rank Self-Storage Facilities on AEO & GEO"
        intro="We don’t do generic AI optimization. Every tactic is built specifically for storage operators and focused on one outcome: more qualified move-ins from both Google and AI-powered search."
        items={[
          {
            num: "1",
            title: "Entity Authority & Citation Consistency",
            desc: "We strengthen your business as a recognizable “entity” across the web with consistent NAP (Name, Address, Phone), high-quality citations, and storage-specific schema markup so AI tools confidently recommend your facility.",
          },
          {
            num: "2",
            title: "Answer-First Content Creation",
            desc: "We build hyper-targeted content that directly answers the questions real renters ask AI- “What size storage unit do I need?”, “Is drive-up access worth it?”, “Climate-controlled vs non-climate controlled”, optimized for both featured snippets and generative AI.",
          },
          {
            num: "3",
            title: "Structured Data & Schema Mastery",
            desc: "Advanced schema implementation (including unit-type, pricing, availability signals, and review markup) helps AI engines understand and trust your data more than competitors.",
          },
          {
            num: "4",
            title: "Google Business Profile + Local Signals",
            desc: "We optimize your GBP for both traditional Map Pack and AI Overviews by maintaining fresh photos, posts, reviews, and accurate attributes (gate hours, climate control, vehicle/RV storage, etc.).",
          },
          {
            num: "5",
            title: "Multi-Location & Portfolio Optimization",
            desc: "For operators with 2+ facilities, we prevent cannibalization while building unified authority that lifts every location in AI responses.",
          },
        ]}
      />

      <AeoGeoComparisonTable />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="Most generalist SEO teams have never seen a storEDGE backend."
        body="We work with the software the self-storage industry actually uses. That means we know where to look when a booking page fails to render for Googlebot, and we know which platform settings change what search engines see. We also understand the difference between a unit availability page and a landing page, and we structure both for the searches they are meant to capture."
      />

      <Testimonial
        quote={
          <>
            Our booking pages were loading in 6 to 8 seconds on mobile. After the technical fixes,
            page speed dropped to under 2 seconds and our reservation completion rate jumped by 31%.
          </>
        }
        avatarInitials="TX"
        name="Multi-location operator, Texas"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "What exactly are AEO and GEO, and why should a self-storage owner care?",
            a: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are the next evolution of search. While traditional SEO focuses on ranking in Google’s blue links and Map Pack, AEO and GEO focus on getting your facility recommended directly in AI-powered answers from tools like Google Gemini, ChatGPT, Perplexity, and others.For self-storage owners, this matters because more renters are now asking conversational questions like “best climate-controlled storage near me” or “should I get drive-up access in [city]?” If your facility isn’t optimized, AI tools will recommend your competitors instead, even if you have good traditional rankings",
          },
          {
            q: " How is AEO & GEO different from regular Local SEO or Google Business Profile optimization?",
            a: "Regular Local SEO helps you rank in the Google Map Pack and organic search. AEO & GEO go further by optimizing your content, schema, entity strength, and citations so AI engines understand, trust, and actively recommend your storage facility in their generated responses.We combine both: strong traditional Local SEO + advanced AEO/GEO tactics. This ensures you win in both the current Google Maps results and the emerging AI answer engines.",
          },
          {
            q: " How long does it take to see results with AEO and GEO for a self-storage facility?",
            a: "You can expect to see initial improvements in traditional rankings and content performance within the first 30–60 days. Meaningful visibility in AI-generated answers usually appears between 60–120 days, as AI models need consistent, authoritative signals over time.Many of our clients see compounding results after 90 days, with increased move-ins coming from both Google Maps and AI-driven traffic.",
          },
          {
            q: "Do I need to rebuild my entire website to benefit from AEO & GEO?",
            a: "No. While a well-structured, fast-loading website helps, you don’t necessarily need a full rebuild. We work with your existing site (WordPress, custom CMS, or storage-specific platforms) and focus on strategic improvements such as adding proper schema markup, creating targeted answer-focused content, optimizing location pages, and strengthening your overall entity authority.We tailor the approach based on your current website’s condition during the free audit.",
          },
          {
            q: "Will optimizing for AEO & GEO affect my Google Maps ranking?",
            a: "Yes,  positively. The strategies we use for AEO and GEO (structured data, high-quality content, review signals, citation consistency, and entity building) are the same foundational elements that also improve your traditional Google Business Profile and Map Pack rankings.Most clients experience a lift in both AI visibility and Map Pack position because the signals reinforce each other.",
          },
          {
            q: " Is AEO & GEO just a temporary trend, or is it here to stay?",
            a: "It’s here to stay. AI-powered search is rapidly growing and changing how people discover local businesses. Google is increasingly showing AI Overviews, and tools like ChatGPT and Perplexity are becoming primary search interfaces for many users. Facilities that optimize early for both traditional search and generative AI will have a significant advantage over those who don’t.We treat AEO & GEO as a long-term strategy that builds lasting authority for your storage business.",
          },
        ]}
      />
      <FeatureList
        variant="light"
        style="bullet"
        showDividers={false}
        headline="Why Choose Us for AEO & GEO"
        items={[
          {
            title: "",
            desc: "100% focused on self-storage (we don’t work with restaurants, lawyers, or e-commerce)",
          },
          {
            title: "",
            desc: "Deep understanding of storage-specific renter questions and unit-level intent",
          },
          {
            title: "",
            desc: "Combined expertise in Local SEO, GBP mastery, and next-generation AI optimization",
          },
          {
            title: "",
            desc: "Transparent month-to-month pricing after the initial foundation phase",
          },
        ]}
      />
      <SimpleCTA
        headline="Ready to Rank in Both Google Maps and AI Answers?"
        body="Get a free audit that shows your current visibility on traditional search and emerging AI engines. We’ll identify exactly why you’re missing opportunities and how to fix it."
        ctaLabel="Claim Your Free AEO + GEO Audit"
      />
    </>
  );
}
