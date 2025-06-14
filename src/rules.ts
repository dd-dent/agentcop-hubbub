export interface Heading {
  text: string;
  level: number;
  line: number;
}

export function parseHeadings(lines: string[]): Heading[] {
  const headings: Heading[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s*(.*)$/);
    if (m) {
      headings.push({ level: m[1].length, text: m[2], line: i });
    }
  }
  return headings;
}

export function hasDuplicateHeading(headings: Heading[]): string | null {
  const seen = new Set<string>();
  for (const h of headings) {
    if (seen.has(h.text)) return h.text;
    seen.add(h.text);
  }
  return null;
}

export function requiredOrderIndices(
  headings: Heading[],
  required: string[],
): number[] | string {
  const indices: number[] = [];
  for (const r of required) {
    const idx = headings.findIndex((h) => h.text.includes(r));
    if (idx === -1) return r;
    indices.push(idx);
  }
  return indices;
}

export function sectionContent(
  lines: string[],
  headings: Heading[],
  heading: Heading,
): string[] {
  const start = heading.line + 1;
  const next =
    headings.find((h) => h.line > heading.line)?.line ?? lines.length;
  return lines.slice(start, next);
}
