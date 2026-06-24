# KIMONO Art Nails — UI

React + Vite frontend for the catalog. Deploys to **Cloudflare Pages**. See the
[root README](../README.md) for full deployment instructions.

## Local

```bash
npm install
cp .env.example .env      # optional; VITE_API_URL blank = use local API via proxy
npm run dev               # http://localhost:5173
```

The dev server proxies `/api` to `http://localhost:3000`.

## Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server.             |
| `npm run build`   | Production build to `dist/`.      |
| `npm run preview` | Preview the production build.     |

## Cloudflare Pages settings

- Root directory: `ui`
- Build command: `npm run build`
- Output directory: `dist`
- Env var: `VITE_API_URL` = your API base URL

SPA routing and headers are configured in `public/_redirects` and
`public/_headers`.
