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

**PARKED.** The deploy workflow publishes `holding/`, not `dist/`. That folder contains only a plain
`404.html` and a `CNAME`, so gthr.sg answers every path with a genuine HTTP 404 — no index page, no
branding, no sign that anything is coming. The app is unchanged and still builds on every push, so
it stays verified while parked.

Serving a real 404 rather than a styled "coming soon" page is deliberate. An `index.html` would
return HTTP 200 with error-looking content, which crawlers treat as a live page (a soft 404); with
no index, Pages returns a true 404 status and search engines drop the URL on their own.

To go live: change `path: ./holding` back to `path: ./dist` in `.github/workflows/deploy.yml`. That
one line is the whole switch, in both directions. Do not delete `holding/` — it is how the site gets
parked again.

Scaffolded, with a Pages deploy workflow. All four pages build and render, styled to the deck's
direction. What is *not* done: real photography, real business details, and the enquiry forms.

The site is gated behind two switches, both of which must be flipped before launch:

- `PLACEHOLDER` in `src/data/site.js` — while `true`, every page shows a "Preview" bar saying the
  details are not confirmed. Set it to `false` once real details replace the placeholders.
- `public/robots.txt` — currently `Disallow: /`, so the placeholder address, hours and draft menu
  cannot be indexed or picked up as a business listing. Remove that line at launch.

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

The workflow is `.github/workflows/deploy.yml`: build on push to `main` (or manually via
`workflow_dispatch`), upload `dist/`, deploy. It needs **Settings → Pages → Source: GitHub Actions**
set once by hand; without that the run fails at the deploy step.

Repo needs a `CNAME` file containing the apex domain once that domain is confirmed, and Pages must
have "Enforce HTTPS" on.

**Absolute asset paths break on the project URL.** Until a custom domain exists the site is served
from `gthr-dev.github.io/main-webpage/`, so anything referencing a path from the site root resolves
one level too high. Vite rewrites absolute URLs it can resolve — `/favicon.svg` becomes
`./favicon.svg` — but it cannot rewrite a file it has never seen. The `@font-face` rules in
`base.css` still point at `/fonts/*.woff2`, which will 404 at the project URL. Harmless today
because those files do not exist; when the fonts arrive, put them somewhere Vite can resolve
(`src/styles/fonts/`, referenced relatively) rather than `public/fonts/` referenced absolutely.

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
  main/             mount only — 9 lines each, createRoot on a page component
  pages/            Home, Menu, Contact, Events — the actual page bodies
  components/       Page (shell), Nav, Footer, Section, Rows, Plate,
                    MenuGroup, Enquiry
  data/site.js      business details + nav; all placeholders for now
  data/menu.js      menu content as data, never hardcoded into JSX
  styles/           tokens.css, base.css (elements), components.css (blocks)
public/             favicon.svg, robots.txt, and fonts/ once they exist
```

Mounting is kept separate from the page body on purpose: `src/pages/*` export plain components with
no DOM side effects, so they can be rendered to a string and asserted against without a browser.

Content lives in `src/data/`. Editing the menu or the opening hours should never mean touching a
component.

`Plate` is a hatched grey box standing in for photography. The deck's images are reference shots of
other people's venues and **must not ship** — replace each `Plate` with a real `<img>` and alt text
as GTHR's own photography arrives.

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

## Forms — hosted form service, deferred

**Current state: there are no forms.** Form handling is deliberately postponed, so the contact and
events pages show a placeholder business address through the `Enquiry` component instead. That is
the point — a form with no endpoint behind it looks functional and silently discards whatever a
visitor typed, which is worse than no form at all.

When the work resumes, the agreed design is below. Replace the body of `Enquiry` and leave the
surrounding layout alone.

Contact and event enquiries POST to a **hosted form service** (Formspree or Web3Forms) which emails
them to the café. Pages cannot run code, so there is no alternative that works at launch. This
supersedes an earlier decision to wait for our own backend; `mailto:` remains rejected as the
submission mechanism.

Payload shape, kept stable so the service can be swapped for our own API later:

```
POST <ENQUIRY_ENDPOINT>
{ name, email, phone?, type: "general" | "event", message, date?, headcount? }
```

Keep the URL behind a single `ENQUIRY_ENDPOINT` constant. Migrating to `api.<domain>/enquiries` when
the backend repo exists should then be a one-line change with the markup and validation untouched.

Rules for the integration:

- The form ID is public and not a secret, but that means **anyone can POST to it**. Turn on the
  service's spam filtering, add a honeypot field, and restrict submissions to our domain if the plan
  allows it.
- Client-side validation is UX only — the service is what actually accepts the request, so never
  rely on the browser to enforce anything that matters.
- Collect only what is needed to answer the enquiry. Every extra field is data handed to a third
  party for no benefit.
- **PDPA (Singapore):** the service is a data processor handling names, emails, phone numbers and
  event details. Name it in a short privacy note linked from both forms, and state what enquiries
  are used for. Do not ship the forms without that note.
- Never let a failed submission silently discard what a visitor typed — show the error and keep the
  field values.

## Security

Static site, so the surface is small — keep it that way. No `dangerouslySetInnerHTML`. No inline
event handlers or inline `<script>`, so a strict CSP stays possible. No analytics, pixels, embedded
widgets, or third-party scripts without asking first — each one is a privacy and supply-chain
liability on a page that collects contact details. Pin dependency versions and keep the lockfile
committed.

The form service is the one approved third party, and it is approved as a **form endpoint, not as a
script** — post to it with `fetch` or a plain `action=`, and do not load its JavaScript widget. That
keeps a strict CSP viable: `connect-src` to one known host is far easier to justify than `script-src`
to someone else's CDN.

## Working conventions

**Commits.** The owner wants a readable history. Small, self-contained, present-tense commits scoped
to one concern — `add menu page grouping`, `set up design tokens` — not one large overhaul per
session. Batch related file changes into a single commit rather than committing file-by-file, and
do not mix a refactor into a feature commit. Ask before pushing.

**Scope.** Prefer the plain solution. If a change starts pulling in a dependency, an abstraction
layer, or a config file, stop and confirm it is wanted first.

## Open decisions

Do not silently resolve these — they need the owner's call:

- **Domain name.** The owner has named **gthr.sg** (superseding `gthr.com` in the infra diagram).
  Still unverified from here: whether it is configured under Settings → Pages, and whether a
  `CNAME` file needs to live in the published artifact to stop the custom domain being dropped on
  deploy. Confirm before adding one — a `CNAME` naming a domain whose DNS is not pointed at Pages
  takes the site offline at *both* URLs.
- **Which form service.** Formspree or Web3Forms — not yet picked, and the account is the owner's to
  create. Record the choice and the public form ID here once it exists.
- **Analytics.** The hosting decision mentions "analytics is a script tag." Nothing is chosen or
  approved. Any third-party script on pages that collect contact details needs explicit sign-off
  and a PDPA look (Singapore); a cookieless, self-hostable option is the better default.
- **Contact email, address, opening hours, phone.** Not yet known. Use a clearly-marked placeholder;
  never invent business details.
- **Prices and final menu.** Still being voted on in the spreadsheet.
