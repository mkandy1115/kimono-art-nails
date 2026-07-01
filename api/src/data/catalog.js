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
// Upload the file to the R2 bucket `product-image` with the same key.
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
    slug: 'sakura',
    name: 'Sakura',
    tagline: 'Soft blush sakura with pearl and gold accents',
    taglineJa: 'パールとゴールドが映える、やわらかな桜色',
    description:
      'A delicate blush-and-ivory set inspired by cherry blossoms in spring. Layered floral linework, subtle shimmer, tiny pearls, and touches of gold create a romantic design that feels soft, graceful, and easy to wear.',
    descriptionJa:
      '春の桜をイメージした、淡いブラッシュとアイボリーのセット。重ね描きの花模様、繊細なラメ、小さなパール、ゴールドのアクセントが、やわらかく優雅で着けやすいデザインに仕上がっています。',
    price: 30.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Oval',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted floral details, pearl accents, gold-tone foil, fine glitter',
    status: 'available',
    featured: false,
    image: 'sakura-1.jpg',
    gallery: ['sakura-2.jpg', 'sakura-3.jpg'],
    theme: {
      from: '#FAF2F3',
      to: '#E8D1D2',
      accent: '#D0A75E',
    },
    displayOrder: 1,
  },

  {
    slug: 'tsuru',
    name: 'Tsuru',
    tagline: 'Ivory, brushed gold, and the elegance of the crane',
    taglineJa: 'アイボリーとブラッシュゴールド、鶴の優雅さ',
    description:
      'An elegant ivory-and-gold set featuring a graceful crane, asanoha-inspired geometry, scattered gold foil, and brushed metallic finishes. The design combines traditional symbolism with a polished and luxurious modern look.',
    descriptionJa:
      '優雅な鶴と麻の葉模様、散りばめられたゴールド箔、ブラッシュメタリックが映える、アイボリーとゴールドのセット。伝統的なシンボルと、洗練されたモダンなラグジュアリー感を組み合わせました。',
    price: 40.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials:
      'Soak-off gel, metallic foil, hand-painted crane and geometric details, gold-tone charms, brushed chrome finish',
    status: 'available',
    featured: true,
    image: 'tsuru-1.jpg',
    gallery: ['tsuru-2.jpg', 'tsuru-3.jpg'],
    theme: {
      from: '#F7F3EA',
      to: '#D8C7A1',
      accent: '#B79443',
    },
    displayOrder: 2,
  },

  {
    slug: 'yogiku',
    name: 'Yogiku',
    tagline: 'Midnight navy, silver light, and golden chrysanthemum',
    taglineJa: 'ミッドナイトネイビーに、菊と銀の輝き',
    description:
      'A dramatic navy-and-ivory set accented with silver glitter, gold floral motifs, butterfly details, and delicate lattice patterns. Its bold contrast gives the design an elegant, formal, and evening-ready character.',
    descriptionJa:
      'ネイビーとアイボリーをベースに、シルバーグリッター、ゴールドの花模様、蝶のディテール、繊細な格子柄を添えたドラマティックなセット。力強いコントラストが、フォーマルでエレガントな夜の装いに。',
    price: 40.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials:
      'Soak-off gel, metallic foil, silver glitter, hand-painted floral details, gold-tone charms',
    status: 'available',
    featured: false,
    image: 'yogiku-1.jpg',
    gallery: ['yogiku-2.jpg', 'yogiku-3.jpg'],
    theme: {
      from: '#F1EFEA',
      to: '#111A29',
      accent: '#C9A24D',
    },
    displayOrder: 3,
  },

  {
    slug: 'hokusai',
    name: 'Hokusai',
    tagline: 'The Great Wave reimagined in jade, indigo, and gold',
    taglineJa: '富嶽360度の波を、翡翠・藍・金で再解釈',
    description:
      'A painterly set inspired by Hokusai’s iconic wave and Mount Fuji. Deep indigo, muted jade, warm rose, ivory, and gold accents come together in a modern tribute to traditional Japanese ukiyo-e art.',
    descriptionJa:
      '葛飾北斎の「神奈川沖浪裏」と富士山にインスパイアされたペインティングセット。深い藍、落ち着いた翡翠、温かみのあるローズ、アイボリー、ゴールドが、浮世絵へのモダンなオマージュとして調和しています。',
    price: 40.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Long',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted wave and mountain details, metallic foil, gold-tone charms, shimmer finish',
    status: 'available',
    featured: true,
    image: 'katsushika-hokusai-1.jpg',
    gallery: [
      'katsushika-hokusai-2.jpg',
      'katsushika-hokusai-3.jpg',
    ],
    theme: {
      from: '#E8ECE5',
      to: '#314955',
      accent: '#BC9348',
    },
    displayOrder: 4,
  },

  {
    slug: 'fujimusubi',
    name: 'Fujimusubi',
    tagline: 'Wisteria violet tied with delicate gold musubi',
    taglineJa: '藤の紫と、金の結び紐',
    description:
      'A graceful violet-and-ivory set inspired by wisteria blossoms and decorative Japanese knots. Silver shimmer, gold foil, pearl accents, and bow motifs give the design a refined and ceremonial feeling.',
    descriptionJa:
      '藤の花と日本の結び紋をモチーフにした、バイオレットとアイボリーのセット。シルバーの輝き、ゴールド箔、パール、リボンモチーフが、上品で式典にふさわしい印象を与えます。',
    price: 35.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, metallic foil, silver glitter, pearl accents, gold-tone bow charms, hand-painted floral details',
    status: 'available',
    featured: false,
    image: 'fujimusubi-1.jpg',
    gallery: ['fujimusubi-2.jpg', 'fujimusubi-3.jpg'],
    theme: {
      from: '#F5F1F6',
      to: '#9C7AB4',
      accent: '#C2A047',
    },
    displayOrder: 5,
  },

  {
    slug: 'tsubaki',
    name: 'Tsubaki',
    tagline: 'Camellia red and jade green in spring bloom',
    taglineJa: '椿の紅と、新緑のコントラスト',
    description:
      'A lively camellia-inspired set in soft jade, warm red, and ivory. Hand-painted petals, butterfly charms, subtle shimmer, and gold accents create a fresh design with traditional Japanese floral character.',
    descriptionJa:
      '椿をイメージした、淡い翡翠、温かな赤、アイボリーのセット。手描きの花びら、蝶のチャーム、繊細なラメとゴールドが、和の花柄の清新さを表現しています。',
    price: 35.0,
    currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Almond',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted camellia details, gold-tone foil and charms, shimmer finish',
    status: 'available',
    featured: false,
    image: 'tsubaki-1.jpg',
    gallery: ['tsubaki-2.jpg', 'tsubaki-3.jpg'],
    theme: {
      from: '#F4EFE8',
      to: '#9DBB8D',
      accent: '#C74F58',
    },
    displayOrder: 6,
  },

  {
    slug: 'shinku',
    name: 'Shinku',
    tagline: 'Deep crimson brocade illuminated with gold',
    taglineJa: '深い深紅の錦に、金が灯る',
    description:
      'A rich crimson-and-ivory set inspired by formal kimono brocade. Layered floral patterns, brushed gold, scattered metallic foil, and an ornamental knot create a bold and celebratory finish.',
    descriptionJa:
      '正式な着物の錦をイメージした、深紅とアイボリーのセット。重ねた花模様、ブラッシュゴールド、散りばめた箔、装飾的な結び紋が、力強く祝福的な仕上がりに。',
    price: 35.0,
      currency: 'USD',
    categorySlug: 'classic-kimono',
    shape: 'Oval',
    length: 'Medium',
    pieces: 10,
    materials:
      'Soak-off gel, hand-painted floral details, metallic foil, brushed gold finish, gold-tone knot charm',
    status: 'available',
    featured: true,
    image: 'shinku-1.jpg',
    gallery: ['shinku-2.jpg', 'shinku-3.jpg'],
    theme: {
      from: '#F6EEEA',
      to: '#A2212B',
      accent: '#C6A04A',
    },
    displayOrder: 7,
  },
];

export default { categories, products };
