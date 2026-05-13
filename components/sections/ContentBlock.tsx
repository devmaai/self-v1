import RevealSection from "@/components/ui/RevealSection";

export interface ContentBlockProps {
  variant?: "light" | "warm" | "dark";
  label?: string;
  headline: React.ReactNode;
  body: string | React.ReactNode;
  bullets?: string[];
  id?: string;
  showDividers?: boolean;
}

export default function ContentBlock({
  variant = "dark",
  label,
  headline,
  body,
  bullets,
  id,
  showDividers = true,
}: ContentBlockProps) {
  return (
    <RevealSection className={`content-block ${variant} ${showDividers ? "" : "no-dividers"}`} id={id}>
      <div className="container">
        {label && <div className="section-label">{label}</div>}
        <h2 className="section-title">{headline}</h2>
        <div className="content-block-body">
          {typeof body === "string" ? <p>{body}</p> : body}
        </div>
        {bullets && bullets.length > 0 && (
          <ul className="content-block-bullets">
            {bullets.map((b, i) => (
              <li key={i} className="content-block-bullet">{b}</li>
            ))}
          </ul>
        )}
      </div>
    </RevealSection>
  );
}
