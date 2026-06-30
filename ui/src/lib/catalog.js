// Helpers for working with catalog product lists in the UI.

export function productByDisplayOrder(products, displayOrder) {
  return products.find((p) => p.displayOrder === displayOrder) ?? null;
}
