export interface FaqItem {
  question: string;
  answer: string;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pulls Q&A pairs from a post's "Frequently asked questions" section.
 * Supports three formats used in the posts:
 *   ### Question?  + answer paragraph(s)
 *   **Question?**  + answer paragraph(s)
 *   Question? Answer in the same paragraph.
 */
export function extractFaqs(body: string): FaqItem[] {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((l) => /^#{1,3}\s*\**\s*(frequently asked questions|faqs?|people also ask)/i.test(l));
  if (start === -1) return [];

  const startLevel = (lines[start].match(/^#+/)?.[0].length) ?? 2;
  const section: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const h = lines[i].match(/^(#+)\s/);
    if (h && h[1].length <= startLevel) break;
    section.push(lines[i]);
  }

  const paragraphs: { text: string; heading: boolean }[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) paragraphs.push({ text: buf.join(" ").trim(), heading: false });
    buf = [];
  };
  for (const line of section) {
    if (/^#{3,6}\s/.test(line)) {
      flush();
      paragraphs.push({ text: line.replace(/^#+\s*/, ""), heading: true });
    } else if (!line.trim()) {
      flush();
    } else {
      buf.push(line.trim());
    }
  }
  flush();

  const structured = paragraphs.some((p) => p.heading || /^\*\*.+?\?\*\*/.test(p.text));
  const faqs: FaqItem[] = [];
  let current: FaqItem | null = null;
  for (const p of paragraphs) {
    const bold = p.text.match(/^\*\*(.+?\?)\*\*\s*(.*)$/);
    const inline = !structured && !p.heading && !bold ? p.text.match(/^([^?]{5,200}\?)\s+(.+)$/) : null;
    if (p.heading || bold) {
      if (current?.answer) faqs.push(current);
      current = { question: stripMarkdown(p.heading ? p.text : bold![1]), answer: bold?.[2] ? stripMarkdown(bold[2]) : "" };
    } else if (inline && !/^[-*|>]/.test(p.text) && (!current || current.answer)) {
      if (current?.answer) faqs.push(current);
      current = { question: stripMarkdown(inline[1]), answer: stripMarkdown(inline[2]) };
    } else if (current) {
      current.answer = [current.answer, stripMarkdown(p.text)].filter(Boolean).join(" ");
    }
  }
  if (current?.answer) faqs.push(current);
  return faqs.filter((f) => f.question && f.answer);
}
