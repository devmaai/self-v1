import { readFile } from "node:fs/promises";
import path from "node:path";

export type CitySeoSection = { heading: string; body: string };
export type CitySeoFaq = { question: string; answer: string };

export type CitySeoContent = {
  slug: string;
  city: string;
  state: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: CitySeoSection[];
  faqHeading: string;
  faqs: CitySeoFaq[];
};

const CSV_PATH = path.join(process.cwd(), "data", "city-seo-content.csv");

function parseCsv(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const headers = rows[0] ?? [];
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function slugFromPageUrl(pageUrl: string): string | null {
  const match = pageUrl.match(/\/storage-search\/([^/?#]+)\/?$/);
  return match ? match[1] : null;
}

function rowToContent(row: Record<string, string>): CitySeoContent | null {
  const slug = slugFromPageUrl(row["Page URL"] ?? "");
  if (!slug) return null;

  const sections: CitySeoSection[] = [];
  for (let index = 1; index <= 5; index += 1) {
    const heading = row[`H2 ${index}`]?.trim();
    const body = row[`Body ${index}`]?.trim();
    if (heading && body) sections.push({ heading, body });
  }

  const faqs: CitySeoFaq[] = [];
  for (let index = 1; index <= 6; index += 1) {
    const question = row[`FAQ ${index} Q`]?.trim();
    const answer = row[`FAQ ${index} A`]?.trim();
    if (question && answer) faqs.push({ question, answer });
  }

  return {
    slug,
    city: row["City"] ?? "",
    state: row["State"] ?? "",
    h1: row["H1"]?.trim() ?? "",
    metaTitle: row["Meta title"]?.trim() ?? "",
    metaDescription: row["Meta description"]?.trim() ?? "",
    intro: row["Intro paragraph"]?.trim() ?? "",
    sections,
    faqHeading: row["FAQ H2"]?.trim() ?? "Frequently asked questions",
    faqs,
  };
}

let contentCache: Map<string, CitySeoContent> | null = null;
let contentRequest: Promise<Map<string, CitySeoContent>> | null = null;

async function loadContentMap(): Promise<Map<string, CitySeoContent>> {
  const csv = await readFile(CSV_PATH, "utf8");
  const map = new Map<string, CitySeoContent>();
  for (const row of parseCsv(csv)) {
    const content = rowToContent(row);
    if (content) map.set(content.slug, content);
  }
  return map;
}

async function getContentMap(): Promise<Map<string, CitySeoContent>> {
  if (contentCache) return contentCache;
  if (!contentRequest) {
    contentRequest = loadContentMap()
      .then((map) => {
        contentCache = map;
        return map;
      })
      .catch(() => new Map<string, CitySeoContent>());
  }
  return contentRequest;
}

/**
 * Some slugs are shared by two different cities in different states (e.g.
 * "bay-city" is both Bay City, TX and Bay City, MI), so a slug match alone
 * isn't enough — the sheet row's state must match the page's state or the
 * wrong city's content would render.
 */
export async function getCitySeoContent(citySlug: string, state: string): Promise<CitySeoContent | null> {
  const map = await getContentMap();
  const content = map.get(citySlug);
  if (!content) return null;
  return content.state === state ? content : null;
}

export function fillPricePlaceholder(text: string, fromPrice: string): string {
  return text.replace(/\{\{from_price\}\}/g, fromPrice);
}
