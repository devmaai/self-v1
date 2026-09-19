import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import CardSlider from "@/components/ui/CardSlider";
import { getAllPostSlugs, getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found | SelfStorage.help" };
  return {
    title: `${post.seoTitle ?? post.title} | SelfStorage.help`,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const recent = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />
      <main className="state-storage-page">
        <section className="state-storage-hero">
          <div className="state-storage-hero-inner">
            <div className="city-storage-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span aria-current="page">Article</span>
            </div>
            <div className="blog-eyebrow">
              <span aria-hidden="true" />
              {formatDate(post.date) || "Blog"}
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
            <Link className="state-storage-cta" href="/storage-search?location=Utah">
              Search storage near you <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="utah-content-section" aria-label="Article">
          <article className="blog-reading-card">
            <div className="blog-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>
            <div className="blog-back-row">
              <Link href="/blog">← Back to all posts</Link>
              <Link href="/storage-search?location=Utah">
                Find storage near you <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </section>

        {recent.length > 0 && (
          <section className="state-storage-cities" aria-labelledby="blog-keep-reading-heading">
            <div className="state-storage-heading">
              <h2 id="blog-keep-reading-heading">Keep reading</h2>
              <p>More self-contained guides for storage operators.</p>
            </div>
            <CardSlider trackClassName="blog-grid">
              {recent.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-card">
                  <span className="blog-card-date">{formatDate(r.date)}</span>
                  <h3>{r.title}</h3>
                  <p>{r.excerpt}</p>
                  <span className="blog-card-link">
                    Read post <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </CardSlider>
          </section>
        )}

        <section className="utah-closing-cta" aria-labelledby="blog-post-closing-heading">
          <div>
            <h2 id="blog-post-closing-heading">Find storage units near your location today.</h2>
            <p>
              Search facilities and available units across the country, compare
              current rates side by side, and reserve the unit that fits your
              space and schedule.
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
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span aria-current="page">Article</span>
        </nav>
      </main>
      <V2Footer />
    </div>
  );
}
