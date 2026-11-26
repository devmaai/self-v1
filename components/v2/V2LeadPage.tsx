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
  /** "light" is the agency-side layout: navy intro band, light body, form card overlapping the band. */
  variant?: "dark" | "light";
  eyebrow?: string;
  formTitle?: string;
  formSub?: string;
  /** Photo shown on the right of the intro band. */
  image?: string;
  /** Short highlights shown as chips under the intro text. */
  highlights?: string[];
  /** Marker style for lists: default is a check, "arrow" uses arrow pointers. */
  markers?: "check" | "arrow";
};

/** Two-column landing form page: context on the left, form on the right. */
export default function V2LeadPage({ title, lead, sections, reassurance, form, variant = "dark", eyebrow, formTitle, formSub, image, highlights, markers = "check" }: Props) {
  if (variant === "light") {
    return (
      <div className={`lead-light${markers === "arrow" ? " lead-light-arrows" : ""}`}>
        <header className="lead-light-hero" style={image ? ({ ["--lead-img" as string]: `url("${image}")` } as React.CSSProperties) : undefined}>
          <div className="inner">
            {eyebrow && <p className="lead-light-eyebrow">{eyebrow}</p>}
            <h1 className="lead-light-title">{title}</h1>
            <p className="lead-light-lead">{lead}</p>
            {highlights && (
              <ul className="lead-light-chips">
                {highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
          </div>
        </header>

        <div className="inner lead-light-grid">
          <div className="lead-light-copy">
            {sections.map((s) => (
              <section className="lead-light-section" key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body && <div className="lead-light-body">{s.body}</div>}
                {s.items && (
                  <ul className="lead-light-list">
                    {s.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                )}
                {s.steps && (
                  <ol className="lead-light-steps">
                    {s.steps.map((i) => <li key={i}>{i}</li>)}
                  </ol>
                )}
              </section>
            ))}
          </div>

          <aside className="lead-light-aside">
            <div className="lead-card">
              {(formTitle || formSub) && (
                <div className="lead-card-head">
                  {formTitle && <h2>{formTitle}</h2>}
                  {formSub && <p>{formSub}</p>}
                </div>
              )}
              {form}
            </div>
            {reassurance && (
              <ul className="lead-light-assure">
                {reassurance.map((r) => <li key={r}>{r}</li>)}
              </ul>
            )}
          </aside>
        </div>
      </div>
    );
  }

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
