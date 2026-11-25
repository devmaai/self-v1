import Link from "next/link";
import Image from "next/image";
import { getPostsBySlugs } from "@/lib/posts";

// Curated related blog guides for a storage-type page. Slugs are shown in the order given.
export default function RelatedPosts({ slugs, id, heading = "Related storage guides", intro }: { slugs: string[]; id: string; heading?: string; intro?: string }) {
  const posts = getPostsBySlugs(slugs).slice(0, 3);
  if (!posts.length) return null;
  const headingId = `${id}-related-heading`;
  return (
    <section className="latest-posts related-posts" aria-labelledby={headingId}>
      <div className="storage-guide-heading">
        <span className="storage-search-label">From the blog</span>
        <h2 id={headingId}>{heading}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="latest-posts-grid">
        {posts.map((post) => (
          <Link className="latest-post-card" href={`/blog/${post.slug}`} key={post.slug}>
            {post.coverImage ? (
              <div className="latest-post-image"><Image src={post.coverImage} alt="" width={640} height={360} quality={90} unoptimized={post.coverImage.startsWith("http")} sizes="(max-width: 900px) 100vw, 33vw" /></div>
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
