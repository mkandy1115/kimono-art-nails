import { hasDatabase, Product, Category, Inquiry } from './models/index.js';
import { products as seedProducts, categories as seedCategories } from './data/catalog.js';

// ----------------------------------------------------------------------------
// Data-access layer.
//
// This module hides whether data comes from PostgreSQL (via Sequelize) or from
// the in-memory seed catalog. Routes call these functions and never need to
// know which mode the API is running in.
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

// ----------------------------- Categories -----------------------------------

export async function listCategories() {
  if (hasDatabase) {
    const rows = await Category.findAll({ order: [['displayOrder', 'ASC'], ['name', 'ASC']] });
    return rows.map((r) => r.toJSON());
  }
  return [...seedCategories].sort(byOrder);
}

// ------------------------------- Products ------------------------------------

export async function listProducts({ category, featured, status } = {}) {
  if (hasDatabase) {
    const where = {};
    if (featured !== undefined) where.featured = featured;
    if (status) where.status = status;

    const include = [{ model: Category, as: 'category', attributes: ['slug', 'name'] }];
    if (category) include[0].where = { slug: category };

    const rows = await Product.findAll({
      where,
      include,
      order: [['displayOrder', 'ASC'], ['name', 'ASC']],
    });
    return rows.map((r) => r.toJSON());
  }

  // In-memory fallback
  let items = seedProducts.map(decorateSeedProduct);
  if (category) items = items.filter((p) => p.categorySlug === category);
  if (featured !== undefined) items = items.filter((p) => p.featured === featured);
  if (status) items = items.filter((p) => p.status === status);
  return items.sort(byOrder);
}

export async function getProductBySlug(slug) {
  if (hasDatabase) {
    const row = await Product.findOne({
      where: { slug },
      include: [{ model: Category, as: 'category', attributes: ['slug', 'name'] }],
    });
    return row ? row.toJSON() : null;
  }

  const product = seedProducts.find((p) => p.slug === slug);
  return product ? decorateSeedProduct(product) : null;
}

// ------------------------------- Inquiries -----------------------------------

export async function createInquiry(data) {
  if (hasDatabase) {
    const row = await Inquiry.create(data);
    return row.toJSON();
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

export { hasDatabase };
