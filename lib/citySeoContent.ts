import { readFile } from "node:fs/promises";
import path from "node:path";
import { CITY_STATES } from "@/lib/cityStates";

export type CitySeoBlock = { type: "p"; text: string } | { type: "ul" | "ol"; items: string[] };
export type CitySeoSection = { heading: string; blocks: CitySeoBlock[] };
export type CitySeoFaq = { question: string; answerBlocks: CitySeoBlock[] };

export type CitySeoContent = {
  slug: string;
  city: string;
  state: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: CitySeoBlock[];
  sections: CitySeoSection[];
  faqHeading: string;
  faqs: CitySeoFaq[];
};

const PRIMARY_CSV_PATH = path.join(process.cwd(), "data", "city-seo-content.csv");
const SECONDARY_CSV_PATH = path.join(process.cwd(), "data", "city-seo-content-2.csv");

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

/**
 * Splits free text into paragraph/list blocks on blank lines, then detects
 * whether a block is a bullet ("- ") or numbered ("1. ") list so it renders
 * as a real <ul>/<ol> instead of one run-on paragraph with the markers
 * flattened into plain text.
 */
function parseBlocks(text: string | undefined): CitySeoBlock[] {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block): CitySeoBlock => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length > 1 && lines.every((line) => /^-\s+/.test(line))) {
        return { type: "ul", items: lines.map((line) => line.replace(/^-\s+/, "")) };
      }
      if (lines.length > 1 && lines.every((line) => /^\d+\.\s+/.test(line))) {
        return { type: "ol", items: lines.map((line) => line.replace(/^\d+\.\s+/, "")) };
      }
      return { type: "p", text: block.replace(/\n/g, " ") };
    });
}

function slugFromPageUrl(pageUrl: string): string | null {
  const match = pageUrl.match(/\/storage-search\/([^/?#]+)\/?$/);
  return match ? match[1] : null;
}

function slugifyCityName(name: string): string {
  return name.toLowerCase().replace(/'/g, "").replace(/\./g, "").replace(/ /g, "-");
}

function primaryRowToContent(row: Record<string, string>): CitySeoContent | null {
  const slug = slugFromPageUrl(row["Page URL"] ?? "");
  if (!slug) return null;

  const sections: CitySeoSection[] = [];
  for (let index = 1; index <= 5; index += 1) {
    const heading = row[`H2 ${index}`]?.trim();
    const body = row[`Body ${index}`]?.trim();
    if (heading && body) sections.push({ heading, blocks: parseBlocks(body) });
  }

  const faqs: CitySeoFaq[] = [];
  for (let index = 1; index <= 6; index += 1) {
    const question = row[`FAQ ${index} Q`]?.trim();
    const answer = row[`FAQ ${index} A`]?.trim();
    if (question && answer) faqs.push({ question, answerBlocks: parseBlocks(answer) });
  }

  return {
    slug,
    city: row["City"] ?? "",
    state: row["State"] ?? "",
    h1: row["H1"]?.trim() ?? "",
    metaTitle: row["Meta title"]?.trim() ?? "",
    metaDescription: row["Meta description"]?.trim() ?? "",
    intro: parseBlocks(row["Intro paragraph"]?.trim()),
    sections,
    faqHeading: row["FAQ H2"]?.trim() ?? "Frequently asked questions",
    faqs,
  };
}

/**
 * The secondary sheet doesn't carry a ready-made site slug (its "Suggested
 * URL" column uses a different site's path scheme), so the row is matched to
 * a real city slug by name. A handful of city names collide across states
 * (e.g. "Shawnee" is both KS and OK) and the site disambiguates those with a
 * "-{state}" suffix, so that variant is tried as a fallback.
 */
function secondaryRowSlug(cityName: string, state: string, isKnownCity: (slug: string, state: string) => boolean): string | null {
  const base = slugifyCityName(cityName);
  if (isKnownCity(base, state)) return base;
  const disambiguated = `${base}-${state.toLowerCase()}`;
  if (isKnownCity(disambiguated, state)) return disambiguated;
  return null;
}

function parseFaqField(field: string | undefined): CitySeoFaq[] {
  if (!field) return [];
  return field
    .split("||")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [question, ...answerParts] = entry.split("::");
      return {
        question: question?.trim() ?? "",
        answerBlocks: parseBlocks(answerParts.join("::").trim()),
      };
    })
    .filter((faq) => faq.question && faq.answerBlocks.length > 0);
}

function secondaryRowToContent(row: Record<string, string>, slug: string): CitySeoContent {
  const sections: CitySeoSection[] = [];
  for (let index = 1; index <= 5; index += 1) {
    const heading = row[`H2 ${index}`]?.trim();
    const body = row[`Body ${index}`]?.trim();
    if (heading && body) sections.push({ heading, blocks: parseBlocks(body) });
  }

  return {
    slug,
    city: row["City"] ?? "",
    state: row["State"] ?? "",
    h1: row["H1"]?.trim() ?? "",
    metaTitle: row["Meta Title"]?.trim() ?? "",
    metaDescription: row["Meta Description"]?.trim() ?? "",
    intro: parseBlocks(row["Intro"]?.trim()),
    sections,
    faqHeading: row["H2 FAQ"]?.trim() ?? "Frequently asked questions",
    faqs: parseFaqField(row["FAQs (Q :: A || next)"]),
  };
}

let contentCache: Map<string, CitySeoContent> | null = null;
let contentRequest: Promise<Map<string, CitySeoContent>> | null = null;

async function loadContentMap(): Promise<Map<string, CitySeoContent>> {
  const map = new Map<string, CitySeoContent>();

  try {
    const primaryCsv = await readFile(PRIMARY_CSV_PATH, "utf8");
    for (const row of parseCsv(primaryCsv)) {
      const content = primaryRowToContent(row);
      if (content) map.set(`${content.slug}|${content.state}`, content);
    }
  } catch {
    // Sheet not present; secondary sheet below can still populate the map.
  }

  try {
    const isKnownCity = (slug: string, state: string) => CITY_STATES[slug] === state;

    const secondaryCsv = await readFile(SECONDARY_CSV_PATH, "utf8");
    for (const row of parseCsv(secondaryCsv)) {
      const city = row["City"]?.trim();
      const state = row["State"]?.trim();
      if (!city || !state) continue;

      const slug = secondaryRowSlug(city, state, isKnownCity);
      if (!slug) continue;

      const key = `${slug}|${state}`;
      if (map.has(key)) continue; // Primary sheet's curated content wins on overlap.
      map.set(key, secondaryRowToContent(row, slug));
    }
  } catch {
    // Sheet not present; primary sheet above may still have populated the map.
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
  return map.get(`${citySlug}|${state}`) ?? null;
}

export function fillPricePlaceholder(text: string, fromPrice: string): string {
  return text.replace(/\{\{from_price\}\}/g, fromPrice);
}
