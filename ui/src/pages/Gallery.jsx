import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductVisual from '../components/ProductVisual.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts } from '../api/client.js';
import useReveal from '../hooks/useReveal.js';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProducts().then(({ data }) => {
      if (!active) return;
      setItems(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useReveal([loading, items.length]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">Gallery</span>
          <h1 className="page-hero__title">A look at our work</h1>
          <p className="page-hero__sub">
            Every design we've painted, gathered in one place. Tap any set to see the details or
            request it.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {loading ? (
            <div className="masonry">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="masonry__item card--skeleton" />
              ))}
            </div>
          ) : (
            <div className="masonry">
              {items.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/shop/${p.slug}`}
                  className={`masonry__item reveal${i % 3 === 1 ? ' masonry__item--tall' : ''}`}
                >
                  <ProductVisual product={p} className="masonry__img" />
                  <span className="masonry__overlay">
                    <span className="masonry__name">{p.name}</span>
                    <span className="masonry__view">
                      View <ArrowIcon />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--pink section--tight">
        <div className="container center">
          <h2 className="serif" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
            Like something you see?
          </h2>
          <p className="muted" style={{ maxWidth: '46ch', margin: '0.75rem auto 1.75rem' }}>
            Browse availability in the shop, or ask us about a custom version.
          </p>
          <div className="hero__cta center">
            <Link to="/shop" className="btn btn--primary">
              Go to shop <ArrowIcon className="btn__arrow" />
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
