import { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import AeoGeoComparisonTable from "@/components/sections/AeoGeoComparisonTable";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";
import MarqueeBanner from "@/components/sections/MarqueeBanner";

export const metadata: Metadata = {
  title: "Technical SEO for Self-Storage | SelfStorage.help",
  description:
    "We fix the technical foundations of your self-storage website so Google can crawl it, renters can load it instantly, and your booking software converts the traffic you earn.",
};

export default function TechnicalSeoPage() {
  return (
    <>
      <PageHero
        eyebrow=" Foundation Work · Technical SEO Service"
        headline="The technical fixes that quietly decide whether your self storage units rank or not."
        subheadline={"Most self-storage operators have great content and a clean Google Business Profile, but their site still cannot break into the top three positions of the google. The reason almost always lives under the surface. Broken schema, slow page loads, indexation issues, mobile usability gaps, and dozens of other technical problems that search engines and AI tools quietly hold against you.\n\nWe find every issue holding your facility back, fix them properly, and harden both your website and your Google Business Profile so the rest of your SEO investment actually compounds."}
        primaryCta={{ label: "Get your free technical SEO audit", href: "/contact" }}
        note="60-point audit · Website and GBP both covered · Most fixes shipped in 30 days"
      />
      <MarqueeBanner
              items={[
                "Site speed and Core Web Vitals",
                "Schema for storage",
                "Mobile-first audit",
                "Crawl and indexation fixes",
                "GBP technical health",
                "Security and HTTPS",
                "Local entity wiring"
              ]}
            />
      <FeatureList
        variant="light"
        style="numbered"
        label="The problem"
        showDividers={false}
        headline="Why your rankings stall even when everything looks fine."
        bulletTitleSuffix=""
        intro={"A storage website can look polished, load reasonably fast, and still rank below competitors with worse content and weaker links. The reason is almost always technical. Here are the most common issues we uncover when we audit independent operators."}
        items={[
          {
            num: "01",
            title: "Slow on mobile ",
            desc: "Your site might load in two seconds on desktop but takes seven on a phone over LTE. Google ranks on the mobile experience first, and most tenants search from a phone.",
          },
          {
            num: "02",
            title: "Missing or broken schema ",
            desc: "Without LocalBusiness, SelfStorage, and FAQ schema correctly deployed, search engines and AI tools have no structured way to understand what you offer or where you operate.",
          },
          {
            num: "03",
            title: "Indexation problems ",
            desc: "Pages you want ranked are blocked, duplicated, or buried behind redirects. Pages you do not want indexed are eating your crawl budget. Most owners do not even know this is happening.",
          },
          {
            num: "04",
            title: "Core Web Vitals failures ",
            desc: "Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift. Three metrics Google directly uses to rank pages, and most storage sites quietly fail at least two of them.",
          },
          {
            num: "05",
            title: "Broken Google Business Profile signals ",
            desc: "Inconsistent NAP across the web, wrong primary category, missing service area, no products listed, and silent verification issues that suppress your local rankings.",
          },
          {
            num: "06",
            title: "Security and HTTPS gaps ",
            desc: "Mixed content warnings, expired certificates, weak HTTP headers, and exposed admin paths that hurt both rankings and trust. Easy to ignore until they tank your traffic.",
          },
        ]}
      />

      

      <FeatureList
        variant="warm"
        style="numbered"
        label="What we fix on your website"
        headline="The website fixes that move rankings."
        bulletTitleSuffix=""
        intro={"Our audit covers roughly 60 technical checkpoints across speed, structure, schema, security, and crawlability. Here are the categories we work through, in the priority order they typically deliver lift."}
        items={[
          {
            num: "01",
            title: "Core Web Vitals and site speed ",
            desc: "We test your real-world performance on mobile networks and identify what is actually slowing your pages. Heavy images, render-blocking scripts, unoptimized fonts, slow hosting response times, and bloated themes are the usual culprits. Each gets fixed at the root rather than masked with caching. Typical fixes include image compression and next-gen format conversion, lazy loading where appropriate, font display optimization, render-blocking script elimination, and CDN configuration. Most storage sites see a 40 to 60 point PageSpeed score improvement after this phase alone.",
          },
          {
            num: "02",
            title: "Indexation and crawlability ",
            desc: "We crawl your site the same way Google does and map exactly what is being indexed, what is being blocked, and what is wasting crawl budget. Then we fix the structure. This includes XML sitemap audit and rebuild, robots.txt correction, canonical tag deployment, redirect chain cleanup, orphan page resolution, and pagination handling. The result is a site where every important page can be found and ranked, and nothing is competing with itself.",
          },
          {
            num: "03",
            title: "Schema markup and structured data ",
            desc: "We deploy the full schema stack that storage facilities need for both Google and AI engines to understand your business properly. LocalBusiness, SelfStorage, FAQ, BreadcrumbList, Service, Offer, and Review schema all get implemented and validated. This is where AEO and GEO visibility quietly lives. Without correct schema, AI tools cannot reliably pull your facility into their answers no matter how good your content is.",
          },
          {
            num: "04",
            title: "Mobile usability ",
            desc: "Tap target sizes, font legibility, viewport configuration, scroll behavior, and interaction responsiveness all get audited and fixed on real devices, not just emulators. Mobile is where 70 percent of your tenants actually search.",
          },
          {
            num: "05",
            title: "Security, HTTPS, and headers ",
            desc: "Mixed content cleanup, HSTS configuration, security header deployment, certificate validation, and exposed admin path removal. Small fixes individually, meaningful trust signals collectively.",
          },
          {
            num: "06",
            title: "Internal linking and site architecture ",
            desc: "We map how authority flows through your site and fix the gaps. Most storage sites have weak internal linking that strands their best pages. We rebuild the linking structure so authority compounds toward the pages you actually want ranking.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="What we fix on your Google Business Profile"
        showDividers={false}
        headline="The GBP technical layer most agencies skip entirely."
        bulletTitleSuffix=""
        intro={"Your Google Business Profile is not just a listing. It is a structured data asset that Google reads alongside your website. Most agencies treat it as a checklist of fields to fill in, but the technical health of your GBP directly affects your map pack rankings. Here is what we actually fix."}
        items={[
          {
            num: "01",
            title: "NAP consistency across the web ",
            desc: "Your name, address, and phone number must match perfectly across Google, Apple Maps, Bing Places, Yelp, and every directory in between. Even small inconsistencies, like Suite vs Ste, send conflicting signals to Google about whether you are a legitimate business.",
          },
          {
            num: "02",
            title: "Primary and secondary categories ",
            desc: "The single highest-leverage GBP setting. The wrong primary category can quietly suppress your rankings for months. We tune categories specifically for the searches that drive storage move-ins.",
          },
          {
            num: "03",
            title: "Service area definition ",
            desc: "We configure your service area correctly so Google understands the exact geographic zone you serve. This affects which searches you appear for and how Google calculates proximity ranking.",
          },
          {
            num: "04",
            title: "Products and services population ",
            desc: "Climate controlled units, drive-up access, vehicle storage, and other offerings all belong in structured fields, not just buried in your description. Properly populating these expands the queries you can rank for.",
          },
          {
            num: "05",
            title: "Attributes and amenities ",
            desc: "Every relevant attribute, from 24-hour access to security features to accessibility, gets enabled. Each one is a signal that helps Google match you to specific search intent.",
          },
          {
            num: "06",
            title: "Verification and ownership health ",
            desc: "We confirm ownership is properly attributed, no duplicate profiles exist, and no policy violations are silently lowering your visibility. Suspension prevention is part of the work.",
          },
          {
            num: "07",
            title: "GBP and website entity wiring ",
            desc: "Your GBP and your website need to reference each other correctly through schema, sameAs links, and consistent structured data. This is what builds the entity authority that AI engines rely on.",
          },
        ]}
      />
      <FeatureList
        variant="warm"
        style="numbered"
        label="What Most Agencies Ignore"
        showDividers={false}
        headline="The technical layer most agencies will not touch."
        bulletTitleSuffix=""
        intro={"Most SEO agencies stop at the surface fixes: image compression, basic schema, a sitemap rebuild. We go further because that is where the actual ranking gaps live. These are the issues we routinely uncover that other agencies missed entirely."}
        items={[
          {
            num: "01",
            title: "The AEO and GEO technical foundation ",
            desc: "AI engines like ChatGPT, Perplexity, and Google's AI Overviews use a different stack of signals than traditional search. Entity disambiguation, knowledge graph wiring, citation patterns, and structured data depth all matter more than keywords. Most agencies are still optimizing for 2019 Google and ignoring this entirely. We build the technical foundation that AI engines need to understand your facility as a distinct entity, surface you in answers, and trust your information when generating responses about storage in your area.",
          },
          {
            num: "02",
            title: "Crawl budget on small sites ",
            desc: "The conventional wisdom is that crawl budget only matters for large sites. That is wrong for local businesses. When Google crawls your storage site and finds duplicate pages, parameter URLs, or orphaned content, it wastes effort that should be spent reinforcing your important pages. We clean this up systematically.",
          },
          {
            num: "03",
            title: "JavaScript rendering issues ",
            desc: "If your site is built on a framework like React, Vue, or a heavy WordPress theme, parts of your content may not render before Google indexes the page. This is one of the most common silent ranking killers and almost no agency tests for it properly.",
          },
          {
            num: "04",
            title: "International and language tags on US-only sites ",
            desc: "Many storage sites accidentally serve hreflang tags or language metadata that confuses Google about who the site is for. Small issues that quietly suppress local rankings, easily fixed once identified.",
          },
          {
            num: "05",
            title: "Pagination and faceted navigation handling ",
            desc: "Sites with multiple location pages, unit type filters, or city pages often have pagination structures that create thin content or duplicate ranking signals. We rebuild these properly so each variant earns its own authority.",
          },
          {
            num: "06",
            title: "Image and accessibility metadata ",
            desc: "Alt text, structured image schema, EXIF data for facility photos, and accessibility attributes all carry ranking signals that compound. Most agencies skip image SEO entirely. We do not.",
          },
          {
            num: "07",
            title: "Click-through rate optimization in search results ",
            desc: "Title tags, meta descriptions, and rich snippets all influence how often searchers click your result over a competitor's. We test, measure, and rewrite these specifically for storage queries based on what actually performs.",
          },
        ]}
      />
      <section className="results">
        <div className="container">
          <div className="section-label">Real results</div>
          <h2 className="section-title">
            What a properly executed technical SEO program looks like.
          </h2>
          <p className="section-intro">
            The numbers below come from a real client engagement from SemRush.
            We rebuilt the technical foundation in 30 days and tracked the impact
            over the following 60.
          </p>

          <div className="results-screens">
            <div className="results-screen">
              <Image
                src="/images/technical landing page img 1.png"
                alt="SemRush SEO overview for Pickfords: AI Visibility 33, Mentions 938, Site Health 64%, Visibility 43.81%, Organic Traffic 73.2K, Organic Keywords 26.2K, Backlinks 142K"
                width={2604}
                height={226}
                quality={90}
              />
            </div>
            <div className="results-screen">
              <Image
                src="/images/technical landing page img 2.png"
                alt="SemRush SEO overview for Anglo Pacific: AI Visibility 23, Mentions 155, Site Health 81%, Visibility 35.35%, Organic Traffic 4.5K, Organic Keywords 3.7K, Backlinks 14.2K"
                width={2570}
                height={212}
                quality={90}
              />
            </div>
            <div className="results-screen">
              <Image
                src="/images/technical landing page img 3.png"
                alt="SemRush SEO overview for Move Plus Mobility: AI Visibility 0, Mentions 0, Site Health 81%, Visibility 16.82%, Organic Traffic 90, Organic Keywords 199, Backlinks 2.7K"
                width={2548}
                height={214}
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      <FeatureList
        variant="warm"
        style="numbered"
        label="Our technical SEO process"
        headline="Audit, fix, validate, monitor."
        bulletTitleSuffix=""
        intro={"A real technical SEO engagement is not a one-time audit. It is a structured program that uncovers issues, fixes them at the root, validates the fixes worked, and monitors for regressions. Here is the schedule we run for every storage operator."}
        items={[
          {
            num: "Week 01",
            title: "Full technical audit ",
            desc: "We crawl your site the way Google does, run a complete GBP technical health check, test Core Web Vitals across multiple devices and networks, and document every issue in a prioritized action list. You receive a detailed written audit with severity ratings.",
          },
          {
            num: "Week 02",
            title: "Foundation fixes deployed ",
            desc: "The high-impact fixes ship first. Schema deployment, robots and sitemap corrections, redirect cleanup, render-blocking script removal, and the highest-leverage GBP corrections. Most facilities see initial ranking movement from this phase alone.",
          },
          {
            num: "Week 03",
            title: "Core Web Vitals and speed work ",
            desc: "Image optimization, font loading strategy, CDN configuration, render path optimization. We move your PageSpeed scores into the green and tune real-world performance on mobile networks.",
          },
          {
            num: "Week 04",
            title: "Architecture and internal linking ",
            desc: "Site structure refinement, internal linking rebuilds, pagination handling, and any framework-specific fixes for JavaScript rendering. The structural work that compounds over time.",
          },
          {
            num: "Month 02",
            title: "Validation and monitoring setup ",
            desc: "We confirm Google has recrawled and properly indexed everything, validated that all schema is being read correctly, and set up ongoing monitoring for Core Web Vitals, crawl errors, and indexation drift. Issues get caught before they affect rankings.",
          },
          {
            num: "Month 03+",
            title: "Continuous tuning ",
            desc: "Technical SEO is never finished. Algorithm updates, platform changes, and new content all introduce new technical considerations. Monthly checks, quarterly deeper audits, and immediate response to any issues that surface.",
          },
        ]}
      />

      <Testimonial
        quote={
          <>
            Our Webflow rebuild looked great but our rankings collapsed. Three other agencies told us the site was fine and we just needed more content. SelfStorage.help found 47 technical issues in the first week and most of our rankings came back within 60 days of the fixes shipping. We are now ranking higher than we ever did before the rebuild.
          </>
        }
        avatarInitials="MC"
        name="— Marcus Chen · Owner, Single-Facility Operator, North Carolina"
        detail="+67% Organic traffic recovery in 90 days"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "How is this different from a one-time technical audit?",
            a: "A one-time audit gives you a list. Our service delivers the fixes, validates they worked, and monitors for regressions. Technical issues do not stay fixed on their own. Platform updates, new plugins, content changes, and algorithm shifts all introduce new issues. The ongoing component is what protects your rankings.",
          },
          {
            q: "Do you work with my specific platform?",
            a: "Yes. We have deep experience with WordPress, Webflow, Squarespace, Shopify, Wix, and custom-built sites. Each platform has its own technical quirks and ranking pitfalls. We adjust the approach based on what you actually run on.",
          },
          {
            q: "What if my site needs a rebuild rather than fixes?",
            a: "We will tell you directly during the audit. Some technical issues are platform-level limitations rather than fixable bugs. If a rebuild is the better path, we explain why and can recommend the right platform and partners. We do not push rebuilds when fixes will do.",
          },
          {
            q: "Can you fix issues from a previous agency or developer?",
            a: "Yes. A significant portion of our audits uncover damage from prior work. Broken redirects, bad schema, plugin conflicts, and abandoned tracking codes are common. Cleanup is part of the engagement, not a separate add-on.",
          },
          {
            q: "How does this work with my Google Business Profile?",
            a: "We treat your GBP as part of the technical stack, not a separate thing. The audit covers both, the fixes happen in parallel, and the reporting reflects both. Most agencies handle these as two different services. We do not because they only work properly when handled together.",
          },
          {
            q: "Will this help with AI search like ChatGPT and Perplexity?",
            a: "Yes, and significantly. AEO and GEO visibility depends almost entirely on technical signals: schema depth, entity wiring, citation consistency, and structured data quality. Our work directly improves how AI engines understand and surface your facility. This is one of the fastest-growing reasons operators come to us.",
          },
          {
            q: "How quickly will I see results?",
            a: "Most operators see initial movement within 30 days from the foundation fixes alone. Significant ranking and traffic recovery typically settles in by month two or three. Sites coming back from a major issue, like a botched rebuild or a Google penalty, can take longer depending on the depth of the damage.",
          },
        ]}
      />
      <SimpleCTA
        headline="Find out exactly what is holding your facility back. Free technical audit."
        body="Drop your facility website below and we will send a 60-point technical audit covering your site, your Google Business Profile, and the specific fixes that will move your rankings fastest. No sales pitch, just the findings."
        ctaLabel="Send my technical audit"
        note="We respond within two business days. Your details stay with us."
      />
    </>
  );
}
