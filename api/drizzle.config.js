import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// ----------------------------------------------------------------------------
// drizzle-kit config — used by the db:generate / db:migrate / db:push scripts.
// These run locally (Node) against your Neon database, reading DATABASE_URL
// from api/.env. They are NOT part of the deployed Worker.
// ----------------------------------------------------------------------------

export default defineConfig({
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
