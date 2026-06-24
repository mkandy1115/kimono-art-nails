import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

// ----------------------------------------------------------------------------
// Database client for Cloudflare Workers + Neon.
//
// The Neon serverless driver talks to Postgres over HTTP (plain `fetch`), which
// is exactly what the Workers runtime supports — no TCP sockets, no connection
// pools to manage. A fresh client is created per request from the Worker's
// `env.DATABASE_URL` binding.
//
// Returns `null` when no connection string is configured, so the API can fall
// back to serving the in-memory seed catalog (see repository.js).
// ----------------------------------------------------------------------------

export function getDb(databaseUrl) {
  const url = databaseUrl?.trim();
  if (!url) return null;
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export { schema };
