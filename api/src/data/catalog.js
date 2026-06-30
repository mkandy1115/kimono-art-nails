// ----------------------------------------------------------------------------
// Catalog seed data — the single source of truth for the KIMONO Art Nails shop.
//
// This data is used in two ways:
//   1. `npm run seed` writes it into the PostgreSQL database (Neon) in production.
//   2. When no DATABASE_URL is configured, the API serves it straight from
//      memory so the catalog still works locally / before the DB is set up.
//
// Each product carries a `theme` (a pair of palette colors). The frontend uses
// it to render an elegant illustrated placeholder until the shop owner uploads
// real photos by filling in the `image` / `gallery` fields.
//
// Product photos are served from Cloudflare R2 via GET /images/<key> on the
// Worker. Store a relative key in `image`, for example:
//   image: 'sakura-haze/main.jpg'
// Set API_PUBLIC_URL on the Worker and the API expands that to a full URL.
// Upload the file to the R2 bucket `kimono-product-images` with the same key.
// ----------------------------------------------------------------------------

export const categories = [
  {
    slug: 'seasonal',
    name: 'Seasonal Collection',
    description:
      'Limited designs inspired by the changing Japanese seasons — cherry blossom, autumn maple, and winter snow.',
    displayOrder: 1,
  },
  {
    slug: 'classic-kimono',
    name: 'Classic Kimono',
    description:
      'Timeless patterns drawn from traditional kimono textiles: asanoha, seigaiha waves, and gold leaf.',
    displayOrder: 2,
  },
  {
    slug: 'bridal',
    name: 'Bridal & Ceremony',
    description:
      'Delicate, luminous sets made for weddings, coming-of-age ceremonies, and special occasions.',
    displayOrder: 3,
  },
  {
    slug: 'everyday',
    name: 'Everyday Elegance',
    description:
      'Soft, wearable designs for daily life — subtle pinks, nudes, and a whisper of gold.',
    displayOrder: 4,
  },
];

export const products = [
  {
    slug: 'sakura-haze',
    name: 'Sakura Haze',
    tagline: 'Falling cherry blossoms on a blush sky',
    description:
      'Hand-painted cherry blossom petals drift across a soft blush gradient, finished with delicate gold-leaf flecks. Inspired by hanami season, when sakura petals fill the air. Each chip is sealed with a high-gloss top coat for a glass-like shine.',
    price: 38.0,
    currency: 'USD',
    categorySlug: 'seasonal',
    shape: 'Almond',
    length: 'Medium',
    pieces: 10,
    materials: 'Soak-off gel, gold leaf, hand-painted acrylic detail',
    status: 'available',
    featured: true,
    image: null,
    gallery: [],
    theme: { from: '#F7DDE6', to: '#E8A7B3', accent: '#D8B57A' },
    displayOrder: 1,
  },
  {
    slug: 'kinpaku-gold-leaf',
    name: 'Kinpaku Gold Leaf',
    tagline: 'Genuine gold leaf over warm ivory',
    description:
      'A refined nude-ivory base scattered with torn gold leaf (kinpaku), echoing the gilded screens of old Kyoto. Understated yet luxurious — the kind of set that catches the light with every gesture.',
    price: 42.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Coffin',
    length: 'Long',
    pieces: 10,
    materials: 'Soak-off gel, genuine gold leaf, matte-to-gloss finish',
    status: 'available',
    featured: true,
    image: null,
    gallery: [],
    theme: { from: '#F3ECE9', to: '#E7D9D4', accent: '#D8B57A' },
    displayOrder: 2,
  },
  {
    slug: 'seigaiha-waves',
    name: 'Seigaiha Waves',
    tagline: 'Traditional wave pattern in dusty rose',
    description:
      'The classic seigaiha (blue ocean wave) motif reimagined in dusty rose and pearl. Concentric arcs are hand-lined for a calm, rhythmic pattern that wraps around the fingertip.',
    price: 40.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Oval',
    length: 'Medium',
    pieces: 10,
    materials: 'Soak-off gel, pearl pigment, hand-lined detail',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#F2BFCB', to: '#C7B4AA', accent: '#D8B57A' },
    displayOrder: 3,
  },
  {
    slug: 'shiro-muku-bridal',
    name: 'Shiro-Muku Bridal',
    tagline: 'Pure white with pearl shimmer',
    description:
      'Named for the pure-white shiro-muku wedding kimono, this set layers translucent white over a soft pearl shimmer, with a single accent nail of fine gold tracery. Made to order for your special day.',
    price: 56.0,
    currency: 'USD',
    categorySlug: 'bridal',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials: 'Soak-off gel, pearl pigment, gold tracery, crystal accent',
    status: 'made_to_order',
    featured: true,
    image: null,
    gallery: [],
    theme: { from: '#F9F6F4', to: '#F7DDE6', accent: '#D8B57A' },
    displayOrder: 4,
  },
  {
    slug: 'momiji-autumn',
    name: 'Momiji Autumn',
    tagline: 'Maple leaves in crimson and gold',
    description:
      'Hand-painted momiji (Japanese maple) leaves in deep crimson tumble across a warm greige base. A celebration of koyo, the autumn-leaf season, with a single true-red accent.',
    price: 40.0,
    currency: 'USD',
    categorySlug: 'seasonal',
    shape: 'Square',
    length: 'Short',
    pieces: 10,
    materials: 'Soak-off gel, hand-painted detail, gold flecks',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#C7B4AA', to: '#8C1D2C', accent: '#D8B57A' },
    displayOrder: 5,
  },
  {
    slug: 'asanoha-blush',
    name: 'Asanoha Blush',
    tagline: 'Hemp-leaf lattice in soft pink',
    description:
      'The asanoha (hemp leaf) geometric pattern — a symbol of healthy growth — drawn in fine lines over a blush base. Delicate, modern, and endlessly wearable.',
    price: 36.0,
    currency: 'USD',
    categorySlug: 'everyday',
    shape: 'Oval',
    length: 'Short',
    pieces: 10,
    materials: 'Soak-off gel, hand-lined geometric detail',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#F7DDE6', to: '#F2BFCB', accent: '#D8B57A' },
    displayOrder: 6,
  },
  {
    slug: 'yukibana-snow',
    name: 'Yukibana Snow',
    tagline: 'Winter snow-flowers on frosted nude',
    description:
      'Crystalline snow-flower (yukibana) motifs shimmer over a frosted nude base. A quiet, wintry set with a cool pearl finish — coming soon for the winter season.',
    price: 44.0,
    currency: 'USD',
    categorySlug: 'seasonal',
    shape: 'Almond',
    length: 'Medium',
    pieces: 10,
    materials: 'Soak-off gel, pearl pigment, crystal accents',
    status: 'coming_soon',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#F9F6F4', to: '#E7D9D4', accent: '#C7B4AA' },
    displayOrder: 7,
  },
  {
    slug: 'tsubaki-camellia',
    name: 'Tsubaki Camellia',
    tagline: 'A single camellia bloom in deep rose',
    description:
      'One bold tsubaki (camellia) blossom painted on an accent nail, paired with soft rose solids. The camellia symbolizes admiration and refined beauty in Japanese culture.',
    price: 41.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Coffin',
    length: 'Medium',
    pieces: 10,
    materials: 'Soak-off gel, hand-painted floral detail, gold flecks',
    status: 'available',
    featured: false,
    image: null,
    gallery: [],
    theme: { from: '#E8A7B3', to: '#D88FA0', accent: '#D8B57A' },
    displayOrder: 8,
  },
];

export default { categories, products };
