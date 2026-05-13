import RevealSection from "@/components/ui/RevealSection";

export interface ProblemItem {
  num: string;
  title: string;
  desc: string;
}

export interface ProblemProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  items?: ProblemItem[];
}

const defaultItems: ProblemItem[] = [
  {
    num: "01 / Invisible",
    title: "You rank below national chains for your own city",
    desc: "Large operators dominate the map pack through sheer volume of citations and reviews. Your facility is often buried on page two.",
  },
  {
    num: "02 / Overpriced",
    title: "Aggregator platforms take a cut of every move-in",
    desc: "Listing platforms charge flat fees or percentages on leads you could have earned organically with a working site.",
  },
  {
    num: "03 / Generic",
    title: "Your website reads like every other storage site",
    desc: "Stock templates with no local copy, weak keyword targeting, and missing schema give search engines no reason to rank you first.",
  },
  {
    num: "04 / Untracked",
    title: "You do not know which keywords bring move-ins",
    desc: "Without proper conversion tracking you cannot tell if a rental came from a Google search, a referral, or a drive-by.",
  },
  {
    num: "05 / Outdated",
    title: "Your Google Business Profile has not been touched in months",
    desc: "Incomplete hours, missing photos, no posts, and unanswered reviews all signal to Google that your listing is stale.",
  },
  {
    num: "06 / Paying twice",
    title: "You spend on Google Ads because organic does not deliver",
    desc: "Paid ads become a necessary expense when your site cannot rank on its own. We fix the root cause.",
  },
];

export default function Problem({
  label = "The challenge",
  headline = (
    <>
      The national chains have bigger budgets. You have the <em>local advantage</em>.
    </>
  ),
  intro = "Most independent operators we meet are losing ground on Google without knowing why. Here is where the leaks usually show up.",
  items = defaultItems,
}: ProblemProps) {
  return (
    <RevealSection className="problem">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="problem-grid">
          {items.map((item) => (
            <div key={item.num} className="problem-card">
              <div className="problem-num">{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
