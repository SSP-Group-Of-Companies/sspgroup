# SSP Group — Analytics, Search, and Cookie Consent Guide

This is a beginner-friendly walkthrough of everything required to take SSP
Group's website from "built" to "measurable and discoverable."

It covers:

1. What the codebase already does for you
2. The accounts and IDs you need to create outside the code
3. Environment variables to set (local + Vercel)
4. Google Analytics 4 (GA4) setup — step by step
5. Google Search Console setup — step by step
6. Bing Webmaster Tools (optional but recommended)
7. How cookie consent and GA4 Consent Mode v2 work on this site
8. How to verify everything is working
9. How to add tracking to new CTAs without creating noise
10. A monthly health check
11. Troubleshooting
12. Production launch checklist

No prior analytics or SEO experience is assumed. If a step sounds obvious,
it is still listed on purpose so nothing is missed.

---

## 1) What the codebase already does

You do not have to write any analytics code to ship. The site already handles:

- **GA4 loading** — `https://www.googletagmanager.com/gtag/js?id=...` loads only on public pages (never inside `/admin`) and only when the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable is set.
- **Consent-first tracking** — analytics, ads, and personalisation storage are all **denied by default**. Nothing is sent to Google until a visitor explicitly accepts.
- **Consent Mode v2 signals** — we send the full GA4 Consent Mode v2 payload (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, `functionality_storage`, `personalization_storage`, `security_storage`) with the correct state.
- **A premium consent banner + preferences modal** — bottom-left card on desktop, bottom drawer on mobile. Visitors can Accept, Reject, or Customize. Choices persist for 180 days.
- **Page view tracking** — a `page_view` event is dispatched on every route change, but only after consent is granted.
- **CTA click tracking** — conversion-relevant buttons and links call `trackCtaClick({ ctaId, location, destination, label })`. Rapid double clicks are deduped.
- **Consent storage** — stored in both `localStorage` and a first-party cookie named `ssp_cookie_consent` (180-day lifetime). Either source is accepted on read, so the value survives storage partitioning and subdomain hops.
- **Admin surface is excluded** — no GA events fire for pages under `/admin`.

### The files that make this work

| File | Role |
| --- | --- |
| `src/config/cookies.ts` | Single source of truth for cookie categories, inventory, storage keys, and event names. |
| `src/lib/analytics/consent.ts` | Reads / writes consent and maps categories to Google Consent Mode v2 signals. |
| `src/lib/analytics/cta.ts` | `trackCtaClick()` helper with normalisation, dedupe, and consent gating. |
| `src/app/(site)/components/analytics/AnalyticsClient.tsx` | Loads GA4 scripts, sets consent defaults, fires page views, mounts banner + modal. |
| `src/app/(site)/components/analytics/TrackedLink.tsx` | `<Link>` replacement that emits a CTA click event automatically. |
| `src/app/(site)/components/consent/ConsentBanner.tsx` | Compact banner shown until a choice is recorded. |
| `src/app/(site)/components/consent/CookiePreferencesModal.tsx` | Full preferences modal with category toggles and expandable cookie details. |

---

## 2) What you need to create outside the code

You will need accounts (or access) for the following services. Everything
except GA4 is optional, but all of them are strongly recommended for a
Fortune-500-grade launch.

| Service | Why | Required to launch? |
| --- | --- | --- |
| Google account | Umbrella account used for GA4 + Search Console. Use a company-owned account, not a personal one. | Yes |
| Google Analytics 4 property | Collects page views, events, and engagement data. | Yes |
| Google Search Console property | Tracks search impressions, clicks, index coverage, and errors. | Yes |
| Bing Webmaster Tools | Same data as Search Console, for Bing/DuckDuckGo. | Optional |
| Google Tag Manager (GTM) | Only if you plan to add marketing pixels (LinkedIn, Meta, etc.) later. | Optional |

> Company-owned email:  prefer `analytics@sspgroup.com` or similar over a
> personal Gmail. If the person who owns it leaves, the accounts stay with
> the company.

---

## 3) Environment variables

Set these in your local `.env.local` for development and in your Vercel
project → **Settings → Environment Variables** for Preview and Production.

```env
# Required for analytics to run at all.
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Already present — confirm it matches your production domain.
NEXT_PUBLIC_SITE_URL=https://sspgroup.com

# Optional — enables a <meta> verification tag for each tool.
# Paste only the token value shown inside the <meta content="..."> attribute.
# Leave blank until SSP actually owns the verification record.
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
```

If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is missing, the consent banner still
appears (so legal obligations are met) but GA4 scripts do not load.

If `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION` are
blank, no verification tag is rendered. This is deliberate — it guarantees
the site cannot be accidentally verified under an account that is not yours.

---

## 4) Google Analytics 4 — step-by-step setup

### A. Create the GA4 property

1. Visit <https://analytics.google.com>.
2. Click **Admin** (gear icon, bottom-left).
3. Under **Account**, click **Create** → **Account**.
   - Name: `SSP Group`.
   - Accept the data sharing settings that suit your internal policy.
4. Under **Property**, click **Create** → **Property**.
   - Property name: `SSP Group Website`.
   - Reporting time zone: `(GMT-05:00) Eastern Time`.
   - Currency: `Canadian Dollar (CAD)`.
5. Fill in business details (industry: `Transportation`, size: `Medium` or as appropriate).

### B. Create the web data stream

1. After the property is created, Google prompts you to create a **Data Stream**.
2. Choose **Web**.
3. Website URL: `https://sspgroup.com`.
4. Stream name: `SSP Group — Production`.
5. Enhanced measurement: leave the default toggles **on**. We override behaviour via Consent Mode at runtime, so this is safe.
6. Click **Create stream**.

### C. Copy the Measurement ID

1. On the stream detail page, copy the **Measurement ID** (starts with `G-`).
2. Paste it into `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.
3. Redeploy (Vercel → Deployments → ••• → Redeploy) so the new env var is applied.

### D. Configure data retention

1. Admin → **Data Settings** → **Data Retention**.
2. Event data retention: **14 months** (recommended maximum for GA4).
3. Reset on new activity: **On**.

### E. Mark key events as conversions

GA4 now calls these "Key Events." Mark the following as key events so they
show up in conversion reports:

1. Admin → **Events** → locate the event (you may need to wait 24–48h for events to appear).
2. Toggle the **Mark as key event** switch for each of:

| Event name | Why it matters |
| --- | --- |
| `cta_click` | Primary engagement signal — quote, contact, lane/location interest. |
| `page_view` | Already conversion-like at dashboard level. |

You can always add more later (e.g. form submissions) once you decide what
"conversion" means for SSP internally.

### F. Link GA4 to Google Search Console (after section 5)

Once Search Console is verified:

1. Admin → **Product links** → **Search Console links**.
2. Choose the Search Console property for `sspgroup.com`.
3. Choose your GA4 Web Stream.
4. Enable **Publish** so queries appear in GA4's Acquisition reports.

---

## 5) Google Search Console — step-by-step setup

Search Console tells you how Google sees the site: queries, impressions,
indexed pages, Core Web Vitals, and any crawling errors.

### A. Add the property (domain, not URL prefix)

1. Visit <https://search.google.com/search-console>.
2. Click **Add property**.
3. Choose **Domain** (covers `https://`, `http://`, `www`, and all subdomains in one property).
4. Enter `sspgroup.com`.
5. Copy the **TXT record** Google shows you.

### B. Verify ownership via DNS

1. Sign in to whichever service hosts DNS for `sspgroup.com` (e.g. Cloudflare, Squarespace, Route 53, GoDaddy).
2. Add a new **TXT** record:
   - Name / Host: `@` (root) — use `sspgroup.com` if the registrar expects a full hostname.
   - Value: the string Google provided (starts with `google-site-verification=...`).
   - TTL: default (or 300 seconds).
3. Save. Wait a few minutes.
4. Back in Search Console, click **Verify**.

> **Backup verification method** — the codebase also supports HTML meta-tag
> verification. Inside Search Console, choose "HTML tag", copy the value
> inside `content="..."`, and set it on the `NEXT_PUBLIC_GSC_VERIFICATION`
> environment variable in Vercel. Redeploy and click **Verify**. Leave the
> env var blank if you verified via DNS — rendering two methods side by
> side is not necessary.
>
> Nothing will be rendered until this env var is populated.

### C. Submit the sitemap

The site already exposes a dynamic sitemap at
`https://sspgroup.com/sitemap.xml` (see `src/app/sitemap.ts`).

1. Search Console → **Sitemaps** (left nav).
2. Add a new sitemap: `sitemap.xml` (Search Console prepends the domain).
3. Click **Submit**.
4. Expect "Success" status within minutes. Coverage numbers populate over a few days.

### D. Monitor the Indexing and Performance reports

After 3–5 days:

- **Performance** — queries, impressions, clicks, average position. This is your SEO growth report.
- **Indexing → Pages** — which URLs are indexed, which are excluded, and why.
- **Enhancements** — structured data, breadcrumbs, FAQs, and Core Web Vitals signals surface here when Google has enough data.

---

## 6) Bing Webmaster Tools (optional, ~5 minutes)

Bing powers Microsoft Edge's default search and DuckDuckGo. Adding the
property doubles your organic visibility reporting.

1. Visit <https://www.bing.com/webmasters>.
2. Sign in with the same Google account or a Microsoft account.
3. Add the site: `https://sspgroup.com`.
4. Bing offers to **import your Search Console property** — click this. It copies verification + sitemap automatically.
5. If you prefer a clean standalone verification, choose **HTML meta tag**,
   copy the value inside `content="..."`, and set it on the
   `NEXT_PUBLIC_BING_VERIFICATION` environment variable in Vercel.

---

## 7) How consent and Consent Mode v2 work on this site

This is important if anyone asks "why don't I see my visit in GA4?"

### First visit
- Consent Mode v2 defaults are set **before** GA4 fires: `analytics_storage` = `denied`, `ad_storage` = `denied`, all ads signals `denied`, `security_storage` = `granted`.
- GA4 still **receives pings** (this is called "cookieless pings") for modelled-conversions purposes, but no personal identifier is used.
- The SSP consent banner appears.

### Accept all
- `analytics_storage` updates to `granted`.
- `ssp_cookie_consent` is written to `localStorage` + cookie.
- A `page_view` is sent immediately.
- `cta_click` events send from then on.

### Reject non-essential
- `analytics_storage` stays `denied`.
- `ssp_cookie_consent` is saved with `analytics: false` (so the banner does not re-appear).
- GA4 receives only cookieless pings from this browser.
- `cta_click` does **not** send to GA4 (it still fires a local `CustomEvent` for in-app components that need it).

### Customize → Save preferences
- Same behaviour, but with the exact toggles the visitor picked.

### Later changes
- Visitors can update their choice at any time via `/cookie-preferences` or the "Customize" link in the consent banner. Updates take effect instantly.

---

## 8) Verifying the setup end-to-end

Do this after every production deploy that touches analytics.

### Step A — Confirm the stream and measurement ID

1. GA4 → Admin → Data Streams → Web → open the stream.
2. Confirm **Measurement ID** (e.g. `G-ZPCBWTGTH8`) matches the value of `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.
3. Confirm the stream URL is `https://sspgroup.com`.

### Step B — Confirm the GA script is loading

1. Open Chrome → new **Incognito** window.
2. Open DevTools (**F12**) **before** loading the site.
3. Go to the **Network** tab. In the filter box type `gtag`.
4. Enable **Preserve log**.
5. Visit `https://sspgroup.com`.
6. Confirm a request to `googletagmanager.com/gtag/js?id=G-...` with HTTP 200.

> **Nothing in the list?** The request fired before you opened DevTools.
> Hit **Cmd/Ctrl + R** with the filter still applied.

### Step C — Reject flow (should produce no real events)

1. In the same Incognito, click **Reject non-essential**.
2. Navigate 3–4 pages and click a couple of CTAs.
3. GA4 → **Reports** → **Realtime**. You should **not** see your interactions show up in the normal event stream (you may still see cookieless modelled signals — that's expected).

### Step D — Accept flow (should produce `page_view` + `cta_click`)

1. Open a new Incognito window.
2. Click **Accept all**.
3. Navigate 3–4 pages and click high-value CTAs.
4. GA4 → **Realtime**:
   - `page_view` should appear.
   - `cta_click` should appear with `ctaId`, `location`, `destination`, `label` parameters.

### Step E — Confirm consent storage

1. DevTools → **Application** → **Local Storage** → your site → look for `ssp_cookie_consent`.
2. DevTools → **Application** → **Cookies** → your site → look for the `ssp_cookie_consent` cookie.

### Step F — Search Console verification

1. Visit `https://sspgroup.com/sitemap.xml` in the browser. It should return an XML list of URLs.
2. Search Console → **Sitemaps** should show "Success" with the URL count.
3. Use the **URL Inspection** tool with `https://sspgroup.com/` to confirm Google can reach the page.

### Step G — (Optional) DebugView deep test

1. GA4 → **Admin** → **DebugView**.
2. In your browser install the **Google Analytics Debugger** extension (or add `?debug_mode=true` to the URL).
3. Trigger page views and CTA clicks.
4. Inspect individual events in DebugView for correct parameters.

---

## 9) Adding tracking to new CTAs

Run through this checklist every time you add a conversion-relevant button
or link. Do **not** track every UI click — analytics become noisy and the
reports stop telling you anything.

### For a server-rendered page link

Use `TrackedLink` from `src/app/(site)/components/analytics/TrackedLink.tsx`:

```tsx
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";

<TrackedLink
  href="/quote"
  ctaId="location_detail_quote_toronto_on"
  location="location_detail:hero"
  label="Request a freight quote"
>
  Request a freight quote
</TrackedLink>
```

### For a client-side button

Use `trackCtaClick` from `src/lib/analytics/cta.ts`:

```tsx
import { trackCtaClick } from "@/lib/analytics/cta";

<button
  onClick={() =>
    trackCtaClick({
      ctaId: "services_hero_request_quote",
      location: "services:hero",
      destination: "/quote",
      label: "Request a Quote",
    })
  }
>
  Request a Quote
</button>
```

### Naming rules (non-negotiable)

- `ctaId`: fixed, lowercase, underscore-separated. Never include dynamic values (timestamps, user names, email addresses).
- `location`: `page:region` format. Reuse existing `location` values where possible (`header`, `footer`, `services:hero`, `lane_detail:related`).
- `destination`: the target route/path.
- `label`: the visible text of the CTA.

Good examples:

```
services_hero_request_quote
lane_detail_toronto_montreal_quote
footer_request_quote
header_open_live_chat
```

Bad examples (do not do this):

```
click_button_12345
request_quote_from_john_doe
btn-1
```

---

## 10) Monthly health check (10 minutes)

Do this once a month to catch silent problems early.

1. **Vercel env vars** — confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is still set for Production.
2. **GA4 Realtime** — open the site in Incognito, Accept, navigate, confirm events.
3. **GA4 DebugView** — spot check `cta_click` params for consistency.
4. **Search Console → Performance** — compare month-over-month impressions and clicks. Note the top 10 queries.
5. **Search Console → Indexing → Pages** — confirm "Not indexed" count hasn't spiked. Investigate any new errors.
6. **Search Console → Core Web Vitals** — review LCP, INP, CLS. Fail or Good matters for ranking.
7. **Cookie banner smoke test** — Incognito, confirm the banner appears, Accept closes it, storage entry appears.
8. **Cookie inventory review** — compare `src/config/cookies.ts` against what the site actually sets. If you added an integration (Hotjar, Intercom, etc.) and did not add it here, fix it now.

---

## 11) Troubleshooting

| Symptom | What to check |
| --- | --- |
| Banner never appears | Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is **not required** for the banner — even without GA the banner should render on public pages. Confirm you are not on `/admin`. Confirm the `ssp_cookie_consent` key isn't already set in your browser (clear it to re-test). |
| Banner appears but GA events never arrive | Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel for Production and the deployment has been redeployed since the env var was set. |
| Duplicate events in GA4 | Make sure the CTA is not tracked both via `TrackedLink` **and** an `onClick` that also calls `trackCtaClick`. Use one or the other. |
| Events show up under `ctaId = (not set)` | A `TrackedLink` is missing the `ctaId` prop. Add it. |
| Search Console shows "URL is not on Google" | Normal for new content. Use **Request Indexing** on priority pages. Wait 24–72 hours. |
| Sitemap status "Could not fetch" | Confirm `https://sspgroup.com/sitemap.xml` returns 200 in an Incognito browser. If it's returning 500, the dynamic blog/careers fetch may be failing — check Vercel logs. |

---

## 12) Production launch checklist

Before announcing the site, confirm every box below.

- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` set in Vercel Production.
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://sspgroup.com` in Production.
- [ ] GA4 property created, data stream live, Measurement ID matches env var.
- [ ] GA4 data retention set to 14 months.
- [ ] `cta_click` marked as a Key Event in GA4.
- [ ] GA4 ↔ Search Console link configured.
- [ ] Search Console domain property verified via DNS TXT record.
- [ ] `sitemap.xml` submitted and shows "Success."
- [ ] `src/app/layout.tsx` `metadata.verification.google` replaced with your Search Console verification code (optional fallback).
- [ ] Incognito Accept flow produces `page_view` + `cta_click` in GA4 Realtime.
- [ ] Incognito Reject flow suppresses normal GA4 events.
- [ ] `ssp_cookie_consent` appears in Application → Storage after a choice is recorded.
- [ ] Cookie inventory in `src/config/cookies.ts` matches what the site actually sets.
- [ ] `/privacy`, `/terms`, `/cookies`, `/cookie-preferences`, `/accessibility` render cleanly on desktop and mobile.
- [ ] (Optional) Bing Webmaster Tools property added and sitemap imported.

---

## Appendix — Quick file reference

| Task | File |
| --- | --- |
| Change a cookie category label or description | `src/config/cookies.ts` → `COOKIE_CATEGORIES` |
| Add a new cookie to the public inventory | `src/config/cookies.ts` → `COOKIE_INVENTORY` |
| Change the consent banner copy | `src/app/(site)/components/consent/ConsentBanner.tsx` |
| Change the preferences modal copy | `src/app/(site)/components/consent/CookiePreferencesModal.tsx` |
| Change the GA4 Consent Mode v2 defaults | `src/app/(site)/components/analytics/AnalyticsClient.tsx` (the inline `gtag('consent', 'default', ...)` block) |
| Change how categories map to Google signals | `src/lib/analytics/consent.ts` → `buildConsentSignals` |
| Update the Privacy Policy / Terms / Cookie Policy / Accessibility copy | `src/config/legal.ts` |
| Update the "Last updated" date on all legal pages | `src/config/legal.ts` → `LEGAL_LAST_UPDATED` and `LEGAL_LAST_UPDATED_ISO` |
| Rotate the analytics exclusion list (e.g. add a new admin-like surface) | `src/app/(site)/components/analytics/AnalyticsClient.tsx` → `ANALYTICS_EXCLUDED_PREFIXES` |

---

## That's it

You now have everything needed to launch SSP with a Fortune-500-grade
analytics, search, and consent setup. Keep the monthly health check on your
calendar and you'll never be surprised by what Google shows you.
