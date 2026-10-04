import Link from "next/link";
import { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import CardSlider from "@/components/ui/CardSlider";
import { getAllPosts } from "@/lib/posts";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Self-Storage SEO Blog | SelfStorage.help",
  description:
    "Weekly posts on self-storage SEO: Google algorithm updates, local SEO tactics, marketing trends, and operator case studies.",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const TOPICS = [
  "Local SEO",
  "Google Maps Ranking",
  "GBP Optimisation",
  "Technical SEO",
  "Content Writing",
  "AEO & GEO",
  "Backlink Building",
  "Review Strategy",
];

const BLOG_FILTERS = [
  { value: "all", label: "All posts" },
  { value: "facility", label: "Facility blog" },
  { value: "seo", label: "SEO blog" },
] as const;

type BlogFilter = (typeof BLOG_FILTERS)[number]["value"];

const STEPS = [
  "Start with the latest post. Each guide is self-contained, so you can read in any order.",
  "Match the topic to your need — map pack visibility, unit-size pages, or reviews.",
  "Apply one tactic at a time and measure the change in calls and reservations.",
  "Compare your facility against the examples before changing your site.",
  "Ask us to cover your question — reader requests set the publishing schedule.",
  "Need it done for you? The free audit maps your gaps in five business days.",
];

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = getAllPosts();
  const activeFilter: BlogFilter = category === "facility" || category === "seo" ? category : "all";
  const activeCategory = activeFilter === "all" ? undefined : activeFilter;
  const filteredPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts;
  const [featured, ...rest] = filteredPosts;
  const cards = featured ? [featured, ...rest] : rest;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SelfStorage.help Blog",
    description:
      "Weekly posts on self-storage SEO: Google algorithm updates, local SEO tactics, marketing trends, and operator case studies.",
    url: "https://www.selfstorage.help/blog",
    blogPost: filteredPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date || undefined,
      author: {
        "@type": "Person",
        name: post.author || "SelfStorage.help Editorial",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.selfstorage.help/blog/${post.slug}`,
      },
      image: post.coverImage || undefined,
    })),
  };

  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbListSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ),
        }}
      />
      <main className="state-storage-page">
        <section className="state-storage-hero">
          <div className="state-storage-hero-inner">
            <div className="city-storage-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Blog</span>
            </div>
            <div className="blog-eyebrow">
              <span aria-hidden="true" />
              Blog — storage search, explained
            </div>
            <h1>
              Self-storage SEO,
              <br />
              <em>explained weekly.</em>
            </h1>
            <p>
              Google algorithm updates, local SEO tactics, marketing trends, and
              operator case studies — written for owners who want to understand
              the work. {posts.length > 0 && `${posts.length} ${posts.length === 1 ? "article" : "articles"} published, new post every week.`}
            </p>
            <Link className="state-storage-cta" href="#latest">
              Browse latest posts <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="state-storage-cities" id="latest" aria-labelledby="blog-latest-heading">
          <div className="state-storage-heading">
            <h2 id="blog-latest-heading">Latest posts</h2>
            <p>
              Self-contained guides you can act on — read the ones that match
              what your facility needs right now and skip the rest.
            </p>
          </div>
          <nav className="blog-filter" aria-label="Filter blog posts">
            {BLOG_FILTERS.map((filter) => {
              const count = filter.value === "all"
                ? posts.length
                : posts.filter((post) => post.category === filter.value).length;
              const isActive = filter.value === activeFilter;
              const href = filter.value === "all"
                ? "/blog#latest"
                : `/blog?category=${filter.value}#latest`;

              return (
                <Link
                  key={filter.value}
                  href={href}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {filter.label}
                  <span className="blog-filter-count" aria-hidden="true">{count}</span>
                </Link>
              );
            })}
          </nav>
          {cards.length > 0 ? (
            <CardSlider trackClassName="blog-grid">
              {cards.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={`blog-card${i === 0 ? " is-featured" : ""}`}
                >
                  <span className="blog-card-date">
                    {i === 0 ? `Featured · ${formatDate(p.date)}` : formatDate(p.date)}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="blog-card-link">
                    Read post <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </CardSlider>
          ) : (
            <div className="blog-filter-empty">
              <strong>{activeFilter === "all" ? "No posts yet" : "No posts in this category yet"}</strong>
              <span>{activeFilter === "all" ? "We are putting the finishing touches on the first article. Check back shortly." : "Try another filter to explore the full blog."}</span>
            </div>
          )}
        </section>

        

        

        <section className="utah-closing-cta" aria-labelledby="blog-closing-heading">
          <div>
            <h2 id="blog-closing-heading">Find storage units near your location today.</h2>
            <p>
              Done reading? Search facilities and available units across the
              country, compare current rates side by side, and reserve the unit
              that fits your space and schedule.
            </p>
            <small>Current pricing. Month-to-month terms at most facilities. No obligation to reserve.</small>
          </div>
          <Link className="state-storage-cta" href="/storage-search?location=Utah">
            Search storage units near you <span aria-hidden="true">→</span>
          </Link>
        </section>

        <StorageStateLinks />
        <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Blog</span>
        </nav>
      </main>
      <V2Footer />
    </div>
  );
}
