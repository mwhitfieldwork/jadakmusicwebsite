# Jada K Music — Website

Angular 21 rebuild of [jadakmusic.com](https://www.jadakmusic.com/), styled after
[rvaharpist.com](https://rvaharpist.com/) (warm cream/charcoal/gold palette,
Playfair Display + Roboto Condensed + Source Sans 3 type pairing). This is
**Phase 1**: the public-facing marketing site. See "What's next" below for
the booking/payments and admin backend phases.

## Getting started

```bash
npm install --legacy-peer-deps   # see "npm install note" below
npm start                        # serves at http://localhost:4200
```

```bash
npm run build     # production build, output in dist/jadak-music
```

### npm install note

Angular 21's default `vitest` dev dependency currently trips a known npm
`arborist` bug (`Cannot read properties of null (reading 'edgesOut')`) on
some npm versions when resolving its optional peers. If a plain
`npm install` fails with that error, use `npm install --legacy-peer-deps`
instead (or upgrade npm) — this doesn't affect the app itself, only how npm
resolves the test tooling's peer dependencies.

## What's built (Phase 1)

- Home, Harp, Piano, Music Production, Events, Testimonials, Videos, Contact,
  and a Booking page — all copy is taken verbatim from jadakmusic.com.
- Fully responsive (mobile nav collapses to a slide-out menu).
- Contact form and "leave a review" form (Testimonials page) — both are
  real Angular reactive forms with validation, but submission is currently a
  frontend-only stub (see "What's next").
- Booking page has the requested fields (Name, Event, Date via Angular
  Material's date picker, Email, Phone) plus an estimated-total/deposit
  calculator based on the $25/hr rate and 30% deposit terms. The "Pay Down
  Payment" button reveals a payment-method section (Card/Link on desktop,
  Apple Pay/Google Pay on small screens) — this is a UI stub only; no
  charge happens yet. See `src/app/pages/booking/booking.ts` for the full
  integration plan.
- Videos page ships with a small starting set of entries (the jadakmusic.com
  site itself only embeds a few native clips, not a YouTube gallery — see
  the comment above `VIDEOS` in `site-content.ts`).

## Images and media

Images currently hotlink the original `images.squarespace-cdn.com` URLs so
the site looks right immediately. Run this once you have normal internet
access (the environment this was built in couldn't reach that CDN):

```bash
npm run download-assets
```

This downloads every image into `src/assets/images` and automatically
rewrites `src/app/core/site-content.ts` to reference the local copies
instead — safe to re-run.

Two things aren't in the original site's HTML as downloadable files and need
to come from you directly (exported from your Squarespace media library):

- The 2 harp + 1 piano performance video clips → drop into
  `src/assets/video/` (see the README there for exact filenames).
- The 3 production audio tracks (Sample Beat / Trap Beat / Old School Beat)
  → drop into `src/assets/audio/` (see the README there).
- The "Sample PDF" portfolio/rate sheet → drop into `src/assets/docs/`.

Until those files exist, the site shows a clean placeholder instead of a
broken player.

## Content

All page copy and structured data (services, pricing, testimonials, event
gallery, social links) lives in one file:
`src/app/core/site-content.ts`. Edit there rather than hunting through
templates — this will also make it straightforward to point the admin app
(Phase 3) at the same fields later.

## What's next

This was scoped as "public site pages first" — here's the rest of the
original request, in the order it makes sense to build:

1. **Real payments (Stripe).** Install `@stripe/stripe-js`, create a
   `.NET` endpoint that creates a Stripe PaymentIntent for the deposit
   (30% of the quote) and a second one for the final installment, and swap
   the Booking page's payment stub for Stripe's **Payment Element** — it
   automatically shows Card + Link on desktop and Apple Pay / Google Pay on
   supported mobile browsers by detecting real wallet availability (far more
   reliable than guessing from screen size, which is all the current stub
   does). No separate Angular wrapper package is needed — Stripe.js mounts
   directly into a DOM element.
2. **.NET 6 API + Postgres backend**, shared by this site and the admin app:
   contact form submissions, testimonial moderation queue, booking
   calendar/appointments, and Stripe PaymentIntent creation.
3. **Admin app** (separate Angular app, same backend): Google OAuth login,
   manage images/music files/YouTube URLs, approve or reject pending
   testimonials, view the booking calendar and contact messages.
4. **Booking calendar** populated with confirmed appointments (currently the
   Booking page collects a requested date but doesn't check availability
   against existing bookings yet — that needs the backend from step 2).

## Design reference

Palette and type tokens are defined once in `src/styles.scss`
(`--color-cream`, `--color-charcoal`, `--color-gold`, `--font-display`,
`--font-body`, `--font-label`) — change them there to retheme the whole
site.
