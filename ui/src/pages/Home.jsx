import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import ProductCard from '../components/ProductCard.jsx';
import NailIllustration from '../components/NailIllustration.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts, fetchCategories } from '../api/client.js';
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
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchProducts({ featured: true }), fetchCategories()]).then(
      ([prod, cats]) => {
        if (!active) return;
        setFeatured(prod.data.slice(0, 4));
        setCategories(cats.data.slice(0, 4));
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  useReveal([loading, featured.length, categories.length]);

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

          <div className="hero__art" aria-hidden="true">
            <div className="hero__art-card">
              <NailIllustration
                theme={{ from: '#F7DDE6', to: '#E8A7B3', accent: '#D8B57A' }}
                seed="hero-sakura"
              />
            </div>
            <div className="hero__art-card hero__art-card--small">
              <NailIllustration
                theme={{ from: '#F3ECE9', to: '#E7D9D4', accent: '#D8B57A' }}
                seed="hero-gold"
              />
            </div>
          </div>
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
              {featured.map((p) => (
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
            <NailIllustration
              theme={{ from: '#F2BFCB', to: '#C7B4AA', accent: '#D8B57A' }}
              seed="about-teaser"
              className="split__illustration"
            />
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
              New collections are limited and made in small batches. Browse what's available now.
            </p>
            <div className="hero__cta center">
              <Link to="/shop" className="btn btn--primary">
                Shop the collection <ArrowIcon className="btn__arrow" />
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                Request a custom set
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
