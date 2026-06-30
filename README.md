# KIMONO Art Nails

A small commercial **catalog website** for a tiny studio that sells a handful of
handcrafted, Japanese‑inspired acrylic **press‑on nail chips** each month.

The site is a catalog + inquiry shop (not a full checkout): visitors browse the
collection and send an order inquiry, which suits a studio selling only 2–3
items a month.

```
React (Vite) frontend  ──HTTPS──▶  Hono API            ──HTTP/SQL──▶  PostgreSQL
   Cloudflare Pages                  Cloudflare Workers               Neon
```

Everything is designed to run at **$0/month** on free tiers.

---

## Repository structure

```
kimono-art-nails/
├── api/      # Hono + Drizzle API  → deploys to Cloudflare Workers
├── ui/       # React + Vite frontend → deploys to Cloudflare Pages
├── package.json   # root convenience scripts
└── README.md
```

The two apps are independent: each has its own `package.json` and is deployed
separately, but they live in one Git repository.

---

## Tech stack

| Part      | Choice                      | Host               | Free? |
| --------- | --------------------------- | ------------------ | ----- |
| Frontend  | React + Vite + React Router | Cloudflare Pages   | ✅    |
| API       | Node.js (Hono framework)    | Cloudflare Workers | ✅    |
| Database  | PostgreSQL                  | Neon               | ✅    |
| ORM       | Drizzle ORM                 | —                  | ✅    |
| DB driver | `@neondatabase/serverless`  | —                  | ✅    |
| Repo      | Git                         | GitHub             | ✅    |

### Design

The visual design uses the brand color palette provided (warm ivory base,
warm‑brown text, gold accent, soft pinks, with greige and a crimson accent).
Fonts: **Cormorant Garamond** (display serif) + **Jost** (UI sans). Product
photos are represented by elegant, theme‑colored SVG illustrations until real
photography is added (see “Adding real product photos”).

---

## Quick start (local development)

You need **Node.js 18+** (built with Node 22).

```bash
# 1) Install dependencies for both apps
npm run install:all

# 2) Start the API Worker (terminal 1)  → http://localhost:8787
npm run dev:api

# 3) Start the UI (terminal 2)          → http://localhost:5173
npm run dev:ui
```

Open **http://localhost:5173**.

- With **no database configured**, the Worker serves a built‑in sample catalog
  from memory, so the whole site works immediately — even before any database
  is wired up.
- The Vite dev server proxies `/api` to the local Worker at
  `http://localhost:8787`, so there's no CORS friction locally.

### Local environment files

The project uses two different env files for the API because the database
**tooling** runs in Node while the **Worker** runs in the Workers runtime:

```bash
# Worker local dev (read by `wrangler dev`)
cp api/.dev.vars.example api/.dev.vars

# DB tooling (read by drizzle-kit + the seed script, via Node)
cp api/.env.example api/.env

# Frontend
cp ui/.env.example ui/.env
```

| File            | Used by                                   | Keys                            |
| --------------- | ----------------------------------------- | ------------------------------- |
| `api/.dev.vars` | `wrangler dev` (the Worker)               | `DATABASE_URL`, `ALLOWED_ORIGINS`, `API_PUBLIC_URL` |
| `api/.env`      | `db:push` / `db:migrate` / `seed` (Node)  | `DATABASE_URL`                  |
| `ui/.env`       | Vite build                                | `VITE_API_URL`                  |

> Both `.dev.vars` and `.env` are git‑ignored. Never commit real secrets.
> If the API is ever unreachable, the frontend falls back to a bundled sample
> catalog so the site never looks broken.

---

## Database setup (Neon)

You've already created the Neon database. To create the tables and load the
catalog, set `DATABASE_URL` in **`api/.env`** (use the **pooled** connection
string from Neon), then run:

```bash
npm run db:push   # creates/syncs the tables from the Drizzle schema
npm run seed      # loads the catalog data (safe to re-run; upserts by slug)
```

Optional (versioned migrations instead of `db:push`):

```bash
npm run db:generate   # writes SQL to api/drizzle/
npm run db:migrate    # applies it to the database
```

---

## Deployment (manual, via the Cloudflare dashboard)

Both the API and the frontend deploy from the **same GitHub repo** using
Cloudflare's Git integration — just different project types and root
directories. No CLI or `wrangler login` required.

> Recommended order: **1) Neon (done) → 2) Worker API → 3) Pages frontend**,
> because the frontend needs the Worker's URL.

### 0) Push to GitHub

```bash
git add .
git commit -m "Migrate API to Hono on Cloudflare Workers"
git push
```

### 1) API — Cloudflare Workers

1. In the Cloudflare dashboard: **Workers & Pages → Create → Workers → Import a
   repository** (Git), and select this repo.
2. Build settings:
   - **Root directory:** `api`
   - **Deploy command:** `npx wrangler deploy`
   - (Build command can be left empty.)
3. After the first deploy, open the worker → **Settings → Variables** and add:
   - **Secret** `DATABASE_URL` = your Neon **pooled** connection string
   - **Variable** `ALLOWED_ORIGINS` = your Pages URL, e.g.
     `https://kimono-art-nails.pages.dev` (you can temporarily use `*`)
   - **Variable** `API_PUBLIC_URL` = this Worker's public URL (no trailing
     slash), e.g. `https://kimono-art-nails-api.your-subdomain.workers.dev`
   - **R2 binding** `PRODUCT_IMAGES` → bucket `kimono-product-images` (create
     the bucket under R2 first)
   - Re‑deploy so the variables take effect.
4. Verify: visit `https://<your-worker>.workers.dev/api/health` — it should
   report `"mode":"postgres"` once `DATABASE_URL` is set.

The Worker's `name`, entry point, and compatibility settings are already defined
in `api/wrangler.jsonc`.

### 2) Frontend — Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git**, select this repo.
2. Build settings:
   - **Root directory:** `ui`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. **Settings → Environment variables** → add:
   - `VITE_API_URL` = your Worker URL (e.g. `https://<your-worker>.workers.dev`)
   - Re‑deploy so the build picks it up.
4. You'll get a URL like `https://kimono-art-nails.pages.dev`.
5. Back in the **Worker** variables, make sure `ALLOWED_ORIGINS` includes this
   Pages URL, then re‑deploy the Worker.

SPA routing and security headers are pre‑configured via `ui/public/_redirects`
and `ui/public/_headers`.

> **Why Cloudflare Pages and not Vercel?** Vercel's free Hobby plan is for
> personal, non‑commercial use. Since this is a commercial shop, Cloudflare
> Pages is the safer free choice.

### Future deployments

Push to GitHub → Cloudflare rebuilds and redeploys both projects automatically,
with preview deployments for non‑production branches.

---

## Managing the catalog

All products and categories live in **`api/src/data/catalog.js`** (the single
source of truth).

To add or edit a design:

1. Edit `api/src/data/catalog.js`.
2. Run `npm run seed` (with `DATABASE_URL` set in `api/.env`) to update the
   database. If you added/renamed columns, run `npm run db:push` first.

Each product supports:

- `status`: `available`, `made_to_order`, `coming_soon`, or `sold_out`
- `featured`: shown on the home page
- `theme`: `{ from, to, accent }` colors for the illustrated placeholder

> Keep `ui/src/data/fallbackCatalog.js` roughly in sync if you want the offline
> fallback to reflect new designs (optional — it only shows when the API is
> unreachable).

### Adding real product photos (Cloudflare R2)

Product photos are served by the API Worker at **`GET /images/<key>`** from an R2
bucket bound as `PRODUCT_IMAGES`.

**1. Create the bucket** in Cloudflare: **R2 → Create bucket** → name it
`kimono-product-images` (must match `api/wrangler.jsonc`).

**2. Attach the binding** to your Worker: **Workers → your API → Settings →
Bindings → R2 bucket** → variable name `PRODUCT_IMAGES`, bucket
`kimono-product-images`.

**3. Set `API_PUBLIC_URL`** on the Worker (e.g.
`https://kimono-art-nails-api.your-subdomain.workers.dev`, no trailing slash).
Locally, add it to `api/.dev.vars` as `http://localhost:8787`.

**4. Upload photos** to R2 with keys that match your catalog, e.g.:

```text
sakura-haze/main.jpg
kinpaku-gold-leaf/main.jpg
```

Dashboard: R2 → bucket → Upload. Or from your machine:

```bash
cd api
npx wrangler r2 object put kimono-product-images/sakura-haze/main.jpg --file=./path/to/photo.jpg
```

**5. Point products at those keys** in `api/src/data/catalog.js`:

```js
image: 'sakura-haze/main.jpg',
gallery: ['sakura-haze/detail-1.jpg', 'sakura-haze/detail-2.jpg'],
```

Then `npm run seed`. The API expands keys to full URLs using `API_PUBLIC_URL`;
the UI's `ProductVisual` component shows the photo instead of the SVG
placeholder.

You can still use a full `https://...` URL in `image` if the file is hosted
elsewhere.

---

## API reference

Base path: `/api`

| Method | Path               | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/health`          | Health check + mode (`postgres`/`in-memory`) |
| GET    | `/categories`      | List collections                             |
| GET    | `/products`        | List products (`?category=`, `?featured=`, `?status=`) |
| GET    | `/products/:slug`  | Single product                               |
| POST   | `/inquiries`       | Submit an order/contact inquiry              |
| GET    | `/images/*`        | Product photo from R2 (e.g. `/images/sakura-haze/main.jpg`) |

`POST /api/inquiries` body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Order inquiry: Sakura Haze",
  "message": "I'd love this set in almond, medium.",
  "productSlug": "sakura-haze"
}
```

---

## Costs

Everything fits the free tiers for a low‑traffic catalog: Cloudflare Pages
(static, effectively unlimited requests), Cloudflare Workers (100k requests/day
on the free plan), and Neon (0.5 GB storage, 100 compute‑hours/month). You'd
only pay if traffic grows substantially or you buy a custom domain. These are
ongoing free plans, not trials, but providers can change terms over time —
keep a periodic database backup so switching later stays easy.

---

## License

© KIMONO Art Nails. All rights reserved.
