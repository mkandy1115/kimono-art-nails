import { and, asc, eq } from 'drizzle-orm';
import { products, categories, inquiries } from './db/schema.js';
import { products as seedProducts, categories as seedCategories } from './data/catalog.js';

// ----------------------------------------------------------------------------
// Data-access layer.
//
// Every function takes a Drizzle `db` instance (or null). When `db` is null
// (no DATABASE_URL configured), the same data is served from the in-memory seed
// catalog so the site keeps working. Response shapes are identical in both
// modes, so the frontend never needs to care which one is active.
// ----------------------------------------------------------------------------

const byOrder = (a, b) =>
  (a.displayOrder ?? 0) - (b.displayOrder ?? 0) || a.name.localeCompare(b.name);

function decorateSeedProduct(product) {
  const category = seedCategories.find((c) => c.slug === product.categorySlug) || null;
  return {
    ...product,
    category: category ? { slug: category.slug, name: category.name } : null,
  };
}

// Maps a joined products+categories row into the API's product shape.
function mapProductRow(row) {
  const p = row.product ?? row;
  const category = row.category && row.category.slug ? row.category : null;
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    price: p.price,
    currency: p.currency,
    categorySlug: category?.slug ?? null,
    shape: p.shape,
    length: p.length,
    pieces: p.pieces,
    materials: p.materials,
    status: p.status,
    featured: p.featured,
    image: p.image,
    gallery: p.gallery ?? [],
    theme: p.theme ?? {},
    displayOrder: p.displayOrder,
    category: category ? { slug: category.slug, name: category.name } : null,
  };
}

// ----------------------------- Categories -----------------------------------

export async function listCategories(db) {
  if (db) {
    const rows = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.displayOrder), asc(categories.name));
    return rows;
  }
  return [...seedCategories].sort(byOrder);
}

// ------------------------------- Products ------------------------------------

export async function listProducts(db, { category, featured, status } = {}) {
  if (db) {
    const conditions = [];
    if (featured !== undefined) conditions.push(eq(products.featured, featured));
    if (status) conditions.push(eq(products.status, status));
    if (category) conditions.push(eq(categories.slug, category));

    const rows = await db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(products.displayOrder), asc(products.name));

    return rows.map(mapProductRow);
  }

  // In-memory fallback
  let items = seedProducts.map(decorateSeedProduct);
  if (category) items = items.filter((p) => p.categorySlug === category);
  if (featured !== undefined) items = items.filter((p) => p.featured === featured);
  if (status) items = items.filter((p) => p.status === status);
  return items.sort(byOrder);
}

export async function getProductBySlug(db, slug) {
  if (db) {
    const rows = await db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug))
      .limit(1);
    return rows.length ? mapProductRow(rows[0]) : null;
  }

  const product = seedProducts.find((p) => p.slug === slug);
  return product ? decorateSeedProduct(product) : null;
}

// ------------------------------- Inquiries -----------------------------------

export async function createInquiry(db, data) {
  if (db) {
    const [row] = await db
      .insert(inquiries)
      .values({
        name: data.name,
        email: data.email,
        productSlug: data.productSlug ?? null,
        subject: data.subject ?? null,
        message: data.message,
      })
      .returning({ id: inquiries.id });
    return { ...data, id: row?.id ?? null, persisted: true };
  }

  // Without a DB we can't persist, but we still acknowledge the request so the
  // contact form works in demo mode. The payload is logged for visibility.
  console.info('[inquiry] (not persisted — no DATABASE_URL configured)', {
    name: data.name,
    email: data.email,
    productSlug: data.productSlug,
  });
  return { ...data, id: null, persisted: false, createdAt: new Date().toISOString() };
}
