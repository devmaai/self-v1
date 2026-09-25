import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
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
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
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

function getReadingTime(body: string): string {
  const words = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_`\-[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
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
    .filter((recentPost) => recentPost.slug !== post.slug)
    .slice(0, 4);
  const author = post.author ?? "SelfStorage.help Editorial";
  const categoryLabel = post.category === "seo" ? "SEO & Growth" : "Facility Insights";
  const heroImage = post.coverImage || "/images/storage-guide/boxes.jpg";

  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />
      <main className="blog-article-page">
        <section className="blog-article-hero" aria-labelledby="article-title">
          <div className="blog-article-hero-inner">
            <div className="blog-article-intro">
              <div className="blog-article-meta">
                <span className="blog-article-category">{categoryLabel}</span>
                <span>{getReadingTime(post.body)}</span>
                {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              </div>
              <h1 id="article-title">{post.title}</h1>
              <p className="blog-article-byline">Author: {author}</p>
            </div>
            <figure className="blog-article-hero-media">
              <img src={heroImage} alt={post.title} />
            </figure>
          </div>
        </section>

        <div className="blog-article-divider" aria-hidden="true" />

        <section className="blog-article-layout" aria-label="Article content">
          <article className="blog-article-content">
            <div className="blog-prose blog-article-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>

            <div className="blog-article-author">
              <span className="blog-article-author-mark" aria-hidden="true">{getInitials(author)}</span>
              <div>
                <strong>{author}</strong>
                <span>Author</span>
              </div>
            </div>

            <div className="blog-back-row">
              <Link href="/blog">← Back to all posts</Link>
              <Link href="/storage-size-guide">
                View the storage size guide <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          <aside className="blog-article-sidebar" aria-label="More from the blog">
            <div className="blog-recent-card">
              <h2>Recent Blogs</h2>
              <div className="blog-recent-list">
                {recent.map((recentPost) => (
                  <Link href={`/blog/${recentPost.slug}`} key={recentPost.slug}>
                    <span>{recentPost.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="blog-sidebar-cta">
              <span className="blog-sidebar-eyebrow">Planning a move?</span>
              <h2>Find the right unit size.</h2>
              <p>Use our practical guide to match your belongings to the right storage space.</p>
              <Link href="/storage-size-guide">View the size guide <span aria-hidden="true">→</span></Link>
            </div>
          </aside>
        </section>

        <section className="blog-article-cta" aria-labelledby="article-cta-heading">
          <div>
            <h2 id="article-cta-heading">Ready to grow your storage business?</h2>
            <p>
              Get a clear view of your local search visibility, map pack presence, and the
              opportunities closest to your facility.
            </p>
          </div>
          <div className="blog-article-cta-actions">
            <Link className="blog-article-cta-primary" href="/audit">Request a free audit <span aria-hidden="true">→</span></Link>
            <Link className="blog-article-cta-secondary" href="/contact">Talk to our team <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <V2Footer />
    </div>
  );
}
