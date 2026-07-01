import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductVisual from '../components/ProductVisual.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts, fetchCategories } from '../api/client.js';
import { productByDisplayOrder } from '../lib/catalog.js';
import { INSTAGRAM_URL } from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';

const STEPS = [
  {
    n: '01',
    title: 'Choose your set',
    text: 'Browse the current collection and pick the design that speaks to you.',
  },
  {
    n: '02',
    title: 'Share your sizes',
    text: 'We include a simple sizing guide, or we size to your measurements for a glove-like fit.',
  },
  {
    n: '03',
    title: 'Wear & reuse',
    text: 'Apply in minutes with the included kit. Remove gently and keep them for next time.',
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchProducts(), fetchCategories()]).then(([prod, cats]) => {
      if (!active) return;
      setProducts(prod.data);
      setCategories(cats.data.slice(0, 4));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const showcasePrimary = productByDisplayOrder(products, 1);
  const showcaseSecondary = productByDisplayOrder(products, 4);
  const collectionPreview = products.slice(0, 4);

  useReveal([loading, products.length, categories.length]);

  return (
    <>
      {/* ----------------------------- Hero ----------------------------- */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__inner container">
          <div className="hero__copy">
            <span className="hero__eyebrow">Handcrafted press-on nail art</span>
            <h1 className="hero__title">
              Beauty of Japanese
              <br /> tradition, at your
              <br /> fingertips.
            </h1>
            <p className="hero__sub">
              Like a kimono, a special radiance made just for you — small-batch nail chips
              painted by hand in delicate, seasonal palettes.
            </p>
            <div className="hero__cta">
              <Link to="/shop" className="btn btn--primary">
                Shop now <ArrowIcon className="btn__arrow" />
              </Link>
              <Link to="/gallery" className="btn btn--ghost">
                View gallery
              </Link>
            </div>
          </div>

          {(showcasePrimary || showcaseSecondary) && (
            <div className="hero__art">
              {showcasePrimary && (
                <Link
                  to={`/shop/${showcasePrimary.slug}`}
                  className="hero__art-card"
                  aria-label={`View ${showcasePrimary.name}`}
                >
                  <ProductVisual product={showcasePrimary} className="hero__art-img" />
                </Link>
              )}
              {showcaseSecondary && (
                <Link
                  to={`/shop/${showcaseSecondary.slug}`}
                  className="hero__art-card hero__art-card--small"
                  aria-label={`View ${showcaseSecondary.name}`}
                >
                  <ProductVisual product={showcaseSecondary} className="hero__art-img" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ----------------------- New Collection ------------------------- */}
      <section className="section" id="collection">
        <div className="container">
          <SectionTitle
            eyebrow="New Collection"
            title="This season's designs"
            sub="A handful of new sets, released a few times a year. When a design sells out, it may not return."
          />

          {loading ? (
            <div className="grid grid--cards">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card card--skeleton" />
              ))}
            </div>
          ) : (
            <div className="grid grid--cards">
              {collectionPreview.map((p) => (
                <div key={p.slug} className="reveal">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          <div className="center" style={{ marginTop: '2.5rem' }}>
            <Link to="/shop" className="btn btn--ghost">
              View all designs <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------- About teaser ----------------------- */}
      <section className="section section--base">
        <div className="container split">
          <div className="split__art reveal">
            {showcaseSecondary ? (
              <Link to={`/shop/${showcaseSecondary.slug}`} aria-label={`View ${showcaseSecondary.name}`}>
                <ProductVisual product={showcaseSecondary} className="split__illustration" />
              </Link>
            ) : (
              <div className="split__illustration card--skeleton" />
            )}
          </div>
          <div className="split__copy reveal">
            <span className="section-title__eyebrow">Our story</span>
            <h2 className="split__title">
              The delicate world of the kimono, reimagined for your nails.
            </h2>
            <p className="muted">
              Every set begins as a sketch inspired by traditional Japanese textiles — cherry
              blossom, flowing waves, gold leaf. Each chip is then painted, layered, and sealed by
              hand in tiny batches, so no two sets are exactly alike.
            </p>
            <p className="muted">
              Because we make only a few designs each month, every order receives real care and
              attention.
            </p>
            <Link to="/about" className="link-underline">
              Read our story <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------- Collections ------------------------ */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Collections" title="Find your palette" />
          <div className="collections">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/shop?category=${c.slug}`}
                className="collection-tile reveal"
              >
                <span className="collection-tile__name">{c.name}</span>
                <span className="collection-tile__arrow">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Steps ---------------------------- */}
      <section className="section section--pink">
        <div className="container">
          <SectionTitle
            eyebrow="How it works"
            title="From our hands to yours"
            sub="Salon-quality nail art you apply at home — no appointment required."
          />
          <div className="steps">
            {STEPS.map((s) => (
              <div key={s.n} className="step reveal">
                <span className="step__num">{s.n}</span>
                <h3 className="step__title">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CTA ----------------------------- */}
      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">Ready to find your set?</h2>
            <p className="cta-band__sub">
              Browse the shop or Etsy for ready-to-ship sets. For custom orders, DM us on
              Instagram for the fastest reply.
            </p>
            <div className="hero__cta center">
              <Link to="/shop" className="btn btn--primary">
                Shop the collection <ArrowIcon className="btn__arrow" />
              </Link>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Message on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
