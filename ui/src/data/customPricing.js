// Custom order pricing — source of truth for /custom-order page.

export const BASIC_FEE = {
  label: 'Custom made-to-order creation fee',
  price: '$10',
  note: 'Covers 10 nails made to fit your nail sizes.',
};

export const ORDER_TYPES = [
  {
    type: 'Existing design — size customization',
    formula: 'Listed design price + $10 basic fee',
    example: 'e.g. $30 design → $40 total',
  },
  {
    type: 'Existing design — color change',
    formula: 'Listed design price + $10 basic fee + $20',
    example: 'e.g. $30 design → $60 total',
  },
  {
    type: 'Simple one-color design',
    formula: '$10',
    example: 'Standalone; not based on a catalog design',
  },
  {
    type: 'Simple magnet one-color design',
    formula: '$20',
    example: 'Standalone; not based on a catalog design',
  },
  {
    type: 'Full custom design',
    formula: '$10 basic fee + $40',
    example: '$50 total before add-ons',
  },
];

export const ADDON_ART = [
  { item: 'Japanese pattern (wagara) art', price: '+$4 per nail' },
  { item: 'Mirror art', price: '+$3 per nail' },
  { item: 'Hand-painted detail', price: '+$2 and up per nail' },
  { item: 'Magnet accent', price: '+$1 per nail' },
];

export const ADDON_PARTS = [
  { item: 'Large charm or part', price: '+$2' },
  { item: 'Medium charm or part', price: '+$1.50' },
  { item: 'Small charm or part', price: '+$1' },
];
