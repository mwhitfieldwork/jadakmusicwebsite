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
  calculator based on the $25/hr rate and 30% deposit terms. "Pay Down
  Payment" sends the customer to a **Stripe Payment Link** (see
  `STRIPE_PAYMENT_LINKS` in `site-content.ts`) — real money moves once
  that's set to a live link; it's on Stripe's test mode `REPLACE_ME`
  placeholder until then. Card, Apple Pay, Google Pay, and Link all work
  automatically there since Stripe hosts that checkout page — no backend
  needed for this phase. See `src/app/pages/booking/booking.ts` for why
  it's a Payment Link rather than a fully embedded form, and what upgrading
  to that later looks like.
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

1. **Upgrade payments from Payment Links to a fully embedded flow (optional).**
   The current Payment Link works today with no backend, but the customer
   has to type in the deposit amount themselves and leaves the site to pay.
   Once the .NET API exists, install `@stripe/stripe-js`, have the API
   create a Stripe PaymentIntent for the exact deposit (and later the final
   installment), and mount Stripe's **Payment Element** directly on the
   Booking page instead of linking out — same automatic Card/Link/Apple
   Pay/Google Pay detection, just fully inline and pre-filled.
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
