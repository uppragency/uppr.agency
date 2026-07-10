export type Lang = "en" | "ro";
export type CheckStatus = "pass" | "warn" | "fail";
export interface Check {
  status: CheckStatus;
  title: string;
  detail: string;
}
export interface AnalysisResult {
  score: number;
  label: string;
  summary: string;
  checks: Check[];
  lang: Lang;
  langBadge: string;
}

const SPAM_WORDS: Record<Lang, string[]> = {
  en: ["free", "buy now", "click here", "act now", "urgent", "guarantee", "guaranteed", "winner", "cash", "credit", "risk-free", "no obligation", "cancel anytime", "limited time", "% off", "subscribe now", "order now", "don't delete", "congratulations", "cheap", "discount code inside"],
  ro: ["gratuit", "gratis", "cumpără acum", "cumperi acum", "click aici", "apasă aici", "acționează acum", "urgent", "garantat", "garantie", "câștigător", "castigator", "bani gheață", "credit", "fără obligații", "anulează oricând", "timp limitat", "% reducere", "abonează-te acum", "comandă acum", "comanda acum", "nu ștergeți", "felicitări", "ieftin", "cod reducere", "ultima șansă", "ultima sansa"],
};

const PERSONAL_REGEX: Record<Lang, RegExp> = {
  en: /\{\{.*?\}\}|\[.*?name.*?\]|\byou\b|\byour\b/i,
  ro: /\{\{.*?\}\}|\[.*?nume.*?\]|\btu\b|\btău\b|\btau\b|\bta\b|\bdumneavoastr[ăa]\b|\bdvs\.?\b/i,
};

const STR = {
  en: {
    placeholder: "Type or paste your subject line here…",
    langBadge: "EN",
    shortTitle: "Short subject line",
    shortDetail: (n: number) => `${n} characters. Under 20 can lack context. Consider adding a concrete detail.`,
    longTitle: "Too long",
    longDetail: (n: number) => `${n} characters will truncate on mobile. Aim for 30-50.`,
    goodLenTitle: "Good length",
    goodLenDetail: (n: number) => `${n} characters. Fits cleanly on both mobile and desktop.`,
    okLenTitle: "Acceptable length",
    okLenDetail: (n: number) => `${n} characters. A bit outside the 30-50 sweet spot but workable.`,
    capsTitle: "ALL CAPS detected",
    capsDetail: (w: string) => `Found: ${w}. Reads as shouting and is a common spam signal.`,
    noCapsTitle: "No shouting caps",
    noCapsDetail: "Capitalization looks normal.",
    punctTitle: "Heavy punctuation",
    punctDetail: (e: number, q: number) => `${e} "!" and ${q} "?" found. More than one of either raises spam risk.`,
    punctOkTitle: "Punctuation looks clean",
    punctOkDetail: "No excessive exclamation or question marks.",
    spamTitle: "Spam-trigger wording",
    spamDetail: (w: string) => `Found: "${w}". These phrases are commonly flagged by inbox filters.`,
    spamOkTitle: "No common spam-trigger words",
    spamOkDetail: "Clear of the most frequently flagged phrases.",
    persTitle: "Personalization signal found",
    persDetail: "Direct address or a merge tag increases relevance.",
    noPersTitle: "No personalization detected",
    noPersDetail: "Not required, but direct address (\"you/your\") or a merge tag often helps.",
    oneEmojiTitle: "One emoji used",
    oneEmojiDetail: "Can help the subject stand out in a crowded inbox.",
    multiEmojiTitle: "Multiple emoji",
    multiEmojiDetail: (n: number) => `${n} emoji found. More than one often reads as automated or spammy.`,
    labelStrong: "Strong", labelGood: "Good", labelNeeds: "Needs work", labelWeak: "Weak",
    summaryStrong: "This subject line is close to best practice. Minor tweaks at most.",
    summaryGood: "Solid overall, with a few things worth fixing below.",
    summaryNeeds: "Several issues are likely hurting deliverability or clarity.",
    summaryWeak: "Multiple red flags. Consider a rewrite before sending.",
  },
  ro: {
    placeholder: "Scrie sau lipește subiectul emailului aici…",
    langBadge: "RO",
    shortTitle: "Subiect prea scurt",
    shortDetail: (n: number) => `${n} caractere. Sub 20 poate lipsi de context. Adaugă un detaliu concret.`,
    longTitle: "Prea lung",
    longDetail: (n: number) => `${n} caractere se vor trunchia pe mobil. Ținta e 30-50.`,
    goodLenTitle: "Lungime bună",
    goodLenDetail: (n: number) => `${n} caractere. Se încadrează bine atât pe mobil cât și pe desktop.`,
    okLenTitle: "Lungime acceptabilă",
    okLenDetail: (n: number) => `${n} caractere. Puțin în afara intervalului ideal 30-50, dar funcțional.`,
    capsTitle: "MAJUSCULE detectate",
    capsDetail: (w: string) => `Găsit: ${w}. Se citește ca și cum ai striga și e un semnal comun de spam.`,
    noCapsTitle: "Fără majuscule stridente",
    noCapsDetail: "Scrierea cu majuscule pare normală.",
    punctTitle: "Punctuație excesivă",
    punctDetail: (e: number, q: number) => `${e} "!" și ${q} "?" găsite. Mai mult de unul din oricare crește riscul de spam.`,
    punctOkTitle: "Punctuație curată",
    punctOkDetail: "Fără semne de exclamare sau întrebare în exces.",
    spamTitle: "Cuvinte tipice de spam",
    spamDetail: (w: string) => `Găsit: „${w}”. Aceste expresii sunt frecvent marcate de filtrele anti-spam.`,
    spamOkTitle: "Fără cuvinte tipice de spam",
    spamOkDetail: "Nu conține cele mai frecvent marcate expresii.",
    persTitle: "Semnal de personalizare găsit",
    persDetail: "Adresarea directă sau un merge tag crește relevanța.",
    noPersTitle: "Fără personalizare detectată",
    noPersDetail: "Nu e obligatoriu, dar adresarea directă (\"tu/tău/dumneavoastră\") sau un merge tag ajută adesea.",
    oneEmojiTitle: "Un emoji folosit",
    oneEmojiDetail: "Poate ajuta subiectul să iasă în evidență într-o inbox aglomerată.",
    multiEmojiTitle: "Emoji multiple",
    multiEmojiDetail: (n: number) => `${n} emoji găsite. Mai mult de unul se citește adesea ca automatizat sau spam.`,
    labelStrong: "Puternic", labelGood: "Bine", labelNeeds: "De îmbunătățit", labelWeak: "Slab",
    summaryStrong: "Acest subiect e aproape de best practice. Cel mult ajustări minore.",
    summaryGood: "Solid per ansamblu, cu câteva lucruri de corectat mai jos.",
    summaryNeeds: "Câteva probleme îți afectează probabil livrabilitatea sau claritatea.",
    summaryWeak: "Multiple semnale de alarmă. Ia în calcul o rescriere înainte de trimitere.",
  },
} as const;

function countEmoji(s: string): number {
  const m = s.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu);
  return m ? m.length : 0;
}

export function detectLanguage(subject: string): Lang {
  if (/[ăâîșțĂÂÎȘȚ]/.test(subject)) return "ro";
  const roWords = /\b(și|pentru|cu|de|la|este|sunt|nou|noua|noul|reducere|comanda|comandă|livrare|gratuit|azi|acum|bine|ai|tu|dvs)\b/i;
  const enWords = /\b(the|and|you|your|for|with|new|order|free|now|off|today|get|shop)\b/i;
  const roHit = roWords.test(subject);
  const enHit = enWords.test(subject);
  if (roHit && !enHit) return "ro";
  return "en";
}

export function analyze(subject: string, forcedLang: "auto" | Lang): AnalysisResult | null {
  const len = subject.length;
  if (len === 0) return null;

  const lang: Lang = forcedLang === "auto" ? detectLanguage(subject) : forcedLang;
  const t = STR[lang];
  const checks: Check[] = [];
  let score = 100;
  const words = subject.trim().split(/\s+/).filter(Boolean);

  if (len < 20) {
    score -= 12;
    checks.push({ status: "warn", title: t.shortTitle, detail: t.shortDetail(len) });
  } else if (len > 60) {
    score -= 15;
    checks.push({ status: "fail", title: t.longTitle, detail: t.longDetail(len) });
  } else if (len >= 30 && len <= 50) {
    checks.push({ status: "pass", title: t.goodLenTitle, detail: t.goodLenDetail(len) });
  } else {
    checks.push({ status: "pass", title: t.okLenTitle, detail: t.okLenDetail(len) });
    score -= 3;
  }

  const capsWords = words.filter((w) => w.length > 2 && w === w.toUpperCase() && /[A-ZĂÂÎȘȚ]/.test(w));
  if (capsWords.length > 0) {
    score -= 18;
    checks.push({ status: "fail", title: t.capsTitle, detail: t.capsDetail(capsWords.join(", ")) });
  } else {
    checks.push({ status: "pass", title: t.noCapsTitle, detail: t.noCapsDetail });
  }

  const exclaim = (subject.match(/!/g) || []).length;
  const quest = (subject.match(/\?/g) || []).length;
  if (exclaim > 1 || quest > 1 || exclaim + quest > 1) {
    score -= 12;
    checks.push({ status: "warn", title: t.punctTitle, detail: t.punctDetail(exclaim, quest) });
  } else {
    checks.push({ status: "pass", title: t.punctOkTitle, detail: t.punctOkDetail });
  }

  const lower = subject.toLowerCase();
  const found = SPAM_WORDS[lang].filter((w) => lower.indexOf(w) !== -1);
  if (found.length > 0) {
    score -= Math.min(30, found.length * 10);
    checks.push({ status: "fail", title: t.spamTitle, detail: t.spamDetail(found.join('", "')) });
  } else {
    checks.push({ status: "pass", title: t.spamOkTitle, detail: t.spamOkDetail });
  }

  const hasPersonal = PERSONAL_REGEX[lang].test(subject);
  if (hasPersonal) {
    checks.push({ status: "pass", title: t.persTitle, detail: t.persDetail });
  } else {
    score -= 4;
    checks.push({ status: "warn", title: t.noPersTitle, detail: t.noPersDetail });
  }

  const emojiCount = countEmoji(subject);
  if (emojiCount === 1) {
    checks.push({ status: "pass", title: t.oneEmojiTitle, detail: t.oneEmojiDetail });
  } else if (emojiCount > 1) {
    score -= 8;
    checks.push({ status: "warn", title: t.multiEmojiTitle, detail: t.multiEmojiDetail(emojiCount) });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label: string, summary: string;
  if (score >= 80) { label = t.labelStrong; summary = t.summaryStrong; }
  else if (score >= 60) { label = t.labelGood; summary = t.summaryGood; }
  else if (score >= 40) { label = t.labelNeeds; summary = t.summaryNeeds; }
  else { label = t.labelWeak; summary = t.summaryWeak; }

  return { score, label, summary, checks, lang, langBadge: t.langBadge };
}

export function placeholderFor(forcedLang: "auto" | Lang): string {
  const l: Lang = forcedLang === "auto" ? "en" : forcedLang;
  return STR[l].placeholder;
}
