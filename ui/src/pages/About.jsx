import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import ProductVisual from '../components/ProductVisual.jsx';
import { ArrowIcon } from '../components/icons.jsx';
import { fetchProducts } from '../api/client.js';
import { productByDisplayOrder } from '../lib/catalog.js';
import useReveal from '../hooks/useReveal.js';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function About() {
  const { t, messages } = useLocale();
  const about = messages.about;
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
          <span className="page-hero__eyebrow">{about.hero.eyebrow}</span>
          <h1 className="page-hero__title">{about.hero.title}</h1>
          <p className="page-hero__sub">{about.hero.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__art reveal">
            {showcase ? (
              <Link
                to={`/shop/${showcase.slug}`}
                aria-label={t('common.viewProduct', { name: showcase.name })}
              >
                <ProductVisual product={showcase} className="split__illustration" />
              </Link>
            ) : (
              <div className="split__illustration card--skeleton" />
            )}
          </div>
          <div className="split__copy reveal">
            <span className="section-title__eyebrow">{about.philosophy.eyebrow}</span>
            <h2 className="split__title">{about.philosophy.title}</h2>
            <p className="muted">{about.philosophy.paragraph1}</p>
            <p className="muted">{about.philosophy.paragraph2}</p>
          </div>
        </div>
      </section>

      <section className="section section--base">
        <div className="container">
          <SectionTitle eyebrow={about.values.eyebrow} title={about.values.title} />
          <div className="values">
            {about.values.items.map((v) => (
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
            <h2 className="cta-band__title">{about.cta.title}</h2>
            <p className="cta-band__sub">{about.cta.sub}</p>
            <div className="center">
              <Link to="/shop" className="btn btn--primary">
                {about.cta.button} <ArrowIcon className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
