// ----------------------------------------------------------------------------
// Media URL helpers for product images served from R2 via GET /images/*.
//
// In the catalog / database you can store either:
//   - a relative R2 key:  "sakura-haze/main.jpg"
//   - a full URL:         "https://cdn.example.com/photo.jpg"
//
// When API_PUBLIC_URL is set on the Worker, relative keys are expanded to:
//   ${API_PUBLIC_URL}/images/sakura-haze/main.jpg
// ----------------------------------------------------------------------------

export function encodeImageKey(key) {
  return String(key)
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');
}

export function resolveMediaUrl(publicBaseUrl, value) {
  if (value == null || value === '') return null;
  const str = String(value).trim();
  if (/^https?:\/\//i.test(str)) return str;

  const base = (publicBaseUrl || '').trim().replace(/\/$/, '');
  if (!base) return null;

  const key = str.replace(/^\/+/, '');
  return `${base}/images/${encodeImageKey(key)}`;
}

export function withResolvedMedia(product, publicBaseUrl) {
  if (!product) return product;
  const gallery = Array.isArray(product.gallery) ? product.gallery : [];
  return {
    ...product,
    image: resolveMediaUrl(publicBaseUrl, product.image),
    gallery: gallery
      .map((item) => resolveMediaUrl(publicBaseUrl, item))
      .filter(Boolean),
  };
}
