import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CardGrid from "@/components/sections/CardGrid";
import CTABanner from "@/components/sections/CTABanner";
import { getAllPosts } from "@/lib/posts";

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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        headline={<>Self-storage SEO, <em>explained weekly</em>.</>}
        subheadline="Google algorithm updates, local SEO tactics, marketing trends, and operator case studies, written for owners who want to understand the work."
      />

      {posts.length > 0 ? (
        <CardGrid
          variant="light"
          cols={2}
          headline="Latest posts"
          cards={posts.map((p) => ({
            eyebrow: formatDate(p.date),
            title: p.title,
            body: p.excerpt,
            href: `/blog/${p.slug}`,
            ctaLabel: "Read post",
          }))}
        />
      ) : (
        <CardGrid
          variant="light"
          cols={2}
          headline="Latest posts"
          cards={[
            {
              title: "First post coming soon",
              body: "We are putting the finishing touches on the first article. Check back shortly.",
            },
          ]}
        />
      )}

      <CTABanner
        headline={<>Get your <em>free</em> SEO audit</>}
        subtext=""
        placeholder="your@email.com"
        ctaLabel="Subscribe"
        note="No spam. One email per month."
        inputType="email"
      />
    </>
  );
}
