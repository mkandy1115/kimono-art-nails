import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductVisual from '../components/ProductVisual.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts } from '../api/client.js';
import { INSTAGRAM_URL } from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Gallery() {
  const { t, messages } = useLocale();
  const gallery = messages.gallery;
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
          <span className="page-hero__eyebrow">{gallery.hero.eyebrow}</span>
          <h1 className="page-hero__title">{gallery.hero.title}</h1>
          <p className="page-hero__sub">{gallery.hero.sub}</p>
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
              {items.map((p) => (
                <Link
                  key={p.slug}
                  to={`/shop/${p.slug}`}
                  className="masonry__item reveal"
                >
                  <ProductVisual product={p} className="masonry__img" />
                  <span className="masonry__overlay">
                    <span className="masonry__name">{p.name}</span>
                    <span className="masonry__view">
                      {t('common.view')} <ArrowIcon />
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
            {gallery.cta.title}
          </h2>
          <p className="muted" style={{ maxWidth: '46ch', margin: '0.75rem auto 1.75rem' }}>
            {gallery.cta.sub}
          </p>
          <div className="hero__cta center">
            <Link to="/shop" className="btn btn--primary">
              {gallery.cta.shop} <ArrowIcon className="btn__arrow" />
            </Link>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
              {gallery.cta.instagram}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
