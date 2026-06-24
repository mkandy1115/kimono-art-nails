# KIMONO Art Nails — API

Node.js + Express + Sequelize API for the catalog. Deploys to **Koyeb** (or
Render). See the [root README](../README.md) for full deployment instructions.

## Local

```bash
npm install
cp .env.example .env     # optional; leave DATABASE_URL blank to use in-memory data
npm run dev              # http://localhost:3000
```

## Scripts

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `npm start`     | Start the server (production).               |
| `npm run dev`   | Start with file watching.                    |
| `npm run seed`  | Seed PostgreSQL from `src/data/catalog.js`.  |

## Endpoints

`/api/health`, `/api/categories`, `/api/products`, `/api/products/:slug`,
`POST /api/inquiries`.

Without `DATABASE_URL` the API serves a built-in sample catalog from memory.
With it set, the API uses PostgreSQL (Neon) via Sequelize.
