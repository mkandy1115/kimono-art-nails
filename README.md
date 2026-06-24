# KIMONO Art Nails

A small commercial **catalog website** for a tiny studio that sells a handful of
handcrafted, Japanese‑inspired acrylic **press‑on nail chips** each month.

The site is a catalog + inquiry shop (not a full checkout): visitors browse the
collection and send an order inquiry, which suits a studio selling only 2–3
items a month.

```
React (Vite) frontend  ──HTTPS──▶  Node.js + Express API  ──SQL──▶  PostgreSQL
   Cloudflare Pages                  Koyeb (or Render)               Neon
```

Everything is designed to run at **$0/month** on free tiers.

---

## Repository structure

```
kimono-art-nails/
├── api/      # Node.js + Express + Sequelize API  → deploys to Koyeb/Render
├── ui/       # React + Vite frontend              → deploys to Cloudflare Pages
├── package.json   # root convenience scripts
└── README.md
```

The two apps are independent: each has its own `package.json` and is deployed
separately, but they live in one Git repository as requested.

---

## Tech stack

| Part            | Choice                         | Host                  | Free? |
| --------------- | ------------------------------ | --------------------- | ----- |
| Frontend        | React + Vite + React Router    | Cloudflare Pages      | ✅    |
| API             | Node.js + Express + Sequelize  | Koyeb (or Render)     | ✅    |
| Database        | PostgreSQL                     | Neon                  | ✅    |
| ORM             | Sequelize                      | —                     | ✅    |
| Repo            | Git                            | GitHub                | ✅    |

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
npm run install:all          # or: npm install --prefix api && npm install --prefix ui

# 2) Start the API (terminal 1)  → http://localhost:3000
npm run dev:api

# 3) Start the UI (terminal 2)   → http://localhost:5173
npm run dev:ui
```

Open **http://localhost:5173**.

- With **no database configured**, the API serves a built‑in sample catalog from
  memory, so the whole site works immediately — handy before you create any
  hosting accounts.
- The Vite dev server proxies `/api` to `http://localhost:3000`, so no CORS
  setup is needed locally.

---

## Environment variables

Copy the example files and fill them in when you have your accounts:

```bash
cp api/.env.example api/.env
cp ui/.env.example  ui/.env
```

**`api/.env`**

| Variable          | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `DATABASE_URL`    | Neon PostgreSQL connection string. Leave blank to use in‑memory data.  |
| `ALLOWED_ORIGINS` | Comma‑separated frontend origins for CORS, or `*` for any.             |
| `PORT`            | Usually injected by the host; defaults to `3000`.                      |
| `NODE_ENV`        | `development` or `production`.                                         |

**`ui/.env`**

| Variable       | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the deployed API (e.g. `https://...koyeb.app`). Blank = local. |

> If the API is ever unreachable (not deployed yet, or waking from
> scale‑to‑zero), the frontend automatically falls back to a bundled sample
> catalog so the site never looks broken.

---

## Deployment

> Order matters: **1) Neon → 2) API on Koyeb → 3) UI on Cloudflare Pages.**
> You'll paste each step's output into the next step's environment variables.

### 0) Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: KIMONO Art Nails catalog site"
git branch -M main
git remote add origin https://github.com/<you>/kimono-art-nails.git
git push -u origin main
```

### 1) Database — Neon (PostgreSQL)

1. Create a free account at **neon.tech** and create a project.
2. Copy the **connection string** (looks like
   `postgresql://user:pass@host/dbname?sslmode=require`).
3. Seed the database from your machine:

   ```bash
   # put the connection string into api/.env as DATABASE_URL, then:
   npm run seed
   ```

   This creates the tables and inserts the catalog. Re‑running is safe (it
   upserts by `slug`).

> Do **not** use Render's free PostgreSQL for real data — it expires after 30
> days. Neon is the permanent free database here.

### 2) API — Koyeb (first choice)

1. Create a free account at **koyeb.com** → **Create Web Service** → **GitHub**,
   and pick this repository.
2. Configure the service:
   - **Monorepo / work directory:** `api`
   - **Builder:** Dockerfile (a `Dockerfile` is included) — or Buildpack with
     **Run command** `node src/index.js`.
   - **Port:** `3000` (Koyeb sets `PORT`; the app reads it automatically).
   - **Instance:** the free `nano` instance is fine.
3. Add **environment variables**:
   - `DATABASE_URL` = your Neon connection string
   - `ALLOWED_ORIGINS` = your Cloudflare URL(s), e.g.
     `https://kimono-art-nails.pages.dev` (you can start with `*` and tighten
     later)
   - `NODE_ENV` = `production`
4. Deploy. Verify health at `https://<your-app>.koyeb.app/api/health`.

> The free instance scales to zero after ~1 hour idle, so the first request
> after a quiet period may be slow to wake. The frontend handles this gracefully.

#### Alternative — Render

A `render.yaml` Blueprint is included. In Render: **New → Blueprint**, select the
repo. It builds from `rootDir: api`, runs `node src/index.js`, and health‑checks
`/api/health`. Set `DATABASE_URL` and `ALLOWED_ORIGINS` in the dashboard. (Free
Render services sleep after 15 min idle.)

### 3) Frontend — Cloudflare Pages

1. Create a free account at **cloudflare.com** → **Workers & Pages → Create →
   Pages → Connect to Git**, and pick this repository.
2. Build settings:
   - **Root directory:** `ui`
   - **Framework preset:** `Vite` (or “None”)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Add an **environment variable**:
   - `VITE_API_URL` = your Koyeb API URL (e.g. `https://<your-app>.koyeb.app`)
4. Deploy. You'll get a URL like `https://kimono-art-nails.pages.dev`.
5. Go back to the **Koyeb** service and make sure `ALLOWED_ORIGINS` includes
   this Cloudflare URL, then redeploy the API.

SPA routing and security headers are pre‑configured via `ui/public/_redirects`
and `ui/public/_headers`.

> **Why Cloudflare Pages and not Vercel?** Vercel's free Hobby plan is for
> personal, non‑commercial use. Since this is a commercial shop, Cloudflare
> Pages is the safer free choice.

---

## Managing the catalog

All products and categories live in **`api/src/data/catalog.js`** (the single
source of truth).

To add or edit a design:

1. Edit `api/src/data/catalog.js`.
2. Run `npm run seed` (with `DATABASE_URL` set) to update the database.

Each product supports:

- `status`: `available`, `made_to_order`, `coming_soon`, or `sold_out`
- `featured`: shown on the home page
- `theme`: `{ from, to, accent }` colors for the illustrated placeholder

> Keep `ui/src/data/fallbackCatalog.js` roughly in sync if you want the offline
> fallback to reflect new designs (optional — it only shows when the API is
> down).

### Adding real product photos

Set a product's `image` field to a public image URL (and optionally fill
`gallery` with more URLs). When `image` is set, the UI shows the photo instead
of the illustration. You can host images anywhere public (e.g. Cloudflare R2,
Cloudinary, or an `/images` folder in `ui/public`).

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

Everything fits the free tiers for a low‑traffic catalog. You'd only pay if
traffic grows, you want an always‑on API (no cold starts), or you buy a custom
domain.

---

## License

© KIMONO Art Nails. All rights reserved.
