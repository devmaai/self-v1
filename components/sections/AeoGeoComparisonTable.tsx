export interface ComparisonRow {
  aspect: string;
  traditionalSeo: string;
  aeo: string;
  geo: string;
}

export interface AeoGeoComparisonTableProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  rows?: ComparisonRow[];
}

const defaultRows: ComparisonRow[] = [
  {
    aspect: "Goal",
    traditionalSeo: "Rank high in Google search results",
    aeo: "Become the direct answer in featured snippets, voice search, and AI overviews",
    geo: "Get cited and recommended inside AI-generated responses (ChatGPT, Gemini, etc.)",
  },
  {
    aspect: "Where You Appear",
    traditionalSeo: "Blue links + Map Pack",
    aeo: "People Also Ask, AI summaries, voice answers",
    geo: "AI chat responses and synthesized recommendations",
  },
  {
    aspect: "What Matters Most",
    traditionalSeo: "Keywords, backlinks, technical SEO",
    aeo: "Clear, structured, question-focused content",
    geo: "Brand authority, consistency, entity strength",
  },
  {
    aspect: "Self-Storage Impact",
    traditionalSeo: "Map pack visibility",
    aeo: "Best storage units for RV storage near me",
    geo: "AI recommending your facility as the top option",
  },
];

export default function AeoGeoComparisonTable({
  headline = "Traditional SEO vs AEO vs GEO",
  intro = "The search stack is shifting. This table shows how the three layers differ and why your storage facility needs content that serves all of them.",
  rows = defaultRows,
}: AeoGeoComparisonTableProps) {
  return (
    <section className="comparison-section">
      <div className="container">
        <div className="comparison-card">
          {/* <div className="section-label">{label}</div>
          // <h2 className="section-title comparison-title">{headline}</h2> */}
          {/* <p className="section-intro comparison-intro">{intro}</p> */}

          {/* <div className="comparison-table-wrap"> */}
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Traditional SEO</th>
                  <th>AEO (Answer Engine Optimization)</th>
                  <th>GEO (Generative Engine Optimization)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row">{row.aspect}</th>
                    <td>{row.traditionalSeo}</td>
                    <td>{row.aeo}</td>
                    <td>{row.geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}