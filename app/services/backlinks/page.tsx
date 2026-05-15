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
        variant="warm"
        style="bullet"
        label="Proof"
        headline="A backlink program working in the data"
        intro="The Google Search Console screenshot opposite shows a real client's authority growth after 90 days of our hyper-local backlink campaign. Impressions, clicks, and average position all moved together, which is the signature of a backlink program working correctly rather than ranking tricks that fade."
        items={[
          {
            title: "",
            desc: "+184% Impressions in 90 days",
          },
          {
            title: "",
            desc: "23 New referring domains",
          },
          {
            title: "",
            desc: "+6.4 Average position improvement",
          },
        ]}
      />     
      <FeatureList
        variant="light"
        style="numbered"
        showDividers={false}
        label="Our Backlink Strategy"
        headline="How we build high-quality, hyper-local backlinks."
        intro="We do not do generic link building. Every backlink we pursue is relevant to the self-storage industry and tied to your specific local market. Here are the five plays we run in parallel for every client."
        items={[
          {
            num: "1",
            title: "Local partnership links",
            desc: "We help you earn links from moving companies, real estate agents, apartment complexes, and local businesses that naturally refer storage customers. Most of these partners are happy to link to a trusted local operator.",
          },
          {
            num: "2",
            title: "Industry and niche publications",
            desc: "Guest posts and contributions to self-storage trade publications, moving industry sites, and local news outlets that actually get read by your target audience and carry real ranking weight.",
          },
          {
            num: "3",
            title: "Digital PR and brand mentions",
            desc: "We create link-worthy content like guides, comparisons, and moving checklists that naturally attract editorial links and brand mentions. The kind of content other sites genuinely want to reference.",
          },
          {
            num: "4",
            title: "Strategic directory and citation cleanup",
            desc: "We go beyond basic directories and secure high-value, relevant listings while removing or disavowing harmful ones that may be dragging your authority down without your knowledge.",
          },
          {
            num: "5",
            title: "AEO and GEO synergy",
            desc: "Backlinks that support both traditional Google rankings and AI search visibility by building entity authority and topical relevance around storage-specific topics across the web.",
          },
        ]}
      />
      <FeatureList
        variant="warm"
        style="numbered"
        label="How we deliver"
        headline="Ninety days from audit to authority."
        intro="A real backlink program does not move overnight. It builds momentum across weeks. Here is the schedule we run for every storage client."
        items={[
          {
            num: "Week 01",
            title: "Backlink and authority audit",
            desc: "We map every existing link pointing at your site, score them for quality and relevance, and flag toxic ones for cleanup. You receive a written baseline assessment.",
          },
          {
            num: "Week 02",
            title: "Local community and partner mapping",
            desc: "We identify the specific Facebook groups, subreddits, real estate forums, and local partners that match your service area and tenant demographics.",
          },
          {
            num: "Week 03",
            title: "Outreach and content begins",
            desc: "Partnership outreach starts, link-worthy content goes into production, and the first community placements begin to land. Toxic link cleanup runs in parallel.",
          },
          {
            num: "Month 02",
            title: "First wave of placements",
            desc: "Eight to twelve new backlinks land in month two, mostly from local partners, community sources, and initial guest contributions. Authority signals begin to register in Google Search Console.",
          },
          {
            num: "Month 03",
            title: "Compounding authority",
            desc: "The full first-quarter backlink stack lands. Map pack rankings, organic traffic, and AI mentions all begin moving together. Geo-grid ranking reports show measurable lift.",
          },
        ]}
      />
      <Testimonial
              quote={
                <>
                  Other agencies sent me lists of links from sites I had never heard of. 
                  SelfStorage.help built relationships with actual local movers and apartment 
                  communities in my city. Within three months I started seeing my facility 
                  recommended in local Facebook groups without me asking.
                </>
              }
              avatarInitials="DM"
              name="— Diana Morales · Owner, Single-Facility Operator, Arizona"
              detail="+23 New referring domains in 90 days"
            />

      

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "Are these backlinks safe? I have heard horror stories.",
            a: "Every link we build is editorially earned from a relevant, real source. We do not use private blog networks, link farms, or paid placements that violate Google's guidelines. The horror stories you have heard come from agencies that take shortcuts. Our process is the opposite of that, which is also why it takes 90 days instead of one.",
          },
          {
            q: "How many backlinks will I get?",
            a: "In a typical 90-day engagement we build between 18 and 30 high-quality backlinks from sources directly relevant to your service area. Volume varies based on your market, your facility's brand history, and what is available in your specific local community. Quality is the priority, never raw count.",
          },
          {
            q: "Will this help with AI search like ChatGPT and Perplexity?",
            a: "Yes. AI engines weigh entity authority heavily, which is built through brand mentions and links across trusted sources. Our community-sourced approach builds exactly the kind of citation pattern AI engines look for. This is what AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) actually require.",
          },
          {
            q: "What if I already have backlinks from a previous agency?",
            a: "The first thing we do is audit your existing backlink profile. If you have toxic or low-quality links, we either pursue removal or disavow them through Google Search Console. Cleanup is part of the engagement and often delivers ranking lift before any new links are built.",
          },
          {
            q: "Can I see the actual links you build?",
            a: "Every link we earn is reported in your monthly summary with the source, the page it sits on, the anchor text, and a quality score. Total transparency. You can verify each one yourself in Google Search Console as it gets indexed.",
          },
          {
            q: "Will my rankings drop if I stop the service?",
            a: "No. The backlinks we build are permanent placements on real sites and continue to provide authority signals long after the engagement ends. Some operators stay on for ongoing momentum, others step down to a maintenance plan after the first six months once the foundation is set.",
          },
        ]}
      />
      
      <SimpleCTA
        headline="Find out what your current backlink profile looks like today. Free authority audit."
        body="Drop your facility website below and we will send a full backlink audit showing your current authority score, your toxic links, and the local communities where you should be earning links instead."
        ctaLabel=" Send my authority audit"
        note="We respond within two business days. Your details stay with us."
        ctaHref="/contact"
      />
    </>
  );
}
