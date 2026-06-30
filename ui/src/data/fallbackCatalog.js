// ----------------------------------------------------------------------------
// Bundled fallback catalog — mirrors api/src/data/catalog.js.
//
// Used ONLY when the Worker API is unreachable. Images are null here because
// relative R2 keys cannot be expanded without API_PUBLIC_URL on the Worker.
// Keep in sync when you add or remove products in catalog.js.
// ----------------------------------------------------------------------------

const CLASSIC = { slug: 'classic-kimono', name: 'Classic Kimono' };

export const categories = [
  { slug: 'seasonal', name: 'Seasonal Collection' },
  { slug: 'classic-kimono', name: 'Classic Kimono' },
  { slug: 'bridal', name: 'Bridal & Ceremony' },
  { slug: 'everyday', name: 'Everyday Elegance' },
];

export const products = [
  {
    slug: 'sakura',
    name: 'sakura',
    tagline: 'Soft blush sakura with pearl and gold accents',
    description:
      'A delicate blush-and-ivory set inspired by cherry blossoms in spring. Layered floral linework, subtle shimmer, tiny pearls, and touches of gold create a romantic design that feels soft, graceful, and easy to wear.',
    price: 30,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Oval',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted floral details, pearl accents, gold-tone foil, fine glitter',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#FAF2F3', to: '#E8D1D2', accent: '#D0A75E' },
    displayOrder: 1,
    category: CLASSIC,
  },
  {
    slug: 'tsuru',
    name: 'tsuru',
    tagline: 'Ivory, brushed gold, and the elegance of the crane',
    description:
      'An elegant ivory-and-gold set featuring a graceful crane, asanoha-inspired geometry, scattered gold foil, and brushed metallic finishes.',
    price: 40,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials:
      'Soak-off gel, metallic foil, hand-painted crane and geometric details, gold-tone charms, brushed chrome finish',
    status: 'available',
    featured: true,
    image: null,
    gallery: [],
    theme: { from: '#F7F3EA', to: '#D8C7A1', accent: '#B79443' },
    displayOrder: 2,
    category: CLASSIC,
  },
  {
    slug: 'yogiku',
    name: 'yogiku',
    tagline: 'Midnight navy, silver light, and golden chrysanthemum',
    description:
      'A dramatic navy-and-ivory set accented with silver glitter, gold floral motifs, butterfly details, and delicate lattice patterns.',
    price: 40,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials:
      'Soak-off gel, metallic foil, silver glitter, hand-painted floral details, gold-tone charms',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#F1EFEA', to: '#111A29', accent: '#C9A24D' },
    displayOrder: 3,
    category: CLASSIC,
  },
  {
    slug: 'katsushika-hokusai',
    name: 'katsushika-hokusai',
    tagline: 'The Great Wave reimagined in jade, indigo, and gold',
    description:
      'A painterly set inspired by Hokusai’s iconic wave and Mount Fuji. Deep indigo, muted jade, warm rose, ivory, and gold accents come together in a modern tribute to traditional Japanese ukiyo-e art.',
    price: 40,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted wave and mountain details, metallic foil, gold-tone charms, shimmer finish',
    status: 'available',
    featured: true,
    image: null,
    gallery: [],
    theme: { from: '#E8ECE5', to: '#314955', accent: '#BC9348' },
    displayOrder: 4,
    category: CLASSIC,
  },
  {
    slug: 'fujimusubi',
    name: 'fujimusubi',
    tagline: 'Wisteria violet tied with delicate gold musubi',
    description:
      'A graceful violet-and-ivory set inspired by wisteria blossoms and decorative Japanese knots.',
    price: 35,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, metallic foil, silver glitter, pearl accents, gold-tone bow charms, hand-painted floral details',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#F5F1F6', to: '#9C7AB4', accent: '#C2A047' },
    displayOrder: 5,
    category: CLASSIC,
  },
  {
    slug: 'tsubaki',
    name: 'tsubaki',
    tagline: 'Camellia red and jade green in spring bloom',
    description:
      'A lively camellia-inspired set in soft jade, warm red, and ivory.',
    price: 35,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted camellia details, gold-tone foil and charms, shimmer finish',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#F4EFE8', to: '#9DBB8D', accent: '#C74F58' },
    displayOrder: 6,
    category: CLASSIC,
  },
  {
    slug: 'shinku',
    name: 'shinku',
    tagline: 'Deep crimson brocade illuminated with gold',
    description:
      'A rich crimson-and-ivory set inspired by formal kimono brocade.',
    price: 35,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Oval',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted floral details, metallic foil, brushed gold finish, gold-tone knot charm',
    status: 'available',
    featured: true,
    image: null,
    gallery: [],
    theme: { from: '#F6EEEA', to: '#A2212B', accent: '#C6A04A' },
    displayOrder: 7,
    category: CLASSIC,
  },
];

export default { categories, products };
