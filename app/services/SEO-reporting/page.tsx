import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import MarqueeBanner from "@/components/sections/MarqueeBanner";

export const metadata: Metadata = {
  title: "SEO Reporting For Self-Storage Business Owners | SelfStorage.help",
  description:
    "Clear monthly written reports plus full live access to every tracking tool we use, twenty-four hours a day. Rankings, traffic, calls, and move-ins in plain English.",
};

export default function SeoReportingPage() {
  return (
    <>
      <PageHero
        eyebrow="Full Visibility · Monthly Reporting & Tracking"
        headline="Reports you can actually read. Tracking you can access anytime."
        subheadline="Most SEO agencies send a PDF once a month with charts that take a degree to interpret, then go quiet for the next 29 days. We do the opposite. You get a clear monthly written report covering rankings, traffic, calls, and move-ins, plus full live access to every tracking tool we use, twenty-four hours a day. We pull data from SEMrush, Ahrefs, Google Search Console, and Google Analytics, all properly linked to your Google Business Profile and your website so nothing gets lost in attribution. You see what we see, when we see it, with no gatekeeping and no waiting until the second of the month."
        primaryCta={{ label: "Get a sample monthly report", href: "/contact" }}
        note="Live dashboards · Monthly written reports · Plain-English commentary"
      />

      <MarqueeBanner
        items={[
          "SEMrush ranking data",
          "Ahrefs backlink tracking",
          "Google Search Console performance",
          "Google Analytics 4 integration",
          "GMB insights",
          "Call tracking attribution",
          "Move-in source reporting",
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="The problem"
        showDividers={false}
        bulletTitleSuffix=""
        headline="Why do most SEO reports leave operators in the dark."
        intro="If you have worked with an SEO agency before, you have probably seen the pattern. A 30-page PDF arrives, you skim it, you cannot tell if anything actually moved, and you wait another month to do it again. Here is where most reporting falls apart for independent storage operators."
        items={[
          {
            num: "01",
            title: "Reports designed to obscure, not explain ",
            desc: "The charts are dense, the metrics are vague, and the commentary is filled with jargon. By design, you cannot tell if the agency is delivering value or just billing you.",
          },
          {
            num: "02",
            title: "No live access to the tools ",
            desc: "The agency runs the SEMrush account, the Ahrefs account, and the Search Console connection. You see what they choose to show you, when they choose to show it. If you ask for raw data, it takes three days to arrive.",
          },
          {
            num: "03",
            title: "GMB and website tracked separately ",
            desc: "Most agencies look at Google Business Profile and the website as two different worlds. The reporting reflects that. You get one set of numbers for each and no clear picture of how they work together to drive move-ins.",
          },
          {
            num: "04",
            title: "Vanity metrics over real ones ",
            desc: "Impressions are up. Position is up. But move-ins are flat. The report celebrates the easy wins and goes silent on what actually pays the bills.",
          },
          {
            num: "05",
            title: "Attribution gaps everywhere ",
            desc: "Phone calls are not tracked. Form fills are not tagged. Move-ins are not connected back to marketing activity. The agency reports on what they can measure and ignores everything they cannot.",
          },
          {
            num: "06",
            title: "Wait 30 days to know anything ",
            desc: "Performance shifts in real time. Algorithm updates hit weekly. But your visibility into all of it is gated behind a monthly delivery schedule that leaves you guessing in between.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="numbered"
        label="What Makes Our Reporting Different"
        bulletTitleSuffix=""
        headline="Full visibility into your SEO performance, every day of the month."
        intro="Our reporting is built on a simple commitment: you have full access to every tool, every dashboard, and every piece of data we use, every single day. No gatekeeping, no delays, no figuring out what we are hiding. Here is what that actually looks like in practice."
        items={[
          {
            num: "01",
            title: "Every tool linked to your accounts, not ours ",
            desc: "We set up SEMrush, Ahrefs, Google Search Console, Google Analytics 4, and your GMB insights using your accounts where possible, or shared access where the tool requires our seat. You retain ownership of the data, the tracking, and the historical records, even if our engagement ever ends.",
          },
          {
            num: "02",
            title: "Live dashboards available 24/7 ",
            desc: "You get login credentials to every dashboard we use. Want to check your rankings at 2 AM on a Sunday? Go ahead. Want to pull a custom report on a Tuesday afternoon? It is yours to run. There is no time of day or day of the week when our reporting goes offline to you.",
          },
          {
            num: "03",
            title: "Proper tracking integration between GMB and website ",
            desc: "Most agencies skip this step entirely, which is why their reports look fragmented. We make sure your Google Business Profile, your website, Google Analytics, and Search Console are all linked properly so the data flows end-to-end. A click on your GMB listing that turns into a website visit, then a phone call, then a move-in, can be traced from start to finish.",
          },
          {
            num: "04",
            title: "Monthly written report, plain English ",
            desc: "On the second of every month you receive a clear written report covering the prior month. Rankings, traffic, calls, conversions, and where attribution data exists, move-ins. Every section ends with what changed, what it means, and what we are doing next. No jargon, no padding.",
          },
          {
            num: "05",
            title: "Strategic call when you want one ",
            desc: "Every month you can book a 30-minute call to walk through the report and ask anything. Many clients skip it most months and join when something specific comes up. The choice is yours, and there is no penalty for using it or not.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="bullet"
        label="The Tools We Use and How They Connect"
        bulletTitleSuffix=""
        headline="The full reporting stack, properly integrated."
        intro="A reporting program is only as good as the data behind it. We use the same professional tools the best agencies use, but where most stop at running the tools, we make sure they are connected end-to-end so the data tells a complete story. Here is what we run and why it matters."
        items={[
          {
            title: "SEMrush",
            desc: "SEMrush is our primary ranking tracker and competitive intelligence tool. We use it to monitor your position across every keyword that matters in your service area, track movement against your direct local competitors, and uncover opportunities they have left open. You get full read access to your SEMrush project so you can see the same rankings we see.",
          },
          {
            title: "Ahrefs",
            desc: "Ahrefs is where we track your backlink profile, monitor authority growth, and watch for toxic links that could hurt rankings. It is also the strongest tool for understanding how AI engines are referencing your facility across the web. We give you visibility into your Ahrefs project so you can see your backlink growth in real time.",
          },
          {
            title: "Google Search Console",
            desc: "Search Console is the source of truth for how Google actually sees your site. Impressions, clicks, average position, indexation status, and Core Web Vitals all live here. We ensure it is properly verified, linked to your domain, and accessible to you directly. Search Console is free and yours forever, regardless of our engagement.",
          },
          {
            title: "Google Analytics 4",
            desc: "GA4 is where on-site behavior gets tracked. Where visitors come from, what they do once they arrive, how they convert into inquiries or calls, and how long they stay. We configure GA4 properly for storage operators, including the events and conversions that matter, and make sure it is linked to Search Console and GMB.",
          },
          {
            title: "Google Business Profile Insights",
            desc: "GMB insights show how people actually find and interact with your profile. Direct vs discovery searches, calls, direction requests, website clicks, and photo views. We make sure your GMB is properly linked to your Analytics and Search Console accounts so the data flows where it should.",
          },
          {
            title: "Call tracking integration",
            desc: "Where appropriate, we set up dynamic call tracking that attributes every phone call to its source: organic search, GMB, paid, referral, or direct. Without call tracking, a significant portion of your move-ins are invisible to attribution. We close that gap.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="numbered"
        label="Ensuring Everything Is Properly Linked"
        bulletTitleSuffix=""
        headline="The setup work that makes the reporting honest."
        intro="Most reporting fails not because the tools are bad, but because they are not properly connected to each other and to your business assets. We spend the first week of every engagement making sure every tool talks to every other tool, and that your GMB and website are both feeding the same data pipeline. Here is what we lock down."
        items={[
          {
            num: "01",
            title: "Google Search Console verified and linked to GA4 ",
            desc: "The two tools share data when linked properly, giving you a unified view of search performance and on-site behavior. Most setups we audit have one or the other but not both, and certainly not linked.",
          },
          {
            num: "02",
            title: "GA4 connected to your Google Business Profile ",
            desc: "GMB activity gets tagged into GA4 so you can see exactly which traffic came from your GMB listing versus organic search versus paid. Without this, GMB traffic gets lumped into \"direct\" and disappears from attribution.",
          },
          {
            num: "03",
            title: "SEMrush and Ahrefs tracking your real keyword universe ",
            desc: "We build keyword tracking lists tied to your actual service area, every zip code you target, and every unit type you offer. Generic keyword tracking does not work for storage. Local keyword tracking does.",
          },
          {
            num: "04",
            title: "Call tracking numbers properly attributed ",
            desc: "Each marketing channel gets its own trackable phone number where appropriate, so calls can be sourced back to the campaign that generated them. We make sure this does not interfere with your GMB phone number or NAP consistency.",
          },
          {
            num: "05",
            title: "Conversion goals configured in GA4 ",
            desc: "Form submissions, reservation clicks, phone calls, and any other meaningful actions get configured as conversions in GA4. Without this, the reports cannot tell you what is actually converting.",
          },
          {
            num: "06",
            title: "Cross-tool tagging via UTM parameters ",
            desc: "Every link in your marketing, from GBP posts to email campaigns to backlinks where we control them, gets properly tagged so the source data flows correctly into GA4 and the reporting.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="What Is in Your Monthly Report"
        showDividers={false}
        bulletTitleSuffix=""
        headline="Six sections, one clear story."
        intro="Every monthly report follows the same six-section structure so you always know where to find what you need. The numbers change every month, the structure does not."
        items={[
          {
            num: "01",
            title: "Executive summary ",
            desc: "One paragraph at the top of the report covering what moved, what it means, and what we are doing next. If you only read one section, this is the one.",
          },
          {
            num: "02",
            title: "Rankings ",
            desc: "Position changes across the keywords that drive storage move-ins in your service area, broken down by city, neighborhood, and unit type. Pulled from SEMrush with geo-grid data where the map pack is relevant.",
          },
          {
            num: "03",
            title: "Traffic and behavior ",
            desc: "Organic traffic volume, sources, geographic distribution, on-site behavior, and conversion rates. Pulled from GA4 and Search Console, with commentary on what changed and why.",
          },
          {
            num: "04",
            title: "GMB performance ",
            desc: "Profile views, search visibility, calls, direction requests, and engagement metrics. Pulled from GMB insights, with side-by-side comparison to the prior month and the prior year where data exists.",
          },
          {
            num: "05",
            title: "Backlinks and authority ",
            desc: "New referring domains, lost links, toxic link flags, and overall authority score changes. Pulled from Ahrefs with commentary on the impact of our backlink work.",
          },
          {
            num: "06",
            title: "Conversions and attribution ",
            desc: "Form fills, calls, and where attribution allows, move-ins. Broken down by source so you know exactly which channels are driving the business outcomes that matter.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="numbered"
        label="Our Reporting Setup Process"
        bulletTitleSuffix=""
        headline="Tracking right, before reporting starts."
        intro="Without proper tracking, no reporting is reliable. The first weeks of every engagement are dedicated to locking down the integrations and access so every month after that runs cleanly. Here is the schedule."
        items={[
          {
            num: "Week 01",
            title: "Tracking audit ",
            desc: "We audit every tracking tool you currently have set up, identify what is missing, what is misconfigured, and what is delivering misleading data. You receive a written assessment.",
          },
          {
            num: "Week 02",
            title: "Tool deployment and integration ",
            desc: "SEMrush, Ahrefs, Search Console, GA4, GMB insights, and call tracking all get deployed or reconfigured. Every tool gets linked to every other tool where appropriate, and your access credentials are set up immediately.",
          },
          {
            num: "Week 03",
            title: "Baseline capture ",
            desc: "We document your starting position across every metric we will report on going forward. This is the benchmark every future month is measured against.",
          },
          {
            num: "Week 04",
            title: "Dashboard handoff ",
            desc: "You receive login credentials for every dashboard we use, plus a written guide to what each tool shows and how to read it. We walk through it together on a setup call.",
          },
          {
            num: "Month 02",
            title: "First written report delivered ",
            desc: "On the second of month two, you receive your first full written monthly report covering month one. From here, the cadence runs on the second of every month, every month.",
          },
          {
            num: "Ongoing",
            title: "Continuous tuning ",
            desc: "Tracking is never set-and-forget. New conversion goals, new keywords, new channels, and changes to the tools themselves all require ongoing adjustment. This is part of every engagement, not a separate add-on.",
          },
        ]}
      />

      <Testimonial
        quote={
          <>
            Our previous agency sent a PDF on the third Thursday of every month and that was the
            only time we saw any data. SelfStorage.help gave us full access to every tool from day
            one. We can check our rankings on a Saturday morning if we want to, and the monthly
            report actually explains what is going on. The transparency completely changed how
            confident we feel about our marketing spend.
          </>
        }
        avatarInitials="JO"
        name="— James Okafor · Owner, Three-Facility Operator, Houston"
        detail="100% Tool access 24/7"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: 'What does "full access" actually mean?',
            a: "It means you receive login credentials to every dashboard we use to manage your SEO. SEMrush project, Ahrefs project, Search Console, GA4, GMB insights, call tracking. You can log in at any time, run any report you want, and see the same data we see. No request needed, no waiting, no gatekeeping.",
          },
          {
            q: "Do I have to use the tools myself?",
            a: "Not at all. The monthly written report covers everything you need to know. Live access is there for owners who want it and for moments when something specific comes up. Most clients check in occasionally rather than daily.",
          },
          {
            q: "What happens to the data if our engagement ends?",
            a: "Search Console, GA4, and GMB are your accounts permanently and forever. Historical data stays with you. For SEMrush and Ahrefs, if you want to retain access, we can help you set up your own subscriptions during offboarding so no data is lost.",
          },
          {
            q: "Do you report on move-ins, or just leads?",
            a: "Where your management software allows it, we track from search session all the way to rented unit. Not every channel is fully trackable, and we are honest in the report about what we can and cannot measure. The goal is the most accurate picture we can give you, not made-up numbers.",
          },
          {
            q: "How often do you actually look at the data?",
            a: "We pull rankings weekly, traffic and behavior data daily, and major metrics in real time when something looks off. Algorithm updates and significant ranking shifts get flagged to you immediately, not buried in next month's report.",
          },
          {
            q: "Can I customize what is in the monthly report?",
            a: "Yes. The default six-section structure works for most operators, but if you have specific metrics that matter to your operations, we incorporate them. Move-in count, average rental duration, revenue per inquiry, occupancy rate. Tell us what matters and we will report on it.",
          },
          {
            q: "Will the reporting include AI search and AEO visibility?",
            a: "Yes. We track citations and mentions in AI engines like ChatGPT, Perplexity, and Google AI Overviews where attribution is possible. This is a fast-growing component of the report and one of the reasons operators come to us specifically.",
          },
        ]}
      />

      <CTABanner
        headline={
          <>
            See exactly what we report and how. <em>Sample report on request.</em>
          </>
        }
        subtext="Drop your facility website below and we will send a real sample monthly report so you can see the structure, the depth, and the level of transparency we deliver. No commitment, no follow-up sales pressure."
        placeholder="yourfacility.com"
        ctaLabel="Send me a sample report"
        note="We respond within two business days. Your details stay with us."
      />
    </>
  );
}
