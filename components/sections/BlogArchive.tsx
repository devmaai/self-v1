"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { PostCategory, PostMeta } from "@/lib/posts";

const PAGE_SIZE = 21;

const BLOG_FILTERS = [
  { value: "all", label: "All posts" },
  { value: "facility", label: "Facility blog" },
  { value: "seo", label: "SEO blog" },
] as const;

type BlogFilter = (typeof BLOG_FILTERS)[number]["value"];

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function paginationItems(page: number, pageCount: number) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  if (page <= 4) return [1, 2, 3, 4, "...", pageCount];
  if (page >= pageCount - 3) return [1, "...", pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  return [1, "...", page - 1, page, page + 1, "...", pageCount];
}

export default function BlogArchive({
  posts,
  initialFilter,
}: {
  posts: PostMeta[];
  initialFilter: BlogFilter;
}) {
  const [filter, setFilter] = useState<BlogFilter>(initialFilter);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (filter !== "all" && post.category !== (filter as PostCategory)) return false;
      if (!term) return true;
      return [post.title, post.excerpt, ...(post.keywords ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [posts, filter, query]);

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

  function changeFilter(value: BlogFilter) {
    setFilter(value);
    setPage(1);
    const url = value === "all" ? "/blog#latest" : `/blog?category=${value}#latest`;
    window.history.replaceState(null, "", url);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="blog-archive" ref={resultsRef}>
      <div className="blog-toolbar">
        <nav className="blog-filter" aria-label="Filter blog posts">
          {BLOG_FILTERS.map((item) => {
            const count = item.value === "all"
              ? posts.length
              : posts.filter((post) => post.category === item.value).length;
            const isActive = item.value === filter;

            return (
              <button
                key={item.value}
                type="button"
                className={isActive ? "is-active" : undefined}
                aria-pressed={isActive}
                onClick={() => changeFilter(item.value)}
              >
                {item.label}
                <span className="blog-filter-count" aria-hidden="true">{count}</span>
              </button>
            );
          })}
        </nav>
        <label className="blog-search">
          <span className="sr-only">Search blog posts</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="Search posts..."
          />
        </label>
      </div>

      {visiblePosts.length > 0 ? (
        <>
          <p className="blog-results-count" role="status">
            Showing {startIndex + 1}–{startIndex + visiblePosts.length} of {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
          </p>
          <div className="blog-grid">
            {visiblePosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`blog-card${index === 0 && currentPage === 1 ? " is-featured" : ""}`}
              >
                <span className="blog-card-date">
                  {index === 0 && currentPage === 1 ? `Featured · ${formatDate(post.date)}` : formatDate(post.date)}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="blog-card-link">
                  Read post <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          {pageCount > 1 && (
            <nav className="blog-pagination" aria-label="Blog post pages">
              <button type="button" onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} aria-label="Previous page">←</button>
              {paginationItems(currentPage, pageCount).map((pageNumber, index) => typeof pageNumber === "number" ? (
                <button type="button" className={pageNumber === currentPage ? "active" : ""} onClick={() => goToPage(pageNumber)} key={pageNumber} aria-current={pageNumber === currentPage ? "page" : undefined}>{pageNumber}</button>
              ) : <span className="blog-pagination-gap" key={`gap-${index}`}>...</span>)}
              <button type="button" onClick={() => goToPage(Math.min(pageCount, currentPage + 1))} disabled={currentPage === pageCount} aria-label="Next page">→</button>
            </nav>
          )}
        </>
      ) : (
        <div className="blog-filter-empty">
          <strong>{query.trim() ? "No posts match your search" : filter === "all" ? "No posts yet" : "No posts in this category yet"}</strong>
          <span>{query.trim() ? "Try a different keyword or clear the search." : filter === "all" ? "We are putting the finishing touches on the first article. Check back shortly." : "Try another filter to explore the full blog."}</span>
        </div>
      )}
    </div>
  );
}
