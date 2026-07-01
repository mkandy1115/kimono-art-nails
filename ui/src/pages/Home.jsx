import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductVisual from '../components/ProductVisual.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts } from '../api/client.js';
import { productByDisplayOrder } from '../lib/catalog.js';
import { INSTAGRAM_URL } from '../lib/site.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function Home() {
  const { t, messages } = useLocale();
  const home = messages.home;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProducts().then(({ data }) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const showcasePrimary = productByDisplayOrder(products, 1);
  const showcaseSecondary = productByDisplayOrder(products, 4);
  const collectionPreview = products.slice(0, 4);

  useReveal([loading, products.length]);

  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__inner container">
          <div className="hero__copy">
            <span className="hero__eyebrow">{home.hero.eyebrow}</span>
            <h1 className="hero__title" style={{ whiteSpace: 'pre-line' }}>
              {home.hero.title}
            </h1>
            <p className="hero__sub">{home.hero.sub}</p>
            <div className="hero__cta">
              <Link to="/shop" className="btn btn--primary">
                {home.buttons.shopNow} <ArrowIcon className="btn__arrow" />
              </Link>
              <Link to="/gallery" className="btn btn--ghost">
                {home.buttons.viewGallery}
              </Link>
            </div>
          </div>

          {(showcasePrimary || showcaseSecondary) && (
            <div className="hero__art">
              {showcasePrimary && (
                <Link
                  to={`/shop/${showcasePrimary.slug}`}
                  className="hero__art-card"
                  aria-label={t('common.viewProduct', { name: showcasePrimary.name })}
                >
                  <ProductVisual product={showcasePrimary} className="hero__art-img" />
                </Link>
              )}
              {showcaseSecondary && (
                <Link
                  to={`/shop/${showcaseSecondary.slug}`}
                  className="hero__art-card hero__art-card--small"
                  aria-label={t('common.viewProduct', { name: showcaseSecondary.name })}
                >
                  <ProductVisual product={showcaseSecondary} className="hero__art-img" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section" id="collection">
        <div className="container">
          <SectionTitle
            eyebrow={home.collection.eyebrow}
            title={home.collection.title}
            sub={home.collection.sub}
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
              {home.collection.viewAll} <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--base">
        <div className="container split">
          <div className="split__art reveal">
            {showcaseSecondary ? (
              <Link
                to={`/shop/${showcaseSecondary.slug}`}
                aria-label={t('common.viewProduct', { name: showcaseSecondary.name })}
              >
                <ProductVisual product={showcaseSecondary} className="split__illustration" />
              </Link>
            ) : (
              <div className="split__illustration card--skeleton" />
            )}
          </div>
          <div className="split__copy reveal">
            <span className="section-title__eyebrow">{home.aboutTeaser.eyebrow}</span>
            <h2 className="split__title">{home.aboutTeaser.title}</h2>
            <p className="muted">{home.aboutTeaser.paragraph1}</p>
            <p className="muted">{home.aboutTeaser.paragraph2}</p>
            <Link to="/about" className="link-underline">
              {home.aboutTeaser.link} <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections — hidden for now
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={home.collections.eyebrow} title={home.collections.title} />
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
      */}

      <section className="section section--pink">
        <div className="container">
          <SectionTitle
            eyebrow={home.steps.eyebrow}
            title={home.steps.title}
            sub={home.steps.sub}
          />
          <div className="steps">
            {home.steps.items.map((s) => (
              <div key={s.n} className="step reveal">
                <span className="step__num">{s.n}</span>
                <h3 className="step__title">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2 className="cta-band__title">{home.cta.title}</h2>
            <p className="cta-band__sub">{home.cta.sub}</p>
            <div className="hero__cta center">
              <Link to="/shop" className="btn btn--primary">
                {home.cta.shop} <ArrowIcon className="btn__arrow" />
              </Link>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
                {home.cta.instagram}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
