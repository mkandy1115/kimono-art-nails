# KIMONO Art Nails — API

Hono + Drizzle API for the catalog, running on **Cloudflare Workers** with a
**Neon** PostgreSQL database. See the [root README](../README.md) for full
deployment instructions.

## Local

```bash
npm install
cp .dev.vars.example .dev.vars   # Worker vars; leave DATABASE_URL blank for in-memory mode
cp .env.example .env             # DB tooling (drizzle-kit + seed); set DATABASE_URL here
npm run dev                      # http://localhost:8787  (wrangler dev)
```

## Scripts

| Script               | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run dev`        | Run the Worker locally (`wrangler dev`).             |
| `npm run deploy`     | Deploy the Worker (`wrangler deploy`).               |
| `npm run db:push`    | Create/sync tables from the Drizzle schema.          |
| `npm run db:generate`| Generate versioned SQL migrations into `drizzle/`.   |
| `npm run db:migrate` | Apply generated migrations.                          |
| `npm run seed`       | Load catalog data from `src/data/catalog.js`.        |

> `db:*` and `seed` run in Node and read `DATABASE_URL` from `.env`.
> The deployed Worker reads `DATABASE_URL` / `ALLOWED_ORIGINS` from Cloudflare
> variables (or `.dev.vars` locally).

## Structure

```
src/
├── index.js        # Hono app (Worker entry: export default app)
├── db/
│   ├── schema.js   # Drizzle tables (categories, products, inquiries)
│   └── client.js   # Neon serverless + Drizzle client factory
├── repository.js   # Data access (Drizzle queries + in-memory fallback)
├── data/catalog.js # Catalog seed data (single source of truth)
└── seed.js         # Loads catalog into Neon (run locally)
```

## Endpoints

`/api/health`, `/api/categories`, `/api/products`, `/api/products/:slug`,
`POST /api/inquiries`.

Without `DATABASE_URL` the API serves a built-in sample catalog from memory.
With it set, the API uses PostgreSQL (Neon) via Drizzle over the Neon
serverless (HTTP) driver.
