import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import ProductVisual from '../components/ProductVisual.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts } from '../api/client.js';
import { productByDisplayOrder } from '../lib/catalog.js';
import useReveal from '../hooks/useReveal.js';

const VALUES = [
  {
    title: 'Handmade in small batches',
    text: 'Each set is painted and sealed by hand. We release only a few designs a month, so quality never gives way to quantity.',
  },
  {
    title: 'Rooted in tradition',
    text: 'Our motifs come from kimono textiles and the Japanese seasons — sakura, seigaiha waves, gold leaf, autumn maple.',
  },
  {
    title: 'Made to be reused',
    text: 'Press-on, not permanent. Apply in minutes, remove gently, and keep your set to wear again and again.',
  },
];

export default function About() {
  const [showcase, setShowcase] = useState(null);

  useEffect(() => {
    let active = true;
    fetchProducts().then(({ data }) => {
      if (!active) return;
      setShowcase(productByDisplayOrder(data, 1));
    });
    return () => {
      active = false;
    };
  }, []);

  useReveal([showcase?.slug]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">About</span>
          <h1 className="page-hero__title">Small hands, careful work</h1>
          <p className="page-hero__sub">
            KIMONO Art Nails is a tiny studio devoted to one thing: wearable nail art that carries
            the quiet elegance of traditional Japan.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__art reveal">
            {showcase ? (
              <Link to={`/shop/${showcase.slug}`} aria-label={`View ${showcase.name}`}>
                <ProductVisual product={showcase} className="split__illustration" />
              </Link>
            ) : (
              <div className="split__illustration card--skeleton" />
            )}
          </div>
          <div className="split__copy reveal">
            <span className="section-title__eyebrow">Our philosophy</span>
            <h2 className="split__title">Elegance as a base, a touch of softness on top.</h2>
            <p className="muted">
              We start from refinement — warm ivories, gold leaf, and the clean lines of kimono
              patterns. Then we add a gentle blush of pink to keep everything soft, feminine, and
              approachable.
            </p>
            <p className="muted">
              The result is nail art that feels special enough for a ceremony, yet wearable enough
              for an ordinary, beautiful day.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--base">
        <div className="container">
          <SectionTitle eyebrow="What we believe" title="A few small promises" />
          <div className="values">
            {VALUES.map((v) => (
              <div key={v.title} className="value-card reveal">
                <span className="value-card__mark" aria-hidden="true">
                  ✦
                </span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">See what's in the studio now</h2>
            <p className="cta-band__sub">
              Our current designs are limited. Have a look while they're available.
            </p>
            <div className="center">
              <Link to="/shop" className="btn btn--primary">
                Browse the shop <ArrowIcon className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
