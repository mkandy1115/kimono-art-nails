import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql, notInArray } from 'drizzle-orm';
import * as schema from './db/schema.js';
import { categories as seedCategories, products as seedProducts } from './data/catalog.js';

// ----------------------------------------------------------------------------
// Seed script: populates the Neon PostgreSQL database with the catalog data.
//
//   npm run db:push   # create/sync the tables first
//   npm run seed      # then load the data
//
// Runs locally with Node (reads DATABASE_URL from api/.env). Safe to re-run:
// it upserts categories and products by their unique `slug`, and removes
// products whose slugs are no longer in catalog.js.
// ----------------------------------------------------------------------------

const databaseUrl = process.env.DATABASE_URL?.trim();

async function seed() {
  if (!databaseUrl) {
    console.error(
      'No DATABASE_URL is configured. Set it in api/.env (Neon connection string) before seeding.'
    );
    process.exit(1);
  }

  const db = drizzle(neon(databaseUrl), { schema });
  const { categories, products } = schema;

  // Categories — upsert by slug, and remember each generated id.
  const categoryIdBySlug = {};
  for (const cat of seedCategories) {
    const [row] = await db
      .insert(categories)
      .values({
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        displayOrder: cat.displayOrder ?? 0,
      })
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          name: cat.name,
          description: cat.description,
          displayOrder: cat.displayOrder ?? 0,
          updatedAt: sql`now()`,
        },
      })
      .returning({ id: categories.id });
    categoryIdBySlug[cat.slug] = row.id;
  }
  console.log(`[seed] Upserted ${seedCategories.length} categories.`);

  // Products — upsert by slug.
  for (const p of seedProducts) {
    const values = {
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      taglineJa: p.taglineJa ?? null,
      description: p.description,
      descriptionJa: p.descriptionJa ?? null,
      price: String(p.price),
      currency: p.currency,
      categoryId: categoryIdBySlug[p.categorySlug] ?? null,
      shape: p.shape,
      length: p.length,
      pieces: p.pieces,
      materials: p.materials,
      status: p.status,
      featured: p.featured,
      image: p.image,
      gallery: p.gallery ?? [],
      theme: p.theme ?? {},
      displayOrder: p.displayOrder ?? 0,
    };
    await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({
        target: products.slug,
        set: { ...values, updatedAt: sql`now()` },
      });
  }
  console.log(`[seed] Upserted ${seedProducts.length} products.`);

  const keepSlugs = seedProducts.map((p) => p.slug);
  const removed = await db
    .delete(products)
    .where(notInArray(products.slug, keepSlugs))
    .returning({ slug: products.slug });
  if (removed.length) {
    console.log(`[seed] Removed ${removed.length} stale product(s): ${removed.map((r) => r.slug).join(', ')}`);
  }

  console.log('[seed] Done.');
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
