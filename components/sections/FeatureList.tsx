import RevealSection from "@/components/ui/RevealSection";

export interface FeatureItem {
  num?: string;
  title: string;
  desc: string;
}

export interface FeatureListProps {
  variant?: "light" | "warm" | "dark";
  style?: "numbered" | "bullet";
  label?: string;
  headline?: React.ReactNode;
  centeredHeadline?: boolean;
  showDividers?: boolean;
  bulletTitleSuffix?: string;
  intro?: string;
  items: FeatureItem[];
  id?: string;
}

export default function FeatureList({
  variant = "light",
  style = "numbered",
  label,
  headline,
  centeredHeadline = false,
  showDividers = true,
  bulletTitleSuffix = ".",
  intro,
  items,
  id,
}: FeatureListProps) {
  const introWithLineBreaks = intro?.replace(/\\n/g, "\n");

  return (
    <RevealSection className={`feature-list ${variant} ${showDividers ? "" : "no-dividers"}`} id={id}>
      <div className="container">
        {label && <div className="section-label">{label}</div>}
        {headline && <h2 className={centeredHeadline ? "section-title centered" : "section-title"}>{headline}</h2>}
        {introWithLineBreaks && <p className="section-intro" style={{ whiteSpace: "pre-line" }}>{introWithLineBreaks}</p>}

        {style === "numbered" ? (
          <div className="feature-rows">
            {items.map((item, i) => (
              <div key={i} className="feature-row">
                <div className="feature-num">{item.num ?? String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="feature-bullets">
            {items.map((item, i) => (
              <li key={i} className="feature-bullet">
                {item.title ? (
                  <>
                    <strong>{item.title}{bulletTitleSuffix}</strong>{" "}
                    <span>{item.desc}</span>
                  </>
                ) : (
                  <span>{item.desc}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </RevealSection>
  );
}
