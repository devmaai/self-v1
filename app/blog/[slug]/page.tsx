import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import { getAllPostSlugs, getAllPosts, getPost } from "@/lib/posts";
import { extractFaqs, splitFaqSection } from "@/lib/faq";

const SITE_URL = "https://www.selfstorage.help";
const absoluteUrl = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`);

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
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: "Marketing Team" }],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle ?? post.title,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date || undefined,
      modifiedTime: post.updated || undefined,
      images: post.coverImage ? [absoluteUrl(post.coverImage)] : undefined,
    },
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

const markdownComponents: Components = {
  a: ({ href = "", children }) => {
    const isExternal = /^https?:\/\//i.test(href) && !href.includes("selfstorage.help");
    return isExternal ? (
      <a href={href} target="_blank" rel="nofollow noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href}>{children}</Link>
    );
  },
};

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
  const author = "Marketing Team";
  const categoryLabel = post.category === "seo" ? "SEO & Growth" : "Facility Insights";
  const heroImage = post.coverImage || "/images/storage-guide/boxes.jpg";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date || undefined,
    dateModified: post.updated || post.date || undefined,
    author: { "@type": "Organization", name: author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: absoluteUrl(heroImage),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const faqs = extractFaqs(post.body);
  const faqSplit = faqs.length ? splitFaqSection(post.body) : null;
  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
              {faqSplit ? (
                <>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{faqSplit.before}</ReactMarkdown>
                  <h2>{faqSplit.heading}</h2>
                  <ul className="blog-faq-list">
                    {faqs.map((faq) => (
                      <li key={faq.question}>
                        <strong className="blog-faq-q">{faq.question}</strong>
                        <p className="blog-faq-a">{faq.answer}</p>
                      </li>
                    ))}
                  </ul>
                  {faqSplit.after.trim() && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{faqSplit.after}</ReactMarkdown>
                  )}
                </>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.body}</ReactMarkdown>
              )}
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
              <Link href="/storage-unit-size-calculator">
                Try the size calculator <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          <aside className="blog-article-sidebar" aria-label="More from the blog">
            <Link className="blog-calc-cta" href="/storage-unit-size-calculator">
              <span className="blog-calc-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2.5" width="16" height="19" rx="2.5" /><rect x="7" y="5.5" width="10" height="4" rx="1" /><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" strokeLinecap="round" strokeWidth="2.4" /></svg>
              </span>
              <span className="blog-sidebar-eyebrow">Free tool · 2 minutes</span>
              <strong>Not sure what size you need?</strong>
              <span className="blog-calc-copy">Add your rooms and items, and the calculator recommends the right unit so you never pay for space you will not use.</span>
              <span className="blog-calc-button">Try the size calculator <span aria-hidden="true">→</span></span>
            </Link>

            <div className="blog-recent-card">
              <h2>Keep reading</h2>
              <div className="blog-recent-list">
                {recent.map((recentPost) => (
                  <Link href={`/blog/${recentPost.slug}`} key={recentPost.slug} className="blog-recent-item">
                    <img src={recentPost.coverImage || "/images/storage-guide/boxes.jpg"} alt="" loading="lazy" />
                    <span className="blog-recent-text">
                      <span className="blog-recent-date">{formatDate(recentPost.date)}</span>
                      <span className="blog-recent-title">{recentPost.title}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link className="blog-recent-all" href="/blog">View all articles <span aria-hidden="true">→</span></Link>
            </div>
          </aside>
        </section>

        <section className="blog-article-cta" aria-labelledby="article-cta-heading">
          <div className="blog-cta-panel">
            <div className="blog-cta-copy">
              <span className="blog-cta-eyebrow">For storage facility owners</span>
              <h2 id="article-cta-heading">Ready to grow your storage business?</h2>
              <p>List your facility in our directory and reach renters who are comparing storage in your city right now.</p>
            </div>
            <div className="blog-cta-actions">
              <Link className="blog-cta-btn blog-cta-btn-primary" href="/list-your-facility">
                List your facility <span aria-hidden="true">→</span>
              </Link>
              <Link className="blog-cta-btn blog-cta-btn-ghost" href="/contact">Talk to our team</Link>
            </div>
          </div>
        </section>
      </main>
      <V2Footer />
    </div>
  );
}
