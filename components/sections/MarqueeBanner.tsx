export interface MarqueeProps {
  items?: string[];
}

const defaultItems = [
  "Local SEO",
  "Google Business Profile",
  "Location landing pages",
  "Review strategy",
  "Technical audits",
  "Content that ranks",
];

export default function MarqueeBanner({ items = defaultItems }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
