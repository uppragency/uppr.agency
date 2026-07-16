import { GLOSSARY_TERMS } from "@/lib/glossary-terms";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Leagă automat, o singură dată per termen, prima apariție a fiecărui termen
 * de glosar găsit în conținutul HTML al unui articol, către /glossary#slug.
 * Procesează doar textul din afara tag-urilor HTML, ca să nu strice
 * markup-ul existent (linkuri, atribute etc.).
 */
export function linkifyGlossaryTerms(html: string): string {
  const linkedAlready = new Set<string>();

  // sortez termenii lung -> scurt, ca variantele mai specifice (ex: "unique
  // open rate") să aibă prioritate față de subseturi (ex: "open rate")
  const terms = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);

  // tokenizez în segmente de tag HTML și text, procesez doar textul
  const segments = html.split(/(<[^>]+>)/g);
  let insideAnchor = false;

  const result = segments.map((segment) => {
    if (segment.startsWith("<")) {
      if (/^<a[\s>]/i.test(segment)) insideAnchor = true;
      if (/^<\/a>/i.test(segment)) insideAnchor = false;
      return segment;
    }
    if (insideAnchor || !segment.trim()) return segment;

    let text = segment;
    for (const t of terms) {
      if (linkedAlready.has(t.slug)) continue;
      const pattern = new RegExp(`\\b(${escapeRegExp(t.term)})\\b`, "i");
      if (pattern.test(text)) {
        text = text.replace(
          pattern,
          `<a href="/glossary#${t.slug}" class="glossary-link">$1</a>`
        );
        linkedAlready.add(t.slug);
      }
    }
    return text;
  });

  return result.join("");
}
