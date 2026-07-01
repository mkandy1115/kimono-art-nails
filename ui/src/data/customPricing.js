// Custom order pricing — matches the Japanese price list (source of truth).

export const PRICING_SECTIONS = [
  {
    title: 'Basic Fee',
    items: [
      {
        label: 'Custom made-to-order set',
        price: '$10',
        note: '10 nails will be created to fit your nail sizes.',
      },
    ],
  },
  {
    title: 'Existing Design Orders',
    items: [
      {
        label: 'Size customization for existing designs',
        formula: 'Design price + Basic Fee',
      },
      {
        label: 'Color change for existing designs',
        formula: 'Design price + Basic Fee + $20',
      },
    ],
  },
  {
    title: 'Simple Design Orders',
    items: [
      { label: 'One color', price: '$10' },
      { label: 'Magnet one color', price: '$20' },
    ],
  },
  {
    title: 'Full Design Orders',
    items: [{ label: 'Full custom design', formula: 'Basic Fee + $40' }],
  },
];

export const ADDON_SECTION = {
  title: 'Additional Art Fees',
  note: 'Available for full custom design orders only',
  perNail: [
    { label: 'Japanese pattern art', price: '+$4' },
    { label: 'Mirror art', price: '+$3' },
    { label: 'Hand-painted design', price: '+$2〜' },
    { label: 'Magnet', price: '+$1' },
  ],
  parts: [
    { label: 'Large', price: '+$2' },
    { label: 'Medium', price: '+$1.5' },
    { label: 'Small', price: '+$1' },
  ],
};
