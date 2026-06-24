import 'dotenv/config';
import { sequelize, hasDatabase, Category, Product } from './models/index.js';
import { categories as seedCategories, products as seedProducts } from './data/catalog.js';

// ----------------------------------------------------------------------------
// Seed script: populates the PostgreSQL database with the catalog data.
//
//   npm run seed
//
// Safe to re-run: it upserts categories and products by their unique `slug`.
// ----------------------------------------------------------------------------

async function seed() {
  if (!hasDatabase) {
    console.error(
      'No DATABASE_URL is configured. Set it in api/.env (Neon connection string) before seeding.'
    );
    process.exit(1);
  }

  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  // Categories
  const categoryIdBySlug = {};
  for (const cat of seedCategories) {
    const [row] = await Category.upsert(
      {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        displayOrder: cat.displayOrder ?? 0,
      },
      { returning: true }
    );
    // upsert's returning row can vary by dialect; fetch to be safe.
    const saved = row ?? (await Category.findOne({ where: { slug: cat.slug } }));
    categoryIdBySlug[cat.slug] = saved.id;
  }
  console.log(`[seed] Upserted ${seedCategories.length} categories.`);

  // Products
  for (const p of seedProducts) {
    await Product.upsert({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      price: p.price,
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
    });
  }
  console.log(`[seed] Upserted ${seedProducts.length} products.`);

  await sequelize.close();
  console.log('[seed] Done.');
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
