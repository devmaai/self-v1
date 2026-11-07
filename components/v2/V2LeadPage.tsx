import type { ReactNode } from "react";

export type LeadSection = {
  heading: string;
  items?: string[];
  steps?: string[];
  body?: ReactNode;
};

type Props = {
  title: ReactNode;
  lead: string;
  sections: LeadSection[];
  reassurance?: string[];
  form: ReactNode;
};

/** Two-column landing form page: context on the left, form on the right. */
export default function V2LeadPage({ title, lead, sections, reassurance, form }: Props) {
  return (
    <section className="final-cta lead-page">
      <div className="inner lead-grid">
        <div className="lead-copy">
          <h1 className="final-h2">{title}</h1>
          <p className="final-lead">{lead}</p>
          {sections.map((s) => (
            <div className="lead-section" key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body && <div className="lead-body">{s.body}</div>}
              {s.items && (
                <ul className="lead-list">
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
              {s.steps && (
                <ol className="lead-steps">
                  {s.steps.map((i) => <li key={i}>{i}</li>)}
                </ol>
              )}
            </div>
          ))}
        </div>
        <div className="lead-form">
          {form}
          {reassurance && (
            <div className="final-reassurance">
              {reassurance.map((r) => <div className="fr-item" key={r}>{r}</div>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
