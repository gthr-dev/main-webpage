# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

GTHR is a café and social space being established in Singapore. This repo (`main-webpage`) holds the
**public landing site** only — a small brochure site, not an application. Business logic (ordering,
inventory, loyalty, event booking) belongs in a separate private backend repo that does not exist yet.

Sibling context lives one level up in `../Misc Resources/` (not a repo, not deployed):

- `Concept Deck - gthr.pdf` — brand and aesthetic reference. Source of truth for look and feel.
- `Menu Planning.xlsx` — working menu. Still being voted on; treat as draft, not final copy.
- `infra_plan_v1.mmd` — Mermaid diagram of the intended wider architecture.

Neither the PDF nor the XLSX can be read with the built-in tools on this machine (no poppler, no
openpyxl). Both are extractable with Python stdlib: the XLSX is a zip of XML, and the PDF's text is
in Flate-compressed streams with `ToUnicode` CMaps for its subset CID fonts. Extract to the
scratchpad, never into this repo.

## Status

Pre-scaffold. The repo currently contains only `README.md` and this file — one commit, `main`,
remote `git@github.com:bj-gthr/main-webpage.git`. Everything under "Commands" and "Structure" below
describes the agreed target, not what exists today. Update this file as it lands.

## Stack and the decisions behind it

**React + Vite**, plain CSS, TypeScript optional. Chosen by the owner.

**Multi-page, not a SPA router.** Four real HTML entry points via Vite's `rollupOptions.input`, each
mounting React and sharing `Nav`/`Footer` components. Four static HTML files give real URLs and real
SEO for a brochure site, need no router dependency, and need no `404.html` rewrite shim to make deep
links work on Pages. Revisit only if the site grows genuinely app-like.

Set `base: './'` in `vite.config.js`. With a custom domain at the apex `base: '/'` would also work,
but relative paths keep `<user>.github.io/main-webpage/` previews working without a rebuild.

Keep the dependency tree near-empty: React, ReactDOM, Vite. Do not add a UI kit, a CSS framework, a
state library, or an animation library. This is four pages of largely static content.

## Commands

```bash
npm install
npm run dev       # Vite dev server, localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve dist/ locally; check this before any deploy
```

No test suite yet, and a brochure site does not need unit tests. If interactive logic appears
(form validation, menu filtering), add Vitest and colocate `*.test.ts` next to the unit under test;
run a single file with `npx vitest run src/path/File.test.ts`.

## Deployment — GitHub Pages, Vodien DNS

**Decided.** The domain stays registered at Vodien; Vodien holds DNS and points it at GitHub Pages,
which builds and serves the site from this repo. No registrar transfer. Free hosting, global CDN,
automatic HTTPS and certificate renewal, nothing to patch. Content is versioned in git, so a bad
edit is one `git revert`, and deploys run automatically on merge to `main` via GitHub Actions
(build with `npm run build`, publish `dist/`).

Repo needs a `CNAME` file containing the apex domain once that domain is confirmed, and Pages must
have "Enforce HTTPS" on.

**DNS records — do not disturb existing mail.** There is already email running on this domain. When
repointing DNS, change only the `A`/`AAAA` records at the apex (to GitHub's four Pages addresses)
and the `www` `CNAME`. **Leave `MX`, `TXT`/SPF, DKIM and DMARC records exactly as they are** —
deleting or replacing the record set wholesale is the standard way this migration breaks company
email, and it breaks it silently. Verify mail still delivers after the cutover, not just the site.

**Escape hatch, if it is ever needed.** Cloudflare Pages, Vercel and Netlify all serve this same
static build and additionally run backend functions on the same domain. Migration is a DNS change
at Vodien against the same repo — roughly half a day. There is no lock-in here, so do not
pre-emptively architect around Pages' limits.

Pages serves files and cannot run code, so the site holds **no secrets and no server-side logic**.
Anything committed to this repo is public. If genuine API endpoints are needed later, they go on a
separate subdomain (`api.<domain>`), never into the site bundle.

## Structure

```
index.html          landing        \
menu.html           menu display    |  Vite entry points
contact.html        contact us      |
events.html         event enquiry  /
src/
  main/             one mount file per page
  components/       Nav, Footer, Section — shared across all four
  data/menu.ts      menu content as data, never hardcoded into JSX
  styles/           tokens.css (design tokens), base.css, per-page css
public/             images, favicon, robots.txt
```

The menu page renders from `src/data/menu.ts`. The menu is still being decided, so keep content
separate from markup — menu edits should never require touching a component.

## Design direction

Taken from the concept deck. Positioning: *"a contemporary third space designed for gathering,
working and unwinding — evolving seamlessly from a daytime café into a late-night chill spot."*
Deck keywords: contemporary, minimalist, industrial; soft light, low seating, open space; concrete
surfaces, metal details, functional design; clean entrance, natural lighting.

The register is **greyish industrial, slightly brutalist** — cool concrete and brushed steel, not a
warm rustic café. Build it from honest structure rather than decoration: hard 90° corners
(`border-radius: 0` as the global default), flat fills, visible hairline rules that read as an
exposed grid, full-bleed photography meeting edges squarely, buttons as plain outlined rectangles.
Depth comes from tonal steps between greys, never from drop shadows or gradients.

"Slightly" is load-bearing. This is *not* the brutalist-web idiom — no clashing neon, no unstyled
system-blue links, no deliberately broken layout, no marquees. The layout stays calm, generous and
legible; the rawness is in the materials and the edges, not in the arrangement. Still no carousels,
no parallax, no scroll hijacking, no animated counters. Motion at most is a short opacity/transform
fade on scroll-in, and it must respect `prefers-reduced-motion`.

**Type.** The deck is set in **EB Garamond** — use it for the wordmark and headings (self-host the
woff2 in `public/`; do not hotlink Google Fonts, it is a third-party request on every page load). A
serif against raw concrete is the tension the deck is going for; keep it. Counterweight it with a
utilitarian sans for body copy at ~1.6 line-height, and set small labels, nav items, section markers
and captions in uppercase with wide letter-spacing (~0.12em) — that industrial signage register does
most of the brutalist work. Push the scale contrast: large headings against small, plain body text.
The wordmark is lowercase `gthr`, often followed by an em dash rule.

**Palette.** Cool greys pulled from the deck's interior photography — polished concrete floors,
stainless ductwork, exposed slab. Define these as tokens in `styles/tokens.css` and use nothing
outside them:

| Token | Value | Use |
| --- | --- | --- |
| `--concrete-light` | `#E6E7E7` | page background |
| `--surface` | `#F1F2F2` | raised panels, form fields |
| `--concrete` | `#CFD1D1` | hairline rules, dividers, muted fills |
| `--steel` | `#767879` | metal accents, icons, large display text only |
| `--muted` | `#5A5C5D` | secondary text, captions |
| `--ink` | `#17191A` | headings, primary text |

No accent colour at all — the photography supplies the only colour on the page. Verified against
`--concrete-light`: `--ink` is 14.2:1 and `--muted` is 5.4:1, both clearing WCAG AA for body text.
`--steel` is only 3.6:1, so it is valid for large display text, icons and borders but **must never
be used for body copy**. Do not lighten `--muted`.

## Pages

- **Landing** — hero image, the positioning line, hours, location, a line each toward menu and events.
- **Menu** — grouped display only, no ordering, no prices until confirmed. Groups follow the
  spreadsheet: Coffee, Matcha + Hojicha, Tea + Refreshers, Bites, Sweet Bakes, Savoury, Desserts.
- **Contact** — address, hours, map link, enquiry form.
- **Events** — short intro plus an enquiry form (name, email, phone, date, headcount, message).

## Forms — deliberately not wired up

Both forms are built against a documented contract and are **inert until the backend repo exists**.
Do not substitute a third-party form service (Formspree, Web3Forms, Google Forms) and do not fall
back to `mailto:` — that was considered and rejected.

Intended contract:

```
POST /api/enquiries
{ name, email, phone?, type: "general" | "event", message, date?, headcount? }
```

Until that endpoint is live: build the real markup and client-side validation, keep the submit
handler behind a single `ENQUIRY_ENDPOINT` constant, and have the disabled state say plainly that
enquiries are not yet accepted online. Never ship a form that silently discards what a visitor typed.

## Security

Static site, so the surface is small — keep it that way. No `dangerouslySetInnerHTML`. No inline
event handlers or inline `<script>`, so a strict CSP stays possible. No analytics, pixels, embedded
widgets, or third-party scripts without asking first — each one is a privacy and supply-chain
liability on a page that collects contact details. Pin dependency versions and keep the lockfile
committed. When forms go live, validate on the server too; client-side validation is UX only.

## Working conventions

**Commits.** The owner wants a readable history. Small, self-contained, present-tense commits scoped
to one concern — `add menu page grouping`, `set up design tokens` — not one large overhaul per
session. Batch related file changes into a single commit rather than committing file-by-file, and
do not mix a refactor into a feature commit. Ask before pushing.

**Scope.** Prefer the plain solution. If a change starts pulling in a dependency, an abstraction
layer, or a config file, stop and confirm it is wanted first.

## Open decisions

Do not silently resolve these — they need the owner's call:

- **Domain name.** A domain is already registered at Vodien and already carries live email, but its
  exact name is not confirmed here — `gthr.com` in the infra diagram may be a placeholder. Do not
  hardcode a domain, canonical URL, or `CNAME` file until it is confirmed in writing.
- **Forms: conflicting instructions, unresolved.** The owner first chose "wait for our own backend"
  and explicitly rejected hosted form services. The later hosting decision says "forms go to a
  hosted form service." These cannot both hold. Until the owner picks one, build the markup and
  validation against the contract above and leave the endpoint unset — do not quietly pick a side.
- **Analytics.** The hosting decision mentions "analytics is a script tag." Nothing is chosen or
  approved. Any third-party script on pages that collect contact details needs explicit sign-off
  and a PDPA look (Singapore); a cookieless, self-hostable option is the better default.
- **Contact email, address, opening hours, phone.** Not yet known. Use a clearly-marked placeholder;
  never invent business details.
- **Prices and final menu.** Still being voted on in the spreadsheet.
