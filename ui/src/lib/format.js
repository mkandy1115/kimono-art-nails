export function formatPrice(amount, currency = 'USD') {
  const value = Number(amount);
  if (Number.isNaN(value)) return '';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export const STATUS_LABEL = {
  available: 'Available',
  made_to_order: 'Made to order',
  coming_soon: 'Coming soon',
  sold_out: 'Sold out',
};
