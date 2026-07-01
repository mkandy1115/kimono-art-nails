export function localizedTagline(product, locale) {
  if (locale === 'ja' && product?.taglineJa) return product.taglineJa;
  return product?.tagline ?? '';
}

export function localizedDescription(product, locale) {
  if (locale === 'ja' && product?.descriptionJa) return product.descriptionJa;
  return product?.description ?? '';
}
