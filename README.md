# UPPR Agency — Panouri (schelet Next.js)

## Ce conține

- Auth cu Supabase Auth (email + parolă), 3 roluri: `admin`, `client`
- `/admin/blog` — CRUD articole cu câmpuri SEO (meta title, meta description, OG image, slug)
- `/admin/clients` — panou admin: rapoarte lunare per client (drbogdanchiper.ro, anastate.ro)
- `/dashboard` — panou client: read-only, vede doar rapoartele proprii (filtrat automat prin RLS)
- Middleware (`proxy.ts`) care protejează rutele pe baza rolului
- Fără design încă — stilizare minimă Tailwind, urmează faza de design cu paleta UPPR

Baza de date (tabele, RLS, seed clienți) e deja creată live în Supabase, proiect **UPPR AGENCY**.

## Setup local

```bash
npm install
cp .env.local.example .env.local
```

Completează `.env.local` cu:

```
NEXT_PUBLIC_SUPABASE_URL=https://xzdpefkyqcecazthulor.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<din Supabase Dashboard → Settings → API>
SUPABASE_SERVICE_ROLE_KEY=<din Supabase Dashboard → Settings → API — NU o expune public>
```

Rulează local:

```bash
npm run dev
```

Deschide `http://localhost:3000` → te redirecționează la `/login`.

## Deploy pe Vercel

1. Push acest proiect pe un repo GitHub nou (privat)
2. În Vercel: **Add New Project** → selectezi repo-ul
3. La configurare, adaugi aceleași 3 variabile de mediu ca mai sus (Settings → Environment Variables)
4. Deploy — Vercel detectează automat Next.js, zero config suplimentar

## Ce urmează

- Design: paleta UPPR (`#050309`, violet `#7C3AED`/`#A855F7`/`#C084FC`), fonturi Space Grotesk / Instrument Sans / Space Mono
- Portare homepage + pagini existente (blog, referral-program, subject-line-grader) ca pagini Next.js
- Migrare cele 11 articole HTML existente în tabelul `articles`
