import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

// Latest renter-facing blog posts for the homepage.
export default function LatestPosts() {
  const posts = getAllPosts().filter((post) => post.category === "facility").slice(0, 6);
  if (!posts.length) return null;
  return (
    <section className="latest-posts" aria-labelledby="latest-posts-heading">
      <div className="storage-guide-heading">
        <span className="storage-search-label">From the blog</span>
        <h2 id="latest-posts-heading">Learn about storage units before choosing</h2>
        <p>Practical guides on sizes, prices and what to check before you rent.</p>
      </div>
      <div className="latest-posts-grid">
        {posts.map((post) => (
          <Link className="latest-post-card" href={`/blog/${post.slug}`} key={post.slug}>
            {post.coverImage ? (
              <div className="latest-post-image"><Image src={post.coverImage} alt="" width={640} height={360} quality={90} unoptimized={post.coverImage.startsWith("http")} sizes="(max-width: 700px) 100vw, 33vw" /></div>
            ) : null}
            <div className="latest-post-body">
              <h3>{post.title}</h3>
              {post.excerpt ? <p>{post.excerpt.replace(/^Introduction\s*/i, "").slice(0, 150)}{post.excerpt.length > 150 ? "…" : ""}</p> : null}
              <span className="latest-post-link">Read the guide <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="latest-posts-more"><Link className="storage-guide-link" href="/blog">See all guides <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}
