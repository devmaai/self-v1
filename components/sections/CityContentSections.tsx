import Link from "next/link";
import type React from "react";
import type { CityPageContent, CityContentSection } from "@/lib/cityPageContent";

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)]*)\)/g;

// Turns [label](/path) markup in hand-written copy into internal links.
function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(<Link key={`${keyPrefix}-${index}`} href={match[2]}>{match[1]}</Link>);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Splits "Title: description" bullets at the first colon.
function splitBullet(text: string) {
  const colon = text.indexOf(": ");
  if (colon === -1) return { title: text, body: "" };
  const body = text.slice(colon + 2);
  return { title: text.slice(0, colon), body: body.charAt(0).toUpperCase() + body.slice(1) };
}

function links(text: string) {
  return [...text.matchAll(LINK_PATTERN)].map((match) => ({ label: match[1], href: match[2] }));
}

function stripTags(text: string) {
  return text.replace(LINK_PATTERN, "$1");
}

function SectionCta({ cta, centered = false }: { cta?: CityContentSection["cta"]; centered?: boolean }) {
  if (!cta) return null;
  return (
    <div className={centered ? "city-section-cta centered" : "city-section-cta"}>
      <Link href={cta.href} className="state-storage-cta">{cta.label}<span aria-hidden="true">→</span></Link>
    </div>
  );
}

function sizeBox(size: string) {
  const [width, length] = (size.match(/\d+/g) ?? []).map(Number);
  return { width: width || 5, length: length || 5 };
}

function Paragraphs({ items, fill, keyPrefix }: { items?: string[]; fill: (text: string) => string; keyPrefix: string }) {
  return <>{items?.map((text, index) => <p key={`${keyPrefix}-${index}`}>{inline(fill(text), `${keyPrefix}-${index}`)}</p>)}</>;
}

function OptionsSection({ section, fill }: { section: CityContentSection; fill: (text: string) => string }) {
  return (
    <section className="city-content-band city-content-options">
      <div className="city-content-inner">
        <h2>{section.heading}</h2>
        <Paragraphs items={section.paragraphs} fill={fill} keyPrefix="options" />
        <div className="city-option-grid">
          {section.bullets?.map((bullet, index) => {
            const { title, body } = splitBullet(fill(bullet));
            const titleLinks = links(title);
            const href = titleLinks[0]?.href;
            return (
              <article className="city-option-card" key={`option-${index}`}>
                {section.images?.[index] && <img className="city-option-image" src={section.images[index]} alt={stripTags(title)} loading="lazy" />}
                <h3>{inline(title, `option-title-${index}`)}</h3>
                <p>{inline(body, `option-body-${index}`)}</p>
                {href && <Link className="city-option-more" href={href}>Learn more <span aria-hidden="true">→</span></Link>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SizesSection({ section, fill }: { section: CityContentSection; fill: (text: string) => string }) {
  const [lead, ...after] = section.paragraphs ?? [];
  return (
    <section className="city-content-band city-content-sizes">
      <div className="city-content-inner">
        <h2>{section.heading}</h2>
        {lead && <p>{inline(fill(lead), "sizes-lead")}</p>}
        <div className="city-size-table" role="table" aria-label="Storage unit sizes">
          {section.bullets?.map((bullet, index) => {
            const { title, body } = splitBullet(bullet);
            const box = sizeBox(title);
            return (
              <div className="city-size-row" role="row" key={`size-${index}`}>
                <span className="city-size-visual" role="cell" aria-hidden="true">
                  <span data-size={`${box.width}x${box.length}`} />
                </span>
                <strong role="cell">{title}</strong>
                <span role="cell">{body}</span>
              </div>
            );
          })}
        </div>
        <Paragraphs items={after} fill={fill} keyPrefix="sizes-after" />
        {section.extra && (
          <div className="city-size-extra">
            <h3>{section.extra.heading}</h3>
            <Paragraphs items={section.extra.paragraphs} fill={fill} keyPrefix="sizes-extra" />
          </div>
        )}
        <SectionCta cta={section.cta} />
      </div>
    </section>
  );
}

function NearbySection({ section, fill }: { section: CityContentSection; fill: (text: string) => string }) {
  const cityLinks = (section.paragraphs ?? []).flatMap(links).filter((link, index, all) => all.findIndex((other) => other.href === link.href) === index);
  return (
    <section className="city-content-band city-content-nearby">
      <div className="city-content-inner city-content-split">
        <div>
          <h2>{section.heading}</h2>
          <Paragraphs items={section.paragraphs} fill={fill} keyPrefix="nearby" />
        </div>
        {cityLinks.length > 0 && (
          <div className="city-nearby-links">
            <span>Compare nearby cities</span>
            {cityLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}<span aria-hidden="true">→</span></Link>)}
          </div>
        )}
      </div>
      <SectionCta cta={section.cta} centered />
    </section>
  );
}

function ChecklistSection({ section, fill }: { section: CityContentSection; fill: (text: string) => string }) {
  return (
    <section className="city-content-band city-content-checklist">
      <div className="city-content-inner">
        <h2>{section.heading}</h2>
        <Paragraphs items={section.paragraphs} fill={fill} keyPrefix="check" />
        <ul className="city-checklist">
          {section.bullets?.map((bullet, index) => {
            const { title, body } = splitBullet(fill(bullet));
            return (
              <li key={`check-${index}`}>
                <span className="city-check-icon" aria-hidden="true">✓</span>
                <div><strong>{title}</strong>{body && <p>{inline(body, `check-${index}`)}</p>}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Hand-written city content shown as a mix of banner, cards, table and checklist. */
export default function CityContentSections({ content, city, fill }: { content: CityPageContent; city: string; fill: (text: string) => string }) {
  const cards = content.sections.filter((section) => section.layout === "card");
  const rest = content.sections.filter((section) => section.layout !== "card");

  return (
    <div className="city-content">
      {content.intro && (
        <section className="city-content-intro">
          <div className="city-content-inner city-content-split">
            <h2>{content.intro.heading}</h2>
            <div><Paragraphs items={content.intro.paragraphs} fill={fill} keyPrefix="intro" /></div>
          </div>
        </section>
      )}

      {cards.length > 0 && (
        <section className="city-content-band city-content-living">
          <div className={content.cardsImage ? "city-content-inner city-living-split" : "city-content-inner"}>
            <div>
              <h2>{content.cardsHeading ?? `Living in ${city}`}</h2>
              <div className="city-living-list">
                {cards.map((section) => (
                  <div className="city-living-item" key={section.heading}>
                    <h3>{section.heading}</h3>
                    <Paragraphs items={section.paragraphs} fill={fill} keyPrefix={section.heading} />
                  </div>
                ))}
              </div>
            </div>
            {content.cardsImage && <img className="city-living-image" src={content.cardsImage.src} alt={content.cardsImage.alt} loading="lazy" />}
          </div>
        </section>
      )}

      {rest.map((section) => {
        if (section.layout === "options") return <OptionsSection key={section.heading} section={section} fill={fill} />;
        if (section.layout === "sizes") return <SizesSection key={section.heading} section={section} fill={fill} />;
        if (section.layout === "nearby") return <NearbySection key={section.heading} section={section} fill={fill} />;
        if (section.layout === "checklist") return <ChecklistSection key={section.heading} section={section} fill={fill} />;
        return (
          <section className="city-content-band" key={section.heading}>
            <div className="city-content-inner">
              <h2>{section.heading}</h2>
              <Paragraphs items={section.paragraphs} fill={fill} keyPrefix={section.heading} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
