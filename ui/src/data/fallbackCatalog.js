// ----------------------------------------------------------------------------
// Bundled sample catalog.
//
// This mirrors the API seed data and is used ONLY when the API is unreachable
// (e.g. right after deploying the frontend to Cloudflare Pages but before the
// Koyeb API + Neon database are wired up, or while the free API is waking from
// scale-to-zero). It keeps the site looking complete at all times.
// ----------------------------------------------------------------------------

export const categories = [
  { slug: 'seasonal', name: 'Seasonal Collection' },
  { slug: 'classic-kimono', name: 'Classic Kimono' },
  { slug: 'bridal', name: 'Bridal & Ceremony' },
  { slug: 'everyday', name: 'Everyday Elegance' },
];

export const products = [
  {
    slug: 'sakura-haze',
    name: 'Sakura Haze',
    tagline: 'Falling cherry blossoms on a blush sky',
    description:
      'Hand-painted cherry blossom petals drift across a soft blush gradient, finished with delicate gold-leaf flecks. Inspired by hanami season, when sakura petals fill the air. Each chip is sealed with a high-gloss top coat for a glass-like shine.',
    price: 38, currency: 'USD', categorySlug: 'seasonal', shape: 'Almond', length: 'Medium',
    pieces: 10, materials: 'Soak-off gel, gold leaf, hand-painted acrylic detail',
    status: 'available', featured: true, image: null, gallery: [],
    theme: { from: '#F7DDE6', to: '#E8A7B3', accent: '#D8B57A' },
    category: { slug: 'seasonal', name: 'Seasonal Collection' },
  },
  {
    slug: 'kinpaku-gold-leaf',
    name: 'Kinpaku Gold Leaf',
    tagline: 'Genuine gold leaf over warm ivory',
    description:
      'A refined nude-ivory base scattered with torn gold leaf (kinpaku), echoing the gilded screens of old Kyoto. Understated yet luxurious — the kind of set that catches the light with every gesture.',
    price: 42, currency: 'USD', categorySlug: 'classic-kimono', shape: 'Coffin', length: 'Long',
    pieces: 10, materials: 'Soak-off gel, genuine gold leaf, matte-to-gloss finish',
    status: 'available', featured: true, image: null, gallery: [],
    theme: { from: '#F3ECE9', to: '#E7D9D4', accent: '#D8B57A' },
    category: { slug: 'classic-kimono', name: 'Classic Kimono' },
  },
  {
    slug: 'seigaiha-waves',
    name: 'Seigaiha Waves',
    tagline: 'Traditional wave pattern in dusty rose',
    description:
      'The classic seigaiha (blue ocean wave) motif reimagined in dusty rose and pearl. Concentric arcs are hand-lined for a calm, rhythmic pattern that wraps around the fingertip.',
    price: 40, currency: 'USD', categorySlug: 'classic-kimono', shape: 'Oval', length: 'Medium',
    pieces: 10, materials: 'Soak-off gel, pearl pigment, hand-lined detail',
    status: 'available', featured: false, image: null, gallery: [],
    theme: { from: '#F2BFCB', to: '#C7B4AA', accent: '#D8B57A' },
    category: { slug: 'classic-kimono', name: 'Classic Kimono' },
  },
  {
    slug: 'shiro-muku-bridal',
    name: 'Shiro-Muku Bridal',
    tagline: 'Pure white with pearl shimmer',
    description:
      'Named for the pure-white shiro-muku wedding kimono, this set layers translucent white over a soft pearl shimmer, with a single accent nail of fine gold tracery. Made to order for your special day.',
    price: 56, currency: 'USD', categorySlug: 'bridal', shape: 'Almond', length: 'Long',
    pieces: 10, materials: 'Soak-off gel, pearl pigment, gold tracery, crystal accent',
    status: 'made_to_order', featured: true, image: null, gallery: [],
    theme: { from: '#F9F6F4', to: '#F7DDE6', accent: '#D8B57A' },
    category: { slug: 'bridal', name: 'Bridal & Ceremony' },
  },
  {
    slug: 'momiji-autumn',
    name: 'Momiji Autumn',
    tagline: 'Maple leaves in crimson and gold',
    description:
      'Hand-painted momiji (Japanese maple) leaves in deep crimson tumble across a warm greige base. A celebration of koyo, the autumn-leaf season, with a single true-red accent.',
    price: 40, currency: 'USD', categorySlug: 'seasonal', shape: 'Square', length: 'Short',
    pieces: 10, materials: 'Soak-off gel, hand-painted detail, gold flecks',
    status: 'available', featured: false, image: null, gallery: [],
    theme: { from: '#C7B4AA', to: '#8C1D2C', accent: '#D8B57A' },
    category: { slug: 'seasonal', name: 'Seasonal Collection' },
  },
  {
    slug: 'asanoha-blush',
    name: 'Asanoha Blush',
    tagline: 'Hemp-leaf lattice in soft pink',
    description:
      'The asanoha (hemp leaf) geometric pattern — a symbol of healthy growth — drawn in fine lines over a blush base. Delicate, modern, and endlessly wearable.',
    price: 36, currency: 'USD', categorySlug: 'everyday', shape: 'Oval', length: 'Short',
    pieces: 10, materials: 'Soak-off gel, hand-lined geometric detail',
    status: 'available', featured: false, image: null, gallery: [],
    theme: { from: '#F7DDE6', to: '#F2BFCB', accent: '#D8B57A' },
    category: { slug: 'everyday', name: 'Everyday Elegance' },
  },
  {
    slug: 'yukibana-snow',
    name: 'Yukibana Snow',
    tagline: 'Winter snow-flowers on frosted nude',
    description:
      'Crystalline snow-flower (yukibana) motifs shimmer over a frosted nude base. A quiet, wintry set with a cool pearl finish — coming soon for the winter season.',
    price: 44, currency: 'USD', categorySlug: 'seasonal', shape: 'Almond', length: 'Medium',
    pieces: 10, materials: 'Soak-off gel, pearl pigment, crystal accents',
    status: 'coming_soon', featured: false, image: null, gallery: [],
    theme: { from: '#F9F6F4', to: '#E7D9D4', accent: '#C7B4AA' },
    category: { slug: 'seasonal', name: 'Seasonal Collection' },
  },
  {
    slug: 'tsubaki-camellia',
    name: 'Tsubaki Camellia',
    tagline: 'A single camellia bloom in deep rose',
    description:
      'One bold tsubaki (camellia) blossom painted on an accent nail, paired with soft rose solids. The camellia symbolizes admiration and refined beauty in Japanese culture.',
    price: 41, currency: 'USD', categorySlug: 'classic-kimono', shape: 'Coffin', length: 'Medium',
    pieces: 10, materials: 'Soak-off gel, hand-painted floral detail, gold flecks',
    status: 'available', featured: false, image: null, gallery: [],
    theme: { from: '#E8A7B3', to: '#D88FA0', accent: '#D8B57A' },
    category: { slug: 'classic-kimono', name: 'Classic Kimono' },
  },
];

export default { categories, products };
