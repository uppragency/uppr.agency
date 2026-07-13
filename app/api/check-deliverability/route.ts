import { NextResponse } from "next/server";
import { resolveTxt } from "node:dns/promises";

const DKIM_SELECTORS_TO_TRY = ["default", "google", "selector1", "selector2", "k1", "mail", "s1"];

function isValidDomain(domain: string): boolean {
  return /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain);
}

async function lookupTxt(hostname: string): Promise<string[]> {
  try {
    const records = await resolveTxt(hostname);
    return records.map((chunks) => chunks.join(""));
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const { domain: rawDomain } = await request.json();

  const domain = String(rawDomain ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");

  if (!domain || !isValidDomain(domain)) {
    return NextResponse.json({ error: "Introdu un domeniu valid (ex: exemplu.ro)" }, { status: 400 });
  }

  const [rootTxt, dmarcTxt] = await Promise.all([lookupTxt(domain), lookupTxt(`_dmarc.${domain}`)]);

  const spfRecord = rootTxt.find((r) => r.toLowerCase().startsWith("v=spf1"));
  const dmarcRecord = dmarcTxt.find((r) => r.toLowerCase().startsWith("v=dmarc1"));

  let dmarcPolicy: string | null = null;
  if (dmarcRecord) {
    const match = dmarcRecord.match(/p=([a-z]+)/i);
    dmarcPolicy = match ? match[1].toLowerCase() : null;
  }

  // DKIM nu poate fi verificat fără să știm selectorul exact folosit —
  // încercăm cele mai comune selectoare publice
  const dkimResults = await Promise.all(
    DKIM_SELECTORS_TO_TRY.map(async (selector) => {
      const found = await lookupTxt(`${selector}._domainkey.${domain}`);
      return found.length > 0 ? selector : null;
    })
  );
  const dkimFoundSelectors = dkimResults.filter((s): s is string => s !== null);

  return NextResponse.json({
    domain,
    spf: { found: !!spfRecord, record: spfRecord ?? null },
    dmarc: { found: !!dmarcRecord, record: dmarcRecord ?? null, policy: dmarcPolicy },
    dkim: { found: dkimFoundSelectors.length > 0, selectorsChecked: DKIM_SELECTORS_TO_TRY, selectorsFound: dkimFoundSelectors },
  });
}
