// ----------------------------------------------------------------------------
// Bundled fallback catalog — mirrors api/src/data/catalog.js.
//
// Used ONLY when the Worker API is unreachable. Images are null here because
// relative R2 keys cannot be expanded without API_PUBLIC_URL on the Worker.
// ----------------------------------------------------------------------------

import {
  products as catalogProducts,
  categories as catalogCategories,
} from '../../../api/src/data/catalog.js';

const categoryBySlug = Object.fromEntries(
  catalogCategories.map((c) => [c.slug, { slug: c.slug, name: c.name }])
);

export const categories = catalogCategories.map(({ slug, name }) => ({ slug, name }));

export const products = catalogProducts.map((p) => ({
  ...p,
  price: p.price,
  categorySlug: p.categorySlug,
  image: null,
  gallery: [],
  category: categoryBySlug[p.categorySlug] ?? null,
}));

export default { categories, products };
