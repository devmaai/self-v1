import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostCategory = "facility" | "seo";

export interface PostMeta {
  slug: string;
  title: string;
  /** Optional SEO <title> override (e.g. suggested title tag with year). Falls back to title. */
  seoTitle?: string;
  date: string;
  excerpt: string;
  /** Meta description from frontmatter (metaDescription). Falls back to a cleaned excerpt. */
  metaDescription: string;
  /** Last updated date (frontmatter "updated" or "dateModified"). Falls back to date. */
  updated: string;
  /** Target keywords from the publishing brief. Used for metadata only, never rendered. */
  keywords?: string[];
  /** Editorial bucket used by the blog filter. */
  category: PostCategory;
  author?: string;
  coverImage?: string;
  published: boolean;
}

export interface Post extends PostMeta {
  body: string;
}

function toIso(value: unknown): string {
  if (!value) return "";
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
}

/** Strips a leading "Introduction" label and trims to a full sentence under ~160 chars. */
function cleanDescription(text: string): string {
  let t = String(text).replace(/^\s*\**introduction\**[:\s]*/i, "").replace(/\s+/g, " ").trim();
  if (t.length <= 160) return t;
  const cut = t.slice(0, 160);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (lastStop > 80) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

function readPostFile(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    seoTitle: data.seoTitle || data.titleTag || undefined,
    date: data.date ? new Date(data.date).toISOString() : "",
    excerpt: data.excerpt ?? "",
    metaDescription: cleanDescription(data.metaDescription || data.excerpt || ""),
    updated: toIso(data.updated ?? data.dateModified) || (data.date ? new Date(data.date).toISOString() : ""),
    keywords: Array.isArray(data.keywords) ? data.keywords.filter((k): k is string => typeof k === "string") : undefined,
    category: data.category === "seo" ? "seo" : "facility",
    author: data.author || undefined,
    coverImage: data.coverImage || undefined,
    // Default to published when the flag is absent so older files still show.
    published: data.published !== false,
    body: content,
  };
}

/** All published posts, newest first. Used by the /blog list. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null && p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ body: _body, ...meta }) => meta);
}

/** Slugs for generateStaticParams and the sitemap. Only published posts. */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null && p.published)
    .map((p) => p.slug);
}

/** A single post by slug. Returns null for missing or unpublished posts. */
export function getPost(slug: string): Post | null {
  const post = readPostFile(slug);
  if (!post || !post.published) return null;
  return post;
}
