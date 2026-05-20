export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudy {
  slug: string;
  category: string;
  region: string;
  service: string;
  eyebrow: string;
  cardTitle: string;
  cardBody: string;
  cardImage: string;
  cardMetric?: string;
  featured?: boolean;

  // Detail page
  headline: string;
  headlineAccent?: string;
  excerpt: string;
  heroImage: string;
  metrics: CaseMetric[];
  about: {
    company: string;
    location: string;
    units?: string;
    facilities?: string;
    body: string;
  };
  challenge: string[];
  approach: { num: string; title: string; desc: string }[];
  resultsIntro: string;
  resultsImages?: CaseImage[];
  resultsBullets: string[];
  quote: { text: string; name: string; role: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "florida-independent-map-pack",
    category: "Independent",
    region: "Florida",
    service: "Local SEO + GBP",
    eyebrow: "Independent · Florida",
    cardTitle: "From position seven to the map pack top three in 60 days.",
    cardBody:
      "A single-location operator in Florida had strong occupancy history but had lost visibility after a Google algorithm update. Direction requests tripled within 60 days.",
    cardImage:
      "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1200&q=80",
    cardMetric: "3x",
    featured: true,

    headline: "From position seven to the",
    headlineAccent: "map pack top three in 60 days.",
    excerpt:
      "A single-location operator in Florida had strong occupancy history but had lost visibility after a Google algorithm update. Citation cleanup, GBP overhaul, and a focused on-page rebuild tripled direction requests inside two months without paid ads.",
    heroImage:
      "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { value: "3x", label: "Direction requests" },
      { value: "60d", label: "To top-three rankings" },
      { value: "+22%", label: "Move-ins, 90 days" },
    ],
    about: {
      company: "Single-location independent operator",
      location: "Central Florida",
      units: "612 units",
      facilities: "1 facility",
      body: "A family-owned facility with twenty years of operating history in a competitive Central Florida trade area. Strong word-of-mouth and repeat business, but their organic acquisition pipeline depended almost entirely on Google search. When an algorithm update dropped them from the map pack, monthly inquiries fell by roughly a third inside six weeks.",
    },
    challenge: [
      "Lost the map pack for their primary city term after a Google update dropped from the top three to position seven.",
      "Google Business Profile had outdated hours, an old phone number, and no recent photos. Citations across the web were inconsistent.",
      "On-page content was thin: the homepage targeted a generic 'storage units' phrase, with no location-specific pages.",
      "Owner had tried boosting paid spend as a stopgap, but cost-per-move-in had climbed 38% in three months.",
    ],
    approach: [
      {
        num: "01",
        title: "Citation cleanup and NAP audit",
        desc: "Audited 84 directory citations. Corrected 31 listings where the name, address, or phone number was inconsistent — the single biggest signal Google uses to verify a local business.",
      },
      {
        num: "02",
        title: "Google Business Profile overhaul",
        desc: "Rewrote the business description, added 24 fresh facility photos, populated all service categories, enabled messaging, and set up weekly GBP posts tied to seasonal demand.",
      },
      {
        num: "03",
        title: "On-page rebuild around city + unit-type terms",
        desc: "Built a city landing page plus four unit-type pages (climate-controlled, drive-up, vehicle, business storage). Each page was structured for the specific question the searcher was asking.",
      },
      {
        num: "04",
        title: "Review velocity workflow",
        desc: "Set up an SMS-based review request that fires 48 hours after move-in. Reviews went from 2 per month to 11 per month, with average rating climbing from 4.3 to 4.7.",
      },
    ],
    resultsIntro:
      "Within sixty days the facility had returned to the top three of the map pack for its primary city term and held a top-three position for four of its five secondary terms. The audit dashboard below shows the technical foundation that supported the local SEO work.",
    resultsImages: [
      {
        src: "/images/case-studies/site-health.png",
        alt: "Site health dashboard showing 65% site health and 1,363 crawled pages",
        caption:
          "Baseline site audit dashboard at the start of engagement site health was 65% with 50,021 outstanding issues blocking ranking signals.",
      },
      {
        src: "/images/case-studies/audit-cards.png",
        alt: "Audit category scores: Crawlability 84%, HTTPS 97%, Site Performance 88%, Internal Linking 75%",
        caption:
          "Category scores after the first technical pass Crawlability lifted from 61% to 84%, Internal Linking from 52% to 75%.",
      },
      {
        src: "/images/case-studies/site-performance.png",
        alt: "Site performance score 88% with HTML load speed breakdown",
        caption:
          "Site performance reached 88% 546 of 1,332 pages now load in under half a second, only 3 above 3 seconds.",
      },
      {
        src: "/images/case-studies/errors-warnings.png",
        alt: "Errors and warnings trend charts",
        caption:
          "Active error and warning counts tracked across audit cycles. We work down the high-impact errors first, then triage warnings by template.",
      },
    ],
    resultsBullets: [
      "Direction requests from Google Business Profile tripled in 60 days.",
      "Move-ins from organic search lifted 22% over the 90-day window.",
      "Cost-per-move-in fell 41% as paid spend was reallocated to higher-margin unit types.",
      "Top-three rankings for the primary city term plus four of five secondary terms.",
      "Review count grew from 86 to 142 with average rating climbing to 4.7.",
    ],
    quote: {
      text: "We had been paying an agency that told us SEO was a six-month story. Inside two months we were back at the top of the map and our paid spend was down. The difference was somebody actually doing the unglamorous citation work, not just running ads.",
      name: "Facility owner",
      role: "Central Florida independent operator",
    },
  },
  {
    slug: "southeast-portfolio-rankings",
    category: "Multi-Location",
    region: "Southeast US",
    service: "Portfolio SEO",
    eyebrow: "Southeast · Portfolio SEO",
    cardTitle: "Portfolio-wide top three rankings in six months.",
    cardBody:
      "A twelve-facility operator across three states had four locations stuck below the map pack. Within six months, every facility ranked in the top three.",
    cardImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    cardMetric: "+312%",

    headline: "Portfolio-wide top three rankings in",
    headlineAccent: "six months.",
    excerpt:
      "A twelve-facility multi-state operator was treating SEO as twelve separate problems. We rebuilt their site architecture around a shared template system and rolled out location-specific signals in parallel moving every facility into the top three for its primary keyword set.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { value: "12/12", label: "Facilities top three" },
      { value: "+312%", label: "Aggregate organic clicks" },
      { value: "6mo", label: "End-to-end rollout" },
    ],
    about: {
      company: "Regional multi-location operator",
      location: "Georgia, Florida, Alabama",
      units: "8,400 units",
      facilities: "12 facilities",
      body: "A regional operator built through acquisition. Twelve facilities across three states, each with its own legacy website, citation history, and review profile. The team was managing twelve isolated SEO problems instead of one portfolio problem.",
    },
    challenge: [
      "Four of twelve facilities ranked below the map pack for their primary city term the worst was on page two.",
      "Each facility ran on a different CMS with no shared template. Updates had to be hand-edited per site.",
      "Citation consistency was poor across acquired facilities; some still showed the previous owner's brand.",
      "Internal linking between facility sites was zero none of the portfolio authority was being shared.",
    ],
    approach: [
      {
        num: "01",
        title: "Consolidated to a single CMS and template system",
        desc: "Migrated all twelve facilities onto a shared Next.js template. One change to the template now propagates to every location.",
      },
      {
        num: "02",
        title: "Programmatic location + unit-type pages",
        desc: "Generated 96 pages (12 facilities × 8 unit types) from a single template, each with location-specific copy, photos, and schema.",
      },
      {
        num: "03",
        title: "Portfolio-wide citation reconciliation",
        desc: "Audited 1,400+ citations across the portfolio and corrected 380 inconsistencies biggest single source of ranking gains.",
      },
      {
        num: "04",
        title: "Internal linking between facility pages",
        desc: "Built a 'nearby facilities' module that shares authority across the portfolio. Domain rating lifted from 18 to 31 in five months.",
      },
    ],
    resultsIntro:
      "All twelve facilities reached the top three of the map pack for their primary city term within six months. Aggregate organic clicks across the portfolio grew 312% year over year.",
    resultsBullets: [
      "Every one of twelve facilities ranks top three for its primary city term.",
      "Aggregate organic clicks lifted 312% year over year.",
      "Portfolio domain rating moved from 18 to 31.",
      "Move-ins from organic search overtook paid as the primary acquisition channel inside six months.",
      "CMS migration eliminated approximately 30 hours per month of redundant site maintenance.",
    ],
    quote: {
      text: "Treating SEO as a portfolio problem instead of twelve site problems was the unlock. We stopped paying twelve agencies to do roughly the same thing badly.",
      name: "Director of marketing",
      role: "Twelve-facility Southeast operator",
    },
  },
  {
    slug: "arizona-vehicle-rv-content",
    category: "Vehicle & RV",
    region: "Arizona",
    service: "Content + Local SEO",
    eyebrow: "Arizona · Content + Local SEO",
    cardTitle: "38% more vehicle storage reservations year over year.",
    cardBody:
      "An Arizona vehicle and RV storage specialist built out vehicle-specific keyword clusters and seasonal content. Organic reservations for vehicle spaces grew 38% year over year.",
    cardImage:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    cardMetric: "+38%",

    headline: "38% more vehicle storage reservations",
    headlineAccent: "year over year.",
    excerpt:
      "Vehicle and RV storage is a different search problem than household storage. We rebuilt content around the specific decisions an RV owner makes — covered vs. uncovered, dimensions, hookups — and matched it to seasonal demand patterns across Arizona's snowbird cycle.",
    heroImage:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { value: "+38%", label: "Reservations YoY" },
      { value: "4x", label: "RV-specific keywords ranked" },
      { value: "27%", label: "Lower acquisition cost" },
    ],
    about: {
      company: "Vehicle and RV storage specialist",
      location: "Phoenix metro, Arizona",
      units: "340 vehicle spaces",
      facilities: "2 facilities",
      body: "Two Phoenix-area facilities specializing in vehicle, RV, and boat storage. Customer base skews toward seasonal snowbirds from the Midwest and Pacific Northwest, with a smaller cohort of year-round local RV owners.",
    },
    challenge: [
      "Site treated vehicle storage as a single generic page. No coverage of covered vs. uncovered, dimensions, or RV-specific concerns.",
      "Seasonal demand was being missed content didn't surface for snowbird-pattern searches in September and October.",
      "Competing facilities owned the 'RV storage Phoenix' keyword by a large margin in organic search.",
    ],
    approach: [
      {
        num: "01",
        title: "RV-specific keyword cluster build-out",
        desc: "Mapped 47 RV-specific search intents from 'covered RV storage 40 foot' to 'snowbird storage Arizona winter' — and built dedicated pages for each cluster.",
      },
      {
        num: "02",
        title: "Seasonal content calendar",
        desc: "Built a content calendar tied to snowbird migration patterns. Pre-season articles published in July and August captured demand before competitors.",
      },
      {
        num: "03",
        title: "Dimension and amenity transparency",
        desc: "Added space dimensions, hookup availability, and access details to every vehicle storage page. This was the single most-cited factor in customer interviews.",
      },
      {
        num: "04",
        title: "Local pack optimization for vehicle terms",
        desc: "Built location pages specifically for RV-related city + intent combinations. Took the top spot for 'RV storage Phoenix' inside four months.",
      },
    ],
    resultsIntro:
      "Vehicle and RV reservations from organic search grew 38% year over year. RV-specific keyword visibility quadrupled, with the facility ranking top three for 31 of 47 targeted RV terms.",
    resultsBullets: [
      "Vehicle storage reservations from organic grew 38% year over year.",
      "RV-specific keyword visibility quadrupled across nine months.",
      "Cost-per-acquisition for vehicle spaces fell 27%.",
      "Snowbird-season inquiries doubled compared to the prior year.",
      "Top spot for 'RV storage Phoenix' achieved inside four months.",
    ],
    quote: {
      text: "Our previous content sounded like every other storage facility. The rebuild made it obvious we actually understand RVs and the people who own them.",
      name: "General manager",
      role: "Phoenix vehicle and RV storage",
    },
  },
  {
    slug: "texas-climate-premium-occupancy",
    category: "Climate-Controlled",
    region: "Texas",
    service: "Conversion",
    eyebrow: "Texas · Conversion",
    cardTitle: "Premium unit occupancy at 97% in eight months.",
    cardBody:
      "A climate-controlled facility in Texas targeted renters storing high-value items. GBP optimization and climate-specific content pushed premium unit occupancy to 97%.",
    cardImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    cardMetric: "97%",

    headline: "Premium unit occupancy at 97% in",
    headlineAccent: "eight months.",
    excerpt:
      "Climate-controlled units are a different sale. The renter is storing something they actually care about wine, documents, art, instruments and the search behavior reflects that. We rebuilt the funnel around what climate-controlled buyers actually research.",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { value: "97%", label: "Premium unit occupancy" },
      { value: "+58%", label: "Climate-specific organic traffic" },
      { value: "8mo", label: "From 71% to 97% occupancy" },
    ],
    about: {
      company: "Specialty climate-controlled facility",
      location: "North Dallas, Texas",
      units: "480 climate-controlled units",
      facilities: "1 facility",
      body: "A purpose-built climate-controlled facility serving a high-income North Dallas trade area. Customer base skews toward households storing wine, art, documents, and seasonal high-value items.",
    },
    challenge: [
      "Premium units sat at 71% occupancy while standard units ran at 94% pricing was leaving revenue on the table.",
      "Site copy emphasized 'climate-controlled' as a feature, not as a solution to the specific problems climate buyers have.",
      "No content targeting high-intent searches like 'wine storage Dallas' or 'document storage climate controlled'.",
      "Photos showed empty units, not the high-end use cases that justify premium pricing.",
    ],
    approach: [
      {
        num: "01",
        title: "Use-case content clusters",
        desc: "Built dedicated pages for wine, art, documents, instruments, and electronics — each one matched to the actual research path of a high-intent buyer.",
      },
      {
        num: "02",
        title: "Visual rebuild around use cases",
        desc: "Replaced empty-unit photos with staged use-case imagery. Conversion from page visit to inquiry lifted 31%.",
      },
      {
        num: "03",
        title: "Trust signal stacking",
        desc: "Added humidity and temperature monitoring detail, insurance coverage breakdown, and access security specifics — all factors named in customer interviews.",
      },
      {
        num: "04",
        title: "GBP optimization for premium intent",
        desc: "Restructured Google Business Profile around premium search terms and added 18 photos targeting the high-value use cases.",
      },
    ],
    resultsIntro:
      "Premium unit occupancy moved from 71% to 97% inside eight months, with average rent-per-square-foot lifting 14% as the facility could hold price on a tighter inventory.",
    resultsBullets: [
      "Premium climate-controlled occupancy: 71% → 97% in eight months.",
      "Climate-specific organic traffic grew 58%.",
      "Conversion from page visit to inquiry lifted 31%.",
      "Average rent-per-square-foot lifted 14% across the climate inventory.",
      "Wine storage and document storage now both top-three for primary terms.",
    ],
    quote: {
      text: "The shift was treating the climate units as a different product. Once the website spoke to what those buyers actually care about, the units filled themselves.",
      name: "Owner / operator",
      role: "North Dallas climate facility",
    },
  },
  {
    slug: "colorado-pre-opening-lease-up",
    category: "Pre-Opening",
    region: "Colorado",
    service: "Full program",
    eyebrow: "Colorado · Full program",
    cardTitle: "Hit 62% occupancy by month twelve.",
    cardBody:
      "A new facility in Colorado started the pre-opening SEO program six months before doors opened. By month 12, occupancy reached 62%, ahead of underwriting.",
    cardImage:
      "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?auto=format&fit=crop&w=1200&q=80",
    cardMetric: "62%",

    headline: "Hit 62% occupancy by",
    headlineAccent: "month twelve.",
    excerpt:
      "Lease-up is the single most expensive period in a self-storage project. We started the SEO program six months before doors opened so day-one traffic existed when the first customer searched. The facility was at 62% by month twelve, well ahead of the underwriting model.",
    heroImage:
      "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { value: "62%", label: "Occupancy at month 12" },
      { value: "M-6", label: "SEO started pre-opening" },
      { value: "4mo", label: "Ahead of underwriting" },
    ],
    about: {
      company: "Ground-up new facility",
      location: "Front Range, Colorado",
      units: "780 units",
      facilities: "1 facility (new build)",
      body: "A first-time owner-operator developing a 780-unit climate and non-climate mixed facility on the Front Range. Underwriting assumed 24-month lease-up; we were brought in six months before doors opened to compress that curve.",
    },
    challenge: [
      "No domain history, no reviews, no GBP zero local authority signals at the start.",
      "Two established competitors within three miles, each with 200+ reviews and ten-plus years of citation history.",
      "Construction delays meant the opening date moved twice, so content and outreach had to be replanned mid-build.",
      "Owner had no budget for paid acquisition during lease-up.",
    ],
    approach: [
      {
        num: "01",
        title: "Pre-opening domain build",
        desc: "Six months before opening, launched the site with a 'coming soon' page that captured email signups. By open day, the domain had 14 referring domains and ranked for branded terms.",
      },
      {
        num: "02",
        title: "Citation seed and pre-GBP build",
        desc: "Built out 60+ citations and pre-registered Google Business Profile so it could be activated the day construction reached the address-verifiable stage.",
      },
      {
        num: "03",
        title: "Local content authority",
        desc: "Published city-specific moving and storage content from month -6 onward. By open day, the site ranked for 23 informational keywords driving above-the-funnel awareness.",
      },
      {
        num: "04",
        title: "Day-one review velocity",
        desc: "Set up review request workflow before opening so the first ten customers all left reviews inside two weeks. Hit 4.8 average rating with 47 reviews by month 6.",
      },
    ],
    resultsIntro:
      "The facility reached 62% occupancy by month twelve four months ahead of the underwriting model's lease-up curve. Cash flow positive at month nine instead of month thirteen.",
    resultsBullets: [
      "62% occupancy at month 12 (vs. 41% in underwriting assumption).",
      "Cash flow positive four months ahead of plan.",
      "Top-three map pack ranking achieved by month 4.",
      "Zero paid acquisition spend during the lease-up period.",
      "47 reviews and 4.8 average rating inside the first six months.",
    ],
    quote: {
      text: "Starting the SEO before construction finished felt premature at the time. In hindsight it was the single highest-leverage decision in the project those six months of compounding meant we never had a slow opening month.",
      name: "Owner-developer",
      role: "Colorado ground-up project",
    },
  },
  {
    slug: "ohio-independent-map-pack",
    category: "Independent",
    region: "Ohio",
    service: "Map Pack",
    eyebrow: "Ohio · Map Pack",
    cardTitle: "Page two to the top three-pack in four months.",
    cardBody:
      "A single-location operator in Ohio was invisible for their primary city term. Citation cleanup and GBP optimization moved them from page two to the three-pack in four months.",
    cardImage:
      "https://images.unsplash.com/photo-1601158935942-52255782d322?auto=format&fit=crop&w=1200&q=80",
    cardMetric: "Top 3",

    headline: "Page two to the top three-pack in",
    headlineAccent: "four months.",
    excerpt:
      "When a facility is on page two of Google for its own city term, it's effectively invisible the map pack captures most of the click-through. We focused entirely on the signals that drive map pack inclusion and moved this facility from page two to the three-pack in sixteen weeks.",
    heroImage:
      "https://images.unsplash.com/photo-1601158935942-52255782d322?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { value: "Top 3", label: "Map pack ranking" },
      { value: "4mo", label: "From page two to three-pack" },
      { value: "+47%", label: "Phone inquiries" },
    ],
    about: {
      company: "Single-location independent operator",
      location: "Northeast Ohio",
      units: "420 units",
      facilities: "1 facility",
      body: "A fifteen-year-old single-location facility in a mid-sized Ohio market. Three corporate competitors in town with stronger online presence; owner had relied on signage and word-of-mouth for most of the business's history.",
    },
    challenge: [
      "Ranked on page two of Google for the primary city term effectively zero map pack visibility.",
      "Google Business Profile had not been updated in five years.",
      "Only 18 reviews compared to 200+ at each of the three corporate competitors.",
      "Owner was skeptical about SEO after a prior agency took payments without delivering ranking gains.",
    ],
    approach: [
      {
        num: "01",
        title: "Citation reconciliation across 80+ directories",
        desc: "Found and corrected 24 inconsistent listings the largest signal Google uses to confirm business legitimacy.",
      },
      {
        num: "02",
        title: "GBP rebuild with weekly post cadence",
        desc: "Rewrote profile, added 40+ photos, set up weekly GBP posts. Within two months Google traffic to the profile doubled.",
      },
      {
        num: "03",
        title: "Review velocity workflow",
        desc: "Implemented SMS review request 48 hours post-move-in. Review count tripled inside four months.",
      },
      {
        num: "04",
        title: "On-page rebuild around city and unit-type terms",
        desc: "Replaced generic homepage copy with location and unit-type specific pages. Schema markup made the facility eligible for rich result features.",
      },
    ],
    resultsIntro:
      "The facility moved from page two to the top three of the map pack for its primary city term within four months — without paid ads and at a fraction of what the prior agency had charged.",
    resultsBullets: [
      "Top three of the map pack for the primary city term in four months.",
      "Phone inquiries from Google Business Profile lifted 47%.",
      "Review count tripled from 18 to 58.",
      "Direction requests doubled within the first 60 days.",
      "Total ad spend during the engagement: zero.",
    ],
    quote: {
      text: "Fifteen years in business and I had no idea our listing was wrong on half the internet. Fixing that alone moved the needle more than anything else we tried.",
      name: "Facility owner",
      role: "Northeast Ohio independent operator",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getRelatedCaseStudies(slug: string, count = 3) {
  return caseStudies.filter((c) => c.slug !== slug).slice(0, count);
}
