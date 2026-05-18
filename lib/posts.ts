import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  published: boolean;
}

export interface Post extends PostMeta {
  body: string;
}

function readPostFile(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : "",
    excerpt: data.excerpt ?? "",
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

/** Slugs for generateStaticParams. */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** A single post by slug. Returns null for missing or unpublished posts. */
export function getPost(slug: string): Post | null {
  const post = readPostFile(slug);
  if (!post || !post.published) return null;
  return post;
}
