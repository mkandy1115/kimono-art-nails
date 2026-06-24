import fallback from '../data/fallbackCatalog.js';

// ----------------------------------------------------------------------------
// API client.
//
// Reads VITE_API_URL at build time. When empty, requests go to a relative
// "/api" path — which the Vite dev server proxies to http://localhost:3000.
// If any request fails (API not deployed yet, or waking from scale-to-zero),
// the catalog calls fall back to the bundled sample data so the UI never
// shows a broken page.
// ----------------------------------------------------------------------------

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function url(path) {
  return `${API_BASE}/api${path}`;
}

async function getJSON(path, { timeout = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url(path), { signal: controller.signal });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchProducts(params = {}) {
  const qs = new URLSearchParams();
  if (params.category) qs.set('category', params.category);
  if (params.featured !== undefined) qs.set('featured', String(params.featured));
  if (params.status) qs.set('status', params.status);
  const suffix = qs.toString() ? `?${qs}` : '';

  try {
    const json = await getJSON(`/products${suffix}`);
    return { data: json.data, source: 'api' };
  } catch {
    let data = fallback.products;
    if (params.category) data = data.filter((p) => p.categorySlug === params.category);
    if (params.featured !== undefined) data = data.filter((p) => p.featured === params.featured);
    if (params.status) data = data.filter((p) => p.status === params.status);
    return { data, source: 'fallback' };
  }
}

export async function fetchProduct(slug) {
  try {
    const json = await getJSON(`/products/${slug}`);
    return { data: json.data, source: 'api' };
  } catch {
    const data = fallback.products.find((p) => p.slug === slug) || null;
    return { data, source: 'fallback' };
  }
}

export async function fetchCategories() {
  try {
    const json = await getJSON('/categories');
    return { data: json.data, source: 'api' };
  } catch {
    return { data: fallback.categories, source: 'fallback' };
  }
}

export async function submitInquiry(payload) {
  const res = await fetch(url('/inquiries'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json.details?.join(' ') || json.error || 'Something went wrong.';
    throw new Error(message);
  }
  return json;
}

export { API_BASE };
