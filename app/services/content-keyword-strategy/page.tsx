import { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";
import MarqueeBanner from "@/components/sections/MarqueeBanner";

export const metadata: Metadata = {
  title: "Content Writing For Self-Storage Business Owners",
  description:
    "Unit size guides, city pages, and seasonal content built to rank for the searches your renters actually make and compound in traffic value year after year.",
};

export default function ContentKeywordStrategyPage() {
  return (
    <>
      <PageHero
        eyebrow="Hyper-Local Content · Content Strategy & Writing"
        headline="Hyper-local content that puts your facility in front of people searching nearby."
        subheadline="When someone within five miles of your facility searches for storage, the listings and pages that mention their specific neighborhood, their nearby landmarks, and their zip code win the click. Most independent operators publish generic content that could belong to any facility in any city. We do the opposite.We write hyper-local content for your Google Business Profile and your website that targets the exact neighborhoods, zip codes, and search behaviors of the people most likely to rent from you. For multi-facility operators, we layer in national targeting across every zip code within ten miles of every location you run."
        primaryCta={{ label: "Get your free content opportunity audit", href: "/contact" }}
        note="Hyper-local research · GBP and website covered · SEMrush and Ahrefs-backed strategy"
      />
      <MarqueeBanner
              items={[
                "Hyper-local content",
                "Zip code-level targeting",
                "GBP posts that rank",
                "Location landing pages",
                "SEMrush-backed research",
                "Ahrefs competitor analysis",
                "National coverage for multi-location operators"
              ]}
        />
      <FeatureList
        variant="light"
        style="numbered"
        label="The problem"
        showDividers={false}
        bulletTitleSuffix=""
        headline="Why generic storage content does not rank anywhere."
        intro="Most storage operators publish content that reads like every other facility in the country. Same unit size guide, same packing tips, same move-in checklist. Search engines have seen all of it before, and so have the people you are trying to reach. Here is where the content gaps usually show up."
        items={[
          {
            num: "01",
            title: "Reads like every other facility ",
            desc: "Your blog posts and service pages talk about storage in general terms. There is no mention of your city, your neighborhoods, or your specific service area. Google has no reason to prefer your page over a national chain's.",
          },
          {
            num: "02",
            title: "Stale Google Business Profile ",
            desc: "Your GBP description was written once and never touched. There are no weekly posts, no neighborhood references, no seasonal updates. Google reads inactivity as a signal that your business is no longer relevant.",
          },
          {
            num: "03",
            title: "No zip code-level relevance ",
            desc: "You serve people across ten or more zip codes, but your content does not name any of them. The searcher in zip code 30309 has no signal that you serve their exact area.",
          },
          {
            num: "04",
            title: "Surface-level keyword targeting ",
            desc: "Your content targets terms like \"storage units\" without going deeper into the questions people actually ask: climate control for humid summers, vehicle storage during HOA disputes, business inventory overflow, move-in timing around school calendars.",
          },
          {
            num: "05",
            title: "No competitive research behind it ",
            desc: "Content gets written based on what feels right, not based on what your competitors are ranking for, what searchers are actually asking, or where the opportunity gaps live. Most of it never ranks for anything meaningful.",
          },
          {
            num: "06",
            title: "Multi-location operators publishing one set of content ",
            desc: "If you run multiple facilities, you probably have one blog and one set of service pages serving all of them. Every location is fighting itself for rankings and none of them get a clean shot at their own market.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="numbered"
        label="How We Write Content That Actually Ranks"
        bulletTitleSuffix=""
        headline="Hyper-local content built around real search behavior."
        intro="Our content process starts with research, not writing. Before a single word is drafted, we map every zip code around your facility, every search your potential tenants are running, and every gap your competitors have left open. Here is how that translates into content that pops up when people search near you."
        items={[
          {
            num: "01",
            title: "Zip code-level research and mapping ",
            desc: "We map every zip code within a five-mile radius of your single facility, or ten miles around each location for multi-facility operators. For each zip code we pull search volume, demographic patterns, common queries, and the specific neighborhoods within it. The result is a content brief that knows where your tenants live before we write a word.",
          },
          {
            num: "02",
            title: "SEMrush and Ahrefs competitive analysis ",
            desc: "We use SEMrush and Ahrefs to see exactly what your competitors are ranking for, what they are missing, and where the opportunity gaps live in your specific market. Public ranking data, keyword difficulty scores, and search volume from these tools form the spine of every content decision.",
          },
          {
            num: "03",
            title: "Public data signals ",
            desc: "We layer in public sources that most agencies ignore: census data for neighborhood demographics, Google Trends for seasonal patterns, local subreddit and forum activity for the real questions people are asking, real estate market data for move-in triggers, and local news for community context. This is what turns a generic article into one that reads like it was written for your specific market.",
          },
          {
            num: "04",
            title: "Hyper-local copy that reads naturally ",
            desc: "Once research is done, the writing references real neighborhoods, real landmarks, real local context. A page targeting Buckhead in Atlanta mentions Phipps Plaza, the Buckhead loop, and the apartment communities along Peachtree Road. A page for Plano references the Legacy West area, the Dallas North Tollway, and the specific apartment turnover patterns local to that submarket.",
          },
          {
            num: "05",
            title: "Google Business Profile content cadence ",
            desc: "Most operators treat GBP as a static listing. We treat it as a content channel. Weekly posts referencing local events, seasonal offers tied to local timing, photos with proper geotagging, and Q&A seeding all keep your profile active and ranking. Google explicitly rewards this kind of consistent activity.",
          },
          {
            num: "06",
            title: "Website pages that match the search intent ",
            desc: "For every meaningful search around your facility, we build or rewrite the page that should rank for it. City pages, neighborhood pages, unit type pages, use-case pages. Each one is written with the searcher's specific intent in mind, not as a thin variant of your homepage.",
          },
        ]}
      />

      <ContentBlock
        variant="light"
        label="For single-facility operators"
        headline="Five-mile content strategy for single locations."
        body={
          <>
            <p>
              If you run one facility, your content needs to dominate a tight
              geographic radius. The strategy is depth, not breadth. We saturate
              your service area with content that names every neighborhood,
              every nearby landmark, and every use case your specific market
              generates.
            </p>
            <h3>What we typically build for a single-facility operator</h3>
            <p>
              We map roughly 8 to 15 zip codes within your service radius and
              build content for each one based on its actual search volume and
              competition. Every neighborhood within those zip codes gets named
              in the content where it matters, and the page targeting structure
              is built around how people actually search for storage in your
              specific city.
            </p>
            <p>
              The GBP gets a weekly post calendar tied to local events, seasonal
              patterns, and community context. Your website gets the location
              pages, unit type pages, and resource articles that compound
              rankings over time. Most single-facility operators see meaningful
              ranking movement within 60 days of the content rolling out.
            </p>
          </>
        }
      />
      <ContentBlock
        variant="warm"
        label="For Multi-Facility Operators"
        headline="Local plus national targeting for portfolio operators."
        body={
          <>
            <p>
              If you run multiple facilities, the content strategy is fundamentally different. 
              Each location needs its own content footprint built around its own service area, 
              and the portfolio as a whole needs a national content layer that connects them. 
              This is the structure most agencies cannot execute because it requires real research at scale.
            </p>
            <h3>The two-layer strategy we run</h3>
            <p>
              The local layer targets every zip code within ten miles of each facility you operate. 
              For a five-facility portfolio, that often works out to 60 to 90 zip codes mapped, researched, 
              and addressed in content. Each location gets its own content footprint built around its own market,
               with no overlap or self-cannibalization between sites.
            </p>
            <p>
              The national layer connects your portfolio through brand-level content that targets state,
               regional, and national storage queries. Comparison guides, regional move trends, multi-city 
               storage advice, and brand-building resources all live at the portfolio level rather than tied 
               to a single facility. Done correctly, this layer ranks across your entire footprint and feeds 
               qualified traffic into the right local pages based on the searcher's location.
            </p>
            <p>
              The result is a content system where every location has its own local authority, and the portfolio 
              carries combined brand authority across your entire service footprint. No facility competes with another, 
              every zip code you serve has a page targeting it, and your national content brings in traffic your 
              competitors cannot match.
            </p>
          </>
        }
      />
      <FeatureList
        variant="light"
        style="numbered"
        label="What Most Content Agencies Get Wrong"
        showDividers={false}
        bulletTitleSuffix=""
        headline="Why most storage content fails to move rankings."
        intro="Most content agencies pump out 2,000-word articles that no one reads and nothing ranks for. Volume substitutes for strategy, and the operator pays for it without seeing results. Here is what we do differently."
        items={[
          {
            num: "01",
            title: "We research before we write ",
            desc: "Every piece begins with SEMrush, Ahrefs, and public data analysis specific to your market. We confirm the opportunity exists before committing to the piece. Writing without research is how most agencies waste content budgets.",
          },
          {
            num: "02",
            title: "We localize everything, not just the title ",
            desc: "Local content means more than swapping in a city name. We reference actual neighborhoods, real landmarks, regional language patterns, and seasonal triggers that match how people in your area actually talk about storage.",
          },
          {
            num: "03",
            title: "We update existing content as much as we publish new content ",
            desc: "Content that ranked six months ago may have lost ground to fresher pages. We treat content as an asset to maintain, not just produce. Refreshes, expansions, and updates are part of the engagement.",
          },
          {
            num: "04",
            title: "We write for both Google and AI engines ",
            desc: "Modern content needs to surface in traditional search and in AI answers like ChatGPT, Perplexity, and Google AI Overviews. Our content is structured for both, with schema, entity signals, and citation-friendly formats built in.",
          },
          {
            num: "05",
            title: "We measure outcomes, not word counts ",
            desc: "Most content reports brag about pieces published. Ours track rankings, traffic, calls, and move-ins attributed to the content. If a piece is not moving the right metrics, we rework it or replace it.",
          },
        ]}
      />
      <section className="results">
        <div className="container">
          <div className="section-label">Hyper-local content programs in the data.</div>
          <div className="results-screens">
            <div className="results-screen">
              <Image
                src="/images/content image.png"
                alt="SEMrush data showing organic traffic and keyword growth from a hyper-local content program"
                width={2604}
                height={226}
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      <FeatureList
        variant="warm"
        style="numbered"
        label="Our content process"
        bulletTitleSuffix=""
        headline="Research, write, deploy, measure."
        intro="A real content program is not a list of titles to write. It is a research-first process that maps opportunity, produces content that ranks, and tracks performance over time. Here is the schedule we run for every storage operator."
        items={[
          {
            num: "Week 01",
            title: "Market and zip code research ",
            desc: "We map every zip code in your service area, pull SEMrush and Ahrefs data on competitors and search opportunities, and analyze public data sources for local context. You receive a detailed content opportunity report.",
          },
          {
            num: "Week 02",
            title: "Content strategy and calendar ",
            desc: "We build a 90-day content calendar covering both GBP and website. For single-facility operators, this is built around your service radius. For multi-facility operators, we deliver a layered local plus national plan.",
          },
          {
            num: "Week 03",
            title: "First content goes live ",
            desc: "The highest-leverage pieces ship first: the location pages and GBP posts that target the highest-volume, lowest-competition opportunities in your market. You see drafts before publication.",
          },
          {
            num: "Month 02",
            title: "Production rhythm ",
            desc: "Weekly GBP posts, two to four monthly website pieces, and ongoing refreshes to existing content. Performance from week three onward starts informing future pieces.",
          },
          {
            num: "Month 03",
            title: "First performance review ",
            desc: "We pull the data from Google Search Console, GBP insights, and ranking trackers. Pieces that are performing get reinforced. Pieces that are not get reworked. The strategy adapts based on real signals, not assumptions.",
          },
          {
            num: "Month 04+",
            title: "Compounding authority ",
            desc: "Content compounds over time. As more pieces rank, the overall site authority grows, and even older pieces start ranking for more queries. The program is designed to keep building rather than plateau.",
          },
        ]}
      />


      <Testimonial
        quote={
          <>
            We had five facilities and one blog. Every article was generic and nothing was ranking. SelfStorage.help mapped every zip code in our coverage area and built content specifically for each one. Within six months our organic traffic was up four times and we were ranking for searches we did not even know existed.
          </>
        }
        avatarInitials="AP"
        name="— Aisha Patel · Operations Director, Five-Facility Portfolio, Dallas-Fort Worth"
        detail="4.2× Organic traffic increase in 6 months"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "How is this different from a regular content writing service?",
            a: "Regular content services write articles. We run a research-first content program tied to your specific local market. Every piece is informed by SEMrush and Ahrefs data, public sources, and zip code-level research. The writing is the last 30 percent of the work. The research is the first 70.",
          },
          {
            q: "How many pieces will you produce per month?",
            a: "Typically two to four website pieces per month plus weekly GBP posts. Volume varies based on your service area size and competition. We prioritize quality and ranking impact over raw output. Two well-researched pieces that rank outperform ten thin pieces that do not.",
          },
          {
            q: "Do you use AI to write the content?",
            a: "We use AI as a research and drafting aid the way any modern writer might, but every piece is researched, edited, and finalized by a human who understands storage. AI-only content does not rank reliably and does not represent your brand the way you would want.",
          },
          {
            q: "How do you handle multi-facility operators differently?",
            a: "Multi-facility operators get a two-layer strategy. The local layer covers every zip code within ten miles of each facility with location-specific content. The national layer builds portfolio-wide authority through state, regional, and national content. This is fundamentally different from running multiple single-facility plans in parallel.",
          },
          {
            q: "What if my Google Business Profile already has a description?",
            a: "We audit what you have, rewrite or refine it based on the keyword research, and build out the supporting content that GBP supports: products, services, posts, Q&A, and photos. The description is one small part of the GBP content footprint.",
          },
          {
            q: "Will this help me show up in AI search results?",
            a: "Yes. AI engines rely on structured content, entity authority, and citation patterns to surface businesses in answers. Our hyper-local content with proper schema, real local references, and high topical authority is exactly what AI engines look for when answering storage-related questions.",
          },
          {
            q: "How long until I see ranking results?",
            a: "Most operators see initial ranking movement within 60 days of the first content going live. Full impact typically settles in by month four or five, with results continuing to compound from there. Content is the slowest of the SEO services to show results, but the most durable once it does.",
          },
        ]}
      />

      <SimpleCTA
        headline="Find out what content opportunities exist around your facility today. Free audit."
        body="Drop your facility website below and we will send a content opportunity report covering the zip codes you should be targeting, the searches your competitors are ranking for, and the gaps where you can win quickly. Built specifically for your market."
        ctaLabel=" Send my content opportunity audit"
        note="We respond within two business days. Your details stay with us."
      />
    </>
  );
}
